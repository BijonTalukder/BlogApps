export const PostResolver = {
  addPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(userInfo);

    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }
    if (!args.title || !args.content) {
      return {
        userError: "title and content required",
        post: null,
      };
    }
    const post = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userInfo.userId,
      },
    });

    return {
      post,
    };
  },

  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        authorId: userInfo.userId,
      },
    });

    if (!user) {
      return {
        userError: "user not found",
        post: null,
      };
    }
    const updatePost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });
    return {
      userError: null,
      post: updatePost,
    };
  },
  deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        authorId: userInfo.userId,
      },
    });

    if (!user) {
      return {
        userError: "user not found",
        post: null,
      };
    }
    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      },
    });
    return {
      userError: null,
      post: deletedPost,
    };
  },
  publishPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        authorId: userInfo.userId,
      },
    });

    if (!user) {
      return {
        userError: "user not found",
        post: null,
      };
    }
    const publishedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        published: true,
      },
    });
    return {
      userError: null,
      post: publishedPost,
    };
  },
};
