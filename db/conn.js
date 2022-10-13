const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Connection to MongoDB is successfull");
  })
  .catch((err) => {
    console.log("No Connection");
  });
