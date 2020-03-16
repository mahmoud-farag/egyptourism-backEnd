const { User } = require('./../Users/user');


exports.Authentication = function (req, res, next) {

  var token = req.header('X-Auth');

  User.findByToken(token).then((user) => {

    if (!user) {
      //redirect the error 
      return promise.reject('not found');
    }

    console.log(user)
    req.user = user;
    req.token = token;
    next();
  }).catch((error) => {

    res.status(400).send(error);
  })



}

// module.exports = { Authentication }