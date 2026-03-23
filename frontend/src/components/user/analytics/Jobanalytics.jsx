import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Briefcase, MapPin, Building2, TrendingUp, Clock, Users,
} from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const JOB_API         = import.meta.env.VITE_JOB_API         || 'http://localhost:8000/api/v1/job';
const APPLICATION_API = import.meta.env.VITE_APPLICATION_API || 'http://localhost:8000/api/v1/application';

const TT = {
  backgroundColor: 'rgba(15,23,42,0.97)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px', color: '#fff', fontSize: 12,
};
const f = (d = 0) => ({
  initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: d },
});
const BG     = 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)';
const COLORS = ['#2dd4bf','#a78bfa','#34d399','#f59e0b','#f87171','#60a5fa'];

const NoData = ({ text = 'Apply to jobs to generate data' }) => (
  <div className="h-44 flex items-center justify-center"
    style={{ color: 'rgba(255,255,255,0.2)' }}>
    <p className="text-xs text-center">{text}</p>
  </div>
);

const Card = ({ title, children, delay = 0 }) => (
  <motion.div {...f(delay)} className="rounded-2xl p-5"
    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
    <h3 className="font-black text-white text-sm mb-4">{title}</h3>
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

export default function JobAnalytics() {
  const [jobs,    setJobs]    = useState([]);
  const [apps,    setApps]    = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      axios.get(`${JOB_API}/get`,          { withCredentials: true }),
      axios.get(`${APPLICATION_API}/get`,  { withCredentials: true }),
    ]).then(([j, a]) => {
      setJobs(j.status === 'fulfilled' ? (j.value.data?.jobs || []) : []);
      setApps(a.status === 'fulfilled' ? (a.value.data?.applications || []) : []);
    }).finally(() => setLoading(false));
  }, []);

  // ── Derived data ─────────────────────────────────────────────────────────────

  // Applications per status
  const statusMap = {};
  apps.forEach(a => {
    const s = a.status?.toLowerCase() || 'pending';
    statusMap[s] = (statusMap[s] || 0) + 1;
  });
  const statusData = [
    { name: 'Pending',  value: statusMap.pending  || 0, color: '#f59e0b' },
    { name: 'Accepted', value: statusMap.accepted || 0, color: '#34d399' },
    { name: 'Rejected', value: statusMap.rejected || 0, color: '#f87171' },
  ].filter(d => d.value > 0);

  // Monthly application trend
  const monthlyMap = {};
  apps.forEach(a => {
    if (a.createdAt) {
      const m = new Date(a.createdAt).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
      monthlyMap[m] = (monthlyMap[m] || 0) + 1;
    }
  });
  const monthlyData = Object.entries(monthlyMap).map(([month, count]) => ({ month, count }));

  // Job type distribution (from all jobs)
  const typeMap = {};
  jobs.forEach(j => {
    const t = j.jobType?.replace(/_/g, ' ') || 'Other';
    typeMap[t] = (typeMap[t] || 0) + 1;
  });
  const typeData = Object.entries(typeMap).map(([type, count]) => ({ type, count }));

  // Top companies by job count
  const companyMap = {};
  jobs.forEach(j => {
    const c = j.company?.name || 'Unknown';
    companyMap[c] = (companyMap[c] || 0) + 1;
  });
  const companyData = Object.entries(companyMap)
    .sort((a, b) => b[1] - a[1]).slice(0, 7)
    .map(([company, count]) => ({ company: company.slice(0, 12), count }));

  // Top locations
  const locationMap = {};
  jobs.forEach(j => {
    const l = j.location || 'Remote';
    locationMap[l] = (locationMap[l] || 0) + 1;
  });
  const locationData = Object.entries(locationMap)
    .sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([location, count]) => ({ location: location.slice(0, 10), count }));

  // Applied company distribution
  const appCompanyMap = {};
  apps.forEach(a => {
    const c = a.job?.company?.name || 'Unknown';
    appCompanyMap[c] = (appCompanyMap[c] || 0) + 1;
  });
  const appCompanyData = Object.entries(appCompanyMap)
    .sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([company, count]) => ({ company: company.slice(0, 12), count }));

  // Job roles applied to
  const roleMap = {};
  apps.forEach(a => {
    const r = a.job?.title || 'Unknown';
    roleMap[r] = (roleMap[r] || 0) + 1;
  });
  const roleData = Object.entries(roleMap)
    .sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([role, count]) => ({ role: role.slice(0, 14), count }));

  // Radar: job activity overview
  const radarData = [
    { area: 'Total Jobs',   value: Math.min(jobs.length * 2, 100)            },
    { area: 'Applied',      value: Math.min(apps.length * 10, 100)           },
    { area: 'Accepted',     value: Math.min((statusMap.accepted || 0) * 20, 100) },
    { area: 'Companies',    value: Math.min(Object.keys(companyMap).length * 5, 100) },
    { area: 'Locations',    value: Math.min(Object.keys(locationMap).length * 8, 100) },
  ];

  // Success rate
  const successRate = apps.length
    ? Math.round((statusMap.accepted || 0) / apps.length * 100)
    : 0;

  const STATS = [
    { label: 'Total Jobs',   value: loading ? '—' : jobs.length,    color: '#2dd4bf', glow: 'rgba(45,212,191,0.4)',  icon: Briefcase  },
    { label: 'Applied',      value: loading ? '—' : apps.length,    color: '#a78bfa', glow: 'rgba(167,139,250,0.4)', icon: TrendingUp },
    { label: 'Accepted',     value: loading ? '—' : (statusMap.accepted || 0), color: '#34d399', glow: 'rgba(52,211,153,0.4)', icon: Users },
    { label: 'Success Rate', value: loading ? '—' : `${successRate}%`, color: '#f59e0b', glow: 'rgba(245,158,11,0.4)', icon: Clock   },
  ];

  return (
    <div className="min-h-screen p-5 sm:p-8 space-y-7" style={{ background: BG }}>

      {/* Header */}
      <motion.div {...f(0)}>
        <h1 className="text-2xl font-black text-white">💼 Job Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Real-time insights from jobs and your applications.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} delay={0.05 + i * 0.05} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Application status */}
        <Card title="📊 Application Status Distribution" delay={0.2}>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%"
                  innerRadius={50} outerRadius={80} dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}>
                  {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={TT} />
              </PieChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        {/* Monthly applications trend */}
        <Card title="📅 Monthly Applications Trend" delay={0.24}>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="jobGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#2dd4bf" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Area type="monotone" dataKey="count" stroke="#2dd4bf" strokeWidth={2.5} fill="url(#jobGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        {/* Job type distribution */}
        <Card title="🗂️ Job Type Distribution" delay={0.28}>
          {typeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="type" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" radius={[6,6,0,0]}>
                  {typeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData text="No jobs loaded yet" />}
        </Card>

        {/* Top companies (jobs available) */}
        <Card title="🏢 Top Companies by Jobs" delay={0.32}>
          {companyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={companyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="company" type="category" width={80}
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" fill="#2dd4bf" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData text="No jobs loaded yet" />}
        </Card>

        {/* Location heatmap */}
        <Card title="📍 Jobs by Location" delay={0.36}>
          {locationData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="location" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" radius={[6,6,0,0]}>
                  {locationData.map((_, i) => (
                    <Cell key={i} fill={`hsl(${170 + i * 18},65%,${55 - i * 3}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData text="No jobs loaded yet" />}
        </Card>

        {/* Applied roles */}
        <Card title="🎯 Top Roles Applied To" delay={0.4}>
          {roleData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={roleData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="role" type="category" width={90}
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" fill="#a78bfa" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        {/* Applied company wise */}
        <Card title="🏭 Companies Applied To" delay={0.44}>
          {appCompanyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={appCompanyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="company" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" radius={[6,6,0,0]}>
                  {appCompanyData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        {/* Activity Radar */}
        <Card title="🔮 Job Activity Radar" delay={0.48}>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="area" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
              <Radar dataKey="value" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.2} />
              <Tooltip contentStyle={TT} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

      </div>

      {/* Summary strip */}
      <motion.div {...f(0.52)} className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 className="font-black text-white text-sm mb-4">📋 Job Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Jobs',    value: jobs.length,                      color: '#2dd4bf' },
            { label: 'Applied',       value: apps.length,                      color: '#a78bfa' },
            { label: 'Companies',     value: Object.keys(companyMap).length,   color: '#f59e0b' },
            { label: 'Success Rate',  value: `${successRate}%`,                color: '#34d399' },
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