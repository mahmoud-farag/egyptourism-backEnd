const router = require("express").Router(),
  travel_controller = require("./../controller/travel_controller");

// travels/addTrip
router.route("/addTrip").post(travel_controller.addNewTrip);
// travels/getTrips
router.route("/getTrips").get(travel_controller.getTrips);
// travels/getTrip
router.route("/getTrip/:id").get(travel_controller.getTrip);
// travels/deleteTrip
router.route("/deleteTrip").delete(travel_controller.deleteTrip);

module.exports = router;
