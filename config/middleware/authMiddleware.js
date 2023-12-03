const { verifyToken } = require("../../utils/jwtHelper");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Please provide a valid token" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = verifyToken(token);
    console.log("AuthMiddleware - Decoded : " + JSON.stringify(decoded));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = authMiddleware;
