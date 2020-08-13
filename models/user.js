const mongoose = require("mongoose"),
  validator = require("validator"),
  jwt = require("jsonwebtoken"),
  _ = require("lodash"),
  bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: `{value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
/**
 * the User model methods
 */

UserSchema.statics.findByToken = function (token) {
  var UserModel = this;
  var decoded;

  try {
    decoded = jwt.verify(token, "egyptourism");
    console.log(decoded);
  } catch {
    // return new Promise((resolve,reject)=>{
    //        reject();
    //  })
    return Promise.reject("invalide token");
  }
  return UserModel.findOne({
    _id: decoded._id,
    "tokens.access": decoded.access,
    "tokens.token": token,
  });
};

//generating the Authentication token for each user
UserSchema.methods.genAuthToken = function () {
  var userInstance = this;
  var access = "Auth";

  var token = jwt
    .sign({ _id: userInstance._id.toHexString(), access }, "egyptourism")
    .toString();

  // userInstance.tokens =userInstance.tokens.concat([{access,token}])
  userInstance.tokens.push({ access, token });

  //???
  return userInstance.save().then(() => {
    return token;
  });
};

//override method toJSON to customize which data will be send to the user
UserSchema.methods.toJSON = function () {
  var user = this;
  //  var userObj = user.toObject();
  return _.pick(user, ["username", "email", "password", "tokens"]);
};

//hashing the password useing the preproccessing
UserSchema.pre("save", function (next) {
  //i does not use arrow func to be able to use 'this' keyword
  var user = this;
  //do hashing process only if the password has modified
  if (user.isModified("password")) {
    //generate salting
    bcrypt.genSalt(5, (error, salt) => {
      // if(error)  return promise.reject();
      bcrypt.hash(user.password, salt, (error, hash) => {
        // if(error) return promise.reject();
        user.password = hash;

        next();
      });
    });
  } else {
    //continue execute the callback queue
    next();
  }
});

User = mongoose.model("user", UserSchema);

module.exports = { User };
