import { motion } from 'framer-motion';

// Page transition variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

// List item staggered animation
export const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

// Fade in animation
export const fadeIn = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      duration: 0.5,
    }
  },
};

// Container for page transitions
export const MotionPage = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Container for list animations
export const MotionList = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={listVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Item for list animations
export const MotionListItem = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={className}
      variants={listItemVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Fade in animation
export const MotionFade = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={fadeIn}
      {...props}
    >
      {children}
    </motion.div>
  );
};
