import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export const Badge = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    outline: 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
  };

  return (
    <span
      className={cn('badge', variantClasses[variant] || variantClasses['primary'], className)}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'outline']),
  className: PropTypes.string,
};
