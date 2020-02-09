const user_router = require("../routes/user_router");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("user", user_router);

it("index route works", done => {
    request(app)
        .get("user/getAll")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(done())
});


// it("testing route works", done => {
//     request(app)
//         .post("/test")
//         .type("form")
//         .send({ item: "hey" })
//         .then(() => {
//             request(app)
//                 .get("/test")
//                 .expect({ array: ["hey"] }, done);
//         });
// });