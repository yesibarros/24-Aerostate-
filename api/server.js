const express = require("express");
const morgan = require("morgan");

const rutas = require("./routes");
const { connection } = require("./db/connection");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api", rutas);

const PORT = process.env.PORT || 3001;

connection.once("open", function () {
  app.listen(PORT, () => console.log(`server listenning on port ${PORT}`));
});
