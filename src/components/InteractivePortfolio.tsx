'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
  BookOpen,
  Code2,
  Rocket,
  Users,
  Heart,
  Coffee,
  ChevronRight,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  User,
  Sparkles,
  Zap,
  Star,
  TrendingUp,
  Globe,
  Award,
  FileText,
  Briefcase,
  GraduationCap,
  Target,
  Database,
  Shield,
  Lock,
  CheckCircle,
  ArrowUpRight,
  Play,
  Pause,
  StepForward,
  RotateCcw,
  Terminal as TerminalIcon,
  Copy,
  Check,
  FileCode,
  Server,
  Cpu,
  GitBranch,
  Package,
  Layers,
  Activity,
  Brain,
  Gamepad2,
  PenTool,
  MessageSquare,
  FileSearch,
  Bot,
  Puzzle,
  BarChart,
  Lightbulb,
  Home,
  BookOpenCheck,
  ScrollText,
  Terminal,
  Map,
  MapPin,
  KeyRound,
  Palette,
  Smartphone,
  Cloud,
  Settings,
  Gauge,
  X,
  ChevronDown,
  Info,
  Book,
  Workflow,
  Timer,
  Boxes,
  Network,
  ShieldCheck,
  Infinity,
  GitPullRequest,
  Hash,
  Braces,
  Command,
  Sparkle,
  Wand2,
  FlaskConical,
  Laptop,
  Monitor,
  HardDrive,
  Wifi,
  GitCommit,
  Binary,
  TestTube,
  Beaker,
  Microscope,
  Atom,
  Dna,
  CircuitBoard,
  MousePointer,
  Compass,
  Flag,
  Milestone,
  Award as AwardIcon,
  Trophy,
  Medal,
  Crown,
  Flame,
  Gem,
  Diamond,
  Hexagon,
  Pentagon,
  Triangle,
  Circle,
  Square,
  Octagon,
  Star as StarIcon,
  ArrowUp,
  Maximize2,
  Eye,
  TrendingDown,
  Percent,
  DollarSign,
  PieChart,
  BarChart3,
  LineChart,
  Video,
  Mic,
  Camera,
  Radio,
  Tv,
  Youtube,
  Chrome,
  Code,
  Layers3,
  Component,
  Box,
  Grid,
  Layout,
  Menu,
} from 'lucide-react';
// Defer loading of the heavy skills showcase until the user navigates to it
import dynamic from 'next/dynamic';
const DynamicTechnicalStackV3 = dynamic(
  () => import('./TechnicalStackV3').then((m) => m.TechnicalStackV3),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: 320 }}>Loading skills…</div>,
  },
);
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { Button, Card, Badge, IconButton, TypewriterCycle, FloatingParticles } from './ui';
import { SectionTitle, GradientText } from './ui/Typography';
import { ProjectStack } from './ProjectStack';

// Floating particles background with more green blobs
function ParticlesBackground() {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const prefersReducedMotion = useReducedMotion();

  // Generate stable random values
  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: `small-${i}`,
      initialX: Math.random() * 1920,
      initialY: Math.random() * 1080,
      targetX: Math.random() * 1920,
      targetY: Math.random() * 1080,
      duration: Math.random() * 20 + 10,
    }));
  }, []);

  const blobs = useMemo(() => {
    return [...Array(4)].map((_, i) => ({
      id: `blob-${i}`,
      initialX: Math.random() * 1920 - 128,
      initialY: Math.random() * 1080 - 128,
      targetX: Math.random() * 1920 - 128,
      targetY: Math.random() * 1080 - 128,
      duration: Math.random() * 15 + 25,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });

      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="particles-container fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-950/60 to-gray-900/50" />
      </div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div className="particles-container fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-950/60 to-gray-900/50" />
      </div>
    );
  }

  return (
    <div className="particles-container fixed inset-0 overflow-hidden pointer-events-none">
      {/* Small particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"
          initial={{
            x: particle.initialX * (dimensions.width / 1920),
            y: particle.initialY * (dimensions.height / 1080),
            opacity: 0,
          }}
          animate={{
            x: particle.targetX * (dimensions.width / 1920),
            y: particle.targetY * (dimensions.height / 1080),
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          style={{ willChange: 'transform, opacity' }}
        />
      ))}

      {/* Large green blobs with gradient */}
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute opacity-20"
          style={{ width: '256px', height: '256px', willChange: 'transform' }}
          initial={{
            x: blob.initialX * (dimensions.width / 1920),
            y: blob.initialY * (dimensions.height / 1080),
          }}
          animate={{
            x: blob.targetX * (dimensions.width / 1920),
            y: blob.targetY * (dimensions.height / 1080),
          }}
          transition={{
            duration: blob.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-full h-full bg-gradient-to-br from-green-500/30 via-teal-500/20 to-transparent rounded-full"
            style={{ filter: 'blur(20px)', WebkitFilter: 'blur(20px)' }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Subtle 3D Card with toned down hover effects
function Card3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Reduced rotation from 20 to 5 degrees
    rotateX.set((y - 0.5) * 5);
    rotateY.set((x - 0.5) * -5);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const transform = useTransform(
    [springRotateX, springRotateY],
    ([x, y]) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`,
  );

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        WebkitTransformStyle: 'preserve-3d',
        transform,
      }}
    >
      {children}
    </motion.div>
  );
}

// Interactive Terminal Component
function InteractiveTerminal({
  commands,
  title = 'Terminal',
  script,
  autoplay = false,
  showInput = true,
  animateTyping = true,
  typingSpeedMs = 70,
  outputLineDelayMs = 420,
  loop = true,
  loopPauseMs = 1800,
  heightClass = 'h-64',
  controls = false,
  subtitle,
  collapsible = false,
  defaultCollapsed = false,
  glowOnActivity = false,
  controlledCollapsed,
  onToggleCollapsed,
  terminalIcon,
  accentColor = 'green',
}: {
  commands: Record<string, string>;
  title?: string;
  script?: { cmd: string; delay?: number }[];
  autoplay?: boolean;
  showInput?: boolean;
  animateTyping?: boolean;
  typingSpeedMs?: number;
  outputLineDelayMs?: number;
  loop?: boolean;
  loopPauseMs?: number;
  heightClass?: string;
  controls?: boolean;
  subtitle?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  glowOnActivity?: boolean;
  controlledCollapsed?: boolean;
  onToggleCollapsed?: (next: boolean) => void;
  terminalIcon?: React.ReactNode;
  accentColor?: 'green' | 'blue' | 'purple' | 'amber';
}) {
  const [input, setInput] = useState('');
  type HistoryEntry = { type: 'input' | 'output' | 'error'; text: string };
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'output', text: `🚀 ${title}` },
    { type: 'output', text: 'Type "help" to view commands' },
  ]);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [stepIndex, setStepIndex] = useState(0);
  const runningRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isControlled = typeof controlledCollapsed === 'boolean';
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(defaultCollapsed);
  const collapsed = isControlled ? (controlledCollapsed as boolean) : internalCollapsed;
  const toggleCollapsed = () => {
    const next = !collapsed;
    if (onToggleCollapsed) onToggleCollapsed(next);
    if (!isControlled) setInternalCollapsed(next);
  };
  const [activityPulse, setActivityPulse] = useState<boolean>(false);

  const handleCommand = (cmd: string) => {
    const newHistory: HistoryEntry[] = [...history, { type: 'input', text: `> ${cmd}` }];
    const command = commands[cmd.toLowerCase()];
    if (command) {
      // Print full output at once for manual input
      newHistory.push({ type: 'output', text: command });
    } else if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else {
      newHistory.push({ type: 'error', text: `Command not found: ${cmd}` });
    }
    setHistory(newHistory);
    setInput('');
  };

  // Reset history when script changes (for autoplay flows)
  useEffect(() => {
    setHistory([
      { type: 'output', text: `🚀 ${title}` },
      { type: 'output', text: 'Type "help" to view commands' },
    ]);
    setInput('');
    setStepIndex(0);
    setIsPlaying(autoplay);
  }, [autoplay, JSON.stringify(script), title]);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current && !collapsed) {
      try {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      } catch (e) {
        // no-op
      }
    }
  }, [history.length, collapsed]);

  // Pulse glow when there is activity and panel is collapsed
  useEffect(() => {
    if (glowOnActivity && collapsed) {
      setActivityPulse(true);
      const t = setTimeout(() => setActivityPulse(false), 1500);
      return () => clearTimeout(t);
    }
  }, [history.length, glowOnActivity, collapsed]);

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // Run one step (typewriter input + streamed output)
  const runStep = useCallback(async () => {
    if (!script || script.length === 0) return;
    if (runningRef.current) return;
    const idx = stepIndex;
    if (idx >= script.length) {
      // loop or stop
      if (loop) {
        runningRef.current = true;
        await sleep(loopPauseMs);
        setHistory([
          { type: 'output', text: `🚀 ${title}` },
          { type: 'output', text: 'Type "help" to view commands' },
        ]);
        setStepIndex(0);
        runningRef.current = false;
      } else {
        setIsPlaying(false);
      }
      return;
    }

    const step = script[idx];
    runningRef.current = true;
    const preDelay = typeof step.delay === 'number' ? step.delay : 1200;
    await sleep(preDelay);

    const cmd = step.cmd;
    if (animateTyping) {
      setHistory((prev) => [...prev, { type: 'input', text: '> ' }]);
      for (const ch of cmd) {
        await sleep(typingSpeedMs);
        setHistory((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, text: last.text + ch };
          return copy;
        });
      }
    } else {
      setHistory((prev) => [...prev, { type: 'input', text: `> ${cmd}` }]);
    }

    const out = commands[cmd.toLowerCase()];
    if (typeof out === 'string') {
      const lines = out.split('\n');
      for (const line of lines) {
        await sleep(outputLineDelayMs);
        setHistory((prev) => [...prev, { type: 'output', text: line }]);
      }
    } else if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
    } else {
      await sleep(outputLineDelayMs);
      setHistory((prev) => [...prev, { type: 'error', text: `Command not found: ${cmd}` }]);
    }

    setStepIndex((i) => i + 1);
    runningRef.current = false;
  }, [script, stepIndex, animateTyping, typingSpeedMs, outputLineDelayMs, commands, loop, loopPauseMs, title]);

  // Auto-run while playing
  useEffect(() => {
    if (!autoplay) return;
    if (!isPlaying) return;
    if (!script || script.length === 0) return;

    // Kick off one step; the state change will trigger the next
    runStep();
  }, [isPlaying, stepIndex, autoplay, JSON.stringify(script), runStep]);

  return (
    <div className="relative">
      {/* Click to expand/collapse hint with button - above the card */}
      <AnimatePresence mode="wait">
        {collapsible && (
          <motion.div
            key={collapsed ? 'expand' : 'collapse'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center mb-3 flex flex-col items-center gap-1"
          >
            <span className="text-xs text-green-400 font-medium animate-pulse">
              {collapsed ? 'Click to expand' : 'Click to collapse'}
            </span>
            <motion.button
              className="p-1.5 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all"
              title={collapsed ? "Expand terminal" : "Collapse terminal"}
              aria-label={collapsed ? "Expand" : "Collapse"}
              onClick={(e) => { e.stopPropagation(); toggleCollapsed(); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: collapsed ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
        <Card
          className={`font-mono transition-all duration-300 ${
            collapsed ? 'hover:shadow-lg hover:shadow-green-400/20 cursor-pointer' : ''
          } bg-gray-900/90 border-gray-700 shadow-xl backdrop-blur-sm p-4 h-[320px] flex flex-col`}
          onClick={collapsed ? toggleCollapsed : undefined}
        >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <div className="flex-1 text-center px-6">
            <div className="text-gray-300 text-sm font-medium">{title}</div>
            {subtitle && (
              <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
            )}
          </div>
          <div className="w-[60px]" />
        </div>

        {/* Content / Preview */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {collapsed ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full"
              >
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex flex-col h-full">
                  <div className="flex-1 overflow-hidden">
                    <div className="text-xs text-gray-400 space-y-1">
                      {(() => {
                        const lastLines = history.slice(-4);
                        if (lastLines.length === 0) {
                          return <div className="text-gray-500">Ready to start...</div>;
                        }
                        return lastLines.map((l, i) => (
                          <div key={`prev-${i}`} className={`${
                            l.type === 'error' ? 'text-red-400/70' : 
                            l.type === 'input' ? 'text-green-400/70' : 
                            'text-gray-400'
                          } truncate`}>
                            {l.text.length > 80 ? l.text.substring(0, 80) + '...' : l.text}
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-500 whitespace-nowrap">Running</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full flex flex-col"
              >
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto overflow-x-hidden space-y-0.5 pr-1"
                >
          {history.map((item, i) => (
            <div
              key={i}
              className={
                item.type === 'input'
                  ? 'text-green-400 text-xs'
                  : item.type === 'error'
                    ? 'text-red-400 text-xs'
                    : 'text-gray-300 text-xs'
              }
              style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            >
              {item.text}
            </div>
                ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!autoplay && showInput && !collapsed && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-green-400">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommand(input);
            }}
            className="flex-1 bg-transparent outline-none text-gray-300"
            placeholder="Enter command..."
          />
        </div>
        )}
      </Card>
    </div>
  );
}

// Agent Boot Live Demo Terminal
function AgentBootDemo() {
  const commands: Record<string, string> = {
    'agent-boot progress': `📊 Visual Progress Report\n\n⚡ ContentGenerator\n▓▓▓▓▓▓░░░░░░░░░░░░░░ 30%\nStatus: IN_PROGRESS\n\n🔧 API Routes\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%\nStatus: COMPLETE\n\n🎨 UI Components\n░░░░░░░░░░░░░░░░░░░░ 0%\nStatus: TODO`,
    'agent-boot epic create "Epic L" --tasks 5': `✅ Created Epic L\n• 5 tasks added\n• Status: TODO\n• Progress: 0%\n• Updated EPICS.md\n• Session logged to DEVLOG.md`,
    'agent-boot epic list': `📋 All Epics (12 total)\n\nL: Authentication System ▓▓░░░░░░░░ 20%\nK: Content Pipeline     ▓▓▓░░░░░░░ 30%\nJ: API Gateway         ▓▓▓▓▓▓▓▓▓▓ 100%\nI: Testing Suite       ▓▓▓▓▓░░░░░ 50%\nH: DevOps Pipeline     ▓▓▓▓░░░░░░ 40%\nG: Security Patterns   ░░░░░░░░░░ 0%\nF: Monitoring         ▓▓▓▓▓▓░░░░ 60%\nE: Documentation      ▓▓▓▓▓▓▓░░░ 70%\nD: Performance        ▓▓░░░░░░░░ 20%\nC: State Management   ▓▓▓▓▓▓▓▓░░ 80%\nB: Error Handling     ▓▓▓▓▓░░░░░ 50%\nA: Core Architecture  ▓▓▓▓▓▓▓▓▓░ 90%`,
    'agent-boot report': `📊 Comprehensive Project Report\n\n🏗️ Build Status: ✅ PASSING\n🧪 Test Status: ❌ FAILING (3/10 passing)\n📘 TypeScript: ✅ CLEAN (0 errors)\n🐛 GitHub Issues: 30 open, 12 closed\n\n📈 Production Readiness: 35%\n• Circuit Breaker: ✅ Implemented\n• Security Lab: ✅ Created\n• Epic Tracking: ✅ Active\n• CI/CD: 🚧 In Progress\n\n✨ Next Priority: ContentGenerator (30%)`,
    'agent-boot implement ContentGenerator': `🚀 Implementing ContentGenerator...\n\n✓ Created /src/lib/patterns/circuit-breaker.ts\n✓ Added exponential backoff\n✓ Implemented half-open state\n✓ Added metrics collection\n✓ Created fallback support\n\n📝 Updated Documentation:\n• DEVLOG.md ✅\n• SYSTEM_STATUS.md ✅\n• EPICS.md ✅\n\n🎯 ContentGenerator now at 40%!`,
    'agent-boot security-lab create XSS': `🔒 Creating Security Learning Lab...\n\n✓ Created /src/labs/security/xss-demo.ts\n✓ Added vulnerable endpoint (sandboxed)\n✓ Added secure implementation\n✓ Created educational docs\n\n⚠️ Lab Environment Only\n✅ Safe for learning\n✅ Auto-disabled in production\n\n📚 Learn by breaking, fix by understanding!`,
  };

  const script: { cmd: string; delay?: number }[] = [
    { cmd: 'agent-boot progress', delay: 1000 },
    { cmd: 'agent-boot epic create "Epic L" --tasks 5', delay: 2000 },
    { cmd: 'agent-boot epic list', delay: 1500 },
    { cmd: 'agent-boot report', delay: 1800 },
    { cmd: 'agent-boot implement ContentGenerator', delay: 2200 },
    { cmd: 'agent-boot security-lab create XSS', delay: 2000 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-3xl blur-2xl opacity-40"
        animate={{
          scale: [1, 1.02, 0.98, 1],
          opacity: [0.4, 0.5, 0.3, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />
      <InteractiveTerminal
        title="🚀 Agent Boot Live"
        subtitle="Driving to Production"
        commands={commands}
        script={script}
        autoplay
        showInput={false}
        controls
        animateTyping
        typingSpeedMs={40}
        outputLineDelayMs={100}
        loop
        loopPauseMs={3000}
        heightClass="h-[600px]"
        accentColor="green"
      />
    </motion.div>
  );
}

function WorkflowsShowcase() {
  // Four terminals telling a complete story: AI Agent plans → TDD implements → Mock-first validates → Ops deploys
  type Step = { cmd: string; delay?: number };
  // Track which terminals are open - can have multiple open
  const [openTerminals, setOpenTerminals] = useState<Set<string>>(new Set());

  // AI Agent Orchestration terminal - Planning Phase
  const agentCommands: Record<string, string> = {
    'agent start': `AI Agent v2.1.0\n✓ Connected to /src/app\n✓ 128 patterns loaded`,
    "agent plan 'payment feature'": `Analyzing...\n✓ Found 3 payment modules\n✓ Security requirements\n\nPlan: PaymentProcessor + Stripe + retry logic`,
    'agent generate tests': `✓ Unit tests created\n✓ Integration mocks\n✓ E2E flows\n12 test cases ready`,
    'agent create stories': `✓ PaymentForm.stories\n✓ CheckoutFlow.stories\nMSW handlers configured`,
    'agent commit': `✓ docs/payment.md\n✓ tests/payment.test.ts\n✓ stories/Payment.stories\nReady to implement`,
  };
  const agentScript: Step[] = [
    { cmd: 'agent start', delay: 600 },
    { cmd: "agent plan 'payment feature'", delay: 900 },
    { cmd: 'agent generate tests', delay: 800 },
    { cmd: 'agent create stories', delay: 700 },
    { cmd: 'agent commit', delay: 700 },
  ];

  // TDD terminal - Implementation Phase
  const tddCommands: Record<string, string> = {
    'pnpm test:payment': `FAIL payment.test.ts\n  ✕ payment retry (52ms)\n  ✕ card validation (12ms)\nTests: 0/12 passed`,
    'code PaymentProcessor.ts': `✓ Stripe client added\n✓ Retry logic implemented\n✓ Idempotency keys\n✓ Webhook handler`,
    'pnpm test:payment --watch': `PASS payment.test.ts\n  ✓ All 12 tests passing\n  Coverage: 94%`,
    'git commit -m "feat: payment service"': `[main 7g8h9i] feat: payment service\n  3 files changed, 287 insertions(+)`,
    'pnpm test:e2e': `✓ Payment flow complete\n✓ 3D Secure handled\nAll scenarios passed!`,
  };
  const tddScript: Step[] = [
    { cmd: 'pnpm test:payment', delay: 600 },
    { cmd: 'code PaymentProcessor.ts', delay: 900 },
    { cmd: 'pnpm test:payment --watch', delay: 800 },
    { cmd: 'git commit -m "feat: payment service"', delay: 700 },
    { cmd: 'pnpm test:e2e', delay: 800 },
  ];

  // Mock-first terminal - Validation Phase
  const mockCommands: Record<string, string> = {
    'pnpm storybook': `Storybook 9.0\n✓ PaymentForm stories\n✓ MSW mocks active\nhttp://localhost:7007`,
    'msw add stripe': `✓ /payment_intents\n✓ /charges\n✓ /refunds\n✓ /webhooks`,
    'msw simulate errors': `Testing failures:\n• Network timeout\n• Card declined\n• 3D Secure`,
    'pnpm test:visual': `✓ All components match\n✓ No regressions\n4 snapshots updated`,
    'pnpm test:a11y': `✓ WCAG 2.1 AA\n✓ Keyboard nav\n✓ Screen readers\nAll checks passed`,
    'pnpm build': `✓ 12 stories built\n✓ Assets optimized\nReady to deploy`,
  };
  const mockScript: Step[] = [
    { cmd: 'pnpm storybook', delay: 600 },
    { cmd: 'msw add stripe', delay: 800 },
    { cmd: 'msw simulate errors', delay: 700 },
    { cmd: 'pnpm test:visual', delay: 900 },
    { cmd: 'pnpm test:a11y', delay: 800 },
    { cmd: 'pnpm build', delay: 700 },
  ];

  // Ops / Observability terminal - Deployment Phase
  const opsCommands: Record<string, string> = {
    'docker build': `✓ Dependencies installed\n✓ Tests passed\n✓ Image: 142MB\nTagged: payment:v1.0`,
    'kubectl apply -f k8s/': `✓ deployment created\n✓ service created\n✓ configmap created\n✓ secrets configured`,
    'kubectl rollout status': `✓ Replica 1/3 ready\n✓ Replica 2/3 ready\n✓ Replica 3/3 ready\nDeployment complete!`,
    'curl /health': `{"status": "healthy",\n "uptime": "32s",\n "version": "1.0.0"}`,
    'kubectl logs --tail=3': `[INFO] Service started\n[INFO] Stripe connected\n[INFO] Ready for traffic`,
    'prometheus metrics': `success_rate: 98.7%\np95_latency: 247ms\nrequests/sec: 1.2k`,
    'kubectl autoscale': `✓ HPA configured\n✓ Target CPU: 70%\n✓ Replicas: 2-10`,
    'git tag v1.0.0': `✓ Tagged v1.0.0\n✓ Pushed to origin\n🎉 Deployed to production!`,
  };
  const opsScript: Step[] = [
    { cmd: 'docker build', delay: 600 },
    { cmd: 'kubectl apply -f k8s/', delay: 800 },
    { cmd: 'kubectl rollout status', delay: 900 },
    { cmd: 'curl /health', delay: 700 },
    { cmd: 'kubectl logs --tail=3', delay: 800 },
    { cmd: 'prometheus metrics', delay: 700 },
    { cmd: 'kubectl autoscale', delay: 800 },
    { cmd: 'git tag v1.0.0', delay: 600 },
  ];

  // API/Business Contracts terminal - Contract-First Development
  const contractCommands: Record<string, string> = {
    'openapi generate': `✓ payment.yaml v3.0\n✓ 12 endpoints defined\n✓ Schema validation\n✓ Auth requirements`,
    'contract test': `Testing contracts:\n✓ /api/payment POST\n✓ /api/payment/:id GET\n✓ /api/refund POST\nAll contracts valid`,
    'mock from-spec': `✓ Mock server started\n✓ Port: 4000\n✓ Example responses\n✓ Error scenarios`,
    'generate client': `✓ TypeScript client\n✓ Type-safe methods\n✓ Runtime validation\n✓ Retry logic included`,
    'contract validate': `✓ Request schemas\n✓ Response formats\n✓ Error codes\n✓ Breaking changes: 0`,
    'publish docs': `✓ API docs generated\n✓ Interactive playground\n✓ Code examples\n📚 docs.api.dev/v1`,
  };
  const contractScript: Step[] = [
    { cmd: 'openapi generate', delay: 700 },
    { cmd: 'contract test', delay: 800 },
    { cmd: 'mock from-spec', delay: 600 },
    { cmd: 'generate client', delay: 900 },
    { cmd: 'contract validate', delay: 700 },
    { cmd: 'publish docs', delay: 600 },
  ];

  // CI/CD Pipeline terminal - Continuous Integration & Deployment
  const cicdCommands: Record<string, string> = {
    'github actions status': `✓ Unit tests: PASSED\n✓ Integration: PASSED\n✓ Coverage: 87%\n✓ Build: SUCCESS\n✓ Security scan: CLEAN`,
    'npm run test:coverage': `PASS src/**/*.test.ts\n  File      | Coverage\n  --------- | --------\n  All files |   87.3%\n  index.ts  |   92.1%\n  utils.ts  |   84.5%`,
    'docker scan image': `Scanning image...\n✓ No critical vulnerabilities\n⚠ 2 medium issues\n✓ Dependencies updated\n✓ Base image current`,
    'deploy preview': `Creating preview...\n✓ Branch: feature/payment\n✓ URL: preview-42.app\n✓ Tests: 42/42 passed\n✓ Lighthouse: 98/100`,
    'rollback production': `Rolling back...\n✓ Previous version: v1.2.3\n✓ Health checks: OK\n✓ Traffic shifted: 100%\n✓ Rollback complete`,
    'monitor deployment': `📊 Deployment metrics:\n• Success rate: 99.9%\n• Deploy time: 3m 12s\n• Error rate: 0.01%\n• Active users: 1,234`,
  };
  const cicdScript: Step[] = [
    { cmd: 'github actions status', delay: 700 },
    { cmd: 'npm run test:coverage', delay: 800 },
    { cmd: 'docker scan image', delay: 600 },
    { cmd: 'deploy preview', delay: 900 },
    { cmd: 'rollback production', delay: 700 },
    { cmd: 'monitor deployment', delay: 600 },
  ];

  const toggleTerminal = (id: string) => {
    setOpenTerminals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
  const terminalConfigs = [
    {
      id: 'agent',
      title: '🤖 AI Agent Orchestration',
      subtitle: 'Planning & Architecture',
      icon: <Brain className="w-5 h-5" />,
      color: 'purple' as const,
      description: 'AI analyzes requirements and generates implementation plan',
    },
    {
      id: 'tdd',
      title: '🧪 Test-Driven Development',
      subtitle: 'Implementation Phase',
      icon: <TestTube className="w-5 h-5" />,
      color: 'green' as const,
      description: 'Writing tests first, then implementing features',
    },
    {
      id: 'mock',
      title: '🎨 Mock-First Validation',
      subtitle: 'UI & Integration Testing',
      icon: <Palette className="w-5 h-5" />,
      color: 'blue' as const,
      description: 'Storybook components with MSW API mocking',
    },
    {
      id: 'ops',
      title: '🚀 Production Deployment',
      subtitle: 'DevOps & Monitoring',
      icon: <Rocket className="w-5 h-5" />,
      color: 'amber' as const,
      description: 'Containerization, Kubernetes deployment, and observability',
    },
    {
      id: 'contract',
      title: '📜 API/Business Contracts',
      subtitle: 'Contract-First Development',
      icon: <FileCode className="w-5 h-5" />,
      color: 'indigo' as const,
      description: 'OpenAPI specs, contract testing, and API documentation',
    },
    {
      id: 'cicd',
      title: '⚙️ CI/CD Pipeline',
      subtitle: 'Continuous Integration',
      icon: <GitBranch className="w-5 h-5" />,
      color: 'rose' as const,
      description: 'Automated testing, security scanning, and deployment pipelines',
    },
  ];
  
  return (
    <div className="w-full">
      {/* Terminal Grid - 3 columns for 6 terminals */}
      <div className="grid lg:grid-cols-3 gap-4 w-full">
        {/* AI Agent Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="relative"
        >
          <motion.div 
            className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-40 pointer-events-none"
            animate={{
              scale: [1, 1.05, 0.95, 1],
              opacity: [0.4, 0.5, 0.3, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
          />
          <InteractiveTerminal
            title="AI Agent Orchestration"
            subtitle="Planning & Architecture"
            accentColor={terminalConfigs[0].color}
            commands={agentCommands}
            script={agentScript}
            autoplay
            showInput={false}
            animateTyping
            typingSpeedMs={180}
            outputLineDelayMs={1500}
            loop
            loopPauseMs={5000}
            heightClass="h-[400px]"
          />
          <p className="text-xs text-gray-500 mt-4 px-2">{terminalConfigs[0].description}</p>
        </motion.div>
        {/* TDD Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative"
        >
          <motion.div 
            className="absolute -inset-2 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-3xl blur-2xl opacity-40 pointer-events-none"
            animate={{
              scale: [1, 0.95, 1.05, 1],
              opacity: [0.4, 0.3, 0.5, 0.4],
            }}
            transition={{
              duration: 9,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
          />
          <InteractiveTerminal
            title="Test-Driven Development"
            subtitle="Implementation Phase"
            accentColor={terminalConfigs[1].color}
            commands={tddCommands}
            script={tddScript}
            autoplay
            showInput={false}
            animateTyping
            typingSpeedMs={190}
            outputLineDelayMs={1600}
            loop
            loopPauseMs={5000}
            heightClass="h-[400px]"
          />
          <p className="text-xs text-gray-500 mt-4 px-2">{terminalConfigs[1].description}</p>
        </motion.div>
        {/* Mock Validation Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative"
        >
          <motion.div 
            className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-40 pointer-events-none"
            animate={{
              scale: [1, 1.03, 0.97, 1],
              opacity: [0.4, 0.45, 0.35, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
          />
          <InteractiveTerminal
            title="Mock-First Validation"
            subtitle="UI & Integration Testing"
            accentColor={terminalConfigs[2].color}
            commands={mockCommands}
            script={mockScript}
            autoplay
            showInput={false}
            animateTyping
            typingSpeedMs={190}
            outputLineDelayMs={1600}
            loop
            loopPauseMs={5000}
            heightClass="h-[200px]"
          />
          <p className="text-xs text-gray-500 mt-4 px-2">{terminalConfigs[2].description}</p>
        </motion.div>
        {/* DevOps Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="relative"
        >
          <motion.div 
            className="absolute -inset-2 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-3xl blur-2xl opacity-40 pointer-events-none"
            animate={{
              scale: [1, 0.98, 1.02, 1],
              opacity: [0.4, 0.35, 0.45, 0.4],
            }}
            transition={{
              duration: 11,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
          />
          <InteractiveTerminal
            title="Production Deployment"
            subtitle="DevOps & Monitoring"
            accentColor={terminalConfigs[3].color}
            commands={opsCommands}
            script={opsScript}
            autoplay
            showInput={false}
            animateTyping
            typingSpeedMs={185}
            outputLineDelayMs={1550}
            loop
            loopPauseMs={5000}
            heightClass="h-[200px]"
          />
          <p className="text-xs text-gray-500 mt-4 px-2">{terminalConfigs[3].description}</p>
        </motion.div>
        {/* API/Business Contracts Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="relative"
        >
          <motion.div 
            className="absolute -inset-2 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-40 pointer-events-none"
            animate={{
              scale: [1, 1.01, 0.99, 1],
              opacity: [0.4, 0.45, 0.35, 0.4],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
          />
          <InteractiveTerminal
            title="API/Business Contracts"
            subtitle="Contract-First Development"
            accentColor={terminalConfigs[4].color}
            commands={contractCommands}
            script={contractScript}
            autoplay
            showInput={false}
            animateTyping
            typingSpeedMs={175}
            outputLineDelayMs={1450}
            loop
            loopPauseMs={5000}
            heightClass="h-[200px]"
          />
          <p className="text-xs text-gray-500 mt-4 px-2">{terminalConfigs[4].description}</p>
        </motion.div>
        {/* Infrastructure as Code Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="relative"
        >
          <motion.div 
            className="absolute -inset-2 bg-gradient-to-r from-rose-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-40 pointer-events-none"
            animate={{
              scale: [1, 0.97, 1.03, 1],
              opacity: [0.4, 0.35, 0.45, 0.4],
            }}
            transition={{
              duration: 13,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
          />
          <InteractiveTerminal
            title="CI/CD Pipeline"
            subtitle="Continuous Integration"
            accentColor="amber"
            commands={cicdCommands}
            script={cicdScript}
            autoplay
            showInput={false}
            animateTyping
            typingSpeedMs={170}
            outputLineDelayMs={1400}
            loop
            loopPauseMs={5000}
            heightClass="h-[200px]"
          />
          <p className="text-xs text-gray-500 mt-4 px-2">{terminalConfigs[5].description}</p>
        </motion.div>
      </div>
    </div>
  );
}

// Animated Navigation
type SectionId = 'home' | 'projects' | 'skills' | 'about' | 'principles' | 'contact';

// Allow mixed nav items (section switch or link to route)
type NavItem = {
  id?: SectionId;
  label: string;
  icon: React.ReactNode;
  href?: string; // when present, use Link instead of section switch
};

function Navigation({
  activeSection,
  setActiveSection,
}: {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections: NavItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'skills', label: 'Stack', icon: <Layers className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Code className="w-4 h-4" /> },
    { href: '/book', label: 'Book', icon: <BookOpen className="w-4 h-4" /> },
    { href: '/tools', label: 'Tools', icon: <Terminal className="w-4 h-4" /> },
    { id: 'principles', label: 'Principles', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800"
      style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
    >
      <div className="w-full max-w-[90%] 2xl:max-w-[85%] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <span className="font-bold text-lg">
              <span className="text-white">Pixel</span>
              <span className="text-green-400">Quest</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {sections.map((section) => (
              section.href ? (
                <Link
                  key={section.label}
                  href={section.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white hover:bg-gray-900/50 transition-all"
                >
                  {section.icon}
                  <span>{section.label}</span>
                </Link>
              ) : (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as SectionId)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                  }`}
                  style={{ borderRadius: '0.5rem' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </motion.button>
              )
            ))}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <motion.a
              href="https://linkedin.com/in/mapw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://github.com/MarcoPWx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* Desktop Social Links */}
          <motion.a
            href="https://linkedin.com/in/mapw"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden lg:block p-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://github.com/MarcoPWx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden lg:block p-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <Github className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden border-t border-gray-800"
            >
              <div className="py-4 space-y-2">
                {sections.map((section) => (
                  section.href ? (
                    <Link
                      key={`m-${section.label}`}
                      href={section.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all text-gray-400 hover:text-white hover:bg-gray-900/50"
                    >
                      {section.icon}
                      <span>{section.label}</span>
                    </Link>
                  ) : (
                    <motion.button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id as SectionId);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                      }`}
                      style={{ borderRadius: '0.5rem' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {section.icon}
                      <span>{section.label}</span>
                    </motion.button>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// Dynamic components

const DynamicRoadmapModal = dynamic(() => import('./RoadmapModal').then((m) => m.RoadmapModal), {
  ssr: false,
  loading: () => (
    <div role="dialog" aria-label="Roadmap loading">
      Loading Roadmap...
    </div>
  ),
});

const DynamicOpenAPIModal = dynamic(() => import('./OpenAPIModal').then((m) => m.OpenAPIModal), {
  ssr: false,
  loading: () => (
    <div role="dialog" aria-label="OpenAPI loading">
      Loading OpenAPI...
    </div>
  ),
});

// RoadmapModal extracted to separate file

// Project Roadmap Component
function ProjectRoadmap({ project }: { project: string }) {
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
      },
      {
        phase: 'Multiplayer',
        status: 'in-progress',
        items: ['Real-time battles', 'Leaderboards', 'Team competitions', 'Social features'],
        completion: 60,
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
      },
    ],
    harvest: [
      {
        phase: 'MVP',
        status: 'completed',
        items: ['Content scraping', 'Basic transformation', 'Quiz generation', 'API endpoints'],
        completion: 100,
      },
      {
        phase: 'AI Pipeline',
        status: 'in-progress',
        items: [
          'Multi-agent validation',
          'Quality scoring',
          'Legal compliance',
          'Cost optimization',
        ],
        completion: 80,
      },
      {
        phase: 'Scale',
        status: 'planned',
        items: [
          'Distributed processing',
          'Real-time streaming',
          'Custom models',
          'Enterprise features',
        ],
        completion: 20,
      },
    ],
    devmentor: [
      {
        phase: 'Foundation',
        status: 'completed',
        items: [
          'Design patterns & architecture',
          'Auth service',
          'AI Gateway',
          'Epic Management v1',
          'System Status baseline',
        ],
        completion: 100,
      },
      {
        phase: 'Self-Learning',
        status: 'in-progress',
        items: [
          'PBML engine',
          'Observability integration',
          'Repo Analyzer MVP',
          'Quality gates in CI',
        ],
        completion: 70,
      },
      {
        phase: 'Extension Integration',
        status: 'planned',
        items: ['VS Code extension beta', 'Workspace memory', 'Quick-fix library'],
        completion: 20,
      },
    ],
    voice: [
      {
        phase: 'MVP',
        status: 'completed',
        items: ['Streaming transcription', 'VAD', 'Basic UI', 'Local/Cloud models'],
        completion: 100,
      },
      {
        phase: 'Conversational AI',
        status: 'in-progress',
        items: [
          'Context retention',
          'Realtime responses',
          'Latency optimization',
          'Safety filters',
        ],
        completion: 60,
      },
      {
        phase: 'Ecosystem',
        status: 'planned',
        items: ['Multi-speaker diarization', 'Project memory', 'Integrations', 'Mobile support'],
        completion: 10,
      },
    ],
    'devmentor-vscode': [
      {
        phase: 'Alpha',
        status: 'in-progress',
        items: [
          'Inline quick-fixes',
          'Hover helpers',
          'Command palette actions',
          'Pattern-aware prompts',
        ],
        completion: 40,
      },
      {
        phase: 'Beta',
        status: 'planned',
        items: ['Local model routing', 'Workspace memory', 'RAG across repos', 'Telemetry opt-in'],
        completion: 10,
      },
    ],
    'command-center': [
      {
        phase: 'Docs & Testing',
        status: 'completed',
        items: ['Tech Stack pages', 'API playgrounds', 'User journeys', 'Status dashboard'],
        completion: 100,
      },
      {
        phase: 'Observability',
        status: 'in-progress',
        items: ['Incident flows', 'CI artifacts linking', 'Quality gates'],
        completion: 60,
      },
      {
        phase: 'Community',
        status: 'planned',
        items: ['Templates', 'Plugin examples', 'Deploy guides'],
        completion: 20,
      },
    ],
  };

  const phases = (roadmapPhases as any)[project] || [];

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-600 to-teal-600" />

      <div className="space-y-8">
        {phases.map((phase: any, index: number) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-16"
          >
            <div
              className={`absolute left-5 w-6 h-6 rounded-full border-4 border-gray-950 ${
                phase.status === 'completed'
                  ? 'bg-green-500'
                  : phase.status === 'in-progress'
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-gray-600'
              }`}
            />

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">{phase.phase}</h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
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

              <div className="space-y-2">
                {phase.items.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle
                      className={`w-4 h-4 ${
                        phase.status === 'completed' ? 'text-green-400' : 'text-gray-600'
                      }`}
                    />
                    <span className="text-sm text-gray-400">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${phase.completion}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-full ${
                      phase.status === 'completed'
                        ? 'bg-gradient-to-r from-green-500 to-green-400'
                        : phase.status === 'in-progress'
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                          : 'bg-gray-600'
                    }`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Animated Metrics Dashboard
function MetricsDashboard() {
  const metrics = [
    { label: 'Total Users', value: 10000, change: 15, icon: <Users className="w-5 h-5" /> },
    { label: 'Questions Generated', value: 50000, change: 25, icon: <Brain className="w-5 h-5" /> },
    { label: 'API Calls', value: 1000000, change: 40, icon: <Activity className="w-5 h-5" /> },
    { label: 'Uptime', value: 99.9, change: 0, icon: <Shield className="w-5 h-5" />, suffix: '%' },
    {
      label: 'Response Time',
      value: 45,
      change: -20,
      icon: <Zap className="w-5 h-5" />,
      suffix: 'ms',
    },
    {
      label: 'Cost Saved',
      value: 50000,
      change: 35,
      icon: <DollarSign className="w-5 h-5" />,
      prefix: '$',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative bg-gray-900 rounded-xl p-6 border border-gray-800 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-gray-800 rounded-lg">{metric.icon}</div>
            <div
              className={`flex items-center gap-1 text-xs ${
                metric.change > 0
                  ? 'text-green-400'
                  : metric.change < 0
                    ? 'text-red-400'
                    : 'text-gray-400'
              }`}
            >
              {metric.change !== 0 && (
                <>
                  {metric.change > 0 ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{Math.abs(metric.change)}%</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold text-white">
              {metric.prefix}
              {metric.value.toLocaleString()}
              {metric.suffix}
            </div>
            <div className="text-sm text-gray-400">{metric.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function InteractivePortfolio() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [selectedProject, setSelectedProject] = useState('quizmentor');
  const [showRoadmap, setShowRoadmap] = useState<string | null>(null);
  const [roadmapModal, setRoadmapModal] = useState<{ isOpen: boolean; project: string }>({
    isOpen: false,
    project: 'quizmentor',
  });
  const [openapiModal, setOpenapiModal] = useState<{
    isOpen: boolean;
    url: string | null;
    project: string | null;
  }>({ isOpen: false, url: null, project: null });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedProject, setFocusedProject] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Initialize component
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track mouse for interactive effects
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mounted]);

  // Cross-section navigation via custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { section?: string; anchorId?: string };
      if (detail?.section) {
        setActiveSection(detail.section as SectionId);
        if (detail.anchorId) {
          setTimeout(() => {
            const el = document.getElementById(detail.anchorId!);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('navigate-section', handler as any);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('navigate-section', handler as any);
      }
    };
  }, []);

  // Enhanced Terminal commands
  const terminalCommands = {
    help: "📚 Available commands:\n  projects - List all projects\n  skills - Show tech stack\n  about - Who we are\n  contact - Get in touch\n  github - Visit GitHub\n  linkedin - Visit LinkedIn\n  blog - Latest articles\n  metrics - View live stats\n  roadmap - See what's next\n  whoami - About the developer\n  neofetch - System info\n  clear - Clear terminal",
    projects:
      '🚀 Active Projects:\n  • AIBook (OSS Command Center) - AI+TDD workflow\n  • QuizMentor - Gamified learning platform (92% retention)\n  • DevMentor - AI pair programming assistant (95% accuracy)\n  • Harvest.ai - Content intelligence system (99.2% accuracy)\n  • Voice - Voice AI Project',
    skills:
      '💻 Tech Stack:\n  Languages: TypeScript, Python, Go, Rust\n  Frontend: React, Next.js, React Native, Tailwind\n  Backend: Node.js, FastAPI, GraphQL\n  AI/ML: LangChain, OpenAI, Anthropic, Ollama\n  Cloud: AWS, Docker, Kubernetes\n  DB: PostgreSQL, Redis, MongoDB',
    about:
      '🌟 PixelQuest - Exploring the future of developer tools\n  Mission: Create AI-powered tools that enhance developer productivity\n  Focus: Developer experience and thoughtful solutions\n  Team: Passionate developers and AI enthusiasts',
    contact:
      "📬 Let's Connect:\n  Email: Marcowurtz@hotmail.com\n  GitHub: github.com/MarcoPWx\n  LinkedIn: linkedin.com/in/mapw",
    github: '🔗 Opening GitHub... github.com/MarcoPWx',
    linkedin: '💼 Opening LinkedIn... linkedin.com/in/mapw',
    blog: '📝 Latest Posts:\n  • Building Multi-Agent AI Systems\n  • Cost Optimization in Production AI\n  • Real-time Multiplayer at Scale\n  • Privacy-First Analytics',
    metrics:
      '📊 Live Stats:\n  Users: 10,000+\n  API Calls: 1M+\n  Uptime: 99.9%\n  Response: <50ms',
    roadmap:
      '🗺️ Coming Soon:\n  • QuizMentor: Multiplayer battles\n  • DevMentor: Cloud sync\n  • Harvest.ai: Enterprise features\n  • Voice: Realtime conversational features',
    whoami:
      '👨‍💻 Senior Full-Stack Developer\n  Specializing in AI/ML, distributed systems\n  Building at the intersection of AI and DX',
    neofetch:
      '🖥️ PixelQuest OS\n  ================\n  OS: Production v2.0\n  Uptime: 2 years\n  Packages: 4 (production)\n  Shell: zsh\n  DE: React\n  Terminal: portfolio\n  CPU: Multi-core AI\n  Memory: Unlimited',
  };

  // Animated typing text
  const [typingText, setTypingText] = useState('');
  const fullText = 'Transforming ideas into intelligent, scalable solutions';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Project data with real differentiation
  const projects = useMemo(
    () => [
      {
        id: 'quizmentor',
        title: 'QuizMentor',
        tagline: 'Gamified Learning Platform',
        description:
          'Interactive quiz application with gamification elements. Features adaptive learning, instant feedback, and progress tracking. Includes powerful Harvest Scraper system.',
        differentiation: [
          'Quick quiz sessions with instant feedback',
          'Gamification: XP, streaks, achievements',
          'Adaptive difficulty adjustment',
          'Offline mode with sync capabilities',
          'Performance optimized batch processing',
          'AI-powered Harvest Scraper generating 50K+ questions/day',
        ],
        status: 'Alpha',
        metrics: {},
        tech: [
          'React Native',
          'Expo',
          'TypeScript',
          'Next.js',
          'Supabase',
          'PostgreSQL',
        ],
        github: 'https://github.com/MarcoPWx/QuizMentor.ai',
        icon: <Gamepad2 className="w-6 h-6" />,
        color: 'from-purple-600 to-pink-600',
      },
      {
        id: 'harvest-scraper',
        title: 'Harvest Scraper',
        tagline: 'Automated Educational Content Generation',
        description:
          'Enterprise-grade content harvesting system that automatically generates high-quality quiz questions from 120+ technical sources. Features AI-powered generation, legal compliance, and ethical data collection for continuous learning.',
        differentiation: [
          'Processes 120+ sources: docs, Stack Overflow, GitHub, tutorials',
          'Generates 4-5 questions per piece at ~12 questions/second',
          'AI confidence scoring (0.75+ threshold) for quality assurance',
          'Full robots.txt compliance & rate limiting (2s delay)',
          'GDPR/CCPA compliant with PII filtering & attribution',
          'Scales to 50,000+ questions/day with 82% difficulty balance',
        ],
        status: 'Beta',
        metrics: {
          'Sources': '120+',
          'Speed': '12q/s',
          'Daily Cap': '50K',
          'Quality': '0.80',
        },
        tech: [
          'Python',
          'OpenAI',
          'BeautifulSoup',
          'Scrapy',
          'FastAPI',
          'PostgreSQL',
          'Redis',
          'Celery',
        ],
        github: 'https://github.com/MarcoPWx/QuizMentor.ai',
        icon: <Database className="w-6 h-6" />,
        color: 'from-emerald-600 to-green-600',
      },
      {
        id: 'devmentor',
        title: 'DevMentor',
        tagline: 'AI Pair Programming Assistant',
        description:
          'Intelligent coding assistant that maintains repository context and helps with code generation, testing, and documentation.',
        differentiation: [
          'Repository-aware code suggestions',
          'Automated TDD workflow support',
          'Multi-provider AI integration',
          'Context preservation across sessions',
          'Pattern recognition and learning',
        ],
        status: 'Alpha',
        metrics: {},
        tech: [
          'Next.js',
          'React',
          'TypeScript',
          'LangChain',
          'OpenAI',
          'PostgreSQL',
          'Redis',
        ],
        github: 'https://github.com/MarcoPWx/DevMentor.ai',
        icon: <Bot className="w-6 h-6" />,
        color: 'from-blue-600 to-cyan-600',
      },
      {
        id: 'harvest',
        title: 'Harvest.ai',
        tagline: 'Content Transformation Pipeline',
        description:
          'AI-powered content processor that transforms raw text into polished outputs like articles, summaries, and presentations.',
        differentiation: [
          'Multi-format content generation',
          'BYOK (Bring Your Own Keys) support',
          'Streaming API with real-time feedback',
          'Cost transparency and optimization',
          'Privacy-first architecture',
        ],
        status: 'Alpha',
        metrics: {},
        tech: [
          'Python',
          'FastAPI',
          'Next.js',
          'TypeScript',
          'OpenAPI',
          'SSE',
        ],
        github: 'https://github.com/MarcoPWx/Harvest.ai',
        icon: <Brain className="w-6 h-6" />,
        color: 'from-green-600 to-teal-600',
      },
      {
        id: 'devmentor-vscode',
        title: 'DevMentor VS Code Extension',
        tagline: 'AI Assistant for VS Code',
        description:
          'VS Code extension that brings AI-powered code assistance directly to your editor with context-aware suggestions.',
        differentiation: [
          'Inline code suggestions and fixes',
          'Command palette integration',
          'Workspace-aware intelligence',
          'Privacy-focused local processing',
        ],
        status: 'Alpha',
        metrics: {},
        tech: ['TypeScript', 'VS Code API', 'LangChain', 'Node.js'],
        github: 'https://github.com/MarcoPWx/DevMentor.ai',
        icon: <Code className="w-6 h-6" />,
        color: 'from-indigo-600 to-purple-600',
      },
      {
        id: 'voice',
        title: 'Voice AI Assistant',
        tagline: 'Real-time Voice Interactions',
        description:
          'Voice-enabled AI platform for natural conversations with low latency and privacy-focused architecture.',
        differentiation: [
          'Sub-100ms transcription latency',
          'Voice Activity Detection (VAD)',
          'Local processing with cloud fallback',
          'WebRTC streaming support',
          'Offline functionality',
        ],
        status: 'Alpha',
        metrics: {},
        tech: ['TypeScript', 'WebAudio', 'WebRTC', 'Whisper'],
        icon: <Mic className="w-6 h-6" />,
        color: 'from-orange-600 to-red-600',
      },
    ],
    [],
  );

  // Sort projects by status only
  const sortedProjects = useMemo(() => {
    const statusOrder: Record<string, number> = { Production: 1, Beta: 2, Alpha: 3 };
    return [...projects].sort((a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99));
  }, [projects]);

  // Approximate roadmap completion per project for on-card summary
  const roadmapProgress: Record<string, number> = {
    quizmentor: 61,
    devmentor: 63,
    harvest: 67,
    voice: 57,
    'devmentor-vscode': 25,
    'command-center': 60,
  };

  const projectDetails: Record<string, any> = {
    'harvest-scraper': {
      coreOffering:
        '🌾 Automated Educational Content Generation system that harvests and transforms technical content into 50K+ quiz questions daily with enterprise-grade legal compliance and ethical data collection.',
      howItWorks: [
        'Multi-source harvesting from 120+ URLs: AWS docs, Stack Overflow (45+ tags), GitHub repos, tutorials, certification materials',
        'AI pipeline: Extract → Generate 4-5 questions/piece → Create distractors → Add explanations → Assign difficulty → Score confidence (0.75+)',
        'Smart organization: Auto-categorize into 15+ domains → Deduplicate via fingerprinting → Export to QuizMentor format',
        'Legal compliance: robots.txt checking → 2s rate limiting → User-Agent identification → ToS compliance → GDPR/CCPA ready',
        'Performance: ~12 questions/second throughput → 491 questions in 42 seconds → 50K+ questions/day capacity',
      ],
      keyEndpoints: [
        'python3 scripts/python/local_harvester.py --quick — Generate ~500 questions in 10 minutes',
        'python3 scripts/python/local_harvester.py --max-content 500 — Standard 1-hour harvest (~2,500 questions)',
        'python3 scripts/python/local_harvester.py --max-content 10000 — Full 24-hour harvest (50,000+ questions)',
        'python3 scripts/python/integrate_harvest.py — Integrate harvested content into QuizMentor',
        'data/quizzes/harvested/* — Auto-organized quiz files by technology domain',
      ],
      userStories: [
        'As a content manager, I double our quiz database in under an hour without manual creation',
        'As a developer, I harvest fresh questions from updated documentation automatically',
        'As an instructor, I generate certification practice questions for AWS/Azure/Kubernetes on demand',
        'As a compliance officer, I verify all content respects robots.txt and rate limits',
        'As a data scientist, I analyze confidence scores and difficulty distributions across domains',
      ],
      s2sStories: [
        'Scraper → robots.txt checker → rate limiter (2s delay) → content extractor → AI generator → quality scorer → database',
        'Harvester → OpenAI API (4-5 questions per piece) → confidence filter (0.75+) → deduplication → category assignment',
        'Scheduler → cron job → harvest script → process 125 pieces → generate 491 questions → organize into 15 categories',
        'Compliance checker → User-Agent header → crawl delay → ToS scanner → PII filter → GDPR anonymization',
        'Integration pipeline → harvest_index.json → quiz_*_harvested.json files → QuizMentor import → live deployment',
      ],
      features: {
        'Architecture & APIs': [
          'Multi-source content extraction from 120+ technical sources',
          'Batch processing with retry logic and exponential backoff',
          'Auto-organized output structure (harvest_index.json + quiz files)',
          'Direct QuizMentor format compatibility',
        ],
        'AI & Learning': [
          'OpenAI-powered question generation (4-5 per content piece)',
          'Intelligent distractor creation for multiple choice',
          'Detailed explanation generation with examples',
          'Difficulty level assignment (Easy/Medium/Hard)',
          'Confidence scoring for quality filtering (0.75+ threshold)',
        ],
        'Reliability & Performance': [
          '~12 questions/second processing throughput',
          '82% medium difficulty balance maintenance',
          'Exponential backoff on rate limits (429 responses)',
          'Connection pooling and session management',
          'Fault-tolerant with automatic retries (max 3)',
        ],
        'Security & Privacy': [
          'HTTPS-only source requirements',
          'PII filtering and data anonymization',
          'No authentication bypass attempts',
          'Educational fair use compliance',
          'GDPR/CCPA compliant data handling',
        ],
        'Legal Compliance': [
          'Automatic robots.txt detection and respect',
          'Crawl-delay directive honoring',
          'User-Agent identification (QuizMentor-Educational-Bot/1.0)',
          'Terms of Service scanning and compliance',
          'DMCA-ready with takedown procedures',
        ],
        'Observability': [
          'Harvest metrics: speed, volume, quality scores',
          'Source performance tracking',
          'Error rate and retry monitoring',
          'Compliance audit trail logging',
        ],
        'Dev Workflow & QA': [
          'Quick/Standard/Full harvest modes',
          'Dry-run testing capability',
          'Quality threshold configuration',
          'Source whitelist/blacklist management',
        ],
      },
      practices: [
        'Ethical data harvesting',
        'Legal compliance-first',
        'Rate limiting & fair use',
        'Quality over quantity',
        'Attribution preservation',
        'Privacy by design',
      ],
      complianceConfig: {
        'respect_robots': true,
        'user_agent': 'QuizMentor-Educational-Bot/1.0',
        'crawl_delay': 2.0,
        'max_concurrent': 3,
        'timeout': 30,
        'retry_max': 3,
        'check_terms': true,
        'educational_only': true,
        'preserve_attribution': true,
        'filter_pii': true,
        'https_only': true,
      },
      who: [
        'Educational platforms needing continuous content updates',
        'Certification prep companies requiring practice questions',
        'Technical training organizations seeking current material',
        'Developers building quiz/assessment applications',
      ],
      next: [
        'Multi-agent validation for improved accuracy',
        'Real-time streaming harvest capabilities',
        'Custom AI models for domain-specific generation',
        'Advanced deduplication with semantic similarity',
      ],
    },
    quizmentor: {
      coreOffering:
        'Help learners gain real, retained skill in minutes a day through fast, feedback‑rich quizzes they actually want to come back to.',
      howItWorks: [
        'Content pipeline: Scraper/Harvester + AI generation/validation + optional RAG ensures fresh, high‑quality questions',
        'Mock‑first, E2E‑ready app architecture delivers speed, accessibility, and reliability',
        'Journey A — Start & Play: from landing to first answer in under 30 seconds (category grid, optional mode selector, quiz HUD)',
        'Journey B — Learn & Improve: explanations, results summary, “Recently Incorrect” practice loops',
        'Journey C — Track & Compete: profile (XP, streak, achievements), leaderboards, settings & privacy',
      ],
      keyEndpoints: [
        'POST /api/orchestrator/session — Generate an adaptive quiz session in under 30s',
        'POST /api/adaptive/adjust — Apply real‑time difficulty and flow adjustments mid‑session',
        'POST /api/bloom/validate — Validate a question and return pedagogy metrics + suggestions',
        'POST /api/sessions/{sessionId}/results — Submit results and get next‑step recommendations',
        'GET /api/analytics/user/{userId} — Retrieve performance, mastery, and engagement analytics',
      ],
      userStories: [
        'As a learner, I start a 7‑question adaptive session and get instant, clear feedback after every answer.',
        'As a learner, I see “Recently Incorrect” resurface at the right time so I actually retain the concepts.',
        'As a learner, I get Bloom‑level explanations that tell me why an answer is right/wrong and how to improve.',
        'As an instructor, I review a learner’s analytics to spot gaps and assign targeted practice sets.',
        'As a developer, I can programmatically create sessions and submit results to power custom learning flows.',
      ],
      s2sStories: [
        'Mobile/Web App → Next.js API Route → Supabase (RLS policies) → return session payload with guarded fields',
        'App → /api/bloom/validate → store validation + pedagogy metadata in Supabase → analytics aggregates update',
        'App → /api/adaptive/adjust → persist adaptation deltas → recommend next items from orchestrator cache',
        'Cron/Worker → builds “Recently Incorrect” queues from past results → updates session seeds and practice packs',
        'Dev/CI pipeline → performance telemetry published per build → budgets enforce sub‑second UX for session start',
      ],
      features: {
        'Architecture & APIs': [
          'Core quiz engine with instant explanations and results summaries',
          'Supabase Auth, RLS, and Realtime channels',
          'Offline quiz packs with smart sync',
        ],
        'AI & Learning': [
          'Adaptive learning and Bloom’s taxonomy validator',
          'Content pipeline: Scraper/Harvester + AI validation + RAG',
        ],
        'Reliability & Performance': ['Graceful error handling and recovery flows'],
        'Performance Architecture': [
          'Batch processors: Question/Analytics/UserDataSync with retries and backoff',
          'Quiz loading 5x faster: 10 questions in 200ms vs 1000ms',
        ],
        'Security & Privacy': [
          'Supabase Auth with RLS policies',
          'Data minimization and sanitized logs/errors',
        ],
        Observability: ['Performance telemetry (dev/CI)'],
        'Dev Workflow & QA': [
'Storybook component library with MSW mock scenarios',
          'E2E tests (Playwright), unit tests and coverage gates, performance budgets',
        ],
      },
      practices: [
        'Storybook‑driven development',
        'Mock‑first (MSW)',
        'Accessibility‑first UI',
        'Performance budgets',
        'Test pyramid (unit/integration/E2E)',
      ],
      who: [
        'Learners and teams who want engaging practice with measurable progress',
        'Instructors who need quality‑checked question banks',
        'Orgs that prefer self‑hosted analytics and experiments',
      ],
      next: [
        'Realtime battles and team competitions',
        'Leaderboards and social play',
        'Advanced analytics and white‑labeling',
      ],
    },
    devmentor: {
      coreOffering:
        'Repo-aware prompt enrichment + TDD workflow + docs alignment — solving context loss in AI-assisted development (delivered via a VS Code extension).',
      howItWorks: [
        'Feedback loop: Plan → Spec → Test → Implement → Validate → Align docs',
        'Prompt enrichment: relevant files, tests, docs, and diffs automatically gathered for the model',
        'TDD workflow: generate/update tests first, implement code, run and report (red→green→refactor)',
        'Docs alignment: update READMEs/Swagger/Storybook and link changes back to work items',
        'Persistent context (workspace memory + repo RAG): Remembers your repo decisions, patterns, and recent changes, and automatically retrieves relevant code, tests, docs, and diffs into each prompt—so suggestions match your conventions and stay consistent across sessions',
      ],
      keyEndpoints: [
        'POST /api/recommendations/learning-path — Personalized learning paths (Learning Service)',
        'POST /api/prompts/suggestions — Pattern‑aware prompt suggestions with context (Learning Service)',
        'POST /memories/search — Semantic memory retrieval (Memory Service)',
        'GET /memories/insights — User learning insights (Memory Service)',
        'POST /api/prompts/optimize-model — Task‑aware model routing (Learning Service)',
      ],
      userStories: [
        'As a developer, I get inline, repo‑aware suggestions that match our patterns and recent changes.',
        'As a new team member, I request a learning path to ramp up on our stack and practices in days, not weeks.',
        'As a tech lead, I request team insights to identify skill gaps and plan targeted workshops.',
        'As a developer, I save patterns and solutions to memory so they reappear contextually in future prompts.',
        'As a developer, I optimize which model to use for code review to hit latency and accuracy targets.',
      ],
      s2sStories: [
        'VS Code Extension → API Gateway → Learning Service → Memory Service (Qdrant + Postgres) → LLM → back to editor',
        'Project Service publishes EPIC/TASK events → Learning Service updates recommendations and team insights',
        'Learning Service writes decisions to Memory Service → future prompts retrieve similar patterns via semantic search',
        'AI Gateway manages multi‑provider routing with retries and cost tracking → emits metrics for budgets/SLOs',
        'Observability pipeline: services expose /metrics → Prometheus → Grafana dashboards for latency/error budgets',
      ],
      features: {
        'Architecture & APIs': [
          'Contract-first APIs with Swagger/OpenAPI',
          'Auth (OAuth/JWT) and RBAC policy gates',
          'Epic Management: CRUD, filters, statuses, linked docs',
          'System Status: incidents, metrics, and CI artifacts in one view',
        ],
        'AI & Learning': [
          'PBML pattern memory with embeddings stored in Qdrant',
          'Prompt enrichment that bundles relevant files/tests/docs/diffs',
        ],
        'Reliability & Performance': [
          'AI Gateway: multi-provider routing, retries, rate limiting, cost tracking',
          'Real-time events via WebSockets (presence, progress, notifications)',
        ],
        'Security & Privacy': [
          'Workspace memory with policy-aware retrieval',
          'Privacy-first VS Code workflows',
        ],
        Observability: ['Dashboards and SLOs; CI artifacts surfaced in System Status'],
        'Dev Workflow & QA': [
          'Automated TDD loop: generate tests → implement → validate',
          'Quality gates in CI: coverage, a11y, bundle budgets, Playwright E2E',
          'VS Code extension: inline quick-fixes, hovers, and command workflows',
          'PBML CLI for local workflows',
        ],
      },
      practices: [
'Storybook‑driven development',
        'Mock‑first APIs (MSW)',
        'Contract‑first (OpenAPI)',
        'TDD: red → green → refactor',
        'Accessibility checks in CI',
        'Performance budgets in CI/CD',
      ],
      who: [
        'Teams who want AI assistance plus auditable, testable delivery',
        'Leads who need visibility and policy‑as‑checks, not slides',
        'ICs who prefer local‑first, privacy‑respecting workflows',
      ],
      next: [
        'VS Code beta with workspace memory and local model routing',
        'Unified Status dashboard: incidents, artifacts, and perf budgets',
        'Template packs: mock scenarios, API schemas, and demo data',
      ],
    },
    harvest: {
      coreOffering:
        'Transforms raw content (notes, outlines, transcripts, docs) into polished outputs like blogs, summaries, emails, and presentations—fast, predictable, and privacy-first with BYOK.',
      howItWorks: [
        'Content Generation: Submit text → receive formatted output (blog/summary/email) within 90 seconds via deterministic mocks in dev, SSE streaming for progressive output, with cost/latency surfaced',
        'BYOK (Session-only or Encrypted-at-Rest): Use your own provider key. Default is ephemeral, memory-only (auto-wipe, zero retention via proxy). Opt-in encrypted storage with audit logs is available when required.',
'Observability: See request metrics and p95 latencies in dev via /api/metrics counters, Storybook coverage & test dashboards',
        'E2E Stability: Reliable Playwright smokes for streaming, errors, and metrics with centralized selectors and no brittle waits',
      ],
      keyEndpoints: [
        'POST /api/generate — Create content generation job (streaming supported)',
        'GET /api/jobs/{jobId} — Check job status and retrieve results',
        'POST /api/validate-key — Validate BYOK provider key (default: session‑only, no storage)',
        'GET /health — Service health',
        'GET /metrics — Prometheus metrics and counters',
      ],
      userStories: [
        'As a creator, I turn a meeting transcript into a publish‑ready summary via POST /api/generate and download the result minutes later.',
        'As a marketer, I submit dozens of generate jobs in parallel and track each job’s progress and retries until completion.',
        'As a privacy‑first developer, I validate my own provider key with POST /api/validate-key and generate with session‑only keys that are never stored server‑side by default.',
        'As a developer, I stream generation output to render a live preview so users see progress and cost in real‑time.',
        'As an ops engineer, I monitor p95 latency, error rate, and cost per request via /metrics to keep SLOs and budgets on track.',
      ],
      s2sStories: [
        'API Gateway → Rate Limiter → Job Orchestrator → Extractor → Compliance Validator → AI Generator → Post‑Processor → Storage/DB → Webhook → Client',
        'Job Orchestrator → queue with exponential backoff and circuit breaker → ensures resilient end‑to‑end generation',
        'AI Generator → multi‑provider routing (OpenAI/Anthropic/Gemini) with fallback and cost accounting → returns best available result',
        'Cache Manager → in‑memory (L1) + Redis (L2) + CDN (L3) cascading caches to serve popular results quickly and cheaply',
        'Observability → services emit metrics/logs → Prometheus + dashboards → alerts on error budget burn and cost spikes',
      ],
      features: {
        'Architecture & APIs': [
          'REST + streaming API with OpenAPI spec',
          'SSE streaming for progressive output',
          'Content ingestion: URL/Text/File with robust extraction',
        ],
        'AI & Learning': [
          'Multi-provider AI generation with automatic fallback (OpenAI/Anthropic/Gemini)',
          'Chunking and preprocessing pipeline',
        ],
        'Reliability & Performance': [
          'Rate limiting, response caching, retries with exponential backoff, circuit breaker',
        ],
        'Security & Privacy': [
          'BYOK: ephemeral memory-only keys by default',
          'Opt-in encrypted storage with audit logs',
          'Privacy controls and data deletion flows',
        ],
        Observability: [
          'Live token/cost meter and latency visibility',
          'Observability endpoints (/api/metrics) with dashboards',
        ],
        'Dev Workflow & QA': [
'Deterministic dev mocks (Storybook/MSW)',
          'Playwright smoke tests for streaming, errors, metrics',
        ],
      },
      practices: [
'Storybook‑driven development',
        'Mock‑first development (MSW)',
        'Contract‑first APIs (OpenAPI)',
        'E2E smoke tests in CI',
        'Observability‑first workflows',
      ],
      who: [
        'Creators, marketers, founders, analysts, and teams who need high-quality content quickly',
        'Developers integrating AI content generation into internal tools or workflows',
        'Privacy-conscious users who want BYOK and no default server-side content storage',
      ],
      next: [
        'Advanced quality scoring and multi-agent validation',
        'More output formats and customization options',
        'Enterprise features: team workspaces, audit logs, SSO',
      ],
    },
    'devmentor-vscode': {
      coreOffering:
        'DevMentor in VS Code: inline quick-fixes and repo-aware prompts while you code.',
      howItWorks: [
        'Reads diagnostics/selection; queries gateway + pattern memory',
        'Offers code actions, hovers, and command workflows',
        'API integration with secure token management',
      ],
      who: [
        'VS Code users who want repo-aware assistance',
        'Teams enforcing patterns via the editor',
      ],
      next: ['Local model routing and workspace memory', 'RAG across repos and opt-in telemetry'],
    },
    'command-center': {
      coreOffering:
        'Agent-driven Storybook that is the main AI + TDD workflow: working patterns, mock-first API, built-in tests, and docs as the single source of truth.',
      howItWorks: [
'Start Storybook (port 7007) → open Docs/Dev Log & System Status to rebuild context fast',
        'Use Epics/Epic Manager (improved) for reference CRUD + state patterns',
        'Develop against MSW mocks; control latency/errors via toolbar; swap to real API later',
'Validate with unit (Vitest), a11y runner (stories), and E2E (Playwright)',
      ],
      technicalFeatures: [
        'Epic Manager CRUD with validation and improved memoized filtering',
        'API Playground for contract-first testing with MSW',
        'Network Playground for concurrency and error/latency simulation',
        'Status Dashboard reading coverage and E2E summaries with graceful empty states',
        'Templates: CRUD, Fetch, Table, Debounced Search, Optimistic Update, Skeleton Loading',
      ],
      practices: [
'Storybook-driven development',
        'Mock-first (MSW)',
        'TDD: red → green → refactor',
        'Accessibility checks (axe runner)',
      ],
      userStories: [
        'Recover lost context in 2 minutes: open Docs/Start Here, Status Dashboard, and Epic Manager',
        'Build features in 5 minutes by following Epic Manager patterns with tests and mocks',
        'Ship UI before backend is ready using MSW mock-first endpoints',
        'Debug flaky issues by simulating 3G latency and error rates via toolbar knobs',
        'Validate AI-generated code before merge with coverage, a11y, and E2E checks',
      ],
      s2sStories: [
'Storybook UI → MSW handlers → component renders against deterministic mock endpoints',
        'Storybook a11y test runner → stories → axe-core validation results surfaced in CI',
        'Playwright E2E → Storybook dev server → assert user flows under latency/error scenarios',
        'Docs viewers → staticDirs serve docs/* → DevLog/System Status rendered live',
        'GitHub Actions → build Storybook + run unit/a11y/E2E → upload artifacts → deploy Pages',
      ],
      who: ['Developers using AI assistants who need working patterns and fast validation'],
      next: ['Templates, plugin examples, deployment guides, and Vue/Angular variants'],
    },
    voice: {
      coreOffering: 'Push-to-talk assistant today; realtime WebRTC voice on the roadmap.',
      howItWorks: [
        'Expo records audio → server /asr → Whisper transcription',
        'Client posts /chat and speaks replies with on-device TTS',
        'Server keeps provider keys; simple JSON/CORS endpoints',
      ],
      who: ['Hands-free apps, demos, and rapid prototyping'],
      next: [
        'Realtime WebRTC with barge-in',
        'Diarization and project memory',
        'Integrations and mobile support',
      ],
    },
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100 overflow-x-hidden 2xl:text-lg 2xl:leading-relaxed">
      <ParticlesBackground />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Custom Cursor Effect */}
      {!prefersReducedMotion && mousePosition.x > 0 && (
        <motion.div
          className="fixed w-6 h-6 bg-green-400/20 rounded-full pointer-events-none z-50"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          style={{
            filter: 'blur(12px)',
            WebkitFilter: 'blur(12px)',
            willChange: 'transform',
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {/* Hero Section */}
        {activeSection === 'home' && (
          <motion.section
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-4 pt-16"
          >
            <div className="w-full max-w-[90%] 2xl:max-w-[85%] mx-auto">
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-full border border-green-600/30"
                >
                  <Sparkles className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">
                    Exploring the future of developer tools
                  </span>
                </motion.div>

                <div className="space-y-6">
                  <motion.h1
                    className="text-5xl md:text-7xl 2xl:text-8xl font-bold"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="bg-gradient-to-r from-white via-green-200 to-teal-200 bg-clip-text text-transparent">
                      PixelQuest
                    </span>
                  </motion.h1>

                  <motion.div
                    className="text-xl md:text-2xl 2xl:text-3xl text-gray-400 font-light h-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <TypewriterCycle
                      texts={[
                        'Building thoughtful developer tools',
                        'Focusing on privacy and performance',
                        'Learning through continuous iteration',
                        'Solving real problems with simple solutions',
                      ]}
                      delay={100}
                      pauseDelay={3000}
                    />
                  </motion.div>
                </div>

                <motion.p
                  className="text-lg 2xl:text-xl text-gray-500 max-w-4xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Developer tools that prioritize developer experience. From gamified learning to intelligent content
                  transformation.
                </motion.p>

                <motion.div
                  className="flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Button
                    onClick={() => {
                      setActiveSection('projects');
                      // Scroll to top when navigating
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    style={{ borderRadius: '12px' }}
                  >
                    Explore Projects
                  </Button>
                  <Button
                    onClick={() => {
                      setActiveSection('projects');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    variant="secondary"
                    size="lg"
                    style={{ borderRadius: '12px' }}
                  >
                    <div className="flex items-center gap-2">
                      <Map className="w-5 h-5" />
                      <span>View Roadmaps</span>
                    </div>
                  </Button>
                </motion.div>

                {/* Terminal Demo - Development Workflow */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="max-w-7xl mx-auto mt-16"
                >
                  <div className="w-full">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 text-left">Development Workflow</h3>
                    <WorkflowsShowcase />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Projects Section with Differentiation */}
        {activeSection === 'projects' && (
          <motion.section
            key="projects"
            id="projects-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="w-full max-w-[90%] 2xl:max-w-[85%] mx-auto">
              <motion.div
                className="text-center mb-12 px-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-600/30 mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-400">6 Active Projects</span>
                </motion.div>
                
                <h2 className="text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-gradient bg-300%">
                    Projects
                  </span>
                </h2>
                
                {focusedProject && (
                  <motion.div 
                    className="mt-6 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => setFocusedProject(null)}
                      className="group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Back to all projects
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {/* Project Grid/List */}
              <div className={`${focusedProject ? 'space-y-4' : 'grid lg:grid-cols-2 gap-6'}`}>
                {sortedProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    className={`w-full transition-all duration-500 cursor-pointer ${focusedProject && focusedProject !== project.id ? 'opacity-20 scale-[0.98] pointer-events-none' : ''}`}
                    onClick={() => {
                      if (focusedProject === project.id) {
                        setFocusedProject(null);
                      } else {
                        setFocusedProject(project.id);
                      }
                    }}
                    initial={{ opacity: 0, y: 20, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className="group w-full h-full"
                      layout
                      transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
                    >
                      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-800/90 rounded-2xl border border-gray-700 overflow-hidden w-full h-full shadow-xl group-hover:shadow-2xl group-hover:border-gray-600 transition-all duration-300">
                        {/* Animated gradient background */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
                          animate={{
                            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'linear'
                          }}
                        />
                        
                        {/* Glow effect on hover */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />

                        <motion.div
                          className={`relative ${focusedProject === project.id ? 'p-6 lg:p-8' : 'p-5 lg:p-6'} z-10`}
                          layout
                          transition={{ layout: { duration: 0.3 } }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <motion.div
                                className={`${focusedProject === project.id ? 'p-3' : 'p-3'} rounded-xl bg-gradient-to-br ${project.color} shadow-lg transition-all duration-300`}
                              >
                                {React.cloneElement(project.icon, {
                                  className: focusedProject === project.id ? 'w-7 h-7 text-white' : 'w-6 h-6 text-white',
                                })}
                              </motion.div>
                              <div>
                                <h3
                                  className={`font-bold text-white ${focusedProject === project.id ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'} flex items-center gap-2`}
                                >
                                  {project.title}
                                  {!focusedProject && (
                                    <motion.span
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="text-xs text-gray-500"
                                    >
                                      <ChevronRight className="w-4 h-4" />
                                    </motion.span>
                                  )}
                                </h3>
                                <p className="text-gray-400 text-sm lg:text-base">
                                  {project.tagline}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* Progress indicator */}
                              {roadmapProgress[project.id] && (
                                <div className="flex items-center gap-2 mr-2">
                                  <div className="w-12 h-12 relative">
                                    <svg className="w-12 h-12 transform -rotate-90">
                                      <circle
                                        cx="24"
                                        cy="24"
                                        r="20"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        fill="none"
                                        className="text-gray-700"
                                      />
                                      <motion.circle
                                        cx="24"
                                        cy="24"
                                        r="20"
                                        stroke="url(#gradient)"
                                        strokeWidth="3"
                                        fill="none"
                                        strokeDasharray={126}
                                        initial={{ strokeDashoffset: 126 }}
                                        animate={{ strokeDashoffset: 126 - (126 * roadmapProgress[project.id]) / 100 }}
                                        transition={{ duration: 1, delay: idx * 0.1 }}
                                        strokeLinecap="round"
                                      />
                                      <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                          <stop offset="0%" stopColor="#10b981" />
                                          <stop offset="100%" stopColor="#3b82f6" />
                                        </linearGradient>
                                      </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-xs font-bold text-white">{roadmapProgress[project.id]}%</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <Badge
                                variant={
                                  project.status === 'Production'
                                    ? 'success'
                                    : project.status === 'Beta'
                                      ? 'info'
                                      : project.status === 'Alpha'
                                        ? 'warning'
                                        : 'default'
                                }
                                size="sm"
                                className="animate-pulse"
                              >
                                {project.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Show description for non-focused items in grid */}
                          {!focusedProject && (
                            <motion.p 
                              className="text-gray-400 text-sm mb-4 line-clamp-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              {project.description}
                            </motion.p>
                          )}
                          
                          {/* Quick stats for non-focused */}
                          {!focusedProject && (
                            <motion.div 
                              className="flex items-center gap-4 mb-4"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Code className="w-3 h-3" />
                                <span>{project.tech.length} techs</span>
                              </div>
                              {project.differentiation && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Sparkles className="w-3 h-3" />
                                  <span>{project.differentiation.length} features</span>
                                </div>
                              )}
                              {project.github && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Github className="w-3 h-3" />
                                  <span>Open Source</span>
                                </div>
                              )}
                            </motion.div>
                          )}
                          
                          {/* Show mini tech stack for non-focused */}
                          {!focusedProject && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {project.tech.slice(0, 4).map((tech, i) => (
                                <motion.span
                                  key={`${tech}-mini-${i}`}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.3 + i * 0.05 }}
                                  className="px-2 py-0.5 bg-gray-800/60 text-[10px] text-gray-400 rounded border border-gray-700/50"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                              {project.tech.length > 4 && (
                                <span className="px-2 py-0.5 text-[10px] text-gray-500">
                                  +{project.tech.length - 4} more
                                </span>
                              )}
                            </div>
                          )}
                          
                          {/* Action buttons for non-focused */}
                          {!focusedProject && (
                            <motion.div 
                              className="flex items-center justify-between"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              <div className="flex gap-2">
                                {project.github && (
                                  <motion.a
                                    href={project.github}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1.5 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-all"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Github className="w-4 h-4 text-gray-400" />
                                  </motion.a>
                                )}
                                {project.live && (
                                  <motion.a
                                    href={project.live}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1.5 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-all"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                  </motion.a>
                                )}
                              </div>
                              <span className="text-xs text-gray-500">Click to explore →</span>
                            </motion.div>
                          )}

                          <AnimatePresence>
                            {focusedProject === project.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                              >
                                <p className="text-gray-300 mb-6 text-base lg:text-lg leading-relaxed">
                                  {project.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <AnimatePresence>
                            {focusedProject === project.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                              >
                                {/* Horizontal content layout */}
                                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                                  {/* Key Differentiators */}
                                  <div className="lg:col-span-2">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                      Key Differentiators
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-2">
                                      {project.differentiation.slice(0, 6).map((item, i) => (
                                        <motion.div
                                          key={i}
                                          className="flex items-start gap-2"
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: i * 0.05 }}
                                        >
                                          <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                          <span className="text-xs text-gray-300 leading-relaxed">
                                            {item}
                                          </span>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Tech Stack sidebar */}
                                  <div>
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                      Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                      {project.tech.map((tech, i) => (
                                        <motion.div
                                          key={`${tech}-${i}`}
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: i * 0.02 }}
                                        >
                                          <Badge size="sm" className="text-xs py-0.5">
                                            {tech}
                                          </Badge>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                {/* Technical Features (categorized) */}
                                {(() => {
                                  const details = (projectDetails as any)[project.id];
                                  const order = [
                                    'Architecture & APIs',
                                    'AI & Learning',
                                    'Reliability & Performance',
                                    'Performance Architecture',
                                    'Security & Privacy',
                                    'Observability',
                                    'Dev Workflow & QA',
                                  ];

                                  if (details?.features && typeof details.features === 'object') {
                                    return (
                                      <div className="border-t border-gray-800 pt-4 mb-4">
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                          Technical Features
                                        </h4>
                                        <div className="grid lg:grid-cols-2 gap-4">
                                          {order
                                            .filter(
                                              (k) =>
                                                Array.isArray(details.features[k]) &&
                                                details.features[k].length > 0,
                                            )
                                            .map((section) => (
                                              <div key={section}>
                                                <h5 className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                                  {section}
                                                </h5>
                                                <div className="space-y-1">
                                                  {details.features[section].map(
                                                    (feat: string, i: number) => (
                                                      <motion.div
                                                        key={`${section}-feat-${i}`}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.02 * i }}
                                                        className="flex items-start gap-2"
                                                      >
                                                        <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                                        <span className="text-xs text-gray-300 leading-relaxed">
                                                          {feat}
                                                        </span>
                                                      </motion.div>
                                                    ),
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    );
                                  }

                                  if (
                                    Array.isArray(details?.technicalFeatures) &&
                                    details.technicalFeatures.length > 0
                                  ) {
                                    return (
                                      <div className="border-t border-gray-800 pt-4 mb-4">
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                          Technical Features
                                        </h4>
                                        <div className="grid md:grid-cols-2 gap-2">
                                          {details.technicalFeatures.map(
                                            (feat: string, i: number) => (
                                              <motion.div
                                                key={`feat-${i}`}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.02 * i }}
                                                className="flex items-start gap-2"
                                              >
                                                <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                                <span className="text-xs text-gray-300 leading-relaxed">
                                                  {feat}
                                                </span>
                                              </motion.div>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    );
                                  }

                                  return null;
                                })()}

                                {/* Development Practices (emphasis on Storybook-driven) */}
                                {(() => {
                                  const details = (projectDetails as any)[project.id];
                                  if (!details?.practices || details.practices.length === 0)
                                    return null;
                                  return (
                                    <div className="mb-4">
                                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                        Development Practices
                                      </h4>
                                      <div className="flex flex-wrap gap-1.5">
                                        {details.practices.map((p: string, i: number) => (
                                          <span
                                            key={`practice-${i}`}
                                            className="px-2 py-0.5 bg-gray-900/60 border border-gray-800 rounded text-[11px] text-gray-300"
                                          >
                                            {p}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })()}

                                {/* Metrics if available */}
                                {Object.entries(project.metrics || {}).length > 0 && (
                                  <div className="border-t border-gray-800 pt-4 mb-4">
                                    <div className="flex gap-6">
                                      {Object.entries(project.metrics || {}).map(
                                        ([key, value], i) => (
                                          <motion.div
                                            key={key}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 + i * 0.05 }}
                                            className="flex items-center gap-2"
                                          >
                                            <div className="text-xl font-bold text-white">
                                              {value}
                                            </div>
                                            <div className="text-xs text-gray-500">{key}</div>
                                          </motion.div>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Expandable Details */}
                                {(() => {
                                  const details = (projectDetails as any)[project.id];
                                  if (!details) return null;
                                  return (
                                    <div className="grid lg:grid-cols-3 gap-4 mb-6">
                                      <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                                        <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                          Core Offering
                                        </h5>
                                        {details.coreOffering && (
                                          <p className="text-xs text-gray-400 leading-relaxed">
                                            {details.coreOffering}
                                          </p>
                                        )}
                                      </div>

                                      <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                                        <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                          How It Works
                                        </h5>
                                        {Array.isArray(details.howItWorks) &&
                                          details.howItWorks.length > 0 && (
                                            <ul className="space-y-1">
                                              {details.howItWorks
                                                .slice(0, 3)
                                                .map((c: string, i: number) => (
                                                  <li key={i} className="flex items-start gap-1.5">
                                                    <span className="text-green-400 mt-0.5">•</span>
                                                    <span className="text-xs text-gray-400 leading-relaxed">
                                                      {c}
                                                    </span>
                                                  </li>
                                                ))}
                                            </ul>
                                          )}
                                      </div>

                                      <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                                        <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                          Target Users
                                        </h5>
                                        {Array.isArray(details.who) && details.who.length > 0 && (
                                          <ul className="space-y-1">
                                            {details.who.map((c: string, i: number) => (
                                              <li key={i} className="flex items-start gap-1.5">
                                                <span className="text-blue-400 mt-0.5">•</span>
                                                <span className="text-xs text-gray-400 leading-relaxed">
                                                  {c}
                                                </span>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })()}

                                {/* Key Endpoints */}
                                {(() => {
                                  const details = (projectDetails as any)[project.id];
                                  if (
                                    Array.isArray(details?.keyEndpoints) &&
                                    details.keyEndpoints.length > 0
                                  ) {
                                    return (
                                      <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 mb-4">
                                        <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                          Key Endpoints
                                        </h5>
                                        <ul className="space-y-1">
                                          {details.keyEndpoints.map((e: string, i: number) => (
                                            <li
                                              key={`endpoint-${i}`}
                                              className="flex items-start gap-1.5"
                                            >
                                              <span className="text-purple-400 mt-0.5">•</span>
                                              <span className="text-xs text-gray-300 leading-relaxed">
                                                {e}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    );
                                  }
                                  return null;
                                })()}

                                {/* Planned & Documented Tech */}
                                {(() => {
                                  const details = (projectDetails as any)[project.id];
                                  if (
                                    Array.isArray(details?.plannedTech) &&
                                    details.plannedTech.length > 0
                                  ) {
                                    return (
                                      <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 mb-4">
                                        <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                          Planned & Documented Tech
                                        </h5>
                                        <ul className="space-y-1">
                                          {details.plannedTech.map((t: string, i: number) => (
                                            <li
                                              key={`planned-tech-${i}`}
                                              className="flex items-start gap-1.5"
                                            >
                                              <span className="text-yellow-400 mt-0.5">•</span>
                                              <span className="text-xs text-gray-300 leading-relaxed">
                                                {t}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    );
                                  }
                                  return null;
                                })()}

                                {/* Top User Stories */}
                                {(() => {
                                  const details = (projectDetails as any)[project.id];
                                  if (
                                    Array.isArray(details?.userStories) &&
                                    details.userStories.length > 0
                                  ) {
                                    return (
                                      <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 mb-4">
                                        <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                          Top User Stories
                                        </h5>
                                        <ul className="space-y-1">
                                          {details.userStories.map((s: string, i: number) => (
                                            <li
                                              key={`userstory-${i}`}
                                              className="flex items-start gap-1.5"
                                            >
                                              <span className="text-green-400 mt-0.5">•</span>
                                              <span className="text-xs text-gray-300 leading-relaxed">
                                                {s}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    );
                                  }
                                  return null;
                                })()}

                                {/* Top Service-to-Service Stories */}
                                {(() => {
                                  const details = (projectDetails as any)[project.id];
                                  if (
                                    Array.isArray(details?.s2sStories) &&
                                    details.s2sStories.length > 0
                                  ) {
                                    return (
                                      <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 mb-4">
                                        <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                          Top Service-to-Service Stories
                                        </h5>
                                        <ul className="space-y-1">
                                          {details.s2sStories.map((s: string, i: number) => (
                                            <li
                                              key={`s2sstory-${i}`}
                                              className="flex items-start gap-1.5"
                                            >
                                              <span className="text-teal-400 mt-0.5">•</span>
                                              <span className="text-xs text-gray-300 leading-relaxed">
                                                {s}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    );
                                  }
                                  return null;
                                })()}

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                  {project.live && (
                                    <Button
                                      onClick={() => window.open(project.live, '_blank')}
                                      variant="secondary"
                                      size="sm"
                                      icon={ExternalLink}
                                    >
                                      Live Demo
                                    </Button>
                                  )}
                                  {(() => {
                                    const details = (projectDetails as any)[project.id];
                                    if (details?.openapiUrl) {
                                      return (
                                        <Button
                                          onClick={() => window.open(details.openapiUrl, '_blank')}
                                          variant="secondary"
                                          size="sm"
                                          icon={FileText}
                                        >
                                          OpenAPI Spec
                                        </Button>
                                      );
                                    }
                                    return null;
                                  })()}
                                  {project.github && (
                                    <Button
                                      onClick={() => window.open(project.github, '_blank')}
                                      variant="secondary"
                                      size="sm"
                                      icon={Github}
                                    >
                                      GitHub
                                    </Button>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* About Section - Redesigned with integrated header */}
        {activeSection === 'about' && (
          <motion.section
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="w-full max-w-[90%] 2xl:max-w-[85%] mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Professional Summary with integrated profile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2 space-y-6"
                >
                  <Card3D className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
                    {/* Integrated Profile Header */}
                    <div className="flex items-start gap-6 mb-6">
                      <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-green-400/30 shadow-xl shadow-green-400/10">
                          <Image
                            src="/marco.jpg"
                            alt="Marco profile photo"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-full animate-pulse blur-xl" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h1 className="text-2xl 2xl:text-3xl font-bold">
                              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                                Marco
                              </span>
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                              Pragmatic Problem Solver | Fullstack - Mobile Engineer & Web-stacks | Exploring "AI as a companion mindset"
                            </p>
                            <p className="text-xs text-gray-500 mt-1">📍 Denmark</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <motion.a
                              href="https://linkedin.com/in/mapw"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 hover:border-gray-600"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="LinkedIn"
                            >
                              <Linkedin className="w-4 h-4 text-blue-400" />
                            </motion.a>
                            <motion.a
                              href="https://github.com/MarcoPWx"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 hover:border-gray-600"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="GitHub"
                            >
                              <Github className="w-4 h-4 text-gray-300" />
                            </motion.a>
                            <motion.a
                              href="mailto:Marcowurtz@hotmail.com"
                              className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 hover:border-gray-600"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title="Email"
                            >
                              <Mail className="w-4 h-4 text-green-400" />
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-800 pt-4">
                      <h2 className="text-lg 2xl:text-xl font-bold mb-3 flex items-center gap-2">
                        <User className="w-5 h-5 text-green-400" />
                        Professional Summary
                      </h2>
                      <div className="space-y-3 text-gray-300 leading-relaxed">
                        <p>
                          Able to work with fast adaptability, deep problem-solving skills, and the
                          ability to thrive in fast-paced environments requiring multi-context
                          switching.
                        </p>
                        <p>Passionate about big-picture design.</p>
                        
                        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                          <h3 className="text-xs text-gray-300 font-semibold mb-2">
                            Philosophy for Building Exceptional Software
                          </h3>
                          <ul className="list-disc list-inside space-y-1">
                            <li className="text-xs text-gray-400">
                              <span className="font-medium">Deliver Frequently:</span> Launch features in smaller increments to stay agile
                              and adapt quickly.
                            </li>
                            <li className="text-xs text-gray-400">
                              <span className="font-medium">User-Centered:</span> Focus on delivering tangible value for end users at every
                              release.
                            </li>
                            <li className="text-xs text-gray-400">
                              <span className="font-medium">Preemptive Error Detection:</span> Identify and address potential issues before
                              they become critical.
                            </li>
                            <li className="text-xs text-gray-400">
                              <span className="font-medium">Maintain Code Integrity:</span> Fix small issues early to prevent big problems
                              later.
                            </li>
                            <li className="text-xs text-gray-400">
                              <span className="font-medium">Efficient Testing:</span> Implement automated, fast, and reliable tests that
                              catch errors early.
                            </li>
                            <li className="text-xs text-gray-400">
                              <span className="font-medium">Keep It Simple:</span> Strive for straightforward, maintainable solutions that
                              stand the test of time.
                            </li>
                            <li className="text-xs text-gray-400">
                              <span className="font-medium">Continuous Learning:</span> Believe in ongoing reading, experimentation, and
                              exploring new ideas for growth.
                            </li>
                          </ul>
                          <p className="italic text-xs text-gray-400 mt-2">
                            "The journey in programming never ends—growth comes from pushing
                            boundaries and exploring unfamiliar territory."
                          </p>
                        </div>
                        <p>
                          I love collaborating in agile teams, enabling others through mentorship, and
                          continuously refining processes for high-quality results.
                        </p>
                      </div>
                    </div>
                  </Card3D>

                  {/* Work Experience Grid */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Recent Experience */}
                    <Card3D className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-400" />
                        Recent Experience
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            title: 'Senior Fullstack Mobile Engineer',
                            company: 'ExSeed Health',
                            period: 'Apr 2025 – Aug 2025',
                            key_achievement: 'Matured team architecture & established dev standards',
                            tech: ['Flutter', 'Swift', 'Kotlin', 'C++', 'Dart', 'Firebase', 'CI/CD', 'Jenkins', 'Fastlane', 'Git'],
                          },
                          {
                            title: 'Platform Solution Architect',
                            company: 'Queue‑it',
                            period: 'Oct 2024 – Apr 2025',
                            key_achievement: 'Built scalable CDN integrations & connectors',
                            tech: ['AWS', 'Redis', 'Java', 'iOS', 'Android', 'Lambda', 'S3', 'EC2', 'Route53', 'DynamoDB', 'JavaScript', 'Node.js', 'Docker', 'Kubernetes'],
                          },
                        ].map((job, i) => (
                          <div key={i} className="border-l-2 border-blue-400/30 pl-4">
                            <h4 className="font-semibold text-white text-sm">{job.title}</h4>
                            <p className="text-xs text-green-400">{job.company}</p>
                            <p className="text-xs text-gray-500 mt-1">{job.period}</p>
                            <p className="text-xs text-gray-400 mt-2">{job.key_achievement}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {job.tech.map((t, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 bg-gray-800/60 border border-gray-700 rounded text-[10px] text-gray-300">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card3D>

                    {/* Earlier Experience */}
                    <Card3D className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                        Earlier Roles
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            title: 'Full Stack Engineer',
                            company: 'Cinemataztic',
                            period: 'Apr 2024 – Sep 2024',
                            key_achievement: 'Delivered trade-desk apps with robust testing',
                            tech: ['React', 'TypeScript', 'Express', 'MongoDB', 'MSW', 'Jest', 'Playwright', 'Helm', 'FluxCD', 'Jenkins', 'Linux', 'SSH', 'Ansible', 'Istio'],
                          },
                          {
                            title: 'Team Lead / Head of Tech',
                            company: 'PatientSky',
                            period: 'Apr 2023 – May 2024',
                            key_achievement: 'Raised app rating from 3★ to 5★, scaled team to 6',
                            tech: ['iOS', 'Android', 'React Native', 'WebRTC', 'WCAG', 'Swift', 'Kotlin', 'Objective-C', 'Java', 'Firebase', 'GraphQL', 'REST', 'Agile'],
                          },
                        ].map((job, i) => (
                          <div key={i} className="border-l-2 border-purple-400/30 pl-4">
                            <h4 className="font-semibold text-white text-sm">{job.title}</h4>
                            <p className="text-xs text-purple-400">{job.company}</p>
                            <p className="text-xs text-gray-500 mt-1">{job.period}</p>
                            <p className="text-xs text-gray-400 mt-2">{job.key_achievement}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {job.tech.map((t, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 bg-gray-800/60 border border-gray-700 rounded text-[10px] text-gray-300">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card3D>

                    {/* Key Achievements */}
                    <Card3D className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-green-400" />
                        Key Achievements
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            achievement: 'Process Improvement',
                            detail: 'Established code review & CI/CD practices',
                            impact: 'Reduced bugs by 30%',
                            type: 'process',
                          },
                          {
                            achievement: 'Team Development',
                            detail: 'Mentored junior developers and led knowledge sharing',
                            impact: 'Improved team productivity',
                            type: 'leadership',
                          },
                          {
                            achievement: 'Technical Debt',
                            detail: 'Refactored legacy codebases incrementally',
                            impact: 'Better maintainability',
                            type: 'architecture',
                          },
                          {
                            achievement: 'Cross-Platform',
                            detail: 'Delivered solutions across web, iOS & Android',
                            impact: 'Consistent user experience',
                            type: 'delivery',
                          },
                        ].map((item, i) => (
                          <div key={i} className="border-l-2 border-green-400/30 pl-4">
                            <h4 className="font-semibold text-white text-sm">{item.achievement}</h4>
                            <p className="text-xs text-gray-400 mt-1">{item.detail}</p>
                            <p className="text-xs text-green-400 mt-1">→ {item.impact}</p>
                          </div>
                        ))}
                      </div>
                    </Card3D>

                    {/* Current Projects */}
                    <Card3D className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Code className="w-5 h-5 text-amber-400" />
                        Active Projects
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            name: 'QuizMentor',
                            description: 'Building gamified learning platform',
                            status: 'Beta - 92% retention achieved',
                            tech: ['React Native', 'Supabase', 'AI/ML'],
                          },
                          {
                            name: 'DevMentor',
                            description: 'Developing AI pair programming assistant',
                            status: 'Beta - VS Code extension live',
                            tech: ['TypeScript', 'LangChain', 'Qdrant'],
                          },
                          {
                            name: 'Harvest.ai',
                            description: 'Creating content transformation pipeline',
                            status: 'Beta - BYOK system working',
                            tech: ['Python', 'FastAPI', 'SSE'],
                          },
                        ].map((project, i) => (
                          <div key={i} className="border-l-2 border-amber-400/30 pl-4">
                            <h4 className="font-semibold text-white text-sm">{project.name}</h4>
                            <p className="text-xs text-gray-400 mt-1">{project.description}</p>
                            <p className="text-xs text-amber-400 mt-1">{project.status}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.tech.map((t, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[10px] text-amber-400">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card3D>
                  </div>
                </motion.div>

                {/* Skills & Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6"
                >
                  {/* Technical Skills */}
                  <Card3D className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Code className="w-5 h-5 text-green-400" />
                      Technical Skills
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          category: 'Languages',
                          skills: [
                            'TypeScript',
                            'JavaScript',
                            'Python',
                            'Java',
                            'Go',
                            'Rust',
                            'C#',
                            'PHP',
                            'Ruby',
                          ],
                        },
                        {
                          category: 'Frontend',
                          skills: [
                            'React',
                            'Next.js',
                            'React Native',
                            'Tailwind CSS',
                            'Vue.js',
                            'Redux',
                            'Angular',
                            'Svelte',
                            'Bootstrap',
                            'Material-UI',
                          ],
                        },
                        {
                          category: 'Backend',
                          skills: [
                            'Node.js',
                            'Express',
                            'FastAPI',
                            'GraphQL',
                            'REST APIs',
                            'WebSockets',
                            'Spring Boot',
                            'Django',
                            'Laravel',
                            'ASP.NET',
                            'Flask',
                          ],
                        },
                        {
                          category: 'AI/ML',
                          skills: [
                            'TensorFlow',
                            'PyTorch',
                            'Scikit-learn',
                            'OpenAI APIs',
                            'LangChain',
                            'Anthropic',
                            'Jupyter',
                          ],
                        },
                        {
                          category: 'Cloud & DevOps',
                          skills: [
                            'AWS',
                            'Docker',
                            'Kubernetes',
                            'Terraform',
                            'CI/CD',
                            'Git',
                            'GitHub Actions',
                            'Azure',
                            'Google Cloud',
                            'Jenkins',
                            'CircleCI',
                            'Vercel',
                            'Netlify',
                          ],
                        },
                        {
                          category: 'Databases',
                          skills: [
                            'PostgreSQL',
                            'MongoDB',
                            'Redis',
                            'Qdrant',
                            'Supabase',
                            'SQLite',
                          ],
                        },
                        {
                          category: 'Tools & Platforms',
                          skills: ['VS Code', 'Postman', 'Figma', 'Jira', 'Slack', 'Notion'],
                        },
                      ].map((skillGroup, index) => (
                        <div key={index}>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">
                            {skillGroup.category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skillGroup.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-gray-800/50 text-xs text-gray-300 rounded border border-gray-700"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card3D>


                  {/* Contact Info */}
                  <Card3D className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-green-400" />
                      Let's Connect
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">Marcowurtz@hotmail.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Linkedin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">linkedin.com/in/mapw</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Github className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">github.com/MarcoPWx</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">Available for consulting</span>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <motion.section
            key="skills"
            id="skills-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <DynamicTechnicalStackV3 />
          </motion.section>
        )}

        {/* Principles Section */}
        {activeSection === 'principles' && (
          <motion.section
            key="principles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="max-w-7xl mx-auto">
              {/* Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-full border border-amber-600/30 mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-amber-400">Battle-tested wisdom</span>
                </motion.div>
                
                <h2 className="text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    10 Engineering Principles
                  </span>
                </h2>
              </motion.div>

              {/* Principles Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    number: 1,
                    title: "Ship Small, Ship Often",
                    icon: <Rocket className="w-6 h-6" />,
                    description: "Break features into smallest deployable units",
                    details: [
                      "Deploy daily or multiple times per day",
                      "Feature flags for gradual rollouts",
                      "Quick feedback loops with users"
                    ],
                    example: "Instead of a complete payment system, ship: 1) form UI, 2) validation, 3) processing"
                  },
                  {
                    number: 2,
                    title: "User Value First",
                    icon: <Heart className="w-6 h-6" />,
                    description: "Every line of code should benefit the end user",
                    details: [
                      "Start with user stories, not technical requirements",
                      "Measure success by user outcomes",
                      "Remove features that don't add value"
                    ],
                    example: "Chose boring tech stack that loads in 500ms over exciting framework that takes 3s"
                  },
                  {
                    number: 3,
                    title: "Test-Driven Development",
                    icon: <CheckCircle className="w-6 h-6" />,
                    description: "Write tests first, then make them pass",
                    details: [
                      "Red → Green → Refactor cycle",
                      "Tests document expected behavior",
                      "Catch bugs before production"
                    ],
                    example: "Write failing test for 'user can login', implement login, then optimize"
                  },
                  {
                    number: 4,
                    title: "Simple Over Clever",
                    icon: <Lightbulb className="w-6 h-6" />,
                    description: "Code is read 10x more than written",
                    details: [
                      "Boring code is good code",
                      "Explicit over implicit",
                      "Junior dev should understand it"
                    ],
                    example: "Use simple if/else instead of nested ternaries"
                  },
                  {
                    number: 5,
                    title: "Fix Small Issues Immediately",
                    icon: <Shield className="w-6 h-6" />,
                    description: "A stitch in time saves nine",
                    details: [
                      "Fix linting errors right away",
                      "Update dependencies regularly",
                      "Don't let tech debt accumulate"
                    ],
                    example: "Spend 5 minutes fixing that console warning now, not 2 hours debugging later"
                  },
                  {
                    number: 6,
                    title: "Automate Everything Repetitive",
                    icon: <Zap className="w-6 h-6" />,
                    description: "If you do it twice, automate it",
                    details: [
                      "CI/CD pipelines for deployments",
                      "Automated testing on every commit",
                      "Code formatting and linting"
                    ],
                    example: "Created GitHub Action to auto-generate API docs from OpenAPI spec"
                  },
                  {
                    number: 7,
                    title: "Document Why, Not What",
                    icon: <Brain className="w-6 h-6" />,
                    description: "Code shows what, comments explain why",
                    details: [
                      "Document business decisions",
                      "Explain non-obvious choices",
                      "Keep README up to date"
                    ],
                    example: "// Using setTimeout because we need to wait for API response before next poll"
                  },
                  {
                    number: 8,
                    title: "Enable Your Team",
                    icon: <Users className="w-6 h-6" />,
                    description: "Your code should make others productive",
                    details: [
                      "Write clear PR descriptions",
                      "Create reusable components",
                      "Mentor junior developers"
                    ],
                    example: "Created Storybook components so team can build UIs without asking questions"
                  },
                  {
                    number: 9,
                    title: "Measure and Monitor",
                    icon: <Target className="w-6 h-6" />,
                    description: "You can't improve what you don't measure",
                    details: [
                      "Performance metrics in production",
                      "Error tracking and alerting",
                      "User behavior analytics"
                    ],
                    example: "Set up dashboard showing p95 latency, error rate, and active users"
                  },
                  {
                    number: 10,
                    title: "Always Be Learning",
                    icon: <Sparkles className="w-6 h-6" />,
                    description: "Technology evolves, so should you",
                    details: [
                      "Read documentation thoroughly",
                      "Try new tools on side projects",
                      "Teach what you learn"
                    ],
                    example: "Spent weekend learning Rust, now using it for performance-critical microservice"
                  }
                ].map((principle, index) => (
                  <motion.div
                    key={principle.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-amber-500/50 transition-all h-full hover:shadow-lg hover:shadow-amber-500/10">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div 
                          className="flex-shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center text-amber-400">
                            {principle.icon}
                          </div>
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-amber-400 font-bold">#{principle.number}</span>
                            <h3 className="text-xl font-bold text-white">{principle.title}</h3>
                          </div>
                          <p className="text-gray-400">{principle.description}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4">
                        {principle.details.map((detail, i) => (
                          <motion.div 
                            key={i} 
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{detail}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Example */}
                      <div className="pt-4 border-t border-gray-800">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          Real Example
                        </p>
                        <p className="text-sm text-gray-400 italic">
                          {principle.example}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <motion.div 
                className="mt-12 p-6 bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-lg border border-amber-600/20 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <p className="text-gray-300">
                  These principles guide every line of code I write and every architectural decision I make.
                </p>
              </motion.div>
            </div>
          </motion.section>
        )}


        {/* Contact Section */}
        {activeSection === 'contact' && (
          <motion.section
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16 flex items-center"
          >
            <div className="w-full max-w-[90%] 2xl:max-w-[85%] lg:max-w-2xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h2 className="text-4xl font-bold mb-4">Let's Build Together</h2>
                <p className="text-gray-400">
                  Always open to interesting projects and collaborations
                </p>
              </motion.div>

              <Card className="p-8">
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="w-5 h-5" />,
                      label: 'Email',
                      value: 'Marcowurtz@hotmail.com',
                      href: 'mailto:Marcowurtz@hotmail.com',
                    },
                    {
                      icon: <Github className="w-5 h-5" />,
                      label: 'GitHub',
                      value: 'github.com/MarcoPWx',
                      href: 'https://github.com/MarcoPWx',
                    },
                    {
                      icon: <Linkedin className="w-5 h-5" />,
                      label: 'LinkedIn',
                      value: 'linkedin.com/in/mapw',
                      href: 'https://linkedin.com/in/mapw',
                    },
                  ].map((contact, i) => (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-950 rounded-lg hover:bg-gray-800 transition-all group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-gray-400 group-hover:text-green-400 transition-colors">
                          {contact.icon}
                        </div>
                        <div>
                          <div className="font-medium text-white">{contact.label}</div>
                          <div className="text-sm text-gray-400">{contact.value}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors mb-0" />
                    </motion.a>
                  ))}
                </div>

                <motion.div
                  className="mt-8 p-6 bg-gradient-to-r from-green-600/10 to-teal-600/10 rounded-lg border border-green-600/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-green-400" />
                    <span className="font-medium text-white">Open for Opportunities</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Interested in AI/ML projects, developer tools, and innovative SaaS products.
                    Let's create something amazing together.
                  </p>
                </motion.div>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Roadmap Modal */}
      <DynamicRoadmapModal
        isOpen={roadmapModal.isOpen}
        onClose={() => setRoadmapModal({ isOpen: false, project: roadmapModal.project })}
        project={roadmapModal.project}
      />

      <DynamicOpenAPIModal
        isOpen={openapiModal.isOpen}
        url={openapiModal.url || undefined}
        onClose={() => setOpenapiModal({ ...openapiModal, isOpen: false })}
      />
    </div>
  );
}
