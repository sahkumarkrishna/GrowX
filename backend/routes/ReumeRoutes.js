// routes/resumeRoutes.js
import express from "express";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/ResumeController.js";

const router = express.Router();

router.post("/", createResume);   // ✅ now create works
router.get("/", getAllResumes);
router.get("/:id", getResumeById);
router.put("/update/:id", updateResume);

router.delete("/:id", deleteResume);

export default router;
