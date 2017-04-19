var mongoose = require('mongoose');
mongoose.Promise = Promise;
var mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, function(err){
  if(err){
    throw err;
  }
  console.log('database connected');
});

module.exports = mongoose;
