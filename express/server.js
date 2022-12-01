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
app.use(bodyParser.json());
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("db connected ........");
});

const employeeRoutes = require("./routes/employee");

//middleware
app.use("/.netlify/functions/server", employeeRoutes);

module.exports = app;
module.exports.handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
