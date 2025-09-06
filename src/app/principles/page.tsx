'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Zap,
  Shield,
  Users,
  Code,
  Rocket,
  Heart,
  Target,
  Sparkles,
  Brain,
} from 'lucide-react';
import Link from 'next/link';

const principles = [
  {
    number: 1,
    title: 'Ship Small, Ship Often',
    icon: <Rocket className="w-6 h-6" />,
    description: 'Break features into smallest deployable units',
    details: [
      'Deploy daily or multiple times per day',
      'Feature flags for gradual rollouts',
      'Quick feedback loops with users',
      'Easier debugging and rollback',
    ],
    example:
      'Instead of a complete payment system, ship: 1) payment form UI, 2) validation logic, 3) payment processing, 4) receipt generation',
  },
  {
    number: 2,
    title: 'User Value First',
    icon: <Heart className="w-6 h-6" />,
    description: 'Every line of code should benefit the end user',
    details: [
      'Start with user stories, not technical requirements',
      'Measure success by user outcomes',
      "Remove features that don't add value",
      'Prioritize UX over technical elegance',
    ],
    example:
      'Chose boring tech stack that loads in 500ms over exciting framework that takes 3 seconds',
  },
  {
    number: 3,
    title: 'Test-Driven Development',
    icon: <CheckCircle className="w-6 h-6" />,
    description: 'Write tests first, then make them pass',
    details: [
      'Red → Green → Refactor cycle',
      'Tests document expected behavior',
      'Catch bugs before production',
      'Confidence in refactoring',
    ],
    example: "Write failing test for 'user can login', implement login, then optimize the code",
  },
  {
    number: 4,
    title: 'Simple Over Clever',
    icon: <Lightbulb className="w-6 h-6" />,
    description: 'Code is read 10x more than written',
    details: [
      'Boring code is good code',
      'Explicit over implicit',
      'Avoid premature optimization',
      'Junior dev should understand it',
    ],
    example:
      'Use simple if/else instead of nested ternaries. Use descriptive names over short ones.',
  },
  {
    number: 5,
    title: 'Fix Small Issues Immediately',
    icon: <Shield className="w-6 h-6" />,
    description: 'A stitch in time saves nine',
    details: [
      'Fix linting errors right away',
      'Update dependencies regularly',
      'Refactor as you go',
      "Don't let tech debt accumulate",
    ],
    example: 'Spend 5 minutes fixing that console warning now, not 2 hours debugging it later',
  },
  {
    number: 6,
    title: 'Automate Everything Repetitive',
    icon: <Zap className="w-6 h-6" />,
    description: 'If you do it twice, automate it',
    details: [
      'CI/CD pipelines for deployments',
      'Automated testing on every commit',
      'Code formatting and linting',
      'Dependency updates',
    ],
    example: 'Created GitHub Action to auto-generate API docs from OpenAPI spec on every merge',
  },
  {
    number: 7,
    title: 'Document Why, Not What',
    icon: <Brain className="w-6 h-6" />,
    description: 'Code shows what, comments explain why',
    details: [
      'Document business decisions',
      'Explain non-obvious choices',
      'Link to relevant discussions',
      'Keep README up to date',
    ],
    example:
      '// Using setTimeout instead of setInterval because we need to wait for API response before next poll',
  },
  {
    number: 8,
    title: 'Enable Your Team',
    icon: <Users className="w-6 h-6" />,
    description: 'Your code should make others productive',
    details: [
      'Write clear PR descriptions',
      'Create reusable components',
      'Share knowledge in team meetings',
      'Mentor junior developers',
    ],
    example:
      'Created Storybook components with examples so team can build UIs without asking questions',
  },
  {
    number: 9,
    title: 'Measure and Monitor',
    icon: <Target className="w-6 h-6" />,
    description: "You can't improve what you don't measure",
    details: [
      'Performance metrics in production',
      'Error tracking and alerting',
      'User behavior analytics',
      'Cost monitoring',
    ],
    example: 'Set up dashboard showing p95 latency, error rate, and active users for each service',
  },
  {
    number: 10,
    title: 'Always Be Learning',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'Technology evolves, so should you',
    details: [
      'Read documentation thoroughly',
      'Try new tools on side projects',
      'Learn from failures',
      'Teach what you learn',
    ],
    example: 'Spent weekend learning Rust, now using it for performance-critical microservice',
  },
];

export default function PrinciplesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      {/* Navigation Bar - matching main app style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800">
        <div className="w-full max-w-[90%] 2xl:max-w-[85%] mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white hover:bg-gray-900/50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
              <div className="text-gray-600">|</div>
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-green-400" />
                <span className="font-bold text-lg">
                  <span className="text-white">Engineering</span>
                  <span className="text-green-400">Principles</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">10 Battle-Tested Principles</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            10 Engineering Principles
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Battle-tested principles for building exceptional software
          </p>
          <p className="text-gray-500 italic">Learned from 10+ years of shipping production code</p>
        </motion.div>
      </div>

      {/* Principles Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all h-full">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-green-400">
                      {principle.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-green-400 font-bold">#{principle.number}</span>
                      <h3 className="text-xl font-bold text-white">{principle.title}</h3>
                    </div>
                    <p className="text-gray-400">{principle.description}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  {principle.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Example */}
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Real Example
                  </p>
                  <p className="text-sm text-gray-400 italic">{principle.example}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            These principles guide every line of code I write and every architectural decision I
            make.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
