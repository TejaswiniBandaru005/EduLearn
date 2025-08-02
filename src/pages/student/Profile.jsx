import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { studentStats, sampleCourses, userCourseProgress } from '../../data/sampleData';
import { 
  Calendar, 
  Clock, 
  Award, 
  BookOpen, 
  Mail, 
  User,
  MapPin,
  Edit,
  Download,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Profile = () => {
  const { currentUser } = useAuth();
  
  // Get enrolled courses for current user
  const enrolledCourses = sampleCourses.filter(course => 
    currentUser?.enrolledCourses?.includes(course.id)
  );
  
  // Completed courses (100% progress)
  const completedCourses = enrolledCourses.filter(course => 
    userCourseProgress[course.id] === 100
  );
  
  // Calculate average progress across all enrolled courses
  const averageProgress = enrolledCourses.length 
    ? enrolledCourses.reduce((sum, course) => sum + (userCourseProgress[course.id] || 0), 0) / enrolledCourses.length
    : 0;

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden">
          {/* Cover Image */}
          <div className="h-40 bg-gradient-to-r from-primary-600 to-primary-400"></div>
          
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-end -mt-20 mb-6">
              {/* Profile Avatar */}
              <div className="md:mr-6">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white">
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* User Info */}
              <div className="mt-4 md:mt-0 flex-1">
                <h1 className="text-2xl font-bold">{currentUser?.name}</h1>
                <p className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
                  <User size={16} className="mr-1" />
                  <span>{currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)}</span>
                  <span className="mx-2">•</span>
                  <span>Joined April 2025</span>
                </p>
              </div>
              
              {/* Edit Profile Button */}
              <div className="mt-4 md:mt-0">
                <Button 
                  as={Link} 
                  to="/profile/edit"
                  icon={<Edit size={16} />}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Enrolled Courses</p>
                <p className="text-2xl font-semibold">{enrolledCourses.length}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Completed</p>
                <p className="text-2xl font-semibold">{completedCourses.length}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Hours Learned</p>
                <p className="text-2xl font-semibold">{studentStats.totalHoursLearned}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Avg. Score</p>
                <p className="text-2xl font-semibold">{studentStats.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - About & Contact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* About Me */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Frontend developer passionate about creating beautiful and functional user interfaces. Currently learning advanced React patterns and improving my skills in UI/UX design.
              </p>
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Mail size={16} className="mr-2 text-gray-400" />
                  <span>{currentUser?.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-gray-400" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-400" />
                  <span>Joined April 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Skills & Interests */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Skills & Interests</h2>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>React</Badge>
                  <Badge>JavaScript</Badge>
                  <Badge>HTML/CSS</Badge>
                  <Badge>UI Design</Badge>
                  <Badge>Tailwind CSS</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Web Development</Badge>
                  <Badge variant="secondary">UX Research</Badge>
                  <Badge variant="secondary">Mobile Apps</Badge>
                  <Badge variant="secondary">AI</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Achievements */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Achievements</h2>
              {studentStats.certificatesEarned > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-success-100 dark:bg-success-900 flex items-center justify-center">
                        <Award size={20} className="text-success-600 dark:text-success-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Course Completion: Web Development</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Earned April 2025</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Award size={32} className="mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Complete courses to earn achievements
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Right Column - Learning Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Learning Summary */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Learning Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <BookOpen size={18} className="mr-2 text-primary-600" />
                    <h3 className="font-medium">Course Progress</h3>
                  </div>
                  <p className="text-2xl font-semibold mb-1">
                    {Math.round(averageProgress)}%
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Average completion
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock size={18} className="mr-2 text-primary-600" />
                    <h3 className="font-medium">Learning Time</h3>
                  </div>
                  <p className="text-2xl font-semibold mb-1">
                    {studentStats.totalHoursLearned}h
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total hours spent
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Award size={18} className="mr-2 text-primary-600" />
                    <h3 className="font-medium">Achievements</h3>
                  </div>
                  <p className="text-2xl font-semibold mb-1">
                    {studentStats.certificatesEarned}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Certificates earned
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Recent Learning Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img 
                          src={enrolledCourses[0]?.image}
                          alt={enrolledCourses[0]?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{enrolledCourses[0]?.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Completed lesson: {enrolledCourses[0]?.lessons[0]?.title}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      2 days ago
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img 
                          src={enrolledCourses[1]?.image}
                          alt={enrolledCourses[1]?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{enrolledCourses[1]?.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Started new lesson: {enrolledCourses[1]?.lessons[1]?.title}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      5 days ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Enrolled Courses */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Enrolled Courses</h2>
                <Link 
                  to="/courses"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  View all
                </Link>
              </div>
              
              {enrolledCourses.length > 0 ? (
                <div className="space-y-4">
                  {enrolledCourses.map(course => (
                    <Link 
                      key={course.id}
                      to={`/courses/${course.id}`}
                      className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="mr-3 flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <img 
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium mb-1">{course.title}</h3>
                          <Badge variant="secondary" className="ml-2">
                            {course.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {course.lessons.length} lessons • {course.duration}
                        </p>
                        <div className="flex items-center text-sm">
                          <div className="w-full mr-4">
                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                              <div 
                                className="h-full bg-success-500 rounded-full"
                                style={{ width: `${userCourseProgress[course.id] || 0}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-gray-600 dark:text-gray-300 whitespace-nowrap">
                            {userCourseProgress[course.id] || 0}%
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <BookOpen size={32} className="mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    You haven't enrolled in any courses yet
                  </p>
                  <Button as={Link} to="/courses">
                    Browse Courses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Certificates */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Certificates</h2>
              
              {studentStats.certificatesEarned > 0 ? (
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="mr-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          <Award size={24} className="text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">Web Development Fundamentals</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Issued April 2025
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        icon={<ExternalLink size={16} />}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        icon={<Download size={16} />}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Award size={32} className="mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Complete courses to earn certificates
                  </p>
                  <Button as={Link} to="/courses">
                    Browse Courses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};