const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

var uri = process.env.localUri;

if (process.env.NODE_ENV === "production") {
  //   uri = encodeURI(process.env.ATLAS_URI);

  mongoose
    .connect(encodeURI(process.env.ATLAS_URI), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .catch((e) => {
      console.log(e);
    });
} else {
  // console.log('uri  :' + process.env.localUri);
  // mongoose.connect(uri, {
  //     useUnifiedTopology: true,
  //     useNewUrlParser: true,
  //     useCreateIndex: true
  // }).catch(e => {
  //     console.log(e);
  // });

  mongoose
    .connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .catch((e) => {
      console.log(e);
    });
}

var db = mongoose.connection;

module.exports = db;
