import React from "react";

const SectionTitle = ({ children }) => (
  <h3 className="text-lg font-bold uppercase border-b-2 border-indigo-500 pb-1 mb-3 text-indigo-600 tracking-wide">
    {children}
  </h3>
);

export default function Resumeviews({ resume }) {
  if (!resume) return null;

  const {
    personalInfo = {},
    education = [],
    technicalSkills = {},
    experience = [],
    projects = [],
    achievements = [],
  } = resume;

  return (
    <div
      id="resume-view"
      className="max-w-5xl mx-auto bg-white shadow-2xl p-8 rounded-lg"
    >
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold tracking-tight">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg mt-1 opacity-90">
          {personalInfo.title || "Full Stack Developer"}
        </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
  
  {personalInfo.email && (
    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
      <span>📧</span>
      <span className="truncate">{personalInfo.email}</span>
    </div>
  )}

  {personalInfo.phone && (
    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
      <span>📞</span>
      <span>{personalInfo.phone}</span>
    </div>
  )}

  {personalInfo.linkedin && (
    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
      <span>🔗</span>
      <span className="truncate">{personalInfo.linkedin}</span>
    </div>
  )}

  {personalInfo.github && (
    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
      <span>💻</span>
      <span className="truncate">{personalInfo.github}</span>
    </div>
  )}

</div>
      </div>

      {/* BODY */}
      <div className="flex flex-col md:flex-row gap-8 mt-8">

        {/* LEFT SIDE */}
        <div className="md:w-1/3 space-y-6">

          {/* SKILLS */}
          <div>
            <SectionTitle>Skills</SectionTitle>
            {Object.entries(technicalSkills).map(([key, val]) => (
              <div key={key} className="mb-3">
                <p className="font-semibold text-base text-gray-800">{key}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {val.join(", ")}
                </p>
              </div>
            ))}
          </div>

          {/* EDUCATION */}
          <div>
            <SectionTitle>Education</SectionTitle>
            {education.map((edu, i) => (
              <div key={i} className="mb-4">
                <p className="font-bold text-base">{edu.institution}</p>
                <p className="text-sm text-indigo-600 font-medium">
                  {edu.degree}
                </p>
                <p className="text-sm text-gray-600">
                  CGPA: {edu.cgpa}
                </p>
              </div>
            ))}
          </div>

          {/* ACHIEVEMENTS */}
          <div>
            <SectionTitle>Achievements</SectionTitle>
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
              {achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 space-y-6">

          {/* EXPERIENCE */}
          <div>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp, i) => (
              <div key={i} className="mb-5">
                <p className="font-bold text-lg">{exp.role}</p>
                <p className="text-indigo-600 font-semibold">
                  {exp.company}
                </p>
                <ul className="list-disc ml-5 mt-2 space-y-1 text-sm text-gray-700">
                  {exp.descriptions?.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* PROJECTS */}
          <div>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((proj, i) => (
              <div key={i} className="mb-5">
                <p className="font-bold text-lg">{proj.title}</p>
                {proj.link && (
                  <p className="text-blue-600 text-sm mb-1">
                    {proj.link}
                  </p>
                )}
                <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                  {proj.descriptions?.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}