// const user_router = require("../routes/user_router");
// const { User } = require('./../models/user');
// const request = require("supertest");
// const expect = require('expect');
// const { db } = require('../configerations/dbConfig');
// const express = require("express");
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use("user", user_router);



// let dummyData = [{
//     username: "ali",
//     pasword: "ali",
//     email: "ali@gmail.com"
// }, {
//     username: "joe",
//     pasword: "joe",
//     email: "joe@gmail.com"
// }
// ]


// // beforeEach(async function (done) {
// //     try {
// //         let result = await User.remove({});
// //         User.insertMany(dummyData);
// //     } catch (err) {
// //         return done(err)
// //     }

// // })

// describe('Get /user/getAll', function (done) {
//     it("this route should return all users ", function (done) {
//         request(app)
//             .get("user/getAll")
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             // .expect((res)=>{
//             //     expect(res.body()).toContain()
//             // })
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     }).timeout(20000);

// })

// // describe('Post /user/login', function () {
// //     it('this route should complete the auth and authrization for logging on', function (done) {
// //         request(app)
// //             .post('/user/login')
// //             .auth('username', 'password')
// //             .set('Accept', 'application/json')
// //             .expect('Content-Type', /json/)
// //             .expect(200)
// //             .end(function (err, res) {
// //                 if (err) return done(err);
// //                 done();
// //             });
// //     });
// // });

// // describe('Get user/getUser/:id', () => {

// //     it('this route should return only the current user', (done) => {
// //         request(app)
// //             .get('/user/getUser/:id')
// //             .end(function (err, res) {
// //                 if (err) return done(err);
// //                 done();
// //             });
// //     })
// // })


// // describe('Delete user/delete/:id', () => {

// //     it('this route should remove only the current user', (done) => {
// //         request(app)
// //             .delete('/user/delete/:id')

// //             .end(function (err, res) {
// //                 if (err) return done(err);
// //                 done();
// //             });
// //     })
// // })

// // describe('Put user/update/:id', () => {

// //     it('this route should update only the current user', (done) => {
// //         request(app)
// //             .put('/user/update/:id')


// //             .end(function (err, res) {
// //                 if (err) return done(err);
// //                 done();
// //             });
// //     })
// // })
