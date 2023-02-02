// require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI);

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'packages',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const packageSchema = new Schema({
  name: { type: String, required: true },
  version: { type: String, required: true },
  github: { type: String, required: true },
  repoOwner: { type: String, required: true },
  repoName: { type: String, required: true },
});

const Package = mongoose.model('package', packageSchema);

module.exports = { Package };
