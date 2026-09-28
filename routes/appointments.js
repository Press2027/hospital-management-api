const express = require("express");
const router = express.Router();

const appointmentsController = require("../controllers/appointments");
const validateAppointment = require("../middleware/validateAppointment");
const { isAuthenticated } = require("../middleware/auth");

// GET all appointments
router.get(
  "/",
  isAuthenticated,
  appointmentsController.getAll
);

// GET appointment by ID
router.get(
  "/:id",
  isAuthenticated,
  appointmentsController.getSingle
);

// CREATE appointment
router.post(
  "/",
  isAuthenticated,
  validateAppointment,
  appointmentsController.createAppointment
);

// UPDATE appointment
router.put(
  "/:id",
  isAuthenticated,
  validateAppointment,
  appointmentsController.updateAppointment
);

// DELETE appointment
router.delete(
  "/:id",
  isAuthenticated,
  appointmentsController.deleteAppointment
);

module.exports = router;