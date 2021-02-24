const faker = require("faker");

const { connection } = require("./db/connection");

const Flights = require("./db/Flights");
const Airports = require("./db/Airports");
const User = require("./db/User");

const setupSeed = async () => {
  console.log("SEED STARTING");

  // CREATE 10 AIRPORTS (actually cities)
  console.log("Airports Seed...");
  const fakeAirports = [];
  for (let i = 0; i < 10; i++) {
    fakeAirports.push({
      value: faker.address.city(),
    });
  }

  const airports = await Airports.create(fakeAirports);
  console.log("Airports Seeded Successfully");

  // CREATE FLIGHTS BETWEEN THOSE CITIES
  console.log("Flights Seed...");
  const fakeFlights = [];
  const len = airports.length;
  const getHours = () => {
    const date = new Date(faker.date.future());
    let hours = date.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}`;
  };

  for (let i = 0; i < 20; i++) {
    fakeFlights.push({
      origin: airports[Math.floor(Math.random() * len)],
      destination: airports[Math.floor(Math.random() * len)],
      departure: {
        day: faker.date.weekday(),
        hour: getHours(),
      },
      arrival: {
        day: faker.date.weekday(),
        hour: getHours(),
      },
      code: faker.random.number(6),
    });
  }

  const flightPromise = Flights.create(fakeFlights).then(() => {
    console.log("Airports Seeded Successfully");
  });

  // CREATING USER
  const userPromise = User.create({
    name: "Tom Hanks",
    img: "https://i.imgur.com/FIp0sgs.jpg?1",
  });

  return Promise.all([flightPromise, userPromise]);
};

try {
  connection.once("open", () => setupSeed().then(() => process.exit(0)));
} catch (err) {
  console.log("Somethin went wrong on the seed process", err.message);
  process.exit(1);
}
