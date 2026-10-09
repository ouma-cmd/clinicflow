const pool = require("../../config/database");

const createPatient = async (patient) => {
  const result = await pool.query(
    `
  INSERT INTO patients
  (
    full_name,
    cin,
    phone,
    birth_date,
    address
  )
  VALUES
  ($1, $2, $3, $4, $5)
  RETURNING *
  `,
    [
      patient.fullName,
      patient.cin,
      patient.phone,
      patient.birthDate,
      patient.address,
    ],
  );
  return result.rows[0];
};
const getPatients = async (search, limit, offset) => {
  const result = await pool.query(
    `
    SELECT *
    FROM patients
    WHERE deleted_at IS NULL
    AND (
      full_name ILIKE $1
      OR cin ILIKE $1
    )
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
    `,
    [`%${search}%`, limit, offset],
  );

  return result.rows;
};

const countPatients = async (search) => {
  const result = await pool.query(
    `
    SELECT COUNT(*)
    FROM patients
    WHERE deleted_at IS NULL
    AND (
      full_name ILIKE $1
      OR cin ILIKE $1
    )
    `,
    [`%${search}%`],
  );

  return Number(result.rows[0].count);
};

const getPatientById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM patients
    WHERE id = $1
    AND deleted_at IS NULL
    `,
    [id],
  );

  return result.rows[0];
};

const updatePatient = async (id, patient) => {
  const result = await pool.query(
    `
    UPDATE patients
    SET
      full_name = $1,
      cin = $2,
      phone = $3,
      birth_date = $4,
      address = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    AND deleted_at IS NULL
    RETURNING *
    `,
    [
      patient.fullName,
      patient.cin,
      patient.phone,
      patient.birthDate,
      patient.address,
      id,
    ],
  );

  return result.rows[0];
};

const deletePatient = async (id) => {
  const result = await pool.query(
    `
    UPDATE patients
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  createPatient,
  getPatients,
  countPatients,
  getPatientById,
  updatePatient,
  deletePatient
};
