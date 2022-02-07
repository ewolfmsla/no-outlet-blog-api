const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    getPost(id: Int!): post
    posts: [post]
  }

  type Mutation {
    addPost(title: String!, text: String!): post
  }

  type post {
    id: Int!
    title: String!
    text: String!
    comments: [comment]
  }

  type comment {
    text: String!
    index: String!
    post: post!
  }
`

const resonseOne = { text: 'response 1', index: '1' }
const resonseTwo = { text: 'response 2', index: '1.1' }

const postOne = {
  id: 1,
  title: 'my post one',
  text: 'this is slick, eric',
  responses: [resonseOne, resonseTwo],
}

const postTwo = {
  id: 2,
  title: 'my post two',
  text: 'this is slick, eric',
  responses: [resonseOne, resonseTwo],
}

const posts = [postOne, postTwo]

const resolvers = {
  Query: {
    getPost: (parent, args) => posts.find((p) => p.id === args.id),
    posts: () => posts,
  },
  Mutation: {
    addPost: (parent, args) => {
      const post = {
        id: posts.length + 1,
        title: args.title,
        text: args.text,
      }
      posts.push(post)
      return post
    },
  },
}

module.exports = {
  typeDefs,
  resolvers,
}
