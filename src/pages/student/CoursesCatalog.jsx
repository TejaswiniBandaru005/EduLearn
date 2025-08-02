import React, { useState, useEffect } from 'react';
import { CourseCard } from '../../components/dashboard/CourseCard';
import { Button } from '../../components/ui/Button';
import { Input, FormGroup } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { sampleCourses, courseCategories, courseLevels, userCourseProgress } from '../../data/sampleData';
import { useAuth } from '../../context/AuthContext';
import { Search, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const CoursesCatalog = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(sampleCourses);

  // Filter courses based on search term, categories, and levels
  useEffect(() => {
    let results = sampleCourses;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(course =>
        selectedCategories.includes(course.category)
      );
    }

    // Apply level filter
    if (selectedLevels.length > 0) {
      results = results.filter(course =>
        selectedLevels.includes(course.level)
      );
    }

    setFilteredCourses(results);
  }, [searchTerm, selectedCategories, selectedLevels]);

  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Toggle level selection
  const toggleLevel = (level) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  // Animation variants
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
      {/* Search and Filter Header */}
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
            {(selectedCategories.length > 0 || selectedLevels.length > 0) && (
              <Badge className="ml-2">
                {selectedCategories.length + selectedLevels.length}
              </Badge>
            )}
          </Button>

          {(searchTerm || selectedCategories.length > 0 || selectedLevels.length > 0) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {courseCategories.map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? 'primary' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Levels */}
            <div>
              <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Difficulty Level</h3>
              <div className="flex flex-wrap gap-2">
                {courseLevels.map(level => (
                  <Badge
                    key={level}
                    variant={selectedLevels.includes(level) ? 'primary' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleLevel(level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map(course => (
            <motion.div key={course.id} variants={itemVariants}>
              <CourseCard
                course={course}
                progress={currentUser?.enrolledCourses?.includes(course.id) ? userCourseProgress[course.id] || 0 : undefined}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-600 mb-4 dark:bg-gray-800 dark:text-gray-300">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};
