const appointmentService = require("./appointment.service");

const createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment(
      req.body,
      req.user.id,
    );

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const { status = null, page = 1, limit = 10 } = req.query;

    const appointments = await appointmentService.getAppointments(
      status,
      Number(page),
      Number(limit),
    );

    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentService.getAppointmentById(id);

    return res.status(200).json(appointment);
  } catch (error) {
    if (error.message === "Appointment not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentService.updateAppointment(
      id,
      req.body,
    );

    return res.status(200).json(appointment);
  } catch (error) {
    if (error.message === "Appointment not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(400).json({
      message: error.message,
    });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentService.cancelAppointment(id);

    return res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    if (error.message === "Appointment not found") {
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
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
};
