const app = require("./../app");
require("dotenv").config();
const pool = require("./config/database");

pool.query("SELECT NOW()")
  .then(result => {
    console.log(result.rows);
  })
  .catch(error => {
    console.error(error);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});