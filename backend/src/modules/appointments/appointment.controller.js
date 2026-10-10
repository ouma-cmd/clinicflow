const appointmentService = require("./appointment.service");

const createAppointment = async (req, res) => {
  const appointment = await appointmentService.createAppointment(
    req.body,
    req.user.id,
  );

  return res.status(201).json(appointment);
};

const getAppointments = async (req, res) => {
  const { status = null, page = 1, limit = 10 } = req.query;

  const appointments = await appointmentService.getAppointments(
    status,
    Number(page),
    Number(limit),
  );

  return res.status(200).json(appointments);
};

const getAppointmentById = async (req, res) => {
  const { id } = req.params;

  const appointment = await appointmentService.getAppointmentById(id);

  return res.status(200).json(appointment);
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;

  const appointment = await appointmentService.updateAppointment(id, req.body);

  return res.status(200).json(appointment);
};

const cancelAppointment = async (req, res) => {
  const { id } = req.params;

  const appointment = await appointmentService.cancelAppointment(id);

  return res.status(200).json({
    message: "Appointment cancelled successfully",
    appointment,
  });
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
};
