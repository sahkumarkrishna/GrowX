import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FileText, Plus, ExternalLink, Edit3, BarChart2, CheckCircle } from 'lucide-react';

const USER_API = import.meta.env.VITE_USER_API || 'http://localhost:8000/api/v1/user';
const f = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } });

export default function ResumePage() {
  const navigate = useNavigate();
  const { user } = useSelector(s => s.auth);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${USER_API}/resumes`, { withCredentials: true })
      .then(r => setResumes(r.data?.resumes || []))
      .catch(() => {
        if (user?.profile?.resume) {
          setResumes([{ _id: '1', name: user.profile.resumeOriginalName || 'My Resume', url: user.profile.resume, createdAt: user.updatedAt }]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const total = resumes.length || (user?.profile?.resume ? 1 : 0);

  const quickLinks = [
    { label: 'Resume Templates', sub: 'Choose a professional template', route: '/resume-templates', color: '#059669', glow: 'rgba(5,150,105,0.4)', icon: FileText },
    { label: 'ATS Resume Check', sub: 'Check your ATS compatibility',   route: '/user/ats',         color: '#dc2626', glow: 'rgba(220,38,38,0.4)',  icon: CheckCircle },
    { label: 'Resume Builder',   sub: 'Build from scratch',             route: '/resume-builder',   color: '#7c3aed', glow: 'rgba(124,58,237,0.4)', icon: Edit3       },
    { label: 'Resume Analytics', sub: 'View resume insights',           route: '/user/analytics/resume', color: '#2563eb', glow: 'rgba(37,99,235,0.4)', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen p-5 sm:p-8 space-y-7"
      style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)' }}>

      <motion.div {...f(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">📄 My Resumes</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Manage and build your resumes.</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/resume-templates')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#059669,#047857)', boxShadow: '0 4px 15px rgba(5,150,105,0.35)' }}>
          <Plus size={15} /> Create New
        </motion.button>
      </motion.div>

      {/* Count card */}
      <motion.div {...f(0.07)} className="rounded-2xl p-5 flex items-center gap-5 relative overflow-hidden"
        style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.2)' }}>
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(5,150,105,0.25),transparent 70%)' }} />
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(5,150,105,0.2)', border: '1px solid rgba(5,150,105,0.3)', boxShadow: '0 0 20px rgba(5,150,105,0.3)' }}>
          <FileText size={26} style={{ color: '#34d399' }} />
        </div>
        <div>
          <p className="text-4xl font-black text-white">{total}</p>
          <p className="text-sm font-bold" style={{ color: '#34d399' }}>Resume{total !== 1 ? 's' : ''} created</p>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {user?.profile?.resume ? '✓ Resume uploaded to profile' : 'No resume uploaded yet'}
          </p>
        </div>
      </motion.div>

      {/* Resume list */}
      <motion.div {...f(0.15)} className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h3 className="font-black text-white text-sm">Resume Files</h3>
        </div>
        <div className="p-3 space-y-1.5">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
            ))
          ) : total === 0 ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(5,150,105,0.1)', border: '2px dashed rgba(5,150,105,0.3)' }}>
                <FileText size={24} style={{ color: 'rgba(5,150,105,0.5)' }} />
              </div>
              <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>No resumes yet</p>
              <button onClick={() => navigate('/resume-templates')}
                className="px-5 py-2 rounded-xl text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#059669,#047857)' }}>
                Build Your First Resume
              </button>
            </div>
          ) : resumes.map((r, i) => (
            <motion.div key={r._id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.17 + i * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-xl transition-all"
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(5,150,105,0.15)', border: '1px solid rgba(5,150,105,0.25)' }}>
                <FileText size={16} style={{ color: '#34d399' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{r.name || 'Resume'}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : 'Recently created'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {r.url && (
                  <a href={r.url} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-xl transition-colors"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.15)'; e.currentTarget.style.color = '#60a5fa'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}>
                    <ExternalLink size={15} />
                  </a>
                )}
                <button onClick={() => navigate(`/edit-resume/${r._id}`)}
                  className="p-2 rounded-xl transition-colors"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.color = '#a78bfa'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}>
                  <Edit3 size={15} />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Profile resume fallback */}
          {user?.profile?.resume && resumes.length === 0 && !loading && (
            <motion.div {...f(0.2)} className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(5,150,105,0.2)' }}>
                <FileText size={16} style={{ color: '#34d399' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{user.profile.resumeOriginalName || 'Uploaded Resume'}</p>
                <p className="text-xs font-bold" style={{ color: '#34d399' }}>✓ Uploaded to profile</p>
              </div>
              <a href={user.profile.resume} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#059669,#047857)' }}>
                <ExternalLink size={11} /> View
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Quick links grid */}
      <motion.div {...f(0.28)}>
        <h3 className="font-black text-white text-sm mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map((item, i) => (
            <motion.button key={item.label}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.route)}
              className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => { e.currentTarget.style.background = `${item.color}10`; e.currentTarget.style.borderColor = `${item.color}25`; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${item.color}20`, border: `1px solid ${item.color}30`, boxShadow: `0 0 12px ${item.glow}` }}>
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.sub}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}