import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Bookmark, Search, MapPin, Building2, DollarSign,
  Clock, Briefcase, Trash2, ExternalLink, Filter, Star
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';

const SAVED_API = 'http://localhost:8000/api/v1/saved-jobs';

const AdminSaved = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [removing, setRemoving]   = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchSaved(); }, []);

  const fetchSaved = async () => {
    try {
      const res = await axios.get(`${SAVED_API}/user`, { withCredentials: true });
      setSavedJobs(res.data.savedJobs || []);
    } catch {
      toast.error('Failed to load saved jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (jobId, e) => {
    e.stopPropagation();
    setRemoving(jobId);
    setSavedJobs(prev => prev.filter(s => s.job?._id !== jobId));
    try {
      await axios.delete(`${SAVED_API}/unsave/${jobId}`, { withCredentials: true });
      toast.success('Job removed from saved');
    } catch {
      toast.error('Failed to remove');
      fetchSaved();
    } finally {
      setRemoving(null);
    }
  };

  const filtered = savedJobs.filter(s =>
    s.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
    s.job?.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.job?.location?.toLowerCase().includes(search.toLowerCase())
  );

  const COLORS = ['from-violet-500 to-purple-600', 'from-blue-500 to-cyan-500', 'from-emerald-500 to-green-600',
    'from-orange-500 to-red-500', 'from-pink-500 to-rose-500', 'from-teal-500 to-cyan-600'];

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl animate-pulse">
            <Bookmark className="w-10 h-10 text-white" />
          </div>
          <p className="text-gray-500 font-semibold text-lg">Loading Saved Items...</p>
        </div>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">

        {/* ── Hero Banner ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-16 -mb-16" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
                  <Bookmark className="h-9 w-9 text-white fill-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Saved Items</h1>
                  <p className="text-orange-100">Your bookmarked jobs & opportunities</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{savedJobs.length} Saved Jobs</span>
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{filtered.length} Showing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stat Cards ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Saved',   value: savedJobs.length, g: 'from-amber-500 to-orange-500',   bg: 'from-amber-50 to-orange-50',   border: 'border-amber-100' },
            { label: 'Full-time',     value: savedJobs.filter(s => s.job?.jobType?.toLowerCase().includes('full')).length, g: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50', border: 'border-blue-100' },
            { label: 'Remote',        value: savedJobs.filter(s => s.job?.location?.toLowerCase().includes('remote')).length, g: 'from-emerald-500 to-green-500', bg: 'from-emerald-50 to-green-50', border: 'border-emerald-100' },
            { label: 'Companies',     value: new Set(savedJobs.map(s => s.job?.company?._id)).size, g: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50', border: 'border-purple-100' },
          ].map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i }} whileHover={{ y: -4, scale: 1.04 }}>
              <Card className={`border ${c.border} shadow-md bg-gradient-to-br ${c.bg} overflow-hidden`}>
                <CardContent className="p-4">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.g} flex items-center justify-center shadow-md mb-3`}>
                    <Bookmark className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-1">{c.label}</p>
                  <p className="text-2xl font-black text-gray-800">{c.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Search ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl bg-gray-50 focus:bg-white transition-all"
                    placeholder="Search saved jobs..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <Button variant="outline" className="h-12 px-4 border-2 border-gray-200 hover:border-amber-500 rounded-xl">
                  <Filter className="w-4 h-4 mr-2" />Filter
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Jobs Grid ── */}
        <AnimatePresence>
          {filtered.length > 0 ? (
            <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((saved, index) => {
                const job = saved.job;
                if (!job) return null;
                const grad = COLORS[index % COLORS.length];
                return (
                  <motion.div key={saved._id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: 0.05 * index }}
                    whileHover={{ y: -8, scale: 1.02 }}>
                    <Card className="hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden group cursor-pointer"
                      onClick={() => navigate(`/description/${job._id}`)}>
                      <div className={`h-1.5 bg-gradient-to-r ${grad} group-hover:h-2 transition-all`} />
                      <CardContent className="p-6">

                        {/* Top Row */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-xl text-gray-900 truncate mb-1 group-hover:text-amber-600 transition-colors">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                              <p className="text-sm text-gray-500 truncate font-medium">{job.company?.name}</p>
                            </div>
                          </div>
                          {job.company?.logo ? (
                            <img src={job.company.logo} alt={job.company.name}
                              className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white ml-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          ) : (
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-lg ml-3 flex-shrink-0`}>
                              <Building2 className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-sm flex-shrink-0">
                              <MapPin className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] text-blue-600 font-semibold">Location</p>
                              <p className="text-xs text-gray-800 truncate font-medium">{job.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-sm flex-shrink-0">
                              <DollarSign className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] text-emerald-600 font-semibold">Salary</p>
                              <p className="text-xs text-gray-800 font-medium">₹{job.salary || 'N/A'}</p>
                            </div>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={`bg-gradient-to-r ${grad} text-white shadow-sm text-xs`}>{job.jobType}</Badge>
                          <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 text-xs">{job.experienceLevel} exp</Badge>
                          <Badge variant="outline" className="border-gray-200 text-gray-600 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(saved.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </Badge>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                          <Button size="sm" onClick={e => { e.stopPropagation(); navigate(`/description/${job._id}`); }}
                            className={`flex-1 h-9 bg-gradient-to-r ${grad} text-white shadow-sm hover:shadow-md text-xs font-semibold`}>
                            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />View Job
                          </Button>
                          <Button size="sm" variant="outline"
                            onClick={e => handleUnsave(job._id, e)}
                            disabled={removing === job._id}
                            className="h-9 px-3 border-2 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400 rounded-xl">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center shadow-xl">
                <Bookmark size={64} className="text-amber-500" />
              </div>
              <h3 className="text-3xl font-black text-gray-700 mb-3">
                {search ? 'No results found' : 'No saved jobs yet'}
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                {search ? 'Try a different search term' : 'Jobs you save will appear here'}
              </p>
              {!search && (
                <Button onClick={() => navigate('/admin/all-jobs')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg h-12 px-8">
                  <Briefcase className="w-5 h-5 mr-2" />Browse Jobs
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AdminLayout>
  );
};

export default AdminSaved;
