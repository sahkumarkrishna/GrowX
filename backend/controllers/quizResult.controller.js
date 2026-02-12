import { QuizResult } from "../models/quizResult.model.js";

export const saveQuizResult = async (req, res) => {
  try {
    const { quizId, score, totalMarks, answers, timeTaken } = req.body;
    const percentage = Math.round((score / totalMarks) * 100);

    const result = await QuizResult.create({
      user: req.id,
      quiz: quizId,
      score,
      totalMarks,
      percentage,
      answers,
      timeTaken,
    });

    return res.status(201).json({ message: "Quiz result saved", result, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getUserQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.id })
      .populate("quiz", "title category level")
      .sort({ createdAt: -1 });
    return res.status(200).json({ results, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
