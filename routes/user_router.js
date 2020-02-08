const router = require('express').Router();

const user_controller = require('../controller/user_controller');

router.route('/login').post(user_controller.login);

router.route('/getAll').get(user_controller.get_all);

router.route('/getUser/:id').get(user_controller.getUserById);

router.route('/signUp').post(user_controller.signUp)

router.route('/delete/:id').delete(user_controller.deleteUser);

router.route('/update/:id').put(user_controller.update);

module.exports = router;
