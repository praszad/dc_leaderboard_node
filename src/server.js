import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import connect from './connections/database';
import { PublicRouter } from './routers';
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3333;

//Api Routes
app.use('/api/v1', PublicRouter);
function startApp() {
  try {
    app.listen(PORT, () => {
      console.log('App Connected on Port : ', PORT);
    });
    connect();
  } catch (err) {
    console.log('App Start Error : ', err);
  }
}
export default startApp;
