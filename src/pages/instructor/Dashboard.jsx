import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/dashboard/StatCard';
import { CourseCard } from '../../components/dashboard/CourseCard';
import { ActivityChart } from '../../components/dashboard/ActivityChart';
import { useAuth } from '../../context/AuthContext';
import { 
  sampleCourses, 
  instructorStats, 
  revenueData 
} from '../../data/sampleData';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Star, 
  ArrowRight,
  BarChart3,
  Plus
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Custom Hook for fetching instructor courses
const useInstructorCourses = (courses, userId) => {
  return courses.filter(course => course.instructorId === userId);
};

export const InstructorDashboard = () => {
  const { currentUser } = useAuth();

  // Handle case where currentUser may not exist
  if (!currentUser) {
    return <div>Loading...</div>; // Or you can redirect to login
  }

  // Get courses created by the current instructor
  const instructorCourses = useInstructorCourses(sampleCourses, currentUser.id);

  // Avoid division by zero for progress bars
  const totalCoursesCount = instructorCourses.length || 1; 

  // Filter courses by status
  const publishedCourses = instructorCourses.filter(course => course.status === 'published');
  const draftCourses = instructorCourses.filter(course => course.status === 'draft');
  const reviewCourses = instructorCourses.filter(course => course.status === 'review');

  // Animation variants for motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-xl p-6 text-white">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {currentUser.name || 'Instructor'}!</h1>
          <p className="opacity-90 mb-4">Manage your courses and track your student engagement.</p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Button 
              as={Link}
              to="/instructor/courses/create"
              icon={<Plus size={16} />}
            >
              Create New Course
            </Button>
            <Button 
              variant="outline"
              className="bg-white/10 border-white/20 hover:bg-white/20"
            >
              View Analytics
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Overview */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value={instructorStats.totalStudents}
            icon={<Users size={20} />}
            change="12.5%"
            changeType="increase"
          />
          <StatCard
            title="Active Courses"
            value={instructorStats.totalCourses}
            icon={<BookOpen size={20} />}
          />
          <StatCard
            title="Total Revenue"
            value={`$${instructorStats.totalRevenue.toLocaleString()}`}
            icon={<DollarSign size={20} />}
            change="8.3%"
            changeType="increase"
          />
          <StatCard
            title="Average Rating"
            value={instructorStats.averageRating}
            icon={<Star size={20} />}
            change="0.2"
            changeType="increase"
          />
        </div>
      </motion.div>
      
      {/* Revenue Chart */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4">Revenue</h2>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium">Monthly Revenue</h3>
              <p className="text-gray-500 dark:text-gray-400">Last 6 months</p>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0ea5e9"
                  fill="rgba(14, 165, 233, 0.2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>
      
      {/* Course Management */}
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Courses</h2>
          <Link to="/instructor/courses" className="text-primary-600 text-sm font-medium flex items-center hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Manage all courses <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {instructorCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructorCourses.slice(0, 3).map(course => (
              <CourseCard 
                key={course.id} 
                course={course}
                instructorView={true}
              />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any courses yet.</p>
            <Button 
              as={Link} 
              to="/instructor/courses/create"
              icon={<Plus size={16} />}
            >
              Create Your First Course
            </Button>
          </Card>
        )}
      </motion.div>
      
      {/* Course Stats */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4">Course Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Course Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Course Status</h3>
              <BarChart3 size={20} className="text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Published</span>
                  <span className="text-sm font-medium">{publishedCourses.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    className="bg-success-500 h-2 rounded-full" 
                    style={{ width: `${(publishedCourses.length / totalCoursesCount) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Draft</span>
                  <span className="text-sm font-medium">{draftCourses.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    className="bg-warning-500 h-2 rounded-full" 
                    style={{ width: `${(draftCourses.length / totalCoursesCount) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">In Review</span>
                  <span className="text-sm font-medium">{reviewCourses.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    className="bg-danger-500 h-2 rounded-full" 
                    style={{ width: `${(reviewCourses.length / totalCoursesCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Activity Chart */}
          <ActivityChart />
        </div>
      </motion.div>
    </motion.div>
  );
};
