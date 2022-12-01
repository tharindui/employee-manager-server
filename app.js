const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const serverless = require("serverless-http");
require("dotenv/config");

app.use(bodyParser.json());
app.use(cors());
//Import routes
const employeeRoutes = require("./routes/employee");

//middleware
app.use("/employee", employeeRoutes);

app.get("/", (req, res) => {
  res.send("we are on home");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("db connected ........");
});

module.exports.handler = serverless(app);
//app.listen(9999);
