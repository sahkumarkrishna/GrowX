import express from "express";
import { login, logout, register, updateProfile, getAllUsers, getUserById, deleteUser, toggleUserStatus } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import multer from "multer";
import { singleUpload } from "../middlewares/mutler.js";

const multiUpload = multer({ storage: multer.memoryStorage() }).fields([
  { name: 'file',   maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]);

const router = express.Router();

// Auth
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, multiUpload, updateProfile);

// Admin — Users Management
router.route("/all").get(isAuthenticated, getAllUsers);
router.route("/:id").get(isAuthenticated, getUserById);
router.route("/delete/:id").delete(isAuthenticated, deleteUser);
router.route("/toggle-status/:id").patch(isAuthenticated, toggleUserStatus);

export default router;
