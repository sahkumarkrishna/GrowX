import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    fullName:   { type: String, required: true },
    email:      { type: String, required: true },
    phone:      { type: String, required: true },
    gender:     { type: String },
    college:    { type: String },
    course:     { type: String },
    year:       { type: String },
    city:       { type: String },
    state:      { type: String },
    category:   { type: String, required: true },
    experience: { type: String },
    duration:   { type: String },
    linkedin:   { type: String },
    github:     { type: String },
    portfolio:  { type: String },
    resume:     { type: String },   // stored file path / cloudinary URL
    message:    { type: String },
    status:     { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Internship", internshipSchema);
