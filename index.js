const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

const express = require('express');
require('dotenv').config();
const http = require('http');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./db');
const models = require('./src/models/index');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers/index');
const { getUser } = require('./src/auth/index');

const port = process.env.PORT || 4000;
const { DB_HOST } = process.env;

db.connect(DB_HOST);

const startApolloServer = async () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = getUser(req);
      return { models, user };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app, path: '/api', graphiql: true });
  httpServer.listen({ port }, () => {
    /* eslint no-console: 0 */
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

startApolloServer();
