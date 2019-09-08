import { prisma } from "../generated/prisma-client";

export async function deviceHasAdmin() {
  const firstAdmin = await prisma.users({
    where: { role: "ADMIN" },
    first: 1,
  });

  return (
    firstAdmin.length > 0 &&
    firstAdmin[0].verified &&
    firstAdmin[0].role === "ADMIN"
  );
}
