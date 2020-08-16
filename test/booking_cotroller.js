const mongoose = require("mongoose"),
  { Booking } = require("../models/booking"),
  chai = require("chai"),
  chaiHttp = require("chai-http"),
  { app } = require("../app"),
  should = chai.should();

require("dotenv").config();
chai.use(chaiHttp);

let dummyBooking = new Booking({
  email: "joe@gmail.com",
  phone: "01024279414",
  personsNum: 10,
  BookingDegree: 1,
  tripName: "trip to  aswan",
});
before(function (done) {
  var uri = process.env.TEST_DB_URI_LOCAL;
  if (process.env.NODE_ENV === "production") {
    uri = encodeURI(process.env.TEST_DB_URI);
  }
  mongoose
    .connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(async () => {
      var Booking = new Booking({
        Bookingname: "mahmoud",
        email: "mah@gmail.com",
        password: "12345",
      });
      var result = await Booking.save();
      return result;
    })
    .then(() => {
      done();
    });
});
beforeEach(function (done) {
  Booking.deleteMany({}).then((err) => {
    done();
  });
});

describe("Booking-Controller", function () {
  /*
   ***save new Booking into the DB
   */
  describe("/booking/addNewBooking router", function () {
    it("it should save the Booking and return the result back", function (done) {
      chai
        .request(app)
        .post("/Booking/addNewBooking")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("email");
          res.body.should.have.property("phone");
          res.body.should.have.property("personsNum");
          res.body.should.have.property("BookingDegree");
          res.body.should.have.property("tripName");
          done();
        });
    });

    it("it should not save Booking if any data inputs is missed", function (done) {
      let Booking = {
        phone: "01024278721",
      };
      chai
        .request(app)
        .post("/Booking/addNewBooking")
        .send(Booking)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.name.should.have
            .property("message")
            .eql("Path 'email' is required.");

          done();
        });
    });
  });
  /*
   ***return all Bookings back to the client
   */
  describe("/Booking/getAllBookings router", function () {
    it("it should return all the Bookings in the DB", function (done) {
      chai
        .request(app)
        .get("/Booking/getAllBookings")
        .send(dummyBooking)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  /*
   ***return an Booking by ID
   */

  describe("/Booking/delete", function () {
    it("it should Delete a specific Booking by id", function (done) {
      let dummyBooking = new Booking({
        _id: "5e504c8dabb204334c267108",
        email: "joe@gmail.com",
        phone: "01024279414",
        personsNum: 10,
        BookingDegree: 1,
        tripName: "trip to  aswan",
      });
      dummyBooking.save((err, Booking) => {
        chai
          .request(app)
          .delete(`/Booking/delete`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("email");
            res.body.should.have.property("phone");
            res.body.should.have.property("personsNum");
            res.body.should.have.property("BookingDegree");
            res.body.should.have.property("tripName");
            done();
          });
      });
    });
  });
});

after(function (done) {
  Booking.deleteMany({})
    .then(() => {
      return mongoose.disconnect();
    })
    .then(() => {
      done();
    });
});
