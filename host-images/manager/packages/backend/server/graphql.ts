import { GraphQLServer } from "graphql-yoga";
import { prisma } from "../prisma";
import { resolvers } from "./resolvers";

const server = new GraphQLServer({
  typeDefs: "../../../prisma/prisma.graphql",
  resolvers,
  context: {
    prisma,
  },
} as any);

server.start(() => console.log("Server is running on http://localhost:4000"));
