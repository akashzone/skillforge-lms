const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
function generateToken(id,role) {
  return jwt.sign(
    {
      id,
      role
    },
    secret,
    { expiresIn: "1d" },
  );
};
module.exports = generateToken;
