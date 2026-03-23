import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FileText, Star } from "lucide-react";
import templates from "./Templates";

// ── Category filter options ───────────────────────────────────────────────────
const CATEGORIES = ["All", "Minimal", "Professional", "Creative", "Executive", "Tech", "Modern", "Student"];

export default function ResumeTemplates() {
  const navigate  = useNavigate();
  const [active,  setActive]  = useState("All");
  const [imgErrors, setImgErrors] = useState({});

  const filtered = active === "All"
    ? templates
    : templates.filter(t => t.category === active);

  const handleImgError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 md:p-8 lg:p-12">

      {/* Back */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 bg-white text-gray-800 px-4 py-2.5
                   rounded-xl font-bold hover:bg-gray-50 transition-all shadow-md border border-gray-100">
        <IoMdArrowRoundBack size={20} />
        Back
      </motion.button>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10">
        <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100
                        rounded-full text-purple-700 font-semibold text-sm mb-4">
          Templates Gallery
        </div>
        <h1 className="text-3xl sm:text-5xl font-black mb-3">
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600
                           bg-clip-text text-transparent">
            Resume Templates
          </span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          Choose from {templates.length} professionally designed templates and start building your resume.
        </p>
      </motion.header>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
        {CATEGORIES.map(cat => (
          <button key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              active === cat
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-200'
                : 'bg-white text-gray-600 hover:text-purple-600 border border-gray-200 hover:border-purple-300'
            }`}>
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filtered.map((template, idx) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-md
                       hover:shadow-2xl hover:shadow-purple-100 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/resume-builder')}>

            {/* Image area */}
            <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
              {imgErrors[template.id] ? (
                /* ── Fallback card when image fails ── */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6"
                  style={{ background: `linear-gradient(135deg,${template.color}15,${template.color}30)` }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                    style={{ background: `linear-gradient(135deg,${template.color},${template.color}cc)` }}>
                    <FileText size={28} className="text-white" />
                  </div>
                  {/* Fake resume lines */}
                  <div className="w-full space-y-2 px-2">
                    <div className="h-3 rounded-full w-3/4 mx-auto"
                      style={{ background: template.color, opacity: 0.7 }} />
                    <div className="h-2 rounded-full w-1/2 mx-auto bg-gray-300" />
                    <div className="mt-4 space-y-1.5">
                      {[80, 60, 70, 55, 65].map((w, i) => (
                        <div key={i} className="h-1.5 rounded-full bg-gray-200"
                          style={{ width: `${w}%` }} />
                      ))}
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {[90, 75, 80].map((w, i) => (
                        <div key={i} className="h-1.5 rounded-full bg-gray-200"
                          style={{ width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={template.preview}
                  alt={template.name}
                  onError={() => handleImgError(template.id)}
                  className="w-full h-full object-cover group-hover:scale-105
                             transition-transform duration-500"
                />
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <button className="w-full py-2.5 rounded-xl font-bold text-sm
                                   bg-white text-purple-600 hover:bg-purple-600 hover:text-white
                                   transition-all shadow-lg">
                  Use Template
                </button>
              </div>

              {/* Category badge */}
              <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full
                               bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
                {template.category}
              </span>
            </div>

            {/* Card footer */}
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">{template.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Template #{template.id}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={13} className="fill-amber-400" />
                <span className="text-xs font-bold text-gray-600">5.0</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <FileText size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No templates in this category</p>
        </div>
      )}

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-14 py-10 px-6 max-w-2xl mx-auto
                   bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-black text-white mb-2">Ready to build your resume?</h2>
        <p className="text-purple-100 text-sm mb-5">
          Pick any template and customize it with your details in minutes.
        </p>
        <button onClick={() => navigate('/resume-builder')}
          className="bg-white text-purple-600 font-black px-8 py-3 rounded-2xl
                     hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl">
          Start Building Now →
        </button>
      </motion.div>
    </div>
  );
}