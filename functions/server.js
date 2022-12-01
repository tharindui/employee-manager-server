const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const app = express();
const cors = require("cors");
require("dotenv/config");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://tharinduI:1122Tharidu@employeecluster.mt38mgw.mongodb.net/employee?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const employeeRoutes = require("../express/routes/employee");

//middleware
app.use("/employee", employeeRoutes);

module.exports.handler = serverless(app);
