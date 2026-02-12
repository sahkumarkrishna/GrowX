import express from "express";
import { createQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz } from "../controllers/quiz.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, createQuiz);
router.get("/all", getAllQuizzes);
router.get("/:id", getQuizById);
router.put("/:id", isAuthenticated, updateQuiz);
router.delete("/:id", isAuthenticated, deleteQuiz);

export default router;
