// Mongoose connection
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/aerostate", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
