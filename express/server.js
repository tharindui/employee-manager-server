"use strict";
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
const router = express.Router();
require("dotenv/config");
const employeeRoutes = require("./routes/employee");

//middleware
app.use("/employee", employeeRoutes);
app.use(bodyParser.json());
//app.use("/.netlify/functions/server", router); // path must route to lambda
//app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("db connected ........");
});
module.exports = app;
module.exports.handler = serverless(app);
