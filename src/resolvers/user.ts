export const User = {
  posts: async (parent: any, args: any, { prisma, userInfo }: any) => {
    const isMyProfile = parent.id === userInfo.userId;
    if (isMyProfile) {
      return await prisma.post.findMany({
        authorId: parent.id,
      });
    } else {
      return await prisma.post.findMany({
        authorId: parent.id,
        published: true,
      });
    }
  },
};
