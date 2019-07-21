import { TrunkedCallResolvers } from "../generated/graphqlgen";

export const TrunkedCall: TrunkedCallResolvers.Type = {
  ...TrunkedCallResolvers.defaultResolvers,

  talkgroup: (parent, args, { prisma }) => {
    return prisma.trunkedCall({ id: parent.id }).talkgroup();
  },
  system: (parent, args, { prisma }) => {
    const s = prisma.trunkedCall({ id: parent.id }).system();
    return s;
  },
  sources: (parent, args, { prisma }) => {
    return prisma.trunkedCall({ id: parent.id }).sources();
  },
  frequencyList: (parent, args, { prisma }) => {
    return prisma.trunkedCall({ id: parent.id }).frequencyList();
  }
};
