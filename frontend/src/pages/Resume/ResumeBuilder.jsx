import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import { FaSave, FaEye, FaPlus, FaTimes } from "react-icons/fa";

export default function ResumeBuilder() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const sections = [
    { name: "Personal Info", icon: "👤" },
    { name: "Education", icon: "🎓" },
    { name: "Technical Skills", icon: "💻" },
    { name: "Experience", icon: "💼" },
    { name: "Projects", icon: "🚀" },
    { name: "Achievements", icon: "🏆" },
    { name: "Certifications", icon: "📜" },
  ];

  const [activeSection, setActiveSection] = useState("Personal Info");
  const [savedResumeId, setSavedResumeId] = useState(null);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "", title: "", email: "", phone: "", address: "", linkedin: "", github: "", portfolio: "",
  });

  const [education, setEducation] = useState([
    { level: "", institution: "", degree: "", cgpa: "", startDate: null, endDate: null, city: "", description: "" },
  ]);

  const [technicalSkills, setTechnicalSkills] = useState({
    Languages: [], "Libraries / Frameworks": [], Databases: [], "Cloud Platforms": [], Tools: [], CsFundamentals: [],
  });

  const [experience, setExperience] = useState([
    { company: "", role: "", location: "", startDate: null, endDate: null, currentlyWorking: false, descriptions: [""] },
  ]);

  const [projects, setProjects] = useState([{ title: "", link: "", createdDate: null, descriptions: [""] }]);
  const [achievements, setAchievements] = useState([""]);
  const [certifications, setCertifications] = useState([{ name: "", provider: "" }]);
  const [skillInput, setSkillInput] = useState("");

  const resumeRef = useRef();

  const handleSkillAdd = (category) => {
    if (!skillInput.trim()) return;
    setTechnicalSkills({ ...technicalSkills, [category]: [...technicalSkills[category], skillInput.trim()] });
    setSkillInput("");
    toast.success(`Skill added ✅`);
  };

  const handleSkillRemove = (category, idx) => {
    const newSkills = [...technicalSkills[category]];
    newSkills.splice(idx, 1);
    setTechnicalSkills({ ...technicalSkills, [category]: newSkills });
  };

  const handleSaveResume = async () => {
    try {
      const newResume = { personalInfo, education, technicalSkills, experience, projects, achievements, certifications };
      const res = await axios.post(`${API_URL}`, newResume);
      const resumeId = res.data?.data?._id;
      setSavedResumeId(resumeId);
      toast.success("✅ Resume Saved!");
    } catch (error) {
      toast.error("❌ Failed to save");
    }
  };

  const currentIndex = sections.findIndex(s => s.name === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 px-4 py-8 -mt-16">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md"
      >
        <IoMdArrowRoundBack size={24} />
        Back
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Resume Builder
          </h1>
          <p className="text-gray-600 mt-2">Create your professional resume</p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/all-resumes")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <FaEye /> All Resumes
          </motion.button>

          {!savedResumeId ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveResume}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <FaSave /> Save Resume
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/resume/${savedResumeId}`)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <FaEye /> View Resume
            </motion.button>
          )}
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="lg:w-64 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {sections.map((section, idx) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all flex-shrink-0 ${
                  activeSection === section.name
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-white hover:bg-purple-50 border border-purple-100"
                }`}
                onClick={() => setActiveSection(section.name)}
              >
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-xl">{section.icon}</span>
                  <span className="text-sm lg:text-base">{section.name}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-white rounded-2xl shadow-xl p-6 lg:p-8"
          ref={resumeRef}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{sections.find(s => s.name === activeSection)?.icon}</span>
            <h2 className="text-2xl font-bold text-gray-800">{activeSection}</h2>
          </div>

          {/* Personal Info */}
          {activeSection === "Personal Info" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(personalInfo).map((key) => (
                <Input
                  key={key}
                  placeholder={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                  value={personalInfo[key]}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, [key]: e.target.value })}
                  className="border-2 focus:border-purple-500"
                />
              ))}
            </div>
          )}

          {/* Education */}
          {activeSection === "Education" && (
            <>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-6 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Institution" value={edu.institution} onChange={(e) => { const newEd = [...education]; newEd[idx].institution = e.target.value; setEducation(newEd); }} />
                    <Input placeholder="Degree" value={edu.degree} onChange={(e) => { const newEd = [...education]; newEd[idx].degree = e.target.value; setEducation(newEd); }} />
                    <Input placeholder="CGPA" value={edu.cgpa} onChange={(e) => { const newEd = [...education]; newEd[idx].cgpa = e.target.value; setEducation(newEd); }} />
                    <Input placeholder="City" value={edu.city} onChange={(e) => { const newEd = [...education]; newEd[idx].city = e.target.value; setEducation(newEd); }} />
                    <DatePicker selected={edu.startDate} onChange={(date) => { const newEd = [...education]; newEd[idx].startDate = date; setEducation(newEd); }} dateFormat="MMM yyyy" showMonthYearPicker placeholderText="Start Date" className="border-2 rounded-lg p-3 w-full" />
                    <DatePicker selected={edu.endDate} onChange={(date) => { const newEd = [...education]; newEd[idx].endDate = date; setEducation(newEd); }} dateFormat="MMM yyyy" showMonthYearPicker placeholderText="End Date" className="border-2 rounded-lg p-3 w-full" />
                  </div>
                </div>
              ))}
              <Button onClick={() => setEducation([...education, { level: "", institution: "", degree: "", cgpa: "", startDate: null, endDate: null, city: "", description: "" }])} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <FaPlus className="mr-2" /> Add Education
              </Button>
            </>
          )}

          {/* Technical Skills */}
          {activeSection === "Technical Skills" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(technicalSkills).map((key) => (
                <div key={key} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <label className="font-bold text-gray-700 mb-3 block">{key}</label>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {technicalSkills[key].map((skill, idx) => (
                      <span key={idx} className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {skill}
                        <button onClick={() => handleSkillRemove(key, idx)} className="hover:text-red-300">
                          <FaTimes size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add skill" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} className="flex-1" />
                    <Button onClick={() => handleSkillAdd(key)} className="bg-purple-600">Add</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {activeSection === "Experience" && (
            <>
              {experience.map((exp, idx) => (
                <div key={idx} className="mb-6 p-4 bg-pink-50 rounded-xl border-2 border-pink-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Company" value={exp.company} onChange={(e) => { const newExp = [...experience]; newExp[idx].company = e.target.value; setExperience(newExp); }} />
                    <Input placeholder="Role" value={exp.role} onChange={(e) => { const newExp = [...experience]; newExp[idx].role = e.target.value; setExperience(newExp); }} />
                    <Input placeholder="Location" value={exp.location} onChange={(e) => { const newExp = [...experience]; newExp[idx].location = e.target.value; setExperience(newExp); }} />
                    <DatePicker selected={exp.startDate} onChange={(date) => { const newExp = [...experience]; newExp[idx].startDate = date; setExperience(newExp); }} dateFormat="MMM yyyy" showMonthYearPicker placeholderText="Start Date" className="border-2 rounded-lg p-3 w-full" />
                    <DatePicker selected={exp.endDate} onChange={(date) => { const newExp = [...experience]; newExp[idx].endDate = date; setExperience(newExp); }} dateFormat="MMM yyyy" showMonthYearPicker placeholderText="End Date" className="border-2 rounded-lg p-3 w-full" disabled={exp.currentlyWorking} />
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={exp.currentlyWorking} onChange={(e) => { const newExp = [...experience]; newExp[idx].currentlyWorking = e.target.checked; if (e.target.checked) newExp[idx].endDate = null; setExperience(newExp); }} />
                      Currently Working
                    </label>
                    <Textarea placeholder="Description (one per line)" value={exp.descriptions.join("\n")} onChange={(e) => { const newExp = [...experience]; newExp[idx].descriptions = e.target.value.split("\n"); setExperience(newExp); }} className="col-span-1 md:col-span-2" />
                  </div>
                </div>
              ))}
              <Button onClick={() => setExperience([...experience, { company: "", role: "", location: "", startDate: null, endDate: null, currentlyWorking: false, descriptions: [""] }])} className="bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                <FaPlus className="mr-2" /> Add Experience
              </Button>
            </>
          )}

          {/* Projects */}
          {activeSection === "Projects" && (
            <>
              {projects.map((proj, idx) => (
                <div key={idx} className="mb-6 p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Project Title" value={proj.title} onChange={(e) => { const newProj = [...projects]; newProj[idx].title = e.target.value; setProjects(newProj); }} />
                    <Input placeholder="Link" value={proj.link} onChange={(e) => { const newProj = [...projects]; newProj[idx].link = e.target.value; setProjects(newProj); }} />
                    <DatePicker selected={proj.createdDate} onChange={(date) => { const newProj = [...projects]; newProj[idx].createdDate = date; setProjects(newProj); }} dateFormat="MMM yyyy" showMonthYearPicker placeholderText="Created Date" className="border-2 rounded-lg p-3 w-full" />
                    <Textarea placeholder="Descriptions (one per line)" value={proj.descriptions.join("\n")} onChange={(e) => { const newProj = [...projects]; newProj[idx].descriptions = e.target.value.split("\n"); setProjects(newProj); }} className="col-span-1 md:col-span-2" />
                  </div>
                </div>
              ))}
              <Button onClick={() => setProjects([...projects, { title: "", link: "", createdDate: null, descriptions: [""] }])} className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                <FaPlus className="mr-2" /> Add Project
              </Button>
            </>
          )}

          {/* Achievements */}
          {activeSection === "Achievements" && (
            <>
              {achievements.map((ach, idx) => (
                <div key={idx} className="flex items-center gap-3 mb-3">
                  <Input placeholder={`Achievement ${idx + 1}`} value={ach} onChange={(e) => { const newAch = [...achievements]; newAch[idx] = e.target.value; setAchievements(newAch); }} className="flex-1" />
                  <button onClick={() => setAchievements(achievements.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">
                    <FaTimes size={20} />
                  </button>
                </div>
              ))}
              <Button onClick={() => setAchievements([...achievements, ""])} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <FaPlus className="mr-2" /> Add Achievement
              </Button>
            </>
          )}

          {/* Certifications */}
          {activeSection === "Certifications" && (
            <>
              {certifications.map((cert, idx) => (
                <div key={idx} className="mb-4 p-4 bg-green-50 rounded-xl border-2 border-green-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Certification Name" value={cert.name} onChange={(e) => { const newCert = [...certifications]; newCert[idx].name = e.target.value; setCertifications(newCert); }} />
                  <Input placeholder="Provider" value={cert.provider} onChange={(e) => { const newCert = [...certifications]; newCert[idx].provider = e.target.value; setCertifications(newCert); }} />
                </div>
              ))}
              <Button onClick={() => setCertifications([...certifications, { name: "", provider: "" }])} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <FaPlus className="mr-2" /> Add Certification
              </Button>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t-2">
            <Button
              onClick={() => currentIndex > 0 && setActiveSection(sections[currentIndex - 1].name)}
              disabled={currentIndex === 0}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              ← Previous
            </Button>
            <Button
              onClick={() => currentIndex < sections.length - 1 && setActiveSection(sections[currentIndex + 1].name)}
              disabled={currentIndex === sections.length - 1}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-50"
            >
              Next →
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
