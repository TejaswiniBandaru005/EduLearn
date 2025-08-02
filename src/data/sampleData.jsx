// Sample Courses Data
export const sampleCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Web Development',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Jane Smith',
    instructorId: '2',
    featured: true,
    price: 49.99,
    rating: 4.7,
    studentsCount: 1542,
    status: 'published',
    lessons: [
      {
        id: '1-1',
        title: 'HTML Basics',
        duration: '45 min',
        videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE',
        description: 'Learn the fundamentals of HTML structure and tags.',
        completed: true
      },
      {
        id: '1-2',
        title: 'CSS Styling',
        duration: '55 min',
        videoUrl: 'https://www.youtube.com/embed/1PnVor36_40',
        description: 'Master cascading style sheets to make your websites beautiful.',
        completed: true
      },
      {
        id: '1-3',
        title: 'JavaScript Fundamentals',
        duration: '60 min',
        videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
        description: 'Learn the basics of JavaScript programming language.',
        completed: false
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    description: 'Master advanced React concepts and patterns used in professional applications.',
    image: 'https://images.pexels.com/photos/11035363/pexels-photo-11035363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'JavaScript',
    level: 'Advanced',
    duration: '6 weeks',
    instructor: 'Jane Smith',
    instructorId: '2',
    featured: false,
    price: 79.99,
    rating: 4.9,
    studentsCount: 842,
    status: 'published',
    lessons: [
      {
        id: '2-1',
        title: 'Component Composition',
        duration: '50 min',
        videoUrl: 'https://www.youtube.com/embed/3XaXKiXtNjw',
        description: 'Learn how to compose components for maximum reusability.',
        completed: true
      },
      {
        id: '2-2',
        title: 'Context API Deep Dive',
        duration: '45 min',
        videoUrl: 'https://www.youtube.com/embed/5LrDIWkK_Bc',
        description: "Master React's Context API for state management.",
        completed: false
      }
    ]
  },
  {
    id: '3',
    title: 'Data Science with Python',
    description: 'Introduction to data analysis, visualization, and machine learning with Python.',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '10 weeks',
    instructor: 'Alex Johnson',
    instructorId: '3',
    featured: true,
    price: 69.99,
    rating: 4.5,
    status: 'draft',
    studentsCount: 1203,
    lessons: [
      {
        id: '3-1',
        title: 'Python Basics for Data Science',
        duration: '65 min',
        videoUrl: 'https://www.youtube.com/embed/T5pRlIbr6gg',
        description: 'Learn the fundamental Python skills needed for data science.',
        completed: false
      }
    ]
  },
  {
    id: '4',
    title: 'UX/UI Design Principles',
    description: 'Learn the core principles of user experience and interface design.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Design',
    level: 'Beginner',
    duration: '7 weeks',
    instructor: 'Sarah Williams',
    instructorId: '4',
    featured: false,
    price: 59.99,
    rating: 4.6,
    status: 'published',
    studentsCount: 756,
    lessons: [
      {
        id: '4-1',
        title: 'Design Thinking Process',
        duration: '40 min',
        videoUrl: 'https://www.youtube.com/embed/gHGN6hs2gZY',
        description: 'Learn the design thinking methodology for user-centered design.',
        completed: false
      }
    ]
  },
  {
    id: '5',
    title: 'Mobile App Development with Flutter',
    description: 'Build cross-platform mobile applications with Flutter and Dart.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '9 weeks',
    instructor: 'Jane Smith',
    instructorId: '2',
    featured: true,
    price: 69.99,
    rating: 4.8,
    status: 'published',
    studentsCount: 935,
    lessons: [
      {
        id: '5-1',
        title: 'Getting Started with Flutter',
        duration: '55 min',
        videoUrl: 'https://www.youtube.com/embed/1ukSR1GRtMU',
        description: 'Set up your development environment and create your first Flutter app.',
        completed: false
      }
    ]
  },
  {
    id: '6',
    title: 'DevOps and CI/CD Pipelines',
    description: 'Learn how to implement continuous integration and delivery pipelines.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'DevOps',
    level: 'Advanced',
    duration: '8 weeks',
    instructor: 'Michael Chen',
    instructorId: '5',
    featured: false,
    price: 89.99,
    rating: 4.7,
    status: 'review',
    studentsCount: 512,
    lessons: [
      {
        id: '6-1',
        title: 'Introduction to DevOps',
        duration: '50 min',
        videoUrl: 'https://www.youtube.com/embed/Xrgk023l4lI',
        description: 'Learn the foundational principles of DevOps culture and practices.',
        completed: false
      }
    ]
  }
];

// Weekly Activity Data for Dashboard Charts
export const weeklyActivityData = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 3.8 },
  { name: 'Wed', hours: 1.2 },
  { name: 'Thu', hours: 4.5 },
  { name: 'Fri', hours: 3.2 },
  { name: 'Sat', hours: 5.0 },
  { name: 'Sun', hours: 2.0 },
];

// Course Categories Data
export const courseCategories = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Design',
  'Marketing',
  'Business',
  'Photography',
  'Music',
  'JavaScript',
  'DevOps',
];

// Course Difficulty Levels
export const courseLevels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'All Levels',
];

// User Course Progress Data
export const userCourseProgress = {
  '1': 66, // 66% complete for course with id '1'
  '2': 50, // 50% complete for course with id '2'
  '3': 0,  // 0% complete for course with id '3'
  '5': 10, // 10% complete for course with id '5'
};

// Instructor Statistics
export const instructorStats = {
  totalStudents: 4587,
  totalCourses: 3,
  totalRevenue: 28945.50,
  courseCompletionRate: 76.4,
  averageRating: 4.8,
};

// Instructor Revenue Data
export const revenueData = [
  { name: 'Jan', revenue: 1250 },
  { name: 'Feb', revenue: 1850 },
  { name: 'Mar', revenue: 2250 },
  { name: 'Apr', revenue: 2800 },
  { name: 'May', revenue: 3100 },
  { name: 'Jun', revenue: 2950 },
];

// Student Statistics
export const studentStats = {
  totalCoursesEnrolled: 4,
  completedCourses: 1,
  totalHoursLearned: 47.5,
  certificatesEarned: 1,
  averageScore: 87.5,
};
