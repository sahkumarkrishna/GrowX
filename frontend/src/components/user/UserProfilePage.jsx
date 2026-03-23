import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { UserCircle, Mail, Phone, FileText, CheckCircle, Edit3, ExternalLink, Shield } from 'lucide-react';
import UpdateProfileDialog from '../UpdateProfileDialog';

const f = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } });

export default function UserProfilePage() {
  const { user } = useSelector(s => s.auth);
  const [open, setOpen] = useState(false);

  const profileChecks = [
    { label: 'Full Name',     done: !!user?.fullname                   },
    { label: 'Email',         done: !!user?.email                      },
    { label: 'Phone',         done: !!user?.phoneNumber                },
    { label: 'Bio',           done: !!user?.profile?.bio               },
    { label: 'Skills',        done: user?.profile?.skills?.length > 0 },
    { label: 'Resume',        done: !!user?.profile?.resume            },
    { label: 'Profile Photo', done: !!user?.profile?.profilePhoto      },
  ];
  const pct      = Math.round(profileChecks.filter(c => c.done).length / profileChecks.length * 100);
  const initials = user?.fullname?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div className="min-h-screen p-5 sm:p-8 space-y-7"
      style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)' }}>

      <motion.div {...f(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">👤 Profile & Settings</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Manage your account information.</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)', boxShadow: '0 4px 15px rgba(124,58,237,0.35)' }}>
          <Edit3 size={15} /> Edit Profile
        </motion.button>
      </motion.div>

      {/* Hero card */}
      <motion.div {...f(0.07)} className="rounded-3xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="h-24 sm:h-32 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#1a0533,#0f1f6e,#091629)' }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.4),transparent 70%)' }} />
        </div>
        <div className="px-5 sm:px-8 pb-6">
          <div className="flex items-start -mt-10 sm:-mt-12 mb-4">
            <div className="relative shrink-0">
              {user?.profile?.profilePhoto
                ? <img src={user.profile.profilePhoto} alt="avatar"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover"
                    style={{ boxShadow: '0 0 0 4px rgba(255,255,255,0.08),0 8px 24px rgba(0,0,0,0.5)' }} />
                : <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center font-black text-2xl text-white"
                    style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)', boxShadow: '0 0 0 4px rgba(255,255,255,0.08),0 8px 24px rgba(124,58,237,0.4)' }}>
                    {initials}
                  </div>
              }
              {user?.isEmailVerified && (
                <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  style={{ boxShadow: '0 0 0 3px #0f172a' }}>
                  <Shield size={13} className="text-white" />
                </span>
              )}
            </div>
          </div>
          {/* Name always visible */}
          <h2 className="text-xl sm:text-2xl font-black text-white">{user?.fullname || 'Your Name'}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full capitalize"
              style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.25)' }}>
              {user?.role}
            </span>
            {user?.isEmailVerified && (
              <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(96,165,250,0.15)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.25)' }}>
                <Shield size={10} /> Verified
              </span>
            )}
          </div>
          {user?.profile?.bio && (
            <p className="text-sm mt-3 leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.5)' }}>{user.profile.bio}</p>
          )}
        </div>
      </motion.div>

      {/* Info + Strength */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <motion.div {...f(0.14)} className="rounded-2xl p-5 h-full"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 className="font-black text-white text-sm mb-4">Account Information</h3>
          <div className="space-y-2.5">
            {[
              { icon: UserCircle, label: 'Full Name', value: user?.fullname,    color: '#a78bfa' },
              { icon: Mail,       label: 'Email',     value: user?.email,       color: '#60a5fa' },
              { icon: Phone,      label: 'Phone',     value: user?.phoneNumber, color: '#34d399' },
              { icon: UserCircle, label: 'Role',      value: user?.role,        color: '#f59e0b' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}>
                  <item.icon size={15} style={{ color: item.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.label}</p>
                  <p className="text-sm font-bold text-white capitalize truncate">
                    {item.value || <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, fontSize: 12 }}>Not set</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...f(0.18)} className="rounded-2xl p-5 h-full"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-white text-sm">Profile Strength</h3>
            <span className="text-sm font-black" style={{ color: '#a78bfa' }}>{pct}%</span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden mb-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg,#7c3aed,#2563eb)', boxShadow: '0 0 10px rgba(124,58,237,0.5)' }} />
          </div>
          <div className="space-y-2.5">
            {profileChecks.map(c => (
              <div key={c.label} className="flex items-center gap-2.5 group">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${c.done ? 'bg-emerald-500' : 'bg-white/10'}`}>
                  {c.done ? <CheckCircle size={11} className="text-white" /> : <span className="w-1.5 h-1.5 rounded-full bg-white/30" />}
                </div>
                <span className={`text-xs font-medium flex-1 ${c.done ? 'text-white/70' : 'text-white/35'}`}>{c.label}</span>
                {!c.done && (
                  <button onClick={() => setOpen(true)}
                    className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#a78bfa' }}>Add →</button>
                )}
              </div>
            ))}
          </div>
          {pct < 100 && (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(true)}
              className="mt-5 w-full py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)', boxShadow: '0 4px 15px rgba(124,58,237,0.35)' }}>
              Complete Profile
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Skills */}
      {user?.profile?.skills?.length > 0 && (
        <motion.div {...f(0.22)} className="rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 className="font-black text-white text-sm mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.profile.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1.5 text-xs font-bold rounded-xl"
                style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.25)' }}>
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Resume */}
      {user?.profile?.resume && (
        <motion.div {...f(0.26)} className="rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 className="font-black text-white text-sm mb-4">Resume</h3>
          <a href={user.profile.resume} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl transition-all group"
            style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.2)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(5,150,105,0.4)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(5,150,105,0.2)'}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(5,150,105,0.2)', border: '1px solid rgba(5,150,105,0.3)' }}>
              <FileText size={16} style={{ color: '#34d399' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user.profile.resumeOriginalName || 'My Resume'}</p>
              <p className="text-xs font-bold" style={{ color: '#34d399' }}>✓ Uploaded</p>
            </div>
            <ExternalLink size={15} style={{ color: 'rgba(52,211,153,0.5)' }} />
          </a>
        </motion.div>
      )}

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}