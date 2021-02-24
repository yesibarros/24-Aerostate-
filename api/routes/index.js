const express = require("express");

const Flights = require("../db/Flights");
const Airports = require("../db/Airports");
const User = require("../db/User");

const router = express.Router();

router.get("/flights", (req, res) => {
  Flights.find({})
    .populate("origin")
    .populate("destination")
    .then((flights) => res.send(flights))
    .catch((error) => res.status(500).send(error));
});

router.get("/airports", (req, res) => {
  Airports.find({})
    .then((airports) => res.send(airports))
    .catch((error) => res.status(500).send(error));
});

router.post("/login", (req, res) => {
  User.findOne({ name: "Tom Hanks" })
    .populate({
      path: "favorites",
      populate: { path: "origin destination" },
    })
    .then((user) => res.send(user))
    .catch((error) => res.status(500).send(error));
});

router.put("/favorites", (req, res) => {
  const { userId, flightId } = req.query;
  User.findOneAndUpdate(
    { _id: userId },
    { $push: { favorites: flightId } },
    { new: true }
  )
    .populate({
      path: "favorites",
      populate: { path: "origin destination" },
    })
    .then((user) => res.send(user))
    .catch((error) => res.status(500).send(error));
});

router.delete("/favorites", (req, res) => {
  const { userId, flightId } = req.query;
  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { favorites: flightId } },
    { new: true }
  )
    .populate({
      path: "favorites",
      populate: { path: "origin destination" },
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
