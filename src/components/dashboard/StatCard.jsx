import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export const StatCard = ({ title, value, icon, change, changeType = 'increase', className }) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <motion.h3 
            className="mt-2 text-2xl font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {value}
          </motion.h3>
          
          {typeof change === 'string' && change.trim() !== '' && (
            <p className={cn(
              'mt-2 text-xs font-medium',
              changeType === 'increase' ? 'text-success-600 dark:text-success-500' : 'text-error-600 dark:text-error-500'
            )}>
              <span className="inline-flex items-center">
                {changeType === 'increase' ? '↑' : '↓'} {change}
              </span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">from previous period</span>
            </p>
          )}
        </div>
        
        <div className={cn(
          'p-2 rounded-full',
          'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
        )}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  change: PropTypes.string,
  changeType: PropTypes.oneOf(['increase', 'decrease']),
  className: PropTypes.string,
};
