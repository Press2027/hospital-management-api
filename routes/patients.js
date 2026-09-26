const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth");
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

// POST create patient (Protected)
router.post("/", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Create a patient'
  // #swagger.security = [{"GitHubOAuth": []}]
  next();
}, isAuthenticated, patientsController.createPatient);

// PUT update patient (Protected)
router.put("/:id", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Update a patient'
  // #swagger.security = [{"GitHubOAuth": []}]
  next();
}, isAuthenticated, patientsController.updatePatient);

// DELETE patient (Protected)
router.delete("/:id", (req, res, next) => {
  // #swagger.tags = ['Patients']
  // #swagger.summary = 'Delete a patient'
  // #swagger.security = [{"GitHubOAuth": []}]
  next();
}, isAuthenticated, patientsController.deletePatient);

module.exports = router;