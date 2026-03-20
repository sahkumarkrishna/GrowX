import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Application } from "../models/application.model.js";
import { sendEmail } from "../utils/mailer.js";
import crypto from "crypto";

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

    // Check email local part is not too short
    const [localPart] = email.split('@');
    if (localPart.length < 3) {
      return res.status(400).json({ message: "Email local part must be at least 3 characters", success: false });
    }

    // Check domain structure
    const domainPart = email.split('@')[1];
    const domainParts = domainPart.split('.');
    if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
      return res.status(400).json({ message: "Please enter a valid email address (e.g., yourname@domain.com)", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email", success: false });
    }

    let profilePhotoUrl = "";
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token (valid for 24 hours)
    const verificationToken = Math.random().toString(36).substr(2, 32);
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: profilePhotoUrl },
      emailVerificationToken: verificationToken,
      emailVerificationExpiry: tokenExpiry,
      isEmailVerified: false,
    });

    // Send verification email after successful registration
    (async () => {
      try {
        const expiryTime = new Date(tokenExpiry).toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        const verificationLink = `${process.env.FRONTEND_URL || 'https://growx.onrender.com'}/verify-email?token=${verificationToken}&email=${email}`;
        await sendEmail({
          to: email,
          subject: "Verify Your GrowX Email",
          html: `
            <div style="font-family: Arial, sans-serif; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; background: #f3f4f6; border-radius: 12px;">
              <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 30px; border-radius: 12px; color: white; text-align: center; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 24px;">🔐 Email Verification</h2>
              </div>
              
              <h3 style="color: #1f2937; margin-top: 0;">Welcome, ${fullname}!</h3>
              <p style="color: #6b7280; line-height: 1.6;">Thank you for joining GrowX. Please verify your email address to complete your registration and unlock all features.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationLink}" style="background: linear-gradient(135deg, #7c3aed, #2563eb); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">✓ Verify Email</a>
              </div>
              
              <p style="color: #9ca3af; font-size: 13px; margin: 20px 0;">Or paste this code in the verification page:</p>
              <div style="background: white; border: 3px dashed #7c3aed; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 20px;">
                <code style="font-size: 16px; font-weight: bold; color: #7c3aed; letter-spacing: 1px; word-break: break-all;">${verificationToken}</code>
              </div>
              
              <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px; margin-bottom: 20px; text-align: center;">
                <p style="color: #d97706; font-weight: bold; margin: 0;">⏰ Expires: ${expiryTime} UTC</p>
              </div>
              
              <p style="color: #6b7280; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                If you didn't create this account, please ignore this email.
              </p>
              
              <p style="color: #9ca3af; font-size: 12px; margin-top: 20px; text-align: center;">© 2024 GrowX · Your Career Growth Platform</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Verification email failed:", emailError);
      }
    })();

    return res.status(201).json({ 
      message: "Account created successfully. Please verify your email to login.", 
      success: true, 
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        isEmailVerified: newUser.isEmailVerified,
      }
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Incorrect email or password", success: false });

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({ 
        message: "Please verify your email before logging in. Check your inbox for the verification link.", 
        success: false,
        isEmailVerified: false,
        email: user.email
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

    // Check if email is already verified
    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified. You can login now.", success: false });
    }

    // Check if token matches and is not expired
    if (user.emailVerificationToken !== token || new Date() > user.emailVerificationExpiry) {
      return res.status(400).json({ message: "Verification link expired or invalid. Please register again.", success: false });
    }

    // Verify email
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpiry = null;
    await user.save();

    // Send confirmation email
    (async () => {
      try {
        await sendEmail({
          to: email,
          subject: "Email Verified - Welcome to GrowX!",
          html: `
            <div style="font-family: Arial, sans-serif; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; background: #f3f4f6; border-radius: 12px;">
              <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; border-radius: 12px; color: white; text-align: center; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 24px;">✅ Email Verified!</h2>
              </div>
              
              <h3 style="color: #1f2937; margin-top: 0;">Great news, ${user.fullname}!</h3>
              <p style="color: #6b7280; line-height: 1.6;">Your email has been successfully verified. You can now login to your GrowX account and start exploring all features.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'https://growx.onrender.com'}/login" style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Go to Login</a>
              </div>
              
              <p style="color: #6b7280; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                You're all set! Start your journey with GrowX by exploring job opportunities, building your resume, and taking quizzes.
              </p>
              
              <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">© 2024 GrowX · Your Career Growth Platform</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Confirmation email failed:", emailError);
      }
    })();

    return res.status(200).json({ 
      message: "Email verified successfully! You can now login.", 
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      }
    });
  } catch (error) {
    console.error("Verify Email Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

// ============================
// RESEND VERIFICATION EMAIL
// ============================
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified. You can login now.", success: false });
    }

    // Generate new verification token (valid for 24 hours)
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpiry = tokenExpiry;
    await user.save();

    // Send verification email
    (async () => {
      try {
        const expiryTime = new Date(tokenExpiry).toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        const verificationLink = `${process.env.FRONTEND_URL || 'https://growx.onrender.com'}/verify-email?token=${verificationToken}&email=${email}`;
        await sendEmail({
          to: email,
          subject: "Verify Your GrowX Email - New Verification Link",
          html: `
            <div style="font-family: Arial, sans-serif; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; background: #f3f4f6; border-radius: 12px;">
              <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 30px; border-radius: 12px; color: white; text-align: center; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 24px;">🔐 Email Verification</h2>
              </div>
              
              <h3 style="color: #1f2937; margin-top: 0;">New Verification Link</h3>
              <p style="color: #6b7280; line-height: 1.6;">Here's your new verification link. Click the button below to verify your email and get started with GrowX.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationLink}" style="background: linear-gradient(135deg, #7c3aed, #2563eb); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">✓ Verify Email</a>
              </div>
              
              <p style="color: #9ca3af; font-size: 13px; margin: 20px 0;">Or paste this code in the verification page:</p>
              <div style="background: white; border: 3px dashed #7c3aed; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 20px;">
                <code style="font-size: 16px; font-weight: bold; color: #7c3aed; letter-spacing: 1px; word-break: break-all;">${verificationToken}</code>
              </div>
              
              <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px; margin-bottom: 20px; text-align: center;">
                <p style="color: #d97706; font-weight: bold; margin: 0;">⏰ Expires: ${expiryTime} UTC</p>
              </div>
              
              <p style="color: #6b7280; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                If you didn't request this, please ignore this email.
              </p>
              
              <p style="color: #9ca3af; font-size: 12px; margin-top: 20px; text-align: center;">© 2024 GrowX · Your Career Growth Platform</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Resend verification email failed:", emailError);
      }
    })();

    return res.status(200).json({ 
      message: "Verification email sent successfully. Check your inbox.", 
      success: true,
      email: user.email
    });
  } catch (error) {
    console.error("Resend Verification Email Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

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
// GET ALL USERS (Admin only)
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
// GET USER BY ID (Admin only)
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
// DELETE USER (Admin only)
// ============================
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.id) {
      return res.status(400).json({ message: "You cannot delete your own account", success: false });
    }

    // Delete profile photo from cloudinary if exists
    if (user.profile?.profilePhoto) {
      const publicId = user.profile.profilePhoto.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }

    // Delete all applications by this user
    await Application.deleteMany({ applicant: user._id });

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "User deleted successfully", success: true });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ============================
// TOGGLE USER STATUS (Admin only)
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
      success: true
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
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    if (fullname)    user.fullname        = fullname;
    if (email)       user.email           = email;
    if (phoneNumber) user.phoneNumber     = phoneNumber;
    if (bio)         user.profile.bio     = bio;
    if (skills)      user.profile.skills  = skills.split(",").map((s) => s.trim());

    // Profile photo upload
    const photoFile = req.files?.file?.[0];
    if (photoFile) {
      if (user.profile?.profilePhoto) {
        const oldId = user.profile.profilePhoto.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(oldId).catch(() => {});
      }
      const fileUri = getDataUri(photoFile);
      const cloud   = await cloudinary.uploader.upload(fileUri.content, { folder: 'profile_photos' });
      user.profile.profilePhoto = cloud.secure_url;
    }

    // Resume upload
    const resumeFile = req.files?.resume?.[0];
    if (resumeFile) {
      const fileUri = getDataUri(resumeFile);
      const cloud   = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: 'raw',
        folder: 'resumes',
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