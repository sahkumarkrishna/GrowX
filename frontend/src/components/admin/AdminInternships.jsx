import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  GraduationCap, Search, Users, TrendingUp, CheckCircle,
  Clock, Mail, Phone, Trash2, ChevronDown, Building2, Code2,
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';

const STATUS_STYLES = {
  pending:  'bg-amber-100 text-amber-700',
  accepted: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-600',
};

const INTERNSHIP_API = import.meta.env.VITE_USER_API?.replace('/user', '/internship') || 'http://localhost:8000/api/v1/internship';

const AdminInternships = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    axios.get(`${INTERNSHIP_API}/all`, { withCredentials: true })
      .then(r => setApplications(r.data.data || []))
      .catch(() => toast.error('Failed to fetch internship applications'))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`${INTERNSHIP_API}/status/${id}`, { status }, { withCredentials: true });
      setApplications(prev => prev.map(a => a._id === id ? { ...a, status } : a));
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this application?')) return;
    try {
      await axios.delete(`${INTERNSHIP_API}/${id}`, { withCredentials: true });
      setApplications(prev => prev.filter(a => a._id !== id));
      toast.success('Application deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const filtered = applications.filter(a => {
    const matchSearch =
      a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.category?.toLowerCase().includes(search.toLowerCase()) ||
      a.college?.toLowerCase().includes(search.toLowerCase());
    if (statusFilter !== 'all') return matchSearch && a.status === statusFilter;
    return matchSearch;
  });

  const accepted  = applications.filter(a => a.status === 'accepted').length;
  const pending   = applications.filter(a => a.status === 'pending').length;
  const rejected  = applications.filter(a => a.status === 'rejected').length;
  const categories = new Set(applications.map(a => a.category)).size;

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600" />
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-16 -mb-16" />
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
                <GraduationCap className="h-9 w-9 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Internship Applications</h1>
                <p className="text-blue-200">All internship applicants & their details</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{applications.length} Total</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{accepted} Accepted</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{pending} Pending</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{categories} Categories</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Total Applications', value: applications.length, icon: GraduationCap, g: 'from-sky-500 to-blue-600',     bg: 'from-sky-50 to-blue-50',     border: 'border-sky-100' },
            { title: 'Accepted',           value: accepted,            icon: CheckCircle,   g: 'from-emerald-500 to-green-600', bg: 'from-emerald-50 to-green-50', border: 'border-emerald-100' },
            { title: 'Pending',            value: pending,             icon: Clock,         g: 'from-amber-500 to-orange-500',  bg: 'from-amber-50 to-orange-50',  border: 'border-amber-100' },
            { title: 'Categories',         value: categories,          icon: Code2,         g: 'from-violet-500 to-purple-600', bg: 'from-violet-50 to-purple-50', border: 'border-violet-100' },
          ].map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04 * i }} whileHover={{ y: -4, scale: 1.04 }}>
              <Card className={`border ${c.border} shadow-md bg-gradient-to-br ${c.bg}`}>
                <CardContent className="p-4">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.g} flex items-center justify-center shadow-md mb-3`}>
                    <c.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-1">{c.title}</p>
                  <p className="text-xl font-black text-gray-800">{c.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Search + Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-gray-50 focus:bg-white transition-all"
              placeholder="Search by name, email, category..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'accepted', 'rejected'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border capitalize ${
                  statusFilter === s
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                }`}>
                {s === 'all' ? `All (${applications.length})` : `${s} (${applications.filter(a => a.status === s).length})`}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
          {filtered.map((a, i) => (
            <motion.div key={a._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i }}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500" />
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    {/* Left: Avatar + Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-white font-black text-lg">{a.fullName?.charAt(0)?.toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-gray-900 text-lg">{a.fullName}</h3>
                          <Badge className={`text-xs font-bold capitalize ${STATUS_STYLES[a.status]}`}>{a.status}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs text-gray-500"><Mail className="w-3 h-3" />{a.email}</span>
                          <span className="flex items-center gap-1 text-xs text-gray-500"><Phone className="w-3 h-3" />{a.phone}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className="bg-blue-100 text-blue-700 text-xs">{a.category}</Badge>
                          {a.college && <Badge variant="outline" className="text-xs">{a.college}</Badge>}
                          {a.year && <Badge variant="outline" className="text-xs">{a.year}</Badge>}
                          {a.experience && <Badge variant="outline" className="text-xs">{a.experience}</Badge>}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <select value={a.status}
                        onChange={e => handleStatusChange(a._id, e.target.value)}
                        className="border-2 border-gray-200 rounded-xl px-3 py-2 text-xs font-bold bg-white focus:border-blue-500 outline-none cursor-pointer">
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <Button size="sm" variant="outline"
                        className="h-9 w-9 p-0 border-gray-200 hover:border-blue-300"
                        onClick={() => setExpanded(expanded === a._id ? null : a._id)}>
                        <motion.div animate={{ rotate: expanded === a._id ? 180 : 0 }}>
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </Button>
                      <Button size="sm" variant="outline"
                        className="h-9 w-9 p-0 border-red-200 text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(a._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expanded === a._id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                        className="overflow-hidden">
                        <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                          {/* Personal */}
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Personal</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[['Gender', a.gender], ['Phone', a.phone]].map(([l, v]) => v && (
                              <div key={l} className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs text-blue-600 font-bold mb-0.5">{l}</p>
                                <p className="text-sm text-gray-800 font-medium">{v}</p>
                              </div>
                            ))}
                          </div>
                          {/* Academic */}
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Academic</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[['Course', a.course], ['Year', a.year], ['City', a.city], ['State', a.state]].map(([l, v]) => v && (
                              <div key={l} className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                                <p className="text-xs text-purple-600 font-bold mb-0.5">{l}</p>
                                <p className="text-sm text-gray-800 font-medium">{v}</p>
                              </div>
                            ))}
                          </div>
                          {/* Internship */}
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Internship</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[['Duration', a.duration]].map(([l, v]) => v && (
                              <div key={l} className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                <p className="text-xs text-indigo-600 font-bold mb-0.5">{l}</p>
                                <p className="text-sm text-gray-800 font-medium">{v}</p>
                              </div>
                            ))}
                          </div>
                          {/* Links & Resume */}
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Links & Resume</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {a.linkedin && (
                              <div className="p-3 bg-sky-50 rounded-xl border border-sky-100">
                                <p className="text-xs text-sky-600 font-bold mb-0.5">LinkedIn</p>
                                <a href={a.linkedin} target="_blank" rel="noreferrer" className="text-sm text-sky-700 font-medium hover:underline truncate block">{a.linkedin}</a>
                              </div>
                            )}
                            {a.github && (
                              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                                <p className="text-xs text-gray-600 font-bold mb-0.5">GitHub</p>
                                <a href={a.github} target="_blank" rel="noreferrer" className="text-sm text-gray-700 font-medium hover:underline truncate block">{a.github}</a>
                              </div>
                            )}
                            {a.portfolio && (
                              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                <p className="text-xs text-emerald-600 font-bold mb-0.5">Portfolio</p>
                                <a href={a.portfolio} target="_blank" rel="noreferrer" className="text-sm text-emerald-700 font-medium hover:underline truncate block">{a.portfolio}</a>
                              </div>
                            )}
                            {a.resume && (
                              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                                <p className="text-xs text-rose-600 font-bold mb-0.5">Resume</p>
                                <a href={a.resume} target="_blank" rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-sm text-rose-700 font-semibold hover:underline">
                                  📄 View / Download
                                </a>
                              </div>
                            )}
                          </div>
                          {/* Applied On + Message */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                              <p className="text-xs text-orange-600 font-bold mb-0.5">Applied On</p>
                              <p className="text-sm text-gray-800 font-medium">{new Date(a.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            {a.message && (
                              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                                <p className="text-xs text-amber-600 font-bold mb-0.5">Message</p>
                                <p className="text-sm text-gray-700">{a.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center shadow-xl">
              <GraduationCap size={56} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-700 mb-2">No applications found</h3>
            <p className="text-gray-400">No internship applications match your search</p>
          </motion.div>
        )}

        {filtered.length > 0 && (
          <p className="text-center text-sm text-gray-400 mt-8">
            Showing <span className="font-bold text-gray-600">{filtered.length}</span> of{' '}
            <span className="font-bold text-gray-600">{applications.length}</span> applications
          </p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminInternships;
