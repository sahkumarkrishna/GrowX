import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText, Search, Users, Calendar, Award, Briefcase,
  GraduationCap, Code2, Eye, Trash2, TrendingUp,
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const RESUME_API = import.meta.env.VITE_API_URL?.replace('/api/resumes', '') + '/api/resumes'
  || 'http://localhost:8000/api/resumes';

const AdminResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(RESUME_API, { withCredentials: true })
      .then(r => setResumes(r.data.data || []))
      .catch(() => toast.error('Failed to fetch resumes'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this resume?')) return;
    try {
      await axios.delete(`${RESUME_API}/${id}`, { withCredentials: true });
      setResumes(prev => prev.filter(r => r._id !== id));
      toast.success('Resume deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const filtered = resumes.filter(r =>
    r.personalInfo?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    r.personalInfo?.email?.toLowerCase().includes(search.toLowerCase()) ||
    r.user?.fullname?.toLowerCase().includes(search.toLowerCase())
  );

  const thisMonth = resumes.filter(r =>
    new Date(r.createdAt).getMonth() === new Date().getMonth()
  ).length;

  const totalSkills = resumes.reduce((s, r) => {
    const skills = r.technicalSkills || {};
    return s + Object.values(skills).flat().length;
  }, 0);

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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-16 -mb-16" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
                  <FileText className="h-9 w-9 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Resume Management</h1>
                  <p className="text-purple-200">View & manage all user-built resumes</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{resumes.length} Total</span>
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{thisMonth} This Month</span>
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{totalSkills} Skills Listed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Total Resumes', value: resumes.length, icon: FileText, g: 'from-violet-500 to-purple-600', bg: 'from-violet-50 to-purple-50', border: 'border-violet-100' },
            { title: 'Unique Users', value: new Set(resumes.map(r => r.user?._id)).size, icon: Users, g: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50', border: 'border-blue-100' },
            { title: 'This Month', value: thisMonth, icon: TrendingUp, g: 'from-emerald-500 to-green-600', bg: 'from-emerald-50 to-green-50', border: 'border-emerald-100' },
            { title: 'Total Skills', value: totalSkills, icon: Code2, g: 'from-orange-500 to-red-500', bg: 'from-orange-50 to-red-50', border: 'border-orange-100' },
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

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input className="pl-12 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl bg-gray-50 focus:bg-white transition-all"
                  placeholder="Search by name, email..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-purple-100 text-purple-700">All ({resumes.length})</Badge>
                <Badge variant="outline">This Month ({thisMonth})</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resume Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((resume, index) => {
            const info = resume.personalInfo || {};
            const skills = resume.technicalSkills || {};
            const allSkills = Object.values(skills).flat();
            const expCount = resume.experience?.filter(e => e.company)?.length || 0;
            const eduCount = resume.education?.filter(e => e.institution)?.length || 0;
            const certCount = resume.certifications?.filter(c => c.name)?.length || 0;

            return (
              <motion.div key={resume._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }} whileHover={{ y: -8, scale: 1.02 }}>
                <Card className="hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden group">
                  <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 group-hover:h-2 transition-all" />
                  <CardContent className="p-6">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                          {info.fullName || 'Unnamed'}
                        </h3>
                        {info.title && <p className="text-sm text-purple-600 font-medium truncate">{info.title}</p>}
                        <p className="text-xs text-gray-500 truncate mt-0.5">{info.email}</p>
                        {resume.user?.fullname && (
                          <p className="text-xs text-gray-400 mt-0.5">by {resume.user.fullname}</p>
                        )}
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0 ml-3">
                        <span className="text-white font-black text-lg">
                          {info.fullName?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="flex flex-col items-center p-2 bg-blue-50 rounded-xl border border-blue-100">
                        <Briefcase className="w-4 h-4 text-blue-500 mb-1" />
                        <span className="text-sm font-black text-gray-800">{expCount}</span>
                        <span className="text-[10px] text-gray-500">Exp</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                        <GraduationCap className="w-4 h-4 text-emerald-500 mb-1" />
                        <span className="text-sm font-black text-gray-800">{eduCount}</span>
                        <span className="text-[10px] text-gray-500">Edu</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-amber-50 rounded-xl border border-amber-100">
                        <Award className="w-4 h-4 text-amber-500 mb-1" />
                        <span className="text-sm font-black text-gray-800">{certCount}</span>
                        <span className="text-[10px] text-gray-500">Certs</span>
                      </div>
                    </div>

                    {/* Skills */}
                    {allSkills.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1.5">
                          {allSkills.slice(0, 5).map((s, i) => (
                            <Badge key={i} className="bg-purple-100 text-purple-700 text-xs">{s}</Badge>
                          ))}
                          {allSkills.length > 5 && (
                            <Badge variant="outline" className="text-xs">+{allSkills.length - 5}</Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Date + Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(resume.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline"
                          className="h-8 px-3 border-purple-200 text-purple-600 hover:bg-purple-50"
                          onClick={() => navigate(`/resume/${resume._id}?admin=true`)}>
                          <Eye className="w-3.5 h-3.5 mr-1" />View
                        </Button>
                        <Button size="sm" variant="outline"
                          className="h-8 px-3 border-red-200 text-red-500 hover:bg-red-50"
                          onClick={() => handleDelete(resume._id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-violet-100 to-purple-200 flex items-center justify-center shadow-xl">
              <FileText size={64} className="text-purple-600" />
            </div>
            <h3 className="text-3xl font-black text-gray-700 mb-3">No resumes found</h3>
            <p className="text-gray-500 text-lg">No resumes match your search</p>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminResumes;
