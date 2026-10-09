const patientRepository = require("./patient.repository");

const createPatient = async (data) => {
  const patient = await patientRepository.createPatient(data);

  return patient;
};
const getPatients = async (search = "", page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const patients = await patientRepository.getPatients(search, limit, offset);

  const total = await patientRepository.countPatients(search);

  return {
    data: patients,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getPatientById = async (id) => {
  const patient = await patientRepository.getPatientById(id);

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};

const updatePatient = async (id, data) => {
  const patient = await patientRepository.getPatientById(id);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const updatedPatient = await patientRepository.updatePatient(id, data);

  return updatedPatient;
};

const deletePatient = async (id) => {
  const patient = await patientRepository.getPatientById(id);

  if (!patient) {
    throw new Error("Patient not found");
  }

  return await patientRepository.deletePatient(id);
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
