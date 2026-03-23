import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Briefcase, MapPin, Building2, Clock, Search,
  ChevronRight, ExternalLink, BarChart2, Filter,
  BookmarkPlus, TrendingUp, DollarSign, Users,
} from 'lucide-react';

const JOB_API         = import.meta.env.VITE_JOB_API         || 'http://localhost:8000/api/v1/job';
const APPLICATION_API = import.meta.env.VITE_APPLICATION_API || 'http://localhost:8000/api/v1/application';

const f = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const JOB_TYPES = ['All', 'Full Time', 'Part Time', 'Internship', 'Remote', 'Contract'];

export default function JobPage() {
  const navigate = useNavigate();

  const [jobs,     setJobs]     = useState([]);
  const [apps,     setApps]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [filter,   setFilter]   = useState('All');

  useEffect(() => {
    Promise.allSettled([
      axios.get(`${JOB_API}/get`,          { withCredentials: true }),
      axios.get(`${APPLICATION_API}/get`,  { withCredentials: true }),
    ]).then(([j, a]) => {
      setJobs(j.status === 'fulfilled' ? (j.value.data?.jobs || []) : []);
      setApps(a.status === 'fulfilled' ? (a.value.data?.applications || []) : []);
    }).finally(() => setLoading(false));
  }, []);

  const appliedIds = new Set(apps.map(a => a.job?._id || a.job));

  const filtered = jobs.filter(job => {
    const matchSearch =
      !search ||
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
      job.location?.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'All' ||
      job.jobType?.toLowerCase().replace(/_/g, ' ') === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  // Stats
  const remoteCount = jobs.filter(j => j.jobType?.toLowerCase().includes('remote')).length;
  const newCount    = jobs.filter(j => {
    if (!j.createdAt) return false;
    return (Date.now() - new Date(j.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000;
  }).length;

  const STATS = [
    { label: 'Total Jobs',  value: jobs.length,          color: '#2dd4bf', glow: 'rgba(45,212,191,0.4)',  icon: Briefcase   },
    { label: 'Applied',     value: appliedIds.size,      color: '#a78bfa', glow: 'rgba(167,139,250,0.4)', icon: TrendingUp  },
    { label: 'Remote',      value: remoteCount,          color: '#34d399', glow: 'rgba(52,211,153,0.4)',  icon: MapPin      },
    { label: 'New (7d)',    value: newCount,             color: '#f59e0b', glow: 'rgba(245,158,11,0.4)',  icon: Clock       },
  ];

  return (
    <div
      className="min-h-screen p-5 sm:p-8 space-y-7"
      style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)' }}
    >
      {/* Header */}
      <motion.div {...f(0)} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-white">💼 Jobs</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Browse and apply to open positions.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/user/analytics/jobs')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <BarChart2 size={14} /> Analytics
        </motion.button>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label} {...f(0.05 + i * 0.05)}
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}
          >
            <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle,${s.glow},transparent 70%)` }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.color}20`, boxShadow: `0 0 12px ${s.glow}` }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-black text-white">{loading ? '—' : s.value}</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: s.color }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search + Filter */}
      <motion.div {...f(0.22)} className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2.5 flex-1 px-4 py-3 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Search size={16} style={{ color: 'rgba(255,255,255,0.35)' }} className="shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search jobs, companies, locations…"
            className="bg-transparent flex-1 text-sm text-white placeholder-white/30 outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="text-xs font-bold px-2 py-0.5 rounded-lg"
              style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)' }}>
              ✕
            </button>
          )}
        </div>

        {/* Type filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {JOB_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className="px-3 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                background: filter === type ? '#2dd4bf20' : 'rgba(255,255,255,0.05)',
                color:      filter === type ? '#2dd4bf'    : 'rgba(255,255,255,0.5)',
                border:     filter === type ? '1px solid #2dd4bf40' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Job list */}
      <motion.div {...f(0.28)}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-white text-sm">
            {filtered.length} Job{filtered.length !== 1 ? 's' : ''} Found
          </h3>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 rounded-2xl animate-pulse"
                style={{ background: 'rgba(255,255,255,0.04)' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}
          >
            <Briefcase size={36} className="mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.15)' }} />
            <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>
              No jobs found
            </p>
            <button onClick={() => { setSearch(''); setFilter('All'); }}
              className="mt-3 text-xs font-bold px-4 py-2 rounded-xl"
              style={{ background: 'rgba(45,212,191,0.15)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.25)' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((job, i) => {
              const isApplied  = appliedIds.has(job._id);
              const isNew      = job.createdAt && (Date.now() - new Date(job.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000;

              return (
                <motion.div
                  key={job._id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.03 }}
                  className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all group"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(45,212,191,0.06)'; e.currentTarget.style.borderColor = 'rgba(45,212,191,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                  onClick={() => navigate(`/description/${job._id}`)}
                >
                  {/* Company logo / icon */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                    style={{ background: 'rgba(45,212,191,0.12)', border: '1px solid rgba(45,212,191,0.2)' }}>
                    {job.company?.logo
                      ? <img src={job.company.logo} alt="" className="w-full h-full object-cover" />
                      : <Building2 size={20} style={{ color: '#2dd4bf' }} />
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-black text-white truncate">{job.title}</p>
                      {isNew && (
                        <span className="text-xs font-black px-1.5 py-0.5 rounded-md"
                          style={{ background: 'rgba(52,211,153,0.2)', color: '#34d399' }}>NEW</span>
                      )}
                      {isApplied && (
                        <span className="text-xs font-black px-1.5 py-0.5 rounded-md"
                          style={{ background: 'rgba(167,139,250,0.2)', color: '#a78bfa' }}>Applied</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      {job.company?.name && (
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          <Building2 size={11} /> {job.company.name}
                        </span>
                      )}
                      {job.location && (
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          <MapPin size={11} /> {job.location}
                        </span>
                      )}
                      {job.salary && (
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          <DollarSign size={11} /> {job.salary}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: type + arrow */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {job.jobType && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-xl capitalize"
                        style={{ background: 'rgba(45,212,191,0.12)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.2)' }}>
                        {job.jobType.replace(/_/g, ' ')}
                      </span>
                    )}
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.25)' }}
                      className="group-hover:text-teal-400 transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}