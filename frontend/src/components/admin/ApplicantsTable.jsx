import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { toast } from 'sonner';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, Mail, FileText, Phone, User, Calendar, Loader2 } from 'lucide-react';

const APPLICATION_API = import.meta.env.VITE_APPLICATION_API || 'http://localhost:8000/api/v1/application';

const statusConfig = {
  accepted: { label: 'Accepted', color: '#059669', bg: '#d1fae5', border: '#a7f3d0', icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: '#dc2626', bg: '#fee2e2', border: '#fca5a5', icon: XCircle },
  pending:  { label: 'Pending',  color: '#d97706', bg: '#fef3c7', border: '#fde68a', icon: Clock },
};

const ApplicantsTable = () => {
  const dispatch  = useDispatch();
  const { applicants } = useSelector(s => s.application);
  const [loadingId, setLoadingId] = useState(null); // tracks which app is being updated

  const handleStatus = async (status, applicationId) => {
    setLoadingId(applicationId + status);
    try {
      const res = await axios.post(
        `${APPLICATION_API}/status/${applicationId}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        // optimistic update in redux
        const updated = {
          ...applicants,
          applications: applicants.applications.map(app =>
            app._id === applicationId ? { ...app, status: status.toLowerCase() } : app
          ),
        };
        dispatch(setAllApplicants(updated));
        toast.success(`✅ Status set to ${status} — email sent to applicant`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    } finally {
      setLoadingId(null);
    }
  };

  const apps = applicants?.applications || [];

  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
          <User size={36} className="text-purple-400" />
        </div>
        <p className="text-xl font-bold text-gray-500">No applicants yet</p>
        <p className="text-sm text-gray-400 mt-1">Applications will appear here once users apply</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr style={{ background: 'linear-gradient(135deg, #f5f3ff, #eff6ff)' }}>
            {['Applicant', 'Contact', 'Resume', 'Applied On', 'Status', 'Actions'].map(h => (
              <th key={h} className="px-5 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          <AnimatePresence>
            {apps.map((item, idx) => {
              const status = item.status?.toLowerCase() || 'pending';
              const cfg    = statusConfig[status] || statusConfig.pending;
              const StatusIcon = cfg.icon;
              const isAccepting = loadingId === item._id + 'Accepted';
              const isRejecting = loadingId === item._id + 'Rejected';

              return (
                <motion.tr key={item._id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="hover:bg-purple-50/40 transition-colors group">

                  {/* Applicant */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-sm flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, #7c3aed, #2563eb)` }}>
                        {item.applicant?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{item.applicant?.fullname || '—'}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Mail size={10} /> {item.applicant?.email || '—'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Phone size={13} className="text-gray-400" />
                      {item.applicant?.phoneNumber || '—'}
                    </span>
                  </td>

                  {/* Resume */}
                  <td className="px-5 py-4">
                    {item.applicant?.profile?.resume ? (
                      <a href={item.applicant.profile.resume} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                        style={{ background: '#ede9fe', color: '#7c3aed' }}>
                        <FileText size={12} />
                        {item.applicant.profile.resumeOriginalName?.slice(0, 14) || 'View Resume'}
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-xl">No resume</span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Calendar size={13} className="text-gray-400" />
                      {item.applicant?.createdAt?.split('T')[0] || '—'}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                      <StatusIcon size={12} />
                      {cfg.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    {status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        {/* Accept */}
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          disabled={!!loadingId}
                          onClick={() => handleStatus('Accepted', item._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                          style={{ background: '#d1fae5', color: '#059669', border: '1px solid #a7f3d0' }}>
                          {isAccepting
                            ? <Loader2 size={12} className="animate-spin" />
                            : <CheckCircle2 size={12} />}
                          Accept
                        </motion.button>

                        {/* Reject */}
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          disabled={!!loadingId}
                          onClick={() => handleStatus('Rejected', item._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                          style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' }}>
                          {isRejecting
                            ? <Loader2 size={12} className="animate-spin" />
                            : <XCircle size={12} />}
                          Reject
                        </motion.button>
                      </div>
                    ) : (
                      /* Allow re-decision */
                      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        disabled={!!loadingId}
                        onClick={() => handleStatus(status === 'accepted' ? 'Rejected' : 'Accepted', item._id)}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all disabled:opacity-50"
                        style={{ background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }}>
                        {loadingId === item._id + (status === 'accepted' ? 'Rejected' : 'Accepted')
                          ? <Loader2 size={12} className="animate-spin inline" />
                          : `Change to ${status === 'accepted' ? 'Rejected' : 'Accepted'}`}
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
