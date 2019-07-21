import { Prisma } from "../graphql/generated/prisma-client";

export interface Context {
  prisma: Prisma;
}
