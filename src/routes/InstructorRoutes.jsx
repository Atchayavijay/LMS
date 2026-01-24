import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import InstructorLayout from '../layouts/InstructorLayout';
import ProtectedRoute from './ProtectedRoute';

// Lazy loading sub-pages
const Dashboard = lazy(() => import('../pages/instructor/Dashboard'));
const MyCourses = lazy(() => import('../pages/instructor/MyCourses'));
const CreateCourse = lazy(() => import('../pages/instructor/CreateCourse'));
const Students = lazy(() => import('../pages/instructor/Students'));
const Analytics = lazy(() => import('../pages/instructor/Analytics'));
const Settings = lazy(() => import('../pages/instructor/Settings'));

/**
 * Specialized Routing Module for the Instructor Dashboard.
 * Supports nested routes under /instructor-dashboard.
 */
const InstructorRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route element={<InstructorLayout />}>
          <Route index element={<Suspense fallback={null}><Dashboard /></Suspense>} />
          <Route path="my-courses" element={<Suspense fallback={null}><MyCourses /></Suspense>} />
          <Route path="create-course" element={<Suspense fallback={null}><CreateCourse /></Suspense>} />
          <Route path="edit-course/:id" element={<Suspense fallback={null}><CreateCourse /></Suspense>} />
          <Route path="students" element={<Suspense fallback={null}><Students /></Suspense>} />
          <Route path="analytics" element={<Suspense fallback={null}><Analytics /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={null}><Settings /></Suspense>} />
          
          {/* Fallback for sub-routes */}
          <Route path="*" element={<Navigate to="" replace />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default InstructorRoutes;
