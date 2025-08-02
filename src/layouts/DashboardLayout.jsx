import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap as Graduation,
  Home,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Plus,
  Sun,
  Moon,
} from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';

export const DashboardLayout = ({ role = 'student' }) => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { replace: true });
    } else if (role === 'instructor' && currentUser.role !== 'instructor') {
      navigate('/dashboard', { replace: true });
    } else if (role === 'student' && currentUser.role !== 'student') {
      navigate('/instructor/dashboard', { replace: true });
    }
  }, [currentUser, role, navigate]);

  if (
    !currentUser ||
    (role === 'instructor' && currentUser.role !== 'instructor') ||
    (role === 'student' && currentUser.role !== 'student')
  ) {
    // Show nothing or a loader while redirecting
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Navigation links based on role
  const navLinks =
    role === 'student'
      ? [
          { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
          { path: '/courses', label: 'Courses', icon: <BookOpen size={20} /> },
          { path: '/profile', label: 'Profile', icon: <User size={20} /> },
        ]
      : [
          {
            path: '/instructor/dashboard',
            label: 'Dashboard',
            icon: <Home size={20} />,
          },
          {
            path: '/instructor/courses',
            label: 'My Courses',
            icon: <BookOpen size={20} />,
          },
        ];

  // Get the current page title based on the path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/instructor/dashboard')
      return 'Dashboard';
    if (path === '/courses') return 'Course Catalog';
    if (path.includes('/courses/') && !path.includes('/lessons/'))
      return 'Course Details';
    if (path.includes('/lessons/')) return 'Lesson';
    if (path === '/profile') return 'Profile';
    if (path === '/profile/edit') return 'Edit Profile';
    if (path === '/instructor/courses') return 'Course Management';
    if (path === '/instructor/courses/create') return 'Create New Course';
    if (path.includes('/instructor/courses/') && path.includes('/edit'))
      return 'Edit Course';
    return 'Dashboard';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sidebar variants for animation
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: {
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              aria-label="Open sidebar menu"
              className="lg:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <Graduation className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden md:inline-block">
                EduLearn
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {role === 'instructor' && (
              <Button
                size="sm"
                className="hidden md:flex"
                icon={<Plus size={16} />}
                onClick={() => navigate('/instructor/courses/create')}
              >
                New Course
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentUser.name}
              </span>
              <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="fixed inset-0 z-50 lg:hidden bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
            >
              <motion.nav
                className="absolute top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 p-4 overflow-y-auto"
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Graduation className="h-8 w-8 text-primary-600" />
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      EduLearn
                    </span>
                  </div>
                  <button
                    aria-label="Close sidebar menu"
                    className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    onClick={toggleSidebar}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </NavLink>
                  ))}
                  <button
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={handleLogout}
                  >
                    <LogOut size={20} />
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
              <button
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={handleLogout}
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {getPageTitle()}
            </h1>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  role: PropTypes.oneOf(['student', 'instructor']),
};
