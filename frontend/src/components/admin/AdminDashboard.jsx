import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Building2, Briefcase, Brain, TrendingUp, Users, Eye, Plus, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    quizzes: { total: 0, recent: [] },
    companies: { total: 0, recent: [] },
    jobs: { total: 0, recent: [] }
  });
  const [loading, setLoading] = useState(true);

  const COMPANY_API = import.meta.env.VITE_COMPANY_API || 'http://localhost:8000/api/v1/company';
  const JOB_API = import.meta.env.VITE_JOB_API || 'http://localhost:8000/api/v1/job';
  const QUIZ_API = `${import.meta.env.VITE_USER_API?.replace('/user', '/quiz') || 'http://localhost:8000/api/v1/quiz'}`;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [quizzesRes, companiesRes, jobsRes] = await Promise.all([
        axios.get(`${QUIZ_API}/all`),
        axios.get(`${COMPANY_API}/get`, { withCredentials: true }),
        axios.get(`${JOB_API}/getadminjobs`, { withCredentials: true })
      ]);

      setStats({
        quizzes: {
          total: quizzesRes.data.quizzes?.length || 0,
          recent: quizzesRes.data.quizzes?.slice(0, 3) || []
        },
        companies: {
          total: companiesRes.data.companies?.length || 0,
          recent: companiesRes.data.companies?.slice(0, 3) || []
        },
        jobs: {
          total: jobsRes.data.jobs?.length || 0,
          recent: jobsRes.data.jobs?.slice(0, 3) || []
        }
      });
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Quizzes',
      value: stats.quizzes.total,
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      route: '/admin/quizzes'
    },
    {
      title: 'Total Companies',
      value: stats.companies.total,
      icon: Building2,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      route: '/admin/companies'
    },
    {
      title: 'Total Jobs',
      value: stats.jobs.total,
      icon: Briefcase,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      route: '/admin/jobs'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md"
        >
          <IoMdArrowRoundBack size={24} />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage your platform with ease</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className={`relative overflow-hidden border-0 shadow-xl bg-gradient-to-br ${card.bgGradient}`}>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-gray-600 font-semibold mb-1">{card.title}</h3>
                  <p className="text-4xl font-black text-gray-800">{card.value}</p>
                  <Button
                    onClick={() => navigate(card.route)}
                    variant="ghost"
                    className="mt-4 w-full justify-between hover:bg-white/50"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Quizzes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-xl border-2 border-purple-100 h-full">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Recent Quizzes
                  </CardTitle>
                  <Button
                    size="sm"
                    onClick={() => navigate('/admin/quizzes/create')}
                    className="bg-white text-purple-600 hover:bg-purple-50"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {stats.quizzes.recent.length > 0 ? (
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
                      {stats.quizzes.recent.map((quiz) => (
                        <motion.div
                          key={quiz._id}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="p-3 rounded-lg bg-purple-50 border border-purple-200 cursor-pointer min-w-[250px]"
                          onClick={() => navigate(`/admin/quizzes/edit/${quiz._id}`)}
                        >
                          <h4 className="font-bold text-gray-800 mb-1 truncate">{quiz.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="px-2 py-1 bg-purple-200 rounded-full">{quiz.level}</span>
                            <span>{quiz.questions?.length || 0} questions</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No quizzes yet</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Companies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-xl border-2 border-blue-100 h-full">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Recent Companies
                  </CardTitle>
                  <Button
                    size="sm"
                    onClick={() => navigate('/admin/companies/create')}
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {stats.companies.recent.length > 0 ? (
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
                      {stats.companies.recent.map((company) => (
                        <motion.div
                          key={company._id}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="p-3 rounded-lg bg-blue-50 border border-blue-200 cursor-pointer min-w-[250px]"
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                        >
                          <div className="flex items-center gap-3">
                            {company.logo && (
                              <img src={company.logo} alt={company.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-800 truncate">{company.name}</h4>
                              <p className="text-xs text-gray-600 truncate">{company.location}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No companies yet</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Jobs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="shadow-xl border-2 border-green-100 h-full">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Recent Jobs
                  </CardTitle>
                  <Button
                    size="sm"
                    onClick={() => navigate('/admin/jobs/create')}
                    className="bg-white text-green-600 hover:bg-green-50"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {stats.jobs.recent.length > 0 ? (
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
                      {stats.jobs.recent.map((job) => (
                        <motion.div
                          key={job._id}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="p-3 rounded-lg bg-green-50 border border-green-200 cursor-pointer min-w-[250px]"
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        >
                          <h4 className="font-bold text-gray-800 mb-1 truncate">{job.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="px-2 py-1 bg-green-200 rounded-full">{job.jobType}</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {job.applications?.length || 0}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No jobs yet</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600">
            <CardContent className="p-6">
              <h3 className="text-white text-xl font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => navigate('/admin/quizzes/create')}
                  className="bg-white text-purple-600 hover:bg-purple-50 h-12 font-bold"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Quiz
                </Button>
                <Button
                  onClick={() => navigate('/admin/companies/create')}
                  className="bg-white text-blue-600 hover:bg-blue-50 h-12 font-bold"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Company
                </Button>
                <Button
                  onClick={() => navigate('/admin/jobs/create')}
                  className="bg-white text-green-600 hover:bg-green-50 h-12 font-bold"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Post Job
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
