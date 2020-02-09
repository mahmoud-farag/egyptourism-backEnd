const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { db } = require('./configerations.js/dbConfig');
const user_router = require('./routes/user_router');
const travel_raouter = require('./routes/travel_router')
const cors = require('cors');
require('dotenv').config()
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static('client/build'));
	app.get("*", (req, res) => {
		res.rendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}
app.use('/user', user_router);
app.get('/user', (req, res) => {
	res.send('Egyptorism')
})
app.use('/travls', travel_raouter)

app.listen(PORT, () => {
	console.log(`server running on port  ${PORT}`);
});



module.exports = { app }