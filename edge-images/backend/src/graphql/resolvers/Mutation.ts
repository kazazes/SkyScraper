// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { MutationResolvers } from "../generated/graphqlgen";
import { prisma, TrunkedSystemCreateInput } from "../generated/prisma-client";
import { hash } from "bcryptjs";

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  createTrunkedSystem: (parent, args, ctx) => {
    return ctx.prisma.createTrunkedSystem(
      args.system as TrunkedSystemCreateInput,
    );
  },
  register: async (parent, { email, password, phone }, ctx, info) => {
    const hashedPassword = await hash(password, 10);
    const authyId = "";
    const user = await ctx.prisma.createUser({
      authyId,
      email,
      phone,
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
      verified: false,
    });
    return user;
  },
  login: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  },
};
