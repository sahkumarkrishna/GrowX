import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Application } from "../models/application.model.js";

// ============================
// REGISTER
// ============================
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
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

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: profilePhotoUrl },
    });

    return res.status(201).json({ message: "Account created successfully", success: true, user: newUser });
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

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Incorrect email or password", success: false });

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
