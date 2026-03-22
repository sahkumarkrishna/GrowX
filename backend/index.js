import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./utils/db.js";
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
import path from "path";
import { fileURLToPath } from "url";
 
dotenv.config();
 
// ── __dirname fix for ES modules ───────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
 
const app = express();
 
// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
 
// ── CORS ───────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "https://growx.onrender.com",
  process.env.FRONTEND_URL,
].filter(Boolean);
 
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
 
// ── HTTP server + Socket.io ────────────────────────────────────────────────────
const server = http.createServer(app);
 
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});
 
// Make io accessible in every route via req.io
app.use((req, _res, next) => {
  req.io = io;
  next();
});
 
// Optional: basic socket connection log
io.on("connection", (socket) => {
  console.log(`⚡ Socket connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});
 
// ── API Routes ─────────────────────────────────────────────────────────────────
app.use("/api/v1/user",         userRoute);
app.use("/api/v1/company",      companyRoute);
app.use("/api/v1/job",          jobRoute);
app.use("/api/v1/application",  applicationRoute);
app.use("/api/v1/quiz",         quizRoute);
app.use("/api/v1/quiz-result",  quizResultRoute);
app.use("/api/v1/saved-job",    savedJobRoute);
app.use("/api/v1/ats",          atsAnalysisRoute);
app.use("/api/v1/internship",   internshipRoute);
app.use("/api/contact",         contactRoute);
app.use("/api/resumes",         resumeRoutes);
app.use("/api/tasks",           taskRoutes);
 
// ── Serve React frontend (production) ─────────────────────────────────────────
const distPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(distPath));
 
// All non-API routes → React app (client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
 
// ── Start ──────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8000;
 
server.listen(PORT, async () => {   // ← server.listen, NOT app.listen
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});