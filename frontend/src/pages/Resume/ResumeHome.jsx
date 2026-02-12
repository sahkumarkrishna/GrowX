import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import About from "./About";
import StatsSection from "./StatsSection";
import Features from "./Features";
import WhyChoose from "./WhyChoose";
import FeedbackSection from "./FeedbackSection";
import FAQ from "./Frequently Asked Questions";

export default function ResumeHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 -mt-16">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="ml-6 mt-6 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md"
      >
        <IoMdArrowRoundBack size={24} />
        Back
      </motion.button>

      <HeroSection />
      
      {/* Quick Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-4 px-4 pb-16 flex-wrap -mt-8"
      >
        <Link to="/resume-builder">
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all"
          >
            ✍️ Create Resume
          </motion.button>
        </Link>
        <Link to="/all-resumes">
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all"
          >
            📄 My Resumes
          </motion.button>
        </Link>
        <Link to="/resume-templates">
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all"
          >
            🎨 Templates
          </motion.button>
        </Link>
      </motion.div>

      <About />
      <StatsSection />
      <Features />
      <WhyChoose />
      <FeedbackSection />
      <FAQ />
    </div>
  );
}
