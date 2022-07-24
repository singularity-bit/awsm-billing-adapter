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
    login(input: LoginInput): SignInRespose
    register(input: RegisterInput): SignUpRespose
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
    firstName: String!
    lastName: String!
    cnp: String
    role: Roles!
    permissions: ReadPersmissions!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    cnp: String
  }
  type SignInRespose {
    token: String
  }
  type SignUpRespose {
    token: String
  }
`;
