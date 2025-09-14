import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
export default function ResumeEdit() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
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
  const [resumeLoaded, setResumeLoaded] = useState(false);

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

  const [education, setEducation] = useState([]);
  const [technicalSkills, setTechnicalSkills] = useState({
    Languages: [],
    "Libraries / Frameworks": [],
    Databases: [],
    "Cloud Platforms": [],
    Tools: [],
    CsFundamentals: [],
  });
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const resumeRef = useRef();

  // ---------------- FETCH EXISTING RESUME ----------------
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        const data = res.data.data;

        setPersonalInfo(data.personalInfo || personalInfo);
        setEducation(data.education || []);
        setTechnicalSkills(data.technicalSkills || technicalSkills);
        setExperience(data.experience || []);
        setProjects(data.projects || []);
        setAchievements(data.achievements || []);
        setCertifications(data.certifications || []);

        setResumeLoaded(true);
        toast.success("✅ Resume loaded successfully!");
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load resume data.");
      }
    };
    fetchResume();
  }, [id]);

  // ---------------- SKILL HANDLERS ----------------
  const handleSkillAdd = (category) => {
    if (!skillInput.trim()) return;
    setTechnicalSkills({
      ...technicalSkills,
      [category]: [...technicalSkills[category], skillInput.trim()],
    });
    toast.success(`Skill added to ${category} ✅`);
    setSkillInput("");
  };

  const handleSkillRemove = (category, idx) => {
    const newSkills = [...technicalSkills[category]];
    const removed = newSkills.splice(idx, 1);
    setTechnicalSkills({ ...technicalSkills, [category]: newSkills });
    toast.info(`Removed skill: ${removed[0]}`);
  };

  // ---------------- SAVE RESUME ----------------
  const handleSaveResume = async () => {
    try {
      const updatedResume = {
        personalInfo,
        education,
        technicalSkills,
        experience,
        projects,
        achievements,
        certifications,
      };
      await axios.put(`${API_URL}/update/${id}`, updatedResume);
      toast.success("✅ Resume updated successfully!");
      navigate(`/resume/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update resume.");
    }
  };

  const currentIndex = sections.indexOf(activeSection);

  if (!resumeLoaded)
    return (
      <>
        <p className="text-center mt-20 text-lg text-gray-500">Loading resume...</p>

      </>
    );
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 md:p-8 lg:p-12">
      {/* HEADER */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600">Edit Resume</h1>
        <div className="flex gap-4 flex-wrap">
          <Button
            onClick={handleSaveResume}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* SIDEBAR */}
        <div className="w-full md:w-1/5 flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {sections.map((section) => (
            <Card
              key={section}
              className={`p-3 md:p-4 text-center cursor-pointer transition text-sm md:text-base flex-shrink-0 ${activeSection === section
                  ? "bg-pink-100 border border-pink-300"
                  : "hover:bg-pink-50"
                }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </Card>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white rounded-lg shadow p-4 md:p-6" ref={resumeRef}>
          <h2 className="text-lg md:text-xl font-semibold mb-4">{activeSection}</h2>

          {/* ---------- PERSONAL INFO ---------- */}
          {activeSection === "Personal Info" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(personalInfo).map((key) => (
                <Input
                  key={key}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  value={personalInfo[key]}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, [key]: e.target.value })
                  }
                />
              ))}
            </div>
          )}

          {/* ---------- EDUCATION ---------- */}
          {activeSection === "Education" &&
            education.map((edu, idx) => (
              <div
                key={idx}
                className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg shadow-sm"
              >
                <Input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => {
                    const newEd = [...education];
                    newEd[idx].institution = e.target.value;
                    setEducation(newEd);
                  }}
                />
                <Input
                  placeholder="Degree / Board"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEd = [...education];
                    newEd[idx].degree = e.target.value;
                    setEducation(newEd);
                  }}
                />
                <Input
                  placeholder="CGPA / Percentage"
                  value={edu.cgpa}
                  onChange={(e) => {
                    const newEd = [...education];
                    newEd[idx].cgpa = e.target.value;
                    setEducation(newEd);
                  }}
                />
                <Input
                  placeholder="City"
                  value={edu.city}
                  onChange={(e) => {
                    const newEd = [...education];
                    newEd[idx].city = e.target.value;
                    setEducation(newEd);
                  }}
                />
                <div className="flex gap-2 col-span-1 md:col-span-2">
                  <DatePicker
                    selected={edu.startDate ? new Date(edu.startDate) : null}
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
                    selected={edu.endDate ? new Date(edu.endDate) : null}
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
            <Button
              onClick={() =>
                setEducation([
                  ...education,
                  {
                    level: "",
                    institution: "",
                    degree: "",
                    cgpa: "",
                    startDate: null,
                    endDate: null,
                    city: "",
                    description: "",
                  },
                ])
              }
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-full shadow-md mt-2"
            >
              ➕ Add Education
            </Button>
          )}

          {/* ---------- TECHNICAL SKILLS ---------- */}
          {activeSection === "Technical Skills" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(technicalSkills).map((key) => (
                <div
                  key={key}
                  className="flex flex-col bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-5 border border-gray-100"
                >
                  <label className="text-sm font-semibold text-gray-700 mb-2">{key}</label>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {technicalSkills[key].map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {skill}{" "}
                        <button onClick={() => handleSkillRemove(key, idx)}>x</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add Skill"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                    />
                    <Button
                      onClick={() => handleSkillAdd(key)}
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---------- EXPERIENCE ---------- */}
          {activeSection === "Experience" &&
            experience.map((exp, idx) => (
              <div
                key={idx}
                className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg shadow-sm"
              >
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...experience];
                    newExp[idx].company = e.target.value;
                    setExperience(newExp);
                  }}
                />
                <Input
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) => {
                    const newExp = [...experience];
                    newExp[idx].role = e.target.value;
                    setExperience(newExp);
                  }}
                />
                <DatePicker
                  selected={exp.startDate ? new Date(exp.startDate) : null}
                  onChange={(date) => {
                    const newExp = [...experience];
                    newExp[idx].startDate = date;
                    setExperience(newExp);
                  }}
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                  placeholderText="Start (Month/Year)"
                  className="border rounded p-2 w-full"
                />
                <DatePicker
                  selected={exp.endDate ? new Date(exp.endDate) : null}
                  onChange={(date) => {
                    const newExp = [...experience];
                    newExp[idx].endDate = date;
                    setExperience(newExp);
                  }}
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                  placeholderText="End (Month/Year)"
                  className="border rounded p-2 w-full"
                />
                <Textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const newExp = [...experience];
                    newExp[idx].description = e.target.value;
                    setExperience(newExp);
                  }}
                  className="col-span-1 md:col-span-2"
                />
              </div>
            ))}
          {activeSection === "Experience" && (
            <Button
              onClick={() =>
                setExperience([
                  ...experience,
                  { company: "", role: "", startDate: null, endDate: null, description: "" },
                ])
              }
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-full shadow-md mt-2"
            >
              ➕ Add Experience
            </Button>
          )}

          {/* ---------- PROJECTS ---------- */}
          {activeSection === "Projects" &&
            projects.map((proj, idx) => (
              <div
                key={idx}
                className="mb-6 border p-4 rounded-lg shadow-sm"
              >
                <Input
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => {
                    const newProj = [...projects];
                    newProj[idx].name = e.target.value;
                    setProjects(newProj);
                  }}
                />
                <Textarea
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) => {
                    const newProj = [...projects];
                    newProj[idx].description = e.target.value;
                    setProjects(newProj);
                  }}
                  className="mt-2"
                />
              </div>
            ))}
          {activeSection === "Projects" && (
            <Button
              onClick={() =>
                setProjects([...projects, { name: "", description: "" }])
              }
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-full shadow-md mt-2"
            >
              ➕ Add Project
            </Button>
          )}

          {/* ---------- ACHIEVEMENTS ---------- */}
          {activeSection === "Achievements" &&
            achievements.map((ach, idx) => (
              <div key={idx} className="mb-4">
                <Input
                  placeholder="Achievement"
                  value={ach}
                  onChange={(e) => {
                    const newAch = [...achievements];
                    newAch[idx] = e.target.value;
                    setAchievements(newAch);
                  }}
                />
              </div>
            ))}
          {activeSection === "Achievements" && (
            <Button
              onClick={() => setAchievements([...achievements, ""])}
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-full shadow-md mt-2"
            >
              ➕ Add Achievement
            </Button>
          )}

          {/* ---------- CERTIFICATIONS ---------- */}
          {activeSection === "Certifications" &&
            certifications.map((cert, idx) => (
              <div key={idx} className="mb-4">
                <Input
                  placeholder="Certification"
                  value={cert}
                  onChange={(e) => {
                    const newCert = [...certifications];
                    newCert[idx] = e.target.value;
                    setCertifications(newCert);
                  }}
                />
              </div>
            ))}
          {activeSection === "Certifications" && (
            <Button
              onClick={() => setCertifications([...certifications, ""])}
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-full shadow-md mt-2"
            >
              ➕ Add Certification
            </Button>
          )}

          {/* ---------- NEXT / PREVIOUS BUTTONS ---------- */}
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
