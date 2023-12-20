const express = require("express");
const {
  newQuestion,
  getActiveQuiz,
  getQuizResult,
  getAllQuizzes,
} = require("../controllers/question");
const { quizLimiter } = require("../middlewares/rateLimiter");

const questionRouter = express.Router();

questionRouter.use(quizLimiter);

questionRouter.post("/", newQuestion);
questionRouter.get("/active", getActiveQuiz);
questionRouter.get("/:id/result", getQuizResult);
questionRouter.get("/all", getAllQuizzes);

module.exports = { questionRouter };
