// MainLayout.jsx
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer'; // optional footer
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16"> {/* padding top so content isn't hidden under sticky Navbar */}
        <Outlet />
      </main>
      <Footer /> optional footer
    </>
  );
};

export default MainLayout;
