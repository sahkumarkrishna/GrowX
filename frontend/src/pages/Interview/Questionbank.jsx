import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain, Plus, Search, Trash2, Edit3, Code2,
  MessageSquare, HelpCircle, Loader2, Filter, X,
} from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";
import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const CATEGORIES = ["all", "javascript", "python", "java", "react", "nodejs", "dsa", "system-design", "database", "hr", "behavioral", "general"];
const DIFFICULTIES = ["all", "easy", "medium", "hard"];
const TYPES = ["all", "mcq", "subjective", "coding"];

const TYPE_ICON = { mcq: HelpCircle, subjective: MessageSquare, coding: Code2 };

const DIFF_COLORS = {
  easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  hard: "text-red-400 bg-red-500/10 border-red-500/20",
};

const emptyForm = {
  text: "", type: "mcq", category: "general", difficulty: "medium",
  marks: 5, timeLimit: 120, sampleAnswer: "", explanation: "",
  options: [{ text: "", isCorrect: false }, { text: "", isCorrect: false }, { text: "", isCorrect: false }, { text: "", isCorrect: false }],
};

export default function QuestionBank() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const fetchQuestions = async () => {
    try {
      const params = new URLSearchParams();
      if (catFilter !== "all") params.set("category", catFilter);
      if (diffFilter !== "all") params.set("difficulty", diffFilter);
      if (typeFilter !== "all") params.set("type", typeFilter);
      if (search) params.set("search", search);

      const { data } = await axios.get(`${BACKEND}/api/v1/interview/questions/all?${params}`, { withCredentials: true });
      if (data.success) setQuestions(data.questions || []);
    } catch { toast.error("Failed to load questions"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchQuestions(); }, [catFilter, diffFilter, typeFilter]);

  const openCreate = () => { setForm(emptyForm); setEditQuestion(null); setShowModal(true); };
  const openEdit = (q) => {
    setForm({
      text: q.text, type: q.type, category: q.category,
      difficulty: q.difficulty, marks: q.marks, timeLimit: q.timeLimit,
      sampleAnswer: q.sampleAnswer || "", explanation: q.explanation || "",
      options: q.options?.length ? q.options : emptyForm.options,
    });
    setEditQuestion(q);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.text.trim()) { toast.error("Question text is required"); return; }
    setSaving(true);
    try {
      if (editQuestion) {
        const { data } = await axios.put(`${BACKEND}/api/v1/interview/questions/${editQuestion._id}`, form, { withCredentials: true });
        if (data.success) { toast.success("Question updated"); fetchQuestions(); }
      } else {
        const { data } = await axios.post(`${BACKEND}/api/v1/interview/questions`, form, { withCredentials: true });
        if (data.success) { toast.success("Question created"); fetchQuestions(); }
      }
      setShowModal(false);
    } catch { toast.error("Failed to save question"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this question?")) return;
    try {
      await axios.delete(`${BACKEND}/api/v1/interview/questions/${id}`, { withCredentials: true });
      toast.success("Question deleted");
      setQuestions((q) => q.filter((qn) => qn._id !== id));
    } catch { toast.error("Failed to delete"); }
  };

  const filtered = questions.filter((q) => !search || q.text.toLowerCase().includes(search.toLowerCase()));

  const inputCls = "w-full bg-gray-800 border border-white/10 text-white px-3 py-2.5 rounded-xl text-sm focus:border-violet-500 outline-none placeholder-gray-600";

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <IoMdArrowRoundBack size={22} />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Question Bank</h1>
            <p className="text-gray-400 text-sm">{questions.length} questions available</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={openCreate}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-5 py-3 rounded-xl font-semibold text-sm"
          >
            <Plus size={16} />
            Add Question
          </motion.button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-3 text-gray-500" />
            <input
              className="bg-white/5 border border-white/10 text-white pl-9 pr-4 py-2.5 rounded-xl text-sm focus:border-violet-500 outline-none placeholder-gray-600 w-56"
              placeholder="Search questions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
            className="bg-white/5 border border-white/10 text-gray-300 px-3 py-2.5 rounded-xl text-sm capitalize outline-none focus:border-violet-500">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={diffFilter} onChange={(e) => setDiffFilter(e.target.value)}
            className="bg-white/5 border border-white/10 text-gray-300 px-3 py-2.5 rounded-xl text-sm capitalize outline-none focus:border-violet-500">
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white/5 border border-white/10 text-gray-300 px-3 py-2.5 rounded-xl text-sm capitalize outline-none focus:border-violet-500">
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Questions grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={36} className="text-violet-500 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((q) => {
              const TypeIcon = TYPE_ICON[q.type] || HelpCircle;
              return (
                <motion.div
                  key={q._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-violet-500/20 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <TypeIcon size={16} className="text-violet-400 shrink-0 mt-0.5" />
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(q)} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleDelete(q._id)} className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <p className="text-white text-sm leading-relaxed line-clamp-3">{q.text}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${DIFF_COLORS[q.difficulty]}`}>{q.difficulty}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 capitalize">{q.category}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300 capitalize">{q.type}</span>
                    <span className="text-xs text-gray-500 ml-auto">{q.marks}pts</span>
                  </div>
                </motion.div>
              );
            })}

            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-600">
                <Brain size={40} className="mx-auto mb-3 opacity-40" />
                <p>No questions found. Add your first question!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-2xl my-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-xl">
                  {editQuestion ? "Edit Question" : "Add Question"}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm mb-1.5 block">Question Text *</label>
                  <textarea
                    className={inputCls + " h-24 resize-none"}
                    placeholder="Enter the question…"
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Type", key: "type", opts: ["mcq", "subjective", "coding"] },
                    { label: "Category", key: "category", opts: CATEGORIES.slice(1) },
                    { label: "Difficulty", key: "difficulty", opts: ["easy", "medium", "hard"] },
                  ].map(({ label, key, opts }) => (
                    <div key={key}>
                      <label className="text-gray-300 text-sm mb-1.5 block">{label}</label>
                      <select className={inputCls + " capitalize"}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}>
                        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-300 text-sm mb-1.5 block">Marks</label>
                    <input type="number" className={inputCls} value={form.marks} min={1}
                      onChange={(e) => setForm({ ...form, marks: Number(e.target.value) })} />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-1.5 block">Time Limit (seconds)</label>
                    <input type="number" className={inputCls} value={form.timeLimit} min={30}
                      onChange={(e) => setForm({ ...form, timeLimit: Number(e.target.value) })} />
                  </div>
                </div>

                {form.type === "mcq" && (
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Options (select correct answer)</label>
                    <div className="space-y-2">
                      {form.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input type="radio" name="correct"
                            checked={opt.isCorrect}
                            onChange={() => setForm({
                              ...form,
                              options: form.options.map((o, j) => ({ ...o, isCorrect: j === i }))
                            })}
                            className="accent-violet-600 w-4 h-4 shrink-0"
                          />
                          <input className={inputCls} placeholder={`Option ${i + 1}`}
                            value={opt.text}
                            onChange={(e) => setForm({
                              ...form,
                              options: form.options.map((o, j) => j === i ? { ...o, text: e.target.value } : o)
                            })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-gray-300 text-sm mb-1.5 block">Sample Answer (optional)</label>
                  <textarea className={inputCls + " h-20 resize-none"} placeholder="Ideal answer…"
                    value={form.sampleAnswer}
                    onChange={(e) => setForm({ ...form, sampleAnswer: e.target.value })} />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 py-3 rounded-xl text-sm font-medium transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  {saving ? <><Loader2 size={16} className="animate-spin" />Saving…</> : editQuestion ? "Update" : "Create Question"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}