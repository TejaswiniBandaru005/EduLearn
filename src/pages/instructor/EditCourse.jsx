import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { FormGroup, Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { sampleCourses, courseCategories, courseLevels } from '../../data/sampleData';
import { useAuth } from '../../context/AuthContext';
import { 
  ArrowLeft,
  Image, 
  X, 
  Plus,
  Clock,
  DollarSign,
  Save,
  Trash2,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';

export const EditCourse = () => {
  const { courseId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Selected tab for settings
  const [activeTab, setActiveTab] = useState('basic');
  
  useEffect(() => {
    // Fetch the course data
    const foundCourse = sampleCourses.find(c => c.id === courseId);
    
    if (foundCourse && foundCourse.instructorId === currentUser?.id) {
      setCourse(foundCourse);
    } else {
      // Course not found or doesn't belong to this instructor
      navigate('/instructor/courses');
    }
    
    setIsLoading(false);
  }, [courseId, currentUser, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!course) {
    return null;
  }
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle lesson changes
  const handleLessonChange = (index, field, value) => {
    setCourse(prev => {
      const updatedLessons = [...prev.lessons];
      updatedLessons[index] = {
        ...updatedLessons[index],
        [field]: value
      };
      return {
        ...prev,
        lessons: updatedLessons
      };
    });
  };
  
  // Add a new lesson
  const addLesson = () => {
    setCourse(prev => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        {
          id: Date.now().toString(),
          title: '',
          description: '',
          duration: '',
          videoUrl: '',
          completed: false
        }
      ]
    }));
  };
  
  // Remove a lesson
  const removeLesson = (index) => {
    setCourse(prev => {
      const updatedLessons = [...prev.lessons];
      updatedLessons.splice(index, 1);
      return {
        ...prev,
        lessons: updatedLessons
      };
    });
  };
  
  // Save course changes
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // In a real app, this would save the course changes to the backend
    setTimeout(() => {
      console.log('Course updated:', course);
      setIsSaving(false);
      navigate('/instructor/courses');
    }, 1500);
  };
  
  // Delete course
  const handleDelete = () => {
    // In a real app, this would delete the course from the backend
    console.log('Course deleted:', course.id);
    setShowDeleteModal(false);
    navigate('/instructor/courses');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              as={Link}
              to="/instructor/courses"
              className="mr-2"
              icon={<ArrowLeft size={16} />}
            >
              Back
            </Button>
            <h1 className="text-2xl font-bold">Edit Course</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {course.title}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            className="text-error-600 border-error-200 hover:bg-error-50 dark:text-error-400 dark:border-error-800 dark:hover:bg-error-900/30"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
          <Button 
            as={Link}
            to={`/courses/${course.id}`}
            variant="outline"
            icon={<Eye size={16} />}
          >
            Preview
          </Button>
          <Button 
            type="button"
            onClick={handleSubmit}
            isLoading={isSaving}
            icon={<Save size={16} />}
          >
            Save Changes
          </Button>
        </div>
      </div>
      
      {/* Status Badge */}
      <div className="flex items-center">
        <Badge 
          variant={
            course.status === 'published' ? 'success' : 
            course.status === 'draft' ? 'warning' : 'secondary'
          }
        >
          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
        </Badge>
        {course.featured && (
          <Badge variant="accent" className="ml-2">
            Featured
          </Badge>
        )}
      </div>
      
      {/* Edit Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 overflow-x-auto">
          <button
            type="button"
            className={`py-4 px-1 font-medium text-sm border-b-2 ${
              activeTab === 'basic'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button
            type="button"
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
            type="button"
            className={`py-4 px-1 font-medium text-sm border-b-2 ${
              activeTab === 'pricing'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('pricing')}
          >
            Pricing
          </button>
          <button
            type="button"
            className={`py-4 px-1 font-medium text-sm border-b-2 ${
              activeTab === 'settings'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <Card>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <FormGroup label="Course Title" htmlFor="title">
                  <Input
                    id="title"
                    name="title"
                    value={course.title}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup label="Description" htmlFor="description">
                  <textarea
                    id="description"
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                    rows={4}
                    className="input pt-2"
                    required
                  ></textarea>
                </FormGroup>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup label="Category" htmlFor="category">
                    <select
                      id="category"
                      name="category"
                      value={course.category}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="" disabled>Select a category</option>
                      {courseCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </FormGroup>
                  
                  <FormGroup label="Level" htmlFor="level">
                    <select
                      id="level"
                      name="level"
                      value={course.level}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="" disabled>Select a level</option>
                      {courseLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </FormGroup>
                </div>
                
                <FormGroup label="Course Duration" htmlFor="duration">
                  <Input
                    id="duration"
                    name="duration"
                    value={course.duration}
                    onChange={handleChange}
                    required
                    icon={<Clock size={18} />}
                  />
                </FormGroup>
                
                <FormGroup label="Course Image" htmlFor="image">
                  <div className="flex flex-col space-y-4">
                    {course.image && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <img
                          src={course.image}
                          alt="Course cover"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md"
                          onClick={() => setCourse(prev => ({ ...prev, image: '' }))}
                        >
                          <X size={16} className="text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Input
                        id="image"
                        name="image"
                        value={course.image}
                        onChange={handleChange}
                        placeholder="Enter image URL or upload an image"
                        className="flex-1"
                        icon={<Image size={18} />}
                      />
                      <Button type="button" variant="outline">
                        Upload
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Recommended size: 1280x720 pixels (16:9 ratio)
                    </p>
                  </div>
                </FormGroup>
              </motion.div>
            )}
            
            {/* Curriculum Tab */}
            {activeTab === 'curriculum' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Course Lessons</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {course.lessons.length} {course.lessons.length === 1 ? 'lesson' : 'lessons'}
                  </p>
                </div>
                
                <div className="space-y-6">
                  {course.lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id} 
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium mr-2">
                            {index + 1}
                          </span>
                          <h3 className="font-medium">
                            {lesson.title || `Lesson ${index + 1}`}
                          </h3>
                        </div>
                        
                        {course.lessons.length > 1 && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            className="text-error-600 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300"
                            onClick={() => removeLesson(index)}
                            icon={<Trash2 size={16} />}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <FormGroup label="Lesson Title" htmlFor={`lesson-title-${index}`}>
                          <Input
                            id={`lesson-title-${index}`}
                            value={lesson.title}
                            onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                            placeholder="e.g., Introduction to HTML"
                            required
                          />
                        </FormGroup>
                        
                        <FormGroup label="Description" htmlFor={`lesson-description-${index}`}>
                          <textarea
                            id={`lesson-description-${index}`}
                            value={lesson.description}
                            onChange={(e) => handleLessonChange(index, 'description', e.target.value)}
                            placeholder="What will students learn in this lesson?"
                            rows={2}
                            className="input pt-2"
                            required
                          ></textarea>
                        </FormGroup>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormGroup label="Duration" htmlFor={`lesson-duration-${index}`}>
                            <Input
                              id={`lesson-duration-${index}`}
                              value={lesson.duration}
                              onChange={(e) => handleLessonChange(index, 'duration', e.target.value)}
                              placeholder="e.g., 45 min"
                              required
                              icon={<Clock size={18} />}
                            />
                          </FormGroup>
                          
                          <FormGroup label="Video URL" htmlFor={`lesson-video-${index}`}>
                            <Input
                              id={`lesson-video-${index}`}
                              value={lesson.videoUrl}
                              onChange={(e) => handleLessonChange(index, 'videoUrl', e.target.value)}
                              placeholder="e.g., https://youtube.com/embed/..."
                              icon={<Image size={18} />}
                            />
                          </FormGroup>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id={`lesson-completed-${index}`}
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            checked={lesson.completed || false}
                            onChange={(e) => handleLessonChange(index, 'completed', e.target.checked)}
                          />
                          <label htmlFor={`lesson-completed-${index}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Mark as completed for demo/testing purposes
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={addLesson}
                    icon={<Plus size={16} />}
                  >
                    Add Lesson
                  </Button>
                </div>
              </motion.div>
            )}
            
            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <FormGroup label="Course Price ($)" htmlFor="price">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={course.price}
                    onChange={handleChange}
                    required
                    icon={<DollarSign size={18} />}
                  />
                </FormGroup>
                
                <div className="flex items-center">
                  <input
                    id="free"
                    name="free"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={course.price === 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCourse(prev => ({
                          ...prev,
                          price: 0
                        }));
                      } else {
                        setCourse(prev => ({
                          ...prev,
                          price: ''
                        }));
                      }
                    }}
                  />
                  <label htmlFor="free" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Offer this course for free
                  </label>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Course Stats</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Students Enrolled</p>
                      <p className="text-xl font-semibold">{course.studentsCount || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                      <p className="text-xl font-semibold">{course.rating || 0} / 5.0</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                      <p className="text-xl font-semibold">${(course.price * (course.studentsCount || 0)).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-medium mb-4">Promotional Pricing</h3>
                  
                  <div className="flex items-center mb-4">
                    <input
                      id="discount"
                      name="discount"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="discount" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Enable promotional pricing
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-50">
                    <FormGroup label="Discounted Price ($)" htmlFor="discountPrice">
                      <Input
                        id="discountPrice"
                        name="discountPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g., 39.99"
                        disabled
                        icon={<DollarSign size={18} />}
                      />
                    </FormGroup>
                    
                    <FormGroup label="Promotion End Date" htmlFor="promoEnd">
                      <Input
                        id="promoEnd"
                        name="promoEnd"
                        type="date"
                        disabled
                      />
                    </FormGroup>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <FormGroup label="Course Status" htmlFor="status">
                  <select
                    id="status"
                    name="status"
                    value={course.status}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="draft">Draft (not visible to students)</option>
                    <option value="review">Submit for Review</option>
                    <option value="published">Published (visible to everyone)</option>
                  </select>
                </FormGroup>
                
                <div className="flex items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={course.featured}
                    onChange={handleChange}
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Feature this course (will be highlighted on the platform)
                  </label>
                </div>
                
                <FormGroup label="Language" htmlFor="language">
                  <select
                    id="language"
                    name="language"
                    className="input"
                    defaultValue="English"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </FormGroup>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-medium mb-4">Course Access Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="lifetime"
                        name="accessType"
                        type="radio"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        defaultChecked
                      />
                      <label htmlFor="lifetime" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Lifetime access
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="limited"
                        name="accessType"
                        type="radio"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="limited" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Limited access
                      </label>
                    </div>
                    
                    <div className="pl-6 opacity-50">
                      <FormGroup label="Access Duration (days)" htmlFor="accessDuration">
                        <Input
                          id="accessDuration"
                          name="accessDuration"
                          type="number"
                          min="1"
                          placeholder="e.g., 90"
                          disabled
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-medium mb-4">Danger Zone</h3>
                  
                  <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4">
                    <h4 className="text-error-600 dark:text-error-400 font-medium mb-2">Delete Course</h4>
                    <p className="text-error-600 dark:text-error-400 text-sm mb-3">
                      Once you delete a course, there is no going back. This action cannot be undone.
                    </p>
                    <Button 
                      type="button" 
                      className="bg-error-600 hover:bg-error-700 text-white"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Delete Course
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="flex justify-end mt-8">
              <Button 
                type="submit"
                isLoading={isSaving}
                icon={<Save size={16} />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Card>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-error-100 text-error-600 mb-4 dark:bg-error-900 dark:text-error-400">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Delete Course</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Are you sure you want to delete "<span className="font-medium">{course.title}</span>"? This action cannot be undone.
              </p>
              
              {course.studentsCount > 0 && (
                <div className="mt-4 p-3 bg-warning-50 text-warning-600 rounded-md text-sm dark:bg-warning-900/30 dark:text-warning-400">
                  <p>
                    Warning: This course has {course.studentsCount} enrolled students. Deleting it will remove their access.
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                className="bg-error-600 hover:bg-error-700"
                onClick={handleDelete}
              >
                Delete Course
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};