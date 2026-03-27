import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config({ path: "./.env" });

let app;

async function getApp() {
  if (app) return app;
  
  app = express();
  
  app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }));
  app.use(helmet());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  
  const { default: userRoute } = await import("../backend/routes/user.route.js");
  const { default: companyRoute } = await import("../backend/routes/company.route.js");
  const { default: jobRoute } = await import("../backend/routes/job.route.js");
  const { default: applicationRoute } = await import("../backend/routes/application.route.js");
  const { default: contactRoute } = await import("../backend/routes/contactRoutes.js");
  const { default: resumeRoutes } = await import("../backend/routes/ReumeRoutes.js");
  const { default: taskRoutes } = await import("../backend/routes/taskRoutes.js");
  const { default: quizRoute } = await import("../backend/routes/quiz.route.js");
  const { default: quizResultRoute } = await import("../backend/routes/quizResult.route.js");
  const { default: savedJobRoute } = await import("../backend/routes/savedJob.route.js");
  const { default: atsAnalysisRoute } = await import("../backend/routes/atsAnalysis.route.js");
  const { default: internshipRoute } = await import("../backend/routes/internship.route.js");
  const { default: aiChatRoute } = await import("../backend/routes/aiChat.route.js");
  const { default: categoryRoute } = await import("../backend/routes/category.route.js");

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

let dbConnected = false;
async function initDB() {
  if (!dbConnected) {
    const { default: connectDB } = await import("../backend/utils/db.js");
    await connectDB();
    dbConnected = true;
    console.log("Connected to DB");
    const { verifyMailer } = await import("../backend/utils/mailer.js");
    if (process.env.VERIFY_EMAIL === "true") {
      verifyMailer();
    }
  }
}

export default async function handler(req, res) {
  try {
    await initDB();
    const app = await getApp();
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
