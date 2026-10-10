const patientService = require("./patient.service");

const createPatient = async (req, res) => {
  const patient = await patientService.createPatient(req.body);

  return res.status(201).json(patient);
};

const getPatients = async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;

  const patients = await patientService.getPatients(
    search,
    Number(page),
    Number(limit),
  );
  return res.status(200).json(patients);
};

const getPatientById = async (req, res) => {
  const { id } = req.params;

  const patient = await patientService.getPatientById(id);

  return res.status(200).json(patient);
};

const updatePatient = async (req, res) => {
  const { id } = req.params;

  const patient = await patientService.updatePatient(id, req.body);

  return res.status(200).json(patient);
};

const deletePatient = async (req, res) => {
  const { id } = req.params;

  const patient = await patientService.deletePatient(id);

  return res.status(200).json({
    message: "Patient deleted successfully",
    patient,
  });
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
