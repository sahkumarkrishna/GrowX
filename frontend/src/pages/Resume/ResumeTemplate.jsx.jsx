import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

const SectionTitle = ({ children, icon }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center w-full mb-4 mt-6"
  >
    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-md">
      {icon && <span className="text-lg">{icon}</span>}
      <h2 className="text-xl font-bold uppercase tracking-wide">{children}</h2>
    </div>
    <div className="flex-1 border-b-2 border-purple-200 ml-3"></div>
  </motion.div>
);

export default function ResumeTemplate({ resume }) {
  const {
    personalInfo = {},
    education = [],
    technicalSkills = {},
    experience = [],
    projects = [],
    achievements = [],
    certifications = [],
  } = resume || {};

  const resumeRef = useRef();

  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative -mt-16">
      <motion.div
        ref={resumeRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Header with Gradient Background */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative flex flex-col md:flex-row items-center gap-6">
            {/* Professional Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                {personalInfo.avatar ? (
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <span className="text-4xl font-black text-white">
                      {getInitials(personalInfo.fullName)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Name and Title */}
            <div className="flex-1 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black mb-2"
              >
                {personalInfo.fullName || "Your Name"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 font-medium mb-4"
              >
                {personalInfo.title || "Professional Title"}
              </motion.p>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                {personalInfo.phone && (
                  <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 hover:text-white/80 transition">
                    <FaPhone /> {personalInfo.phone}
                  </a>
                )}
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-white/80 transition">
                    <FaEnvelope /> {personalInfo.email}
                  </a>
                )}
                {personalInfo.address && (
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {personalInfo.address}
                  </span>
                )}
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition text-sm"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition text-sm"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {personalInfo.portfolio && (
                  <a
                    href={personalInfo.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition text-sm"
                  >
                    <FaGlobe /> Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <SectionTitle icon="🎓">Education</SectionTitle>
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="mb-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{edu.institution}</h3>
                    <span className="text-sm text-purple-600 font-medium">
                      {edu.startDate ? new Date(edu.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">{edu.degree}</p>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                    {edu.city && <span>{edu.city}</span>}
                  </div>
                </motion.div>
              ))}
            </section>
          )}

          {/* Technical Skills */}
          {Object.keys(technicalSkills).length > 0 && (
            <section>
              <SectionTitle icon="💻">Technical Skills</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(technicalSkills).map(([key, value], idx) => (
                  value.length > 0 && (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg"
                    >
                      <strong className="text-purple-700">{key}:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {value.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 shadow-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <SectionTitle icon="💼">Experience</SectionTitle>
              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="mb-4 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.company}</h3>
                      <p className="text-gray-700 font-medium">{exp.role}</p>
                    </div>
                    <span className="text-sm text-pink-600 font-medium">
                      {exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
                    </span>
                  </div>
                  {exp.location && <p className="text-sm text-gray-600 mb-2">📍 {exp.location}</p>}
                  <ul className="list-disc ml-5 space-y-1 text-gray-700">
                    {exp.descriptions?.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <SectionTitle icon="🚀">Projects</SectionTitle>
              {projects.map((proj, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="mb-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {proj.title}
                      {proj.link && (
                        <a
                          href={proj.link}
                          className="ml-2 text-orange-600 hover:text-orange-700 text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🔗 Link
                        </a>
                      )}
                    </h3>
                    {proj.createdDate && (
                      <span className="text-sm text-orange-600 font-medium">
                        {new Date(proj.createdDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                  <ul className="list-disc ml-5 space-y-1 text-gray-700">
                    {proj.descriptions?.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </section>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <section>
              <SectionTitle icon="🏆">Achievements</SectionTitle>
              <ul className="space-y-2">
                {achievements.map((ach, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg"
                  >
                    <span className="text-yellow-600 mt-1">⭐</span>
                    <span className="text-gray-700">{ach}</span>
                  </motion.li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <SectionTitle icon="📜">Certifications</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-3 bg-green-50 rounded-lg border-l-4 border-green-600"
                  >
                    <p className="font-bold text-gray-900">{cert.name}</p>
                    <p className="text-sm text-gray-600">{cert.provider}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      </motion.div>
    </div>
  );
}
