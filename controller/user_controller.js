const _ = require("lodash"),
  { User } = require("./../models/user"),
  bcrypt = require("bcryptjs");

exports.login = async (req, res, next) => {
  try {
    var email = req.body.email;
    var user = await User.findOne({ email });
    console.log(user);
    var result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      try {
        var token = await user.genAuthToken();
        const nameAndEmail = {
          name: user.name,
          email: user.email,
        };
        res.header("Auth", token).status(200).send(nameAndEmail);
      } catch (e) {
        res.status(401).json(e);
      }
    } else {
      res.status(401).send("unAuthorized user");
    }
  } catch (e) {
    res.status(401).json(e);
  }
};

exports.get_all = async (req, res) => {
  try {
    var users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    var user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).send("user not found");
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signUp = async (req, res) => {
  try {
    var body = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    // _.pick(req.body, ["name", "email", "password"]);
    console.log(body);
    var user = new User(body);
    var result = await user.save();
    // console.log("result:  " + result);
    var token = await user.genAuthToken();
    var obj = {
      _id: result._id,
      name: result.name,
      email: result.email,
      tokens: result.tokens,
    };
    res.header("Auth", token).status(200).send(obj);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.errmsg);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    var email = req.body.email;
    console.log("email" + email);
    var user = await User.findOne(email);
    console.log("deleted user" + user);
    if (!user) {
      res.status(400).send("user not found");
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.update = async (req, res) => {
  try {
    var user = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
      res.status(400).send("user not found");
    } else {
      user.username = req.body.username ? req.body.username : user.username;
      user.email = req.body.email ? req.body.email : user.email;
      user.password = req.body.password ? req.body.password : user.password;
      var updatedUser = await user.save();
      res.status(200).send(updatedUser);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
// module.exports = { login, get_all, getUserById, signUp, deleteUser, update }
