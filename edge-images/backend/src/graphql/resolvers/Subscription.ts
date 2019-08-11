// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.
import { SubscriptionResolvers } from "../generated/graphqlgen";
import { Context } from "../types";

export const Subscription: SubscriptionResolvers.Type = {
  ...SubscriptionResolvers.defaultResolvers,
  trunkedCalls: {
    subscribe: (parent, args, ctx: Context) => {
      return ctx.prisma.$subscribe
        .trunkedCall({ mutation_in: ["CREATED"] })
        .node();
    },
    resolve: (payload) => {
      return payload;
    },
  },
  updatedCalls: {
    subscribe: (parent, args, ctx: Context) => {
      return ctx.prisma.$subscribe
        .trunkedCall({
          AND: {
            updatedFields_contains_every: "transcription.body",
            node: { transcription: { body_not: null } },
          },
        })
        .node();
    },
    resolve: (payload) => {
      return payload;
    },
  },
};
