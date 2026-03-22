import express from "express";
import {
    login,
    logout,
    register,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,        // ← ADDED
    resetPassword,         // ← ADDED
    updateProfile,
    getAllUsers,
    getUserById,
    deleteUser,
    toggleUserStatus,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import multer from "multer";
import { singleUpload } from "../middlewares/mutler.js";

const multiUpload = multer({ storage: multer.memoryStorage() }).fields([
    { name: "file",   maxCount: 1 },
    { name: "resume", maxCount: 1 },
]);

const router = express.Router();

// ── Auth ───────────────────────────────────────────────────────────────────────
router.post("/register",                  singleUpload, register);
router.post("/login",                     login);
router.get ("/verify-email",              verifyEmail);               // ?token=...&email=...
router.post("/resend-verification-email", resendVerificationEmail);
router.get ("/logout",                    logout);

// ── Password Reset ─────────────────────────────────────────────────────────────
router.post("/forgot-password",           forgotPassword);            // ← ADDED
router.post("/reset-password/:token",     resetPassword);             // ← ADDED

// ── Profile ────────────────────────────────────────────────────────────────────
router.post("/profile/update", isAuthenticated, multiUpload, updateProfile);

// ── Admin — User Management ────────────────────────────────────────────────────
router.get   ("/all",                isAuthenticated, getAllUsers);
router.get   ("/:id",                isAuthenticated, getUserById);
router.delete("/delete/:id",         isAuthenticated, deleteUser);
router.patch ("/toggle-status/:id",  isAuthenticated, toggleUserStatus);

export default router;
