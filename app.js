const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { consfig } = require('./models/config');
const user_router = require('./routes/user_router');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//getall users
app.use('/user', user_router);
//getUserById
app.use('/getUser', user_router);
//signUp
app.use('/user', user_router);
//delete User
app.use('/user', user_router);
//update user
app.use('/updateUser', user_router);
//login route
app.use('/login', user_router);

app.listen(PORT, () => {
	console.log(`server running on port  ${PORT}`);
});
