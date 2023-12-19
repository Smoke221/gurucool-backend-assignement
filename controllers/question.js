const questionModel = require("../models/questionModel"); // Make sure to replace with the correct path to your model

async function newQuestion(req, res) {
  try {
    const { question, options, rightAnswer, startDate, endDate } = req.body;
    const newQuestionInstance = new questionModel({
      question,
      options,
      rightAnswer,
      startDate,
      endDate,
    });
    const savedQuestion = await newQuestionInstance.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function getActiveQuiz(req, res) {
  try {
    const currentDate = new Date();
    const activeQuiz = await questionModel.findOne({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    if (!activeQuiz) {
      return res.status(404).json({ message: "No active quiz found" });
    }

    res.json(activeQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getQuizResult(req, res) {
  try {
    const quizId = req.params.id;
    const quiz = await questionModel.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const endDate = new Date(quiz.endDate);
    const fiveMinutesAfterEnd = new Date(endDate.getTime() + 5 * 60000);

    if (new Date() < fiveMinutesAfterEnd) {
      return res.status(403).json({ message: "Results not available yet" });
    }

    res.json({
      correctAnswer: quiz.options[quiz.rightAnswer],
      // Add additional information if needed
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllQuizzes(req, res) {
  try {
    const allQuizzes = await questionModel.find();
    res.json(allQuizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { newQuestion, getActiveQuiz, getQuizResult, getAllQuizzes };
