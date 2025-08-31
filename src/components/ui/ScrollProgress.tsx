'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  className?: string;
  height?: number;
  color?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = '',
  height = 3,
  color = 'bg-gradient-to-r from-green-400 to-teal-400',
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-[100] origin-left ${color} ${className}`}
      style={{
        scaleX,
        height: `${height}px`,
      }}
    />
  );
};

interface ScrollIndicatorProps {
  sections: Array<{
    id: string;
    label: string;
    offset?: number;
  }>;
  activeSection: string;
  className?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  sections,
  activeSection,
  className = '',
}) => {
  const [scrollProgress, setScrollProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const handleScroll = () => {
      const progress: Record<string, number> = {};

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const elementHeight = element.offsetHeight;

          // Calculate how much of the section has been scrolled
          if (rect.top < viewportHeight && rect.bottom > 0) {
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const totalProgress = visibleHeight / Math.min(elementHeight, viewportHeight);
            progress[section.id] = Math.min(Math.max(totalProgress, 0), 1);
          } else if (rect.top >= viewportHeight) {
            progress[section.id] = 0;
          } else {
            progress[section.id] = 1;
          }
        }
      });

      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block ${className}`}>
      <div className="space-y-4">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          const progress = scrollProgress[section.id] || 0;

          return (
            <motion.button
              key={section.id}
              onClick={() => {
                const element = document.getElementById(section.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group flex items-center gap-3 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Label on hover */}
              <div className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap border border-gray-700">
                  {section.label}
                </div>
              </div>

              {/* Indicator dot */}
              <div className="relative w-3 h-3">
                <div
                  className={`absolute inset-0 rounded-full transition-colors ${
                    isActive ? 'bg-green-400' : 'bg-gray-600'
                  }`}
                />

                {/* Progress ring */}
                {progress > 0 && progress < 1 && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="6"
                      cy="6"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-green-400"
                      style={{
                        strokeDasharray: `${progress * 31.4} 31.4`,
                        transition: 'stroke-dasharray 0.3s ease',
                      }}
                    />
                  </svg>
                )}

                {/* Active pulse */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

interface BackToTopProps {
  threshold?: number;
  className?: string;
}

export const BackToTop: React.FC<BackToTopProps> = ({ threshold = 300, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 p-3 bg-gray-900/90 backdrop-blur-lg rounded-full border border-gray-700 hover:border-green-400 transition-colors group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <svg
        className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 15l7-7 7 7" />
      </svg>
    </motion.button>
  );
};

// Section scroll spy hook
export const useScrollSpy = (sectionIds: string[], offset = 100) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};
