const mongoose = require("mongoose");

DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then((dats) => {
    console.log("Connnected to database successfully!!!");
  })
  .catch((err) => {
    console.error(err);
  });
