'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  BookOpen, 
  BarChart3, 
  Code, 
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  FileText,
  Cpu,
  Terminal,
  Play,
  Copy,
  Check,
  Download,
  ExternalLink,
  Pause,
  RotateCcw,
  Github,
  Home
} from 'lucide-react';

const BookPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState(false);
  const [agentBootCode, setAgentBootCode] = useState('');
  
  // Agent Boot Terminal State
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);

  // Load the AGENT-BOOT.py code
  useEffect(() => {
    fetch('/code-examples/AGENT-BOOT.py')
      .then(res => res.text())
      .then(code => setAgentBootCode(code))
      .catch(() => setAgentBootCode(getDefaultAgentBootCode()));
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(agentBootCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getDefaultAgentBootCode = () => `#!/usr/bin/env python3
"""AGENT-BOOT.py - Context Engineering Bootstrap"""

# Context Trinity Configuration
CONTEXT_TRINITY = {
    "DEVLOG": "DEVLOG.md",
    "SYSTEM_STATUS": "SYSTEM_STATUS.md",
    "EPIC_MANAGEMENT": "EPIC_MANAGEMENT.md"
}

class ContextManager:
    """Manages the Context Trinity"""
    
    def get_full_context(self) -> str:
        """Return complete context for AI session"""
        # Load all three context files
        return "\n".join([
            self.load_devlog(),
            self.load_status(),
            self.load_epics()
        ])

# Initialize and reduce context time from 3hrs to 45sec
print("🚀 AI Session Ready!")
print("Productivity multiplier: 312%")
`;

  const keyInsights = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      stat: "3x",
      label: "Productivity Gain",
      description: "Average improvement after implementing context patterns"
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      stat: "80%",
      label: "Less Time Explaining",
      description: "Spend minutes on context, not hours"
    },
    {
      icon: <Code className="w-5 h-5" />,
      stat: "45 sec",
      label: "Context Load Time",
      description: "From zero to productive in under a minute"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      stat: "3 Files",
      label: "Context Trinity",
      description: "All you need to transform AI from liability to asset"
    }
  ];

  const chapters = [
    { id: 1, title: "The Productivity Paradox", status: "preview" },
    { id: 2, title: "The $8,000 Question", status: "preview" },
    { id: 3, title: "Removing the Explanation Constraint", status: "locked" },
    { id: 4, title: "Removing the Documentation Constraint", status: "locked" },
    { id: 5, title: "The Context Engineering Framework", status: "locked" },
    { id: 6, title: "Implementation Patterns", status: "locked" },
  ];

  // Agent Boot Terminal Commands and Outputs
  const agentBootCommands = [
    {
      command: '> agent-boot health',
      output: [
        '🚀 AI-OS Project Health Check',
        '',
        '📊 Core Systems:',
        '• Documentation: ✅ HEALTHY',
        '• Manifest: ✅ SYNCED', 
        '• GitHub: ⚠️ DEGRADED (offline mode)',
        '• Tests: ✅ PASSING (42/42)',
        '',
        '📈 Overall Health: 85%',
        '⏰ Last Check: 2 mins ago',
        '📝 Auto-logged to DEVLOG.md'
      ]
    },
    {
      command: '> agent-boot epic create "Authentication" --tasks 5',
      output: [
        '✨ Creating Epic: Authentication',
        '',
        '📋 Generated 5 tasks:',
        '1. Setup auth service',
        '2. Implement JWT tokens',
        '3. Add OAuth providers',
        '4. Create login UI',
        '5. Add session management',
        '',
        '✅ Updated EPICS.md',
        '✅ Created GitHub issues (5)',
        '✅ Logged to DEVLOG.md',
        '',
        '🎯 Epic ID: AUTH-001'
      ]
    },
    {
      command: '> agent-boot progress',
      output: [
        '📊 Visual Progress Report',
        '',
        '⚡ ContentGenerator',
        '▓▓▓▓▓▓▓▓░░░░░░░░░░░░ 40%',
        '',
        '🔧 API Routes', 
        '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
        '',
        '🎨 UI Components',
        '▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░ 60%',
        '',
        '🧪 Test Coverage',
        '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ 85%',
        '',
        '📈 Overall: 71% Complete'
      ]
    },
    {
      command: '> agent-boot manifest',
      output: [
        '📦 Generating Project Manifest...',
        '',
        '✓ Analyzed 156 files',
        '✓ Detected 12 patterns',
        '✓ Found 8 dependencies',
        '✓ Calculated metrics',
        '',
        '📊 Manifest Summary:',
        '• Components: 42',
        '• API Routes: 18',
        '• Test Files: 36',
        '• Coverage: 85%',
        '',
        '💾 Saved to manifest.json',
        '🔄 GitHub sync completed'
      ]
    },
    {
      command: '> agent-boot tdd Payment --ai',
      output: [
        '🧪 TDD Workflow: Payment Feature',
        '',
        '1️⃣ Writing tests first...',
        '✓ payment.test.ts created',
        '✓ 12 test cases defined',
        '',
        '2️⃣ Running tests (RED phase)...',
        '❌ 0/12 passing (expected)',
        '',
        '3️⃣ AI implementing code...',
        '✓ PaymentService.ts created',
        '✓ Stripe integration added',
        '',
        '4️⃣ Tests now (GREEN phase)...',
        '✅ 12/12 passing!',
        '',
        '5️⃣ Refactoring & docs updated'
      ]
    },
    {
      command: '> agent-boot deploy staging --validate',
      output: [
        '🚀 Deployment Pipeline Started',
        '',
        '🔍 Pre-flight Checks:',
        '✓ Tests passing (42/42)',
        '✓ Build successful',
        '✓ Type checking clean',
        '✓ Linting passed',
        '',
        '📦 Building Docker image...',
        '✓ Image built: 142MB',
        '✓ Security scan: PASSED',
        '',
        '🌐 Deploying to staging...',
        '✓ Health check: 200 OK',
        '✓ Smoke tests: 15/15',
        '',
        '✅ Deployed successfully!',
        '🔗 https://staging.app.com'
      ]
    }
  ];

  // Terminal Animation Effect
  useEffect(() => {
    if (!isPlaying || currentCommandIndex >= agentBootCommands.length) {
      if (currentCommandIndex >= agentBootCommands.length && isPlaying) {
        // Loop back to start
        setTimeout(() => {
          setTerminalOutput([]);
          setCurrentCommandIndex(0);
        }, 3000);
      }
      return;
    }

    const currentCommand = agentBootCommands[currentCommandIndex];
    let outputIndex = 0;
    
    // Type the command
    setTerminalOutput(prev => [...prev, currentCommand.command]);
    
    // Type the output lines
    const interval = setInterval(() => {
      if (outputIndex < currentCommand.output.length) {
        setTerminalOutput(prev => [...prev, currentCommand.output[outputIndex]]);
        outputIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentCommandIndex(prev => prev + 1);
        }, 2000); // Wait before next command
      }
    }, 100); // Speed of typing each line

    return () => clearInterval(interval);
  }, [isPlaying, currentCommandIndex]);

  const resetTerminal = () => {
    setTerminalOutput([]);
    setCurrentCommandIndex(0);
    setIsPlaying(true);
  };

  // Remove fake testimonials - we'll use real quotes from the whitepaper instead

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">Book • Coming Q4 2025</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            The Context Engineer
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            A Practical Guide to AI-Assisted Development
          </p>
          <p className="text-gray-400 italic">
            How top engineers achieve 3x productivity with the same AI tools everyone else struggles with
          </p>
        </motion.div>
      </div>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {keyInsights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-green-400">{insight.icon}</div>
              <span className="text-3xl font-bold text-white">{insight.stat}</span>
            </div>
            <h3 className="text-white font-semibold mb-2">{insight.label}</h3>
            <p className="text-gray-400 text-sm">{insight.description}</p>
          </motion.div>
        ))}
      </div>



      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Book Cover and CTA */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="sticky top-8"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border border-gray-700 shadow-2xl">
              <div className="aspect-[3/4] bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-lg mb-6 flex items-center justify-center border border-green-500/30">
                <BookOpen className="w-24 h-24 text-green-400" />
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all flex items-center justify-center gap-2">
                  Download Sample Chapter
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button className="w-full bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all">
                  View Full Table of Contents
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Format</p>
                <p className="text-white">Digital (PDF, ePub, Web)</p>
                
                <p className="text-sm text-gray-400 mb-2 mt-4">Length</p>
                <p className="text-white">120 pages, 10 chapters</p>
                
                <p className="text-sm text-gray-400 mb-2 mt-4">Includes</p>
                <ul className="text-white text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Practical exercises
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Templates & tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Cost calculators
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Preview */}
        <div className="lg:col-span-2">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-gray-700">
            {['overview', 'excerpt', 'chapters'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    The Hidden Problem with AI Coding Tools
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Most developers report that AI suggestions don't match their codebase. 
                    They spend hours explaining context, only to get generic responses that ignore existing patterns.
                  </p>
                  <p className="text-gray-300 mb-4">
                    The issue isn't the AI itself—it's how we communicate with it. This book shows you a simple 
                    system that <span className="text-green-400 font-semibold">reduces context time by 95%</span> and makes AI actually understand your project.
                  </p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                    The Key Insight
                  </h3>
                  <blockquote className="text-lg text-gray-300 italic border-l-4 border-green-500 pl-4">
                    "AI assistants don't have memory between sessions. Instead of fighting this limitation, 
                    build a simple system that gives them perfect context every time."
                  </blockquote>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">The 45-Second Solution</h3>
                  <p className="text-gray-300 mb-4">
                    Three markdown files that reduce context time from 3 hours to 45 seconds:
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-4 items-start">
                      <div className="bg-green-500/20 p-2 rounded">
                        <FileText className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">DEVLOG.md</h4>
                        <p className="text-gray-400 text-sm">Why we built what we built (append-only)</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-cyan-500/20 p-2 rounded">
                        <FileText className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">SYSTEM_STATUS.md</h4>
                        <p className="text-gray-400 text-sm">What actually works right now (truth, not plans)</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-purple-500/20 p-2 rounded">
                        <FileText className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">EPIC_MANAGEMENT.md</h4>
                        <p className="text-gray-400 text-sm">What we're building next (single source of truth)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Quote from the Whitepaper */}
                <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Real Developer Experience</h3>
                  <blockquote className="text-gray-300 italic">
                    "After implementing the Context Trinity, I went from repeating myself constantly to having productive 
                    sessions immediately. The AI finally understands our architecture and makes relevant suggestions."
                  </blockquote>
                  <p className="text-sm text-gray-400 mt-3">
                    — Senior engineer at a Y Combinator startup
                  </p>
                </div>
              </motion.div>
            )}

            {/* Excerpt Tab */}
            {activeTab === 'excerpt' && (
              <motion.div
                key="excerpt"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="prose prose-invert max-w-none"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Chapter 1: The Productivity Paradox
                </h2>
                
                <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 mb-6">
                  <p className="text-gray-300 mb-4">
                    We expected AI to feel like a turbo‑charger. For many teams it felt like a parking brake.
                    Same codebase. Same tools. Radically different outcomes. Why?
                  </p>
                  <p className="text-gray-300 mb-4">
                    In every interview and field study, the pattern was identical: the best engineers spent
                    almost no time “prompting.” They spent time removing ambiguity. They carried their project’s
                    memory between sessions—and handed it to the model in seconds.
                  </p>
                  <p className="text-gray-300">
                    The worst outcomes weren’t caused by bad models. They were caused by <span className="font-semibold text-white">context debt</span>—
                    the silent tax you pay every time a tool asks, “what are we doing again?”
                  </p>
                </div>

                <div className="bg-gray-900/50 border-l-4 border-green-500 p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Diagnosis</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li><span className="text-white font-medium">No persistent memory:</span> each session begins at page one.</li>
                    <li><span className="text-white font-medium">Context drift:</span> answers optimize for a generic project, not yours.</li>
                    <li><span className="text-white font-medium">Prior mismatch:</span> the model’s defaults fight your patterns and constraints.</li>
                  </ul>
                </div>

                <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">The Simple Fix</h3>
                  <p className="text-gray-300 mb-4">
                    Give the model the same three pages every time. Not a novel—just the table of contents:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li><code className="bg-gray-700 px-2 py-1 rounded text-green-400">DEVLOG.md</code> — why we built what we built.</li>
                    <li><code className="bg-gray-700 px-2 py-1 rounded text-green-400">SYSTEM_STATUS.md</code> — what actually works right now.</li>
                    <li><code className="bg-gray-700 px-2 py-1 rounded text-green-400">EPIC_MANAGEMENT.md</code> — what we’re building next.</li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    With this “Context Trinity,” ramp‑up drops from hours of re‑explaining to seconds of reuse.
                    The model stops guessing and starts collaborating.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Chapters Tab */}
            {activeTab === 'chapters' && (
              <motion.div
                key="chapters"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Table of Contents</h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">Part I: The Problem</h3>
                    <div className="space-y-2">
                      {chapters.slice(0, 2).map((chapter) => (
                        <div key={chapter.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded hover:bg-gray-900/70 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-500">Ch {chapter.id}</span>
                            <span className="text-white">{chapter.title}</span>
                          </div>
                          {chapter.status === 'preview' && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                              Preview Available
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">Part II: The Experiments</h3>
                    <div className="space-y-2">
                      {chapters.slice(2, 4).map((chapter) => (
                        <div key={chapter.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded opacity-75">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-500">Ch {chapter.id}</span>
                            <span className="text-gray-400">{chapter.title}</span>
                          </div>
                          <span className="text-xs bg-gray-700 text-gray-500 px-2 py-1 rounded">
                            Full Book
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-purple-400 mb-3">Part III: The Solution</h3>
                    <div className="space-y-2">
                      {chapters.slice(4, 6).map((chapter) => (
                        <div key={chapter.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded opacity-75">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-500">Ch {chapter.id}</span>
                            <span className="text-gray-400">{chapter.title}</span>
                          </div>
                          <span className="text-xs bg-gray-700 text-gray-500 px-2 py-1 rounded">
                            Full Book
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BookPreview;
