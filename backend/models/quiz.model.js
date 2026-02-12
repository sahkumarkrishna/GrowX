import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
      enum: [
        "HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue",
        "Node.js", "Express", "Django", "Spring Boot", "Flask",
        "MongoDB", "MySQL", "PostgreSQL", "Firebase",
        "Python", "Java", "C", "C++", "Go", "Rust",
        "React Native", "Flutter", "Swift", "Kotlin",
        "Git", "GitHub", "Docker", "Kubernetes",
        "AWS", "Azure", "GCP",
        "DSA", "System Design", "OOP", "Database Design",
        "Other"
      ],
    },

    categoryImage: {
      type: String,
      required: true,
      default: "",
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    timeLimit: {
      type: Number,
      default: 10,
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },

        options: [
          {
            optionText: {
              type: String,
              required: true,
            },
          },
        ],

        correctAnswer: {
          type: Number,
          required: true,
        },

        marks: {
          type: Number,
          default: 1,
        },

        difficulty: {
          type: String,
          enum: ["Easy", "Medium", "Hard"],
          default: "Easy",
        },
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
