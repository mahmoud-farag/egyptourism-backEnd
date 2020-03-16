const nodemailer = require("nodemailer");
require('dotenv').config();

exports.endEmail = (destination, subject) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    let mailOptions = {
        from: "mahqwerty31@gmail.com",
        to: destination,
        subject: subject,
    }

    return transporter.sendMail(mailOptions).then((err, data) => {
        if (err)
            return Promise.reject(err)
        return data
    })
}

    //testing the function logic 
// sendEmail('mahmoud32salamn@gmail.com', "you are amazing").then((result) => {

//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });