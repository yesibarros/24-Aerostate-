const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AirportSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
});

const Airports = mongoose.model("Airports", AirportSchema);

module.exports = Airports;
