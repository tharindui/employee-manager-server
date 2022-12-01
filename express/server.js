const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

const Schema = mongoose.Schema;
mongoose.connect(
  "mongodb+srv://tharinduI:1122Tharidu@employeecluster.mt38mgw.mongodb.net/employee?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("db connected ........");
  }
);
const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  gender: { type: String, required: true },
  photo: { type: String },
});

const Employee = mongoose.model(
  "Employees",
  EmployeeSchema,
  "employeeCollection"
);

router.get("/", (req, res) => {
  res.json({
    hello: "hi!",
  });
});

//GET ALL EMPLOYEES
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET EMPLOYEE BY ID
router.get("/:empId", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.empId);
    res.json(employee);
  } catch (err) {
    res.json({ message: err });
  }
});

//REMOVE EMPLOYEE
router.delete("/:empId", async (req, res) => {
  try {
    const removedEmployee = await Employee.remove({
      _id: req.params.empId,
    });
    res.json(removedEmployee);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE EMPLOYEE
router.patch("/:empId", async (req, res) => {
  try {
    const updatedEmployee = await Employee.updateOne(
      {
        _id: req.params.empId,
      },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          number: req.body.number,
          gender: req.body.gender,
          photo: req.body.photo,
        },
      }
    );
    res.json(updatedEmployee);
  } catch (err) {
    res.json({ message: err });
  }
});

//ADD NEW EMPLOYEE
router.post("/", async (req, res) => {
  const employee = new Employee({
    firstName: req.body.firstName || "",
    lastName: req.body.lastName || "",
    email: req.body.email || "",
    number: req.body.number || "",
    gender: req.body.gender || "",
    photo: req.body.photo || "",
  });
  try {
    const savedEmployee = await employee.save();
    res.json(savedEmployee);
  } catch (err) {
    res.json({ message: err });
  }
});

app.use(bodyParser.json());
app.use(`/.netlify/functions/server`, router);

module.exports = app;
module.exports.handler = serverless(app);
