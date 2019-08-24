// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { MutationResolvers } from "../generated/graphqlgen";
import { prisma, TrunkedSystemCreateInput } from "../generated/prisma-client";

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  createTrunkedSystem: (parent, args, ctx) => {
    return ctx.prisma.createTrunkedSystem(
      args.system as TrunkedSystemCreateInput,
    );
  },
};
