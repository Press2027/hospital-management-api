const validateAppointment = (req, res, next) => {
  const {
    patientId,
    doctorName,
    appointmentDate,
    appointmentTime,
    reason,
    status
  } = req.body;

  if (
    !patientId ||
    !doctorName ||
    !appointmentDate ||
    !appointmentTime ||
    !reason ||
    !status
  ) {
    return res.status(400).json({
      message: "All appointment fields are required."
    });
  }

  next();
};

module.exports = validateAppointment;