// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { LoginResponseResolvers } from "../generated/graphqlgen";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../helpers/admin";
import consola from "consola";

export const LoginResponse: LoginResponseResolvers.Type = {
  ...LoginResponseResolvers.defaultResolvers,

  user: (parent, args, ctx) => {
    const token = jwt.verify(parent.token, process.env.JWT_SECRET) as JWTPayload;
    if (token && token.user && token.user.id) {
      return ctx.prisma.user({id: token.user.id});
    } else {
      consola.error(`Token payload invalid: ${JSON.stringify(token,  null, 2)}`);
      throw new Error("Payload verification error");
    }
  },
};
