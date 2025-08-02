import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export const Input = forwardRef(
  ({ className, type = 'text', error, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'input',
            icon && 'pl-10',
            !!error && 'border-error-500 focus:ring-error-500',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
  icon: PropTypes.node,
};

export const FormGroup = ({ children, label, htmlFor, error, className }) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label htmlFor={htmlFor} className="label">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-error-600 mt-1">{error}</p>
      )}
    </div>
  );
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};
