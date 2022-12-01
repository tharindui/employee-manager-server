const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
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

mongoose.connect(
  "CTION=mongodb+srv://tharinduI:1122Tharidu@employeecluster.mt38mgw.mongodb.net/employee?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("db connected ........");
  }
);

app.listen(9999);
