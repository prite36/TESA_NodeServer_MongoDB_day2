var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/allTeamData', {
  useMongoClient: true,
  /* other options */
});

module.exports = mongoose;
