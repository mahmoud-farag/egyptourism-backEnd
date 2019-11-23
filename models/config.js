const mongoose = require('mongoose')


mongoose.Promise =global.Promise;
var mongoDB = 'mongodb://127.0.0.1:27017/egyptourism';
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
 var db = mongoose.connection;



module.exports = (db);


// var config = {
//     local: {
//         mode: 'local',
//         port: 3000
//     },
//     staging: {
//         mode: 'staging',
//         port: 4000
//     },
//     production: {
//         mode: 'production',
//         port: 5000
//     }
// }
// module.exports = function(mode) {
//     return config[mode || process.argv[2] || 'local'] || config.local;
// }