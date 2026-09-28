const validateAppointment = (req, res, next) => {
  const {
    patientId,
    doctorName,
    appointmentDate,
    appointmentTime,
    department,
    reason
  } = req.body;

  // Required fields
  if (
    !patientId ||
    !doctorName ||
    !appointmentDate ||
    !appointmentTime ||
    !department ||
    !reason
  ) {
    return res.status(400).json({
      message: "All appointment fields are required."
    });
  }

  // Validate patient ID
  const { ObjectId } = require("mongodb");

  if (!ObjectId.isValid(patientId)) {
    return res.status(400).json({
      message: "Invalid patient ID."
    });
  }

  // Validate appointment date
  if (isNaN(Date.parse(appointmentDate))) {
    return res.status(400).json({
      message: "Invalid appointment date."
    });
  }

  // Validate appointment time
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timeRegex.test(appointmentTime)) {
    return res.status(400).json({
      message: "Invalid appointment time. Use HH:MM format."
    });
  }

  next();
};

module.exports = validateAppointment;