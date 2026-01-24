import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';

// Lazy loading pages for better performance (Code Splitting)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const InstructorSignUp = lazy(() => import('./pages/InstructorSignUp'));
const EnrollmentForm = lazy(() => import('./pages/instructor/EnrollmentForm'));
const WaitingForApproval = lazy(() => import('./pages/WaitingForApproval'));
const InternalPage = lazy(() => import('./components/InternalPage/InternalPage'));

// Placeholder for future features
const Dashboard = lazy(() => import('./pages/dashboard/StudentDashboard'));
const CourseList = lazy(() => import('./pages/courses/CourseListPage'));
import InstructorRoutes from './routes/InstructorRoutes';

/**
 * Route Configuration
 * Supports public routes, auth routes, and protected routes.
 */
function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-[#0c091a] flex items-center justify-center text-white">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
          <Route path="/course-details" element={<InternalPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/instructor-signup" element={<InstructorSignUp />} />


          <Route element={<ProtectedRoute />}>
            <Route path="/instructor-enrollment" element={<EnrollmentForm />} />
            <Route path="/waiting-approval" element={<WaitingForApproval />} />
          </Route>

          {/* Protected Routes (Authenticated Users) */}
          <Route >
            <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/courses" element={<MainLayout><CourseList /></MainLayout>} />
          </Route>

          {/* Instructor Domain - Nested Route Module */}
          <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
            <Route path="/instructor-dashboard/*" element={<InstructorRoutes />} />
          </Route>

          {/* Role-Specific Examples */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            {/* Admin only routes would go here */}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
