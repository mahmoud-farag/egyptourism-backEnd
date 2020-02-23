const mongoose = require('mongoose');
require('dotenv').config()
// const option = {
// 	socketTimeoutMS: 30000,
// 	keepAlive: true,
// 	reconnectTries: 30000
// };
mongoose.Promise = global.Promise;

var uri = process.env.localUri;

if (process.env.NODE_ENV === "production") {

    uri = encodeURI(process.env.ATLAS_URI);

}

// console.log('uri  :' + process.env.localUri);
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).catch(e => {
    console.log(e);
});
var db = mongoose.connection;

module.exports = db;


