'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Code,
  Terminal,
  Play,
  Copy,
  Check,
  Download,
  ExternalLink,
  Pause,
  RotateCcw,
  Github,
  FileText,
  CheckCircle,
  Zap,
  Shield,
  GitBranch,
  Package,
  Rocket,
  Brain,
  BarChart3,
  ArrowLeft,
  Home,
} from 'lucide-react';

export const AgentBootShowcase = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [agentBootCode, setAgentBootCode] = useState('');

  // Agent Boot Terminal State
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Left-side Scenario Terminal State
  const [scenarioOutput, setScenarioOutput] = useState<string[]>([]);
  const [scenarioPlaying, setScenarioPlaying] = useState(true);
  const [scenarioCommandIndex, setScenarioCommandIndex] = useState(0);
  const scenarioContentRef = useRef<HTMLDivElement>(null);

  // Load the AGENT-BOOT.py code
  useEffect(() => {
    fetch('/code-examples/AGENT-BOOT.py')
      .then((res) => res.text())
      .then((code) => setAgentBootCode(code))
      .catch(() => setAgentBootCode(getDefaultAgentBootCode()));
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(agentBootCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getDefaultAgentBootCode = () => `#!/usr/bin/env python3
"""AGENT-BOOT.py - AI-OS Project Companion"""

import json
import subprocess
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional

class AgentBoot:
    """Your AI-OS Project Companion"""
    
    def __init__(self):
        self.project_root = Path.cwd()
        self.docs_path = self.project_root / "docs"
        self.manifest_path = self.project_root / "manifest.json"
        
    def health_check(self) -> Dict:
        """Real-time project health monitoring"""
        return {
            "documentation": self.check_docs(),
            "tests": self.run_tests(),
            "github": self.check_github(),
            "manifest": self.check_manifest()
        }
    
    def create_epic(self, name: str, tasks: int = 5) -> Dict:
        """Create epic with auto-generated tasks"""
        epic = {
            "id": f"EPIC-{datetime.now().strftime('%Y%m%d')}",
            "name": name,
            "tasks": [f"Task {i+1}" for i in range(tasks)],
            "status": "TODO"
        }
        self.update_epics(epic)
        self.log_to_devlog(f"Created epic: {name}")
        return epic
    
    def visual_progress(self) -> None:
        """Display visual progress bars"""
        components = self.get_component_status()
        for name, progress in components.items():
            bar = "▓" * (progress // 5) + "░" * (20 - progress // 5)
            print(f"{name}: {bar} {progress}%")
    
    def deploy(self, target: str = "staging") -> bool:
        """Deploy with validation"""
        if self.validate_deployment():
            return self.execute_deployment(target)
        return False

# Initialize and run
if __name__ == "__main__":
    boot = AgentBoot()
    boot.health_check()
    print("🚀 Agent Boot Ready!")
`;

  // Agent Boot Terminal Commands and Outputs - Enhanced
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
        '📝 Auto-logged to DEVLOG.md',
      ],
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
        '🎯 Epic ID: AUTH-001',
      ],
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
        '📈 Overall: 71% Complete',
      ],
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
        '🔄 GitHub sync completed',
      ],
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
        '5️⃣ Refactoring & docs updated',
      ],
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
        '🔗 https://staging.app.com',
      ],
    },
  ];

  // Left Scenario Terminal: narrative/status demonstration
  const scenarioCommands = [
    {
      command: '> agent-boot analyze --status --epics --devlog --issues',
      output: [
        `This needs to get developed, where are we now? load your agent_boot and lets see where we are now, epics tasks, devlog and issues nad epics on github`,
        ``,
        `I’ll run the project agent to get a fresh analysis, read the EPICS roadmap and the latest DEVLOG entries, and query GitHub for open issues (including anything labeled as epics). This will give us a consolidated status across local docs and GitHub. Now executing these steps.`,
        `/Users/betolbook/Documents/github/QuizMentor.ai/docs/roadmap/EPICS.md`,
        `/Users/betolbook/Documents/github/QuizMentor.ai/docs/status/DEVLOG.md (1-200)`,
        ``,
        `Here’s the current state across the project, pulled via the agent, roadmap, dev log, and GitHub:`,
        ``,
        `Agent status (AGENT_BOOT)`,
        `•  Health: Package.json, node_modules, src, tests, Storybook, TS config OK; Jest config missing`,
        `•  TDD priorities:`,
        `1. Fix test environment foundation (Jest configuration)`,
        `2. Wire Supabase authentication (30% complete)`,
        `3. Implement analytics persistence`,
        `4. Complete theme consistency (75% done)`,
        `5. Add API contract testing`,
        ``,
        `Roadmap (EPICS.md)`,
        `•  Now Working On (as of 2025-08-30)`,
        `•  EPIC-12 Simplify Agent Boot & Docs — In Progress`,
        `◦  Minimal ops: docs:updates active; remove Agent badge, agent:validate, and pre-Storybook agent:sync.`,
        `•  Authentication & OAuth — P0`,
        `◦  Wire Supabase auth (GitHub + email) end-to-end.`,
        `•  Testing & QA — P1`,
        `◦  Stabilize RN/Expo unit test environment; fix brittle TurboModules.`,
        `•  Analytics & Tracking — P1`,
        `◦  Persist client events to backend; add contract tests.`,
        `•  Backend/API Foundation — P1`,
        `◦  Back API stubs with Supabase; implement contract tests and OpenAPI.`,
        `•  Theme/UI Consistency — P1`,
        `◦  Propagate theme across Epic screens; remove hardcoded styles.`,
        ``,
        `DevLog (latest entries)`,
        `•  [2025-09-01 05:01:31] STATUS_UPDATE — Updated system status: {'build_status': '✅ Passing'}`,
        `•  [2025-09-01 05:00:46] DOCS — Added 64 expert-level quiz questions and comprehensive QUIZ_INVENTORY documentation`,
        `•  Outstanding gaps recorded earlier:`,
        `•  No ProfileScreen.tsx`,
        `•  No GitHub OAuth implementation`,
        `•  Services not wired to backend`,
        `•  No privacy policy / GDPR UI`,
        `•  Testing at ~5% coverage`,
        `•  Missing core screens (Quiz, Home, Leaderboard)`,
        ``,
        `GitHub issues and epics`,
        `•  Open issues: none found (gh issue list returned empty)`,
        `•  Epic-labeled issues: none found (no issues with label epic/Epic)`,
        `•  Note: We previously generated content locally but did not create issues on GitHub yet.`,
        ``,
        `What I can do next (say the word and I’ll run it)`,
        `•  Create GitHub issues from the TDD priorities (with proper labels and bodies), using the agent’s generator.`,
        `•  Add an Epic label and create one umbrella “EPIC” issue per roadmap item, then link child tasks.`,
        `•  Add/update a Jest config to clear the test-env blocker, then wire in a minimal test to verify setup.`,
        `•  Generate a focused Auth/OAuth task breakdown (Supabase + GitHub OAuth) as issues.`,
      ],
    },
  ];

  // Auto-scroll terminal to bottom when new content is added (right)
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Auto-scroll terminal to bottom when new content is added (left)
  useEffect(() => {
    if (scenarioContentRef.current) {
      scenarioContentRef.current.scrollTop = scenarioContentRef.current.scrollHeight;
    }
  }, [scenarioOutput]);

  // Terminal Animation Effect (right / demo)
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
    setTerminalOutput((prev) => [...prev, currentCommand.command]);

    // Type the output lines
    const interval = setInterval(() => {
      if (outputIndex < currentCommand.output.length) {
        setTerminalOutput((prev) => [...prev, currentCommand.output[outputIndex]]);
        outputIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentCommandIndex((prev) => prev + 1);
        }, 2000); // Wait before next command
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentCommandIndex]);

  // Terminal Animation Effect (left / scenario)
  useEffect(() => {
    if (!scenarioPlaying || scenarioCommandIndex >= scenarioCommands.length) return;

    const currentCommand = scenarioCommands[scenarioCommandIndex];
    let outputIndex = 0;

    setScenarioOutput((prev) => [...prev, currentCommand.command]);

    const interval = setInterval(() => {
      if (outputIndex < currentCommand.output.length) {
        setScenarioOutput((prev) => [...prev, currentCommand.output[outputIndex]]);
        outputIndex++;
      } else {
        clearInterval(interval);
        setScenarioPlaying(false);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [scenarioPlaying, scenarioCommandIndex]);

  const resetTerminal = () => {
    setTerminalOutput([]);
    setCurrentCommandIndex(0);
    setIsPlaying(true);
  };

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Health Monitoring',
      description: 'Real-time project status with automatic documentation updates',
    },
    {
      icon: <GitBranch className="w-5 h-5" />,
      title: 'Epic Management',
      description: 'Create, track, and manage epics with GitHub integration',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Visual Progress',
      description: 'Beautiful progress bars and metrics tracking',
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: 'AI-Assisted TDD',
      description: 'Red → Green → Refactor with AI implementation',
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: 'Manifest Generation',
      description: 'Automatic project analysis and dependency tracking',
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: 'Deploy Pipeline',
      description: 'Validated deployments with pre-flight checks',
    },
  ];

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
                <Terminal className="w-5 h-5 text-green-400" />
                <span className="font-bold text-lg">
                  <span className="text-white">Agent</span>
                  <span className="text-green-400">Boot</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">AI-OS Developer Tools</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                Developer Tools
              </span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Agent Boot
            </h1>
            <p className="text-xl text-gray-300 mb-2">Your AI-OS Project Companion</p>
            <p className="text-gray-400 italic max-w-2xl mx-auto">
              750+ lines of intelligent automation that transforms how you manage AI-assisted
              development. From health checks to deployment, everything automated.
            </p>
          </motion.div>
        </div>

        {/* GitHub Repository Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-800/90 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
            <div className="relative p-6">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-teal-600/10"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl">
                      <Code className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">AI-OS-STORYBOOK</h3>
                      <p className="text-sm text-gray-400">Complete implementation & patterns</p>
                    </div>
                  </div>
                  <motion.a
                    href="https://github.com/MarcoPWx/AI-OS-STORYBOOK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    <span className="font-semibold">View on GitHub</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-semibold text-gray-300">AGENT_BOOT.py</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      750+ lines of intelligent automation with health checks, progress tracking,
                      and GitHub integration
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-semibold text-gray-300">
                        Auto Documentation
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Automatic updates to DEVLOG, SYSTEM_STATUS, and EPICS with complete audit
                      trails
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-semibold text-gray-300">TDD Workflow</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Red → Green → Refactor automation with AI-assisted implementation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-green-400">{feature.icon}</div>
                <h3 className="text-white font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Two Column Layout: Scenario (left) and Terminal (right) */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 items-stretch">
          {/* Left: Scenario Terminal (animated example) */}
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-green-400" />
                  AGENT-BOOT.py
                </h3>
              </div>

              {/* Terminal Window */}
              <div className="bg-gray-950 rounded-lg overflow-hidden">
                {/* Terminal Header */}
                <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="text-xs text-gray-500 font-mono">AGENT-BOOT.py</div>
                  <div className="text-xs text-gray-500 font-mono">Scenario</div>
                </div>

                {/* Terminal Content */}
                <div
                  ref={scenarioContentRef}
                  className="p-4 font-mono text-sm h-[500px] overflow-y-auto"
                >
                  {scenarioOutput.map((line, index) => {
                    const lineText = line || '';
                    return (
                      <motion.div
                        key={`scenario-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${
                          lineText.startsWith('>')
                            ? 'text-green-400 mt-2'
                            : lineText.startsWith('📊') || lineText.startsWith('🚀')
                              ? 'text-white font-bold mt-2'
                              : lineText.startsWith('✓') || lineText.includes('✅')
                                ? 'text-green-400'
                                : lineText.includes('❌')
                                  ? 'text-red-400'
                                  : lineText.includes('🚧') || lineText.includes('⚠️')
                                    ? 'text-yellow-400'
                                    : lineText.startsWith('•') || lineText.match(/^\d\./)
                                      ? 'text-gray-400 ml-4'
                                      : 'text-gray-300'
                        }`}
                      >
                        {lineText || '\u00A0'}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Agent Boot Terminal Live Demo */}
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-green-400" />
                  AGENT-BOOT.py
                </h3>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Play className="w-4 h-4 text-gray-400" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetTerminal}
                    className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                    title="Reset"
                  >
                    <RotateCcw className="w-4 h-4 text-gray-400" />
                  </motion.button>
                </div>
              </div>

              {/* Terminal Window */}
              <div className="bg-gray-950 rounded-lg overflow-hidden">
                {/* Terminal Header */}
                <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-green-400" /> AGENT-BOOT.py
                  </div>
                  <div className="text-xs text-gray-500 font-mono">AI-OS Project</div>
                </div>

                {/* Terminal Content */}
                <div
                  ref={terminalContentRef}
                  className="p-4 font-mono text-sm h-[500px] overflow-y-auto"
                >
                  {terminalOutput.map((line, index) => {
                    // Safety check for undefined line
                    const lineText = line || '';
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${
                          lineText.startsWith('>')
                            ? 'text-green-400 mt-2'
                            : lineText.startsWith('📊') || lineText.startsWith('🚀')
                              ? 'text-white font-bold mt-2'
                              : lineText.startsWith('✓') || lineText.includes('✅')
                                ? 'text-green-400'
                                : lineText.includes('❌') || lineText.includes('FAILING')
                                  ? 'text-red-400'
                                  : lineText.includes('🚧') || lineText.includes('⚠️')
                                    ? 'text-yellow-400'
                                    : lineText.startsWith('•') || lineText.match(/^\d\./)
                                      ? 'text-gray-400 ml-4'
                                      : lineText.startsWith('▓')
                                        ? 'text-cyan-400 font-bold'
                                        : 'text-gray-300'
                        }`}
                      >
                        {lineText || '\u00A0'}
                      </motion.div>
                    );
                  })}
                  {isPlaying && (
                    <motion.span
                      className="inline-block w-2 h-4 bg-green-400 ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <p className="text-sm text-gray-400 mb-1">
                  Live example showing these steps (loops automatically):
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  Currently:{' '}
                  {
                    [
                      'Health check',
                      'Epic creation with GitHub issues',
                      'Progress report',
                      'Manifest generation',
                      'TDD workflow (red → green → refactor)',
                      'Staging deploy with validation',
                    ][Math.min(currentCommandIndex, 5)]
                  }
                </p>
                <ul className="text-xs space-y-1">
                  {[
                    'Health check',
                    'Epic creation with GitHub issues',
                    'Progress report',
                    'Manifest generation',
                    'TDD workflow (red → green → refactor)',
                    'Staging deploy with validation',
                  ].map((label, idx) => {
                    const active = idx === Math.min(currentCommandIndex, 5);
                    const done = idx < Math.min(currentCommandIndex, 5);
                    return (
                      <li
                        key={label}
                        className={`flex items-center gap-2 ${active ? 'text-white' : done ? 'text-gray-300' : 'text-gray-500'}`}
                      >
                        {active ? (
                          <Zap className="w-3 h-3 text-yellow-400" />
                        ) : done ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <span className="w-3 h-3 rounded-full bg-gray-600 inline-block" />
                        )}
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-green-600/10 to-teal-600/10 rounded-lg border border-green-600/20 p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Development Workflow?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Agent Boot is part of the AI-OS-STORYBOOK project, providing intelligent automation for
            AI-assisted development. From health monitoring to deployment, everything you need in
            one powerful tool.
          </p>
          <div className="flex justify-center gap-4">
            <motion.a
              href="https://github.com/MarcoPWx/AI-OS-STORYBOOK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              Get Started on GitHub
            </motion.a>
            <motion.a
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-5 h-5" />
              Read the Book
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
