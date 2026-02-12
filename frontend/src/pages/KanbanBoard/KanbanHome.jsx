import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./About";
import StatsSection from "./StatsSection";
import FeaturesSection from "./FeaturesSection";
import FeedbackSection from "./FeedbackSection";
import FAQs from "./FAQ";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function KanbanHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <HeroSection />
      
      {/* Quick Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-4 px-4 pb-16 flex-wrap"
      >
        <Link to="/taskForm">
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
            ➕ Create Task
          </button>
        </Link>
        <Link to="/Taskkanbanboard">
          <button className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
            📊 View Board
          </button>
        </Link>
        <Link to="/getTask">
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
            📋 All Tasks
          </button>
        </Link>
      </motion.div>

      <AboutSection />
      <StatsSection />
      <FeaturesSection />
      <FeedbackSection />
      <FAQs />
    </div>
  );
}
