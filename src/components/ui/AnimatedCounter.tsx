'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  start?: number;
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  start = 0,
  delay = 0,
}) => {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;

      const startTime = Date.now() + delay;
      const endValue = value;
      const startValue = start;

      const updateCount = () => {
        const now = Date.now();
        const elapsed = now - startTime;

        if (elapsed < 0) {
          requestAnimationFrame(updateCount);
          return;
        }

        if (elapsed < duration) {
          const progress = elapsed / duration;
          // Easing function for smooth animation
          const easeOutExpo = 1 - Math.pow(2, -10 * progress);
          const currentValue = startValue + (endValue - startValue) * easeOutExpo;
          setCount(currentValue);
          requestAnimationFrame(updateCount);
        } else {
          setCount(endValue);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }, [isInView, value, duration, start, delay]);

  const formattedValue = count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

interface AnimatedPercentageProps {
  value: number;
  duration?: number;
  className?: string;
  showDecimal?: boolean;
  delay?: number;
}

export const AnimatedPercentage: React.FC<AnimatedPercentageProps> = ({
  value,
  duration = 2000,
  className = '',
  showDecimal = true,
  delay = 0,
}) => {
  return (
    <AnimatedCounter
      value={value}
      duration={duration}
      suffix="%"
      decimals={showDecimal ? 1 : 0}
      className={className}
      delay={delay}
    />
  );
};

interface AnimatedStatProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({
  label,
  value,
  prefix = '',
  suffix = '',
  icon,
  color = 'green',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="p-6 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${color}-500/10 to-${color}-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`}
        />

        <div className="relative">
          {icon && (
            <div
              className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-lg flex items-center justify-center mb-4`}
            >
              {icon}
            </div>
          )}

          <div className="text-3xl font-bold text-white mb-2">
            <AnimatedCounter
              value={value}
              prefix={prefix}
              suffix={suffix}
              duration={2000}
              delay={delay * 100}
            />
          </div>

          <div className="text-sm text-gray-400">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};
