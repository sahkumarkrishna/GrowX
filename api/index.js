import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
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
    console.log("Firebase Admin initialized");
  } catch (err) {
    console.error("Firebase Admin init error:", err.message);
  }
}

import connectDB from "./utils/db.js";
import { verifyMailer } from "./utils/mailer.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import contactRoute from "./routes/contactRoutes.js";
import resumeRoutes from "./routes/ReumeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import quizRoute from "./routes/quiz.route.js";
import quizResultRoute from "./routes/quizResult.route.js";
import savedJobRoute from "./routes/savedJob.route.js";
import atsAnalysisRoute from "./routes/atsAnalysis.route.js";
import internshipRoute from "./routes/internship.route.js";
import aiChatRoute from "./routes/aiChat.route.js";
import categoryRoute from "./routes/category.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");
    
    if (process.env.VERIFY_EMAIL === "true") {
      verifyMailer();
    }

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
