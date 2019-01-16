import { Prisma } from "../prisma/index";

// tslint:disable-next-line:interface-name
export interface Context {
  prisma: Prisma;
}
