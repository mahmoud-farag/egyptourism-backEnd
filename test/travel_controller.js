const mongoose = require("mongoose"),
  { Travel } = require("../models/travel"),
  chai = require("chai"),
  chaiHttp = require("chai-http"),
  { app } = require("../app"),
  should = chai.should();

require("dotenv").config();
chai.use(chaiHttp);

let dummyTrip = new Travel({
  _id: "5e504c8dabb204334c267108",
  image: "https://www.pexels.com/photo/photo-of-great-pyramid-of-giza-1166011/",
  name: "trip to aswan",
  description: "a fantastic trip",
  date: "11-11-202",
  price: 10000,
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
      var user = new User({
        username: "mahmoud",
        email: "mah@gmail.com",
        password: "12345",
      });
      var result = await user.save();
      return result;
    })
    .then(() => {
      done();
    });
});
beforeEach(function (done) {
  Travel.deleteMany({}).then((err) => {
    done();
  });
});

describe("Travel-Controller", function () {
  /*
   ***save new trip into the DB
   */
  describe("/travel/addTrip router", function () {
    it("it should save the user and return the result back", function (done) {
      chai
        .request(app)
        .post("/travel/addNewTrip")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("image");
          res.body.should.have.property("name");
          res.body.should.have.property("description");
          res.body.should.have.property("date");
          res.body.should.have.property("price");
          done();
        });
    });

    it("it should not save trip if any data inputs is missed", function (done) {
      let trip = {
        name: "trip to aswan",
      };
      chai
        .request(app)
        .post("/user/signUp")
        .send(trip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.name.should.have
            .property("message")
            .eql("Path 'd' is required.");
          done();
        });
    });
  });
  /*
   ***return all trips back to the client
   */
  describe("/travel/getAllTrips router", function () {
    it("it should return all the trips in the DB", function (done) {
      chai
        .request(app)
        .get("/travel/getAllTrips")
        .send(dummyTrip)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  /*
   ***return an user by ID
   */

  describe("/travel/delete", function () {
    it("it should Delete a specific trip by id", function (done) {
      let dummyTrip = new Travel({
        _id: "5e504c8dabb204334c267108",
        image:
          "https://www.pexels.com/photo/photo-of-great-pyramid-of-giza-1166011/",
        name: "trip to aswan",
        description: "a fantastic trip",
        date: "11-11-202",
        price: 10000,
      });
      dummyTrip.save((err, user) => {
        chai
          .request(app)
          .delete(`/travel/delete`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("image");
            res.body.should.have.property("name");
            res.body.should.have.property("description");
            res.body.should.have.property("date");
            res.body.should.have.property("price");
            done();
          });
      });
    });
  });
});

after(function (done) {
  Travel.deleteMany({})
    .then(() => {
      return mongoose.disconnect();
    })
    .then(() => {
      done();
    });
});
