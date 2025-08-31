import React from "react";

const internships = [
  {
    title: "Software Development",
    topics: ["Life Cycle", "CLI Apps", "GUI Apps", "Web Scraping", "Version Control", "Testing"],
    projects: ["Build a CLI Calculator", "Simple GUI Todo App"],
  },
  {
    title: "Web Development",
    topics: ["HTML5 & CSS3", "JavaScript", "Responsive Website", "Web Applications", "Accessibility", "SEO"],
    projects: ["Personal Portfolio", "Landing Page Clone"],
  },
  {
    title: "Android Development",
    topics: ["Kotlin/Java", "UI Components", "Intents", "Firebase", "Publishing", "Material Design"],
    projects: ["BMI Calculator App", "Notes App with Firebase"],
  },
  {
    title: "Cybersecurity",
    topics: ["Network Security", "Ethical Hacking", "Cryptography", "Penetration Testing", "Incident Response", "Security Policies"],
    projects: ["Vulnerability Scan Report", "Basic Malware Analysis"],
  },
  {
    title: "Full Stack Web Development",
    topics: ["Auth & Authz", "REST APIs & Database", "Mini Project: Ecommerce", "Frontend Frameworks", "Backend Frameworks", "Deployment"],
    projects: ["Blog App with Auth", "E-Commerce Admin Panel"],
  },
  {
    title: "UI/UX Design",
    topics: ["Design Principles", "Wireframing", "Prototyping", "User Research", "Design Tools", "Usability Testing"],
    projects: ["Redesign a Website", "Create a Mobile App Prototype"],
  },
  {
    title: "Cloud Computing",
    topics: ["AWS Basics", "Virtual Machines", "Containers & Kubernetes", "Serverless Architecture", "Cloud Security", "Monitoring & Logging"],
    projects: ["Deploy Web App on AWS", "Create Docker Container"],
  },
  {
    title: "Data Science",
    topics: ["Python Basics", "Data Cleaning", "Visualization", "ML", "Deployment", "Statistics"],
    projects: ["Titanic Survival Prediction", "Sales Forecasting Model"],
  },
  {
    title: "Machine Learning",
    topics: ["ML Algorithms", "Preprocessing", "Training", "Evaluation", "Deployment", "Model Optimization"],
    projects: ["Image Classification", "Sentiment Analysis App"],
  },
  {
    title: "Java Full Stack Developer",
    topics: ["Core Java", "Spring Boot", "Hibernate", "REST APIs", "MySQL", "Angular Basics"],
    projects: ["Library Management System", "Employee Portal"],
  },
  {
    title: "Python Full Stack Developer",
    topics: ["Python", "Flask/Django", "PostgreSQL", "REST APIs", "HTML/CSS/JS", "Testing"],
    projects: ["Online Learning Platform", "Blogging Platform"],
  },
  {
    title: "JS Full Stack Developer",
    topics: ["JavaScript", "Node.js", "Express", "MongoDB", "ES6+", "API Integration"],
    projects: ["Weather App with API", "Real-time Chat App"],
  },
  {
    title: "MERN Stack Developer",
    topics: ["MongoDB", "Express", "React", "Node.js", "JWT Auth", "Redux"],
    projects: ["E-commerce Store", "Social Media App"],
  },
  {
    title: "MEAN Stack Developer",
    topics: ["MongoDB", "Express", "Angular", "Node.js", "REST APIs", "Deployment"],
    projects: ["Task Manager App", "Job Board Platform"],
  },
  {
    title: "DevOps",
    topics: ["CI/CD", "Jenkins", "Docker", "Kubernetes", "Monitoring", "AWS/GCP"],
    projects: ["CI/CD Pipeline", "K8s Cluster Setup"],
  },
  {
    title: "AI/ML with Python",
    topics: ["Numpy", "Pandas", "Scikit-learn", "Neural Networks", "TensorFlow", "Data Visualization"],
    projects: ["Handwritten Digit Classifier", "Chatbot using RNN"],
  },
  {
    title: "Blockchain Developer",
    topics: ["Ethereum", "Smart Contracts", "Solidity", "DApp", "Web3.js", "Cryptoeconomics"],
    projects: ["Voting DApp", "NFT Minting Platform"],
  },
  {
    title: "Game Development",
    topics: ["Unity", "C#", "2D/3D Game Physics", "Game Mechanics", "UI/UX for Games", "Multiplayer Networking"],
    projects: ["2D Platformer Game", "Multiplayer Shooting Game"],
  },
];

export default function Apply() {
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-12 mt-14">
      <h1 className="text-5xl font-extrabold text-center text-indigo-900 mb-14 tracking-wide drop-shadow-md">
        Internship Apply
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {internships.map((intern, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-8 cursor-default transform transition-transform duration-300 shadow-lg bg-white text-slate-900 hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-3xl font-semibold mb-6 leading-snug tracking-wide drop-shadow-sm">
              {intern.title}
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 border-b-2 border-teal-400 inline-block pb-1">
                Topics
              </h3>
              <ul className="list-disc list-inside space-y-1 text-base font-medium">
                {intern.topics.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 border-b-2 border-teal-400 inline-block pb-1">
                Projects
              </h3>
              <ul className="list-disc list-inside space-y-1 text-base font-medium">
                {intern.projects.map((proj, i) => (
                  <li key={i}>{proj}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => handleApply(intern.title)}
                className="w-28 h-10 text-sm font-semibold rounded-full bg-indigo-900 text-white hover:bg-indigo-800 shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-400 focus:ring-offset-white active:scale-95"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
