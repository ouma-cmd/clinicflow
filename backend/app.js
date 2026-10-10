const express = require("express");
const cors = require("cors");
const router = require("./src/modules/auth/auth.routes");
const patientRoutes = require("./src/modules/patients/patient.routes");
const appointmentRoutes = require("./src/modules/appointments/appointment.routes");
const dashboard = require("./src/modules/dashboard/dashboard.routes")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/dashboard", dashboard);

app.get("/", (req, res) => {
  res.json({
    message: "ClinicFlow API is running",
  });
});

module.exports = app;
