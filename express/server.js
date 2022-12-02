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

app.get("/", async (request, response) => {
  console.log("hey");
  response.send({ hello: "world" });
});

const employeeRoutes = require("./routes/employee");

//middleware
app.use("/.netlify/functions/server", employeeRoutes);
module.exports = app;
//module.exports.handler = serverless(app);
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  // mongoose.connect(process.env.DATABASE_URL);
  mongoose.connect(
    "mongodb+srv://tharinduI:1122Tharidu@employeecluster.mt38mgw.mongodb.net/employee?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  // you can do other things here
  const result = await handler(event, context);
  // and here
  return result;
};
