const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type userStub {
    id: ID!
    username: String!
  }

  type comment {
    id: ID!
    index: String!
    text: String!
    hide: Boolean
    createdAt: DateTime!
    updatedAt: DateTime!
    post: String!
    user: userStub
  }

  type post {
    id: ID!
    title: String!
    text: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    comments: [comment]
  }

  type user {
    id: ID!
    username: String!
    email: String!
    isAdmin: Boolean!
  }

  type Query {
    post(id: ID!): post
    posts: [post]
    comment(id: ID!): comment
    comments(post: ID!): [comment]
  }

  type Mutation {
    newPost(title: String!, text: String!): post!
    deletePost(id: ID!): Boolean!
    updatePost(id: ID!, title: String!, text: String!): post!
    newComment(postId: String!, index: String!, text: String!): comment!
    hideComment(id: ID!, hide: Boolean!): comment!
    signUp(email: String!, username: String!, password: String!): String!
    signIn(email: String!, password: String!): String!
  }
`;
