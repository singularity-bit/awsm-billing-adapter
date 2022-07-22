import {typeDefs} from './GraphQL/schema'
import { resolvers } from './GraphQL/resolvers'
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from '@graphql-tools/schema'
import { applyMiddleware } from "graphql-middleware";
import express from 'express';
import { extractToken, verifyToken } from './helpers/jwt';
import permissions from './helpers/permissions';
import * as dotenv from 'dotenv'

dotenv.config()
const port = 4000;
const app = express();


async function startApolloServer(typeDefs:any,resolvers:any){

  
  const server=new ApolloServer({
    schema:applyMiddleware(
      makeExecutableSchema({typeDefs,resolvers}),
      permissions
    ),
    context:({req})=>{
      const token = extractToken(req);
      const user =verifyToken(token);

      return { user };
    }

  });
  await server.start();
  server.applyMiddleware({app})

  // Launch the server
  app.listen({port},()=>{
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  })
}
startApolloServer(typeDefs,resolvers)

