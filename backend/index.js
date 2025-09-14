import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

import contactRoute from "./routes/contactRoutes.js";
import resumeRoutes from "./routes/ReumeRoutes.js"; // ✅ fixed path & typo

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//https://growx.onrender.com
// CORS setup
app.use(
  cors({
    origin: "https://growx.onrender.com", // Frontend URL
    credentials: true,
  })
);

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/contact", contactRoute);
// Routes
app.use("/api/resumes", resumeRoutes);

// Serve frontend (after API routes)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});