const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET all patients
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .collection("patients")
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving patients.",
      error: err.message
    });
  }
};

// GET patient by ID
const getSingle = async (req, res) => {
  try {
    const patientId = req.params.id;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        message: "Invalid patient ID."
      });
    }

    const result = await mongodb
      .getDatabase()
      .collection("patients")
      .findOne({
        _id: new ObjectId(patientId)
      });

    if (!result) {
      return res.status(404).json({
        message: "Patient not found."
      });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving patient.",
      error: err.message
    });
  }
};

// CREATE patient
const createPatient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      address,
      emergencyContact,
      diagnosis
    } = req.body;

    // Check required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      age === undefined ||
      !gender ||
      !address ||
      !emergencyContact ||
      !diagnosis
    ) {
      return res.status(400).json({
        message: "All patient fields are required."
      });
    }

    const patient = {
      firstName,
      lastName,
      email,
      phone,
      age: Number(age),
      gender,
      address,
      emergencyContact,
      diagnosis
    };

    const result = await mongodb
      .getDatabase()
      .collection("patients")
      .insertOne(patient);

    res.status(201).json({
      message: "Patient created successfully.",
      patientId: result.insertedId
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating patient.",
      error: err.message
    });
  }
};

// UPDATE patient
const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        message: "Invalid patient ID."
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      address,
      emergencyContact,
      diagnosis
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      age === undefined ||
      !gender ||
      !address ||
      !emergencyContact ||
      !diagnosis
    ) {
      return res.status(400).json({
        message: "All patient fields are required."
      });
    }

    const updatedPatient = {
      firstName,
      lastName,
      email,
      phone,
      age: Number(age),
      gender,
      address,
      emergencyContact,
      diagnosis
    };

    const result = await mongodb
      .getDatabase()
      .collection("patients")
      .replaceOne(
        { _id: new ObjectId(patientId) },
        updatedPatient
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Patient not found."
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      message: "Error updating patient.",
      error: err.message
    });
  }
};

// DELETE patient
const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        message: "Invalid patient ID."
      });
    }

    const result = await mongodb
      .getDatabase()
      .collection("patients")
      .deleteOne({
        _id: new ObjectId(patientId)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Patient not found."
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      message: "Error deleting patient.",
      error: err.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createPatient,
  updatePatient,
  deletePatient
};