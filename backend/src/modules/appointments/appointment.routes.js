const express = require("express");

const appointmentController = require("./appointment.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const {
  createAppointmentSchema,
  updateAppointmentSchema,
} = require("./appointment.validation");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validate(createAppointmentSchema),
  appointmentController.createAppointment,
);

router.get("/", authMiddleware, appointmentController.getAppointments);

router.get("/:id", authMiddleware, appointmentController.getAppointmentById);

router.put(
  "/:id",
  authMiddleware,
  validate(updateAppointmentSchema),
  appointmentController.updateAppointment,
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  appointmentController.cancelAppointment,
);
module.exports = router;
