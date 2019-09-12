import consola from "consola";
import { QueryResolvers } from "../generated/graphqlgen";
import { prisma } from "../generated/prisma-client";
import { deviceHasAdmin, jwtForUser, sendAuthyVerification, verifyAuthyToken, verifyPassword } from "../helpers/admin";
import { TrunkedSystemStats } from "../resolverTypes";

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
  sendAuthyVerification: async (parent, args, ctx) => {
    const u = await ctx.prisma.user(args.user);
    return sendAuthyVerification(u);
  },
  verifyAuthyToken: async (parent, args, ctx) => {
    const user = await ctx.prisma.user(args.user);
    const token = args.token;
    consola.debug(`Verifying token ${ token } for ${ user.authyId }`);
    if (!user) throw new Error("User not found.");
    const v = await verifyAuthyToken(user, args.token).catch((e) => {
      consola.error(`Token validation error. ${ e }`);
      throw new Error(e);
    });
    const verified = v.success && v.success === "true";
    if (verified) {
      await prisma.updateUser({
        where: args.user,
        data: { verified },
      });
      consola.info(
        `2FA verified ${ user.role } ${ user.email } with ${ user.phone }`,
      );
    }

    return jwtForUser(user);
  },
  login: async (parent, args, ctx) => {
    const user = await ctx.prisma.user(args.user);
    if (!user) {
      throw new Error("User not found.");
    }
    if (!user.verified)
      throw new Error(`User ${ user.email }  not phone verified`);
    const passwordValid = await verifyPassword(user, args.password);
    if (!passwordValid) {
      consola.warn(`Invalid password for ${ user.email }`);
      throw new Error("Invalid password for user.");
    }

    return jwtForUser(user);
  },
};
