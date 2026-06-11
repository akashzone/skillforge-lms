
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const generateToken = (id)=>{
    return jwt.sign(
    { id },secret,
    { expiresIn: "1d" });
}
module.exports = generateToken;