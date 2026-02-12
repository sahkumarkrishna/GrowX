import express from "express";
import { saveQuizResult, getUserQuizResults } from "../controllers/quizResult.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/save", isAuthenticated, saveQuizResult);
router.get("/user", isAuthenticated, getUserQuizResults);

export default router;
