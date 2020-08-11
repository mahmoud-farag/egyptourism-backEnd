const router = require("express").Router();

const user_controller = require("../controller/user_controller");

// /login
router.route("/login").post(user_controller.login);
// /getAll
router.route("/getAll").get(user_controller.get_all);
// /getUser/:id
router.route("/getUser/:id").get(user_controller.getUserById);
// /signUp
router.route("/signUp").post(user_controller.signUp);
// /delete
router.route("/delete").delete(user_controller.deleteUser);
// /update/:id
router.route("/update/:id").put(user_controller.update);

module.exports = router;
