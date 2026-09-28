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

  // Check required fields
  if (
    !firstName ||
    !lastName ||
    age === undefined ||
    !gender ||
    !phone ||
    !email ||
    !diagnosis 
  ) {
    return res.status(400).json({
      message: "All patient fields are required."
    });
  }

  // Validate age
  if (isNaN(age) || Number(age) <= 0) {
    return res.status(400).json({
      message: "Age must be a positive number."
    });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email address."
    });
  }



  next();
};

module.exports = {
  validatePatient
};