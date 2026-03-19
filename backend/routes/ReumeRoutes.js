import express from "express";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
  getMyResumes,
} from "../controllers/ResumeController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, createResume);
router.get("/", getAllResumes);                          // admin: all resumes
router.get("/my", isAuthenticated, getMyResumes);       // user: own resumes
router.get("/:id", getResumeById);
router.put("/update/:id", isAuthenticated, updateResume);
router.delete("/:id", isAuthenticated, deleteResume);

export default router;
