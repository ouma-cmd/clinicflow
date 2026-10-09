const express = require("express");
const cors = require("cors");
const router = require("./src/modules/auth/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", router);

app.get("/", (req, res) => {
  res.json({
    message: "ClinicFlow API is running"
  });
});


module.exports = app;