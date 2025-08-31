'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  blur?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { children, className = '', hover = true, gradient = false, blur = false, padding = 'md' },
    ref,
  ) => {
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const baseClasses = `
    relative rounded-xl
    ${blur ? 'backdrop-blur-xl bg-gray-900/80' : 'bg-gray-900/95'}
    border border-gray-800
    ${gradient ? 'bg-gradient-to-br from-gray-900 to-gray-950' : ''}
    ${paddings[padding]}
    ${className}
  `;

    if (hover) {
      return (
        <motion.div
          ref={ref}
          className={baseClasses}
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.2 },
          }}
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget;
            target.style.boxShadow =
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget;
            target.style.boxShadow =
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
          }}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseClasses}>
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
