const mongoose = require("mongoose");

function databaseConnect(uri) {
  return new Promise((resolve, reject) => {
    // if (process.env.NODE_ENV === "test") {
    //   const Mockgoose = require("mockgoose").Mockgoose;
    //   const mockgoose = new Mockgoose(mongoose);

    //   mockgoose.prepareStorage().then(() => {
    //     mongoose
    //       .connect(uri, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         useFindAndModify: false,
    //         useCreateIndex: true,
    //       })
    //       .then((res, err) => {
    //         if (err) return reject(err);
    //         resolve();
    //       });
    //   });
    // } else {
      mongoose
        .connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    // }
  });
}

function databaseClose() {
  return mongoose.disconnect();
}

module.exports = { databaseConnect, databaseClose };
