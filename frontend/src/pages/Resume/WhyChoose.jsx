import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaThLarge, FaDownload } from "react-icons/fa";

export default function WhyChoose() {
  const features = [
    {
      icon: <FaBolt size={28} />,
      title: "Lightning Fast",
      description:
        "Create professional resumes in under 5 minutes with our streamlined process",
      color: "bg-purple-500 text-white",
    },
    {
      icon: <FaThLarge size={28} />,
      title: "Pro Templates",
      description:
        "Choose from dozens of recruiter-approved, industry-specific templates",
      color: "bg-pink-500 text-white",
    },
    {
      icon: <FaDownload size={28} />,
      title: "Instant Export",
      description:
        "Download high-quality PDFs instantly with perfect formatting",
      color: "bg-orange-500 text-white",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900">
          Why Choose <span className="text-purple-600">Our Resume Platform?</span>
        </h2>
        <p className="mt-4 text-gray-600">
          Everything you need to create a professional resume that stands out
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-left"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${feature.color}`}
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
