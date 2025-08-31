'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Skill Level Badge Component
interface SkillLevelProps {
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  className?: string;
}

export const SkillLevel: React.FC<SkillLevelProps> = ({ level, className = '' }) => {
  const colors = {
    Expert: 'bg-green-500/20 text-green-400 border-green-500/30',
    Advanced: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Beginner: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full border ${colors[level]} ${className}`}
    >
      {level}
    </span>
  );
};

// Years Experience Component
interface YearsExperienceProps {
  years: number;
  suffix?: string;
  className?: string;
}

export const YearsExperience: React.FC<YearsExperienceProps> = ({
  years,
  suffix = 'years',
  className = '',
}) => {
  return (
    <span className={`text-sm text-gray-500 ${className}`}>
      {years}+ {suffix}
    </span>
  );
};

// Skill Icon Component
interface SkillIconProps {
  icon: React.ReactNode | string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({
  icon,
  color = 'from-blue-400 to-blue-600',
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: 'w-10 h-10 text-base',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <div
      className={`${sizes[size]} bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${className}`}
    >
      {typeof icon === 'string' ? icon : icon}
    </div>
  );
};

// Project Tag Component
interface ProjectTagProps {
  name: string;
  count?: number;
  onClick?: () => void;
  className?: string;
}

export const ProjectTag: React.FC<ProjectTagProps> = ({ name, count, onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-sm text-gray-300 transition-colors ${className}`}
    >
      {name}
      {count && <span className="ml-1 text-xs text-gray-500">+{count}</span>}
    </motion.button>
  );
};

// Skill Description Component
interface SkillDescriptionProps {
  text: string;
  className?: string;
}

export const SkillDescription: React.FC<SkillDescriptionProps> = ({ text, className = '' }) => {
  return <p className={`text-sm text-gray-400 leading-relaxed ${className}`}>{text}</p>;
};

// See More Link Component
interface SeeMoreLinkProps {
  count: number;
  text?: string;
  onClick?: () => void;
  className?: string;
}

export const SeeMoreLink: React.FC<SeeMoreLinkProps> = ({
  count,
  text = 'detailed project examples',
  onClick,
  className = '',
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 ${className}`}
      whileHover={{ x: 5 }}
    >
      Click to see {count} {text}
      <span className="text-xs">→</span>
    </motion.button>
  );
};

// Category Header Component
interface CategoryHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  iconColor?: string;
  className?: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  icon,
  title,
  subtitle,
  iconColor = 'from-blue-500 to-cyan-500',
  className = '',
}) => {
  return (
    <div className={`flex items-start gap-4 mb-8 ${className}`}>
      <div className={`p-3 bg-gradient-to-br ${iconColor} rounded-2xl text-white`}>{icon}</div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
        <p className="text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};

// Main Skill Card Component
interface SkillCardProps {
  title: string;
  icon?: React.ReactNode | string;
  iconColor?: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  years: number;
  description: string;
  projects?: string[];
  additionalTags?: string[];
  projectCount?: number;
  onSeeMore?: () => void;
  className?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  title,
  icon,
  iconColor = 'from-blue-400 to-blue-600',
  level,
  years,
  description,
  projects = [],
  additionalTags = [],
  projectCount,
  onSeeMore,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`relative group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

      <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 rounded-2xl p-6 transition-all">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && <SkillIcon icon={icon} color={iconColor} />}
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <SkillLevel level={level} />
                <YearsExperience years={years} />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <SkillDescription text={description} className="mb-4" />

        {/* Project Tags */}
        {projects.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {projects.map((project, index) => (
              <ProjectTag key={index} name={project} />
            ))}
            {additionalTags.map((tag, index) => (
              <ProjectTag key={`tag-${index}`} name={tag} count={index === 0 ? 2 : 1} />
            ))}
          </div>
        )}

        {/* See More Link */}
        {projectCount && onSeeMore && <SeeMoreLink count={projectCount} onClick={onSeeMore} />}
      </div>
    </motion.div>
  );
};

// Skill Grid Component
interface SkillGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const SkillGrid: React.FC<SkillGridProps> = ({ children, columns = 3, className = '' }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>{children}</div>;
};

// Skill Progress Bar Component
interface SkillProgressProps {
  percentage: number;
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export const SkillProgress: React.FC<SkillProgressProps> = ({
  percentage,
  color = 'from-green-500 to-emerald-500',
  showLabel = true,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">Proficiency</span>
          <span className="text-xs text-gray-400">{percentage}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
        />
      </div>
    </div>
  );
};

// Skill Stats Component
interface SkillStatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export const SkillStat: React.FC<SkillStatProps> = ({ label, value, icon, className = '' }) => {
  return (
    <div className={`flex items-center justify-between p-3 bg-gray-800/30 rounded-lg ${className}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-gray-500">{icon}</span>}
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
};

// Expandable Skill Card
interface ExpandableSkillCardProps extends SkillCardProps {
  expandedContent?: React.ReactNode;
}

export const ExpandableSkillCard: React.FC<ExpandableSkillCardProps> = ({
  expandedContent,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div>
      <SkillCard {...props} onSeeMore={() => setIsExpanded(!isExpanded)} />

      {isExpanded && expandedContent && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 p-4 bg-gray-900/30 rounded-xl border border-gray-800"
        >
          {expandedContent}
        </motion.div>
      )}
    </div>
  );
};

// Skill Category Section
interface SkillCategorySectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  iconColor?: string;
  className?: string;
}

export const SkillCategorySection: React.FC<SkillCategorySectionProps> = ({
  icon,
  title,
  subtitle,
  children,
  iconColor = 'from-blue-500 to-cyan-500',
  className = '',
}) => {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${className}`}>
      <CategoryHeader icon={icon} title={title} subtitle={subtitle} iconColor={iconColor} />
      {children}
    </motion.section>
  );
};
