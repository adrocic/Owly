// Just some config for mongoose
import '../env.js';
import mongoose from 'mongoose';
mongoose.set('debug', true);
mongoose.Promise = Promise;

// Build a connection to local mongo db and give it some config
// eslint-disable-next-line no-undef
mongoose.connect(process.env.DB_CONNECTION, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'WarblerDB',
});

const db = mongoose.connection;

db.on('error', function() {
  console.log("couldn't connect to database!");
});
db.once('open', function() {
  console.log('connected to database!');
});

export { default as User } from './user.js';
