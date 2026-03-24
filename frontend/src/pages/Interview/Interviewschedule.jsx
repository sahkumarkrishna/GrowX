import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Calendar, Clock, User, Briefcase, Brain, ShieldCheck,
  CirclePlay, ChevronRight, Search, Check,
} from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";
import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const Field = ({ label, children, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:border-violet-500 focus:bg-violet-500/5 outline-none transition-colors placeholder-gray-600 text-sm";

export default function InterviewSchedule() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    title: "",
    candidateId: "",
    jobId: "",
    scheduledAt: "",
    duration: "60",
    type: "video",
    timezone: "Asia/Kolkata",
    enableProctoring: false,
    enableRecording: false,
    questionIds: [],
  });

  const [candidates, setCandidates] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [candidateSearch, setCandidateSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: details, 2: questions, 3: review

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, questionsRes] = await Promise.all([
          axios.get(`${BACKEND}/api/v1/user/all`, { withCredentials: true }).catch(() => ({ data: { users: [] } })),
          axios.get(`${BACKEND}/api/v1/interview/questions/all`, { withCredentials: true }).catch(() => ({ data: { questions: [] } })),
        ]);
        setCandidates(usersRes.data.users || []);
        setQuestions(questionsRes.data.questions || []);
      } catch {}
    };
    fetchData();
  }, []);

  const filteredCandidates = candidates.filter(
    (c) =>
      c.role === "student" &&
      (c.fullname?.toLowerCase().includes(candidateSearch.toLowerCase()) ||
        c.email?.toLowerCase().includes(candidateSearch.toLowerCase()))
  );

  const toggleQuestion = (id) => {
    setForm((prev) => ({
      ...prev,
      questionIds: prev.questionIds.includes(id)
        ? prev.questionIds.filter((q) => q !== id)
        : [...prev.questionIds, id],
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.candidateId || !form.scheduledAt) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${BACKEND}/api/v1/interview/schedule`, form, { withCredentials: true });
      if (data.success) {
        toast.success("✅ Interview scheduled & email sent!");
        navigate("/interview/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to schedule interview");
    } finally {
      setLoading(false);
    }
  };

  const INTERVIEW_TYPES = [
    { value: "video", label: "Video Call", icon: CirclePlay },
    { value: "technical", label: "Technical", icon: Brain },
    { value: "phone", label: "Phone", icon: Clock },
    { value: "in-person", label: "In Person", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-5%] w-96 h-96 bg-violet-800/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <IoMdArrowRoundBack size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </motion.button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Schedule Interview</h1>
          <p className="text-gray-400 text-sm">Set up a new interview session with your candidate</p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {["Interview Details", "Question Bank", "Review & Send"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => i + 1 < step && setStep(i + 1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  step === i + 1
                    ? "bg-violet-600 text-white"
                    : step > i + 1
                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/20"
                    : "bg-white/5 text-gray-500"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  step > i + 1 ? "bg-emerald-500 text-white" : "bg-white/10"
                }`}>
                  {step > i + 1 ? <Check size={11} /> : i + 1}
                </span>
                <span className="hidden sm:block">{s}</span>
              </button>
              {i < 2 && <ChevronRight size={14} className="text-gray-600" />}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5"
        >
          {/* ── Step 1: Details ─────────────────────────────────────────────── */}
          {step === 1 && (
            <>
              <Field label="Interview Title" required>
                <input
                  className={inputCls}
                  placeholder="e.g. Frontend Developer — Round 2"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Field>

              <Field label="Select Candidate" required>
                <div className="relative mb-2">
                  <Search size={16} className="absolute left-3 top-3.5 text-gray-500" />
                  <input
                    className={inputCls + " pl-9"}
                    placeholder="Search by name or email…"
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                  />
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {filteredCandidates.slice(0, 20).map((c) => (
                    <button
                      key={c._id}
                      onClick={() => setForm({ ...form, candidateId: c._id })}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        form.candidateId === c._id
                          ? "bg-violet-600/30 border border-violet-500/40"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {c.fullname?.[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">{c.fullname}</p>
                        <p className="text-gray-500 text-xs truncate">{c.email}</p>
                      </div>
                      {form.candidateId === c._id && <Check size={15} className="text-violet-400 ml-auto shrink-0" />}
                    </button>
                  ))}
                  {filteredCandidates.length === 0 && (
                    <p className="text-gray-600 text-sm text-center py-4">No candidates found</p>
                  )}
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Date & Time" required>
                  <input
                    type="datetime-local"
                    className={inputCls}
                    value={form.scheduledAt}
                    min={new Date().toISOString().slice(0, 16)}
                    onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                  />
                </Field>
                <Field label="Duration (minutes)">
                  <select
                    className={inputCls}
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  >
                    {[30, 45, 60, 90, 120].map((d) => (
                      <option key={d} value={d}>{d} min</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Interview Type">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {INTERVIEW_TYPES.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setForm({ ...form, type: value })}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors text-sm ${
                        form.type === value
                          ? "bg-violet-600/30 border-violet-500/50 text-violet-300"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-violet-500/30 transition-colors">
                  <input
                    type="checkbox"
                    className="accent-violet-600 w-4 h-4"
                    checked={form.enableProctoring}
                    onChange={(e) => setForm({ ...form, enableProctoring: e.target.checked })}
                  />
                  <div>
                    <p className="text-white text-sm font-medium flex items-center gap-1"><ShieldCheck size={14} className="text-violet-400" /> AI Proctoring</p>
                    <p className="text-gray-500 text-xs">Face & tab detection</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-violet-500/30 transition-colors">
                  <input
                    type="checkbox"
                    className="accent-violet-600 w-4 h-4"
                    checked={form.enableRecording}
                    onChange={(e) => setForm({ ...form, enableRecording: e.target.checked })}
                  />
                  <div>
                    <p className="text-white text-sm font-medium flex items-center gap-1"><CirclePlay size={14} className="text-blue-400" /> Recording</p>
                    <p className="text-gray-500 text-xs">Save session replay</p>
                  </div>
                </label>
              </div>
            </>
          )}

          {/* ── Step 2: Questions ───────────────────────────────────────────── */}
          {step === 2 && (
            <div>
              <p className="text-gray-400 text-sm mb-4">
                Select questions from the bank. Selected: <span className="text-violet-400 font-semibold">{form.questionIds.length}</span>
              </p>
              {questions.length === 0 ? (
                <div className="text-center py-10 text-gray-600">
                  <Brain size={36} className="mx-auto mb-3 opacity-40" />
                  <p>No questions in the bank yet.</p>
                  <button onClick={() => navigate("/interview/questions")} className="text-violet-400 text-sm mt-2 hover:underline">
                    Add questions →
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {questions.map((q) => (
                    <button
                      key={q._id}
                      onClick={() => toggleQuestion(q._id)}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                        form.questionIds.includes(q._id)
                          ? "bg-violet-600/20 border-violet-500/40"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                        form.questionIds.includes(q._id) ? "bg-violet-600 border-violet-500" : "border-gray-600"
                      }`}>
                        {form.questionIds.includes(q._id) && <Check size={11} className="text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">{q.text}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            q.difficulty === "easy" ? "bg-emerald-500/20 text-emerald-400" :
                            q.difficulty === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-red-500/20 text-red-400"
                          }`}>{q.difficulty}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">{q.category}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-400">{q.type}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Step 3: Review ──────────────────────────────────────────────── */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Review Details</h3>
              {[
                ["Title", form.title],
                ["Candidate", candidates.find((c) => c._id === form.candidateId)?.fullname || "—"],
                ["Date & Time", form.scheduledAt ? new Date(form.scheduledAt).toLocaleString("en-IN") : "—"],
                ["Duration", `${form.duration} minutes`],
                ["Type", form.type],
                ["Questions", `${form.questionIds.length} selected`],
                ["Proctoring", form.enableProctoring ? "Enabled" : "Disabled"],
                ["Recording", form.enableRecording ? "Enabled" : "Disabled"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400 text-sm">{k}</span>
                  <span className="text-white text-sm font-medium">{v}</span>
                </div>
              ))}
              <div className="bg-violet-600/10 border border-violet-500/20 rounded-xl p-4 text-sm text-violet-300">
                📧 An email with meeting details and the join link will be sent to the candidate automatically.
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-5 py-3 rounded-xl transition-colors text-sm"
          >
            <IoMdArrowRoundBack size={16} />
            {step === 1 ? "Cancel" : "Back"}
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl transition-colors text-sm font-semibold"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white px-6 py-3 rounded-xl transition-colors text-sm font-semibold"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Scheduling…</>
              ) : (
                <><Calendar size={16} />Schedule & Send Email</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}