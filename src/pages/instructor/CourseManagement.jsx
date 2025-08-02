import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input, FormGroup } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { sampleCourses } from '../../data/sampleData';
import { 
  Plus, 
  Search, 
  Filter, 
  X, 
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Users,
  Star,
  Eye,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CourseManagement = () => {
  const { currentUser } = useAuth();

  // *** ADD STATE TO HANDLE COURSES DYNAMICALLY ***
  const [courses, setCourses] = useState([]);

  // Initialize courses on mount filtered by currentUser
  useEffect(() => {
    if (currentUser?.id) {
      setCourses(sampleCourses.filter(course => course.instructorId === currentUser.id));
    }
  }, [currentUser]);

  // YOUR EXISTING STATES, NO CHANGE:
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Now use "courses" from state (not sampleCourses) for filtering
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // YOUR EXISTING FUNCTION, NO CHANGE:
  const confirmDelete = (course) => {
    setCourseToDelete(course);
    setShowDeleteConfirm(true);
  };

  // FIX deleteCourse TO REMOVE COURSE FROM STATE
  const deleteCourse = () => {
    if (!courseToDelete) return;
    setCourses(prev => prev.filter(c => c.id !== courseToDelete.id));
    setShowDeleteConfirm(false);
    setCourseToDelete(null);
  };

  // DUPLICATE FUNCTION TO HANDLE DUPLICATION
  const duplicateCourse = (course) => {
    // create new ID - here just timestamp + random for demo
    const newId = `${course.id}-copy-${Date.now()}`;
    const newCourse = {
      ...course,
      id: newId,
      title: `${course.title} (Copy)`,
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  // STATUS VARIANT - no changes
  const getStatusVariant = (status) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      case 'review': return 'secondary';
      default: return 'outline';
    }
  };

  // Animation variants - no change
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Course Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage and organize all your courses
          </p>
        </div>
        
        <Button 
          as={Link} 
          to="/instructor/courses/create"
          icon={<Plus size={16} />}
        >
          Create New Course
        </Button>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <FormGroup className="w-full md:w-80">
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} />}
          />
        </FormGroup>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            icon={<Filter size={18} />}
          >
            Filters
            {statusFilter !== 'all' && (
              <Badge className="ml-2">1</Badge>
            )}
          </Button>
          
          {(searchTerm || statusFilter !== 'all') && (
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              icon={<X size={18} />}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {/* Filters Panel */}
      {showFilters && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
        >
          <div>
            <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Status</h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={statusFilter === 'all' ? 'primary' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Badge>
              <Badge
                variant={statusFilter === 'published' ? 'success' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStatusFilter('published')}
              >
                Published
              </Badge>
              <Badge
                variant={statusFilter === 'draft' ? 'warning' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStatusFilter('draft')}
              >
                Draft
              </Badge>
              <Badge
                variant={statusFilter === 'review' ? 'secondary' : 'outline'}
                className="cursor-pointer"
                onClick={() => setStatusFilter('review')}
              >
                Under Review
              </Badge>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Course List */}
      {filteredCourses.length > 0 ? (
        <div className="space-y-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredCourses.map(course => (
              <motion.div key={course.id} variants={itemVariants}>
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-auto">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:w-2/3 flex flex-col">
                      <div className="flex justify-between items-start">
                        <Badge variant={getStatusVariant(course.status)}>
                          {course.status === 'published' ? 'Published' : 
                           course.status === 'draft' ? 'Draft' : 'Under Review'}
                        </Badge>
                        <div className="relative group">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical size={16} />
                          </Button>
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10 hidden group-hover:block">
                            <Link 
                              to={`/instructor/courses/${course.id}/edit`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              <Edit size={16} className="mr-2" />
                              Edit
                            </Link>
                            <button
                              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                              onClick={() => duplicateCourse(course)}
                            >
                              <Copy size={16} className="mr-2" />
                              Duplicate
                            </button>
                            <Link 
                              to={`/courses/${course.id}`}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              <Eye size={16} className="mr-2" />
                              Preview
                            </Link>
                            <button
                              className="w-full flex items-center px-4 py-2 text-sm text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/30"
                              onClick={() => confirmDelete(course)}
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                        {course.description}
                      </p>
                      
                      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center mr-4">
                          <Users size={14} className="mr-1" />
                          {course.studentsCount || 0} students
                        </span>
                        <span className="flex items-center">
                          <Star size={14} className="mr-1 text-yellow-400" />
                          {course.rating || 0}
                        </span>
                      </div>
                      
                      <div className="mt-auto pt-4 flex flex-wrap gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          as={Link}
                          to={`/instructor/courses/${course.id}/edit`}
                          icon={<Edit size={14} />}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant={course.status === 'published' ? 'ghost' : 'primary'}
                          as={Link}
                          to={`/courses/${course.id}`}
                          icon={<Eye size={14} />}
                        >
                          {course.status === 'published' ? 'View' : 'Preview'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-600 mb-4 dark:bg-gray-800 dark:text-gray-300">
            <BookOpen size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          {searchTerm || statusFilter !== 'all' ? (
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search or filter criteria
            </p>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You haven't created any courses yet
            </p>
          )}
          <Button 
            as={Link}
            to="/instructor/courses/create"
            icon={<Plus size={16} />}
          >
            Create Your First Course
          </Button>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
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
                Are you sure you want to delete "<span className="font-medium">{courseToDelete?.title}</span>"? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                className="bg-error-600 hover:bg-error-700"
                onClick={deleteCourse}
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
