const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

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

module.exports = router;
