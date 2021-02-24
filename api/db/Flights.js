const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DateSchema = {
  day: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
};

const FlightSchema = new Schema({
  origin: {
    type: Schema.Types.ObjectId,
    ref: "Airports",
  },
  destination: {
    type: Schema.Types.ObjectId,
    ref: "Airports",
  },
  departure: DateSchema,
  arrival: DateSchema,
  code: {
    type: Number,
    required: true,
  },
});

const Flights = mongoose.model("Flights", FlightSchema);

module.exports = Flights;
