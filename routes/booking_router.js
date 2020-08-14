const router = require("express").Router(),
  booking_controller = require("./../controller/booking_controller");

// booking/addNewBooking
router.route("/addNewBooking").post(booking_controller.addNewBooking);
// booking/getClientBooking
router.route("/getClientBooking").post(booking_controller.getAllBooking);
// booking/deleteBooking
router.route("/deleteBooking").delete(booking_controller.deleteBooking);

module.exports = router;
