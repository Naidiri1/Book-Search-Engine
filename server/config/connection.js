const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/googlebooks',
  {
    useNewUrlParser: false,
    useUnifiedTopology: false,
  }
);

module.exports = mongoose.connection;


