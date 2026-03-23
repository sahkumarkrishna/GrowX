// ═══════════════════════════════════════════════════════════
// InternshipAnalytics.jsx
// ═══════════════════════════════════════════════════════════
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { GraduationCap, TrendingUp, Building2, MapPin } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const APPLICATION_API = import.meta.env.VITE_APPLICATION_API || 'http://localhost:8000/api/v1/application';
const TT = { backgroundColor: 'rgba(15,23,42,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: 12 };
const f  = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } });
const BG = 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)';
const COLORS = ['#a78bfa','#60a5fa','#34d399','#f59e0b','#f87171','#38bdf8'];
const NoData = () => <div className="h-44 flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.2)' }}><p className="text-xs">Apply to internships to generate data</p></div>;
const Card = ({ title, children, delay = 0 }) => (
  <motion.div {...f(delay)} className="rounded-2xl p-5"
    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
    <h3 className="font-black text-white text-sm mb-4">{title}</h3>
    {children}
  </motion.div>
);

export default function InternshipAnalytics() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${APPLICATION_API}/get`, { withCredentials: true })
      .then(r => setApps(r.data?.applications || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const pending  = apps.filter(a => a.status?.toLowerCase() === 'pending').length;
  const accepted = apps.filter(a => a.status?.toLowerCase() === 'accepted').length;
  const rejected = apps.filter(a => a.status?.toLowerCase() === 'rejected').length;

  const statusData = [
    { name: 'Pending',  value: pending,  color: '#f59e0b' },
    { name: 'Accepted', value: accepted, color: '#34d399' },
    { name: 'Rejected', value: rejected, color: '#f87171' },
  ].filter(d => d.value > 0);

  const monthlyMap = {};
  apps.forEach(a => {
    if (a.createdAt) {
      const m = new Date(a.createdAt).toLocaleDateString('en-IN', { month: 'short' });
      monthlyMap[m] = (monthlyMap[m] || 0) + 1;
    }
  });
  const monthlyData = Object.entries(monthlyMap).map(([month, apps]) => ({ month, apps }));

  const companyMap = {};
  apps.forEach(a => { const c = a.job?.company?.name || 'Other'; companyMap[c] = (companyMap[c] || 0) + 1; });
  const companyData = Object.entries(companyMap).slice(0, 6).map(([company, count]) => ({ company: company.slice(0, 10), count }));

  const roleMap = {};
  apps.forEach(a => { const r = a.job?.title || 'Other'; roleMap[r] = (roleMap[r] || 0) + 1; });
  const roleData = Object.entries(roleMap).slice(0, 5).map(([role, count]) => ({ role: role.slice(0, 12), count }));

  const locationMap = {};
  apps.forEach(a => { const l = a.job?.location || 'Remote'; locationMap[l] = (locationMap[l] || 0) + 1; });
  const locationData = Object.entries(locationMap).slice(0, 6).map(([location, apps]) => ({ location: location.slice(0, 10), apps }));

  const STATS = [
    { label: 'Total Applied', value: apps.length, color: '#d97706', glow: 'rgba(217,119,6,0.4)',   icon: GraduationCap },
    { label: 'Accepted',      value: accepted,    color: '#34d399', glow: 'rgba(52,211,153,0.4)',  icon: TrendingUp    },
    { label: 'Companies',     value: Object.keys(companyMap).length, color: '#60a5fa', glow: 'rgba(96,165,250,0.4)', icon: Building2 },
    { label: 'Locations',     value: Object.keys(locationMap).length, color: '#a78bfa', glow: 'rgba(167,139,250,0.4)', icon: MapPin },
  ];

  return (
    <div className="min-h-screen p-5 sm:p-8 space-y-7" style={{ background: BG }}>
      <motion.div {...f(0)}>
        <h1 className="text-2xl font-black text-white">🔥 Internship Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Real-time insights from your applications.</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label} {...f(0.05 + i * 0.04)} className="rounded-2xl p-4 relative overflow-hidden"
            style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
            <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle,${s.glow},transparent 70%)` }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.color}20`, boxShadow: `0 0 12px ${s.glow}` }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-black text-white">{loading ? '—' : s.value}</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: s.color }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="📊 Application Status" delay={0.2}>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}>
                {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie><Tooltip contentStyle={TT} /></PieChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="📅 Monthly Applications" delay={0.24}>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="apps" fill="#d97706" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="🎯 Top Applied Roles" delay={0.28}>
          {roleData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={roleData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="role" type="category" width={80} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" fill="#a78bfa" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="🏢 Company-wise Applications" delay={0.32}>
          {companyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={companyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="company" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="count" radius={[6,6,0,0]}>
                  {companyData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>

        <Card title="📍 Location Distribution" delay={0.36}>
          {locationData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="location" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Bar dataKey="apps" radius={[6,6,0,0]}>
                  {locationData.map((_, i) => <Cell key={i} fill={`hsl(${220+i*20},65%,${58-i*4}%)`} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </Card>
      </div>
    </div>
  );
}