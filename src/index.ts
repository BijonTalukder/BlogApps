import { resolvers } from "./resolvers/index";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { Prisma, PrismaClient } from "@prisma/client";
import { jwtHelpers } from "./utils/jwtHelpers";

// Create a new instance of the PrismaClient
const prisma = new PrismaClient();

// Create a new instance of the ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

interface IContext {
  prisma: PrismaClient;
  userInfo: { userId: number | null } | null;
}


const main = async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req }): Promise<IContext> => {
        // Extract the authorization header from the request
        const authHeader = req.headers.authorization || '';
        console.log(authHeader);
        
        let userInfo = null;
        
        if (authHeader) {
          try {
            // Get user information from the JWT token
            userInfo = await jwtHelpers.getUserInfo(authHeader);
          } catch (error) {
            console.error('Error getting user info from JWT:', error);
          }
        }
console.log(userInfo);

        return {
          prisma,
          userInfo
        };
      },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

// Call the main function to start the server
main();
