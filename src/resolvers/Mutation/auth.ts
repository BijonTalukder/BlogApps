import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { time } from "console";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
export const AuthResolver ={
    signup: async (parent: any, args: any, context: any) => {
        console.log(args);
        
        const isExist = await prisma.user.findFirst({
          where: {
            email: args.email,
          },
        });
        console.log(isExist,'ex');
        
        if (isExist) {
          console.log('is block');
          
          return {
            userError: "Already this email is registered",
          };
        }
        const hashedPassword = await bcrypt.hash(args.password, 12);
        console.log(args);
        
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
        return {token};
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
}