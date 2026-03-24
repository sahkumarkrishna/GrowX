import { Interview } from "../models/interview.model.js";
import { QuestionBank } from "../models/questionBank.model.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

// ─── Mailer Setup ────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.MAIL_PORT || "587"),
  secure: false,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

const sendInterviewEmail = async (to, subject, html) => {
  try {
    if (process.env.SKIP_EMAIL_VERIFICATION === "true") return;
    await transporter.sendMail({ from: process.env.MAIL_USER, to, subject, html });
  } catch (err) {
    console.error("Email send error:", err.message);
  }
};

// ─── Schedule Interview ───────────────────────────────────────────────────────
export const scheduleInterview = async (req, res) => {
  try {
    const {
      title, jobId, companyId, candidateId,
      scheduledAt, duration, type, timezone,
      questionIds, enableProctoring, enableRecording,
    } = req.body;

    const recruiterId = req.id;
    const roomId = crypto.randomBytes(8).toString("hex");

    const interview = await Interview.create({
      title,
      jobId: jobId || undefined,
      companyId: companyId || undefined,
      recruiter: recruiterId,
      candidate: candidateId,
      scheduledAt: new Date(scheduledAt),
      duration: duration || 60,
      type: type || "video",
      timezone: timezone || "Asia/Kolkata",
      roomId,
      meetingLink: `${process.env.FRONTEND_URL || "http://localhost:5173"}/interview/room/${roomId}`,
      "proctoring.proctoringEnabled": !!enableProctoring,
      "recording.enabled": !!enableRecording,
    });

    // Attach questions from bank if provided
    if (questionIds?.length) {
      const questions = await QuestionBank.find({ _id: { $in: questionIds } });
      interview.questions = questions.map((q) => ({
        questionId: q._id,
        text: q.text,
        type: q.type,
      }));
      await interview.save();
      await QuestionBank.updateMany(
        { _id: { $in: questionIds } },
        { $inc: { usageCount: 1 } }
      );
    }

    const populated = await Interview.findById(interview._id)
      .populate("recruiter", "fullname email")
      .populate("candidate", "fullname email");

    // Send email
    const candidate = populated.candidate;
    const recruiter = populated.recruiter;
    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#7c3aed">Interview Scheduled — GrowX</h2>
        <p>Hi <strong>${candidate.fullname}</strong>,</p>
        <p>Your interview has been scheduled. Here are the details:</p>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;font-weight:bold">Title</td><td>${title}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Date & Time</td><td>${new Date(scheduledAt).toLocaleString("en-IN")}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Duration</td><td>${duration} minutes</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Type</td><td>${type}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Interviewer</td><td>${recruiter.fullname}</td></tr>
        </table>
        ${type === "video" ? `<p><a href="${interview.meetingLink}" style="background:#7c3aed;color:white;padding:12px 24px;border-radius:6px;text-decoration:none">Join Interview</a></p>` : ""}
        <p>Good luck! 🚀</p>
        <p style="color:#6b7280;font-size:12px">GrowX Platform</p>
      </div>`;

    await sendInterviewEmail(candidate.email, `Interview Scheduled: ${title}`, emailHtml);
    interview.emailSent = true;
    await interview.save();

    return res.status(201).json({ success: true, message: "Interview scheduled successfully", interview: populated });
  } catch (err) {
    console.error("scheduleInterview:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get All Interviews (recruiter sees their own; admin sees all) ─────────────
export const getInterviews = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (req.user?.role !== "admin") filter.recruiter = req.id;
    if (status) filter.status = status;
    if (type) filter.type = type;

    const skip = (page - 1) * limit;
    const [interviews, total] = await Promise.all([
      Interview.find(filter)
        .populate("recruiter", "fullname email profilePhoto")
        .populate("candidate", "fullname email profilePhoto")
        .populate("jobId", "title")
        .populate("companyId", "name logo")
        .sort({ scheduledAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Interview.countDocuments(filter),
    ]);

    return res.status(200).json({ success: true, interviews, total, page: Number(page) });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get Candidate's Interviews ───────────────────────────────────────────────
export const getCandidateInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ candidate: req.id })
      .populate("recruiter", "fullname email profilePhoto")
      .populate("jobId", "title")
      .populate("companyId", "name logo")
      .sort({ scheduledAt: -1 });

    return res.status(200).json({ success: true, interviews });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get Single Interview ─────────────────────────────────────────────────────
export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate("recruiter", "fullname email profilePhoto")
      .populate("candidate", "fullname email profilePhoto")
      .populate("jobId", "title")
      .populate("companyId", "name logo")
      .populate("chat.sender", "fullname profilePhoto");

    if (!interview) return res.status(404).json({ success: false, message: "Interview not found" });
    return res.status(200).json({ success: true, interview });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get Interview by Room ID ─────────────────────────────────────────────────
export const getInterviewByRoom = async (req, res) => {
  try {
    const interview = await Interview.findOne({ roomId: req.params.roomId })
      .populate("recruiter", "fullname email profilePhoto")
      .populate("candidate", "fullname email profilePhoto");

    if (!interview) return res.status(404).json({ success: false, message: "Room not found" });
    return res.status(200).json({ success: true, interview });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Update Interview Status ──────────────────────────────────────────────────
export const updateInterviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ success: false, message: "Not found" });

    interview.status = status;
    if (status === "ongoing") interview.startedAt = new Date();
    if (status === "completed") interview.endedAt = new Date();
    await interview.save();

    return res.status(200).json({ success: true, message: "Status updated", interview });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Submit Evaluation ────────────────────────────────────────────────────────
export const submitEvaluation = async (req, res) => {
  try {
    const { overallScore, communicationScore, technicalScore, confidenceScore, recommendation, notes } = req.body;
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ success: false, message: "Not found" });

    interview.evaluation = {
      overallScore, communicationScore, technicalScore, confidenceScore,
      recommendation, notes, evaluatedAt: new Date(),
    };
    interview.status = "completed";
    interview.endedAt = new Date();
    await interview.save();

    // Notify candidate
    const populated = await interview.populate("candidate", "fullname email");
    const scoreHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#7c3aed">Interview Feedback — GrowX</h2>
        <p>Hi <strong>${populated.candidate.fullname}</strong>, your interview has been evaluated.</p>
        <h3>Scores</h3>
        <ul>
          <li>Overall: ${overallScore}/100</li>
          <li>Communication: ${communicationScore}/100</li>
          <li>Technical: ${technicalScore}/100</li>
          <li>Confidence: ${confidenceScore}/100</li>
        </ul>
        <p><strong>Recommendation:</strong> ${recommendation}</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
        <p>Thank you for participating! 🎉</p>
      </div>`;

    await sendInterviewEmail(populated.candidate.email, "Interview Evaluation Result", scoreHtml);

    return res.status(200).json({ success: true, message: "Evaluation submitted", interview });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Log Proctoring Event ─────────────────────────────────────────────────────
export const logProctoringEvent = async (req, res) => {
  try {
    const { event, tabSwitchCount, multipleFaces } = req.body;
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ success: false, message: "Not found" });

    if (event) interview.proctoring.violations.push({ type: event, timestamp: new Date() });
    if (tabSwitchCount !== undefined) interview.proctoring.tabSwitchCount = tabSwitchCount;
    if (multipleFaces !== undefined) interview.proctoring.multipleFacesDetected = multipleFaces;
    await interview.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Submit Feedback ──────────────────────────────────────────────────────────
export const submitFeedback = async (req, res) => {
  try {
    const { candidateFeedback, candidateRating } = req.body;
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ success: false, message: "Not found" });

    interview.feedback.candidateFeedback = candidateFeedback;
    interview.feedback.candidateRating = candidateRating;
    interview.feedback.submittedAt = new Date();
    await interview.save();

    return res.status(200).json({ success: true, message: "Feedback submitted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Cancel Interview ─────────────────────────────────────────────────────────
export const cancelInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate("candidate", "fullname email")
      .populate("recruiter", "fullname");

    if (!interview) return res.status(404).json({ success: false, message: "Not found" });

    interview.status = "cancelled";
    await interview.save();

    await sendInterviewEmail(
      interview.candidate.email,
      "Interview Cancelled",
      `<p>Hi ${interview.candidate.fullname}, your interview "${interview.title}" has been cancelled. Please contact your recruiter for rescheduling.</p>`
    );

    return res.status(200).json({ success: true, message: "Interview cancelled" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Analytics (Admin) ────────────────────────────────────────────────────────
export const getInterviewAnalytics = async (req, res) => {
  try {
    const [statusStats, typeStats, avgScore, total] = await Promise.all([
      Interview.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Interview.aggregate([{ $group: { _id: "$type", count: { $sum: 1 } } }]),
      Interview.aggregate([
        { $match: { "evaluation.overallScore": { $exists: true } } },
        { $group: { _id: null, avg: { $avg: "$evaluation.overallScore" } } },
      ]),
      Interview.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      analytics: { total, statusStats, typeStats, avgScore: avgScore[0]?.avg || 0 },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Question Bank CRUD ───────────────────────────────────────────────────────
export const createQuestion = async (req, res) => {
  try {
    const question = await QuestionBank.create({ ...req.body, createdBy: req.id });
    return res.status(201).json({ success: true, question });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const { category, difficulty, type, search } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (type) filter.type = type;
    if (search) filter.text = { $regex: search, $options: "i" };

    const questions = await QuestionBank.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, questions });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await QuestionBank.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, question });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    await QuestionBank.findByIdAndUpdate(req.params.id, { isActive: false });
    return res.status(200).json({ success: true, message: "Question deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};