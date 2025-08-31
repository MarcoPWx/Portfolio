'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

type MotionButtonBaseProps = Omit<React.ComponentProps<typeof motion.button>, 'ref'>;

interface IconButtonProps extends MotionButtonBaseProps {
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  isLoading?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      variant = 'ghost',
      size = 'md',
      tooltip,
      isLoading = false,
      className = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500',
      secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700',
      ghost: 'text-gray-400 hover:text-white hover:bg-gray-800',
      danger: 'text-red-400 hover:text-white hover:bg-red-600',
      success: 'text-green-400 hover:text-white hover:bg-green-600',
    };

    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    };

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    return (
      <div className="relative inline-flex group">
        <motion.button
          ref={ref}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={disabled || isLoading}
          className={`
          inline-flex items-center justify-center
          rounded-lg transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
          {...props}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Icon className={iconSizes[size]} />
          )}
        </motion.button>

        {tooltip && (
          <div
            className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          px-2 py-1 bg-gray-900 text-white text-xs rounded
          opacity-0 group-hover:opacity-100 pointer-events-none
          transition-opacity duration-200 whitespace-nowrap
          border border-gray-800
        "
          >
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
              <div className="border-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        )}
      </div>
    );
  },
);

IconButton.displayName = 'IconButton';
