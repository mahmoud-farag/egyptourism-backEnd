const mongoose = require('mongoose'),
    { User } = require('../models/user'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    { app } = require('../app'),
    should = chai.should();

require('dotenv').config();
chai.use(chaiHttp);
let dummyUser = new User({
    "_id": "5e504c8dabb204334c267108",
    "username": "joe",
    "email": "joe@gmail.com",
    "password": "joe123"
})
before(function (done) {
    var uri = process.env.TEST_DB_URI_LOCAL;
    if (process.env.NODE_ENV === "production") {
        uri = encodeURI(process.env.TEST_DB_URI);
    }
    mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(async () => {
        var user = new User({
            username: 'mahmoud',
            email: 'mah@gmail.com',
            password: '12345'
        })
        var result = await user.save();
        return result
    }).then(() => {
        done()
    })
})
beforeEach(function (done) {
    User.deleteMany({}).then((err) => {
        done()
    })
})
describe('user-controller', function () {
    /*
     ***return users from DB
    */
    describe('/user/getAll route', function () {
        it('it should return all users from the DB', function (done) {
            chai.request(app)
                .get('/user/getAll')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done()
                })
        })
    })
    /*
     ***SignUp
    */
    describe('/user/signUp route', function () {
        it('it should save new user into the DB', function (done) {
            chai.request(app)
                .post('/user/signUp')
                .send(dummyUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('tokens');
                    // res.header.should.have.property('Auth')
                    done()
                })
        })
        it('it should not save a user if any credintals are missed', function (done) {
            let user = {
                username: 'joe',
                password: '123435'
            }
            chai.request(app)
                .post('/user/signUp')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.email.should.have.property('message').eql("Path `email` is required.")
                    done()
                })
        })
    })
    /*
     ***return an user by ID
    */
    describe('/user/getUser/id', function () {
        it('it should return only one user from DB by ID', function (done) {
            dummyUser.save().then((err, user) => {
                chai.request(app)
                    .get(`/user/getUser/5e504c8dabb204334c267108`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('username').eql('joe');
                        res.body.should.have.property('email').eql('joe@gmail.com');
                        done()
                    })
            }).catch((err) => {
                console.log(err);
            })
        })
        it('it should not return any user if id malformed or the user not exist', function (done) {
            dummyUser.save().then((err, user) => {
                //sending wronge id
                chai.request(app)
                    .get(`/user/getUser/5e504c8dabb204334c267102`)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.to.not.have.property('username');
                        res.body.should.to.not.have.property('email');
                        res.body.should.to.not.have.property('password')
                        done()
                    })
            }).catch((err) => {
                console.log(err);
            })
        })
    })

})

/*
 ***Update user
*/
describe('/user/update/id', function () {
    it('it should update the current user by ID', function (done) {
        let dummyUser = new User({
            "_id": "5e504c8dabb204334c267108",
            "email": "joe@gmail.com",
            "username": "joe",
            "password": "joe1234"
        })
        dummyUser.save((err, user) => {
            chai.request(app)
                .put(`/user/update/${user._id}`)
                .send({
                    "username": "joeeeeeee",
                    "email": "joeeeeeee@gmail.com",
                    "password": "joeeeeeee123"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username').eql('joeeeeeee');
                    res.body.should.have.property('email').eql("joeeeeeee@gmail.com");
                    res.body.should.have.property('password');
                    done();
                });
        });
    })
})
/*
 ***Delete user
*/
describe('/user/delete/id', function () {
    it('it should Delete the current user by ID', function (done) {
        let dummyUser = new User({
            "_id": "5e504c8dabb204334c267108",
            "email": "joe@gmail.com",
            "username": "joe",
            "password": "joe1234"
        })
        dummyUser.save((err, user) => {
            chai.request(app)
                .delete(`/user/delete/${user._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('tokens');
                    done();
                });
        });
    })
})

after(function (done) {

    User.deleteMany({}).then(() => {
        return mongoose.disconnect();
    }).then(() => {
        done()
    })
})