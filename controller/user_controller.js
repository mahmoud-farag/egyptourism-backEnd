const _ = require('lodash');
const { User } = require('./../models/user');
const bcrypt = require('bcryptjs');

var login = async (req, res, next) => {

    try {
        var email = req.body.email
        var user = await User.findOne({ email });
        var result = await bcrypt.compare(req.body.password, user.password);

        if (result) {
            try {
                var token = await user.genAuthToken();
                res.header('X-Auth', token).status(200).send(user);
            } catch (e) {
                res.status(401).json(e)
            }
        } else {
            res.status(401).send('unAuthorized user');
        }
    } catch (e) {
        res.status(401).json(e)
    }
}

var get_all = async (req, res) => {

    try {
        var users = await User.find();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(400).send(error);
    }
}

var getUserById = async (req, res) => {

    try {

        var user = await User.findById(req.params.id);

        if (!user) {
            res.status(400).send('user not found');
        } else {

            res.status(200).send(user);

        }
    } catch (error) {
        res.status(500).send(error);
    }
}

var signUp = async (req, res) => {

    try {
        var body = _.pick(req.body, ['username', 'email', 'password']);

        var user = new User(body)
        var result = await user.save();
        var token = await user.genAuthToken();
        res.header('X-Auth', token).status(200).send(result);
    } catch (error) {
        res.status(400).send(error)
    }
}
var deleteUser = async (req, res) => {
    try {
        var user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(400).send('user not found');
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
var update = async (req, res) => {
    try {
        var user = await User.findByIdAndUpdate(req.params.id);
        if (!user) {
            res.status(400).send("user not found")
        } else {
            user.username = (req.body.username) ? req.body.username : user.username,
                user.email = (req.body.email) ? req.body.email : user.email,
                user.password = (req.body.password) ? req.body.password : user.password
            var updatedUser = await user.save();
            res.status(200).send(updatedUser);
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
module.exports = { login, get_all, getUserById, signUp, deleteUser, update }