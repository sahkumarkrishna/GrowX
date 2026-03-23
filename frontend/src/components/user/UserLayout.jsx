import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, Bell } from 'lucide-react';
import UserSidebar from './UserSidebar';

export default function UserLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useSelector(s => s.auth);

  return (
    <div className="flex min-h-screen bg-[#f6f5ff]">
      <UserSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md
                           border-b border-gray-100 px-4 sm:px-6
                           flex items-center justify-between">

          {/* Hamburger — mobile only */}
          <button onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
            <Menu size={20} />
          </button>

          <div className="lg:hidden text-lg font-black text-gray-900">GrowX</div>

          {/* Right */}
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-1 ring-white" />
            </button>

            <div className="flex items-center gap-2">
              {user?.profile?.profilePhoto
                ? <img src={user.profile.profilePhoto} alt=""
                    className="w-8 h-8 rounded-xl object-cover" />
                : <div className="w-8 h-8 rounded-xl flex items-center justify-center
                                  text-white text-xs font-black"
                    style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)' }}>
                    {user?.fullname?.slice(0, 1) || 'U'}
                  </div>
              }
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-800 leading-none">
                  {user?.fullname?.split(' ')[0]}
                </p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}