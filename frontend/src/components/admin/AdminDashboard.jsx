import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain, Briefcase, TrendingUp, Users, ArrowRight,
  GraduationCap, FileText, FileSearch, Crown,
  CheckCircle, Clock, XCircle, Award, BarChart3
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const QUIZ_API       = import.meta.env.VITE_USER_API?.replace('/user', '/quiz')       || 'http://localhost:8000/api/v1/quiz';
const JOB_API        = import.meta.env.VITE_JOB_API                                   || 'http://localhost:8000/api/v1/job';
const INTERNSHIP_API = import.meta.env.VITE_USER_API?.replace('/user', '/internship') || 'http://localhost:8000/api/v1/internship';
const ATS_API        = import.meta.env.VITE_USER_API?.replace('/user', '/ats')        || 'http://localhost:8000/api/v1/ats';
const RESUME_API     = import.meta.env.VITE_USER_API?.replace('/user', '/resumes')     || 'http://localhost:8000/api/v1/resumes';

/* ── Mini stat pill ─────────────────────────────────────────── */
const Pill = ({ label, value, color }) => (
  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${color}22`, color }}>
    {label}: {value}
  </span>
);

/* ── Stat card ──────────────────────────────────────────────── */
const StatCard = ({ title, value, sub, icon: Icon, color, glow, path, navigate, delay }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    whileHover={{ y: -6, scale: 1.02 }} onClick={() => navigate(path)} className="cursor-pointer">
    <div className="relative overflow-hidden rounded-3xl p-5 border transition-all"
      style={{ background: 'rgba(255,255,255,0.04)', borderColor: `${color}30` }}>
      {/* glow blob */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20"
        style={{ background: color }} />
      <div className="relative">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
          style={{ background: `${color}22`, boxShadow: `0 0 16px ${glow}` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <p className="text-xs font-semibold mb-1 text-white">{title}</p>
        <p className="text-3xl font-black text-white mb-1">{value}</p>
        {sub && <p className="text-xs text-white/70">{sub}</p>}
        <div className="flex items-center gap-1 mt-3" style={{ color }}>
          <span className="text-xs font-semibold">View all</span>
          <ArrowRight size={12} />
        </div>
      </div>
    </div>
  </motion.div>
);

/* ── Section card ───────────────────────────────────────────── */
const Section = ({ title, icon: Icon, color, children, path, navigate, delay }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className="rounded-3xl border overflow-hidden"
    style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}>
    <div className="flex items-center justify-between px-5 py-4 border-b"
      style={{ borderColor: 'rgba(255,255,255,0.06)', background: `${color}0d` }}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: `${color}22` }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span className="text-sm font-bold text-white">{title}</span>
      </div>
      <button onClick={() => navigate(path)}
        className="flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-80"
        style={{ color }}>
        See all <ArrowRight size={11} />
      </button>
    </div>
    <div className="p-4">{children}</div>
  </motion.div>
);

/* ── Row item ───────────────────────────────────────────────── */
const RowItem = ({ left, right, sub, badge, badgeColor, onClick }) => (
  <div onClick={onClick}
    className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-white truncate">{left}</p>
      {sub && <p className="text-xs truncate mt-0.5 text-white/60">{sub}</p>}
    </div>
    {badge && (
      <span className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ml-3"
        style={{ background: `${badgeColor}22`, color: badgeColor }}>{badge}</span>
    )}
    {right && <span className="text-xs flex-shrink-0 ml-3 text-white/60">{right}</span>}
  </div>
);

/* ── Main ───────────────────────────────────────────────────── */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector(s => s.auth);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [quizRes, jobRes, internRes, atsRes, resumeRes] = await Promise.allSettled([
          axios.get(`${QUIZ_API}/all`),
          axios.get(`${JOB_API}/getadminjobs`, { withCredentials: true }),
          axios.get(`${INTERNSHIP_API}/all`, { withCredentials: true }),
          axios.get(`${ATS_API}/all`, { withCredentials: true }),
          axios.get(RESUME_API, { withCredentials: true }),
        ]);

        setData({
          quizzes:      quizRes.status      === 'fulfilled' ? quizRes.value.data.quizzes       || [] : [],
          jobs:         jobRes.status       === 'fulfilled' ? jobRes.value.data.jobs            || [] : [],
          internships:  internRes.status    === 'fulfilled' ? internRes.value.data.data         || [] : [],
          ats:          atsRes.status       === 'fulfilled' ? atsRes.value.data.records         || [] : [],
          resumes:      resumeRes.status    === 'fulfilled' ? resumeRes.value.data.data         || [] : [],
        });
      } catch { toast.error('Failed to load dashboard'); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)' }}>
          <Crown size={24} className="text-white" />
        </div>
      </div>
    </AdminLayout>
  );

  const { quizzes, jobs, internships, ats, resumes } = data;

  // derived
  const totalApplicants  = jobs.reduce((s, j) => s + (j.applications?.length || 0), 0);
  const internAccepted   = internships.filter(i => i.status === 'accepted').length;
  const internPending    = internships.filter(i => i.status === 'pending').length;
  const avgATS           = ats.length ? Math.round(ats.reduce((s, r) => s + r.score, 0) / ats.length) : 0;
  const atsHigh          = ats.filter(r => r.score >= 75).length;

  const statCards = [
    { title: 'Total Quizzes',    value: quizzes.length,      sub: `${quizzes.filter(q => q.questions?.length > 0).length} with questions`, icon: Brain,        color: '#fb923c', glow: 'rgba(251,146,60,0.4)',  path: '/admin/all-quizzes' },
    { title: 'Total Jobs',       value: jobs.length,         sub: `${totalApplicants} applicants`,                                          icon: Briefcase,    color: '#2dd4bf', glow: 'rgba(45,212,191,0.4)',  path: '/admin/jobs' },
    { title: 'Internships',      value: internships.length,  sub: `${internPending} pending`,                                               icon: GraduationCap,color: '#facc15', glow: 'rgba(250,204,21,0.4)',  path: '/admin/internships' },
    { title: 'ATS Checks',       value: ats.length,          sub: `Avg score: ${avgATS}%`,                                                  icon: FileSearch,   color: '#f87171', glow: 'rgba(248,113,113,0.4)', path: '/admin/ats' },
    { title: 'Resumes Built',    value: resumes.length,      sub: `${new Set(resumes.map(r => r.user?._id)).size} unique users`,            icon: FileText,     color: '#4ade80', glow: 'rgba(74,222,128,0.4)',  path: '/admin/resumes' },
  ];

  const statusColor = s => s === 'accepted' ? '#22c55e' : s === 'rejected' ? '#ef4444' : '#f59e0b';

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Hero ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative overflow-hidden rounded-3xl p-8 shadow-2xl"
            style={{ background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e1b4b 100%)', border: '1px solid rgba(124,58,237,0.3)' }}>
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle,#7c3aed,transparent)', transform: 'translate(30%,-30%)' }} />
            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
                  <Crown size={28} className="text-white" />
                </div>
                <div>
                  <p className="text-indigo-300 text-sm font-medium mb-1">Welcome back</p>
                  <h1 className="text-3xl font-black text-white mb-1">{user?.fullname || 'Admin'} 👋</h1>
                  <p className="text-indigo-300 text-sm">Here's what's happening on your platform today</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill label="Quizzes" value={quizzes.length} color="#fb923c" />
                <Pill label="Jobs" value={jobs.length} color="#2dd4bf" />
                <Pill label="Resumes" value={resumes.length} color="#4ade80" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map((c, i) => (
            <StatCard key={c.title} {...c} navigate={navigate} delay={0.05 * i} />
          ))}
        </div>

        {/* ── Sections Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Quizzes */}
          <Section title="Recent Quizzes" icon={Brain} color="#fb923c" path="/admin/all-quizzes" navigate={navigate} delay={0.2}>
            {quizzes.length === 0
              ? <p className="text-sm text-center py-6 text-white/50">No quizzes yet</p>
              : quizzes.slice(0, 5).map(q => (
                <RowItem key={q._id} left={q.title} sub={`${q.category} · ${q.level}`}
                  badge={`${q.questions?.length || 0} Qs`} badgeColor="#fb923c"
                  onClick={() => navigate(`/admin/quizzes/edit/${q._id}`)} />
              ))
            }
          </Section>

          {/* Jobs */}
          <Section title="Recent Jobs" icon={Briefcase} color="#2dd4bf" path="/admin/jobs" navigate={navigate} delay={0.25}>
            {jobs.length === 0
              ? <p className="text-sm text-center py-6 text-white/50">No jobs yet</p>
              : jobs.slice(0, 5).map(j => (
                <RowItem key={j._id} left={j.title} sub={`${j.jobType} · ${j.location}`}
                  badge={`${j.applications?.length || 0} applied`} badgeColor="#2dd4bf"
                  onClick={() => navigate(`/admin/jobs/${j._id}/applicants`)} />
              ))
            }
          </Section>

          {/* Internships */}
          <Section title="Internship Applications" icon={GraduationCap} color="#facc15" path="/admin/internships" navigate={navigate} delay={0.3}>
            {internships.length === 0
              ? <p className="text-sm text-center py-6 text-white/50">No applications yet</p>
              : internships.slice(0, 5).map(a => (
                <RowItem key={a._id} left={a.fullName} sub={`${a.category} · ${a.college || ''}`}
                  badge={a.status} badgeColor={statusColor(a.status)} />
              ))
            }
            {internships.length > 0 && (
              <div className="flex gap-3 mt-3 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {[['Accepted', internAccepted, '#22c55e'], ['Pending', internPending, '#f59e0b'], ['Rejected', internships.filter(i => i.status === 'rejected').length, '#ef4444']].map(([l, v, c]) => (
                  <div key={l} className="flex-1 text-center p-2 rounded-xl" style={{ background: `${c}11` }}>
                    <p className="text-lg font-black" style={{ color: c }}>{v}</p>
                    <p className="text-xs text-white/60">{l}</p>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* ATS */}
          <Section title="ATS Checker" icon={FileSearch} color="#f87171" path="/admin/ats" navigate={navigate} delay={0.35}>
            {ats.length === 0
              ? <p className="text-sm text-center py-6 text-white/50">No ATS records yet</p>
              : ats.slice(0, 5).map(r => {
                const c = r.score >= 75 ? '#22c55e' : r.score >= 50 ? '#f59e0b' : '#ef4444';
                return (
                  <RowItem key={r._id} left={r.user?.fullname || 'Unknown'} sub={r.user?.email}
                    badge={`${r.score}%`} badgeColor={c} />
                );
              })
            }
            {ats.length > 0 && (
              <div className="flex gap-3 mt-3 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {[['Avg Score', `${avgATS}%`, '#f87171'], ['High (75+)', atsHigh, '#22c55e'], ['Low (<50)', ats.filter(r => r.score < 50).length, '#ef4444']].map(([l, v, c]) => (
                  <div key={l} className="flex-1 text-center p-2 rounded-xl" style={{ background: `${c}11` }}>
                    <p className="text-lg font-black" style={{ color: c }}>{v}</p>
                    <p className="text-xs text-white/60">{l}</p>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Resumes — full width */}
          <div className="lg:col-span-2">
            <Section title="Recent Resumes" icon={FileText} color="#4ade80" path="/admin/resumes" navigate={navigate} delay={0.4}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {resumes.length === 0
                  ? <p className="text-sm text-center py-6 col-span-2 text-white/50">No resumes yet</p>
                  : resumes.slice(0, 6).map(r => {
                    const info = r.personalInfo || {};
                    const skills = Object.values(r.technicalSkills || {}).flat();
                    return (
                      <div key={r._id} onClick={() => navigate(`/resume/${r._id}?admin=true`)}
                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border"
                        style={{ borderColor: 'rgba(74,222,128,0.15)' }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-black"
                          style={{ background: 'linear-gradient(135deg,#ec4899,#8b5cf6)' }}>
                          {info.fullName?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{info.fullName || 'Unnamed'}</p>
                          <p className="text-xs truncate text-white/60">
                            {skills.slice(0, 3).join(', ')}{skills.length > 3 ? ` +${skills.length - 3}` : ''}
                          </p>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </Section>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
