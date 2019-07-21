import { QueryResolvers } from "../generated/graphqlgen";

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  trunkedCalls: (parent, args, { prisma }) => {
    if (!args.where) {
      args.where = {talkgroup: {id_not: null}}
    }
    return prisma.trunkedCalls(args);
  }
};
