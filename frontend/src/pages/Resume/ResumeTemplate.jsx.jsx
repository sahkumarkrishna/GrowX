import React, { useRef } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";

const SectionTitle = ({ children }) => (
  <div className="flex items-center w-full mb-3">
    <h2 className="text-xl sm:text-2xl font-semibold font-serif whitespace-nowrap">
      {children}
    </h2>
    <div className="flex-1 border-b-2 border-gray-700 ml-3"></div>
  </div>
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

  return (
    <div className="relative">
      {/* Resume Content */}
      <div
        ref={resumeRef}
        className="max-w-3xl sm:max-w-5xl mx-auto bg-white p-4 sm:p-8 shadow-xl text-gray-900 rounded-xl font-sans mb-20 mt-10"
      >
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold font-serif">
            {personalInfo.fullName}
          </h1>
          {personalInfo.address && (
            <p className="text-sm sm:text-base text-gray-700 mt-1">
              {personalInfo.address}
            </p>
          )}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-3 text-sm sm:text-base">
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <FaPhone />
                <a href={`tel:${personalInfo.phone}`} className="hover:text-gray-700">
                  {personalInfo.phone}
                </a>
              </span>
            )}
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <FaEnvelope />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="underline decoration-gray-400 hover:decoration-black"
                >
                  {personalInfo.email}
                </a>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <FaLinkedin />
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gray-400 hover:decoration-black"
                >
                  LinkedIn
                </a>
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <FaGithub />
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gray-400 hover:decoration-black"
                >
                  GitHub
                </a>
              </span>
            )}
            {personalInfo.portfolio && (
              <span className="flex items-center gap-1">
                <FaGlobe />
                <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gray-400 hover:decoration-black"
                >
                  Portfolio
                </a>
              </span>
            )}
          </div>
        </header>

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-5">
            <SectionTitle>Education</SectionTitle>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <p className="text-base sm:text-lg font-semibold">
                    {edu.institution}
                  </p>
                  <p className="italic text-xs sm:text-sm text-gray-600">
                    {edu.startDate
                      ? new Date(edu.startDate).toLocaleString("default", {
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                    {" - "}
                    {edu.endDate
                      ? new Date(edu.endDate).toLocaleString("default", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Present"}
                  </p>
                </div>
                <p className="italic text-xs sm:text-sm text-gray-700">
                  {edu.degree}
                </p>
                <div className="flex justify-between text-xs sm:text-sm text-gray-700">
                  <p>{edu.cgpa && `CGPA: ${edu.cgpa}`}</p>
                  <p>{edu.city}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Technical Skills */}
        {Object.keys(technicalSkills).length > 0 && (
          <section className="mb-5">
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="text-sm space-y-1">
              {Object.entries(technicalSkills).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value.join(", ")}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-5">
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <p className="text-base sm:text-lg font-semibold">
                    {exp.company}
                  </p>
                  <p className="italic text-xs sm:text-sm text-gray-600">
                    {exp.startDate
                      ? new Date(exp.startDate).toLocaleString("default", {
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                    {" - "}
                    {exp.endDate
                      ? new Date(exp.endDate).toLocaleString("default", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Present"}
                  </p>
                </div>
                <p className="italic text-xs sm:text-sm text-gray-700">
                  {exp.role}
                </p>
                <ul className="list-disc ml-5 text-xs sm:text-sm space-y-1 mt-1">
                  {exp.descriptions?.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-5">
            <SectionTitle>Projects</SectionTitle>
            {projects.map((proj, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <p className="text-base sm:text-lg font-semibold">
                    {proj.title}{" "}
                    {proj.link && (
                      <a
                        href={proj.link}
                        className="underline text-black hover:text-gray-700 ml-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        [Link]
                      </a>
                    )}
                  </p>
                  {proj.createdDate && (
                    <p className="italic text-xs sm:text-sm text-gray-600">
                      {new Date(proj.createdDate).toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
                <ul className="list-disc ml-5 text-xs sm:text-sm space-y-1 mt-1">
                  {proj.descriptions?.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <section className="mb-5">
            <SectionTitle>Achievements</SectionTitle>
            <ul className="list-disc ml-5 text-xs sm:text-sm space-y-1">
              {achievements.map((ach, idx) => (
                <li key={idx}>{ach}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-5">
            <SectionTitle>Certifications</SectionTitle>
            <ul className="list-disc ml-5 text-xs sm:text-sm space-y-1">
              {certifications.map((cert, idx) => (
                <li key={idx}>
                  {cert.name} — {cert.provider}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
