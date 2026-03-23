import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Brain, CheckCircle2, Trophy, Clock, Play, TrendingUp, Target, BarChart2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const QUIZ_API = import.meta.env.VITE_QUIZ_API || 'http://localhost:8000/api/v1/quiz';

const f = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } });

const LEVEL_COLOR = {
  beginner:     { bg: 'rgba(52,211,153,0.15)',  text: '#34d399', border: 'rgba(52,211,153,0.3)'  },
  intermediate: { bg: 'rgba(96,165,250,0.15)',  text: '#60a5fa', border: 'rgba(96,165,250,0.3)'  },
  advanced:     { bg: 'rgba(248,113,113,0.15)', text: '#f87171', border: 'rgba(248,113,113,0.3)' },
};

const customTooltipStyle = {
  backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px', color: '#fff', fontSize: 12,
};

export default function QuizPage() {
  const navigate = useNavigate();
  const { user } = useSelector(s => s.auth);
  const KEY = `growx_quiz_done_${user?._id}`;

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(() => new Set(JSON.parse(localStorage.getItem(KEY) || '[]')));

  useEffect(() => {
    axios.get(`${QUIZ_API}/all`, { withCredentials: true })
      .then(r => setQuizzes(r.data?.quizzes || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const markDone = (id) => {
    const u = new Set(done);
    u.has(id) ? u.delete(id) : u.add(id);
    setDone(u);
    localStorage.setItem(KEY, JSON.stringify([...u]));
  };

  const doneCount = done.size;
  const total = quizzes.length;
  const pct = total ? Math.round(doneCount / total * 100) : 0;

  // Build dynamic chart data from real quizzes
  const categoryMap = {};
  quizzes.forEach(q => {
    const cat = q.category || q.level || 'General';
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });
  const categoryData = Object.entries(categoryMap).map(([cat, count]) => ({ cat, count }));

  const levelMap = { beginner: 0, intermediate: 0, advanced: 0 };
  quizzes.forEach(q => { const l = q.level?.toLowerCase(); if (l in levelMap) levelMap[l]++; });
  const levelData = Object.entries(levelMap).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

  const GLOW_COLORS = ['#60a5fa', '#a78bfa', '#34d399'];

  return (
    <div className="min-h-screen p-5 sm:p-8 space-y-7"
      style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)' }}>

      <motion.div {...f(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">🧠 Quizzes</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Take quizzes and track completion.</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/user/analytics/quiz')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', boxShadow: '0 4px 15px rgba(37,99,235,0.35)' }}>
          <BarChart2 size={15} /> Analytics
        </motion.button>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total',     value: total,         color: '#60a5fa', glow: 'rgba(96,165,250,0.4)',  icon: Brain       },
          { label: 'Completed', value: doneCount,     color: '#34d399', glow: 'rgba(52,211,153,0.4)',  icon: CheckCircle2},
          { label: 'Remaining', value: total-doneCount, color: '#f87171', glow: 'rgba(248,113,113,0.4)', icon: Clock     },
        ].map((s, i) => (
          <motion.div key={s.label} {...f(0.05 + i * 0.05)}
            className="rounded-2xl p-4 text-center"
            style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
            <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
              style={{ background: `${s.color}20`, boxShadow: `0 0 12px ${s.glow}` }}>
              <s.icon size={17} style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-black text-white">{loading ? '—' : s.value}</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: s.color }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div {...f(0.15)} className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={15} style={{ color: '#60a5fa' }} />
            <span className="text-sm font-bold text-white">Overall Completion</span>
          </div>
          <span className="text-sm font-black" style={{ color: '#60a5fa' }}>{doneCount}/{total}</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg,#2563eb,#7c3aed)', boxShadow: '0 0 10px rgba(124,58,237,0.5)' }} />
        </div>
        <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>{pct}% complete</p>
      </motion.div>

      {/* Charts grid — dynamic */}
      {!loading && quizzes.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div {...f(0.2)} className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="font-black text-white text-sm mb-4">Quiz Level Distribution</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Bar dataKey="value" radius={[6,6,0,0]}>
                  {levelData.map((_, i) => <Cell key={i} fill={GLOW_COLORS[i % GLOW_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div {...f(0.25)} className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="font-black text-white text-sm mb-4">Category-wise Quizzes</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="cat" type="category" width={70} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Bar dataKey="count" fill="#a78bfa" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}

      {/* Quiz list */}
      <motion.div {...f(0.3)} className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h3 className="font-black text-white text-sm">All Quizzes</h3>
        </div>
        <div className="p-3 space-y-1.5">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
            ))
          ) : quizzes.length === 0 ? (
            <div className="text-center py-12" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <Brain size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No quizzes available</p>
            </div>
          ) : quizzes.map((q, i) => {
            const isDone = done.has(q._id);
            const lv = LEVEL_COLOR[q.level?.toLowerCase()] || LEVEL_COLOR.beginner;
            return (
              <motion.div key={q._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 + i * 0.03 }}
                className="flex items-center gap-3 p-3 rounded-xl transition-all"
                style={{ background: isDone ? 'rgba(52,211,153,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isDone ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.04)'}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: isDone ? 'rgba(52,211,153,0.2)' : 'rgba(96,165,250,0.15)', border: `1px solid ${isDone ? 'rgba(52,211,153,0.3)' : 'rgba(96,165,250,0.25)'}` }}>
                  {isDone ? <Trophy size={16} style={{ color: '#34d399' }} /> : <Brain size={16} style={{ color: '#60a5fa' }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate ${isDone ? 'line-through' : 'text-white'}`}
                    style={{ color: isDone ? 'rgba(255,255,255,0.35)' : '#fff' }}>
                    {q.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-md capitalize"
                      style={{ background: lv.bg, color: lv.text, border: `1px solid ${lv.border}` }}>
                      {q.level || 'Beginner'}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {q.questions?.length || 0} Q · {q.timeLimit || 10} min
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/quiz/${q._id}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}>
                    <Play size={11} /> Start
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => markDone(q._id)}>
                    <CheckCircle2 size={22} style={{ color: isDone ? '#34d399' : 'rgba(255,255,255,0.2)' }} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}