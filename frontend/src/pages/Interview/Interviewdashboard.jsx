import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, Video, Calendar, CheckCircle2, XCircle,
  Clock, Users, TrendingUp, Star, Loader2, Plus,
  ArrowRight, AlertTriangle,
} from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";
import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const StatCard = ({ label, value, icon: Icon, color, sub }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className={`bg-white/5 border border-white/10 rounded-2xl p-5 ${color}`}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <p className="text-4xl font-black text-white mb-1">{value}</p>
    <p className="text-gray-300 text-sm font-medium">{label}</p>
    {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
  </motion.div>
);

export default function InterviewDashboard() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [interviewsRes, analyticsRes] = await Promise.all([
          axios.get(`${BACKEND}/api/v1/interview/all?limit=6`, { withCredentials: true }),
          axios.get(`${BACKEND}/api/v1/interview/analytics`, { withCredentials: true }),
        ]);
        if (interviewsRes.data.success) setInterviews(interviewsRes.data.interviews || []);
        if (analyticsRes.data.success) setAnalytics(analyticsRes.data.analytics);
      } catch {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const getCount = (status) => analytics?.statusStats?.find((s) => s._id === status)?.count || 0;

  const upcoming = interviews.filter((i) => i.status === "scheduled" && new Date(i.scheduledAt) > Date.now());
  const ongoing = interviews.filter((i) => i.status === "ongoing");

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
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <IoMdArrowRoundBack size={22} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Interview Dashboard</h1>
            <p className="text-gray-400 text-sm mt-0.5">Manage all interview sessions and analytics</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/interview/schedule")}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            <Plus size={16} />
            Schedule Interview
          </motion.button>
        </div>

        {/* Live now banner */}
        {ongoing.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-900/30 border border-emerald-500/30 rounded-2xl p-4 mb-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-300 font-semibold">{ongoing.length} interview{ongoing.length > 1 ? "s" : ""} live right now</span>
            </div>
            <button
              onClick={() => navigate(`/interview/room/${ongoing[0].roomId}`)}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
            >
              Join Room <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Interviews" value={analytics?.total || 0} icon={Video} color="hover:border-violet-500/30" sub="All time" />
          <StatCard label="Scheduled" value={getCount("scheduled")} icon={Calendar} color="hover:border-blue-500/30" sub="Upcoming" />
          <StatCard label="Completed" value={getCount("completed")} icon={CheckCircle2} color="hover:border-emerald-500/30" sub="Successfully done" />
          <StatCard label="Avg Score" value={`${Math.round(analytics?.avgScore || 0)}%`} icon={Star} color="hover:border-yellow-500/30" sub="Candidate evaluation" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Interviews */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-lg">Recent Interviews</h2>
              <button onClick={() => navigate("/interview/my")} className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1">
                View all <ArrowRight size={13} />
              </button>
            </div>
            <div className="space-y-3">
              {interviews.slice(0, 6).map((interview) => {
                const statusColors = {
                  scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                  ongoing: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                  completed: "bg-gray-500/10 text-gray-400 border-gray-500/20",
                  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
                };
                return (
                  <motion.div
                    key={interview._id}
                    whileHover={{ x: 4 }}
                    onClick={() => navigate(`/interview/my`)}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/20 transition-all flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-violet-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {interview.candidate?.fullname?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{interview.title}</p>
                      <p className="text-gray-500 text-xs">{interview.candidate?.fullname} · {new Date(interview.scheduledAt).toLocaleDateString("en-IN")}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[interview.status] || "bg-gray-500/10 text-gray-400"}`}>
                      {interview.status}
                    </span>
                  </motion.div>
                );
              })}
              {interviews.length === 0 && (
                <div className="text-center py-12 text-gray-600">
                  <Video size={36} className="mx-auto mb-3 opacity-40" />
                  <p>No interviews yet. Schedule your first one!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Upcoming */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock size={16} className="text-violet-400" /> Upcoming
              </h3>
              {upcoming.slice(0, 4).map((i) => (
                <div key={i._id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i.candidate?.fullname?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{i.title}</p>
                    <p className="text-gray-500 text-[11px]">
                      {new Date(i.scheduledAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      {" · "}
                      {new Date(i.scheduledAt).toLocaleDateString("en-IN", { month: "short", day: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {upcoming.length === 0 && <p className="text-gray-600 text-sm text-center py-3">No upcoming interviews</p>}
            </div>

            {/* Type breakdown */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <BarChart3 size={16} className="text-blue-400" /> By Type
              </h3>
              <div className="space-y-3">
                {(analytics?.typeStats || []).map(({ _id, count }) => (
                  <div key={_id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300 capitalize">{_id}</span>
                      <span className="text-gray-500">{count}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                        style={{ width: `${Math.min(100, (count / (analytics?.total || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
                {!analytics?.typeStats?.length && (
                  <p className="text-gray-600 text-sm text-center py-2">No data yet</p>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-gradient-to-br from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-2xl p-5 space-y-2">
              <h3 className="text-white font-semibold mb-3">Quick Actions</h3>
              {[
                { label: "Schedule Interview", icon: Calendar, route: "/interview/schedule" },
                { label: "Question Bank", icon: Users, route: "/interview/questions" },
                { label: "System Check", icon: TrendingUp, route: "/interview/precheck" },
              ].map(({ label, icon: Icon, route }) => (
                <button
                  key={label}
                  onClick={() => navigate(route)}
                  className="w-full flex items-center gap-3 text-left bg-white/5 hover:bg-white/10 px-4 py-3 rounded-xl text-white text-sm font-medium transition-colors"
                >
                  <Icon size={15} className="text-violet-400 shrink-0" />
                  {label}
                  <ArrowRight size={14} className="ml-auto text-gray-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}