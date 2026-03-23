import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Brain, Trophy, Clock, Target } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const QUIZ_API = import.meta.env.VITE_QUIZ_API || 'http://localhost:8000/api/v1/quiz';
const TT = { backgroundColor: 'rgba(15,23,42,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: 12 };
const f  = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } });
const BG = 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)';
const NoData = () => <div className="h-44 flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.2)' }}><p className="text-xs">Complete quizzes to generate data</p></div>;
const Card = ({ title, children, delay = 0 }) => (
  <motion.div {...f(delay)} className="rounded-2xl p-5"
    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
    <h3 className="font-black text-white text-sm mb-4">{title}</h3>
    {children}
  </motion.div>
);

export default function QuizAnalytics() {
  const { user }  = useSelector(s => s.auth);
  const KEY       = `growx_quiz_done_${user?._id}`;
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${QUIZ_API}/all`, { withCredentials: true })
      .then(r => setQuizzes(r.data?.quizzes || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const doneIds   = new Set(JSON.parse(localStorage.getItem(KEY) || '[]'));
  const doneCount = doneIds.size;
  const total     = quizzes.length;
  const remaining = total - doneCount;
  const pct       = total ? Math.round(doneCount / total * 100) : 0;

  // Level distribution
  const lvlMap = {};
  quizzes.forEach(q => { const l = q.level || 'Unknown'; lvlMap[l] = (lvlMap[l] || 0) + 1; });
  const levelData = Object.entries(lvlMap).map(([level, count]) => ({ level: level.charAt(0).toUpperCase() + level.slice(1), count }));
  const levelColors = { Beginner: '#34d399', Intermediate: '#60a5fa', Advanced: '#f87171', Unknown: '#a78bfa' };

  // Category distribution
  const catMap = {};
  quizzes.forEach(q => { const c = q.category || 'General'; catMap[c] = (catMap[c] || 0) + 1; });
  const categoryData = Object.entries(catMap).slice(0, 6).map(([cat, count]) => ({ cat: cat.slice(0, 12), count }));

  // Marks distribution
  const marksMap = {};
  quizzes.forEach(q => { const m = q.marks || q.totalMarks || 10; const key = `${m}M`; marksMap[key] = (marksMap[key] || 0) + 1; });
  const marksData = Object.entries(marksMap).map(([marks, count]) => ({ marks, count }));

  // Pass/Fail (done = pass, not done = fail)
  const passFail = [
    { name: 'Completed', value: doneCount,    color: '#34d399' },
    { name: 'Pending',   value: remaining,    color: '#f87171' },
  ].filter(d => d.value > 0);

  // Time distribution
  const timeMap = {};
  quizzes.forEach(q => { const t = q.timeLimit ? `${q.timeLimit}min` : '10min'; timeMap[t] = (timeMap[t] || 0) + 1; });
  const timeData = Object.entries(timeMap).map(([time, count]) => ({ time, count }));

  // Radar: my activity
  const radarData = [
    { area: 'Total',      value: Math.min(total, 100)      },
    { area: 'Completed',  value: Math.min(doneCount * 5, 100) },
    { area: 'Beginner',   value: Math.min((lvlMap.beginner || 0) * 5, 100) },
    { area: 'Intermediate', value: Math.min((lvlMap.intermediate || 0) * 5, 100) },
    { area: 'Advanced',   value: Math.min((lvlMap.advanced || 0) * 5, 100) },
  ];

  const STATS = [
    { label: 'Total Quizzes', value: loading?'—':total,     color: '#2563eb', glow: 'rgba(37,99,235,0.4)',    icon: Brain   },
    { label: 'Completed',     value: loading?'—':doneCount, color: '#34d399', glow: 'rgba(52,211,153,0.4)',   icon: Trophy  },
    { label: 'Remaining',     value: loading?'—':remaining, color: '#f87171', glow: 'rgba(248,113,113,0.4)',  icon: Clock   },
    { label: 'Progress',      value: loading?'—':`${pct}%`, color: '#a78bfa', glow: 'rgba(167,139,250,0.4)',  icon: Target  },
  ];

  return (
    <div className="min-h-screen p-5 sm:p-8 space-y-7" style={{ background: BG }}>
      <motion.div {...f(0)}>
        <h1 className="text-2xl font-black text-white">🧠 Quiz Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Performance and progress insights.</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label} {...f(0.05+i*0.04)} className="rounded-2xl p-4 relative overflow-hidden"
            style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
            <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle,${s.glow},transparent 70%)` }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.color}20`, boxShadow: `0 0 12px ${s.glow}` }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: s.color }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div {...f(0.2)} className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-white text-sm">Overall Completion</h3>
          <span className="text-sm font-black" style={{ color: '#60a5fa' }}>{pct}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full" style={{ background: 'linear-gradient(90deg,#2563eb,#7c3aed)', boxShadow: '0 0 10px rgba(124,58,237,0.5)' }} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="📊 Level Distribution" delay={0.24}>
          {levelData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="level" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" radius={[6,6,0,0]}>
                  {levelData.map((e) => <Cell key={e.level} fill={levelColors[e.level] || '#a78bfa'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="✅ Completed vs Pending" delay={0.28}>
          {passFail.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={passFail} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {passFail.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie><Tooltip contentStyle={TT} /></PieChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="🎯 Category-wise Quizzes" delay={0.32}>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="cat" type="category" width={80} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" fill="#a78bfa" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="🕐 Time Limit Distribution" delay={0.36}>
          {timeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" fill="#60a5fa" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="🔮 Activity Radar" delay={0.4}>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="area" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
              <Radar dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
              <Tooltip contentStyle={TT} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}