const express = require("express");
const mongoose = require("mongoose");
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

app.get("/", async (request, response) => {
  console.log("hey");
  response.send({ hello: "employee manager server" });
});

const employeeRoutes = require("./routes/employee");

//middleware
app.use("/", employeeRoutes);
module.exports = app;
