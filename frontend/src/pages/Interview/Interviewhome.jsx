import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Video, Calendar, Brain, ShieldCheck, BarChart3,
  BookOpen, ArrowRight, Wifi, Mic, Camera, Clock,
  Users, Star, Zap, MonitorPlay,
} from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";

const FeatureCard = ({ icon: Icon, title, desc, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -6, scale: 1.02 }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 cursor-default group"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const StatBadge = ({ value, label, icon: Icon }) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center gap-2">
      <Icon size={18} className="text-violet-400" />
      <span className="text-3xl font-black text-white">{value}</span>
    </div>
    <span className="text-gray-400 text-sm mt-1">{label}</span>
  </div>
);

export default function InterviewHome() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isRecruiter = user?.role === "recruiter";

  const features = [
    {
      icon: Video,
      title: "Live Video Interview",
      desc: "Real-time WebRTC video calling between candidate and interviewer with HD quality.",
      color: "bg-violet-600",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      desc: "Recruiters can schedule interviews with automatic email notifications sent to candidates.",
      color: "bg-blue-600",
    },
    {
      icon: ShieldCheck,
      title: "AI Proctoring",
      desc: "Advanced face detection, tab-switch monitoring, and multi-person alerts during interviews.",
      color: "bg-emerald-600",
    },
    {
      icon: Brain,
      title: "Question Bank",
      desc: "Curated MCQ, subjective, and coding questions across all domains and difficulty levels.",
      color: "bg-pink-600",
    },
    {
      icon: BarChart3,
      title: "Auto Evaluation",
      desc: "Score candidates across communication, technical skills, and confidence with AI assistance.",
      color: "bg-orange-600",
    },
    {
      icon: MonitorPlay,
      title: "Screen Sharing",
      desc: "Candidates can share their screen for live coding demos or presentation walkthroughs.",
      color: "bg-cyan-600",
    },
  ];

  const checks = [
    { icon: Wifi, label: "Internet Speed Check" },
    { icon: Mic, label: "Microphone Test" },
    { icon: Camera, label: "Camera Preview" },
    { icon: Clock, label: "System Latency" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-700/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-700/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group"
        >
          <IoMdArrowRoundBack size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </motion.button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-6">
            <Zap size={14} className="text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">AI-Powered Interview Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
            Interview
            <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h1>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            End-to-end interview management — from scheduling and live video sessions
            to AI evaluation and real-time feedback. All in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isRecruiter ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/interview/schedule")}
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  <Calendar size={20} />
                  Schedule Interview
                  <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/interview/dashboard")}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  <BarChart3 size={20} />
                  Dashboard
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/interview/my")}
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  <Video size={20} />
                  My Interviews
                  <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/interview/precheck")}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  <ShieldCheck size={20} />
                  System Check
                </motion.button>
              </>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-10 mb-20 p-8 bg-white/5 rounded-2xl border border-white/10"
        >
          <StatBadge value="500+" label="Interviews Conducted" icon={Video} />
          <div className="w-px h-12 bg-white/10" />
          <StatBadge value="95%" label="Candidate Satisfaction" icon={Star} />
          <div className="w-px h-12 bg-white/10" />
          <StatBadge value="3x" label="Faster Hiring" icon={Zap} />
          <div className="w-px h-12 bg-white/10" />
          <StatBadge value="200+" label="Companies Onboarded" icon={Users} />
        </motion.div>

        {/* Features Grid */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Everything You Need</h2>
            <p className="text-gray-400">From basic to advanced — every feature for modern hiring</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={0.1 * i + 0.4} />
            ))}
          </div>
        </div>

        {/* Pre-check strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-violet-900/40 to-blue-900/40 border border-violet-500/20 rounded-2xl p-8 mb-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready before your interview?
              </h3>
              <p className="text-gray-400">
                Run a quick system check to ensure your mic, camera, and internet are all good.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {checks.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Icon size={14} className="text-violet-400" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/interview/precheck")}
              className="shrink-0 flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <ShieldCheck size={18} />
              Run System Check
            </motion.button>
          </div>
        </motion.div>

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Question Bank", icon: BookOpen, route: "/interview/questions", color: "from-pink-600 to-rose-600" },
            { label: "My Interviews", icon: Video, route: "/interview/my", color: "from-violet-600 to-purple-600" },
            { label: isRecruiter ? "Schedule" : "System Check", icon: isRecruiter ? Calendar : ShieldCheck, route: isRecruiter ? "/interview/schedule" : "/interview/precheck", color: "from-blue-600 to-cyan-600" },
            { label: "Dashboard", icon: BarChart3, route: "/interview/dashboard", color: "from-emerald-600 to-teal-600" },
          ].map(({ label, icon: Icon, route, color }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(route)}
              className={`bg-gradient-to-br ${color} rounded-xl p-5 flex flex-col items-center gap-3 text-white font-semibold text-sm shadow-lg`}
            >
              <Icon size={24} />
              {label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}