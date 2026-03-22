import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Application } from "../models/application.model.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail,
  sendPasswordResetSuccessEmail,
} from "../utils/mailer.js";

// ── helpers ────────────────────────────────────────────────────────────────────
// Only skip verification when EXPLICITLY set to "true" in .env
// Never auto-skip based on NODE_ENV — that prevents emails in development too
const isSkipVerification = () =>
  process.env.SKIP_EMAIL_VERIFICATION === "true";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => {
  if (!emailRegex.test(email)) return "Invalid email format.";
  const [local, domain] = email.split("@");
  if (local.length < 3)        return "Email username is too short.";
  const parts = domain.split(".");
  if (parts.length < 2 || parts[parts.length - 1].length < 2)
    return "Please enter a valid email address (e.g. name@domain.com).";
  return null; // valid
};

// ── Fire-and-forget email helper (never crashes the request) ───────────────────
const fireEmail = (fn, ...args) => {
  fn(...args).catch((err) =>
    console.error(`❌ Email failed [${fn.name}]:`, err.message)
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// REGISTER
// POST /api/v1/user/register
// ══════════════════════════════════════════════════════════════════════════════
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required.", success: false });
    }

    const emailErr = validateEmail(email);
    if (emailErr) return res.status(400).json({ message: emailErr, success: false });

    const existing = await User.findOne({ email });

    // ── CASE 1: Already registered but NOT verified ────────────────────────────
    // Instead of rejecting, auto-resend the verification email and tell
    // the frontend to show the "check your inbox" screen.
    if (existing && !existing.isEmailVerified) {
      const token  = crypto.randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

      existing.emailVerificationToken  = token;
      existing.emailVerificationExpiry = expiry;
      await existing.save();

      console.log(`📧 Re-sending verification to existing unverified user: ${email}`);
      fireEmail(sendVerificationEmail, email, existing.fullname, token, expiry);

      // Return 200 (not 409) so the frontend treats it as success
      // and shows the "check your email" screen
      return res.status(200).json({
        success:   true,
        resent:    true,            // ← frontend can detect this
        email,
        message:   "Verification email resent! Check your inbox.",
      });
    }

    // ── CASE 2: Already registered AND verified ────────────────────────────────
    if (existing && existing.isEmailVerified) {
      return res.status(409).json({
        message: "An account with this email already exists. Please log in.",
        success: false,
      });
    }

    // ── CASE 3: New user ───────────────────────────────────────────────────────
    let profilePhotoUrl = "";
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const cloud   = await cloudinary.uploader.upload(fileUri.content);
        profilePhotoUrl = cloud.secure_url;
      } catch (cloudErr) {
        console.error("Cloudinary upload failed:", cloudErr.message);
        // Non-fatal — continue without photo
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token          = crypto.randomBytes(32).toString("hex");
    const expiry         = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 h

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password:               hashedPassword,
      role,
      profile:                { profilePhoto: profilePhotoUrl },
      emailVerificationToken:  token,
      emailVerificationExpiry: expiry,
      isEmailVerified:         isSkipVerification(), // auto-verify in dev
    });

    console.log(`✅ New user registered: ${email} | verified=${newUser.isEmailVerified}`);

    // Always send the email — SKIP_EMAIL_VERIFICATION only allows login without clicking the link
    // The email is always fired so the user gets a confirmation in their inbox
    fireEmail(sendVerificationEmail, email, fullname, token, expiry);

    return res.status(201).json({
      success: true,
      email,
      message: newUser.isEmailVerified
        ? "Account created! A confirmation email has been sent to your inbox."
        : "Account created! Please check your email to verify your account.",
      user: {
        _id:             newUser._id,
        fullname:        newUser.fullname,
        email:           newUser.email,
        isEmailVerified: newUser.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// LOGIN
// POST /api/v1/user/login
// ══════════════════════════════════════════════════════════════════════════════
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required.", success: false });
    }

    const emailErr = validateEmail(email);
    if (emailErr) return res.status(400).json({ message: emailErr, success: false });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password.", success: false });
    }

    // ── Block unverified users — but tell frontend so it can show resend ───────
    if (!user.isEmailVerified && !isSkipVerification()) {
      return res.status(403).json({
        success:     false,
        notVerified: true,          // ← frontend detects this
        email:       user.email,
        message:     "Please verify your email before logging in.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password.", success: false });
    }

    if (role !== user.role) {
      return res.status(400).json({ message: "Incorrect role for this account.", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge:   24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure:   process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: `Welcome back, ${user.fullname}!`,
        user: {
          _id:             user._id,
          fullname:        user.fullname,
          email:           user.email,
          phoneNumber:     user.phoneNumber,
          role:            user.role,
          profile:         user.profile,
          isEmailVerified: user.isEmailVerified,
        },
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// VERIFY EMAIL
// GET /api/v1/user/verify-email?token=...&email=...
// ══════════════════════════════════════════════════════════════════════════════
export const verifyEmail = async (req, res) => {
  try {
    const { token, email } = req.query;

    if (!token || !email) {
      return res.status(400).json({ message: "Invalid verification link.", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found.", success: false });
    }

    if (user.isEmailVerified) {
      return res.status(200).json({
        success:     true,
        alreadyDone: true,
        message:     "Email already verified. You can log in.",
      });
    }

    const tokenExpired = !user.emailVerificationExpiry ||
                         new Date() > user.emailVerificationExpiry;
    const tokenMismatch = user.emailVerificationToken !== token;

    if (tokenMismatch || tokenExpired) {
      return res.status(400).json({
        success: false,
        expired: true,
        message: tokenExpired
          ? "Verification link has expired. Please request a new one."
          : "Invalid verification link.",
      });
    }

    user.isEmailVerified         = true;
    user.emailVerificationToken  = null;
    user.emailVerificationExpiry = null;
    await user.save();

    console.log(`✅ Email verified: ${email}`);
    fireEmail(sendWelcomeEmail, email, user.fullname);

    return res.status(200).json({
      success: true,
      message: "Email verified! You can now log in.",
      user: {
        _id:             user._id,
        fullname:        user.fullname,
        email:           user.email,
        isEmailVerified: true,
      },
    });
  } catch (error) {
    console.error("Verify Email Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// RESEND VERIFICATION EMAIL
// POST /api/v1/user/resend-verification-email
// body: { email }
// ══════════════════════════════════════════════════════════════════════════════
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required.", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Return success to prevent email enumeration
      return res.status(200).json({
        success: true,
        message: "If that email is registered, a new verification link has been sent.",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "This email is already verified. Please log in.",
      });
    }

    // Rate limit: don't resend if last token is less than 2 minutes old
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    if (
      user.emailVerificationExpiry &&
      user.emailVerificationExpiry > new Date(Date.now() + 22 * 60 * 60 * 1000)
    ) {
      return res.status(429).json({
        success: false,
        message: "Please wait a moment before requesting another email.",
      });
    }

    const token  = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.emailVerificationToken  = token;
    user.emailVerificationExpiry = expiry;
    await user.save();

    console.log(`📧 Resending verification to: ${email}`);
    await sendVerificationEmail(email, user.fullname, token, expiry);

    return res.status(200).json({
      success: true,
      email:   user.email,
      message: "Verification email sent! Check your inbox (and spam folder).",
    });
  } catch (error) {
    console.error("Resend Verification Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// FORGOT PASSWORD
// POST /api/v1/user/forgot-password
// body: { email }
// ══════════════════════════════════════════════════════════════════════════════
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required.", success: false });
    }

    // Always same response to prevent email enumeration
    const ok = { success: true, message: "If that email is registered, a reset link has been sent." };

    const user = await User.findOne({ email });
    if (!user) return res.status(200).json(ok);

    const token  = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    user.resetPasswordToken   = token;
    user.resetPasswordExpires = expiry;
    await user.save();

    console.log(`📧 Sending password reset to: ${email}`);
    fireEmail(sendForgotPasswordEmail, email, user.fullname, token, expiry);

    return res.status(200).json(ok);
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// RESET PASSWORD
// POST /api/v1/user/reset-password/:token
// body: { password }
// ══════════════════════════════════════════════════════════════════════════════
export const resetPassword = async (req, res) => {
  try {
    const { token }    = req.params;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and new password are required.", success: false });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters.", success: false });
    }

    const user = await User.findOne({
      resetPasswordToken:   token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        expired: true,
        message: "Password reset link is invalid or has expired.",
      });
    }

    user.password             = await bcrypt.hash(password, 10);
    user.resetPasswordToken   = null;
    user.resetPasswordExpires = null;
    await user.save();

    console.log(`✅ Password reset for: ${user.email}`);
    fireEmail(sendPasswordResetSuccessEmail, user.email, user.fullname);

    return res.status(200).json({
      success: true,
      message: "Password updated! You can now log in.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// LOGOUT
// ══════════════════════════════════════════════════════════════════════════════
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge:   0,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure:   process.env.NODE_ENV === "production",
      })
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// GET ALL USERS  (Admin)
// ══════════════════════════════════════════════════════════════════════════════
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ users, success: true });
  } catch (error) {
    console.error("Get All Users Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// GET USER BY ID  (Admin)
// ══════════════════════════════════════════════════════════════════════════════
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found.", success: false });
    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Get User By ID Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// DELETE USER  (Admin)
// ══════════════════════════════════════════════════════════════════════════════
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found.", success: false });

    if (user._id.toString() === req.id) {
      return res.status(400).json({ message: "You cannot delete your own account.", success: false });
    }

    if (user.profile?.profilePhoto) {
      const publicId = user.profile.profilePhoto.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }

    await Application.deleteMany({ applicant: user._id });
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// TOGGLE USER STATUS  (Admin)
// ══════════════════════════════════════════════════════════════════════════════
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found.", success: false });

    user.isActive = !user.isActive;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User ${user.isActive ? "activated" : "deactivated"} successfully.`,
      user,
    });
  } catch (error) {
    console.error("Toggle Status Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// UPDATE PROFILE
// ══════════════════════════════════════════════════════════════════════════════
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const user = await User.findById(req.id);
    if (!user) return res.status(404).json({ message: "User not found.", success: false });

    if (fullname)    user.fullname       = fullname;
    if (email)       user.email          = email;
    if (phoneNumber) user.phoneNumber    = phoneNumber;
    if (bio)         user.profile.bio    = bio;
    if (skills)      user.profile.skills = skills.split(",").map((s) => s.trim());

    const photoFile = req.files?.file?.[0];
    if (photoFile) {
      if (user.profile?.profilePhoto) {
        const oldId = user.profile.profilePhoto.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(oldId).catch(() => {});
      }
      const fileUri = getDataUri(photoFile);
      const cloud   = await cloudinary.uploader.upload(fileUri.content, { folder: "profile_photos" });
      user.profile.profilePhoto = cloud.secure_url;
    }

    const resumeFile = req.files?.resume?.[0];
    if (resumeFile) {
      const fileUri = getDataUri(resumeFile);
      const cloud   = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw", folder: "resumes",
      });
      user.profile.resume             = cloud.secure_url;
      user.profile.resumeOriginalName = resumeFile.originalname;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        _id:         user._id,
        fullname:    user.fullname,
        email:       user.email,
        phoneNumber: user.phoneNumber,
        role:        user.role,
        profile:     user.profile,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};