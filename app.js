var express = require("express");

const connectDB = require("./config/db");
const middlewareSetup = require("./config/middleware");

var app = express();

// trust proxy 설정 활성화
app.set("trust proxy", 1);

// Database setup
connectDB();

// Middleware setup
middlewareSetup(app);

// Routes setup
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// Handle unknown routes
app.use((req, res, next) => {
  res.status(404).send({ error: "Not Found" });
});

// 일반 오류 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Internal Server Error" });
});

// 처리되지 않은 약속 거부 처리
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
});

module.exports = app;
