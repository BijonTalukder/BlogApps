import { PrismaClient, User } from "@prisma/client";
import DataLoader from "dataloader";
const prisma = new PrismaClient();
const batchUsers = async (ids: number[]): Promise<User[]> => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  /*
   { 1:{user}
    2:{user}
    3:{user}}
 */
  const userData: { [key: string]: User } = {};
  users.forEach((user) => {
    userData[user.id] = user;
  });
  return ids.map((id) => userData[id]);
};
export const userLoader = new DataLoader<number, User>(batchUsers);
