import { Quiz } from "../models/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { title, description, category, categoryImage, level, timeLimit, questions } = req.body;

    if (!title || !category || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Title, category, and questions are required", success: false });
    }

    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 1), 0);

    const quiz = await Quiz.create({
      title,
      description,
      category,
      categoryImage: categoryImage || "",
      level,
      timeLimit,
      totalMarks,
      questions,
      createdBy: req.id,
    });

    return res.status(201).json({ message: "Quiz created successfully", quiz, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const { category, level } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (level) filter.level = level;

    const quizzes = await Quiz.find(filter).populate("createdBy", "fullname email").sort({ createdAt: -1 });
    return res.status(200).json({ quizzes, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("createdBy", "fullname email");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }
    return res.status(200).json({ quiz, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { title, description, category, categoryImage, level, timeLimit, questions } = req.body;
    
    const updateData = { title, description, category, categoryImage, level, timeLimit, questions };
    if (questions) {
      updateData.totalMarks = questions.reduce((sum, q) => sum + (q.marks || 1), 0);
    }

    const quiz = await Quiz.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }

    return res.status(200).json({ message: "Quiz updated successfully", quiz, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }
    return res.status(200).json({ message: "Quiz deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
