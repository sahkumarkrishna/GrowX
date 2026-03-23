import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import AdminLayout from './AdminLayout';
import {
  Users, CheckCircle, XCircle, Clock, ChevronDown,
  Briefcase, Mail, Phone, FileText, ExternalLink,
} from 'lucide-react';

const APPLICATION_API = import.meta.env.VITE_APPLICATION_API || 'http://localhost:8000/api/v1/application';

const STATUS_OPTIONS = ['pending', 'accepted', 'rejected'];

const STATUS_STYLE = {
  pending:  { bg: 'rgba(245,158,11,0.15)',  text: '#f59e0b', border: 'rgba(245,158,11,0.3)',  icon: Clock,        label: 'Pending'  },
  accepted: { bg: 'rgba(52,211,153,0.15)',  text: '#34d399', border: 'rgba(52,211,153,0.3)',  icon: CheckCircle,  label: 'Accepted' },
  rejected: { bg: 'rgba(239,68,68,0.15)',   text: '#f87171', border: 'rgba(239,68,68,0.3)',   icon: XCircle,      label: 'Rejected' },
};

const f = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: d },
});

export default function Applicants() {
  const { id }     = useParams();   // job id
  const { user }   = useSelector(s => s.auth);
  const [apps,     setApps]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API}/${id}/applicants`, { withCredentials: true });
      setApps(res.data?.application || res.data?.applications || []);
    } catch {
      toast.error('Failed to load applicants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplicants(); }, [id]);

  const updateStatus = async (appId, status) => {
    setUpdating(appId);
    try {
      const res = await axios.post(
        `${APPLICATION_API}/status/${appId}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        setApps(prev => prev.map(a => a._id === appId ? { ...a, status } : a));
        toast.success(`Status updated to ${status}`);
      }
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  const pending  = apps.filter(a => a.status?.toLowerCase() === 'pending').length;
  const accepted = apps.filter(a => a.status?.toLowerCase() === 'accepted').length;
  const rejected = apps.filter(a => a.status?.toLowerCase() === 'rejected').length;

  return (
    <AdminLayout>
      <div className="min-h-screen p-5 sm:p-8 space-y-7"
        style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)' }}>

        {/* Header */}
        <motion.div {...f(0)} className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}>
            <Users size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Applicants</h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {loading ? 'Loading…' : `${apps.length} applicant${apps.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Pending',  value: pending,  color: '#f59e0b', glow: 'rgba(245,158,11,0.4)',  icon: Clock       },
            { label: 'Accepted', value: accepted, color: '#34d399', glow: 'rgba(52,211,153,0.4)',  icon: CheckCircle },
            { label: 'Rejected', value: rejected, color: '#f87171', glow: 'rgba(239,68,68,0.4)',   icon: XCircle     },
          ].map((s, i) => (
            <motion.div key={s.label} {...f(0.06 + i * 0.05)}
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
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

        {/* Table */}
        <motion.div {...f(0.2)} className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Table header */}
          <div className="px-5 py-4 border-b grid grid-cols-12 gap-3 text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
            <span className="col-span-3">Applicant</span>
            <span className="col-span-3">Contact</span>
            <span className="col-span-2">Applied</span>
            <span className="col-span-2">Resume</span>
            <span className="col-span-2">Status</span>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="p-4 space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-16 rounded-xl animate-pulse"
                  style={{ background: 'rgba(255,255,255,0.04)' }} />
              ))}
            </div>
          ) : apps.length === 0 ? (
            <div className="text-center py-16">
              <Users size={36} className="mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.15)' }} />
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No applicants yet</p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              {apps.map((app, i) => {
                const st    = STATUS_STYLE[app.status?.toLowerCase()] || STATUS_STYLE.pending;
                const StIcon = st.icon;

                return (
                  <motion.div key={app._id || i}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + i * 0.04 }}
                    className="px-5 py-4 grid grid-cols-12 gap-3 items-center transition-colors"
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                    {/* Applicant */}
                    <div className="col-span-3 flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                                      text-sm font-black text-white"
                        style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)' }}>
                        {app.applicant?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                          {app.applicant?.fullname || 'Unknown'}
                        </p>
                        <p className="text-xs truncate capitalize"
                          style={{ color: 'rgba(255,255,255,0.35)' }}>
                          {app.applicant?.role || 'student'}
                        </p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="col-span-3 space-y-0.5 min-w-0">
                      {app.applicant?.email && (
                        <p className="flex items-center gap-1.5 text-xs truncate"
                          style={{ color: 'rgba(255,255,255,0.45)' }}>
                          <Mail size={11} className="shrink-0" />
                          {app.applicant.email}
                        </p>
                      )}
                      {app.applicant?.phoneNumber && (
                        <p className="flex items-center gap-1.5 text-xs"
                          style={{ color: 'rgba(255,255,255,0.45)' }}>
                          <Phone size={11} className="shrink-0" />
                          {app.applicant.phoneNumber}
                        </p>
                      )}
                    </div>

                    {/* Date */}
                    <div className="col-span-2">
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {app.createdAt
                          ? new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                          : '—'}
                      </p>
                    </div>

                    {/* Resume */}
                    <div className="col-span-2">
                      {app.applicant?.profile?.resume ? (
                        <a href={app.applicant.profile.resume} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
                          style={{ color: '#60a5fa' }}>
                          <FileText size={13} />
                          View
                          <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>No resume</span>
                      )}
                    </div>

                    {/* Status dropdown */}
                    <div className="col-span-2">
                      <div className="relative">
                        <select
                          value={app.status?.toLowerCase() || 'pending'}
                          disabled={updating === app._id}
                          onChange={e => updateStatus(app._id, e.target.value)}
                          className="w-full text-xs font-bold px-2.5 py-1.5 rounded-xl
                                     appearance-none cursor-pointer outline-none transition-all
                                     disabled:opacity-50"
                          style={{
                            background: st.bg,
                            color:      st.text,
                            border:     `1px solid ${st.border}`,
                          }}>
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}
                              style={{ background: '#0f172a', color: '#fff' }}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                          style={{ color: st.text }} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}