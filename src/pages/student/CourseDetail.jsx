import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { sampleCourses, userCourseProgress } from '../../data/sampleData';
import { useAuth } from '../../context/AuthContext';

import {
  Clock,
  Award,
  User,
  Play,
  BookOpen,
  CheckCircle,
  Star,
  ChevronRight,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CourseDetail = () => {
  const { courseId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Find the course by ID
    const foundCourse = sampleCourses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Check if user is enrolled
      const enrolled = currentUser?.enrolledCourses?.includes(foundCourse.id);
      setIsEnrolled(enrolled);
      
      // Get progress if enrolled
      if (enrolled) {
        setProgress(userCourseProgress[foundCourse.id] || 0);
      }
    } else {
      // Course not found, redirect to courses page
      navigate('/courses');
    }
  }, [courseId, currentUser, navigate]);

  if (!course) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Find the next lesson to continue (first incomplete lesson)
  const nextLesson = course.lessons?.find(lesson => !lesson.completed);

  // Handle course enrollment
  const handleEnroll = () => {
    // Enrollment logic here (e.g., API call, update context)
    setIsEnrolled(true);
    // Navigate to the first lesson after enrolling
    navigate(`/courses/${course.id}/lessons/${course.lessons[0].id}`);
  };

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-xl overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
        </div>
        
        <div className="relative z-10 p-8 text-white">
          <Badge variant="accent" className="mb-4">
            {course.category}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl">
            {course.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Award size={18} className="mr-2" />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              <span>{course.studentsCount || 0} students</span>
            </div>
            <div className="flex items-center">
              <Star size={18} className="mr-2 text-yellow-400" />
              <span>{course.rating}/5.0</span>
            </div>
          </div>
          
          <p className="text-white/80 text-lg max-w-3xl mb-8">
            {course.description}
          </p>
          
          <div className="flex flex-wrap gap-3">
            {isEnrolled ? (
              <>
                <Button
                  icon={<Play size={18} />}
                  as={Link}
                  to={`/courses/${course.id}/lessons/${nextLesson?.id || course.lessons[0].id}`}
                >
                  {progress > 0 ? 'Continue Learning' : 'Start Learning'}
                </Button>
                {progress > 0 && (
                  <div className="flex items-center text-white/80">
                    <span className="mr-2">{progress}% complete</span>
                    <ProgressBar
                      value={progress}
                      max={100}
                      variant="success"
                      size="sm"
                      className="w-32"
                    />
                  </div>
                )}
              </>
            ) : (
              <Button onClick={handleEnroll}>
                Enroll Now
              </Button>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Course Content Tabs */}
      <div>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 overflow-x-auto">
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === 'overview'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === 'curriculum'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === 'instructor'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('instructor')}
            >
              Instructor
            </button>
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About This Course</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {course.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    By the end of this course, you'll have a strong understanding of {course.category} fundamentals and be able to apply your knowledge to real-world projects. This course is designed for students with {course.level.toLowerCase()} level experience.
                  </p>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-3">What You'll Learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 text-success-600 flex-shrink-0 mt-0.5" />
                      <span>Understand core {course.category} concepts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 text-success-600 flex-shrink-0 mt-0.5" />
                      <span>Apply knowledge in real-world applications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 text-success-600 flex-shrink-0 mt-0.5" />
                      <span>Work on hands-on projects</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'curriculum' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Curriculum</h2>
                  <ul className="space-y-4">
                    {course.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <BookOpen size={20} />
                          <span className="text-lg">{lesson.title}</span>
                        </div>
                        <Link
                          to={`/courses/${course.id}/lessons/${lesson.id}`}
                          className="text-primary-600 hover:underline"
                        >
                          {lesson.completed ? 'Completed' : 'Start'}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'instructor' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Instructor</h2>
                  <div className="flex items-center gap-6">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{course.instructor.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{course.instructor.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Student Reviews</h2>
                  <div className="space-y-4">
                    {course.reviews.map((review, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={review.user.avatar}
                            alt={review.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{review.user.name}</h3>
                            <span className="text-yellow-400">{review.rating}/5</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
