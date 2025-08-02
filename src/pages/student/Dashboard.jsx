import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- Added useNavigate import
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/dashboard/StatCard';
import { CourseCard } from '../../components/dashboard/CourseCard';
import { ActivityChart } from '../../components/dashboard/ActivityChart';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useAuth } from '../../context/AuthContext';
import { sampleCourses, weeklyActivityData, userCourseProgress, studentStats } from '../../data/sampleData';
import { BookOpen, Clock, Award, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // <-- Added navigate hook

  // Get enrolled courses for the current user
  const enrolledCourses = sampleCourses.filter(course => 
    currentUser?.enrolledCourses?.includes(course.id)
  );

  // In-progress courses (those with progress > 0% but < 100%)
  const inProgressCourses = enrolledCourses.filter(course => 
    userCourseProgress[course.id] > 0 && userCourseProgress[course.id] < 100
  ).sort((a, b) => userCourseProgress[b.id] - userCourseProgress[a.id]);

  // Find the next lesson to continue (first in-progress course)
  const nextCourse = inProgressCourses[0];
  const nextLesson = nextCourse?.lessons?.find(lesson => !lesson.completed);

  // Recently viewed course (could come from API/localStorage in a real app)
  const recentCourse = enrolledCourses[0];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {currentUser?.name}!</h1>
          <p className="opacity-90 mb-4">You've completed {studentStats.totalHoursLearned} hours of learning so far.</p>

          {nextLesson && nextCourse && (
            <div className="mt-6">
              <p className="text-sm font-medium text-white/80 mb-2">Pick up where you left off:</p>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="mr-4 flex-shrink-0">
                    <div className="w-16 h-16 rounded-md overflow-hidden">
                      <img 
                        src={nextCourse.image} 
                        alt={`Course: ${nextCourse.title}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-white/90">{nextCourse.title}</h3>
                    <p className="text-xs text-white/70">{nextLesson.title}</p>
                    <div className="mt-2">
                      <ProgressBar 
                        value={userCourseProgress[nextCourse.id]} 
                        max={100}
                        size="sm"
                        barClassName="bg-white/90"
                      />
                    </div>
                  </div>
                  {/* Added onClick to the Button, no other line changed */}
                  <Button 
                    size="sm"
                    variant="secondary"
                    className="ml-4"
                    icon={<Play size={16} />}
                    onClick={() => {
                      if (nextCourse && nextLesson) {
                        navigate(`/courses/${nextCourse.id}/lessons/${nextLesson.id}`);
                      }
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4">Your Learning Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Enrolled Courses"
            value={studentStats.totalCoursesEnrolled}
            icon={<BookOpen size={20} />}
          />
          <StatCard
            title="Learning Hours"
            value={`${studentStats.totalHoursLearned}h`}
            icon={<Clock size={20} />}
            change="12.5%"
            changeType="increase"
          />
          <StatCard
            title="Completed Courses"
            value={studentStats.completedCourses}
            icon={<Award size={20} />}
          />
          <StatCard
            title="Average Score"
            value={`${studentStats.averageScore}%`}
            icon={<Award size={20} />}
            change="4.2%"
            changeType="increase"
          />
        </div>
      </motion.div>

      {/* Learning Activity */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4">Your Learning Activity</h2>
        <ActivityChart 
          data={weeklyActivityData} 
          title="Weekly Learning Hours" 
        />
      </motion.div>

      {/* In Progress Courses */}
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">In Progress</h2>
          <Link to="/courses" className="text-primary-600 text-sm font-medium flex items-center hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            View all courses <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {inProgressCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.slice(0, 3).map(course => (
              <CourseCard 
                key={course.id} 
                course={course}
                progress={userCourseProgress[course.id]}
              />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't started any courses yet.</p>
            <Button as={Link} to="/courses">
              Browse courses
            </Button>
          </Card>
        )}
      </motion.div>

      {/* Recommended Courses */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCourses
            .filter(course => course.featured && !currentUser?.enrolledCourses?.includes(course.id))
            .slice(0, 3)
            .map(course => (
              <CourseCard 
                key={course.id} 
                course={course}
              />
            ))}
        </div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
        <Card className="p-6">
          {studentStats.certificatesEarned > 0 ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-100 text-success-600 mb-4 dark:bg-success-900 dark:text-success-300">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Congratulations!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You've earned {studentStats.certificatesEarned} certificate{studentStats.certificatesEarned > 1 ? 's' : ''}.
              </p>
              <Button variant="outline">
                View Certificates
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-600 mb-4 dark:bg-gray-800 dark:text-gray-300">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Achievements Yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Complete courses to earn certificates and achievements.
              </p>
              <Button as={Link} to="/courses">
                Browse courses
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};
