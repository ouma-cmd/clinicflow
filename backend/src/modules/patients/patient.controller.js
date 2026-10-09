const patientService = require("./patient.service");

const createPatient = async (req, res) => {
  try {
    const patient = await patientService.createPatient(req.body);

    return res.status(201).json(patient);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getPatients = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const patients = await patientService.getPatients(
      search,
      Number(page),
      Number(limit),
    );
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await patientService.getPatientById(id);

    return res.status(200).json(patient);
  } catch (error) {
    if (error.message === "Patient not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await patientService.updatePatient(id, req.body);

    return res.status(200).json(patient);
  } catch (error) {
    if (error.message === "Patient not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await patientService.deletePatient(id);

    return res.status(200).json({
      message: "Patient deleted successfully",
      patient,
    });
  } catch (error) {
    if (error.message === "Patient not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
