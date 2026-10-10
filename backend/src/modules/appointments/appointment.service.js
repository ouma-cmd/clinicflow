const appointmentRepository = require("./appointment.repository");

const createAppointment = async (data, userId) => {
  const conflict = await appointmentRepository.checkAppointmentConflict(
    data.patientId,
    data.appointmentDate,
  );

  if (conflict) {
    throw new Error(
      "Patient already has a confirmed appointment within 30 minutes",
    );
  }

  const appointment = await appointmentRepository.createAppointment({
    ...data,

    createdBy: userId,

    status: "pending",
  });

  return appointment;
};

const getAppointments = async (status = null, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const appointments = await appointmentRepository.getAppointments(
    status,
    limit,
    offset,
  );

  return appointments;
};

const getAppointmentById = async (id) => {
  const appointment = await appointmentRepository.getAppointmentById(id);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  return appointment;
};

const updateAppointment = async (id, data) => {
  const appointment = await appointmentRepository.getAppointmentById(id);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (data.status === "confirmed") {
    const conflict = await appointmentRepository.checkAppointmentConflict(
      appointment.patient_id,
      data.appointmentDate,
    );

    if (conflict && conflict.id !== id) {
      throw new Error(
        "Patient already has a confirmed appointment within 30 minutes",
      );
    }
  }

  return await appointmentRepository.updateAppointment(id, data);
};

const cancelAppointment = async (id) => {
  const appointment = await appointmentRepository.getAppointmentById(id);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  return await appointmentRepository.cancelAppointment(id);
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
};
