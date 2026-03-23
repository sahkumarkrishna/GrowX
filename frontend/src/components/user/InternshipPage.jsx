import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { GraduationCap, Clock, CheckCircle, XCircle, ChevronRight, Plus, BarChart2, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const APPLICATION_API = import.meta.env.VITE_APPLICATION_API || 'http://localhost:8000/api/v1/application';
const f = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } });

const STATUS = {
  pending:  { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)',  icon: Clock,        label: 'Pending'  },
  accepted: { bg: 'rgba(52,211,153,0.15)', text: '#34d399', border: 'rgba(52,211,153,0.3)',  icon: CheckCircle,  label: 'Accepted' },
  rejected: { bg: 'rgba(248,113,113,0.15)',text: '#f87171', border: 'rgba(248,113,113,0.3)', icon: XCircle,      label: 'Rejected' },
};

const customTooltipStyle = {
  backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px', color: '#fff', fontSize: 12,
};

export default function InternshipPage() {
  const navigate = useNavigate();
  const [apps, setApps]       = useState([]);
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

  // Dynamic chart data from real applications
  const statusPieData = [
    { name: 'Pending',  value: pending  || 0, color: '#f59e0b' },
    { name: 'Accepted', value: accepted || 0, color: '#34d399' },
    { name: 'Rejected', value: rejected || 0, color: '#f87171' },
  ].filter(d => d.value > 0);

  // Monthly trend from real data
  const monthlyMap = {};
  apps.forEach(app => {
    if (app.createdAt) {
      const m = new Date(app.createdAt).toLocaleDateString('en-IN', { month: 'short' });
      monthlyMap[m] = (monthlyMap[m] || 0) + 1;
    }
  });
  const monthlyData = Object.entries(monthlyMap).map(([month, apps]) => ({ month, apps }));

  // Company-wise
  const companyMap = {};
  apps.forEach(app => {
    const c = app.job?.company?.name || 'Unknown';
    companyMap[c] = (companyMap[c] || 0) + 1;
  });
  const companyData = Object.entries(companyMap).slice(0, 6).map(([company, apps]) => ({ company: company.slice(0, 10), apps }));

  const COLORS = ['#a78bfa', '#60a5fa', '#34d399', '#f59e0b', '#f87171', '#38bdf8'];

  return (
    <div className="min-h-screen p-5 sm:p-8 space-y-7"
      style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)' }}>

      <motion.div {...f(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">🎓 Internships</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Track your internship applications.</p>
        </div>
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/user/analytics/internship')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <BarChart2 size={14} /> Analytics
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/browse')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#d97706,#b45309)', boxShadow: '0 4px 15px rgba(217,119,6,0.35)' }}>
            <Plus size={15} /> Find More
          </motion.button>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Applied', value: apps.length, color: '#d97706', glow: 'rgba(217,119,6,0.4)',   icon: GraduationCap },
          { label: 'Pending',       value: pending,     color: '#f59e0b', glow: 'rgba(245,158,11,0.4)',  icon: Clock         },
          { label: 'Accepted',      value: accepted,    color: '#34d399', glow: 'rgba(52,211,153,0.4)',  icon: CheckCircle   },
          { label: 'Rejected',      value: rejected,    color: '#f87171', glow: 'rgba(248,113,113,0.4)', icon: XCircle       },
        ].map((s, i) => (
          <motion.div key={s.label} {...f(0.05 + i * 0.05)}
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
            <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full pointer-events-none"
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

      {/* Charts — only show if there's data */}
      {!loading && apps.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Status Pie */}
          <motion.div {...f(0.2)} className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="font-black text-white text-sm mb-4">Status Distribution</h3>
            {statusPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={45} outerRadius={72}
                    dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {statusPieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={customTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            ) : <NoDataMsg />}
          </motion.div>

          {/* Monthly trend */}
          <motion.div {...f(0.25)} className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="font-black text-white text-sm mb-4">Monthly Applications</h3>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Bar dataKey="apps" fill="#d97706" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <NoDataMsg />}
          </motion.div>

          {/* Company-wise */}
          <motion.div {...f(0.3)} className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="font-black text-white text-sm mb-4">Company-wise</h3>
            {companyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={companyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="company" type="category" width={65} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Bar dataKey="apps" radius={[0,6,6,0]}>
                    {companyData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : <NoDataMsg />}
          </motion.div>
        </div>
      )}

      {/* Application list */}
      <motion.div {...f(0.35)} className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h3 className="font-black text-white text-sm">All Applications</h3>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(217,119,6,0.15)', color: '#d97706', border: '1px solid rgba(217,119,6,0.25)' }}>
            {apps.length} total
          </span>
        </div>
        <div className="p-3 space-y-1.5">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
            ))
          ) : apps.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap size={36} className="mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.15)' }} />
              <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>No applications yet</p>
              <button onClick={() => navigate('/browse')}
                className="px-5 py-2 rounded-xl text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#d97706,#b45309)' }}>
                Browse Internships
              </button>
            </div>
          ) : apps.map((app, i) => {
            const st = STATUS[app.status?.toLowerCase()] || STATUS.pending;
            const StIcon = st.icon;
            return (
              <motion.div key={app._id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.37 + i * 0.03 }}
                className="flex items-center gap-3 p-3 rounded-xl transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.25)' }}>
                  <GraduationCap size={16} style={{ color: '#d97706' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{app.job?.title || 'Internship Position'}</p>
                  <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {app.job?.company?.name || 'Company'} · {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : 'Recent'}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                  style={{ background: st.bg, color: st.text, border: `1px solid ${st.border}` }}>
                  <StIcon size={10} /> {st.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

const NoDataMsg = () => (
  <div className="h-40 flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
    <p className="text-xs">Add applications to see chart</p>
  </div>
);