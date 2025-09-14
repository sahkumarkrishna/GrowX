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
import ProtectedRoute from './components/shared/ProtectedRoute';
import NotFound from './components/PageNot';
import ResumeCheck from './components/ResumeCheck';
import Internship from './pages/Internship';
import LearningHome from './pages/LearningHome';
import StudyRoadmap from './pages/Learning/VideoDashboard';
import ProblemSlove from './pages/ProblemSlove';
import JobHome from './components/JobHome';
import MainLayout from './Layout/MainLayout';
import Category from './pages/Internship/Category';
import QuizHome from './pages/QuizHome';
import QuizCategory from './pages/Quiz/QuizSection/QuizCategory';

// Quiz Pages
import HtmlQuiz from './pages/Quiz/QuizSection/BasicFundamentals/Html';
import CssQuiz from './pages/Quiz/QuizSection/BasicFundamentals/Css';
import FirebaseQuiz from './pages/Quiz/QuizSection/DatabasesFundamentals/Firebase';
import MongoDBQuiz from './pages/Quiz/QuizSection/DatabasesFundamentals/MongoDB';
import MySQLQuiz from './pages/Quiz/QuizSection/DatabasesFundamentals/MySql';
import AngularQuiz from './pages/Quiz/QuizSection/FrontendFundamentals/Angular';
import ReactQuiz from './pages/Quiz/QuizSection/FrontendFundamentals/React';
import BootstrapQuiz from './pages/Quiz/QuizSection/FrontendFundamentals/Bootstrap';
import TailwindQuiz from './pages/Quiz/QuizSection/FrontendFundamentals/Tailwind';
import MaterialUIQuiz from './pages/Quiz/QuizSection/FrontendFundamentals/Material';
import DjangoQuiz from './pages/Quiz/QuizSection/BackendFundamentals/Django';
import NodeJSQuiz from './pages/Quiz/QuizSection/BackendFundamentals/Node';
import SpringBootQuiz from './pages/Quiz/QuizSection/BackendFundamentals/Spring Boot';
import CQuiz from './pages/Quiz/QuizSection/languagesFundamentals/C';
import CPPQuiz from './pages/Quiz/QuizSection/languagesFundamentals/Cpp';
import JavaQuiz from './pages/Quiz/QuizSection/languagesFundamentals/Java';
import PythonQuiz from './pages/Quiz/QuizSection/languagesFundamentals/Python';
import JSQuiz from './pages/Quiz/QuizSection/languagesFundamentals/Javascript';
import TSQuiz from './pages/Quiz/QuizSection/languagesFundamentals/Typescript';
import GitHubQuiz from './pages/Quiz/QuizSection/ToolsFundamentals/GitHub';
import DockerQuiz from './pages/Quiz/QuizSection/ToolsFundamentals/Docker';
import ReactNativeQuiz from './pages/Quiz/QuizSection/AppDevelopment/React Native';
import FlutterQuiz from './pages/Quiz/QuizSection/AppDevelopment/Flutter';
import ResumeTemplates from './pages/Resume/ResumeTemplates';
import ResumeBuilder from './pages/Resume/ResumeBuilder';
import ResumeDetails from './pages/Resume/ResumeDetails';
import AllResumes from './pages/Resume/AllResumes';
import ResumeEdit from './pages/Resume/EditResume';
import ResumeHome from './pages/ResumeHome';

const RedirectRoot = () => {
  const { user } = useSelector((state) => state.auth);
  if (user?.role === 'recruiter') return <Navigate to="/admin/companies" replace />;
  return <LearningHome />;
};

const router = createBrowserRouter([
  // Public Routes
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
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
      { path: '/profile', element: <Profile /> },
      { path: '/resumeCheck', element: <ResumeCheck /> },
      { path: '/learning', element: <LearningHome /> },
      { path: '/internship', element: <Internship /> },
      { path: '/onlineCoding', element: <ProblemSlove /> },
      { path: '/learningVideo', element: <ProtectedRoute><StudyRoadmap /></ProtectedRoute> },
      { path: '/category', element: <ProtectedRoute><Category /></ProtectedRoute> },
      { path: '/quizCategory', element: <ProtectedRoute><QuizCategory /></ProtectedRoute> },

      // Quiz Routes
      { path: '/quiz', element: <QuizHome /> },

      { path: '/htmlQuiz', element: <HtmlQuiz /> },
      { path: '/cssQuiz', element: <CssQuiz /> },
      { path: '/firebaseQuiz', element: <FirebaseQuiz /> },
      { path: '/mongodbQuiz', element: <MongoDBQuiz /> },
      { path: '/mySqlQuiz', element: <MySQLQuiz /> },
      { path: '/angularQuiz', element: <AngularQuiz /> },
      { path: '/reactQuiz', element: <ReactQuiz /> },
      { path: '/bootstrapQuiz', element: <BootstrapQuiz /> },
      { path: '/tailwindQuiz', element: <TailwindQuiz /> },
      { path: '/materialUIQuiz', element: <MaterialUIQuiz /> },
      { path: '/djangoQuiz', element: <DjangoQuiz /> },
      { path: '/nodejsQuiz', element: <NodeJSQuiz /> },
      { path: '/springBootQuiz', element: <SpringBootQuiz /> },
      { path: '/cQuiz', element: <CQuiz /> },
      { path: '/cppQuiz', element: <CPPQuiz /> },
      { path: '/javaQuiz', element: <JavaQuiz /> },
      { path: '/pythonQuiz', element: <PythonQuiz /> },
      { path: '/javaScriptQuiz', element: <JSQuiz /> },
      { path: '/typescriptQuiz', element: <TSQuiz /> },
      { path: '/gitHubQuiz', element: <GitHubQuiz /> },
      { path: '/dockerQuiz', element: <DockerQuiz /> },
      { path: '/reactNativeQuiz', element: <ReactNativeQuiz /> },
      { path: '/flutterQuiz', element: <FlutterQuiz /> },

      // Resume Routes
      { path: "/resume", element: <ResumeHome /> },
      { path: '/templates', element: <ResumeTemplates /> },
      { path: '/resumebuilder', element:  <ProtectedRoute><ResumeBuilder /></ProtectedRoute>},
      { path: '/resume/:id', element: <ResumeDetails /> },
      { path: '/all-resumes', element: <AllResumes /> },
      { path: '/edit-resume/:id', element: <ResumeEdit /> },

      // Admin Routes
      { path: '/admin/companies', element: <ProtectedRoute><Companies /></ProtectedRoute> },
      { path: '/admin/companies/create', element: <ProtectedRoute><CompanyCreate /></ProtectedRoute> },
      { path: '/admin/companies/:id', element: <ProtectedRoute><CompanySetup /></ProtectedRoute> },
      { path: '/admin/jobs', element: <ProtectedRoute><AdminJobs /></ProtectedRoute> },
      { path: '/admin/jobs/create', element: <ProtectedRoute><PostJob /></ProtectedRoute> },
      { path: '/admin/jobs/:id/applicants', element: <ProtectedRoute><Applicants /></ProtectedRoute> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
