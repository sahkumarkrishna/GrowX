import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaThLarge, FaDownload } from "react-icons/fa";

export default function WhyChoose() {
  const features = [
    {
      icon: <FaBolt size={32} />,
      title: "Lightning Fast",
      description: "Create professional resumes in under 5 minutes with our streamlined process",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaThLarge size={32} />,
      title: "Pro Templates",
      description: "Choose from dozens of recruiter-approved, industry-specific templates",
      gradient: "from-pink-500 to-orange-500",
    },
    {
      icon: <FaDownload size={32} />,
      title: "Instant Export",
      description: "Download high-quality PDFs instantly with perfect formatting",
      gradient: "from-orange-500 to-yellow-500",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 font-semibold text-sm mb-4">
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Platform?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to create a professional resume that stands out
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className={`relative w-16 h-16 flex items-center justify-center rounded-xl mb-6 bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="relative text-2xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="relative text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
