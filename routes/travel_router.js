const router = require('express').Router();



const travel_controller = require('./../controller/travel_controller');



router.route('/').get(travel_controller.displayAllReservations)







module.exports = router;