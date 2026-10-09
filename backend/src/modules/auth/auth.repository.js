const pool = require("../../config/database");


const findByEmail = async (email) => {

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];

};


module.exports = {
  findByEmail
};