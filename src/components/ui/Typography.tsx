'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  animate?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  gradient = 'from-green-400 to-emerald-400',
  animate = true,
}) => {
  if (animate) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

interface SectionTitleProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  animate?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
  animate = true,
  className = '',
  children,
}) => {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const headingContent =
    children ?? (title ? <GradientText animate={false}>{title}</GradientText> : null);

  const content = (
    <div className={`${alignment[align]} mb-12 ${className}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 mb-4 ${align === 'center' ? 'justify-center' : ''}`}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-green-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-green-400">
            {badge}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-green-500" />
        </div>
      )}

      {headingContent && <h2 className="text-4xl md:text-5xl font-bold mb-4">{headingContent}</h2>}

      {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

interface AnimatedLettersProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedLetters: React.FC<AnimatedLettersProps> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const letters = text.split('');

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: [0.215, 0.61, 0.355, 1.0],
          }}
          className="inline-block"
          style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
};

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export const TypingText: React.FC<TypingTextProps> = ({ text, className = '', speed = 50 }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
};
