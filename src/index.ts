import express from 'express';
import config from 'config';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';
import db from './db';

const app = express();

app.use(express.json());
app.use(cors({ origin: config.get('origin') as string }));
app.use(morgan('tiny'));

const PORT = config.get('port') as string;

app.listen(PORT, () => {
  console.log(`Service listening at ${PORT}`);
  db();
  routes(app);
});
