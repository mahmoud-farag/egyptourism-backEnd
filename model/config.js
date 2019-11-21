const mongoose = require('mongoose')


var mongoDB = 'mongodb://127.0.0.1:27017/egyptourism';
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
 var db = mongoose.connection;
// mongoose.connect('mongodb://localhost:27017/Egyptourism');


module.exports = (db);