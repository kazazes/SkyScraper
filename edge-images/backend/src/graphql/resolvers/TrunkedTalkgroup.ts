// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.
import { TrunkedTalkgroupResolvers } from "../generated/graphqlgen";

export const TrunkedTalkgroup: TrunkedTalkgroupResolvers.Type = {
  ...TrunkedTalkgroupResolvers.defaultResolvers,

  system: (parent, args, { prisma }) => {
    return prisma.trunkedTalkgroup({ id: parent.id }).system();
  },
  calls: (parent, args, { prisma }) => {
    return prisma.trunkedTalkgroup({ id: parent.id }).calls();
  }
};
