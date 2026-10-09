const pool = require("../../config/database")

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
    patient.address
  ]
);
return result.rows[0];
};

module.exports = {
    createPatient
}