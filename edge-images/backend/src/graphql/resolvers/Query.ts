import { QueryResolvers } from "../generated/graphqlgen";
import { TrunkedSystemStats } from "../resolverTypes";
import { deviceHasAdmin } from "../helpers/admin";

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  trunkedCalls: (parent, args, { prisma }) => {
    if (!args.where) {
      args.where = { talkgroup: { id_not: null } };
    }
    return prisma.trunkedCalls(args);
  },
  trunkedSystems: (parent, args, ctx) => {
    return ctx.prisma.trunkedSystems(args);
  },
  trunkedSystem: async (parent, args, ctx, info) => {
    const s = ctx.prisma.trunkedSystem(args.where);
    return s;
  },
  trunkedSystemStats: async (parent, args, { prisma }) => {
    const sys = await prisma.trunkedSystem(args.where);
    if (!sys) {
      throw new Error("System not found.");
    }

    const a: any = {
      system: sys,
      callCount: prisma
        .trunkedCallsConnection({ where: { system: args.where } })
        .aggregate()
        .count(),
      talkgroupCount: prisma
        .trunkedTalkgroupsConnection({ where: { system: args.where } })
        .aggregate()
        .count(),
      systemId: sys.id,
      calls: prisma.trunkedCalls({ where: { system: args.where } }),
      talkgroups: prisma.trunkedTalkgroups({
        where: { system: args.where },
      }),
    };

    return a;
  },
  trunkedSystemsStats: async (parent, args, { prisma }) => {
    const systems = await prisma.trunkedSystems();
    const all = systems.map(async (sys) => {
      if (!sys) {
        throw new Error("System not found.");
      }

      const a: TrunkedSystemStats = {
        system: sys,
        callCount: await prisma
          .trunkedCallsConnection({ where: { system: { id: sys.id } } })
          .aggregate()
          .count(),
        talkgroupCount: await prisma
          .trunkedTalkgroupsConnection({
            where: { system: { id: sys.id } },
          })
          .aggregate()
          .count(),
        systemId: sys.id,
        calls: await prisma.trunkedCalls({
          where: { system: { id: sys.id } },
        }),
        talkgroups: await prisma.trunkedTalkgroups({
          where: { system: { id: sys.id } },
        }),
      };
      return a;
    });
    return Promise.all(all);
  },
  deviceRegistered: async (parent, args, { prisma }) => {
    return deviceHasAdmin();
  },
  currentUser: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  },
};
