import { allow, rule, shield } from "graphql-shield";
import { verify } from "jsonwebtoken";
import { prisma } from "./generated/prisma-client";

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null;
  },
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === "admin";
  },
);

const isAdminOrNoAdmin = rule({cache: "contextual"})(
  async (parent, args, ctx) => {
    const admins =await prisma.users({where:{role_in: "ADMIN"}});
    if (admins.length === 0) return true
    return ctx.user.role === "admin"
  }
)

export function getUser(ctx: any) {
  let token: string;
  if (ctx.request)
    token = ctx.request.headers["Authorization"];
  if (ctx.connection)
    token = ctx.connection.context.authorization;

  if (!token) return

  token = token.replace("Bearer ", "");
  const verified = verify(token, process.env.JWT_SECRET);
  return typeof verified === "object" ? (verified as any).user : undefined;
}

export const permissions = shield({
    Mutation: {
      'register': isAdminOrNoAdmin,
      '*': isAdmin,
    }
  }, {
    fallbackRule: allow,
  });
