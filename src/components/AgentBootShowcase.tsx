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
  Home
} from 'lucide-react';

export const AgentBootShowcase = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [agentBootCode, setAgentBootCode] = useState('');
  
  // Agent Boot Terminal State
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll terminal to bottom when new content is added
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalOutput]);

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

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Health Monitoring',
      description: 'Real-time project status with automatic documentation updates'
    },
    {
      icon: <GitBranch className="w-5 h-5" />,
      title: 'Epic Management',
      description: 'Create, track, and manage epics with GitHub integration'
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Visual Progress',
      description: 'Beautiful progress bars and metrics tracking'
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: 'AI-Assisted TDD',
      description: 'Red → Green → Refactor with AI implementation'
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: 'Manifest Generation',
      description: 'Automatic project analysis and dependency tracking'
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: 'Deploy Pipeline',
      description: 'Validated deployments with pre-flight checks'
    }
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
            <p className="text-xl text-gray-300 mb-2">
              Your AI-OS Project Companion
            </p>
            <p className="text-gray-400 italic max-w-2xl mx-auto">
              750+ lines of intelligent automation that transforms how you manage AI-assisted development. 
              From health checks to deployment, everything automated.
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
                  ease: 'easeInOut'
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
                      750+ lines of intelligent automation with health checks, progress tracking, and GitHub integration
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-semibold text-gray-300">Auto Documentation</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Automatic updates to DEVLOG, SYSTEM_STATUS, and EPICS with complete audit trails
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

        {/* Two Column Layout: Code and Terminal */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* AGENT-BOOT.py Code Showcase */}
          <motion.div
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
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                    title="Copy code"
                  >
                    {copiedCode ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/code-examples/AGENT-BOOT.py"
                    download="AGENT-BOOT.py"
                    className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-gray-400" />
                  </motion.a>
                </div>
              </div>
            
            <div className="bg-black/50 rounded-lg p-4 overflow-x-auto max-h-[500px]">
              <pre className="text-sm font-mono">
                <code className="language-python text-gray-300">
{agentBootCode}
                </code>
              </pre>
            </div>
            
              <div className="mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <p className="text-sm text-gray-400 mb-2">
                  Complete implementation includes:
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    Health monitoring & status checks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    Automatic documentation updates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    GitHub integration with graceful degradation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    Visual progress tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    TDD workflow automation
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Agent Boot Terminal Live Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">
                  Live Demo
                </h3>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                    title={isPlaying ? "Pause" : "Play"}
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
                  <div className="text-xs text-gray-500 font-mono">🚀 Agent Boot Live</div>
                  <div className="text-xs text-gray-500 font-mono">AI-OS Project</div>
                </div>
                
                {/* Terminal Content */}
                <div ref={terminalContentRef} className="p-4 font-mono text-sm h-[500px] overflow-y-auto">
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
                <p className="text-sm text-gray-400 mb-2">
                  Live example showing:
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    Real-time health monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    Epic creation with GitHub integration
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    Visual progress tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    TDD workflow automation
                  </li>
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
            Agent Boot is part of the AI-OS-STORYBOOK project, providing intelligent automation 
            for AI-assisted development. From health monitoring to deployment, everything you need 
            in one powerful tool.
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
