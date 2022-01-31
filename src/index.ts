import { typeDefs } from './graphQL/typeDrefs';
import resolvers from './graphQL/resolvers';

import express, { Request, Response, } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


import isAuth from './middleware/isAuth';
async function initServer() {
  const app = express();
  app.use(cors());

  dotenv.config();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: isAuth
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, });


  app.use((_req:Request, res:Response) => {
    res.send('Server started');
  });
  const PORT = process.env.PORT || 5000;
  try {

    await mongoose.connect(process.env.mongodb || '');
    console.log('connected');

  } catch (e) {
    console.log(e);
  }
  app.listen(PORT, () => {
    console.log(`Express server is running on port http://localhost:${PORT}/graphql`);
  });
}
initServer();
