const mongoUrl = process.env.MONGODB_URI
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

 mongoose.connect(mongoUrl, {useMongoClient: true,})
 .then( () => console.log('database connected'))
 .catch( err => console.log(err))

module.exports = mongoose
