import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

import GrowXLogo from './GrowXLogo';

const USER_API_END_POINT = import.meta.env.VITE_USER_API;

const navLinks = [
  { path: '/', label: 'Learning' },
  { path: '/onlineCoding', label: 'OnlineCoding' },
  { path: '/internship', label: 'Internship' },
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
          <li><Link to="/admin/companies" className="text-gray-700 hover:text-[#F83002]">Companies</Link></li>
          <li><Link to="/admin/jobs" className="text-gray-700 hover:text-[#F83002]">Jobs</Link></li>
        </>
      );
    } else {
      return (
        <>
          {navLinks.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => isActive ? 'text-[#F83002]' : 'text-gray-700'}
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          <li className="relative">
            <button
              onClick={() => setJobportalOpen(!jobportalOpen)}
              className="flex items-center gap-1 text-gray-700 hover:text-[#F83002]"
            >
              Jobportal {jobportalOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {jobportalOpen && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md min-w-[150px] z-50">
                <li>
                  <NavLink to="/job" className="block px-4 py-2 text-gray-700 hover:text-[#F83002]">Job</NavLink>
                </li>
                <li>
                  <NavLink to="/joball" className="block px-4 py-2 text-gray-700 hover:text-[#F83002]">JobAll</NavLink>
                </li>
                <li>
                  <NavLink to="/browse" className="block px-4 py-2 text-gray-700 hover:text-[#F83002]">Browse</NavLink>
                </li>
              </ul>
            )}
          </li>
        </>
      );
    }
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16">
        {/* Logo */}
        <GrowXLogo size={40} />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex font-medium items-center gap-5">
            {renderLinks()}
          </ul>

          {/* Auth / Profile */}
          <div className="ml-4">
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer hover:scale-105 transition-transform bg-gray-100">
                    <AvatarImage src={user?.profile?.profilePhoto || '/default-avatar.png'} alt={user?.fullname || 'User'} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-gray-100 text-black">
                  <div className="flex gap-2 mb-4">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto || '/default-avatar.png'} alt={user?.fullname || 'User'} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-gray-300">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* Show View Profile for all users including recruiters */}
                    <Link to="/profile" className="flex items-center gap-2 hover:text-[#F83002]"><User2 /> View Profile</Link>
                    <button onClick={logoutHandler} className="flex items-center gap-2 hover:text-[#F83002]">
                      <LogOut /> Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden fixed top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl transition-all duration-300 overflow-hidden z-50 w-[90%] max-w-sm ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="flex flex-col gap-3 font-medium p-4">
          {/* For mobile, render links same as desktop */}
          {user?.role === 'recruiter' ? (
            <>
              <li>
                <Link to="/admin/companies" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#F83002]">Companies</Link>
              </li>
              <li>
                <Link to="/admin/jobs" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#F83002]">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg ${isActive ? "text-[#F83002]" : "text-gray-700"} hover:bg-gray-100`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}

              {/* Jobportal Dropdown */}
              <li>
                <button
                  onClick={() => setJobportalOpen(!jobportalOpen)}
                  className="flex justify-between items-center w-full px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  Jobportal {jobportalOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {jobportalOpen && (
                  <ul className="ml-4 mt-2 flex flex-col gap-2 border-l-2 border-gray-200 pl-3">
                    <li>
                      <NavLink
                        to="/job"
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2 rounded-md hover:bg-gray-50"
                      >
                        Job
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/joball"
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2 rounded-md hover:bg-gray-50"
                      >
                        JobAll
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/browse"
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2 rounded-md hover:bg-gray-50"
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

        {/* Mobile Auth / Profile */}
        {!user ? (
          <div className="flex flex-col gap-2 p-4">
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              <Button className="bg-[#6A38C2] text-white w-full">Signup</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-4">
            {/* Show View Profile for all users */}
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-700 hover:text-[#F83002]"
            >
              <User2 size={18} /> View Profile
            </Link>
            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 text-gray-700 hover:text-[#F83002]"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
