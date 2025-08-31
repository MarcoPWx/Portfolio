'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, X } from 'lucide-react';

export function RoadmapModal({
  isOpen,
  onClose,
  project,
}: {
  isOpen: boolean;
  onClose: () => void;
  project: string;
}) {
  const roadmapPhases = {
    quizmentor: [
      {
        phase: 'Foundation',
        status: 'completed',
        items: [
          'Core quiz engine',
          'Gamification system',
          'User authentication',
          'Basic analytics',
        ],
        completion: 100,
        color: 'from-green-500 to-emerald-500',
      },
      {
        phase: 'AI Integration',
        status: 'in-progress',
        items: [
          "Bloom's taxonomy validator",
          'Adaptive learning engine',
          'Question generation',
          'Smart recommendations',
        ],
        completion: 75,
        color: 'from-yellow-500 to-orange-500',
      },
      {
        phase: 'Multiplayer',
        status: 'in-progress',
        items: ['Real-time battles', 'Leaderboards', 'Team competitions', 'Social features'],
        completion: 60,
        color: 'from-blue-500 to-purple-500',
      },
      {
        phase: 'Enterprise',
        status: 'planned',
        items: [
          'White-label solution',
          'Advanced analytics',
          'API marketplace',
          'Custom integrations',
        ],
        completion: 10,
        color: 'from-gray-500 to-slate-500',
      },
    ],
    harvest: [
      {
        phase: 'MVP',
        status: 'completed',
        items: ['Content scraping', 'Basic transformation', 'Quiz generation', 'API endpoints'],
        completion: 100,
        color: 'from-green-500 to-emerald-500',
      },
      {
        phase: 'AI Pipeline',
        status: 'in-progress',
        items: ['Advanced NLP', 'Content classification', 'Quality scoring', 'Auto-optimization'],
        completion: 80,
        color: 'from-yellow-500 to-orange-500',
      },
      {
        phase: 'Platform',
        status: 'planned',
        items: [
          'Multi-format support',
          'Custom templates',
          'Analytics dashboard',
          'Enterprise features',
        ],
        completion: 30,
        color: 'from-blue-500 to-purple-500',
      },
    ],
    omni: [
      {
        phase: 'Research',
        status: 'completed',
        items: [
          'Market analysis',
          'Technical feasibility',
          'Architecture design',
          'Prototype development',
        ],
        completion: 100,
        color: 'from-green-500 to-emerald-500',
      },
      {
        phase: 'Core Development',
        status: 'in-progress',
        items: ['AI engine', 'Knowledge base', 'Interface design', 'Integration APIs'],
        completion: 45,
        color: 'from-yellow-500 to-orange-500',
      },
      {
        phase: 'Launch',
        status: 'planned',
        items: ['Beta testing', 'Performance optimization', 'Documentation', 'Go-to-market'],
        completion: 15,
        color: 'from-blue-500 to-purple-500',
      },
    ],
  } as const;

  const phases = roadmapPhases[project as keyof typeof roadmapPhases] || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-8 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Product Roadmaps</h2>
                  <p className="text-gray-400">See what we're building next</p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[60vh]">
              <div className="space-y-8">
                {phases.map((phase, index) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 to-transparent" />

                    {/* Phase Card */}
                    <div className="relative bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                      <div className="flex items-start gap-4">
                        {/* Status Dot */}
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center flex-shrink-0`}
                        >
                          {phase.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : phase.status === 'in-progress' ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Clock className="w-6 h-6 text-white" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">{phase.phase}</h3>
                            <span
                              className={`px-3 py-1 text-sm rounded-full font-medium ${
                                phase.status === 'completed'
                                  ? 'bg-green-500/20 text-green-400'
                                  : phase.status === 'in-progress'
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'bg-gray-500/20 text-gray-400'
                              }`}
                            >
                              {phase.completion}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${phase.completion}%` }}
                                transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                                className={`h-2 rounded-full bg-gradient-to-r ${phase.color}`}
                              />
                            </div>
                          </div>

                          {/* Items */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {phase.items.map((item, itemIndex) => (
                              <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + itemIndex * 0.05 + 0.3 }}
                                className="flex items-center gap-2"
                              >
                                {phase.status === 'completed' ? (
                                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-gray-500 flex-shrink-0" />
                                )}
                                <span className="text-sm text-gray-300">{item}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
