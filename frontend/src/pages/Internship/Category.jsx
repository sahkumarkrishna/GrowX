import { motion } from 'framer-motion';
import { Code, Globe, Smartphone, Shield, Palette, Cloud, Database, Brain, Coffee, Cpu, Blocks, Gamepad2, Wrench, Layers, Zap } from 'lucide-react';
import Apply from "./Apply";

const internships = [
  {
    title: "Software Development",
    icon: Code,
    topics: ["Life Cycle", "CLI Apps", "GUI Apps", "Web Scraping", "Version Control", "Testing"],
    projects: ["Build a CLI Calculator", "Simple GUI Todo App"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Web Development",
    icon: Globe,
    topics: ["HTML5 & CSS3", "JavaScript", "Responsive Website", "Web Applications", "Accessibility", "SEO"],
    projects: ["Personal Portfolio", "Landing Page Clone"],
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Android Development",
    icon: Smartphone,
    topics: ["Kotlin/Java", "UI Components", "Intents", "Firebase", "Publishing", "Material Design"],
    projects: ["BMI Calculator App", "Notes App with Firebase"],
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    topics: ["Network Security", "Ethical Hacking", "Cryptography", "Penetration Testing", "Incident Response", "Security Policies"],
    projects: ["Vulnerability Scan Report", "Basic Malware Analysis"],
    color: "from-red-500 to-orange-500"
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    topics: ["Design Principles", "Wireframing", "Prototyping", "User Research", "Design Tools", "Usability Testing"],
    projects: ["Redesign a Website", "Create a Mobile App Prototype"],
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Cloud Computing",
    icon: Cloud,
    topics: ["AWS Basics", "Virtual Machines", "Containers & Kubernetes", "Serverless Architecture", "Cloud Security", "Monitoring & Logging"],
    projects: ["Deploy Web App on AWS", "Create Docker Container"],
    color: "from-indigo-500 to-blue-500"
  },
  {
    title: "Data Science",
    icon: Database,
    topics: ["Python Basics", "Data Cleaning", "Visualization", "ML", "Deployment", "Statistics"],
    projects: ["Titanic Survival Prediction", "Sales Forecasting Model"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Machine Learning",
    icon: Brain,
    topics: ["ML Algorithms", "Preprocessing", "Training", "Evaluation", "Deployment", "Model Optimization"],
    projects: ["Image Classification", "Sentiment Analysis App"],
    color: "from-violet-500 to-purple-500"
  },
  {
    title: "Java Full Stack Developer",
    icon: Coffee,
    topics: ["Core Java", "Spring Boot", "Hibernate", "REST APIs", "MySQL", "Angular Basics"],
    projects: ["Library Management System", "Employee Portal"],
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Python Full Stack Developer",
    icon: Cpu,
    topics: ["Python", "Flask/Django", "PostgreSQL", "REST APIs", "HTML/CSS/JS", "Testing"],
    projects: ["Online Learning Platform", "Blogging Platform"],
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "JS Full Stack Developer",
    icon: Layers,
    topics: ["JavaScript", "Node.js", "Express", "MongoDB", "ES6+", "API Integration"],
    projects: ["Weather App with API", "Real-time Chat App"],
    color: "from-yellow-500 to-green-500"
  },
  {
    title: "DevOps",
    icon: Wrench,
    topics: ["CI/CD", "Jenkins", "Docker", "Kubernetes", "Monitoring", "AWS/GCP"],
    projects: ["CI/CD Pipeline", "K8s Cluster Setup"],
    color: "from-teal-500 to-cyan-500"
  },
  {
    title: "AI/ML with Python",
    icon: Zap,
    topics: ["Numpy", "Pandas", "Scikit-learn", "Neural Networks", "TensorFlow", "Data Visualization"],
    projects: ["Handwritten Digit Classifier", "Chatbot using RNN"],
    color: "from-purple-500 to-indigo-500"
  },
  {
    title: "Blockchain Developer",
    icon: Blocks,
    topics: ["Ethereum", "Smart Contracts", "Solidity", "DApp", "Web3.js", "Cryptoeconomics"],
    projects: ["Voting DApp", "NFT Minting Platform"],
    color: "from-amber-500 to-yellow-500"
  },
  {
    title: "Game Development",
    icon: Gamepad2,
    topics: ["Unity", "C#", "2D/3D Game Physics", "Game Mechanics", "UI/UX for Games", "Multiplayer Networking"],
    projects: ["2D Platformer Game", "Multiplayer Shooting Game"],
    color: "from-pink-500 to-purple-500"
  },
];

export default function Category() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4 -mt-16">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Internship <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Categories</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from 15+ specialized internship programs designed to accelerate your career
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {internships.map((intern, idx) => {
            const Icon = intern.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex p-4 bg-gradient-to-br ${intern.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="text-white" size={32} />
                </div>

                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  {intern.title}
                </h2>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Topics Covered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {intern.topics.map((topic, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Projects
                  </h3>
                  <ul className="space-y-2">
                    {intern.projects.map((proj, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{proj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Apply />
      </div>
    </div>
  );
}
