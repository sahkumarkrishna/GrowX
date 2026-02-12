import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { LogOut, User2, Menu, X, Sparkles, GraduationCap, Brain, Trello, FileText, Briefcase, Building2, Search, LayoutDashboard } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import GrowXLogo from './GrowXLogo';

const USER_API_END_POINT = import.meta.env.VITE_USER_API;

const navLinks = [
  { path: '/', label: 'Learning', icon: <GraduationCap className="h-4 w-4" /> },
  { path: 'quiz', label: "Quiz", icon: <Brain className="h-4 w-4" /> },
  { path: 'kanbanBoard', label: "Kanban", icon: <Trello className="h-4 w-4" /> },
  { path: 'resume', label: "Resume", icon: <FileText className="h-4 w-4" /> },
  { path: '/internship', label: 'Internship', icon: <Briefcase className="h-4 w-4" /> },
  { path: '/atschecker', label: 'ATSchecker', icon: <Briefcase className="h-4 w-4" /> },
];

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobportalOpen, setJobportalOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Logout failed');
    }
  };

  const renderLinks = () => {
    if (user?.role === 'recruiter') {
      return (
        <>
          <li>
            <Link to="/admin/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium transition-all hover:scale-105">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/companies" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium transition-all hover:scale-105">
              <Building2 className="h-4 w-4" />
              Companies
            </Link>
          </li>
          <li>
            <Link to="/admin/jobs" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium transition-all hover:scale-105">
              <Briefcase className="h-4 w-4" />
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/admin/quizzes" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium transition-all hover:scale-105">
              <Brain className="h-4 w-4" />
              Quizzes
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          {navLinks.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => `flex items-center gap-2 font-medium transition-all hover:scale-105 ${isActive ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
              >
                {link.icon}
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="relative group">
            <button
              onClick={() => setJobportalOpen(!jobportalOpen)}
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium transition-all hover:scale-105"
            >
              <Search className="h-4 w-4" />
              Jobportal {jobportalOpen ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
            </button>
            {jobportalOpen && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-2xl rounded-2xl border-2 border-purple-100 min-w-[180px] z-50 overflow-hidden">
                <li>
                  <NavLink to="/job" className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-all">
                    <Briefcase className="h-4 w-4" />
                    Job Portal
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/joball" className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-all">
                    <Building2 className="h-4 w-4" />
                    All Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/browse" className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-all">
                    <Search className="h-4 w-4" />
                    Browse
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </>
      );
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="flex-shrink-0">
          <GrowXLogo size={40} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {renderLinks()}
          </ul>

          <div className="flex items-center gap-3">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline" className="rounded-full px-6 border-2 hover:border-purple-600 hover:text-purple-600 transition-all">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer hover:scale-110 transition-transform ring-2 ring-purple-200 hover:ring-purple-400">
                    <AvatarImage src={user?.profile?.profilePhoto || '/default-avatar.png'} alt={user?.fullname || 'User'} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-white border-2 border-gray-200 rounded-xl shadow-2xl">
                  <div className="flex gap-3 mb-4 pb-4 border-b border-gray-200">
                    <Avatar className="ring-2 ring-purple-200">
                      <AvatarImage src={user?.profile?.profilePhoto || '/default-avatar.png'} alt={user?.fullname || 'User'} />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500">{user?.profile?.bio || 'No bio available'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {user?.role !== 'recruiter' && (
                      <>
                        <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                          <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Link>
                        <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors font-medium">
                          <User2 className="h-4 w-4" /> View Profile
                        </Link>
                      </>
                    )}
                    <button onClick={logoutHandler} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors font-medium">
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {/* Mobile menu button & user avatar */}
        <div className="flex lg:hidden items-center gap-3">
          {user && (
            <Avatar className="h-8 w-8 ring-2 ring-purple-200">
              <AvatarImage src={user?.profile?.profilePhoto || '/default-avatar.png'} alt={user?.fullname || 'User'} />
            </Avatar>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="hover:bg-purple-50 rounded-full"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6 text-purple-600" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`lg:hidden fixed inset-x-0 top-16 bg-white shadow-2xl transition-all duration-300 overflow-y-auto z-40 border-t border-gray-200 ${menuOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="flex flex-col gap-1 font-medium p-4 pb-2">
          {user?.role === 'recruiter' ? (
            <>
              <li>
                <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/companies" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                  <Building2 className="h-5 w-5" />
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/admin/jobs" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                  <Briefcase className="h-5 w-5" />
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/admin/quizzes" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                  <Brain className="h-5 w-5" />
                  Quizzes
                </Link>
              </li>
            </>
          ) : (
            <>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink 
                    to={link.path} 
                    onClick={() => setMenuOpen(false)} 
                    className={({ isActive }) => `px-4 py-3 rounded-xl font-medium block ${isActive ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600 shadow-sm" : "text-gray-700 hover:bg-purple-50"} transition-all`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => setJobportalOpen(!jobportalOpen)} 
                  className="flex justify-between items-center w-full px-4 py-3 rounded-xl hover:bg-purple-50 transition-all font-medium text-gray-700"
                >
                  Jobportal
                  {jobportalOpen ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
                </button>
                {jobportalOpen && (
                  <ul className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-purple-200 pl-4">
                    <li>
                      <NavLink 
                        to="/job" 
                        onClick={() => setMenuOpen(false)} 
                        className={({ isActive }) => `px-3 py-2.5 rounded-lg text-sm block ${isActive ? "bg-purple-50 text-purple-600" : "hover:bg-purple-50 text-gray-600"}`}
                      >
                        Job Portal
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        to="/joball" 
                        onClick={() => setMenuOpen(false)} 
                        className={({ isActive }) => `px-3 py-2.5 rounded-lg text-sm block ${isActive ? "bg-purple-50 text-purple-600" : "hover:bg-purple-50 text-gray-600"}`}
                      >
                        All Jobs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        to="/browse" 
                        onClick={() => setMenuOpen(false)} 
                        className={({ isActive }) => `px-3 py-2.5 rounded-lg text-sm block ${isActive ? "bg-purple-50 text-purple-600" : "hover:bg-purple-50 text-gray-600"}`}
                      >
                        Browse
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}
        </ul>

        {!user ? (
          <div className="flex flex-col gap-3 p-4 pt-3 border-t border-gray-200 bg-gray-50">
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" className="w-full rounded-full border-2 h-11 font-medium">Login</Button>
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full rounded-full h-11 font-medium shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-1 p-4 pt-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <Avatar className="h-10 w-10 ring-2 ring-purple-200">
                <AvatarImage src={user?.profile?.profilePhoto || '/default-avatar.png'} alt={user?.fullname || 'User'} />
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">{user?.fullname}</h4>
                <p className="text-xs text-gray-500 truncate">{user?.profile?.bio || 'No bio available'}</p>
              </div>
            </div>
            {user?.role !== 'recruiter' && (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={() => setMenuOpen(false)} 
                  className="px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium block"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  onClick={() => setMenuOpen(false)} 
                  className="px-4 py-3 rounded-xl text-gray-700 hover:bg-white hover:text-purple-600 transition-colors font-medium block"
                >
                  View Profile
                </Link>
              </>
            )}
            <button 
              onClick={() => { logoutHandler(); setMenuOpen(false); }} 
              className="px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-left w-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
