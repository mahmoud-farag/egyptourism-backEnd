const mongoose = require('mongoose')

mongoose.Promise =global.Promise;
var mongoDB = 'mongodb://127.0.0.1:27017/egyptourism';
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
 var db = mongoose.connection;

module.exports = (db);
