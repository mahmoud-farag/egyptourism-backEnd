const mongoose = require('mongoose');
require('dotenv').config()
// const option = {
// 	socketTimeoutMS: 30000,
// 	keepAlive: true,
// 	reconnectTries: 30000
// };
mongoose.Promise = global.Promise;

var uri = ''

var ATLAS_URI = 'mongodb+srv://egyptorism:mongoDBegyptorism$%@cluster0-mxclo.mongodb.net/test?retryWrites=true&w=majority';
var localUri = 'mongodb://127.0.0.1:27017/egyptourism'


if (process.env.NODE_ENV === "production") {

	uri = encodeURI(ATLAS_URI);

}
else {
	uri = localUri
}


mongoose.connect(uri, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}).catch(e => {
	console.log(e);
});
var db = mongoose.connection;

module.exports = db;

const x = 'd';

