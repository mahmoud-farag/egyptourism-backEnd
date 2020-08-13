let mongoose = require("mongoose"),
  ObjectID = require("mongodb").ObjectID;

var travelSchema = new mongoose.Schema({
  image: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  price: {
    type: Number,
  },
});

Travel = mongoose.model("travels", travelSchema);
module.exports = { Travel };

////////////////////////////////
////////////////////////////////
//////////////////////////////////
