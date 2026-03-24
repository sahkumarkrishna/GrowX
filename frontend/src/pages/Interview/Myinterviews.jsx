import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Video, Clock, Calendar, CheckCircle2, XCircle,
  AlertCircle, Loader2, ArrowRight, User, Star,
} from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";
import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const STATUS_CONFIG = {
  scheduled: { label: "Scheduled", color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: Calendar },
  ongoing: { label: "Live Now", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: Video },
  completed: { label: "Completed", color: "text-gray-400 bg-gray-500/10 border-gray-500/20", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "text-red-400 bg-red-500/10 border-red-500/20", icon: XCircle },
  "no-show": { label: "No Show", color: "text-orange-400 bg-orange-500/10 border-orange-500/20", icon: AlertCircle },
};

export default function MyInterviews() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const isRecruiter = user?.role === "recruiter";

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [feedbackModal, setFeedbackModal] = useState(null);
  const [feedback, setFeedback] = useState({ text: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const endpoint = isRecruiter ? "/api/v1/interview/all" : "/api/v1/interview/my";
        const { data } = await axios.get(`${BACKEND}${endpoint}`, { withCredentials: true });
        if (data.success) setInterviews(data.interviews || []);
      } catch {
        toast.error("Failed to load interviews");
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, [isRecruiter]);

  const filtered = filter === "all" ? interviews : interviews.filter((i) => i.status === filter);

  const submitFeedback = async () => {
    if (!feedbackModal) return;
    setSubmitting(true);
    try {
      await axios.put(`${BACKEND}/api/v1/interview/${feedbackModal._id}/feedback`, {
        candidateFeedback: feedback.text,
        candidateRating: feedback.rating,
      }, { withCredentials: true });
      toast.success("Feedback submitted!");
      setFeedbackModal(null);
      setFeedback({ text: "", rating: 5 });
    } catch {
      toast.error("Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const canJoin = (interview) => {
    const diff = new Date(interview.scheduledAt) - Date.now();
    return (diff <= 15 * 60 * 1000 && diff >= -2 * 60 * 60 * 1000) || interview.status === "ongoing";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 size={36} className="text-violet-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <IoMdArrowRoundBack size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              {isRecruiter ? "All Interviews" : "My Interviews"}
            </h1>
            <p className="text-gray-400 text-sm">{interviews.length} total</p>
          </div>
          {isRecruiter && (
            <button
              onClick={() => navigate("/interview/schedule")}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              <Calendar size={16} />
              Schedule New
            </button>
          )}
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "scheduled", "ongoing", "completed", "cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                filter === f ? "bg-violet-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {f}
              {f !== "all" && (
                <span className="ml-1.5 text-xs opacity-70">
                  {interviews.filter((i) => i.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Video size={48} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No interviews {filter !== "all" ? `with status "${filter}"` : "yet"}</p>
            {!isRecruiter && (
              <p className="text-gray-600 text-sm mt-2">Your scheduled interviews will appear here</p>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filtered.map((interview, idx) => {
              const cfg = STATUS_CONFIG[interview.status] || STATUS_CONFIG.scheduled;
              const StatusIcon = cfg.icon;
              const scheduled = new Date(interview.scheduledAt);
              const isPast = scheduled < new Date();

              return (
                <motion.div
                  key={interview._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-violet-500/20 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.color}`}>
                          <StatusIcon size={11} />
                          {cfg.label}
                        </span>
                        <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full capitalize">{interview.type}</span>
                      </div>

                      <h3 className="text-white font-semibold text-lg mb-2 truncate">{interview.title}</h3>

                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <User size={13} />
                          {isRecruiter ? interview.candidate?.fullname : interview.recruiter?.fullname}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {scheduled.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} />
                          {scheduled.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} · {interview.duration} min
                        </div>
                      </div>

                      {/* Evaluation scores */}
                      {interview.status === "completed" && interview.evaluation?.overallScore && (
                        <div className="flex flex-wrap gap-3 mt-3">
                          {[
                            ["Overall", interview.evaluation.overallScore],
                            ["Communication", interview.evaluation.communicationScore],
                            ["Technical", interview.evaluation.technicalScore],
                          ].map(([label, score]) => (
                            <div key={label} className="bg-white/5 rounded-lg px-3 py-1.5">
                              <p className="text-gray-500 text-[10px] uppercase tracking-wide">{label}</p>
                              <p className={`text-sm font-bold ${score >= 70 ? "text-emerald-400" : score >= 50 ? "text-yellow-400" : "text-red-400"}`}>
                                {score}/100
                              </p>
                            </div>
                          ))}
                          {interview.evaluation.recommendation && (
                            <div className="bg-white/5 rounded-lg px-3 py-1.5">
                              <p className="text-gray-500 text-[10px] uppercase tracking-wide">Verdict</p>
                              <p className="text-sm font-bold text-violet-400 capitalize">{interview.evaluation.recommendation}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 shrink-0">
                      {canJoin(interview) && interview.status !== "cancelled" && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => navigate(`/interview/room/${interview.roomId}`)}
                          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                        >
                          <Video size={15} />
                          {interview.status === "ongoing" ? "Rejoin" : "Join Interview"}
                          <ArrowRight size={14} />
                        </motion.button>
                      )}

                      {isRecruiter && interview.status === "completed" && !interview.evaluation?.overallScore && (
                        <button
                          onClick={() => navigate(`/interview/${interview._id}/evaluate`)}
                          className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 text-blue-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                        >
                          <Star size={14} />
                          Evaluate
                        </button>
                      )}

                      {!isRecruiter && interview.status === "completed" && !interview.feedback?.submittedAt && (
                        <button
                          onClick={() => setFeedbackModal(interview)}
                          className="flex items-center gap-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/20 text-amber-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                        >
                          <Star size={14} />
                          Leave Feedback
                        </button>
                      )}

                      {interview.status === "scheduled" && (
                        <p className="text-gray-600 text-xs text-center">
                          {isPast ? "Starting soon…" : `In ${Math.ceil((scheduled - Date.now()) / 60000)} min`}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {feedbackModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-white font-semibold text-xl mb-4">Leave Feedback</h3>

            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Your experience rating</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => setFeedback({ ...feedback, rating: r })}>
                    <Star size={28} className={r <= feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl text-sm focus:border-violet-500 outline-none h-28 resize-none placeholder-gray-600"
              placeholder="Share your experience with the interview process…"
              value={feedback.text}
              onChange={(e) => setFeedback({ ...feedback, text: e.target.value })}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setFeedbackModal(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 py-3 rounded-xl text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={submitting}
                onClick={submitFeedback}
                className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
              >
                {submitting ? "Submitting…" : "Submit Feedback"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}