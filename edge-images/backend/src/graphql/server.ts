import { GraphQLServer } from "graphql-yoga";
import { hostname } from "os";
import log from "../log";
import { prisma } from "./generated/prisma-client";
import { resolvers } from "./resolvers";

export default () => {
  const graphQLServer = new GraphQLServer({
    context: {
      prisma,
    },
    resolvers,
    typeDefs: "./src/graphql/schema.graphql",
  });

  const placeholderQuery = `
  # watch new calls as they come in
  subscription {
      trunkedCalls {
        createdAt
        frequency
        startTime
        duration
        emergency
        talkgroup {
          alphaTag
        }
        emergency
        transcription
      }
    }
`;

  graphQLServer
    .start(
      {
        debug: true,
        endpoint: "/graphql",
        playground: "/graphql",
        defaultPlaygroundQuery: placeholderQuery,
        port: process.env.GRAPHQL_PORT || 4000,
        subscriptions: "/graphql",
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
