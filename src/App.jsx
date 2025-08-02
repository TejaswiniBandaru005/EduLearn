import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';

// Student Dashboard Pages
import { StudentDashboard } from './pages/student/Dashboard';
import { CoursesCatalog } from './pages/student/CoursesCatalog';
import { CourseDetail } from './pages/student/CourseDetail';
import { LessonView } from './pages/student/LessonView';
import { Profile } from './pages/student/Profile';
import { EditProfile } from './pages/student/EditProfile';

// Instructor Pages
import { InstructorDashboard } from './pages/instructor/Dashboard';
import { CourseManagement } from './pages/instructor/CourseManagement';
import { CreateCourse } from './pages/instructor/CreateCourse';
import { EditCourse } from './pages/instructor/EditCourse';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Student Dashboard Routes */}
            <Route element={<DashboardLayout role="student" />}>
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/courses" element={<CoursesCatalog />} />
              <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonView />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
            </Route>

            {/* Instructor Dashboard Routes */}
            <Route element={<DashboardLayout role="instructor" />}>
              <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
              <Route path="/instructor/courses" element={<CourseManagement />} />
              <Route path="/instructor/courses/create" element={<CreateCourse />} />
              <Route path="/instructor/courses/:courseId/edit" element={<EditCourse />} />
            </Route>

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
