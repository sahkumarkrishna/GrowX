import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Users, TrendingUp, BarChart2, Zap, Brain, FileText, ScanLine, GraduationCap } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const APPLICATION_API = import.meta.env.VITE_APPLICATION_API || 'http://localhost:8000/api/v1/application';
const QUIZ_API        = import.meta.env.VITE_QUIZ_API        || 'http://localhost:8000/api/v1/quiz';
const ATS_API         = import.meta.env.VITE_ATS_API         || 'http://localhost:8000/api/v1/ats';
const JOB_API         = import.meta.env.VITE_JOB_API         || 'http://localhost:8000/api/v1/job';

const TT = { backgroundColor: 'rgba(15,23,42,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: 12 };
const f  = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } });
const BG = 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)';
const COLORS = ['#a78bfa','#60a5fa','#34d399','#f59e0b','#f87171','#38bdf8'];

const Card = ({ title, children, badge, delay = 0 }) => (
  <motion.div {...f(delay)} className="rounded-2xl p-5"
    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-black text-white text-sm">{title}</h3>
      {badge && <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/25">{badge}</span>}
    </div>
    {children}
  </motion.div>
);

const StatCard = ({ label, value, color, glow, icon: Icon, delay }) => (
  <motion.div {...f(delay)} className="rounded-2xl p-4 relative overflow-hidden"
    style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
    <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full pointer-events-none"
      style={{ background: `radial-gradient(circle,${glow},transparent 70%)` }} />
    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
      style={{ background: `${color}20`, boxShadow: `0 0 12px ${glow}` }}>
      <Icon size={18} style={{ color }} />
    </div>
    <p className="text-2xl font-black text-white">{value}</p>
    <p className="text-xs font-bold mt-0.5" style={{ color }}>{label}</p>
  </motion.div>
);

export default function DashboardAnalytics() {
  const [apps,    setApps]    = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [ats,     setAts]     = useState([]);
  const [jobs,    setJobs]    = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      axios.get(`${APPLICATION_API}/get`, { withCredentials: true }),
      axios.get(`${QUIZ_API}/all`,         { withCredentials: true }),
      axios.get(`${ATS_API}/history`,       { withCredentials: true }),
      axios.get(`${JOB_API}/get`,           { withCredentials: true }),
    ]).then(([a, q, t, j]) => {
      setApps(    a.status === 'fulfilled' ? (a.value.data?.applications || []) : []);
      setQuizzes( q.status === 'fulfilled' ? (q.value.data?.quizzes      || []) : []);
      setAts(     t.status === 'fulfilled' ? (t.value.data?.history       || []) : []);
      setJobs(    j.status === 'fulfilled' ? (j.value.data?.jobs          || []) : []);
    }).finally(() => setLoading(false));
  }, []);

  // ── Derived charts from real data ──────────────────────────────────────────
  // Feature usage
  const featureUsage = [
    { feature: 'Jobs',       usage: jobs.length       },
    { feature: 'Quiz',       usage: quizzes.length    },
    { feature: 'ATS',        usage: ats.length        },
    { feature: 'Applications',usage: apps.length      },
  ];

  // Monthly app trend
  const monthlyMap = {};
  apps.forEach(a => {
    if (a.createdAt) {
      const m = new Date(a.createdAt).toLocaleDateString('en-IN', { month: 'short', year:'2-digit' });
      monthlyMap[m] = (monthlyMap[m] || 0) + 1;
    }
  });
  const monthlyApps = Object.entries(monthlyMap).map(([month, count]) => ({ month, count }));

  // ATS score trend
  const atsTrend = ats.map((h, i) => ({
    attempt: `#${i+1}`,
    score: h.score || 0,
  }));

  // App status
  const statusData = [
    { name: 'Pending',  value: apps.filter(a => a.status?.toLowerCase() === 'pending').length,  color: '#f59e0b' },
    { name: 'Accepted', value: apps.filter(a => a.status?.toLowerCase() === 'accepted').length, color: '#34d399' },
    { name: 'Rejected', value: apps.filter(a => a.status?.toLowerCase() === 'rejected').length, color: '#f87171' },
  ].filter(d => d.value > 0);

  // Quiz level spread
  const lvlMap = {};
  quizzes.forEach(q => { const l = q.level || 'Unknown'; lvlMap[l] = (lvlMap[l] || 0) + 1; });
  const quizLevelData = Object.entries(lvlMap).map(([level, count]) => ({ level, count }));

  // Radar: platform activity
  const radarData = [
    { area: 'Jobs',         score: Math.min(jobs.length * 5, 100)    },
    { area: 'Quizzes',      score: Math.min(quizzes.length * 5, 100) },
    { area: 'ATS',          score: Math.min(ats.length * 10, 100)    },
    { area: 'Applications', score: Math.min(apps.length * 8, 100)    },
  ];

  const avgAts = ats.length ? Math.round(ats.reduce((s, a) => s + (a.score || 0), 0) / ats.length) : 0;

  return (
    <div className="min-h-screen p-5 sm:p-8 space-y-7" style={{ background: BG }}>

      <motion.div {...f(0)}>
        <h1 className="text-2xl font-black text-white">📈 Platform Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Overall activity across all features.</p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Jobs Available"  value={loading?'—':jobs.length}     color="#a78bfa" glow="rgba(167,139,250,0.4)" icon={GraduationCap} delay={0.05} />
        <StatCard label="Quizzes"         value={loading?'—':quizzes.length}  color="#60a5fa" glow="rgba(96,165,250,0.4)"  icon={Brain}         delay={0.1}  />
        <StatCard label="ATS Checks"      value={loading?'—':ats.length}      color="#34d399" glow="rgba(52,211,153,0.4)"  icon={ScanLine}      delay={0.15} />
        <StatCard label="Applications"    value={loading?'—':apps.length}     color="#f59e0b" glow="rgba(245,158,11,0.4)"  icon={FileText}      delay={0.2}  />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Feature usage */}
        <Card title="⚡ Feature Usage Overview" delay={0.22}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={featureUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="feature" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TT} />
              <Bar dataKey="usage" radius={[6,6,0,0]}>
                {featureUsage.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* App status pie */}
        <Card title="📊 Application Status" delay={0.26}>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                  dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={TT} />
              </PieChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        {/* Monthly applications */}
        <Card title="📅 Monthly Applications Trend" delay={0.3}>
          {monthlyApps.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyApps}>
                <defs>
                  <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#a78bfa" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Area type="monotone" dataKey="count" stroke="#a78bfa" strokeWidth={2.5} fill="url(#appGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        {/* ATS trend */}
        <Card title="📈 ATS Score Trend" delay={0.34}>
          {atsTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={atsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="attempt" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0,100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Line type="monotone" dataKey="score" stroke="#34d399" strokeWidth={2.5} dot={{ r: 4, fill: '#34d399' }} />
              </LineChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        {/* Quiz level dist */}
        <Card title="🧠 Quiz Level Distribution" delay={0.38}>
          {quizLevelData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={quizLevelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="level" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" radius={[6,6,0,0]}>
                  {quizLevelData.map((_, i) => <Cell key={i} fill={['#34d399','#60a5fa','#f87171'][i % 3]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        {/* Platform activity radar */}
        <Card title="🎯 Platform Activity Radar" delay={0.42}>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="area" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
              <Radar dataKey="score" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.2} />
              <Tooltip contentStyle={TT} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

      </div>

      {/* Summary strip */}
      <motion.div {...f(0.46)} className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 className="font-black text-white text-sm mb-4">📋 Activity Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Avg ATS Score',    value: avgAts ? `${avgAts}%` : '—',   color: '#34d399' },
            { label: 'Jobs Posted',      value: jobs.length,                    color: '#60a5fa' },
            { label: 'Acceptance Rate',  value: apps.length ? `${Math.round(apps.filter(a=>a.status?.toLowerCase()==='accepted').length/apps.length*100)}%` : '—', color: '#a78bfa' },
            { label: 'Quiz Available',   value: quizzes.length,                 color: '#f59e0b' },
          ].map(item => (
            <div key={item.label} className="text-center p-3 rounded-xl"
              style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
              <p className="text-xl font-black text-white">{loading ? '—' : item.value}</p>
              <p className="text-xs mt-1" style={{ color: item.color }}>{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const NoData = () => (
  <div className="h-44 flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
    <p className="text-xs text-center">No data yet — use the platform to generate insights</p>
  </div>
);