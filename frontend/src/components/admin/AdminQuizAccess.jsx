import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, Users, Trophy, TrendingUp, Clock, Mail, Star } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';

const AdminQuizAccess = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const QUIZ_RESULT_API = import.meta.env.VITE_USER_API?.replace('/user', '/quiz-result') || 'http://localhost:8000/api/v1/quiz-result';

  useEffect(() => {
    axios.get(`${QUIZ_RESULT_API}/all`, { withCredentials: true })
      .then(r => setResults(r.data.results || []))
      .catch(() => toast.error('Failed to fetch quiz results'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = results.filter(r =>
    r.user?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
    r.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
    r.quiz?.title?.toLowerCase().includes(search.toLowerCase()) ||
    r.quiz?.category?.toLowerCase().includes(search.toLowerCase())
  );

  const avgPercent = results.length
    ? Math.round(results.reduce((s, r) => s + (r.percentage || 0), 0) / results.length)
    : 0;
  const passed = results.filter(r => r.percentage >= 50).length;
  const uniqueUsers = new Set(results.map(r => r.user?._id)).size;

  const getScoreColor = (pct) => {
    if (pct >= 80) return { badge: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500' };
    if (pct >= 50) return { badge: 'bg-amber-100 text-amber-700', bar: 'bg-amber-500' };
    return { badge: 'bg-red-100 text-red-600', bar: 'bg-red-500' };
  };

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600" />
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-16 -mb-16" />
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
                <Brain className="h-9 w-9 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Quiz Access</h1>
                <p className="text-purple-200">All users who attempted quizzes</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{results.length} Attempts</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{uniqueUsers} Users</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{avgPercent}% Avg Score</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{passed} Passed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Total Attempts', value: results.length, icon: Brain, g: 'from-violet-500 to-purple-600', bg: 'from-violet-50 to-purple-50', border: 'border-violet-100' },
            { title: 'Unique Users', value: uniqueUsers, icon: Users, g: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50', border: 'border-blue-100' },
            { title: 'Passed (≥50%)', value: passed, icon: Trophy, g: 'from-emerald-500 to-green-600', bg: 'from-emerald-50 to-green-50', border: 'border-emerald-100' },
            { title: 'Avg Score', value: `${avgPercent}%`, icon: TrendingUp, g: 'from-amber-500 to-orange-500', bg: 'from-amber-50 to-orange-50', border: 'border-amber-100' },
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

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl bg-gray-50 focus:bg-white transition-all"
              placeholder="Search by name, email, quiz..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-purple-100">
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Quiz</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Result</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((r, i) => {
                    const colors = getScoreColor(r.percentage);
                    return (
                      <motion.tr key={r._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.02 * i }}
                        className="hover:bg-purple-50/40 transition-colors group">
                        <td className="px-6 py-4 text-sm text-gray-400 font-medium">{i + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm flex-shrink-0">
                              <span className="text-white font-black text-sm">
                                {r.user?.fullname?.charAt(0)?.toUpperCase() || '?'}
                              </span>
                            </div>
                            <span className="font-semibold text-gray-800 text-sm">{r.user?.fullname || '—'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            {r.user?.email || '—'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-800 text-sm">{r.quiz?.title || '—'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50 text-xs">
                            {r.quiz?.category || '—'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${colors.bar}`}
                                style={{ width: `${r.percentage}%` }} />
                            </div>
                            <span className="text-sm font-bold text-gray-700">
                              {r.score}/{r.totalMarks}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`text-xs font-bold ${colors.badge}`}>
                            {r.percentage}% {r.percentage >= 50 ? '✓' : '✗'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-3.5 h-3.5" />
                            {r.timeTaken ? `${r.timeTaken}m` : '—'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-400">
                          {new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-100 to-purple-200 flex items-center justify-center shadow-xl">
                    <Brain size={44} className="text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-700 mb-2">No results found</h3>
                  <p className="text-gray-400">No quiz attempts match your search</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {filtered.length > 0 && (
          <p className="text-center text-sm text-gray-400 mt-6">
            Showing <span className="font-bold text-gray-600">{filtered.length}</span> of{' '}
            <span className="font-bold text-gray-600">{results.length}</span> results
          </p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminQuizAccess;
