import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Brain, FileText, GraduationCap, ScanLine, UserCircle,
  TrendingUp, CheckCircle, ChevronRight, Zap, BarChart2,
  Briefcase, Clock, Star,
} from 'lucide-react';

const APPLICATION_API = import.meta.env.VITE_APPLICATION_API || 'http://localhost:8000/api/v1/application';
const QUIZ_API        = import.meta.env.VITE_QUIZ_API        || 'http://localhost:8000/api/v1/quiz';
const ATS_API         = import.meta.env.VITE_ATS_API         || 'http://localhost:8000/api/v1/ats';
const JOB_API         = import.meta.env.VITE_JOB_API         || 'http://localhost:8000/api/v1/job';

const f = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.42, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return '☀️ Good Morning';
  if (h < 17) return '🌤 Good Afternoon';
  return '🌙 Good Evening';
};

const STATUS_COLOR = {
  pending:  { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b',  border: 'rgba(245,158,11,0.3)',  label: 'Pending'  },
  accepted: { bg: 'rgba(52,211,153,0.15)', text: '#34d399',  border: 'rgba(52,211,153,0.3)',  label: 'Accepted' },
  rejected: { bg: 'rgba(239,68,68,0.15)',  text: '#f87171',  border: 'rgba(239,68,68,0.3)',   label: 'Rejected' },
};

const LEVEL_COLOR = {
  beginner:     { bg: 'rgba(52,211,153,0.15)', text: '#34d399'  },
  intermediate: { bg: 'rgba(96,165,250,0.15)', text: '#60a5fa'  },
  advanced:     { bg: 'rgba(239,68,68,0.15)',  text: '#f87171'  },
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useSelector(s => s.auth);

  const [loading, setLoading]       = useState(true);
  const [apps,    setApps]          = useState([]);
  const [quizzes, setQuizzes]       = useState([]);
  const [atsHistory, setAtsHistory] = useState([]);
  const [jobCount,   setJobCount]   = useState(0);

  const profileChecks = [
    { label: 'Full Name',     done: !!user?.fullname                   },
    { label: 'Phone',         done: !!user?.phoneNumber                },
    { label: 'Bio',           done: !!user?.profile?.bio               },
    { label: 'Skills',        done: user?.profile?.skills?.length > 0 },
    { label: 'Resume',        done: !!user?.profile?.resume            },
    { label: 'Profile Photo', done: !!user?.profile?.profilePhoto      },
  ];
  const pct = Math.round(profileChecks.filter(c => c.done).length / profileChecks.length * 100);

  const QUIZ_KEY = `growx_quiz_done_${user?._id}`;
  const quizDone = JSON.parse(localStorage.getItem(QUIZ_KEY) || '[]').length;

  useEffect(() => {
    (async () => {
      const [a, q, t, j] = await Promise.allSettled([
        axios.get(`${APPLICATION_API}/get`, { withCredentials: true }),
        axios.get(`${QUIZ_API}/all`,         { withCredentials: true }),
        axios.get(`${ATS_API}/history`,       { withCredentials: true }),
        axios.get(`${JOB_API}/get`,           { withCredentials: true }),
      ]);
      setApps(       a.status === 'fulfilled' ? (a.value.data?.applications || []) : []);
      setQuizzes(    q.status === 'fulfilled' ? (q.value.data?.quizzes      || []) : []);
      setAtsHistory( t.status === 'fulfilled' ? (t.value.data?.history       || []) : []);
      setJobCount(   j.status === 'fulfilled' ? (j.value.data?.jobs?.length  || 0)  : 0);
      setLoading(false);
    })();
  }, []);

  const avgAts = atsHistory.length
    ? Math.round(atsHistory.reduce((s, a) => s + (a.score || 0), 0) / atsHistory.length)
    : null;

  const statCards = [
    { label: 'Applications', value: apps.length,    sub: 'Jobs applied',     icon: Briefcase,    color: '#a78bfa', glow: 'rgba(167,139,250,0.4)', route: '/user/internship'  },
    { label: 'Jobs Open',    value: jobCount,        sub: 'Available now',    icon: TrendingUp,   color: '#60a5fa', glow: 'rgba(96,165,250,0.4)',  route: '/user/jobs'             },
    { label: 'Quizzes',      value: quizDone,        sub: 'Completed',        icon: Brain,        color: '#34d399', glow: 'rgba(52,211,153,0.4)',  route: '/user/quiz'        },
    { label: 'ATS Avg',      value: avgAts ? `${avgAts}%` : '—', sub: 'Resume score', icon: ScanLine, color: '#f87171', glow: 'rgba(248,113,113,0.4)', route: '/user/ats' },
    { label: 'Profile',      value: `${pct}%`,       sub: pct===100?'Complete ✓':'Incomplete', icon: UserCircle, color: '#fbbf24', glow: 'rgba(251,191,36,0.4)', route: '/user/profile' },
  ];

  const quickActions = [
    { label: 'Browse Jobs',  icon: Briefcase,   color: '#a78bfa', glow: 'rgba(167,139,250,0.35)', route: '/user/jobs'         },
    { label: 'Take Quiz',    icon: Brain,        color: '#60a5fa', glow: 'rgba(96,165,250,0.35)',  route: '/user/quiz'    },
    { label: 'Check ATS',   icon: ScanLine,     color: '#34d399', glow: 'rgba(52,211,153,0.35)',  route: '/user/ats'     },
    { label: 'My Resume',   icon: FileText,     color: '#fb923c', glow: 'rgba(251,146,60,0.35)',  route: '/user/resume'  },
    { label: 'Internships', icon: GraduationCap,color: '#f59e0b', glow: 'rgba(245,158,11,0.35)',  route: '/user/internship'},
    { label: 'Analytics',   icon: BarChart2,    color: '#38bdf8', glow: 'rgba(56,189,248,0.35)',  route: '/user/analytics/dashboard'},
  ];

  return (
    <div className="min-h-screen p-5 sm:p-8 space-y-7"
      style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)' }}>

      {/* ── Welcome Banner ──────────────────────────────────────────── */}
      <motion.div {...f(0)} className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.25),transparent 70%)' }} />
        <div className="absolute -bottom-8 left-1/3 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(37,99,235,0.15),transparent 70%)' }} />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <p className="text-purple-300 text-sm font-semibold">{greeting()}</p>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 leading-tight">
              {user?.fullname || 'User'} 👋
            </h1>
            <p className="text-white/50 text-sm mt-2 max-w-sm">
              Keep growing — every step counts. Track your progress below.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.25)' }}>
                {apps.length} Applications
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}>
                {quizDone} Quizzes Done
              </span>
              {avgAts && (
                <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.25)' }}>
                  ATS {avgAts}%
                </span>
              )}
            </div>
          </div>

          {/* Profile ring */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 88 88">
                <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
                <motion.circle cx="44" cy="44" r="36" fill="none"
                  stroke="url(#pg)" strokeWidth="7" strokeLinecap="round"
                  strokeDasharray={`${2*Math.PI*36}`}
                  initial={{ strokeDashoffset: 2*Math.PI*36 }}
                  animate={{ strokeDashoffset: 2*Math.PI*36*(1-pct/100) }}
                  transition={{ duration: 1.4, delay: 0.3 }} />
                <defs>
                  <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-white">{pct}%</span>
                <span className="text-xs text-white/40">Profile</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Stat Cards ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((c, i) => (
          <motion.div key={c.label} {...f(0.06 + i * 0.05)}
            whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate(c.route)}
            className="relative rounded-2xl p-4 cursor-pointer overflow-hidden transition-all"
            style={{
              background: `linear-gradient(135deg,${c.color}18,${c.color}08)`,
              border: `1px solid ${c.color}30`,
            }}>
            <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle,${c.glow},transparent 70%)` }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 relative"
              style={{ background: `${c.color}20`, border: `1px solid ${c.color}30`, boxShadow: `0 0 12px ${c.glow}` }}>
              <c.icon size={18} style={{ color: c.color }} />
            </div>
            <p className="text-2xl font-black text-white">{loading ? '—' : c.value}</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: c.color }}>{c.label}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{c.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Main Grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Applications */}
        <motion.div {...f(0.2)} className="lg:col-span-2">
          <DarkCard title="Recent Applications" icon={Briefcase} color="#a78bfa"
            onMore={() => navigate('/user/internship')} count={apps.length}>
            {loading ? <LoadingRows /> : apps.length === 0
              ? <EmptyState icon={Briefcase} text="No applications yet" action="Browse Jobs" onAction={() => navigate('/jobs')} color="#a78bfa" />
              : apps.slice(0, 5).map((app, i) => {
                  const st = STATUS_COLOR[app.status?.toLowerCase()] || STATUS_COLOR.pending;
                  return (
                    <motion.div key={app._id || i} whileHover={{ x: 4 }}
                      onClick={() => navigate('/user/internship')}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                      style={{ border: '1px solid transparent' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.25)' }}>
                        <Briefcase size={14} style={{ color: '#a78bfa' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                          {app.job?.title || 'Job Application'}
                        </p>
                        <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {app.job?.company?.name || 'Company'} ·{' '}
                          {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : 'Recent'}
                        </p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                        style={{ background: st.bg, color: st.text, border: `1px solid ${st.border}` }}>
                        {st.label}
                      </span>
                      <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.25)' }} className="shrink-0" />
                    </motion.div>
                  );
                })
            }
          </DarkCard>
        </motion.div>

        {/* Profile Completion */}
        <motion.div {...f(0.25)}>
          <DarkCard title="Profile Strength" icon={UserCircle} color="#fbbf24">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                  <motion.circle cx="30" cy="30" r="24" fill="none"
                    stroke="url(#pg2)" strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={`${2*Math.PI*24}`}
                    initial={{ strokeDashoffset: 2*Math.PI*24 }}
                    animate={{ strokeDashoffset: 2*Math.PI*24*(1-pct/100) }}
                    transition={{ duration: 1.2, delay: 0.5 }} />
                  <defs>
                    <linearGradient id="pg2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-black text-white">{pct}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{pct===100 ? 'Complete! 🎉' : `${profileChecks.filter(c=>!c.done).length} items left`}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {pct===100 ? 'You stand out!' : 'Complete for visibility'}
                </p>
              </div>
            </div>
            <div className="space-y-2.5">
              {profileChecks.map(c => (
                <div key={c.label} className="flex items-center gap-2.5 group">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${c.done ? 'bg-emerald-500' : 'bg-white/10'}`}>
                    {c.done ? <CheckCircle size={11} className="text-white" /> : <span className="w-1.5 h-1.5 rounded-full bg-white/30" />}
                  </div>
                  <span className={`text-xs font-medium flex-1 ${c.done ? 'text-white/70' : 'text-white/40'}`}>{c.label}</span>
                  {!c.done && (
                    <button onClick={() => navigate('/user/profile')}
                      className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#a78bfa' }}>Add →</button>
                  )}
                </div>
              ))}
            </div>
            {pct < 100 && (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/user/profile')}
                className="mt-5 w-full py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#fbbf24,#fb923c)', boxShadow: '0 4px 15px rgba(251,191,36,0.3)' }}>
                Complete Profile
              </motion.button>
            )}
          </DarkCard>
        </motion.div>
      </div>

      {/* ── Bottom: Quizzes + ATS ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Available Quizzes */}
        <motion.div {...f(0.3)}>
          <DarkCard title="Available Quizzes" icon={Brain} color="#60a5fa"
            onMore={() => navigate('/user/quiz')} count={quizzes.length}>
            {loading ? <LoadingRows count={3} /> : quizzes.length === 0
              ? <EmptyState icon={Brain} text="No quizzes yet" action="Browse" onAction={() => navigate('/user/quiz')} color="#60a5fa" />
              : quizzes.slice(0, 4).map((q, i) => {
                  const lv = LEVEL_COLOR[q.level?.toLowerCase()] || LEVEL_COLOR.beginner;
                  return (
                    <motion.div key={q._id || i} whileHover={{ x: 4 }}
                      onClick={() => navigate(`/quiz/${q._id}`)}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.25)' }}>
                        <Brain size={14} style={{ color: '#60a5fa' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{q.title}</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {q.questions?.length || 0} questions · {q.timeLimit || 10} min
                        </p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0 capitalize"
                        style={{ background: lv.bg, color: lv.text }}>
                        {q.level || 'Beginner'}
                      </span>
                      <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.25)' }} />
                    </motion.div>
                  );
                })
            }
          </DarkCard>
        </motion.div>

        {/* ATS History */}
        <motion.div {...f(0.34)}>
          <DarkCard title="ATS Check History" icon={ScanLine} color="#f87171"
            onMore={() => navigate('/user/ats')} count={atsHistory.length}>
            {loading ? <LoadingRows count={3} /> : atsHistory.length === 0
              ? <EmptyState icon={ScanLine} text="No checks yet" action="Check Now" onAction={() => navigate('/user/ats')} color="#f87171" />
              : atsHistory.slice(0, 4).map((h, i) => {
                  const score = h.score || 0;
                  const sc = score >= 80 ? '#34d399' : score >= 60 ? '#f59e0b' : '#f87171';
                  return (
                    <motion.div key={h._id || i} whileHover={{ x: 4 }}
                      onClick={() => navigate('/user/ats')}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.25)' }}>
                        <ScanLine size={14} style={{ color: '#f87171' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white">Resume Check #{atsHistory.length - i}</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {h.createdAt ? new Date(h.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : 'Recent'}
                        </p>
                      </div>
                      <span className="text-base font-black px-3 py-1 rounded-xl"
                        style={{ background: `${sc}20`, color: sc, border: `1px solid ${sc}40` }}>
                        {score}%
                      </span>
                      <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.25)' }} />
                    </motion.div>
                  );
                })
            }
          </DarkCard>
        </motion.div>
      </div>

      {/* ── Quick Actions ────────────────────────────────────────────── */}
      <motion.div {...f(0.4)} className="relative rounded-3xl p-6 overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.2),transparent 70%)' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-5">
            <Zap size={16} style={{ color: '#fbbf24' }} />
            <h3 className="font-black text-white text-sm">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {quickActions.map((a, i) => (
              <motion.button key={a.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.44 + i * 0.05 }}
                whileHover={{ y: -4, scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => navigate(a.route)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${a.color}15`; e.currentTarget.style.borderColor = `${a.color}35`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: `${a.color}20`, border: `1px solid ${a.color}30`, boxShadow: `0 0 12px ${a.glow}` }}>
                  <a.icon size={20} style={{ color: a.color }} />
                </div>
                <span className="text-xs font-semibold text-center leading-tight text-white/80">{a.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Shared dark card ──────────────────────────────────────────────────────────
function DarkCard({ title, icon: Icon, color, onMore, count, children }) {
  return (
    <div className="rounded-2xl p-5 h-full"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
            <Icon size={14} style={{ color }} />
          </div>
          <h3 className="font-black text-white text-sm">{title}</h3>
          {count !== undefined && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
              {count}
            </span>
          )}
        </div>
        {onMore && (
          <button onClick={onMore}
            className="flex items-center gap-1 text-xs font-bold transition-opacity hover:opacity-70"
            style={{ color }}>
            View all <ChevronRight size={12} />
          </button>
        )}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function EmptyState({ icon: Icon, text, action, onAction, color }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
        style={{ background: `${color}15`, border: `2px dashed ${color}30` }}>
        <Icon size={20} style={{ color: `${color}80` }} />
      </div>
      <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{text}</p>
      <button onClick={onAction}
        className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
        style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
        {action} →
      </button>
    </div>
  );
}

function LoadingRows({ count = 4 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl animate-pulse">
          <div className="w-9 h-9 rounded-xl shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 rounded-full w-3/4" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="h-2.5 rounded-full w-1/2" style={{ background: 'rgba(255,255,255,0.04)' }} />
          </div>
          <div className="h-5 w-16 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
      ))}
    </div>
  );
}