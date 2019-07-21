// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.
import { TrunkedSystemResolvers } from "../generated/graphqlgen";

export const TrunkedSystem: TrunkedSystemResolvers.Type = {
  ...TrunkedSystemResolvers.defaultResolvers,

  talkgroups: (parent, args, { prisma }) => {
    return prisma.trunkedSystem({ id: parent.id }).talkgroups();
  },
  calls: (parent, args, { prisma }) => {
    return prisma.trunkedSystem({ id: parent.id }).calls();
  }
};
