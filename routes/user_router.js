const express = require('express');
const router = express.Router();

const user_controller = require('../controller/user_controller');

router.route('/').post(user_controller.login);

router.route('/getAll').get(user_controller.get_all);

router.route('/:id').get(user_controller.getUserById);

router.route('/signup').post(user_controller.signUp);

router.route('/:id').delete(user_controller.deleteUser);

router.route('/:id').put(user_controller.update);

module.exports = router;
