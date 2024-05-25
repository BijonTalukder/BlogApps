import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//context = {prisma}
export const Query = {
  me: async (parent: any, agrs: any, context: any) => {
    return await prisma.user.findMany();
  },
  user: async (parent: any, agrs: any, context: any) => {
    return await prisma.user.findUnique({
      where: {
        id: agrs.userId,
      },
    });
  },
};
