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

export default function ResumeBuilder() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const sections = [
    "Personal Info",
    "Education",
    "Technical Skills",
    "Experience",
    "Projects",
    "Achievements",
    "Certifications",
  ];

  const [activeSection, setActiveSection] = useState("Personal Info");
  const [savedResumeId, setSavedResumeId] = useState(null);

  // ---------- STATE ----------
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const [education, setEducation] = useState([
    { level: "", institution: "", degree: "", cgpa: "", startDate: null, endDate: null, city: "", description: "" },
  ]);

  const [technicalSkills, setTechnicalSkills] = useState({
    Languages: [],
    "Libraries / Frameworks": [],
    Databases: [],
    "Cloud Platforms": [],
    Tools: [],
    CsFundamentals: [],
  });

  const [experience, setExperience] = useState([
    { company: "", role: "", location: "", startDate: null, endDate: null, currentlyWorking: false, descriptions: [""] },
  ]);

  const [projects, setProjects] = useState([{ title: "", link: "", createdDate: null, descriptions: [""] }]);
  const [achievements, setAchievements] = useState([""]);
  const [certifications, setCertifications] = useState([{ name: "", provider: "" }]);
  const [skillInput, setSkillInput] = useState("");

  const resumeRef = useRef();

  // ---------- HANDLERS ----------
  const handleSkillAdd = (category) => {
    if (!skillInput.trim()) return;
    setTechnicalSkills({
      ...technicalSkills,
      [category]: [...technicalSkills[category], skillInput.trim()],
    });
    setSkillInput("");
    toast.success(`Skill added to ${category} ✅`);
  };

  const handleSkillRemove = (category, idx) => {
    const newSkills = [...technicalSkills[category]];
    const removed = newSkills.splice(idx, 1);
    setTechnicalSkills({ ...technicalSkills, [category]: newSkills });
    toast.info(`Removed skill: ${removed[0]}`);
  };

  // Save resume
  const handleSaveResume = async () => {
    try {
      const newResume = { personalInfo, education, technicalSkills, experience, projects, achievements, certifications };
      const res = await axios.post(`${API_URL}`, newResume);

      const resumeId = res.data?.data?._id;
      setSavedResumeId(resumeId);

      if (!resumeId) {
        toast.warning("⚠️ Resume saved but ID missing!");
      } else {
        toast.success("✅ Resume Saved Successfully!");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("❌ Failed to save resume");
    }
  };

  const currentIndex = sections.indexOf(activeSection);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white px-4 md:px-8 lg:px-12 pb-4 md:pb-8 lg:pb-12">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4]">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600">
          Resume Builder
        </h1>

        {/* Buttons Area */}
        {/* Buttons Section */}
        <div className="flex gap-4 mt-6">
          {/* Always show "View All Resumes" */}
          <Button
            onClick={() => navigate("/all-resumes")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            All Resumes
          </Button>

          {/* Show Save button if resume is not saved */}
          {!savedResumeId && (
            <Button
              onClick={handleSaveResume}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Save Resume
            </Button>
          )}

          {/* Show Resume Details button if resume is saved */}
          {savedResumeId && (
            <Button
              onClick={() => navigate(`/resume/${savedResumeId}`)}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              View Resume
            </Button>
          )}
        </div>

      </div>



      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {sections.map((section) => (
            <Card
              key={section}
              className={`p-3 md:p-4 text-center cursor-pointer transition text-sm md:text-base flex-shrink-0 ${activeSection === section ? "bg-pink-100 border border-pink-300" : "hover:bg-pink-50"
                }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow p-4 md:p-6" ref={resumeRef}>
          <h2 className="text-lg md:text-xl font-semibold mb-4">{activeSection}</h2>

          {/* ---------------- PERSONAL INFO ---------------- */}
          {activeSection === "Personal Info" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Full Name" value={personalInfo.fullName} onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} />
              <Input placeholder="Title" value={personalInfo.title} onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })} />
              <Input placeholder="Email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} />
              <Input placeholder="Phone" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} />
              <Input placeholder="Address" value={personalInfo.address} onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })} />
              <Input placeholder="LinkedIn" value={personalInfo.linkedin} onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })} />
              <Input placeholder="GitHub" value={personalInfo.github} onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })} />
              <Input placeholder="Portfolio" value={personalInfo.portfolio} onChange={(e) => setPersonalInfo({ ...personalInfo, portfolio: e.target.value })} />
            </div>
          )}

          {/* ---------------- EDUCATION ---------------- */}
          {activeSection === "Education" && education.map((edu, idx) => (
            <div
              key={idx}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border p-4 rounded-lg shadow-sm"
            >
              {/* Institution */}
              <Input
                placeholder="Institution / School / College"
                value={edu.institution}
                onChange={(e) => {
                  const newEd = [...education];
                  newEd[idx].institution = e.target.value;
                  setEducation(newEd);
                }}
              />

              {/* Degree */}
              <Input
                placeholder="Degree / Board"
                value={edu.degree}
                onChange={(e) => {
                  const newEd = [...education];
                  newEd[idx].degree = e.target.value;
                  setEducation(newEd);
                }}
              />

              {/* CGPA */}
              <Input
                placeholder="CGPA / Percentage"
                value={edu.cgpa}
                onChange={(e) => {
                  const newEd = [...education];
                  newEd[idx].cgpa = e.target.value;
                  setEducation(newEd);
                }}
              />

              {/* City */}
              <Input
                placeholder="City"
                value={edu.city}
                onChange={(e) => {
                  const newEd = [...education];
                  newEd[idx].city = e.target.value;
                  setEducation(newEd);
                }}
              />

              {/* Dates */}
              <div className="flex gap-2 col-span-1 md:col-span-2">
                <DatePicker
                  selected={edu.startDate}
                  onChange={(date) => {
                    const newEd = [...education];
                    newEd[idx].startDate = date;
                    setEducation(newEd);
                  }}
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                  placeholderText="Start (Month/Year)"
                  className="border rounded p-2 w-full"
                />
                <DatePicker
                  selected={edu.endDate}
                  onChange={(date) => {
                    const newEd = [...education];
                    newEd[idx].endDate = date;
                    setEducation(newEd);
                  }}
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                  placeholderText="End (Month/Year)"
                  className="border rounded p-2 w-full"
                />
              </div>


            </div>

          ))}
          {activeSection === "Education" && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => setEducation([...education, { level: "", institution: "", degree: "", cgpa: "", startDate: null, endDate: null, city: "", description: "" }])} className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-full shadow-md transition-all duration-200 active:scale-95">
                ➕ Add Education
              </Button>
            </div>
          )}

          {/* ---------------- TECHNICAL SKILLS ---------------- */}
          {activeSection === "Technical Skills" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(technicalSkills).map((key) => (
                <div key={key} className="flex flex-col bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-5 border border-gray-100">
                  <label className="text-sm font-semibold text-gray-700 mb-2">{key}</label>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {technicalSkills[key].map((skill, idx) => (
                      <span key={idx} className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        {skill} <button onClick={() => handleSkillRemove(key, idx)}>x</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add Skill" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} />
                    <Button onClick={() => handleSkillAdd(key)} className="bg-pink-500 hover:bg-pink-600 text-white">Add</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---------------- EXPERIENCE ---------------- */}
          {activeSection === "Experience" && experience.map((exp, idx) => (
            <div key={idx} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Company" value={exp.company} onChange={(e) => { const newExp = [...experience]; newExp[idx].company = e.target.value; setExperience(newExp); }} />
              <Input placeholder="Role" value={exp.role} onChange={(e) => { const newExp = [...experience]; newExp[idx].role = e.target.value; setExperience(newExp); }} />
              <Input placeholder="Location" value={exp.location} onChange={(e) => { const newExp = [...experience]; newExp[idx].location = e.target.value; setExperience(newExp); }} />
              <DatePicker selected={exp.startDate} onChange={(date) => { const newExp = [...experience]; newExp[idx].startDate = date; setExperience(newExp); }} dateFormat="MMM yyyy" showMonthYearPicker placeholderText="Start Date" className="border rounded p-2 w-full" />
              <DatePicker selected={exp.endDate} onChange={(date) => { const newExp = [...experience]; newExp[idx].endDate = date; setExperience(newExp); }} dateFormat="MMM yyyy" showMonthYearPicker placeholderText="End Date" className="border rounded p-2 w-full" disabled={exp.currentlyWorking} />
              <label className="flex items-center gap-2 col-span-1 md:col-span-2">
                <input type="checkbox" checked={exp.currentlyWorking} onChange={(e) => { const newExp = [...experience]; newExp[idx].currentlyWorking = e.target.checked; if (e.target.checked) newExp[idx].endDate = null; setExperience(newExp); }} />
                Currently Working
              </label>
              <Textarea placeholder="Description (one per line)" value={exp.descriptions.join("\n")} onChange={(e) => { const newExp = [...experience]; newExp[idx].descriptions = e.target.value.split("\n"); setExperience(newExp); }} className="col-span-1 md:col-span-2" />
            </div>
          ))}
          {activeSection === "Experience" && (
            <Button onClick={() => setExperience([...experience, { company: "", role: "", location: "", startDate: null, endDate: null, currentlyWorking: false, descriptions: [""] }])} className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-full shadow-md transition-all duration-200 active:scale-95">
              ➕ Add Experience
            </Button>
          )}

          {/* ---------------- PROJECTS ---------------- */}
          {activeSection === "Projects" && projects.map((proj, idx) => (
            <div key={idx} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Project Title" value={proj.title} onChange={(e) => { const newProj = [...projects]; newProj[idx].title = e.target.value; setProjects(newProj); }} />
              <Input placeholder="Link (GitHub/Live)" value={proj.link} onChange={(e) => { const newProj = [...projects]; newProj[idx].link = e.target.value; setProjects(newProj); }} />
              <DatePicker selected={proj.createdDate} onChange={(date) => { const newProj = [...projects]; newProj[idx].createdDate = date; setProjects(newProj); }} dateFormat="MMM yyyy" showMonthYearPicker placeholderText="Created Month/Year" className="border rounded p-2 w-full" />
              <Textarea placeholder="Descriptions (one per line)" value={proj.descriptions.join("\n")} onChange={(e) => { const newProj = [...projects]; newProj[idx].descriptions = e.target.value.split("\n"); setProjects(newProj); }} className="col-span-1 md:col-span-2" />
            </div>
          ))}
          {activeSection === "Projects" && (
            <Button onClick={() => setProjects([...projects, { title: "", link: "", createdDate: null, descriptions: [""] }])} className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-full shadow-md transition-all duration-200 active:scale-95">
              ➕ Add Project
            </Button>
          )}

          {/* ---------------- ACHIEVEMENTS ---------------- */}
          {activeSection === "Achievements" && (
            <div className="flex flex-col gap-4">
              {achievements.map((ach, idx) => (
                <div key={idx} className="flex items-center bg-white shadow-md rounded-xl p-3 gap-3 border border-gray-100">
                  <Input placeholder={`Achievement ${idx + 1}`} value={ach} onChange={(e) => { const newAch = [...achievements]; newAch[idx] = e.target.value; setAchievements(newAch); }} className="flex-1" />
                  <button onClick={() => setAchievements(achievements.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 transition">❌</button>
                </div>
              ))}
              <Button onClick={() => setAchievements([...achievements, ""])} className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-full shadow-md transition-all duration-200 active:scale-95">
                ➕ Add Achievement
              </Button>
            </div>
          )}

          {/* ---------------- CERTIFICATIONS ---------------- */}
          {activeSection === "Certifications" && certifications.map((cert, idx) => (
            <div key={idx} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg shadow-sm">
              <Input placeholder="Certification Name" value={cert.name} onChange={(e) => { const newCert = [...certifications]; newCert[idx].name = e.target.value; setCertifications(newCert); }} />
              <Input placeholder="Provider / Organization" value={cert.provider} onChange={(e) => { const newCert = [...certifications]; newCert[idx].provider = e.target.value; setCertifications(newCert); }} />
            </div>
          ))}
          {activeSection === "Certifications" && (
            <Button onClick={() => setCertifications([...certifications, { name: "", provider: "" }])} className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-full shadow-md transition-all duration-200 active:scale-95">
              ➕ Add Certification
            </Button>
          )}

          {/* ---------------- NEXT / PREVIOUS BUTTONS ---------------- */}
          {/* ---------------- NEXT / PREVIOUS BUTTONS ---------------- */}
          <div className="flex justify-between mt-6">
            <Button
              onClick={() => currentIndex > 0 && setActiveSection(sections[currentIndex - 1])}
              disabled={currentIndex === 0}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </Button>
            <Button
              onClick={() => currentIndex < sections.length - 1 && setActiveSection(sections[currentIndex + 1])}
              disabled={currentIndex === sections.length - 1}
              className="bg-pink-500 hover:bg-pink-600 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </Button>
          </div>




        </div>
      </div>

    </div>
  );

}
