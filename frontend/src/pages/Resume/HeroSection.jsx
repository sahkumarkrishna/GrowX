// HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (

    <section className="relative min-h-[65vh]  py-16 px-4 sm:px-8">
      <div className="absolute inset-0 bg-grid-indigo-200/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>


      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex justify-center"
      >
        <span
          className="
      px-6 py-2 
      text-base sm:text-xs md:text-sm 
      font-medium 
      tracking-wide sm:tracking-widest 
      text-purple-800 
      bg-purple-200 
      rounded-full 
      shadow-md 
      inline-block
      whitespace-nowrap
    "
        >
          Professional Resume Builder
        </span>
      </motion.div>


      {/* Heading in one line */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight flex flex-wrap justify-center gap-2"
      >
        <span className="text-gray-900">Craft</span>
        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text">
          Professional
        </span>
        <span className="text-gray-900">Resumes</span>
      </motion.h1>

      {/* Subheading / Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-6 max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-gray-700 text-center"
      >
        Create job-winning resumes with expertly designed templates.
        ATS-friendly, recruiter-approved, and tailored to your career goals.
      </motion.p>

    </section>
  );
};

export default HeroSection;
