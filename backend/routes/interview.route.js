import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  scheduleInterview,
  getInterviews,
  getCandidateInterviews,
  getInterviewById,
  getInterviewByRoom,
  updateInterviewStatus,
  submitEvaluation,
  logProctoringEvent,
  submitFeedback,
  cancelInterview,
  getInterviewAnalytics,
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} from "../controllers/Interview.controller.js";

const router = express.Router();

// ─── Interview Routes ────────────────────────────────────────────────────────
router.post("/schedule", isAuthenticated, scheduleInterview);
router.get("/all", isAuthenticated, getInterviews);
router.get("/my", isAuthenticated, getCandidateInterviews);
router.get("/analytics", isAuthenticated, getInterviewAnalytics);
router.get("/room/:roomId", isAuthenticated, getInterviewByRoom);
router.get("/:id", isAuthenticated, getInterviewById);
router.put("/:id/status", isAuthenticated, updateInterviewStatus);
router.put("/:id/evaluate", isAuthenticated, submitEvaluation);
router.put("/:id/proctor", isAuthenticated, logProctoringEvent);
router.put("/:id/feedback", isAuthenticated, submitFeedback);
router.delete("/:id/cancel", isAuthenticated, cancelInterview);

// ─── Question Bank Routes ────────────────────────────────────────────────────
router.post("/questions", isAuthenticated, createQuestion);
router.get("/questions/all", isAuthenticated, getQuestions);
router.put("/questions/:id", isAuthenticated, updateQuestion);
router.delete("/questions/:id", isAuthenticated, deleteQuestion);

export default router;