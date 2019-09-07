import { TrunkedSystemResolvers } from "../generated/graphqlgen";

export const TrunkedSystem: TrunkedSystemResolvers.Type = {
  ...TrunkedSystemResolvers.defaultResolvers,

  talkgroups: (parent, args, ctx) => {
    return ctx.prisma.trunkedTalkgroups({
      where: { system: { id: parent.id } },
    });
  },
  calls: (parent, args, ctx) => {
    return ctx.prisma.trunkedCalls({
      where: { system: { id: parent.id } },
    });
  },
};
