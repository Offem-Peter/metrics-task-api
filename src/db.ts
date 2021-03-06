import mongoose from 'mongoose';
import config from 'config';

async function db() {
  const dbUri = config.get('dbUri') as string;
  console.log('Connecting to Database');
  try {
    await mongoose
      .connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log(`Database connected Successfully`);
      });
  } catch (e) {
    console.log('Database Connection Failed');
    console.error(e);
  }
}

export default db;
