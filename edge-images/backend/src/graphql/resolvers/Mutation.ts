// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { hash } from "bcryptjs";
import consola from "consola";
import { MutationResolvers } from "../generated/graphqlgen";
import { TrunkedSystemCreateInput } from "../generated/prisma-client";
import { passwordStrengthValid, validEmail } from "../helpers/admin";

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  createTrunkedSystem: (parent, args, ctx) => {
    return ctx.prisma.createTrunkedSystem(
      args.system as TrunkedSystemCreateInput,
    );
  },
  register: async (parent, { email, password, phone }, ctx, info) => {
    if (!passwordStrengthValid(password))
      throw new Error(
        "Password must contain 6 characters, a number and symbol.",
      );
    if (!validEmail(email)) throw new Error("Email is invalid.");

    const hashedPassword = await hash(password, 10);
    const deleted = await ctx.prisma.deleteManyUsers({
      OR: [{ email: email }, { phone: phone }],
    });

    if (Number(deleted.count) > 0)
      consola.warn(`Deleted  ${deleted.count} users to add ${email} ${phone}`);

    const user = await ctx.prisma.createUser({
      email,
      phone,
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
      verified: false,
    });
    consola.warn(`Registered ADMIN user: ${email} ${phone}`);
    return user;
  },
  login: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  },
};
