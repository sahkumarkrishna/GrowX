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

// ── __dirname fix for ES modules ───────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ── Load env vars FIRST — before any other local imports ──────────────────────
dotenv.config({ path: path.join(__dirname, "../.env") });

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
    console.log("🔥 Firebase Admin initialized");
  } catch (err) {
    console.error("Firebase Admin init error:", err.message);
  }
}

import connectDB from "./utils/db.js";
import { verifyMailer } from "./utils/mailer.js";

import userRoute         from "./routes/user.route.js";
import companyRoute      from "./routes/company.route.js";
import jobRoute          from "./routes/job.route.js";
import applicationRoute  from "./routes/application.route.js";
import contactRoute      from "./routes/contactRoutes.js";
import resumeRoutes      from "./routes/ReumeRoutes.js";
import taskRoutes        from "./routes/taskRoutes.js";
import quizRoute         from "./routes/quiz.route.js";
import quizResultRoute   from "./routes/quizResult.route.js";
import savedJobRoute     from "./routes/savedJob.route.js";
import atsAnalysisRoute  from "./routes/atsAnalysis.route.js";
import internshipRoute   from "./routes/internship.route.js";
import aiChatRoute      from "./routes/aiChat.route.js";
import categoryRoute    from "./routes/category.route.js";

const app = express();

// ── Security Headers (Helmet) ──────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// ── CORS ───────────────────────────────────────────────────────────────────────
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:7000",
    "https://growx.onrender.com",
    "https://www.growx.onrender.com",
    process.env.FRONTEND_URL,
    "https://growx.vercel.app",
    "https://www.growx.vercel.app",
].filter(Boolean);

console.log("🔗 Allowed CORS origins:", allowedOrigins);

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
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
);

// ── Body Parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ── Rate Limiting ──────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: { success: false, message: "Too many requests, please try again later." },
  skip: (req) => req.method === "OPTIONS",
});
app.use(globalLimiter);

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5000,
  message: { success: false, message: "Too many API requests, please try again later." },
  skip: (req) => req.method === "OPTIONS",
});

// ── HTTP server + Socket.io ────────────────────────────────────────────────────
const server = http.createServer(app);

const io = new Server(server, {
    cors: { 
        origin: allowedOrigins, 
        credentials: true,
        methods: ['GET', 'POST'],
    },
});

app.use((req, _res, next) => { req.io = io; next(); });

// ── General socket connection log ──────────────────────────────────────────────
io.on("connection", (socket) => {
    console.log(`⚡ Socket connected: ${socket.id}`);
    socket.on("disconnect", () => console.log(`❌ Socket disconnected: ${socket.id}`));
});

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use("/api/v1/user",        userRoute); // No rate limit on auth routes
app.use("/api/v1/company",     apiLimiter, companyRoute);
app.use("/api/v1/job",         apiLimiter, jobRoute);
app.use("/api/v1/application", apiLimiter, applicationRoute);
app.use("/api/v1/quiz",        apiLimiter, quizRoute);
app.use("/api/v1/quiz-result", apiLimiter, quizResultRoute);
app.use("/api/v1/saved-job",   apiLimiter, savedJobRoute);
app.use("/api/v1/ats",         apiLimiter, atsAnalysisRoute);
app.use("/api/v1/internship",  apiLimiter, internshipRoute);
app.use("/api/contact",        apiLimiter, contactRoute);
app.use("/api/resumes",        apiLimiter, resumeRoutes);
app.use("/api/tasks",          apiLimiter, taskRoutes);
app.use("/api/v1/ai-chat",     apiLimiter, aiChatRoute);
app.use("/api/v1/category",    apiLimiter, categoryRoute);

// ── Health Check ───────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "GrowX API is running", timestamp: new Date().toISOString() });
});

// ── Serve React frontend ───────────────────────────────────────────────────────
const distPath = path.resolve(__dirname, "../frontend/dist");
app.use(express.static(distPath));
app.get("/{*splat}", (_req, res) => res.sendFile(path.join(distPath, "index.html")));

// ── Error Handler ──────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    if (err.message === "Not allowed by CORS") {
        return res.status(403).json({ success: false, message: "CORS not allowed for this origin" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
});

// ── Start ──────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, async () => {
    await connectDB();
    await verifyMailer();
    console.log(`🚀 GrowX Server running on http://${HOST}:${PORT}`);
    console.log(`📧 Mailer configured: ${process.env.MAIL_USER || 'NOT CONFIGURED'}`);
    console.log(`🔗 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
});
