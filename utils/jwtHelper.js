const jwt = require("jsonwebtoken");

const options = {
  algorithm: process.env.JWT_ALG,
  expiresIn: process.env.JWT_EXP,
  issuer: process.env.JWT_ISSUER,
};

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, options);

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);

module.exports = { signToken, verifyToken };
