import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { FormGroup, Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { courseCategories, courseLevels } from '../../data/sampleData';
import { useAuth } from '../../context/AuthContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Image, 
  X, 
  Plus,
  Clock,
  DollarSign,
  Save,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CreateCourse = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Course creation steps
  const steps = [
    'Basic Information',
    'Course Content',
    'Pricing & Settings',
    'Review & Submit'
  ];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Course form data
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    language: 'English',
    price: '',
    duration: '',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    status: 'draft',
    lessons: [
      {
        id: Date.now().toString(),
        title: '',
        description: '',
        duration: '',
        videoUrl: '',
      }
    ]
  });
  
  // Selected tab for settings
  const [settingsTab, setSettingsTab] = useState('pricing');
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle lesson changes
  const handleLessonChange = (index, field, value) => {
    setCourseData(prev => {
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
    setCourseData(prev => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        {
          id: Date.now().toString(),
          title: '',
          description: '',
          duration: '',
          videoUrl: '',
        }
      ]
    }));
  };
  
  // Remove a lesson
  const removeLesson = (index) => {
    setCourseData(prev => {
      const updatedLessons = [...prev.lessons];
      updatedLessons.splice(index, 1);
      return {
        ...prev,
        lessons: updatedLessons
      };
    });
  };
  
  // Navigation between steps
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Submit the course
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would send the course data to the backend
    setTimeout(() => {
      console.log('Course created:', courseData);
      setIsSubmitting(false);
      navigate('/instructor/courses');
    }, 1500);
  };
  
  // Save as draft
  const saveAsDraft = () => {
    setIsSubmitting(true);
    
    // In a real app, this would save the course as a draft
    setTimeout(() => {
      console.log('Course saved as draft:', courseData);
      setIsSubmitting(false);
      navigate('/instructor/courses');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Create New Course</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create and publish your course in a few easy steps
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={saveAsDraft}
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
        </div>
      </div>
      
      {/* Progress Steps */}
      <div className="relative">
        <div className="hidden sm:block absolute top-4 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700">
          <div 
            className="absolute top-0 h-full bg-primary-600 transition-all"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div 
              key={step} 
              className={`flex flex-col items-center ${index < currentStep ? 'text-primary-600 dark:text-primary-400' : ''}`}
            >
              <div 
                className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full ${
                  index === currentStep 
                    ? 'bg-primary-600 text-white' 
                    : index < currentStep 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {index < currentStep ? (
                  <svg className="w-5 h-5\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24">
                    <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className="mt-2 text-sm font-medium hidden sm:block">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Step Content */}
      <Card>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                
                <FormGroup label="Course Title" htmlFor="title">
                  <Input
                    id="title"
                    name="title"
                    value={courseData.title}
                    onChange={handleChange}
                    placeholder="e.g., Complete Web Development Bootcamp"
                    required
                  />
                </FormGroup>
                
                <FormGroup label="Description" htmlFor="description">
                  <textarea
                    id="description"
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    placeholder="Describe your course and what students will learn..."
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
                      value={courseData.category}
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
                      value={courseData.level}
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
                    value={courseData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 8 weeks"
                    required
                    icon={<Clock size={18} />}
                  />
                </FormGroup>
                
                <FormGroup label="Course Image" htmlFor="image">
                  <div className="flex flex-col space-y-4">
                    {courseData.image && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <img
                          src={courseData.image}
                          alt="Course cover"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md"
                          onClick={() => setCourseData(prev => ({ ...prev, image: '' }))}
                        >
                          <X size={16} className="text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Input
                        id="image"
                        name="image"
                        value={courseData.image}
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
            
            {/* Step 2: Course Content */}
            {currentStep === 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Add lessons to your course. You can reorder them later.
                </p>
                
                <div className="space-y-6">
                  {courseData.lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id} 
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Lesson {index + 1}</h3>
                        {courseData.lessons.length > 1 && (
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
            
            {/* Step 3: Pricing & Settings */}
            {currentStep === 2 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4">Pricing & Settings</h2>
                
                {/* Settings Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex space-x-8 overflow-x-auto">
                    <button
                      type="button"
                      className={`py-4 px-1 font-medium text-sm border-b-2 ${
                        settingsTab === 'pricing'
                          ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setSettingsTab('pricing')}
                    >
                      Pricing
                    </button>
                    <button
                      type="button"
                      className={`py-4 px-1 font-medium text-sm border-b-2 ${
                        settingsTab === 'requirements'
                          ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setSettingsTab('requirements')}
                    >
                      Requirements
                    </button>
                    <button
                      type="button"
                      className={`py-4 px-1 font-medium text-sm border-b-2 ${
                        settingsTab === 'visibility'
                          ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setSettingsTab('visibility')}
                    >
                      Visibility
                    </button>
                  </nav>
                </div>
                
                {/* Pricing Tab */}
                {settingsTab === 'pricing' && (
                  <div className="space-y-6">
                    <FormGroup label="Course Price ($)" htmlFor="price">
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={courseData.price}
                        onChange={handleChange}
                        placeholder="e.g., 49.99"
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
                        checked={courseData.price === '0'}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCourseData(prev => ({
                              ...prev,
                              price: '0'
                            }));
                          } else {
                            setCourseData(prev => ({
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
                      <h3 className="font-medium mb-2">Pricing Tips</h3>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Consider the value and depth of your content</li>
                        <li>• Research similar courses in your category</li>
                        <li>• Free courses can attract more students but may be perceived as lower quality</li>
                        <li>• Introductory prices can help build momentum</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* Requirements Tab */}
                {settingsTab === 'requirements' && (
                  <div className="space-y-6">
                    <FormGroup label="Prerequisites" htmlFor="prerequisites">
                      <textarea
                        id="prerequisites"
                        name="prerequisites"
                        placeholder="What should students know before taking this course?"
                        rows={3}
                        className="input pt-2"
                      ></textarea>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        List any skills, knowledge, or tools students should have before starting.
                      </p>
                    </FormGroup>
                    
                    <FormGroup label="Target Audience" htmlFor="audience">
                      <textarea
                        id="audience"
                        name="audience"
                        placeholder="Who is this course for?"
                        rows={3}
                        className="input pt-2"
                      ></textarea>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Describe who will benefit most from taking your course.
                      </p>
                    </FormGroup>
                    
                    <FormGroup label="What Students Will Learn" htmlFor="outcomes">
                      <textarea
                        id="outcomes"
                        name="outcomes"
                        placeholder="What will students be able to do after completing this course?"
                        rows={3}
                        className="input pt-2"
                      ></textarea>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        List the key skills or knowledge students will gain.
                      </p>
                    </FormGroup>
                  </div>
                )}
                
                {/* Visibility Tab */}
                {settingsTab === 'visibility' && (
                  <div className="space-y-6">
                    <FormGroup label="Course Status" htmlFor="status">
                      <select
                        id="status"
                        name="status"
                        value={courseData.status}
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
                        checked={courseData.featured}
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
                        value={courseData.language}
                        onChange={handleChange}
                        className="input"
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
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Step 4: Review & Submit */}
            {currentStep === 3 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Review your course details before submitting. You can make changes by going back to previous steps.
                </p>
                
                <div className="space-y-6">
                  {/* Course Preview */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={courseData.image || 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                        alt={courseData.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {courseData.status && (
                        <div className="absolute top-3 right-3">
                          <Badge 
                            variant={
                              courseData.status === 'published' ? 'success' : 
                              courseData.status === 'draft' ? 'warning' : 'secondary'
                            }
                          >
                            {courseData.status.charAt(0).toUpperCase() + courseData.status.slice(1)}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">
                          {courseData.category || 'No Category'}
                        </Badge>
                        
                        <div className="text-lg font-semibold">
                          {courseData.price ? `$${courseData.price}` : 'Free'}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">
                        {courseData.title || 'Course Title'}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                        {courseData.description || 'No description provided.'}
                      </p>
                      
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center mr-3">
                          <Clock size={14} className="mr-1" />
                          <span>{courseData.duration || 'Not specified'}</span>
                        </div>
                        {courseData.level && (
                          <div className="flex items-center">
                            <span>{courseData.level}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-sm">
                        <p className="font-medium">Lessons ({courseData.lessons.length})</p>
                        <ul className="mt-2 space-y-1">
                          {courseData.lessons.map((lesson, index) => (
                            <li key={lesson.id} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span className="text-gray-600 dark:text-gray-300 line-clamp-1">
                                {lesson.title || `Lesson ${index + 1}`}
                              </span>
                            </li>
                          )).slice(0, 3)}
                          {courseData.lessons.length > 3 && (
                            <li className="text-primary-600 dark:text-primary-400">
                              + {courseData.lessons.length - 3} more lessons
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submission Details */}
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg border border-primary-100 dark:border-primary-800">
                    <h3 className="font-medium text-primary-800 dark:text-primary-300 mb-2">
                      Submission Details
                    </h3>
                    
                    <p className="text-sm text-primary-700 dark:text-primary-400 mb-3">
                      {courseData.status === 'draft' 
                        ? 'Your course will be saved as a draft. You can edit it anytime and publish when ready.'
                        : courseData.status === 'review'
                          ? 'Your course will be submitted for review. Our team will check it and provide feedback if needed.'
                          : 'Your course will be published and visible to all students immediately.'
                      }
                    </p>
                    
                    {courseData.status === 'published' && (
                      <div className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-success-500 mr-2"></span>
                        <span className="text-sm font-medium text-success-600 dark:text-success-400">
                          Ready to publish
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={goToPrevStep}
                disabled={currentStep === 0}
                icon={<ChevronLeft size={16} />}
              >
                Back
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={goToNextStep}
                  icon={<ChevronRight size={16} />}
                  iconPosition="right"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  icon={<Save size={16} />}
                >
                  Create Course
                </Button>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};