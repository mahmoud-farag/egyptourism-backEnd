let mongoose = require('mongoose');

let travelSchema = mongoose.Schema;

travelSchema = new mongoose.Schema({

    username: {

        type: String,
        required: true,
        trim: true,
        minlength: 1

    },
    email: {

        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {


            validator: validator.isEmail,
            message: `{value} is not a valid email`
        }


    },
    startDay: {

        type: Date,
        required: true,
    },
    endDay: {

        type: Date,
        required: true,
    },
    // tokens: [{

    //     access: {
    //         type: String,
    //         required: true
    //     },
    //     token: {
    //         type: String,
    //         required: true
    //     }


    // }]
});

let travel = mongoose.model('travels', travelSchema)


module.exports = { travel }