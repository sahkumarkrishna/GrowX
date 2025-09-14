import React from "react";
import { motion } from "framer-motion";
import templates from "./Templates";

export default function ResumeTemplates() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 p-4 md:p-8 lg:p-12">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-purple-800 mb-3 md:mb-4">Resume Templates</h1>
        <p className="text-base md:text-lg text-gray-700 max-w-xl mx-auto">
          Browse and preview our resume templates.
        </p>
      </header>

      {/* Templates Grid */}
      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-purple-700 mb-6 text-center">
          Templates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
          {templates.map((template, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="border-2 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-xs"
            >
              <img
                src={template.preview}
                alt={`Resume ${idx + 1}`}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
