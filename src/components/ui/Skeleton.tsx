'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  count = 1,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-lg';
      case 'rectangular':
      default:
        return 'rounded';
    }
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case 'pulse':
        return 'animate-pulse';
      case 'wave':
        return 'animate-shimmer';
      case 'none':
      default:
        return '';
    }
  };

  const baseClasses = `bg-gray-800 ${getVariantClasses()} ${getAnimationClasses()} ${className}`;

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%'),
  };

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={baseClasses} style={style} />
        ))}
      </div>
    );
  }

  return <div className={baseClasses} style={style} />;
};

// Card Skeleton
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <Skeleton variant="circular" width={48} height={48} />
        <Skeleton variant="text" width={60} height={20} />
      </div>
      <Skeleton variant="text" width="70%" height={24} className="mb-2" />
      <Skeleton variant="text" width="100%" height={16} count={2} />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="rounded" width={80} height={32} />
        <Skeleton variant="rounded" width={80} height={32} />
      </div>
    </div>
  );
};

// Project Card Skeleton
export const SkeletonProjectCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden p-8"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Skeleton variant="rounded" width={48} height={48} />
          <div>
            <Skeleton variant="text" width={150} height={24} className="mb-2" />
            <Skeleton variant="text" width={200} height={16} />
          </div>
        </div>
        <Skeleton variant="rounded" width={80} height={24} />
      </div>

      <Skeleton variant="text" width="100%" height={20} count={2} className="mb-6" />

      <div className="mb-6">
        <Skeleton variant="text" width={150} height={14} className="mb-3" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-2">
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="text" width="90%" height={14} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" width="100%" height={80} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} variant="rounded" width={70} height={24} />
        ))}
      </div>

      <Skeleton variant="rounded" width={120} height={40} />
    </motion.div>
  );
};

// Skill Card Skeleton
export const SkeletonSkillCard: React.FC = () => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={40} height={40} />
          <div>
            <Skeleton variant="text" width={120} height={20} className="mb-1" />
            <Skeleton variant="text" width={80} height={14} />
          </div>
        </div>
        <Skeleton variant="rounded" width={60} height={24} />
      </div>

      <Skeleton variant="text" width="100%" height={14} count={2} className="mb-4" />

      <div className="flex justify-between items-center mb-2">
        <Skeleton variant="text" width={80} height={14} />
        <Skeleton variant="text" width={40} height={14} />
      </div>
      <Skeleton variant="rectangular" width="100%" height={8} className="rounded-full" />

      <div className="flex flex-wrap gap-2 mt-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" width={60} height={20} />
        ))}
      </div>
    </div>
  );
};

// Blog Card Skeleton
export const SkeletonBlogCard: React.FC = () => {
  return (
    <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton variant="circular" width={12} height={12} />
        <Skeleton variant="text" width={100} height={12} />
      </div>

      <Skeleton variant="text" width="90%" height={20} className="mb-2" />
      <Skeleton variant="text" width="100%" height={14} count={3} className="mb-4" />

      <div className="flex items-center justify-between">
        <Skeleton variant="text" width={80} height={12} />
        <Skeleton variant="text" width={60} height={12} />
      </div>
    </div>
  );
};

// Stats Card Skeleton
export const SkeletonStatCard: React.FC = () => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-6">
      <div className="flex items-start justify-between mb-4">
        <Skeleton variant="rounded" width={48} height={48} />
        <Skeleton variant="text" width={50} height={16} />
      </div>

      <Skeleton variant="text" width={100} height={32} className="mb-2" />
      <Skeleton variant="text" width={80} height={14} />
    </div>
  );
};

// Table Skeleton
export const SkeletonTable: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 4,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="p-4 text-left">
                <Skeleton variant="text" width="80%" height={16} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-800">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="p-4">
                  <Skeleton variant="text" width="70%" height={14} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// List Skeleton
export const SkeletonList: React.FC<{ items?: number }> = ({ items = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800"
        >
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1">
            <Skeleton variant="text" width="60%" height={18} className="mb-2" />
            <Skeleton variant="text" width="40%" height={14} />
          </div>
          <Skeleton variant="rounded" width={80} height={32} />
        </div>
      ))}
    </div>
  );
};

// Profile Skeleton
export const SkeletonProfile: React.FC = () => {
  return (
    <div className="text-center">
      <Skeleton variant="circular" width={160} height={160} className="mx-auto mb-6" />
      <Skeleton variant="text" width={200} height={32} className="mx-auto mb-2" />
      <Skeleton variant="text" width={300} height={20} className="mx-auto mb-6" />
      <div className="flex justify-center gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="circular" width={48} height={48} />
        ))}
      </div>
      <Skeleton variant="text" width="80%" height={16} count={3} className="mx-auto" />
    </div>
  );
};

// Navigation Skeleton
export const SkeletonNavigation: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <div className="flex items-center gap-3">
        <Skeleton variant="rounded" width={32} height={32} />
        <Skeleton variant="text" width={120} height={20} />
      </div>
      <div className="hidden lg:flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} variant="rounded" width={80} height={36} />
        ))}
      </div>
      <Skeleton variant="rounded" width={100} height={36} />
    </div>
  );
};

// Section Skeleton
export const SkeletonSection: React.FC<{ title?: boolean }> = ({ title = true }) => {
  return (
    <div className="space-y-8">
      {title && (
        <div className="text-center">
          <Skeleton variant="text" width={300} height={40} className="mx-auto mb-4" />
          <Skeleton variant="text" width={400} height={20} className="mx-auto" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};
