const express = require("express");
const router = express.Router();

const patientsController = require("../controllers/patients");

router.get("/", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Get all patients'
  next();
}, patientsController.getAll);

router.get("/:id", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Get patient by ID'
  next();
}, patientsController.getSingle);

router.post("/", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Create a patient'
  next();
}, patientsController.createPatient);

router.put("/:id", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Update a patient'
  next();
}, patientsController.updatePatient);

router.delete("/:id", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Delete a patient'
  next();
}, patientsController.deletePatient);

module.exports = router;