'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface TimelineItem {
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: LucideIcon;
  tags?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  alternating?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ items, alternating = false }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className={`absolute ${alternating ? 'left-1/2 -translate-x-1/2' : 'left-8'} top-0 bottom-0 w-px bg-gradient-to-b from-green-500 via-emerald-500 to-transparent`}
      />

      {items.map((item, index) => {
        const Icon = item.icon || Calendar;
        const isLeft = alternating && index % 2 === 0;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: alternating ? (isLeft ? -50 : 50) : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex ${alternating ? (isLeft ? 'flex-row-reverse' : '') : ''} mb-12`}
          >
            {alternating && <div className="flex-1" />}

            <div className={`flex items-start gap-4 ${alternating ? 'flex-1' : 'ml-16'}`}>
              {/* Icon circle */}
              <div
                className={`
                absolute ${alternating ? 'left-1/2 -translate-x-1/2' : 'left-4'} 
                w-8 h-8 bg-gray-900 border-2 border-green-500 rounded-full 
                flex items-center justify-center z-10
              `}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full" />
              </div>

              {/* Content card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`
                  ${alternating ? (isLeft ? 'mr-16' : 'ml-16') : ''}
                  flex-1 p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl 
                  border border-gray-800 hover:border-green-500/50 transition-colors
                `}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">{item.date}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                {item.subtitle && <p className="text-sm text-gray-400 mb-3">{item.subtitle}</p>}
                <p className="text-gray-300 mb-3">{item.description}</p>

                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-800 text-xs text-gray-400 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Accordion Component
interface AccordionItem {
  title: string;
  content: React.ReactNode;
  icon?: LucideIcon;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isOpen = openItems.includes(index);

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {Icon && <Icon className="w-5 h-5 text-green-400" />}
                <span className="font-medium text-white">{item.title}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-4 text-gray-300">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

// Tabs Component
interface Tab {
  label: string;
  content: React.ReactNode;
  icon?: LucideIcon;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: number;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      {/* Tab headers */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-900/50 rounded-lg">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === index;

          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`
                relative px-4 py-2 rounded-lg font-medium transition-all
                ${
                  isActive
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }
              `}
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
