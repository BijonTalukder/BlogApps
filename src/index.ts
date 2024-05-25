import { resolvers } from "./resolvers/index";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { jwtHelpers } from "./utils/jwtHelpers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const prisma = new PrismaClient();
const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({
      req,
    }): Promise<{
      prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      userInfo: {
        userId: number | null;
      } | null;
    }> => {
      const userInfo = await jwtHelpers.getUserInfo(
        req.headers.authorization as string
      );
      return {
        prisma,
        userInfo,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};
main();
