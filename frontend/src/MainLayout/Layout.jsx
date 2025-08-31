// Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer"; // Import the Footer

const Layout = () => {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/signup'];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
      
      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
