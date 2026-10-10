const authService = require("./auth.service");

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  return res.status(200).json(result);
};

const me = async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};

module.exports = {
  login,
  me,
};
