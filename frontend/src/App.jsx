import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import NotFound from './components/PageNot';
import ResumeCheck from './components/ResumeCheck';
import Layout from './MainLayout/Layout';
import Internship from './pages/Internship';
import Apply from './pages/Internship/Apply';
import LearningHome from './pages/LearningHome';
import StudyRoadmap from './pages/Learning/VideoDashboard';
import ProblemSlove from './pages/ProblemSlove';
import JobHome from './components/JobHome';

const RedirectRoot = () => {
  const { user } = useSelector((state) => state.auth);
  if (user?.role === 'recruiter') return <Navigate to="/admin/companies" replace />;
  return <LearningHome />;
};

const router = createBrowserRouter([
  // ❌ Login & Signup OUTSIDE layout
  { path: 'login', element: <Login /> },
  { path: 'signup', element: <Signup /> },
  { path: '*', element: <NotFound /> },

  // ✅ All other pages inside Layout
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <RedirectRoot /> },
      { path: '/Job', element: <JobHome /> },
      { path: 'joball', element: <Jobs /> },
      { path: 'description/:id', element: <JobDescription /> },
      { path: 'browse', element: <Browse /> },
      { path: 'profile', element: <Profile /> },
      { path: 'resumeCheck', element: <ResumeCheck /> },
      { path: 'learning', element: <LearningHome /> },
      { path: 'learningVideo', element: <StudyRoadmap /> },
      { path: 'internship', element: <Internship /> },
      { path: 'internshipApply', element: <Apply /> },
      { path: "onlineCoding", element:<ProblemSlove/> },

      // Admin routes
      { path: 'admin/companies', element: <ProtectedRoute><Companies /></ProtectedRoute> },
      { path: 'admin/companies/create', element: <ProtectedRoute><CompanyCreate /></ProtectedRoute> },
      { path: 'admin/companies/:id', element: <ProtectedRoute><CompanySetup /></ProtectedRoute> },
      { path: 'admin/jobs', element: <ProtectedRoute><AdminJobs /></ProtectedRoute> },
      { path: 'admin/jobs/create', element: <ProtectedRoute><PostJob /></ProtectedRoute> },
      { path: 'admin/jobs/:id/applicants', element: <ProtectedRoute><Applicants /></ProtectedRoute> },

      // Catch-all
      
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
