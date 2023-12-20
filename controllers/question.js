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
    res.status(201).json({
      message: "Question created successfully",
      question: savedQuestion,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function getActiveQuiz(req, res) {
  try {
    const currentDate = new Date();
    
    // Add 5 hours and 30 minutes to the current date to make it IST
    currentDate.setHours(currentDate.getHours() + 5);
    currentDate.setMinutes(currentDate.getMinutes() + 30);

    // console.log(currentDate);

    const activeQuiz = await questionModel.findOne({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    if (!activeQuiz) {
      return res.status(404).json({ message: "No active quiz found at the moment" });
    }

    res.json({
      message: "Active quiz found",
      activeQuiz,
      currentTimeIST: currentDate.toISOString(),
    });
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

    // console.log(endDate, fiveMinutesAfterEnd);
    const currDate = new Date();

    // Add 5 hours and 30 minutes to the current date to make it IST
    currDate.setHours(currDate.getHours() + 5);
    currDate.setMinutes(currDate.getMinutes() + 30);

    if (currDate < fiveMinutesAfterEnd) {
      return res.status(403).json({ message: "Results not available yet" });
    }

    res.json({
      message: "Quiz results available",
      question: quiz.question,
      correctAnswer: quiz.options[quiz.rightAnswer],
      quizId: quiz._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getAllQuizzes(req, res) {
  try {
    const allQuizzes = await questionModel.find();

    if (!allQuizzes || allQuizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found", status: 404 });
    }

    res.status(200).json({
      message: "Quizzes retrieved successfully",
      totalQuizzes: allQuizzes.length,
      quizzes: allQuizzes,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", status: 500, error: error.message });
  }
}


module.exports = { newQuestion, getActiveQuiz, getQuizResult, getAllQuizzes };
