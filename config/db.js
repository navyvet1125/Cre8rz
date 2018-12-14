var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var mongoUrl = process.env.MONGODB_URI

 mongoose.connect(mongoUrl, {
  useMongoClient: true,
})
 .then(function(){
 	console.log('database connected')
 })
 .catch(function(err){
    console.log(err)
})

module.exports = mongoose
