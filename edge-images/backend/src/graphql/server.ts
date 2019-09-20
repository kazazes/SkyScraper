import { Request } from "express";
import { GraphQLServer } from "graphql-yoga";
import { hostname } from "os";
import log from "../log";
import { prisma } from "./generated/prisma-client";
import { resolvers } from "./resolvers";
import { rule, shield, and, or, not } from "graphql-shield";
import { getUser, permissions } from "./shield";

export default () => {
  const graphQLServer = new GraphQLServer({
    context: (req: Request) => ({
      ...req,
      prisma,
      user: getUser(req),
    }),
    resolvers,
    typeDefs: "./src/graphql/schema.graphql",
    middlewares: [permissions],
  });

  const placeholderQuery = `# watch new calls as they come in
  subscription {
      trunkedCalls {
        createdAt
        frequency
        startTime
        duration
        talkgroup {
          description
        }
        emergency
        transcription {
          body
        }
      }
    }
`;

  return graphQLServer
    .start(
      {
        debug: true,
        endpoint: "/graphql",
        playground: "/graphql",
        defaultPlaygroundQuery: placeholderQuery,
        port: process.env.GRAPHQL_PORT || 4000,
        subscriptions: "/graphql",
        cors: {
          origin: "*",
        },
      },
      () => {
        log.info(
          `GraphQL server is running on http://${hostname()}:${process.env
            .GRAPHQL_PORT || 4000}`,
        );
        log.info(`Prisma endpoint: ${process.env.PRISMA_ENDPOINT}`);
      },
    )
    .catch((e) => {
      log.error(e);
      throw e;
    });
};
