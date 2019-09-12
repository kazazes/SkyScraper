import { Client } from "authy-client";
import consola from "consola";
import jwt from "jsonwebtoken";
import { UserRole } from "../generated/graphqlgen";
import { prisma, User } from "../generated/prisma-client";
import { compare } from "bcryptjs";

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

export function passwordStrengthValid(value: string) {
  const password = value;
  if (value.length < 6) return false;
  const hasNumbers = /\d/.test(password);
  const hasNonAlphas = /\W/.test(password);
  return hasNonAlphas && hasNumbers;
}

export  function verifyPassword(user: User, password: string) {
  return  compare(password, user.password);
}

export interface  JWTPayload {
  user?: {
    id: string,
    email: string,
    authId?: string,
    role: UserRole,
    verified: boolean
  },
  token?: string
}

export function jwtForUser(user: User) {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      authyId: user.authyId,
      role: user.role,
      name: user.name,
      verified: user.verified,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5d",
    audience: process.env.EDGE_HOSTNAME,
  });

  return {
    user: user,
    token,
  };
}

export function validEmail(email: string) {
  return email.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

export async function sendAuthyVerification(user: User) {
  const auth = await authy.registerUser({
    countryCode: "US",
    email: user.email,
    phone: user.phone,
  });

  const authyId = auth.user.id;

  await prisma
    .updateUser({ data: { authyId }, where: { id: user.id } })
    .catch((e) => {
      throw e;
    });
  consola.debug(`Set authyId on ${user.email}`);

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
      consola.info(`SMS 2FA sent to ${smsRes}`);
    },
  );
  return true;
}

export function verifyAuthyToken(user: User, token: string) {
  return authy.verifyToken({ authyId: user.authyId, token });
}
