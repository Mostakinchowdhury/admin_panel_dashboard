'use client';
import React from 'react';
import './Loader.css';

/**
 * A premium, customizable loader component.
 *
 * @param {Object} props
 * @param {string} [props.size='40px'] - The size of the loader (width and height).
 * @param {string} [props.color='#3b82f6'] - The primary color of the spinner.
 * @param {string} [props.className] - Additional classes for the container.
 */
export const Spinner = ({
  size = '48px',
  color = '#3b82f6',
  className = '',
}: {
  size?: string;
  color?: string;
  className?: string;
}) => {
  const style = {
    width: size,
    height: size,
    '--loader-color': color,
  };

  return (
    <div className={`loader-container ${className}`}>
      <div className="loader-spinner" style={style} aria-label="Loading..." />
    </div>
  );
};

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

const SpinnerRealistic: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-20 h-20">
        {/* Outer neon ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin drop-shadow-[0_0_10px_cyan]"></div>

        {/* Middle gradient ring */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-r-purple-500 animate-spin-slow drop-shadow-[0_0_8px_purple]"></div>

        {/* Inner glowing orb */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-sm animate-pulse shadow-lg"></div>
      </div>
    </div>
  );
};

export default SpinnerRealistic;

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
      <div className="relative w-32 h-32 preserve-3d animate-spin-slow">
        <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 rounded-lg shadow-2xl backface-hidden" />
        <div className="absolute inset-0 bg-lin-to-br from-blue-600 to-cyan-500 rounded-lg shadow-2xl rotate-y-90 backface-hidden" />
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-teal-500 rounded-lg shadow-2xl rotate-y-180 backface-hidden" />
        <div className="absolute inset-0 bg-linear-to-br from-teal-500 to-green-500 rounded-lg shadow-2xl rotate-y-270 backface-hidden" />
        <div className="absolute inset-0 bg-linear-to-br from-green-500 to-purple-600 rounded-lg shadow-2xl rotate-x-90 backface-hidden" />
        <div className="absolute inset-0 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg shadow-2xl -rotate-x-90 backface-hidden" />
      </div>
    </div>
  );
};
