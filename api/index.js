import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config({ path: "./.env" });

import admin from "firebase-admin";
if (!admin.apps.length && process.env.FIREBASE_PROJECT_ID) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  } catch (err) {
    console.error("Firebase Admin init error:", err.message);
  }
}

import connectDB from "../backend/utils/db.js";
import { verifyMailer } from "../backend/utils/mailer.js";

import userRoute from "../backend/routes/user.route.js";
import companyRoute from "../backend/routes/company.route.js";
import jobRoute from "../backend/routes/job.route.js";
import applicationRoute from "../backend/routes/application.route.js";
import contactRoute from "../backend/routes/contactRoutes.js";
import resumeRoutes from "../backend/routes/ReumeRoutes.js";
import taskRoutes from "../backend/routes/taskRoutes.js";
import quizRoute from "../backend/routes/quiz.route.js";
import quizResultRoute from "../backend/routes/quizResult.route.js";
import savedJobRoute from "../backend/routes/savedJob.route.js";
import atsAnalysisRoute from "../backend/routes/atsAnalysis.route.js";
import internshipRoute from "../backend/routes/internship.route.js";
import aiChatRoute from "../backend/routes/aiChat.route.js";
import categoryRoute from "../backend/routes/category.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbConnected = false;

async function initDB() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
    console.log("Connected to DB");
    if (process.env.VERIFY_EMAIL === "true") {
      verifyMailer();
    }
  }
}

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "*",
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cookieParser());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
  });
  app.use(limiter);

  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/company", companyRoute);
  app.use("/api/v1/job", jobRoute);
  app.use("/api/v1/application", applicationRoute);
  app.use("/api/contact", contactRoute);
  app.use("/api/resumes", resumeRoutes);
  app.use("/api/tasks", taskRoutes);
  app.use("/api/v1/quiz", quizRoute);
  app.use("/api/v1/quiz-result", quizResultRoute);
  app.use("/api/v1/saved-job", savedJobRoute);
  app.use("/api/v1/ats", atsAnalysisRoute);
  app.use("/api/v1/internship", internshipRoute);
  app.use("/api/v1/ai-chat", aiChatRoute);
  app.use("/api/v1/category", categoryRoute);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message });
  });

  return app;
}

const app = createApp();

export default app;
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function handler(req, res) {
  try {
    await initDB();
    await app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
