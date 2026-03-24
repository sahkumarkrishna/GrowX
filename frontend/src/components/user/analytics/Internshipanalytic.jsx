import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, TrendingUp, PieChart as PieIcon, 
  Layout, Zap, Target, Award, BarChart3, Clock
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const INTERNSHIP_API = import.meta.env.VITE_USER_API?.replace('/user', '/internship') || 'http://localhost:8000/api/v1/internship';

// Premium Neon Palette for Black Background
const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

const f = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] }
});

const InternshipAnalytics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${INTERNSHIP_API}/all`, { withCredentials: true })
      .then(r => setData(r.data.data || []))
      .catch(() => console.error("Error fetching data"))
      .finally(() => setLoading(false));
  }, []);

  // Transformation Logic
  const statusData = [
    { name: 'Accepted', value: data.filter(a => a.status === 'accepted').length },
    { name: 'Pending', value: data.filter(a => a.status === 'pending').length },
    { name: 'Rejected', value: data.filter(a => a.status === 'rejected').length },
  ].filter(i => i.value > 0);

  const timelineData = data.reduce((acc, curr) => {
    const date = new Date(curr.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const existing = acc.find(item => item.date === date);
    if (existing) existing.count += 1;
    else acc.push({ date, count: 1 });
    return acc;
  }, []).slice(-8);

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-[#09090b]">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div {...f(0)} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <button 
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-4 text-sm font-bold"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              BACK TO CONSOLE
            </button>
            <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              INTERNSHIP <span className="text-blue-500 underline decoration-blue-500/20 underline-offset-8">INSIGHTS</span>
            </h1>
          </div>

          <div className="flex gap-4">
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl backdrop-blur-xl">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Applications</p>
              <p className="text-3xl font-black">{data.length}</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl backdrop-blur-xl">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Success Rate</p>
              <p className="text-3xl font-black text-emerald-400">
                {data.length ? Math.round((statusData.find(s => s.name === 'Accepted')?.value || 0) / data.length * 100) : 0}%
              </p>
            </div>
          </div>
        </motion.div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Trend Line Chart */}
          <motion.div {...f(0.1)} className="lg:col-span-2">
            <Card className="bg-zinc-900/40 border-zinc-800 rounded-[32px] overflow-hidden backdrop-blur-md">
              <CardHeader className="p-8">
                <CardTitle className="text-white flex items-center gap-3 text-xl font-bold">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><TrendingUp size={20}/></div>
                  Application Velocity
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-8">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="glowBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fill="url(#glowBlue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Donut Chart */}
          <motion.div {...f(0.2)}>
            <Card className="bg-zinc-900/40 border-zinc-800 rounded-[32px] h-full backdrop-blur-md">
              <CardHeader className="p-8">
                <CardTitle className="text-white flex items-center gap-3 text-xl font-bold">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><PieIcon size={20}/></div>
                  Outcome Split
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={statusData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                      {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 w-full gap-2 mt-4 px-4">
                  {statusData.map((s, i) => (
                    <div key={s.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                        <span className="text-xs font-medium text-zinc-400">{s.name}</span>
                      </div>
                      <span className="text-sm font-black">{s.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom Banner Stats */}
          <motion.div {...f(0.3)} className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { icon: Target, label: "Top Domain", val: "Software Eng.", color: "text-emerald-400" },
               { icon: Clock, label: "Avg Response", val: "2.4 Days", color: "text-blue-400" },
               { icon: Award, label: "Interviews", val: "12 Scheduled", color: "text-purple-400" }
             ].map((stat, i) => (
               <div key={i} className="p-6 rounded-[24px] bg-zinc-900/60 border border-zinc-800 flex items-center gap-5 group hover:border-zinc-600 transition-all">
                 <div className={`p-4 rounded-2xl bg-zinc-800 group-hover:scale-110 transition-transform ${stat.color}`}>
                   <stat.icon size={24} />
                 </div>
                 <div>
                   <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-xl font-bold">{stat.val}</p>
                 </div>
               </div>
             ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default InternshipAnalytics;