import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { time } from "console";
import jwt from "jsonwebtoken";
import { AuthResolver } from "./auth";
import { PostResolver } from "./Post";


export const Mutation = {
 
 ...AuthResolver,
 ...PostResolver
};
