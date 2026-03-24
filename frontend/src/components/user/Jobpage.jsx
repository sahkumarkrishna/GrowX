import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, Search, Users, Building2, TrendingUp, 
  CheckCircle, Mail, Clock, Filter, Calendar, 
  ArrowUpRight, Target, Activity, ShieldCheck
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';

// Animation Helper
const f = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: d, ease: [0.23, 1, 0.32, 1] }
});

const STATUS_STYLES = {
  pending:  { bg: 'rgba(245,158,11,0.1)', text: '#f59e0b', border: 'rgba(245,158,11,0.2)' },
  accepted: { bg: 'rgba(16,185,129,0.1)', text: '#10b981', border: 'rgba(16,185,129,0.2)' },
  rejected: { bg: 'rgba(239,68,68,0.1)',  text: '#ef4444', border: 'rgba(239,68,68,0.2)' },
};

const Jobpage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const APP_API = import.meta.env.VITE_USER_API?.replace('/user', '/application') || 'http://localhost:8000/api/v1/application';

  useEffect(() => {
    axios.get(`${APP_API}/all`, { withCredentials: true })
      .then(r => setApplications(r.data.applications || []))
      .catch(() => toast.error('Failed to fetch applications'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = applications.filter(a => {
    const matchSearch =
      a.applicant?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      a.applicant?.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.job?.company?.name?.toLowerCase().includes(search.toLowerCase());
    if (statusFilter !== 'all') return matchSearch && a.status === statusFilter;
    return matchSearch;
  });

  const stats = [
    { label: 'Total Volume', value: applications.length, icon: Activity, color: '#10b981' },
    { label: 'Accepted', value: applications.filter(a => a.status === 'accepted').length, icon: ShieldCheck, color: '#3b82f6' },
    { label: 'Waitlist', value: applications.filter(a => a.status === 'pending').length, icon: Clock, color: '#f59e0b' },
    { label: 'Engaged', value: new Set(applications.map(a => a.applicant?._id)).size, icon: Users, color: '#8b5cf6' },
  ];

  if (loading) return (
 
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-xl border-4 border-emerald-500/20" />
          <div className="absolute inset-0 rounded-xl border-4 border-emerald-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-gray-400 font-medium animate-pulse">Syncing application data...</p>
      </div>
   
  );

  return (
 
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div {...f(0)}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Briefcase className="text-emerald-500" size={24} />
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 py-1">
                Management Portal
              </Badge>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Application <span className="text-emerald-500">Intelligence</span>
            </h1>
            <p className="text-gray-400 mt-2 max-w-md">
              Monitor candidate flow and recruitment metrics across all active job postings.
            </p>
          </motion.div>

          <motion.div {...f(0.1)} className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Filter by name, role..."
                className="bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-600 pl-11 pr-4 py-2 w-64 text-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} {...f(0.2 + (i * 0.05))}>
              <Card className="bg-[#1f2937]/50 border-white/5 backdrop-blur-sm hover:border-white/10 transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                      <stat.icon size={20} style={{ color: stat.color }} />
                    </div>
                    <div className="flex items-center text-emerald-500 gap-1 text-xs font-bold">
                      <ArrowUpRight size={14} /> 12%
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Status Filter Tabs */}
        <motion.div {...f(0.4)} className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['all', 'pending', 'accepted', 'rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border shrink-0 ${
                statusFilter === s 
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
              }`}
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* Glassmorphism Table */}
        <motion.div {...f(0.5)} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[2rem] blur opacity-50" />
          <Card className="relative bg-[#0f172a]/80 border-white/10 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-6 py-5 text-xs font-black text-gray-500 uppercase tracking-widest">Candidate</th>
                    <th className="px-6 py-5 text-xs font-black text-gray-500 uppercase tracking-widest">Position & Company</th>
                    <th className="px-6 py-5 text-xs font-black text-gray-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-5 text-xs font-black text-gray-500 uppercase tracking-widest">Applied Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode='popLayout'>
                    {filtered.map((a, i) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={a._id} 
                        className="hover:bg-white/[0.02] transition-colors group/row"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-emerald-500/20">
                              {a.applicant?.fullname?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white group-hover/row:text-emerald-400 transition-colors">
                                {a.applicant?.fullname || 'Anonymous'}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                                <Mail size={12} /> {a.applicant?.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-gray-200">{a.job?.title}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Building2 size={12} /> {a.job?.company?.name}
                          </p>
                        </td>
                        <td className="px-6 py-5">
                          <div 
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-tighter"
                            style={{ 
                              backgroundColor: STATUS_STYLES[a.status]?.bg, 
                              color: STATUS_STYLES[a.status]?.text, 
                              borderColor: STATUS_STYLES[a.status]?.border 
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: STATUS_STYLES[a.status]?.text }} />
                            {a.status || 'pending'}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-600" />
                            {new Date(a.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="py-24 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <Target size={32} className="text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white">No matches found</h3>
                  <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {filtered.length > 0 && (
          <motion.p {...f(0.6)} className="text-center text-xs font-medium text-gray-600 tracking-widest uppercase">
            Displaying <span className="text-emerald-500 font-black">{filtered.length}</span> of {applications.length} Entries
          </motion.p>
        )}
      </div>
  
  );
};

export default Jobpage;