import server from './api/server';
import config from 'config';
import db from './db';

const PORT = config.get('port') as string;
db();

server.listen(PORT, () => {
  console.log(`Service listening at ${PORT}`);
});
