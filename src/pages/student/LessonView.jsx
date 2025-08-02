import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { sampleCourses } from '../../data/sampleData';
import { useAuth } from '../../context/AuthContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  FileText, 
  MessageSquare,
  CheckCircle,
  X,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('video');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    // Find the course and lesson
    const foundCourse = sampleCourses.find(c => c.id === courseId);
    
    if (foundCourse) {
      setCourse(foundCourse);
      const foundLesson = foundCourse.lessons?.find(l => l.id === lessonId);
      
      if (foundLesson) {
        setLesson(foundLesson);
      } else {
        // Lesson not found, redirect to course page
        navigate(`/courses/${courseId}`);
      }
    } else {
      // Course not found, redirect to courses page
      navigate('/courses');
    }
  }, [courseId, lessonId, navigate]);

  if (!course || !lesson) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Get the current lesson index
  const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
  const previousLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null;

  // Navigate to previous/next lesson
  const goToPreviousLesson = () => {
    if (previousLesson) {
      navigate(`/courses/${courseId}/lessons/${previousLesson.id}`);
    }
  };

  const goToNextLesson = () => {
    if (nextLesson) {
      navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
    } else {
      // If this is the last lesson, show completion modal
      setShowCompletionModal(true);
    }
  };

  // Mark lesson as completed
  const markAsCompleted = () => {
    // In a real app, this would update the backend
    console.log(`Marking lesson ${lessonId} as completed`);
    
    // Go to next lesson or show completion modal
    if (nextLesson) {
      navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
    } else {
      setShowCompletionModal(true);
    }
  };

  return (
    <div className="flex flex-col h-full -mt-6 -mx-6">
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
        <div className="flex items-center">
          <Link 
            to={`/courses/${courseId}`}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center mr-4"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">Back to course</span>
          </Link>
          <h1 className="text-lg font-medium truncate max-w-md">
            {lesson.title}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <BookOpen size={20} />
          </Button>
          
          <Button 
            variant="primary" 
            size="sm"
            onClick={markAsCompleted}
          >
            Mark as completed
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Lesson Content */}
          <div className="p-6">
            {/* Content Tabs */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-6">
                <button
                  className={`py-3 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'video'
                      ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('video')}
                >
                  Video
                </button>
                <button
                  className={`py-3 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'resources'
                      ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('resources')}
                >
                  Resources
                </button>
                <button
                  className={`py-3 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'discussion'
                      ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('discussion')}
                >
                  Discussion
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'video' && (
                <div className="space-y-6">
                  {/* Video Player */}
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={lesson.videoUrl}
                      title={lesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  {/* Lesson Description */}
                  <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-semibold mb-4">{lesson.title}</h2>
                    <p>{lesson.description}</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, velit nisl bibendum nisl, vel bibendum nisl velit vel bibendum. Sed euismod, velit vel bibendum bibendum, velit nisl bibendum nisl, vel bibendum nisl velit vel bibendum.
                    </p>
                    <h3 className="text-xl font-semibold mt-6 mb-3">Key Takeaways</h3>
                    <ul>
                      <li>Understanding the core concepts of {course.category}</li>
                      <li>How to implement best practices in your projects</li>
                      <li>Common pitfalls to avoid when working with this technology</li>
                      <li>Real-world examples and use cases</li>
                    </ul>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={goToPreviousLesson}
                      disabled={!previousLesson}
                      icon={<ChevronLeft size={16} />}
                    >
                      Previous Lesson
                    </Button>
                    <Button
                      onClick={goToNextLesson}
                      icon={<ChevronRight size={16} />}
                      iconPosition="right"
                    >
                      {nextLesson ? 'Next Lesson' : 'Finish Course'}
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Lesson Resources</h2>
                  
                  <div className="space-y-4">
                    <Card className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText size={20} className="mr-3 text-primary-600" />
                        <div>
                          <h3 className="font-medium">Lesson Slides</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">PDF, 2.4 MB</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        icon={<Download size={16} />}
                      >
                        Download
                      </Button>
                    </Card>
                    
                    <Card className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText size={20} className="mr-3 text-primary-600" />
                        <div>
                          <h3 className="font-medium">Exercise Files</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">ZIP, 1.8 MB</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        icon={<Download size={16} />}
                      >
                        Download
                      </Button>
                    </Card>
                    
                    <Card className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText size={20} className="mr-3 text-primary-600" />
                        <div>
                          <h3 className="font-medium">Additional Reading</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">PDF, 586 KB</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        icon={<Download size={16} />}
                      >
                        Download
                      </Button>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">External Resources</h3>
                    <ul className="space-y-2">
                      <li>
                        <a 
                          href="#" 
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
                        >
                          <span className="mr-2">•</span>
                          Official Documentation
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#" 
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
                        >
                          <span className="mr-2">•</span>
                          Community Forum
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#" 
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
                        >
                          <span className="mr-2">•</span>
                          Related Tutorial
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'discussion' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Lesson Discussion</h2>
                    <Button size="sm">
                      Ask a Question
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <Card className="p-4">
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img 
                              src="https://i.pravatar.cc/150?img=3" 
                              alt="User"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">Alex Thompson</h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400">2 days ago</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            Can someone explain the concept discussed at 12:45? I'm having trouble understanding how it applies to real-world scenarios.
                          </p>
                          <div className="flex items-center">
                            <Button size="sm" variant="ghost" className="text-xs mr-2">
                              Reply
                            </Button>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              2 replies
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img 
                              src="https://i.pravatar.cc/150?img=12" 
                              alt="User"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">Morgan Lee</h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400">1 week ago</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            I found this really helpful! One question though - how would you handle error states in a production environment?
                          </p>
                          <div className="flex items-center">
                            <Button size="sm" variant="ghost" className="text-xs mr-2">
                              Reply
                            </Button>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              5 replies
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
        
        {/* Sidebar - Course Curriculum */}
        <div 
          className={`
            fixed inset-0 z-40 md:relative md:z-0
            ${sidebarOpen ? 'block' : 'hidden md:block'} 
            w-full md:w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto
          `}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="font-semibold">Course Curriculum</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <h3 className="font-medium mb-2">{course.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {course.lessons.length} lessons • {course.duration}
              </p>
            </div>
            
            <div className="space-y-2">
              {course.lessons.map((currLesson, index) => (
                <Link
                  key={currLesson.id}
                  to={`/courses/${courseId}/lessons/${currLesson.id}`}
                  className={`
                    flex items-center p-3 rounded-md
                    ${currLesson.id === lessonId 
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{currLesson.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {currLesson.duration}
                    </p>
                  </div>
                  {currLesson.completed && (
                    <CheckCircle size={16} className="text-success-600 ml-2 flex-shrink-0" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-100 text-success-600 mb-4 dark:bg-success-900 dark:text-success-300">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Course Completed!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Congratulations! You've completed all lessons in this course.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setShowCompletionModal(false)}
                >
                  Close
                </Button>
                <Button
                  as={Link}
                  to={`/courses/${courseId}`}
                  onClick={() => setShowCompletionModal(false)}
                >
                  Back to Course
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};