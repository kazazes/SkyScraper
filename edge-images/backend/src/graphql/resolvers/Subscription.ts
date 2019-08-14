// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.
import { SubscriptionResolvers } from "../generated/graphqlgen";
import { Transcription } from "../generated/prisma-client";
import { Context } from "../types";

export const Subscription: SubscriptionResolvers.Type = {
  ...SubscriptionResolvers.defaultResolvers,
  trunkedCalls: {
    subscribe: (parent, args, ctx: Context) => {
      return ctx.prisma.$subscribe.trunkedCall().node();
    },
    resolve: (payload: Transcription | any, args, { prisma }) => {
      return payload;
    },
  },
  transcriptions: {
    subscribe: (parent, args, ctx: Context) => {
      return ctx.prisma.$subscribe.transcription().node();
    },
    resolve: (payload: Transcription | any, args, ctx: Context) => {
      payload.call = ctx.prisma.transcription({ id: payload.id }).call();
      return payload;
    },
  },
};
