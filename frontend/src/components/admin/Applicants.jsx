import React, { useEffect } from 'react';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Users, Briefcase, CheckCircle2, XCircle, Clock, ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminLayout from './AdminLayout';

const APPLICATION_API = import.meta.env.VITE_APPLICATION_API || 'http://localhost:8000/api/v1/application';

const Applicants = () => {
  const params   = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applicants } = useSelector(s => s.application);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API}/${params.id}/applicants`, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
      } catch (err) { console.log(err); }
    };
    fetch();
  }, [params.id]);

  const apps     = applicants?.applications || [];
  const accepted = apps.filter(a => a.status === 'accepted').length;
  const rejected = apps.filter(a => a.status === 'rejected').length;
  const pending  = apps.filter(a => !a.status || a.status === 'pending').length;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">

        {/* ── Hero Banner ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl p-8 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)' }}>

            {/* BG circles */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #fff, transparent)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #fff, transparent)', transform: 'translate(-30%, 30%)' }} />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                  <Users className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-white mb-1">Job Applicants</h1>
                  <p className="text-purple-200 text-sm">Review candidates and send decisions via email</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                      {apps.length} Total
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                      style={{ background: 'rgba(52,211,153,0.25)', color: '#6ee7b7' }}>
                      <CheckCircle2 size={11} /> {accepted} Accepted
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                      style={{ background: 'rgba(239,68,68,0.25)', color: '#fca5a5' }}>
                      <XCircle size={11} /> {rejected} Rejected
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                      style={{ background: 'rgba(251,191,36,0.25)', color: '#fde68a' }}>
                      <Clock size={11} /> {pending} Pending
                    </span>
                  </div>
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>
                <ArrowLeft size={16} /> Back
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── Email notice ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl mb-6 text-sm font-medium"
          style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb' }}>
          <Mail size={16} className="flex-shrink-0" />
          Accepting or rejecting an applicant automatically sends them an email notification.
        </motion.div>

        {/* ── Table Card ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
          style={{ border: '1px solid #f1f5f9' }}>
          <ApplicantsTable />
        </motion.div>

      </div>
    </AdminLayout>
  );
};

export default Applicants;
