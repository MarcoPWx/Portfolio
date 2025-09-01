'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  GitBranch, 
  Code, 
  MessageSquare, 
  Award,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Target,
  Workflow
} from 'lucide-react';

export default function TeamplayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">DevBook • Team Excellence</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              TeamPlay
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Engineering Excellence Through Collaborative Practices
            </p>
            <p className="text-gray-400 italic">
              Git mastery, clean code principles, and team dynamics that scale
            </p>
          </motion.div>
        </div>

        {/* Key Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <GitBranch className="w-6 h-6" />,
              title: "Git Mastery",
              description: "Branching strategies, conflict resolution, and workflow optimization"
            },
            {
              icon: <Code className="w-6 h-6" />,
              title: "Clean Code",
              description: "Readable, maintainable code that teams can build on"
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: "Team Dynamics",
              description: "Communication patterns that prevent technical debt"
            },
            {
              icon: <MessageSquare className="w-6 h-6" />,
              title: "Code Reviews",
              description: "Constructive feedback loops and knowledge sharing"
            },
            {
              icon: <Workflow className="w-6 h-6" />,
              title: "Process Design",
              description: "Workflows that enhance productivity, not hinder it"
            },
            {
              icon: <Award className="w-6 h-6" />,
              title: "ExSeed Integration",
              description: "Learn from high-performing engineering cultures"
            }
          ].map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all"
            >
              <div className="text-purple-400 mb-4">{area.icon}</div>
              <h3 className="text-white font-semibold mb-2">{area.title}</h3>
              <p className="text-gray-400 text-sm">{area.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <GitBranch className="w-8 h-8 text-purple-400" />
                Git Excellence
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Branching Strategies</h4>
                    <p className="text-gray-400 text-sm">GitFlow, GitHub Flow, and when to use each</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Conflict Resolution</h4>
                    <p className="text-gray-400 text-sm">Turn merge conflicts from roadblocks into learning opportunities</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">History Management</h4>
                    <p className="text-gray-400 text-sm">Clean commits that tell the story of your codebase</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Code className="w-8 h-8 text-purple-400" />
                Clean Code Culture
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Naming Conventions</h4>
                    <p className="text-gray-400 text-sm">Code that reads like well-written prose</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Function Design</h4>
                    <p className="text-gray-400 text-sm">Single responsibility and optimal abstraction levels</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Technical Debt Prevention</h4>
                    <p className="text-gray-400 text-sm">Architectural decisions that age well</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-400" />
                Team Dynamics
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-900/50 border-l-4 border-purple-500 p-4">
                  <h4 className="text-white font-semibold mb-2">Book Club Approach</h4>
                  <p className="text-gray-300 text-sm">
                    Weekly discussions of engineering principles, with practical exercises that reinforce learning
                  </p>
                </div>
                <div className="bg-gray-900/50 border-l-4 border-purple-500 p-4">
                  <h4 className="text-white font-semibold mb-2">Knowledge Sharing</h4>
                  <p className="text-gray-300 text-sm">
                    Structured approaches to spreading expertise across the team
                  </p>
                </div>
                <div className="bg-gray-900/50 border-l-4 border-purple-500 p-4">
                  <h4 className="text-white font-semibold mb-2">Mentorship Patterns</h4>
                  <p className="text-gray-300 text-sm">
                    Creating growth opportunities that benefit both mentors and mentees
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Award className="w-8 h-8 text-purple-400" />
                ExSeed Integration
              </h2>
              <p className="text-gray-300 mb-6">
                Learn from companies that have scaled engineering excellence. Real case studies, 
                proven patterns, and actionable insights from high-performing teams.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Spotify's Squad Model</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Google's Code Review Culture</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Netflix's Freedom & Responsibility</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/30 border border-gray-700 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Transform Your Team's Engineering Culture
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              From individual contributors to cohesive teams that deliver exceptional software. 
              Learn the practices that separate good teams from great ones.
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 mx-auto">
              Start Your Team's Journey
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
