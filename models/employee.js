const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  gender: { type: String, required: true },
  photo: { type: String },
});

module.exports = mongoose.model(
  "Employees",
  EmployeeSchema,
  "employeeCollection"
);
