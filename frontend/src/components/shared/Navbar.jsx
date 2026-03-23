import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import GrowXLogo from './GrowXLogo';
import {
  GraduationCap, Brain, Trello, FileText, Briefcase,
  Search, LayoutDashboard, LogOut, User2, Sparkles,
  Building2, ChevronDown, X, Menu, ScanLine,
} from 'lucide-react';

const USER_API = import.meta.env.VITE_USER_API;

const MAIN_NAV = [
  { path: '/',            label: 'Learning',   icon: GraduationCap },
  { path: '/quiz',        label: 'Quiz',       icon: Brain         },
  { path: '/resume',      label: 'Resume',     icon: FileText      },
  { path: '/internship',  label: 'Internship', icon: Briefcase     },
  { path: '/atschecker',  label: 'ATS',        icon: ScanLine      },
  { path: '/KanbanBoard', label: 'Kanban',     icon: Trello        },
];

const JOB_NAV = [
  { path: '/job',    label: 'Job Portal', icon: Briefcase, sub: 'Browse open positions' },
  { path: '/joball', label: 'All Jobs',   icon: Building2, sub: 'View every listing'    },
  { path: '/browse', label: 'Browse',     icon: Search,    sub: 'Search & filter jobs'  },
];

// ── Jobs dropdown ─────────────────────────────────────────────────────────────
function JobDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-xl
                    transition-all hover:bg-purple-50 hover:text-purple-600
                    ${open ? 'bg-purple-50 text-purple-600' : 'text-gray-700'}`}>
        <Search className="w-4 h-4" />
        Jobs
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl
                       shadow-xl border border-gray-100 overflow-hidden z-50">
            {JOB_NAV.map(item => (
              <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-start gap-3 px-4 py-3 transition-colors
                   ${isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Desktop Profile dropdown ──────────────────────────────────────────────────
function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Only avatar — no name/chevron on desktop */}
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center rounded-xl hover:bg-gray-100 transition-colors p-1.5">
        <Avatar className="w-8 h-8 ring-2 ring-purple-200">
          <AvatarImage src={user?.profile?.profilePhoto || '/default-avatar.png'} alt={user?.fullname} />
        </Avatar>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl
                       shadow-xl border border-gray-100 overflow-hidden z-50">

            {/* User info header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 ring-2 ring-purple-200">
                  <AvatarImage src={user?.profile?.profilePhoto || '/default-avatar.png'} />
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{user?.fullname}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              {user?.role !== 'admin' && user?.role !== 'recruiter' && (
                <>
                  <Link to="/user/dashboard" onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold
                               text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> My Dashboard
                  </Link>
               
                </>
              )}
              {(user?.role === 'admin' || user?.role === 'recruiter') && (
                <Link to="/admin/dashboard" onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold
                             text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                </Link>
              )}
              <button onClick={() => { onLogout(); setOpen(false); }}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-semibold
                           text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const { user }  = useSelector(s => s.auth);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [open, setOpen] = useState(false);  // mobile drawer

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Logout failed');
    }
  };

  useEffect(() => { setOpen(false); }, [navigate]);

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-xl sticky top-0 z-50
                      border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16
                        flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <GrowXLogo size={36} />
          </Link>

          {/* ── Desktop: nav links (centre) ──────────────────────────── */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {user?.role !== 'admin' && user?.role !== 'recruiter' && (
              <>
                {MAIN_NAV.map(item => (
                  <NavLink key={item.path} to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-xl
                       transition-all hover:bg-purple-50 hover:text-purple-600
                       ${isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-700'}`}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                ))}
                <JobDropdown />
              </>
            )}
            {(user?.role === 'admin' || user?.role === 'recruiter') && (
              <Link to="/admin/dashboard"
                className="flex items-center gap-2 text-sm font-bold text-purple-600
                           bg-purple-50 px-4 py-2 rounded-xl">
                <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
              </Link>
            )}
          </div>

          {/* ── Desktop right: Profile ONLY (or Login/Signup for guests) ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline"
                    className="rounded-full px-5 border-2 hover:border-purple-600
                               hover:text-purple-600 font-semibold text-sm h-9 transition-all">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-full px-5 h-9 text-sm font-semibold
                                     text-white shadow-md hover:shadow-lg transition-all"
                    style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)' }}>
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              /* Desktop: ONLY the profile avatar icon */
              <ProfileDropdown user={user} onLogout={handleLogout} />
            )}
          </div>

          {/* ── Mobile: ONLY the hamburger Menu icon ────────────────── */}
          <div className="flex lg:hidden">
            <button onClick={() => setOpen(o => !o)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 top-16" />

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-x-0 top-16 z-50 bg-white border-b border-gray-100
                         shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">

              <div className="p-4 space-y-1">

                {/* User strip */}
                {user && (
                  <div className="flex items-center gap-3 px-3 py-3 mb-3
                                  bg-gradient-to-r from-purple-50 to-blue-50
                                  rounded-2xl border border-purple-100">
                    <Avatar className="w-10 h-10 ring-2 ring-purple-200 shrink-0">
                      <AvatarImage src={user?.profile?.profilePhoto || '/default-avatar.png'} />
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{user?.fullname}</p>
                      <p className="text-xs text-gray-500 truncate capitalize">
                        {user?.role} · {user?.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Nav links */}
                {user?.role !== 'admin' && user?.role !== 'recruiter' && (
                  <>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 pt-2 pb-1">
                      Main
                    </p>
                    {MAIN_NAV.map(item => (
                      <NavLink key={item.path} to={item.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold
                           transition-all ${isActive
                             ? 'bg-gradient-to-r from-purple-100 to-blue-50 text-purple-700'
                             : 'text-gray-700 hover:bg-gray-50'}`}>
                        <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                          <item.icon className="w-4 h-4 text-purple-600" />
                        </div>
                        {item.label}
                      </NavLink>
                    ))}

                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 pt-3 pb-1">
                      Job Portal
                    </p>
                    {JOB_NAV.map(item => (
                      <NavLink key={item.path} to={item.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold
                           transition-all ${isActive
                             ? 'bg-gradient-to-r from-purple-100 to-blue-50 text-purple-700'
                             : 'text-gray-700 hover:bg-gray-50'}`}>
                        <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                          <item.icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p>{item.label}</p>
                          <p className="text-xs text-gray-400 font-normal">{item.sub}</p>
                        </div>
                      </NavLink>
                    ))}
                  </>
                )}

                {(user?.role === 'admin' || user?.role === 'recruiter') && (
                  <Link to="/admin/dashboard" onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold
                               text-purple-700 bg-purple-50 border border-purple-100">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <LayoutDashboard className="w-4 h-4 text-purple-600" />
                    </div>
                    Admin Dashboard
                  </Link>
                )}

                {/* Account */}
                {user && (
                  <>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 pt-3 pb-1">
                      Account
                    </p>
                    {user?.role !== 'admin' && user?.role !== 'recruiter' && (
                      <>
                        <Link to="/user/dashboard" onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold
                                     text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                            <LayoutDashboard className="w-4 h-4 text-blue-600" />
                          </div>
                          My Dashboard
                        </Link>
                        
                      </>
                    )}
                    <button onClick={() => { handleLogout(); setOpen(false); }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold
                                 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                        <LogOut className="w-4 h-4 text-red-500" />
                      </div>
                      Logout
                    </button>
                  </>
                )}
              </div>

              {/* Guest auth buttons */}
              {!user && (
                <div className="p-4 pt-2 border-t border-gray-100 grid grid-cols-2 gap-3">
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline"
                      className="w-full h-11 rounded-2xl border-2 font-semibold
                                 hover:border-purple-400 hover:text-purple-600 transition-all">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full h-11 rounded-2xl font-semibold text-white shadow-md"
                      style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)' }}>
                      <Sparkles className="w-4 h-4 mr-1.5" /> Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}