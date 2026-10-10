const express = require("express");

const patientController = require("./patient.controller");
const validate = require("../../middlewares/validate.middleware");
const { createPatientSchema } = require("./patient.validation");
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");

const router = express.Router();



router.post(
  "/",
  authMiddleware,
  validate(createPatientSchema),
  patientController.createPatient,
);
/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     tags:
 *       - Patients
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", authMiddleware, patientController.getPatients);

router.get("/:id", authMiddleware, patientController.getPatientById);

router.put(
  "/:id",
  authMiddleware,
  validate(createPatientSchema),
  patientController.updatePatient,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  patientController.deletePatient,
);
module.exports = router;
