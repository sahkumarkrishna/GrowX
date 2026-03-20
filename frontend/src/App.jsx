import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';

// ── Lazy Imports ──
const Login           = lazy(() => import('./components/auth/Login'));
const Signup          = lazy(() => import('./components/auth/Signup'));
const AdminLogin      = lazy(() => import('./components/auth/AdminLogin'));
const Jobs            = lazy(() => import('./components/Jobs'));
const Browse          = lazy(() => import('./components/Browse'));
const Profile         = lazy(() => import('./components/Profile'));
const JobDescription  = lazy(() => import('./components/JobDescription'));
const JobHome         = lazy(() => import('./components/JobHome'));
const ResumeCheck     = lazy(() => import('./components/ResumeCheck'));
const NotFound        = lazy(() => import('./components/PageNot'));

// Admin
const Companies       = lazy(() => import('./components/admin/Companies'));
const CompanyCreate   = lazy(() => import('./components/admin/CompanyCreate'));
const CompanySetup    = lazy(() => import('./components/admin/CompanySetup'));
const AdminJobs       = lazy(() => import('./components/admin/AdminJobs'));
const PostJob         = lazy(() => import('./components/admin/PostJob'));
const Applicants      = lazy(() => import('./components/admin/Applicants'));
const AdminQuizzes    = lazy(() => import('./components/admin/AdminQuizzes'));
const CreateQuiz      = lazy(() => import('./components/admin/CreateQuiz'));
const EditQuiz        = lazy(() => import('./components/admin/EditQuiz'));
const AdminDashboard  = lazy(() => import('./components/admin/AdminDashboard'));
const AdminSettings   = lazy(() => import('./components/admin/AdminSettings'));
const AdminSaved      = lazy(() => import('./components/admin/AdminSaved'));
const AdminUsers      = lazy(() => import('./components/admin/AdminUsers'));
const AdminAllJobs    = lazy(() => import('./components/admin/AdminAllJobs'));
const AdminAllQuizzes = lazy(() => import('./components/admin/AdminAllQuizzes'));
const AdminAnalytics  = lazy(() => import('./components/admin/AdminAnalytics'));
const AdminATS        = lazy(() => import('./components/admin/AdminATS'));
const AdminResumes         = lazy(() => import('./components/admin/AdminResumes'));
const AdminQuizAccess      = lazy(() => import('./components/admin/AdminQuizAccess'));
const AdminJobApplications = lazy(() => import('./components/admin/AdminJobApplications'));
const AdminInternships     = lazy(() => import('./components/admin/AdminInternships'));

// Shared - NOT lazy (used as wrapper)
import ProtectedRoute from './components/shared/ProtectedRoute';
import MainLayout from './Layout/MainLayout';

// Pages
const LearningHome    = lazy(() => import('./pages/HomeLearning'));
const LearningDashboard = lazy(() => import('./pages/HomeLearning'));

const Internship      = lazy(() => import('./pages/Internship'));
const ATSChecker      = lazy(() => import('./pages/ATSChecker'));
const ResumeReview    = lazy(() => import('./pages/ATSChecker/ResumeReview'));
const StudyRoadmap    = lazy(() => import('./pages/Learning/VideoDashboard'));
const WatchDemo       = lazy(() => import('./pages/Learning/WatchDemo'));
const ProblemSlove    = lazy(() => import('./pages/ProblemSlove'));
const Category        = lazy(() => import('./pages/Internship/Category'));
const QuizHome        = lazy(() => import('./pages/QuizHome'));
const QuizDashboard   = lazy(() => import('./pages/Quiz/QuizDashboard'));
const QuizTake        = lazy(() => import('./pages/Quiz/QuizTake'));
const ResumeTemplates = lazy(() => import('./pages/Resume/ResumeTemplates'));
const ResumeBuilder   = lazy(() => import('./pages/Resume/ResumeBuilder'));
const ResumeDetails   = lazy(() => import('./pages/Resume/ResumeDetails'));
const AllResumes      = lazy(() => import('./pages/Resume/AllResumes'));
const EditResume      = lazy(() => import('./pages/Resume/EditResume'));
const ResumeHome      = lazy(() => import('./pages/ResumeHome'));
const KanbanBoardHome = lazy(() => import('./pages/KanbanHero'));
const CreateTask      = lazy(() => import('./pages/KanbanBoard/Tasks/CreateTask'));
const KanbanBoard     = lazy(() => import('./pages/KanbanBoard/Tasks/KanbanBoard'));
const GetTask         = lazy(() => import('./pages/KanbanBoard/Tasks/GetTask'));
const UpdateTask      = lazy(() => import('./pages/KanbanBoard/Tasks/UpdateTask'));

// User Dashboard
const UserDashboard      = lazy(() => import('./components/UserDashboard'));
const QuizDashboardUser  = lazy(() => import('./components/QuizDashboardUser'));
const JobDashboardUser   = lazy(() => import('./components/JobDashboardUser'));
const SavedJobsDashboard = lazy(() => import('./components/SavedJobsDashboard'));

// ── Page Loader ──
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-xl animate-pulse">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
      <div className="flex gap-1.5 justify-center">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  </div>
);

const RedirectRoot = () => {
  const { user } = useSelector((state) => state.auth);
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  return (
    <Suspense fallback={<PageLoader />}>
      <LearningHome />
    </Suspense>
  );
};

const router = createBrowserRouter([
  // Public Routes
  { path: '/login',       element: <Suspense fallback={<PageLoader />}><Login /></Suspense> },
  { path: '/signup',      element: <Suspense fallback={<PageLoader />}><Signup /></Suspense> },
  { path: '/admin/login', element: <Suspense fallback={<PageLoader />}><AdminLogin /></Suspense> },
  { path: '*',            element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense> },

  // Layout Routes
  {
    path: '/',
    element: <Suspense fallback={<PageLoader />}><MainLayout /></Suspense>,
    children: [
      { path: '/',           element: <RedirectRoot /> },
      { path: '/job',        element: <Suspense fallback={<PageLoader />}><JobHome /></Suspense> },
      { path: '/joball',     element: <Suspense fallback={<PageLoader />}><Jobs /></Suspense> },
      { path: '/description/:id', element: <Suspense fallback={<PageLoader />}><JobDescription /></Suspense> },
      { path: '/browse',     element: <Suspense fallback={<PageLoader />}><Browse /></Suspense> },
      { path: '/profile',    element: <Suspense fallback={<PageLoader />}><ProtectedRoute><Profile /></ProtectedRoute></Suspense> },
      { path: '/dashboard',  element: <Suspense fallback={<PageLoader />}><ProtectedRoute><UserDashboard /></ProtectedRoute></Suspense> },
      { path: '/dashboard/quiz',       element: <Suspense fallback={<PageLoader />}><ProtectedRoute><QuizDashboardUser /></ProtectedRoute></Suspense> },
      { path: '/dashboard/jobs',       element: <Suspense fallback={<PageLoader />}><ProtectedRoute><JobDashboardUser /></ProtectedRoute></Suspense> },
      { path: '/dashboard/saved-jobs', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><SavedJobsDashboard /></ProtectedRoute></Suspense> },
      { path: '/resumeCheck',  element: <Suspense fallback={<PageLoader />}><ResumeCheck /></Suspense> },
      { path: '/learning',     element: <Suspense fallback={<PageLoader />}><LearningHome /></Suspense> },
      { path: '/internship',   element: <Suspense fallback={<PageLoader />}><Internship /></Suspense> },
      { path: '/onlineCoding', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><ProblemSlove /></ProtectedRoute></Suspense> },
      { path: '/learningVideo',element: <Suspense fallback={<PageLoader />}><ProtectedRoute><StudyRoadmap /></ProtectedRoute></Suspense> },
      { path: '/watchDemo',    element: <Suspense fallback={<PageLoader />}><WatchDemo /></Suspense> },
      { path: '/category',     element: <Suspense fallback={<PageLoader />}><ProtectedRoute><Category /></ProtectedRoute></Suspense> },

      // Quiz
      { path: '/quiz',           element: <Suspense fallback={<PageLoader />}><QuizHome /></Suspense> },
      { path: '/quizCategory',   element: <Suspense fallback={<PageLoader />}><ProtectedRoute><QuizDashboard /></ProtectedRoute></Suspense> },
      { path: '/quiz-dashboard', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><QuizDashboard /></ProtectedRoute></Suspense> },
      { path: '/quiz/:id',       element: <Suspense fallback={<PageLoader />}><ProtectedRoute><QuizTake /></ProtectedRoute></Suspense> },

      // ATS
      { path: '/atschecker',        element: <Suspense fallback={<PageLoader />}><ATSChecker /></Suspense> },
      { path: '/atschecker/review', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><ResumeReview /></ProtectedRoute></Suspense> },

      // Resume
      { path: '/resume',            element: <Suspense fallback={<PageLoader />}><ResumeHome /></Suspense> },
      { path: '/resume-templates',  element: <Suspense fallback={<PageLoader />}><ResumeTemplates /></Suspense> },
      { path: '/resume-builder',    element: <Suspense fallback={<PageLoader />}><ProtectedRoute><ResumeBuilder /></ProtectedRoute></Suspense> },
      { path: '/resume/:id',        element: <Suspense fallback={<PageLoader />}><ProtectedRoute><ResumeDetails /></ProtectedRoute></Suspense> },
      { path: '/all-resumes',       element: <Suspense fallback={<PageLoader />}><ProtectedRoute><AllResumes /></ProtectedRoute></Suspense> },
      { path: '/edit-resume/:id',   element: <Suspense fallback={<PageLoader />}><ProtectedRoute><EditResume /></ProtectedRoute></Suspense> },

      // Kanban
      { path: '/KanbanBoard',       element: <Suspense fallback={<PageLoader />}><KanbanBoardHome /></Suspense> },
      { path: '/taskForm',          element: <Suspense fallback={<PageLoader />}><ProtectedRoute><CreateTask /></ProtectedRoute></Suspense> },
      { path: '/Taskkanbanboard',   element: <Suspense fallback={<PageLoader />}><ProtectedRoute><KanbanBoard /></ProtectedRoute></Suspense> },
      { path: '/getTask/:id?',      element: <Suspense fallback={<PageLoader />}><ProtectedRoute><GetTask /></ProtectedRoute></Suspense> },
      { path: '/updateTask/:id?',   element: <Suspense fallback={<PageLoader />}><ProtectedRoute><UpdateTask /></ProtectedRoute></Suspense> },
    ],
  },

  // Admin Routes (no MainLayout = no Navbar, no pt-16)
  { path: '/admin/dashboard',          element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute></Suspense> },
  { path: '/admin/companies',          element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><Companies /></ProtectedRoute></Suspense> },
  { path: '/admin/companies/create',   element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><CompanyCreate /></ProtectedRoute></Suspense> },
  { path: '/admin/companies/:id',      element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><CompanySetup /></ProtectedRoute></Suspense> },
  { path: '/admin/jobs',               element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminJobs /></ProtectedRoute></Suspense> },
  { path: '/admin/jobs/create',        element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><PostJob /></ProtectedRoute></Suspense> },
  { path: '/admin/jobs/:id/applicants',element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><Applicants /></ProtectedRoute></Suspense> },
  { path: '/admin/quizzes',            element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminQuizzes /></ProtectedRoute></Suspense> },
  { path: '/admin/quizzes/create',     element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><CreateQuiz /></ProtectedRoute></Suspense> },
  { path: '/admin/quizzes/edit/:id',   element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><EditQuiz /></ProtectedRoute></Suspense> },
  { path: '/admin/settings',           element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminSettings /></ProtectedRoute></Suspense> },
  { path: '/admin/saved',              element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminSaved /></ProtectedRoute></Suspense> },
  { path: '/admin/users',              element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute></Suspense> },
  { path: '/admin/all-jobs',           element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminAllJobs /></ProtectedRoute></Suspense> },
  { path: '/admin/all-quizzes',        element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminAllQuizzes /></ProtectedRoute></Suspense> },
  { path: '/admin/analytics',          element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminAnalytics /></ProtectedRoute></Suspense> },
  { path: '/admin/ats',                element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminATS /></ProtectedRoute></Suspense> },
  { path: '/admin/resumes',            element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminResumes /></ProtectedRoute></Suspense> },
  { path: '/admin/quiz-access',        element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminQuizAccess /></ProtectedRoute></Suspense> },
  { path: '/admin/job-applications',   element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminJobApplications /></ProtectedRoute></Suspense> },
  { path: '/admin/internships',        element: <Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminInternships /></ProtectedRoute></Suspense> },

  // Learning Dashboard (with sidebar)
  { path: '/learning-dashboard',       element: <Suspense fallback={<PageLoader />}><ProtectedRoute><LearningDashboard /></ProtectedRoute></Suspense> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
