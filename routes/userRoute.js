const express = require("express");

const userRouter = express.Router();
const { userRegister, userLogin } = require("../controllers/user");
const { loginRegisterLimiter } = require("../middlewares/rateLimiter");

userRouter.use(loginRegisterLimiter);

// Register a new user
userRouter.post("/register", userRegister);

// Login an existing user
userRouter.post("/login", userLogin);

module.exports = { userRouter };
