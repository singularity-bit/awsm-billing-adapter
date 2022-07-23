const { gql } = require("apollo-server");
// GraphQL Schema
export const typeDefs = gql`
  type Query {
    navigation: [Links!]
    profileSettings: [Links!]
    user(id: Int): User
    users: [User]
    viewer: User!
  }
  type Mutation {
    login(email: String!, password: String!): SignInRespose
  }
  type Links {
    name: String!
    path: String!
  }
  enum Roles {
    ADMIN
    GUEST
    CLIENT
  }
  enum ReadPersmissions {
    ANY
    OWN
  }

  type User {
    id: ID!
    email: String!
    password: String!
    role: Roles!
    permissions: ReadPersmissions!
  }
  input UserInput {
    email: String!
    password: String!
    role: Roles!
  }
  type SignInRespose {
    token: String
    user: User
  }
  type SignUpRespose {
    token: String
    error: String
  }
`;
