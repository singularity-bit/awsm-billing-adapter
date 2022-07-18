import {typeDefs} from './GraphQL/schema'
import { resolvers } from './GraphQL/resolvers'
import {ApolloServer} from 'apollo-server'


const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
  });
// Launch the server
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });