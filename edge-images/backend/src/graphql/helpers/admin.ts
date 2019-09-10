import { Client } from "authy-client";
import consola from "consola";
import { prisma, User } from "../generated/prisma-client";

const authy = new Client({ key: process.env.AUTHY_KEY });

export async function deviceHasAdmin() {
  const firstAdmin = await prisma.users({
    where: { role: "ADMIN" },
    first: 1,
  });

  return (
    firstAdmin.length > 0 &&
    firstAdmin[0].verified &&
    firstAdmin[0].role === "ADMIN"
  );
}

export function passwordValidator(value: string) {
  const password = value;
  if (value.length < 6) return false;
  const hasNumbers = /\d/.test(password);
  const hasNonAlphas = /\W/.test(password);
  return hasNonAlphas && hasNumbers;
}

export function validEmail(email: string) {
  return email.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

export async function sendAuthyVerification(user: User) {
  const {
    user: { id: authyId },
  } = await authy.registerUser({
    countryCode: "US",
    email: user.email,
    phone: user.phone,
  });

  prisma
    .updateUser({ data: { authyId }, where: { id: user.id } })
    .catch((e) => {
      throw e;
    });
  consola.debug(`Set authyId on ${ user.email }`);

  const { cellphone } = await authy.requestSms(
    {
      authyId,
    },
    { force: true },
    (err: any, smsRes: any) => {
      if (err) {
        consola.error(err);
        return err;
      }
      consola.info(`SMS 2FA sent to ${ smsRes }`);
    },
  );
  return true;
}
