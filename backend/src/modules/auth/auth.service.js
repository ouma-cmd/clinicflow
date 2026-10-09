const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRepository = require("./auth.repository");


const login = async (email, password) => {

  const user = await authRepository.findByEmail(email);

  if (!user) {
    throw new Error("Email ou password incorrect");
  }

const isPasswordValid = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isPasswordValid) {
    throw new Error("Email ou password incorrect");
  }

 const token = jwt.sign(
  {
    id: user.id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);


return {
  token,
  user: {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    role: user.role
  }
};
};


module.exports = {
  login
};