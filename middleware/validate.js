const validatePatient = (req, res, next) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    phone,
    email,
    bloodGroup,
    diagnosis,
    registeredDate
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !age ||
    !gender ||
    !phone ||
    !email ||
    !bloodGroup ||
    !diagnosis ||
    !registeredDate
  ) {
    return res.status(400).json({
      message: "All patient fields are required."
    });
  }

  next();
};

module.exports = {
  validatePatient
};