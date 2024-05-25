import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { time } from "console";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
export const Mutation = {
  signup: async (parent: any, args: any, context: any) => {
    const isExist = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (isExist) {
      return {
        userError: "Already this email is registered",
      };
    }
    const hashedPassword = await bcrypt.hash(args.password, 12);
    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, "signature", {
      expiresIn: "1d",
    });
    return token;
  },
  signin: async (parent: any, args: any, context: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (!user) {
      return {
        userError: "Could not find user",
        token: null,
      };
    }
    const correctPass = await bcrypt.compare(args.password, user?.password);
    if (!correctPass) {
      return {
        userError: "password mismatch",
        token: null,
      };
    }
    const token = jwt.sign({ userId: user.id }, "signature", {
      expiresIn: "1d",
    });

    return {
      token,
    };
  },
  addPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
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
  },
};
