import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AdminLogin from './components/auth/AdminLogin';
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
import AdminQuizzes from './components/admin/AdminQuizzes';
import CreateQuiz from './components/admin/CreateQuiz';
import EditQuiz from './components/admin/EditQuiz';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/shared/ProtectedRoute';
import NotFound from './components/PageNot';
import ResumeCheck from './components/ResumeCheck';
import Internship from './pages/Internship';
import ATSChecker from './pages/ATSChecker';
import ResumeReview from './pages/ATSChecker/ResumeReview';
import LearningHome from './pages/HomeLearning';
import StudyRoadmap from './pages/Learning/VideoDashboard';
import WatchDemo from './pages/Learning/WatchDemo';
import ProblemSlove from './pages/ProblemSlove';
import JobHome from './components/JobHome';
import MainLayout from './Layout/MainLayout';
import Category from './pages/Internship/Category';
import QuizHome from './pages/QuizHome';

//Kanban Board Pages

import KanbanBoardHome from './pages/KanbanHero';
import CreateTask from './pages/KanbanBoard/Tasks/CreateTask';
import KanbanBoard from './pages/KanbanBoard/Tasks/KanbanBoard';
import GetTask from './pages/KanbanBoard/Tasks/GetTask';
import UpdateTask from './pages/KanbanBoard/Tasks/UpdateTask';


// Amin Dashboard Pages

import QuizDashboard from './pages/Quiz/QuizDashboard';
import QuizTake from './pages/Quiz/QuizTake';

//Resume Builder 
import ResumeTemplates from './pages/Resume/ResumeTemplates';
import ResumeBuilder from './pages/Resume/ResumeBuilder';
import ResumeDetails from './pages/Resume/ResumeDetails';
import AllResumes from './pages/Resume/AllResumes';
import EditResume from './pages/Resume/EditResume';
import ResumeHome from './pages/ResumeHome';

// User Dashboard
import UserDashboard from './components/UserDashboard';
import QuizDashboardUser from './components/QuizDashboardUser';
import JobDashboardUser from './components/JobDashboardUser';
import SavedJobsDashboard from './components/SavedJobsDashboard';

const RedirectRoot = () => {
  const { user } = useSelector((state) => state.auth);
  if (user?.role === 'recruiter') return <Navigate to="/admin/dashboard" replace />;
  return <LearningHome />;
};

const router = createBrowserRouter([
  // Public Routes (No Layout/Navbar)
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '*', element: <NotFound /> },

  // Layout Routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <RedirectRoot /> },
      { path: '/job', element: <JobHome /> },
      { path: '/joball', element: <Jobs /> },
      { path: '/description/:id', element: <JobDescription /> },
      { path: '/browse', element: <Browse /> },
      { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: '/dashboard', element: <ProtectedRoute><UserDashboard /></ProtectedRoute> },
      { path: '/dashboard/quiz', element: <ProtectedRoute><QuizDashboardUser /></ProtectedRoute> },
      { path: '/dashboard/jobs', element: <ProtectedRoute><JobDashboardUser /></ProtectedRoute> },
      { path: '/dashboard/saved-jobs', element: <ProtectedRoute><SavedJobsDashboard /></ProtectedRoute> },
      { path: '/resumeCheck', element: <ResumeCheck /> },
      { path: '/learning', element: <LearningHome /> },
      { path: '/internship', element: <Internship /> },
      { path: '/onlineCoding', element: <ProtectedRoute><ProblemSlove /></ProtectedRoute> },
      { path: '/learningVideo', element: <ProtectedRoute><StudyRoadmap /></ProtectedRoute> },
      { path: '/watchDemo', element: <WatchDemo /> },
      { path: '/category', element: <ProtectedRoute><Category /></ProtectedRoute> },

      // Quiz Routes
      { path: '/quiz', element: <QuizHome /> },
      { path: '/quizCategory', element: <ProtectedRoute><QuizDashboard /></ProtectedRoute> },
      { path: '/quiz-dashboard', element: <ProtectedRoute><QuizDashboard /></ProtectedRoute> },
      { path: '/quiz/:id', element: <ProtectedRoute><QuizTake /></ProtectedRoute> },

      //ATS Checker Route
      { path: '/atschecker', element: <ATSChecker /> },
      { path: '/atschecker/review', element: <ProtectedRoute><ResumeReview /></ProtectedRoute> },


      // Resume Routes
      { path: "/resume", element: <ResumeHome /> },
      { path: '/resume-templates', element: <ResumeTemplates /> },
      { path: '/resume-builder', element: <ProtectedRoute><ResumeBuilder /></ProtectedRoute> },
      { path: '/resume/:id', element: <ProtectedRoute><ResumeDetails /></ProtectedRoute> },
      { path: '/all-resumes', element: <ProtectedRoute><AllResumes /></ProtectedRoute> },
      { path: '/edit-resume/:id', element: <ProtectedRoute><EditResume /></ProtectedRoute> },

      // Kanban Routes
      { path: "/KanbanBoard", element: <KanbanBoardHome /> },
      { path: "/taskForm", element: <ProtectedRoute><CreateTask /></ProtectedRoute> },
      { path: "/Taskkanbanboard", element: <ProtectedRoute><KanbanBoard /></ProtectedRoute> },
      { path: "/getTask/:id?", element: <ProtectedRoute><GetTask /></ProtectedRoute> },
      { path: "/updateTask/:id?", element: <ProtectedRoute><UpdateTask /></ProtectedRoute> },

      // Admin Routes
      { path: '/admin/dashboard', element: <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute> },
      { path: '/admin/companies', element: <ProtectedRoute adminOnly><Companies /></ProtectedRoute> },
      { path: '/admin/companies/create', element: <ProtectedRoute adminOnly><CompanyCreate /></ProtectedRoute> },
      { path: '/admin/companies/:id', element: <ProtectedRoute adminOnly><CompanySetup /></ProtectedRoute> },
      { path: '/admin/jobs', element: <ProtectedRoute adminOnly><AdminJobs /></ProtectedRoute> },
      { path: '/admin/jobs/create', element: <ProtectedRoute adminOnly><PostJob /></ProtectedRoute> },
      { path: '/admin/jobs/:id/applicants', element: <ProtectedRoute adminOnly><Applicants /></ProtectedRoute> },
      { path: '/admin/quizzes', element: <ProtectedRoute adminOnly><AdminQuizzes /></ProtectedRoute> },
      { path: '/admin/quizzes/create', element: <ProtectedRoute adminOnly><CreateQuiz /></ProtectedRoute> },
      { path: '/admin/quizzes/edit/:id', element: <ProtectedRoute adminOnly><EditQuiz /></ProtectedRoute> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
