const {
  Travel,
  addTrip,
  findTrip,
  getAllTrips,
} = require("./../models/travels");
const travels = require("./../models/travels");

exports.addNewTrip = async (req, res) => {
  try {
    let newTrip = {
      image: req.body.image,
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      price: req.body.price,
    };

    console.log("newTrip: " + newTrip);

    let trip = new Travel(newTrip);
    let result = await trip.save();

    if (result) {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(402).send(error);
  }
};

exports.getTrips = async (req, res) => {
  try {
    var trips = await Travel.find();
    res.status(200).send(trips);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getTrip = async (req, res) => {
  let _id = req.params.id;
  try {
    var trip = await Travel.findOne({ _id });
    if (trip) {
      res.status(200).send(trip);
    } else {
      res.status(403).send("item not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    var _id = req.body._id;
    console.log("_id" + _id);
    var trip = await Travel.findByIdAndRemove(_id);

    console.log("deleted trip:" + trip);
    if (!trip) {
      res.status(400).send("trip not found");
    } else {
      res.status(200).send(trip);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
// module.exports = {

//     displayAllReservations,
//     dispalyClientReservation,
//     reservInNewTrip,
//     cancleReservation

// }
