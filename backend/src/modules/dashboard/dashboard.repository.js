const pool = require("../../config/database");

const getTotalPatients = async () => {
  const result = await pool.query(
    `
    SELECT COUNT(*) 
    FROM patients
    WHERE deleted_at IS NULL
    `,
  );

  return Number(result.rows[0].count);
};

const getAppointmentStats = async () => {
  const result = await pool.query(
    `
    SELECT 
      status,
      COUNT(*)

    FROM appointments

    GROUP BY status
    `,
  );

  return result.rows;
};

const getTodayAppointments = async () => {
  const result = await pool.query(
    `
    SELECT COUNT(*)
    FROM appointments
    WHERE appointment_date::date = CURRENT_DATE
    `,
  );

  return Number(result.rows[0].count);
};

module.exports = {
  getTotalPatients,
  getAppointmentStats,
  getTodayAppointments,
};
