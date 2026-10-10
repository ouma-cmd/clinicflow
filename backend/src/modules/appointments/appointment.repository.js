const pool = require("../../config/database");

const checkAppointmentConflict = async (patientId, appointmentDate) => {
  const result = await pool.query(
    `
    SELECT *
    FROM appointments
    WHERE patient_id = $1
    AND status = 'confirmed'
    AND appointment_date BETWEEN 
        $2::timestamp - INTERVAL '30 minutes'
        AND $2::timestamp + INTERVAL '30 minutes'
    `,
    [patientId, appointmentDate],
  );

  return result.rows[0];
};

const createAppointment = async (appointment) => {
  const result = await pool.query(
    `
    INSERT INTO appointments
    (
      patient_id,
      created_by,
      appointment_date,
      status,
      reason,
      notes
    )
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      appointment.patientId,
      appointment.createdBy,
      appointment.appointmentDate,
      appointment.status,
      appointment.reason,
      appointment.notes,
    ],
  );

  return result.rows[0];
};

const getAppointments = async (status, limit, offset) => {
  const result = await pool.query(
    `
    SELECT 
      a.*,
      p.full_name AS patient_name,
      u.full_name AS created_by_name

    FROM appointments a

    JOIN patients p
      ON p.id = a.patient_id

    JOIN users u
      ON u.id = a.created_by

    WHERE a.status = COALESCE($1, a.status)

    ORDER BY a.appointment_date DESC

    LIMIT $2 OFFSET $3
    `,
    [status, limit, offset],
  );

  return result.rows;
};

const getAppointmentById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      a.*,
      p.full_name AS patient_name,
      u.full_name AS created_by_name

    FROM appointments a

    JOIN patients p
      ON p.id = a.patient_id

    JOIN users u
      ON u.id = a.created_by

    WHERE a.id = $1
    `,
    [id],
  );

  return result.rows[0];
};

const updateAppointment = async (id, appointment) => {
  const result = await pool.query(
    `
    UPDATE appointments
    SET
      appointment_date = $1,
      status = $2,
      reason = $3,
      notes = $4,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *
    `,
    [
      appointment.appointmentDate,
      appointment.status,
      appointment.reason,
      appointment.notes,
      id,
    ],
  );

  return result.rows[0];
};

const cancelAppointment = async (id) => {
  const result = await pool.query(
    `
    UPDATE appointments
    SET
      status = 'cancelled',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  checkAppointmentConflict,
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
};
