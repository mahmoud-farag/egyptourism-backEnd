const express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	{ db } = require('./configerations/dbConfig'),
	user_router = require('./routes/user_router'),
	travel_raouter = require('./routes/travel_router'),
	cors = require('cors'),
	PORT = process.env.PORT || 4000,
	app = express();

require('dotenv').config()
app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === "production") {
	app.use(express.static('client/build'));
	app.get("*", (req, res) => {
		res.rendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}
app.use('/user', user_router);
app.use('/travls', travel_raouter)

app.listen(PORT, () => {
	console.log(`server running on port  ${PORT}`);
});


module.exports = { app }