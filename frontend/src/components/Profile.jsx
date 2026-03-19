import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, FileText, Award, Pen, MapPin,
  Briefcase, User, Calendar, CheckCircle, ExternalLink
} from 'lucide-react';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import UpdateProfileDialog from './UpdateProfileDialog';

const InfoCard = ({ icon: Icon, label, value, color }) => (
  <div className={`flex items-center gap-3 p-4 rounded-2xl border ${color.bg} ${color.border}`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color.icon}`}>
      <Icon size={18} className="text-white" />
    </div>
    <div className="min-w-0">
      <p className={`text-xs font-bold uppercase tracking-wide ${color.label}`}>{label}</p>
      <p className="text-sm font-semibold text-gray-800 truncate">{value || <span className="text-gray-400 font-normal">Not provided</span>}</p>
    </div>
  </div>
);

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center gap-2 mb-5">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <Icon size={15} className="text-white" />
      </div>
      <h3 className="font-black text-gray-800 text-base">{title}</h3>
    </div>
    {children}
  </div>
);

export default function Profile() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(s => s.auth);

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── Hero Card ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

          {/* Cover */}
          <div className="h-36 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 relative">
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
          </div>

          <div className="px-6 sm:px-8 pb-6">
            {/* Avatar + Edit */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <img
                    src={user?.profile?.profilePhoto || 'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'}
                    alt="avatar"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl ring-4 ring-white shadow-xl object-cover"
                  />
                  {user?.isActive !== false && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full ring-2 ring-white" />
                  )}
                </div>
                <div className="mb-1">
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">{user?.fullname}</h1>
                  <p className="text-sm text-gray-500 mt-0.5 capitalize">{user?.role}</p>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all self-start sm:self-auto mt-2 sm:mt-0">
                <Pen size={15} /> Edit Profile
              </motion.button>
            </div>

            {/* Bio */}
            {user?.profile?.bio && (
              <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-2xl bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                {user.profile.bio}
              </p>
            )}

            {/* Quick stats */}
            <div className="flex flex-wrap gap-3 mt-4">
              {joinDate && (
                <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                  <Calendar size={12} /> Joined {joinDate}
                </span>
              )}
              {user?.profile?.skills?.length > 0 && (
                <span className="flex items-center gap-1.5 text-xs text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full font-medium">
                  <Award size={12} /> {user.profile.skills.length} Skills
                </span>
              )}
              {user?.profile?.resume && (
                <span className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-medium">
                  <CheckCircle size={12} /> Resume Uploaded
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Info Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Section title="Contact Information" icon={User}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InfoCard icon={Mail}  label="Email"        value={user?.email}       color={{ bg:'bg-blue-50',   border:'border-blue-100',   icon:'bg-gradient-to-br from-blue-500 to-cyan-500',    label:'text-blue-600'   }} />
                  <InfoCard icon={Phone} label="Phone"        value={user?.phoneNumber} color={{ bg:'bg-purple-50', border:'border-purple-100', icon:'bg-gradient-to-br from-purple-500 to-pink-500',  label:'text-purple-600' }} />
                  <InfoCard icon={User}  label="Full Name"    value={user?.fullname}    color={{ bg:'bg-indigo-50', border:'border-indigo-100', icon:'bg-gradient-to-br from-indigo-500 to-blue-500',  label:'text-indigo-600' }} />
                  <InfoCard icon={Briefcase} label="Role"     value={user?.role}        color={{ bg:'bg-orange-50', border:'border-orange-100', icon:'bg-gradient-to-br from-orange-500 to-amber-500', label:'text-orange-600' }} />
                </div>
              </Section>
            </motion.div>

            {/* Skills */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Section title="Skills" icon={Award}>
                {user?.profile?.skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.profile.skills.map((skill, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04 }}>
                        <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200 px-3 py-1.5 text-sm font-semibold rounded-xl hover:from-purple-200 hover:to-blue-200 transition-all cursor-default">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                      <Award size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No skills added yet</p>
                    <button onClick={() => setOpen(true)} className="mt-2 text-purple-600 text-xs font-bold hover:underline">+ Add Skills</button>
                  </div>
                )}
              </Section>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Resume */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Section title="Resume" icon={FileText}>
                {user?.profile?.resume ? (
                  <a href={user.profile.resume} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all group">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                      <FileText size={18} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-green-600 uppercase tracking-wide">Resume</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.profile.resumeOriginalName || 'View Resume'}</p>
                    </div>
                    <ExternalLink size={16} className="text-green-500 group-hover:text-green-700 shrink-0" />
                  </a>
                ) : (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                      <FileText size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No resume uploaded</p>
                    <button onClick={() => setOpen(true)} className="mt-2 text-purple-600 text-xs font-bold hover:underline">+ Upload Resume</button>
                  </div>
                )}
              </Section>
            </motion.div>

            {/* Profile Completion */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Section title="Profile Completion" icon={CheckCircle}>
                {(() => {
                  const checks = [
                    { label: 'Full Name',    done: !!user?.fullname },
                    { label: 'Email',        done: !!user?.email },
                    { label: 'Phone',        done: !!user?.phoneNumber },
                    { label: 'Bio',          done: !!user?.profile?.bio },
                    { label: 'Skills',       done: user?.profile?.skills?.length > 0 },
                    { label: 'Resume',       done: !!user?.profile?.resume },
                    { label: 'Profile Photo',done: !!user?.profile?.profilePhoto },
                  ];
                  const pct = Math.round((checks.filter(c => c.done).length / checks.length) * 100);
                  return (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-500">Completion</span>
                        <span className={`text-sm font-black ${pct === 100 ? 'text-green-600' : 'text-purple-600'}`}>{pct}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.5 }}
                          className={`h-full rounded-full ${pct === 100 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-purple-500 to-blue-500'}`} />
                      </div>
                      <div className="space-y-2">
                        {checks.map(c => (
                          <div key={c.label} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${c.done ? 'bg-green-500' : 'bg-gray-200'}`}>
                              {c.done && <CheckCircle size={10} className="text-white" />}
                            </div>
                            <span className={`text-xs font-medium ${c.done ? 'text-gray-700' : 'text-gray-400'}`}>{c.label}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </Section>
            </motion.div>
          </div>
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}
