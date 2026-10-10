const { z } = require("zod");

const createAppointmentSchema = z.object({
  patientId: z.string().uuid(),

  appointmentDate: z.string(),

  reason: z.string().min(3),

  notes: z.string().optional(),
});

const updateAppointmentSchema = z.object({
  appointmentDate: z.string(),

  status: z.enum(["pending", "confirmed", "cancelled"]),

  reason: z.string().min(3),

  notes: z.string().optional(),
});

module.exports = {
  createAppointmentSchema,
  updateAppointmentSchema
};
