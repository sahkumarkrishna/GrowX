import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Search, Plus, MapPin, Clock, Users, Building2, DollarSign, Star, TrendingUp, Eye, Filter, Calendar, Award, Target, BarChart2, Activity } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl p-4 min-w-[140px]">
        {label && <p className="font-bold text-gray-700 text-sm mb-2">{label}</p>}
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-xs text-gray-600">{p.name}:</span>
            <span className="text-xs font-bold text-gray-800">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AdminAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const JOB_API = import.meta.env.VITE_JOB_API || 'http://localhost:8000/api/v1/job';

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${JOB_API}/getadminjobs`, { withCredentials: true });
      setJobs(res.data.jobs || []);
    } catch (error) {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeJobs = jobs.filter(job => job.status !== 'closed');
  const totalApplications = jobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-16 -mb-16" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
                  <Briefcase className="h-9 w-9 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Job Management</h1>
                  <p className="text-green-200">Manage job postings & track applications</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{jobs.length} Total Jobs</span>
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{activeJobs.length} Active</span>
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{totalApplications} Applications</span>
                  </div>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => navigate('/admin/jobs/create')}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 shadow-xl h-12 px-6">
                  <Plus className="w-5 h-5 mr-2" />Post New Job
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {[
            { title: 'Total Jobs', value: jobs.length, icon: Briefcase, g: 'from-emerald-500 to-green-600', bg: 'from-emerald-50 to-green-50', border: 'border-emerald-100' },
            { title: 'Active Jobs', value: activeJobs.length, icon: TrendingUp, g: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50', border: 'border-blue-100' },
            { title: 'Applications', value: totalApplications, icon: Users, g: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50', border: 'border-purple-100' },
            { title: 'Companies', value: new Set(jobs.map(job => job.company?._id)).size, icon: Building2, g: 'from-orange-500 to-red-500', bg: 'from-orange-50 to-red-50', border: 'border-orange-100' },
            { title: 'Avg Salary', value: jobs.length ? `₹${Math.round(jobs.reduce((s, j) => s + (j.salary || 0), 0) / jobs.length / 1000)}K` : '₹0', icon: DollarSign, g: 'from-teal-500 to-cyan-600', bg: 'from-teal-50 to-cyan-50', border: 'border-teal-100' },
            { title: 'This Month', value: jobs.filter(j => new Date(j.createdAt).getMonth() === new Date().getMonth()).length, icon: Calendar, g: 'from-indigo-500 to-violet-500', bg: 'from-indigo-50 to-violet-50', border: 'border-indigo-100' },
          ].map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04 * i }} whileHover={{ y: -4, scale: 1.04 }}>
              <Card className={`border ${c.border} shadow-md bg-gradient-to-br ${c.bg} overflow-hidden`}>
                <CardContent className="p-4">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.g} flex items-center justify-center shadow-md mb-3`}>
                    <c.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-tight mb-1">{c.title}</p>
                  <p className="text-xl font-black text-gray-800">{c.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Search & Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl bg-gray-50 focus:bg-white transition-all shadow-sm"
                    placeholder="Search jobs by title, company, or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="h-12 px-4 border-2 border-gray-200 hover:border-emerald-500 rounded-xl">
                    <Filter className="w-4 h-4 mr-2" />Filter
                  </Button>
                  <Button variant="outline" className="h-12 px-4 border-2 border-gray-200 hover:border-emerald-500 rounded-xl">
                    <Eye className="w-4 h-4 mr-2" />View
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 cursor-pointer">All Jobs ({jobs.length})</Badge>
                <Badge variant="outline" className="hover:bg-blue-50 cursor-pointer">Active ({activeJobs.length})</Badge>
                <Badge variant="outline" className="hover:bg-purple-50 cursor-pointer">Remote</Badge>
                <Badge variant="outline" className="hover:bg-orange-50 cursor-pointer">Full-time</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Premium Jobs Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div key={job._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }} whileHover={{ y: -8, scale: 1.02 }}>
              <Card className="hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}>
                <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 group-hover:h-2 transition-all" />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl text-gray-900 truncate mb-2 group-hover:text-emerald-600 transition-colors">{job.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <Building2 className="w-3 h-3 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-600 truncate font-medium">{job.company?.name}</p>
                      </div>
                    </div>
                    {job.company?.logo ? (
                      <div className="flex-shrink-0 ml-4">
                        <img src={job.company.logo} alt={job.company.name}
                          className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white group-hover:scale-110 transition-transform" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-sm">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-blue-600 font-semibold mb-0.5">Location</p>
                          <p className="text-sm text-gray-900 truncate font-medium">{job.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-purple-600 font-semibold mb-0.5">Applications</p>
                          <p className="text-sm text-gray-900 font-bold">{job.applications?.length || 0}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-sm">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600 font-semibold mb-0.5">Posted</p>
                        <p className="text-sm text-gray-900 font-medium">
                          {new Date(job.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm">{job.jobType}</Badge>
                      <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">{job.experienceLevel} exp</Badge>
                      {job.salary && (
                        <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
                          <DollarSign className="w-3 h-3 mr-1" />₹{job.salary}
                        </Badge>
                      )}
                    </div>
                    
                    {job.applications?.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 font-medium">Popularity</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${
                                i < Math.min(5, Math.ceil((job.applications?.length || 0) / 2)) 
                                  ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`} />
                            ))}
                            <span className="ml-2 text-xs text-gray-500 font-medium">({job.applications?.length})</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Job Applications Analytics Graph ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-10 mb-8">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-800">Job Applications Analytics</h2>
              <p className="text-sm text-gray-500">Visual insights across all job postings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Area Chart — Monthly Job Postings */}
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 px-6 py-4">
                  <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    Monthly Job Postings Trend
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={(() => {
                      const map = {};
                      jobs.forEach(j => {
                        if (j.createdAt) {
                          const m = new Date(j.createdAt).toLocaleString('default', { month: 'short' });
                          map[m] = (map[m] || 0) + 1;
                        }
                      });
                      return Object.entries(map).map(([month, count]) => ({ month, count }));
                    })()}>
                      <defs>
                        <linearGradient id="jobAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3}
                        fill="url(#jobAreaGrad)" dot={{ fill: '#10b981', r: 5, strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8 }} name="Jobs Posted" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pie — Job Type Distribution */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden h-full">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100 px-6 py-4">
                  <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                    <Target className="w-5 h-5 text-blue-600" />
                    Job Type Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={(() => {
                          const map = {};
                          jobs.forEach(j => { if (j.jobType) map[j.jobType] = (map[j.jobType] || 0) + 1; });
                          return Object.entries(map).map(([name, value]) => ({ name, value }));
                        })()}
                        cx="50%" cy="50%" innerRadius={45} outerRadius={75}
                        dataKey="value" paddingAngle={4}>
                        {jobs.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-2 w-full mt-2">
                    {(() => {
                      const map = {};
                      jobs.forEach(j => { if (j.jobType) map[j.jobType] = (map[j.jobType] || 0) + 1; });
                      return Object.entries(map).map(([name, value], i) => (
                        <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl"
                          style={{ backgroundColor: `${COLORS[i % COLORS.length]}18` }}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                            <span className="text-sm font-semibold text-gray-700">{name}</span>
                          </div>
                          <span className="text-sm font-black" style={{ color: COLORS[i % COLORS.length] }}>{value}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bar Chart — Top Jobs by Applications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 px-6 py-4">
                <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                  <Activity className="w-5 h-5 text-purple-600" />
                  Job Applications Analytics Graph
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={[...jobs]
                      .sort((a, b) => (b.applications?.length || 0) - (a.applications?.length || 0))
                      .slice(0, 8)
                      .map(j => ({
                        name: j.title?.length > 14 ? j.title.slice(0, 14) + '..' : (j.title || 'N/A'),
                        applications: j.applications?.length || 0,
                        company: j.company?.name || '',
                      }))}
                    barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
                    <Bar dataKey="applications" radius={[8, 8, 0, 0]} name="Applications" maxBarSize={44}>
                      {jobs.slice(0, 8).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Enhanced Empty State */}
        {filteredJobs.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center shadow-xl">
              <Briefcase size={64} className="text-emerald-600" />
            </div>
            <h3 className="text-3xl font-black text-gray-700 mb-3">No jobs found</h3>
            <p className="text-gray-500 text-lg mb-6">Try adjusting your search criteria or create a new job posting</p>
            <Button onClick={() => navigate('/admin/jobs/create')}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg h-12 px-8">
              <Plus className="w-5 h-5 mr-2" />Create First Job
            </Button>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAllJobs;