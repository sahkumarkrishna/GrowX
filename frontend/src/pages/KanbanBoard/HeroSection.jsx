import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[65vh] flex flex-col items-center justify-center text-center 
                        
                        py-16 px-4 sm:px-8 overflow-hidden -mt-14">
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-indigo-300/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>

      {/* Primary Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 px-4 py-2 bg-purple-300/50 backdrop-blur-md rounded-full text-purple-900 font-medium shadow-sm"
      >
        Agile Task Management
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold mb-4"
      >
        Manage Your{" "}
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Tasks
        </span>{" "}
        Efficiently
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg md:text-xl max-w-2xl mb-8 opacity-90 text-gray-800"
      >
        Organize your workflow with our intuitive Kanban Board. Track tasks, update statuses, 
        and boost team productivity effortlessly.
      </motion.p>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="bg-[#0D1B2A] text-left font-mono text-sm md:text-base text-green-400 
                   px-6 py-4 rounded-lg shadow-md w-full max-w-2xl mx-auto border border-[#1A2B3C]"
      >
        Drag and drop tasks between columns to keep your project on track.
      </motion.div>
    </section>
  );
}
