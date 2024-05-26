export const Post = {
  author: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      id: parent.authorId,
    });
  },
};
