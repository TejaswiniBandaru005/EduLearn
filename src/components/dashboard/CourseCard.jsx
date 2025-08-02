import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Clock, User, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const CourseCard = ({ 
  course, 
  progress,
  instructorView = false 
}) => {
  return (
    <motion.div 
      className="group course-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to={instructorView 
          ? `/instructor/courses/${course.id}/edit` 
          : `/courses/${course.id}`
        }
      >
        <div className="relative overflow-hidden h-48">
          <img 
            src={course.image} 
            alt={course.title}
            className="course-card-image"
          />
          {course.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="accent">Featured</Badge>
            </div>
          )}
          {course.status && instructorView && (
            <div className="absolute top-3 right-3">
              <Badge 
                variant={
                  course.status === 'published' ? 'success' : 
                  course.status === 'draft' ? 'warning' : 'secondary'
                }
              >
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="mb-2">
              {course.category}
            </Badge>
            {instructorView && typeof course.studentsCount === 'number' && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <User size={14} className="mr-1" />
                <span>{course.studentsCount} students</span>
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {course.title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {course.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Award size={14} className="mr-1" />
              <span>{course.level}</span>
            </div>
          </div>
          
          {typeof progress === 'number' && !instructorView && (
            <div className="mt-3">
              <ProgressBar 
                value={progress} 
                max={100} 
                variant="success"
                size="sm"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {progress}% Complete
              </p>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    featured: PropTypes.bool,
    status: PropTypes.string,
    studentsCount: PropTypes.number,
  }).isRequired,
  progress: PropTypes.number,
  instructorView: PropTypes.bool,
};
