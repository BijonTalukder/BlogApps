import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Query } from "./Query/Query";
import { Mutation } from "./Mutation/Mutation";
const prisma = new PrismaClient();
export const resolvers = {
  Query,
  Mutation,
    // Query: {
    //   me: async (parent: any, agrs: any, context: any) => {
    //     return await prisma.user.findMany();
    //   },
    //   user: async (parent: any, agrs: any, context: any) => {
    //     return await prisma.user.findUnique({
    //       where: {
    //         id: agrs.userId,
    //       },
    //     });
    //   },
    // },
    // Mutation: {
    //   signup: async (parent: any, args: any, context: any) => {
    //     console.log(args);
        
    //     const isExist = await prisma.user.findFirst({
    //       where: {
    //         email: args.email,
    //       },
    //     });
    //     if (isExist) {
    //       return {
    //         userError: "Already this email is registered",
    //       };
    //     }
    //     const hashedPassword = await bcrypt.hash(args.password, 12);
    //     const newUser = await prisma.user.create({
    //       data: {
    //         name: args.name,
    //         email: args.email,
    //         password: args.password,
    //       },
    //     });

    //     const token = jwt.sign({ userId: newUser.id }, "signature", {
    //       expiresIn: "1d",
    //     });
    //     return token;
    //   },
    //   signin: async (parent: any, args: any, context: any) => {
    //     const user = await prisma.user.findFirst({
    //       where: {
    //         email: args.email,
    //       },
    //     });
    //     if (!user) {
    //       return {
    //         userError: "Could not find user",
    //         token: null,
    //       };
    //     }
    //     const correctPass = await bcrypt.compare(args.password, user?.password);
    //     if (!correctPass) {
    //       return {
    //         userError: "password mismatch",
    //         token: null,
    //       };
    //     }
    //     const token = jwt.sign({ userId: user.id }, "signature", {
    //       expiresIn: "1d",
    //     });

    //     return {
    //       token,
    //     };
    //   },
    // },
};
