import { QueryResolvers } from "../generated/graphqlgen";
import { Context } from "../types";

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  trunkedCalls: (parent, args, { prisma }) => {
    if (!args.where) {
      args.where = { talkgroup: { id_not: null } };
    }
    return prisma.trunkedCalls(args);
  },
  trunkedCallCount: (parent, args, ctx: Context) => {
    return ctx.prisma
      .trunkedCallsConnection()
      .aggregate()
      .count();
  },
};
