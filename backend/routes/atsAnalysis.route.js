import express from "express";
import { checkATS, getUserATSHistory, uploadResumeFile } from "../controllers/atsAnalysis.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.post("/check", isAuthenticated, checkATS);
router.post("/upload", isAuthenticated, singleUpload, uploadResumeFile);
router.get("/history", isAuthenticated, getUserATSHistory);

export default router;
