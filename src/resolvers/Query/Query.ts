import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//context = {prisma}
export const Query = {
  me: async (parent: any, agrs: any, { prismaA, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  user: async (parent: any, agrs: any, context: any) => {
    return await prisma.user.findUnique({
      where: {
        id: agrs.userId,
      },
    });
  },
  posts: async (parent: any, agrs: any, context: any) => {
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
  profile: async (parent: any, agrs: any, { prismaA, userInfo }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(agrs.userId),
      },
    });
  },
};
