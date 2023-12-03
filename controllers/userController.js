const bcrypt = require("bcrypt");

const User = require("../models/User");
const { signToken } = require("../utils/jwtHelper");

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 6); // 6회 솔팅
    req.body.password = hashedPassword;

    const user = new User(req.body);
    user["time"] = new Date(); //회원가입일 기록

    await user.save();
    res.status(201).send("회원가입 성공");
  } catch (error) {
    res
      .status(400)
      .send({ error: "Registration failed", message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !bcrypt.compare(req.body.password, user.password)) {
      return res.status(401).send({
        error: "Login failed",
        message: "Incorrect email or password",
      });
    }
    const token = signToken({ userId: user._id });
    res.status(201).send({
      userInfo: {
        username: user.username,
        userID: user.userID,
        poneNumber: user.poneNumber,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).send({ error: "Login error", message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(201).send(user);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching user profile", message: error.message });
  }
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "poneNumber", "email", "password"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: "Update failed", message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
};
