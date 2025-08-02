import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  className, 
  barClassName,
  showValue = false,
  size = 'md',
  variant = 'primary',
  ...props 
}) => {
  const safeMax = max > 0 ? max : 1;
  const clampedValue = Math.min(Math.max(value, 0), safeMax);
  const percentage = Math.round((clampedValue / safeMax) * 100);
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  const variantClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    accent: 'bg-accent-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600',
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className="flex items-center justify-between mb-1"
      >
        {showValue && (
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {percentage}%
          </span>
        )}
      </div>
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700', sizeClasses[size])} {...props}>
        <div
          className={cn('transition-all duration-300 ease-in-out rounded-full', variantClasses[variant], barClassName)}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
  barClassName: PropTypes.string,
  showValue: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'success', 'warning', 'error']),
};
