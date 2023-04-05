const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Query {
    me: User!
  }

  type Auth {
    token: ID!
    user: User
  }
  input BookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type Mutation {
    logIn(email: String!, password: String!): Auth!
    createUser(username: String!, email: String!, password: String!): Auth!
    saveBook(authors: [String], description: String, bookId: String, image: String, link: String, title: String): User!
    deleteBook(bookId: String!): User!
  }
`;

module.exports = typeDefs;
