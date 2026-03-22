import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Application } from "../models/application.model.js";
import {
    sendEmail,
    sendVerificationEmail,
    sendResendVerificationEmail,
    sendWelcomeEmail,
    sendForgotPasswordEmail,
    sendPasswordResetSuccessEmail,
} from "../utils/mailer.js";

// ============================
// REGISTER
// ============================
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format", success: false });
        }
        const [localPart] = email.split("@");
        if (localPart.length < 3) {
            return res.status(400).json({ message: "Email local part must be at least 3 characters", success: false });
        }
        const domainPart  = email.split("@")[1];
        const domainParts = domainPart.split(".");
        if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
            return res.status(400).json({ message: "Please enter a valid email address (e.g., yourname@domain.com)", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Already registered but not verified — let frontend show resend
            if (!existingUser.isEmailVerified) {
                return res.status(409).json({
                    message: "Email registered but not verified yet.",
                    success: false,
                    notVerified: true,
                    email,
                });
            }
            return res.status(400).json({ message: "User already exists with this email", success: false });
        }

        let profilePhotoUrl = "";
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Token valid for 24 hours
        const verificationToken  = crypto.randomBytes(32).toString("hex");
        const tokenExpiry        = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: { profilePhoto: profilePhotoUrl },
            emailVerificationToken:  verificationToken,
            emailVerificationExpiry: tokenExpiry,
            // Auto-verify only in development
            isEmailVerified: process.env.NODE_ENV !== "production" &&
                             process.env.SKIP_EMAIL_VERIFICATION === "true",
        });

        // Send verification email (non-blocking)
        sendVerificationEmail(email, fullname, verificationToken, tokenExpiry).catch(
            (err) => console.error("Verification email failed:", err)
        );

        return res.status(201).json({
            message: "Account created! Please verify your email to login.",
            success: true,
            email,
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                isEmailVerified: newUser.isEmailVerified,
            },
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ============================
// LOGIN
// ============================
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Incorrect email or password", success: false });

        // Block unverified users
        if (!user.isEmailVerified && process.env.SKIP_EMAIL_VERIFICATION !== "true") {
            return res.status(403).json({
                message: "Please verify your email before logging in.",
                success: false,
                notVerified: true,
                email: user.email,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect email or password", success: false });

        if (role !== user.role) return res.status(400).json({ message: "Incorrect role for this account", success: false });

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        const safeUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            isEmailVerified: user.isEmailVerified,
        };

        return res
            .status(200)
            .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
            .json({ message: `Welcome back ${user.fullname}`, user: safeUser, success: true });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ============================
// VERIFY EMAIL
// GET /verify-email?token=...&email=...
// ============================
export const verifyEmail = async (req, res) => {
    try {
        const { token, email } = req.query;

        if (!token || !email) {
            return res.status(400).json({ message: "Invalid verification link", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({
                message: "Email already verified. You can login now.",
                success: false,
                alreadyDone: true,
            });
        }

        if (user.emailVerificationToken !== token || new Date() > user.emailVerificationExpiry) {
            return res.status(400).json({
                message: "Verification link expired or invalid.",
                success: false,
                expired: true,
            });
        }

        user.isEmailVerified         = true;
        user.emailVerificationToken  = null;
        user.emailVerificationExpiry = null;
        await user.save();

        // Send welcome email (non-blocking)
        sendWelcomeEmail(email, user.fullname).catch(
            (err) => console.error("Welcome email failed:", err)
        );

        return res.status(200).json({
            message: "Email verified successfully! You can now login.",
            success: true,
            user: { _id: user._id, fullname: user.fullname, email: user.email, isEmailVerified: true },
        });
    } catch (error) {
        console.error("Verify Email Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ============================
// RESEND VERIFICATION EMAIL
// POST /resend-verification-email
// ============================
export const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required", success: false });

        const user = await User.findOne({ email });
        if (!user)               return res.status(404).json({ message: "User not found", success: false });
        if (user.isEmailVerified) return res.status(400).json({ message: "Email already verified. You can login now.", success: false });

        const verificationToken  = crypto.randomBytes(32).toString("hex");
        const tokenExpiry        = new Date(Date.now() + 24 * 60 * 60 * 1000);

        user.emailVerificationToken  = verificationToken;
        user.emailVerificationExpiry = tokenExpiry;
        await user.save();

        sendResendVerificationEmail(email, user.fullname, verificationToken, tokenExpiry).catch(
            (err) => console.error("Resend email failed:", err)
        );

        return res.status(200).json({
            message: "Verification email sent! Check your inbox.",
            success: true,
            email: user.email,
        });
    } catch (error) {
        console.error("Resend Verification Email Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ============================
// FORGOT PASSWORD
// POST /forgot-password
// body: { email }
// ============================
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required", success: false });

        // Always return same success message to prevent email enumeration
        const genericOk = { success: true, message: "If that email is registered, a reset link has been sent." };

        const user = await User.findOne({ email });
        if (!user) return res.status(200).json(genericOk);

        // Generate reset token — expires in 15 minutes
        const resetToken   = crypto.randomBytes(32).toString("hex");
        const resetExpires = new Date(Date.now() + 15 * 60 * 1000);

        user.resetPasswordToken   = resetToken;
        user.resetPasswordExpires = resetExpires;
        await user.save();

        sendForgotPasswordEmail(email, user.fullname, resetToken, resetExpires).catch(
            (err) => console.error("Forgot password email failed:", err)
        );

        return res.status(200).json(genericOk);
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ============================
// RESET PASSWORD
// POST /reset-password/:token
// body: { password }
// ============================
export const resetPassword = async (req, res) => {
    try {
        const { token }    = req.params;
        const { password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: "Token and new password are required", success: false });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters", success: false });
        }

        const user = await User.findOne({
            resetPasswordToken:   token,
            resetPasswordExpires: { $gt: new Date() },   // not expired
        });

        if (!user) {
            return res.status(400).json({
                message: "Password reset link is invalid or has expired.",
                success: false,
                expired: true,
            });
        }

        user.password             = await bcrypt.hash(password, 10);
        user.resetPasswordToken   = null;
        user.resetPasswordExpires = null;
        await user.save();

        // Send success notification (non-blocking)
        sendPasswordResetSuccessEmail(user.email, user.fullname).catch(
            (err) => console.error("Reset success email failed:", err)
        );

        return res.status(200).json({
            message: "Password updated successfully! You can now log in.",
            success: true,
        });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ============================
// LOGOUT
// ============================
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ============================
// GET ALL USERS  (Admin only)
// ============================
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        return res.status(200).json({ users, success: true });
    } catch (error) {
        console.error("Get All Users Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ============================
// GET USER BY ID  (Admin only)
// ============================
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found", success: false });
        return res.status(200).json({ user, success: true });
    } catch (error) {
        console.error("Get User By ID Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ============================
// DELETE USER  (Admin only)
// ============================
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found", success: false });

        if (user._id.toString() === req.id) {
            return res.status(400).json({ message: "You cannot delete your own account", success: false });
        }

        if (user.profile?.profilePhoto) {
            const publicId = user.profile.profilePhoto.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(publicId).catch(() => {});
        }

        await Application.deleteMany({ applicant: user._id });
        await User.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ============================
// TOGGLE USER STATUS  (Admin only)
// ============================
export const toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found", success: false });

        user.isActive = !user.isActive;
        await user.save();

        return res.status(200).json({
            message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
            user,
            success: true,
        });
    } catch (error) {
        console.error("Toggle Status Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ============================
// UPDATE PROFILE
// ============================
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;
        const user   = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found", success: false });

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
                resource_type: "raw",
                folder: "resumes",
            });
            user.profile.resume             = cloud.secure_url;
            user.profile.resumeOriginalName = resumeFile.originalname;
        }

        await user.save();

        const safeUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({ message: "Profile updated successfully", user: safeUser, success: true });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
