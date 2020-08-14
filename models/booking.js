let mongoose = require("mongoose");

var bookingSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  personsNum: {
    type: Number,
    required: true,
    trim: true,
  },
  travelDegree: {
    type: Number,
    required: true,
    trim: true,
  },
  tripName: {
    type: String,
    required: true,
    trim: true,
  },
});

Booking = mongoose.model("Booking", bookingSchema);
module.exports = { Booking };

////////////////////////////////
////////////////////////////////
//////////////////////////////////
