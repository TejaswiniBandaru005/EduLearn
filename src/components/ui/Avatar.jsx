import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export const Avatar = ({ src, alt, className, fallback, size = 'md', ...props }) => {
  const [error, setError] = React.useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };
  
  const handleError = () => {
    setError(true);
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {!error && src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="h-full w-full object-cover"
          onError={handleError}
        />
      ) : (
        <span className="text-gray-600 font-medium dark:text-gray-300">
          {fallback || (typeof alt === 'string' && alt.trim() !== '' ? alt.charAt(0).toUpperCase() : 'U')}
        </span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};
