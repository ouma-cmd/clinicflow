const authService = require("./auth.service");


const login = async (req, res) => {
  try {

    const { email, password } = req.body;
    const result = await authService.login(
      email,
      password
    );
    return res.status(200).json(result);
  } catch (error) {

    return res.status(401).json({
      message: error.message
    });
  }
};

const me = async (req, res) => {

  return res.status(200).json({
    user: req.user
  });

};


module.exports = {
  login,
  me
};