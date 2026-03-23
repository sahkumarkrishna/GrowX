import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FileText, TrendingUp, Award, BarChart2 } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const ATS_API  = import.meta.env.VITE_ATS_API  || 'http://localhost:8000/api/v1/ats';
const USER_API = import.meta.env.VITE_USER_API  || 'http://localhost:8000/api/v1/user';
const TT = { backgroundColor: 'rgba(15,23,42,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: 12 };
const f  = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } });
const BG = 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)';
const NoData = () => <div className="h-44 flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.2)' }}><p className="text-xs">Upload resume & run ATS to generate data</p></div>;
const Card = ({ title, children, delay = 0 }) => (
  <motion.div {...f(delay)} className="rounded-2xl p-5"
    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
    <h3 className="font-black text-white text-sm mb-4">{title}</h3>
    {children}
  </motion.div>
);

export default function ResumeAnalytics() {
  const { user }    = useSelector(s => s.auth);
  const [ats,       setAts]       = useState([]);
  const [resumes,   setResumes]   = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    Promise.allSettled([
      axios.get(`${ATS_API}/history`,   { withCredentials: true }),
      axios.get(`${USER_API}/resumes`,  { withCredentials: true }),
    ]).then(([a, r]) => {
      setAts(     a.status === 'fulfilled' ? (a.value.data?.history  || []) : []);
      setResumes( r.status === 'fulfilled' ? (r.value.data?.resumes  || []) : []);
      // Fallback: if profile has resume, count it
    }).finally(() => setLoading(false));
  }, []);

  const total     = resumes.length || (user?.profile?.resume ? 1 : 0);
  const avgScore  = ats.length ? Math.round(ats.reduce((s, a) => s + (a.score || 0), 0) / ats.length) : 0;
  const bestScore = ats.length ? Math.max(...ats.map(a => a.score || 0)) : 0;

  // Score over versions (from ATS history)
  const scoreTrend = ats.map((h, i) => ({ version: `v${i+1}`, score: h.score || 0 }));

  // Skills from user profile
  const skills = user?.profile?.skills || [];
  const skillsData = skills.slice(0, 8).map((s, i) => ({ skill: s.slice(0, 10), present: i + 1 }));

  // Profile sections completion
  const sections = [
    { section: 'Photo',     done: !!user?.profile?.profilePhoto    },
    { section: 'Bio',       done: !!user?.profile?.bio             },
    { section: 'Skills',    done: skills.length > 0                },
    { section: 'Resume',    done: !!user?.profile?.resume          },
    { section: 'Phone',     done: !!user?.phoneNumber              },
    { section: 'Name',      done: !!user?.fullname                 },
  ];
  const completionData = sections.map(s => ({ section: s.section, rate: s.done ? 100 : 0 }));

  // Keyword analysis from all ATS checks
  const kwMatch = {};
  ats.forEach(h => { (h.matchedKeywords || []).forEach(k => { kwMatch[k] = (kwMatch[k] || 0) + 1; }); });
  const kwData = Object.entries(kwMatch).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([kw,count])=>({ kw: kw.slice(0,10), count }));

  // Radar: profile strength
  const pct = Math.round(sections.filter(s => s.done).length / sections.length * 100);
  const radarData = [
    { area: 'Skills',   value: skills.length > 0 ? 80 : 20 },
    { area: 'Resume',   value: user?.profile?.resume ? 100 : 10 },
    { area: 'ATS',      value: Math.min(ats.length * 15, 100) },
    { area: 'Bio',      value: user?.profile?.bio ? 80 : 20 },
    { area: 'Photo',    value: user?.profile?.profilePhoto ? 80 : 20 },
    { area: 'Contact',  value: user?.phoneNumber ? 80 : 20 },
  ];

  const STATS = [
    { label: 'Resumes',    value: loading?'—':total,                 color: '#059669', glow: 'rgba(5,150,105,0.4)',   icon: FileText  },
    { label: 'Avg ATS',    value: loading?'—':(avgScore?`${avgScore}%`:'—'), color: '#a78bfa', glow: 'rgba(167,139,250,0.4)', icon: BarChart2 },
    { label: 'Best ATS',   value: loading?'—':(bestScore?`${bestScore}%`:'—'), color: '#34d399', glow: 'rgba(52,211,153,0.4)', icon: Award  },
    { label: 'Skills',     value: loading?'—':skills.length,          color: '#f59e0b', glow: 'rgba(245,158,11,0.4)',  icon: TrendingUp},
  ];

  return (
    <div className="min-h-screen p-5 sm:p-8 space-y-7" style={{ background: BG }}>
      <motion.div {...f(0)}>
        <h1 className="text-2xl font-black text-white">📄 Resume Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Track resume quality and skill insights.</p>
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
        <Card title="📈 ATS Score Trend" delay={0.2}>
          {scoreTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={scoreTrend}>
                <defs><linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#059669" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="version" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0,100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Area type="monotone" dataKey="score" stroke="#059669" strokeWidth={2.5} fill="url(#resGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="💪 Profile Strength Radar" delay={0.24}>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="area" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
              <Radar dataKey="value" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
              <Tooltip contentStyle={TT} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="✅ Profile Section Completion" delay={0.28}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={completionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" domain={[0,100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="section" type="category" width={55} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TT} />
              <Bar dataKey="rate" radius={[0,6,6,0]}>
                {completionData.map((e) => <Cell key={e.section} fill={e.rate === 100 ? '#34d399' : '#f87171'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="🏷️ Skills Distribution" delay={0.32}>
          {skillsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={skillsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="skill" type="category" width={70} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="present" fill="#a78bfa" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        {kwData.length > 0 && (
          <Card title="🔑 Top Matched Keywords" delay={0.36}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={kwData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="kw" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" fill="#34d399" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>
    </div>
  );
}