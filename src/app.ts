import { typeDefs } from "./GraphQL/schema";
import { resolvers } from "./GraphQL/resolvers";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import express from "express";
import { extractToken, verifyToken } from "./helpers/jwt";
import permissions from "./helpers/permissions";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { TokenData } from "./models";

dotenv.config();
const port = 4000;
const app = express();

const url = `mongodb+srv://${process.env.CLUSTER_USER}:${process.env.CLUSTER_PW}@${process.env.CLUSTER_URL}`;

mongoose.connect(url, {
  dbName: "Billings-db",
});

async function startApolloServer(typeDefs: any, resolvers: any) {
  const server = new ApolloServer({
    schema: applyMiddleware(
      makeExecutableSchema({ typeDefs, resolvers }),
      permissions
    ),
    context: ({ req }) => {
      const token = extractToken(req);
      const user = verifyToken(token);
      return { user };
    },
    csrfPrevention: true,
    cache:'bounded'
  });
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://studio.apollographql.com",
        "http://localhost:4000/graphql",
      ],
    },
  });
  // Launch the server
  app.listen({ port }, () => {
    console.log(
      `Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
}
startApolloServer(typeDefs, resolvers);
