import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import db from './db';

const app = express();

app.use(express.json());
app.use(cors({ origin: config.get('origin') as string }));

const PORT = config.get('port') as string;

app.listen(PORT, () => {
	console.log(`Service listening at ${PORT}`);
	db();
	routes(app);
});
