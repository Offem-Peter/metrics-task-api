import express from 'express';
import config from 'config';
import cors from 'cors';
import morgan from 'morgan';

import routes from '../routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: config.get('origin') as string }));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Server is up!' });
});

routes(app);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Route does not exist' });
});

export default app;
