require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/sweets", require("./routes/sweet.routes"));

module.exports = app;
