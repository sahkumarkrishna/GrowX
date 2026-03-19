import express from "express";
import multer from "multer";
import { applyInternship, getAllInternships, updateInternshipStatus, deleteInternship } from "../controllers/internship.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/apply", upload.single("resume"), applyInternship);              // public
router.get("/all", isAuthenticated, getAllInternships);                        // admin
router.patch("/status/:id", isAuthenticated, updateInternshipStatus);         // admin
router.delete("/:id", isAuthenticated, deleteInternship);                     // admin

export default router;
