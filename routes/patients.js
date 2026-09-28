const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth");
const { validatePatient } = require("../middleware/validatePatient");
const patientsController = require("../controllers/patients");

// GET all patients
router.get("/", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Get all patients'
  next();
}, patientsController.getAll);

// GET patient by ID
router.get("/:id", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Get patient by ID'
  next();
}, patientsController.getSingle);

// POST create patient (Protected + Validation)
router.post("/", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Create a patient'
  next();
}, isAuthenticated, validatePatient, patientsController.createPatient);

// PUT update patient (Protected + Validation)
router.put("/:id", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Update a patient'
  next();
}, isAuthenticated, validatePatient, patientsController.updatePatient);

// DELETE patient (Protected)
router.delete("/:id", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Delete a patient'
  next();
}, isAuthenticated, patientsController.deletePatient);

module.exports = router;