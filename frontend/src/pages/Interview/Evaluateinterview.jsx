import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Star, Loader2, CheckCircle2, MessageSquare } from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";
import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const RECOMMENDATIONS = [
  { value: "strongly-recommend", label: "Strongly Recommend", color: "emerald" },
  { value: "recommend", label: "Recommend", color: "blue" },
  { value: "neutral", label: "Neutral", color: "yellow" },
  { value: "not-recommend", label: "Not Recommend", color: "orange" },
  { value: "reject", label: "Reject", color: "red" },
];

const ScoreSlider = ({ label, value, onChange }) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-gray-300 text-sm">{label}</span>
      <span className={`text-sm font-bold ${value >= 70 ? "text-emerald-400" : value >= 50 ? "text-yellow-400" : "text-red-400"}`}>
        {value}/100
      </span>
    </div>
    <input
      type="range" min="0" max="100" step="5"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-violet-500 h-2 rounded-lg cursor-pointer"
    />
    <div className="flex justify-between text-gray-600 text-xs mt-1">
      <span>Poor</span><span>Average</span><span>Excellent</span>
    </div>
  </div>
);

export default function EvaluateInterview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [scores, setScores] = useState({
    overallScore: 70,
    communicationScore: 70,
    technicalScore: 70,
    confidenceScore: 70,
  });
  const [recommendation, setRecommendation] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${BACKEND}/api/v1/interview/${id}`, { withCredentials: true });
        if (data.success) setInterview(data.interview);
      } catch {
        toast.error("Interview not found");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async () => {
    if (!recommendation) { toast.error("Please select a recommendation"); return; }
    setSubmitting(true);
    try {
      const { data } = await axios.put(`${BACKEND}/api/v1/interview/${id}/evaluate`, {
        ...scores, recommendation, notes,
      }, { withCredentials: true });
      if (data.success) {
        toast.success("✅ Evaluation submitted & candidate notified");
        navigate("/interview/dashboard");
      }
    } catch { toast.error("Failed to submit evaluation"); }
    finally { setSubmitting(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <Loader2 size={36} className="text-violet-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group">
          <IoMdArrowRoundBack size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Star size={24} className="text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Evaluate Interview</h1>
          </div>
          <div className="bg-white/5 rounded-xl px-4 py-3 flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="text-white font-medium">{interview?.title}</span>
            <span>Candidate: <span className="text-violet-400">{interview?.candidate?.fullname}</span></span>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Score sliders */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Star size={16} className="text-yellow-400" /> Performance Scores
            </h3>
            {Object.entries({
              overallScore: "Overall Performance",
              communicationScore: "Communication Skills",
              technicalScore: "Technical Knowledge",
              confidenceScore: "Confidence & Presence",
            }).map(([key, label]) => (
              <ScoreSlider
                key={key}
                label={label}
                value={scores[key]}
                onChange={(v) => setScores({ ...scores, [key]: v })}
              />
            ))}
          </div>

          {/* Recommendation */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Hiring Recommendation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RECOMMENDATIONS.map(({ value, label, color }) => (
                <button
                  key={value}
                  onClick={() => setRecommendation(value)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-sm font-medium ${
                    recommendation === value
                      ? `bg-${color}-500/20 border-${color}-500/40 text-${color}-400`
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                  }`}
                >
                  {recommendation === value && <CheckCircle2 size={16} />}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <MessageSquare size={16} className="text-gray-400" /> Notes (optional)
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl text-sm focus:border-violet-500 outline-none h-32 resize-none placeholder-gray-600"
              placeholder="Any specific observations about the candidate…"
            />
          </div>

          {/* Auto-calculated overall */}
          <div className="bg-gradient-to-r from-violet-900/30 to-blue-900/30 border border-violet-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-sm mb-1">Calculated Overall Score</p>
            <p className={`text-4xl font-black ${scores.overallScore >= 70 ? "text-emerald-400" : scores.overallScore >= 50 ? "text-yellow-400" : "text-red-400"}`}>
              {scores.overallScore}<span className="text-2xl text-gray-500">/100</span>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={submitting}
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white py-4 rounded-xl font-semibold transition-colors"
          >
            {submitting ? (
              <><Loader2 size={18} className="animate-spin" />Submitting…</>
            ) : (
              <><Star size={18} />Submit Evaluation & Notify Candidate</>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}