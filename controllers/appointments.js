const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .collection("appointments")
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving appointments.",
      error: err.message
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid appointment ID."
      });
    }

    const result = await mongodb
      .getDatabase()
      .collection("appointments")
      .findOne({
        _id: new ObjectId(req.params.id)
      });

    if (!result) {
      return res.status(404).json({
        message: "Appointment not found."
      });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving appointment.",
      error: err.message
    });
  }
};

const createAppointment = async (req, res) => {
  try {
    const appointment = {
      patientId: req.body.patientId,
      doctorName: req.body.doctorName,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      department: req.body.department,
      reason: req.body.reason,
      status: req.body.status || "Scheduled"
    };

    if (
      !appointment.patientId ||
      !appointment.doctorName ||
      !appointment.appointmentDate ||
      !appointment.appointmentTime ||
      !appointment.department ||
      !appointment.reason
    ) {
      return res.status(400).json({
        message: "Required appointment fields are missing."
      });
    }

    const response = await mongodb
      .getDatabase()
      .collection("appointments")
      .insertOne(appointment);

    res.status(201).json({
      message: "Appointment created successfully.",
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating appointment.",
      error: err.message
    });
  }
};

const updateAppointment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid appointment ID."
      });
    }

    const appointment = {
      patientId: req.body.patientId,
      doctorName: req.body.doctorName,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      department: req.body.department,
      reason: req.body.reason,
      status: req.body.status || "Scheduled"
    };

    const response = await mongodb
      .getDatabase()
      .collection("appointments")
      .replaceOne(
        { _id: new ObjectId(req.params.id) },
        appointment
      );

    if (!response.matchedCount) {
      return res.status(404).json({
        message: "Appointment not found."
      });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      message: "Error updating appointment.",
      error: err.message
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid appointment ID."
      });
    }

    const response = await mongodb
      .getDatabase()
      .collection("appointments")
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (!response.deletedCount) {
      return res.status(404).json({
        message: "Appointment not found."
      });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      message: "Error deleting appointment.",
      error: err.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAppointment,
  updateAppointment,
  deleteAppointment
};