const {  gql } = require('apollo-server');
// GraphQL Schema
export const typeDefs = gql`
      type Query {
        navigation:[Links]
        profileSettings:[Links]
      }
      type Links {
        name: String
        path: String
      }

`;