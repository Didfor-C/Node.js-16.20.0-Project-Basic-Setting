const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 1 * 5 * 1000, // 5초
  max: 5, // 각 창당 10개의 요청으로 제한
  message: "limit each IP to 100 requests per windowMs.",
});

module.exports = rateLimiter;
