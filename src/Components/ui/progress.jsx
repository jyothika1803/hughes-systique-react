import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Progress = ({ value, className = '' }) => {
  return (
    <div className={clsx('w-full bg-gray-200 rounded-full h-2', className)}>
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

Progress.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Progress;