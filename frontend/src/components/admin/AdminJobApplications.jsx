import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Search, Users, Building2, TrendingUp, CheckCircle, Mail, Clock } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';

const STATUS_STYLES = {
  pending:  'bg-amber-100 text-amber-700',
  accepted: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-600',
};

const AdminJobApplications = () => {
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

  const accepted = applications.filter(a => a.status === 'accepted').length;
  const pending  = applications.filter(a => a.status === 'pending').length;
  const rejected = applications.filter(a => a.status === 'rejected').length;
  const uniqueUsers = new Set(applications.map(a => a.applicant?._id)).size;

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600" />
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-16 -mb-16" />
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
                <Briefcase className="h-9 w-9 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Job Applications</h1>
                <p className="text-green-200">All users who applied for jobs</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{applications.length} Total</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{uniqueUsers} Applicants</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{accepted} Accepted</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{pending} Pending</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Total Applications', value: applications.length, icon: Briefcase, g: 'from-emerald-500 to-green-600', bg: 'from-emerald-50 to-green-50', border: 'border-emerald-100' },
            { title: 'Unique Applicants', value: uniqueUsers, icon: Users, g: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50', border: 'border-blue-100' },
            { title: 'Accepted', value: accepted, icon: CheckCircle, g: 'from-teal-500 to-emerald-600', bg: 'from-teal-50 to-emerald-50', border: 'border-teal-100' },
            { title: 'Pending', value: pending, icon: TrendingUp, g: 'from-amber-500 to-orange-500', bg: 'from-amber-50 to-orange-50', border: 'border-amber-100' },
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl bg-gray-50 focus:bg-white transition-all"
              placeholder="Search by name, email, job, company..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'accepted', 'rejected'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border capitalize ${
                  statusFilter === s
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                }`}>
                {s === 'all' ? `All (${applications.length})` : `${s} (${applications.filter(a => a.status === s).length})`}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applicant</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Job Title</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applied On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((a, i) => (
                    <motion.tr key={a._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.02 * i }}
                      className="hover:bg-emerald-50/40 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-400 font-medium">{i + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm flex-shrink-0">
                            <span className="text-white font-black text-sm">
                              {a.applicant?.fullname?.charAt(0)?.toUpperCase() || '?'}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">{a.applicant?.fullname || '—'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          {a.applicant?.email || '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 text-sm">{a.job?.title || '—'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {a.job?.company?.logo ? (
                            <img src={a.job.company.logo} alt="" className="w-6 h-6 rounded-lg object-cover" />
                          ) : (
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                              <Building2 className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <span className="text-sm text-gray-600 font-medium">{a.job?.company?.name || '—'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`text-xs font-bold capitalize ${STATUS_STYLES[a.status] || 'bg-gray-100 text-gray-600'}`}>
                          {a.status || 'pending'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-400">
                        {new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center shadow-xl">
                    <Briefcase size={44} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-700 mb-2">No applications found</h3>
                  <p className="text-gray-400">No applications match your search</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {filtered.length > 0 && (
          <p className="text-center text-sm text-gray-400 mt-6">
            Showing <span className="font-bold text-gray-600">{filtered.length}</span> of{' '}
            <span className="font-bold text-gray-600">{applications.length}</span> applications
          </p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminJobApplications;
