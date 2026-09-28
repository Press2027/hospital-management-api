const express = require("express");
const router = express.Router();

const appointmentsController = require("../controllers/appointments");
const validateAppointment = require("../middleware/validateAppointment");

router.get("/", appointmentsController.getAll);
router.get("/:id", appointmentsController.getSingle);

router.post(
  "/",
  validateAppointment,
  appointmentsController.createAppointment
);

router.put(
  "/:id",
  validateAppointment,
  appointmentsController.updateAppointment
);

router.delete(
  "/:id",
  appointmentsController.deleteAppointment
);

module.exports = router;