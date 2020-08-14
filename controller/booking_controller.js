const { Booking } = require("./../models/Booking");

exports.addNewBooking = async (req, res) => {
  try {
    // extract newBooking from req body
    let newBooking = {
      email: req.body.email,
      phone: req.body.phone,
      personsNum: req.body.personsNum,
      travelDegree: req.body.travelDegree,
      tripName: req.body.tripName,
    };
    // take new object from bookingSchema
    let booking = new Booking(newBooking);
    //save the newBooking
    let result = await booking.save();

    //return the res
    if (result) {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(403).send(error);
  }
};

exports.getAllBooking = async (req, res) => {
  let email = req.body.email;
  // console.log("email: " + email);
  try {
    let result = await Booking.find({ email });
    // console.log("result: " + result);
    if (result) {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(403).send(error);
  }
};

exports.deleteBooking = async (req, res) => {
  var _id = req.body._id;
  try {
    var result = await Booking.findByIdAndRemove(_id);

    if (!result) {
      res.status(400).send(" not found");
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
