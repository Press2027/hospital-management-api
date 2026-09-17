const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

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

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid patient ID."
      });
    }

    const result = await mongodb
      .getDatabase()
      .collection("patients")
      .findOne({
        _id: new ObjectId(req.params.id)
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

const createPatient = async (req, res) => {
  try {
    const patient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      address: req.body.address,
      emergencyContact: req.body.emergencyContact
    };

    if (
      !patient.firstName ||
      !patient.lastName ||
      !patient.email ||
      !patient.phone ||
      !patient.dateOfBirth ||
      !patient.gender ||
      !patient.address ||
      !patient.emergencyContact
    ) {
      return res.status(400).json({
        message: "All patient fields are required."
      });
    }

    const response = await mongodb
      .getDatabase()
      .collection("patients")
      .insertOne(patient);

    res.status(201).json({
      message: "Patient created successfully.",
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating patient.",
      error: err.message
    });
  }
};

const updatePatient = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid patient ID."
      });
    }

    const patient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      address: req.body.address,
      emergencyContact: req.body.emergencyContact
    };

    if (
      !patient.firstName ||
      !patient.lastName ||
      !patient.email ||
      !patient.phone ||
      !patient.dateOfBirth ||
      !patient.gender ||
      !patient.address ||
      !patient.emergencyContact
    ) {
      return res.status(400).json({
        message: "All patient fields are required."
      });
    }

    const response = await mongodb
      .getDatabase()
      .collection("patients")
      .replaceOne(
        { _id: new ObjectId(req.params.id) },
        patient
      );

    if (!response.matchedCount) {
      return res.status(404).json({
        message: "Patient not found."
      });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      message: "Error updating patient.",
      error: err.message
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid patient ID."
      });
    }

    const response = await mongodb
      .getDatabase()
      .collection("patients")
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (!response.deletedCount) {
      return res.status(404).json({
        message: "Patient not found."
      });
    }

    res.sendStatus(204);
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