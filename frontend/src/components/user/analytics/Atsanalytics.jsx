import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ScanLine, TrendingUp, Award, Target } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const ATS_API = import.meta.env.VITE_ATS_API || 'http://localhost:8000/api/v1/ats';
const TT = { backgroundColor: 'rgba(15,23,42,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: 12 };
const f  = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } });
const BG = 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)';
const NoData = () => <div className="h-44 flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.2)' }}><p className="text-xs">Run ATS checks to generate data</p></div>;
const Card = ({ title, children, delay = 0 }) => (
  <motion.div {...f(delay)} className="rounded-2xl p-5"
    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
    <h3 className="font-black text-white text-sm mb-4">{title}</h3>
    {children}
  </motion.div>
);

export default function ATSAnalytics() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${ATS_API}/history`, { withCredentials: true })
      .then(r => setHistory(r.data?.history || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const total = history.length;
  const avg   = total ? Math.round(history.reduce((s, a) => s + (a.score || 0), 0) / total) : 0;
  const best  = total ? Math.max(...history.map(a => a.score || 0)) : 0;
  const latest = history[history.length - 1];

  // Score trend
  const trendData = history.map((h, i) => ({ attempt: `#${i+1}`, score: h.score || 0, date: h.createdAt ? new Date(h.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : '' }));

  // Score distribution
  const buckets = { '0-40': 0, '40-60': 0, '60-80': 0, '80-100': 0 };
  history.forEach(h => {
    const s = h.score || 0;
    if (s < 40) buckets['0-40']++; else if (s < 60) buckets['40-60']++; else if (s < 80) buckets['60-80']++; else buckets['80-100']++;
  });
  const distData = Object.entries(buckets).map(([range, count]) => ({ range, count }));
  const distColors = ['#f87171','#f59e0b','#60a5fa','#34d399'];

  // Keyword analysis from history
  const allMatched = {};
  const allMissing = {};
  history.forEach(h => {
    (h.matchedKeywords || []).forEach(k => { allMatched[k] = (allMatched[k] || 0) + 1; });
    (h.missingKeywords || []).forEach(k => { allMissing[k] = (allMissing[k] || 0) + 1; });
  });
  const topMatched = Object.entries(allMatched).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([kw,count])=>({ kw: kw.slice(0,12), count }));
  const topMissing = Object.entries(allMissing).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([kw,count])=>({ kw: kw.slice(0,12), count }));

  // Parsing section accuracy from latest check
  const parsingData = latest?.detailedAnalysis
    ? Object.entries(latest.detailedAnalysis)
        .filter(([,v]) => v && typeof v.score === 'number')
        .slice(0, 6)
        .map(([section, v]) => ({ section: section.charAt(0).toUpperCase()+section.slice(1), accuracy: v.score }))
    : [];

  const STATS = [
    { label: 'Total Checks', value: loading?'—':total, color: '#dc2626', glow: 'rgba(220,38,38,0.4)',   icon: ScanLine   },
    { label: 'Avg Score',    value: loading?'—':(avg?`${avg}%`:'—'), color: '#f59e0b', glow: 'rgba(245,158,11,0.4)', icon: TrendingUp },
    { label: 'Best Score',   value: loading?'—':(best?`${best}%`:'—'), color: '#34d399', glow: 'rgba(52,211,153,0.4)', icon: Award   },
    { label: 'Keywords',     value: loading?'—':Object.keys(allMatched).length, color: '#a78bfa', glow: 'rgba(167,139,250,0.4)', icon: Target },
  ];

  return (
    <div className="min-h-screen p-5 sm:p-8 space-y-7" style={{ background: BG }}>
      <motion.div {...f(0)}>
        <h1 className="text-2xl font-black text-white">🤖 ATS Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Resume scoring insights from real checks.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="📈 Score Improvement Trend" delay={0.2}>
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trendData}>
                <defs><linearGradient id="atsg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#34d399" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="attempt" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0,100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} labelFormatter={(l, p) => p?.[0]?.payload?.date || l} />
                <Area type="monotone" dataKey="score" stroke="#34d399" strokeWidth={2.5} fill="url(#atsg)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="📊 Score Distribution" delay={0.24}>
          {total > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={distData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="range" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" radius={[6,6,0,0]}>
                  {distData.map((_, i) => <Cell key={i} fill={distColors[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="✅ Top Matched Keywords" delay={0.28}>
          {topMatched.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topMatched} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="kw" type="category" width={80} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" fill="#34d399" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="⚠️ Top Missing Keywords" delay={0.32}>
          {topMissing.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topMissing} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="kw" type="category" width={80} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" fill="#f87171" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        {parsingData.length > 0 && (
          <Card title="🔍 Section Parsing Accuracy" delay={0.36}>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={parsingData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="section" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                <Radar dataKey="accuracy" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
                <Tooltip contentStyle={TT} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>
    </div>
  );
}