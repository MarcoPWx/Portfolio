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
const DynamicComprehensiveSkillsV2 = dynamic(
  () => import('./ComprehensiveSkillsV2').then((m) => m.ComprehensiveSkillsV2),
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
  const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);
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
    <Card
      className={`font-mono text-sm p-4 ${
        collapsed && activityPulse ? 'ring-2 ring-green-500/40 shadow-[0_0_18px_rgba(34,197,94,0.35)]' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
        <span className="text-gray-400 text-xs ml-2">{title.toLowerCase().replace(/\s+/g, '-')}</span>
        {collapsible && (
          <button
            className={`ml-2 p-1 rounded hover:bg-gray-800 text-gray-300 transition-transform ${
              collapsed ? '' : 'rotate-180'
            }`}
            title={collapsed ? 'Expand' : 'Collapse'}
            aria-label={collapsed ? 'Expand' : 'Collapse'}
            onClick={() => setCollapsed((c) => !c)}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
        {controls && (
          <div className="ml-auto flex items-center gap-1">
            <button
              className="p-1.5 rounded hover:bg-gray-800 text-gray-300"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              onClick={() => setIsPlaying((p) => !p)}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              className="p-1.5 rounded hover:bg-gray-800 text-gray-300"
              title="Step"
              aria-label="Step"
              onClick={async () => {
                if (isPlaying) setIsPlaying(false);
                if (!runningRef.current) await runStep();
              }}
            >
              <StepForward className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 rounded hover:bg-gray-800 text-gray-300"
              title="Reset"
              aria-label="Reset"
              onClick={() => {
                setIsPlaying(false);
                setHistory([
                  { type: 'output', text: `🚀 ${title}` },
                  { type: 'output', text: 'Type "help" to view commands' },
                ]);
                setStepIndex(0);
              }}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      {subtitle && (
        <div className="text-[11px] text-gray-500 mb-2">{subtitle}</div>
      )}

      {/* Content / Preview */}
      {collapsed ? (
        <div className="text-xs text-gray-400 mt-1">
          {(() => {
            const lines = history.slice(-2);
            return lines.map((l, i) => (
              <div key={`prev-${i}`} className={l.type === 'error' ? 'text-red-400' : l.type === 'input' ? 'text-green-400' : 'text-gray-400'}>
                {l.text.length > 120 ? l.text.slice(0, 117) + '…' : l.text}
              </div>
            ));
          })()}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className={`${heightClass} overflow-y-auto overflow-x-hidden space-y-1 pr-1`}
        >
          {history.map((item, i) => (
            <div
              key={i}
              className={
                item.type === 'input'
                  ? 'text-green-400'
                  : item.type === 'error'
                    ? 'text-red-400'
                    : 'text-gray-300'
              }
              style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}

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
  );
}

function WorkflowsShowcase() {
  // Four independent terminals to showcase: AI Agent, TDD, Mock-first (Storybook/MSW + E2E), and Ops/Observability (K8s/Docker)
  type Step = { cmd: string; delay?: number };

  // AI Agent Orchestration terminal
  const agentCommands: Record<string, string> = {
    'pnpm agent:dev': `Agent Gateway ready on http://localhost:8787\nRoutes loaded: openai:gpt-4o-mini, anthropic:claude-3.7, local:ollama:llama3.1\nPolicy: privacy-first (BYOK: ephemeral by default)`,
    'agent memory load repo': `Workspace memory loaded:\n• patterns: 32\n• tests: 128\n• docs: 14\n• recent-diffs: 5`,
    'agent routes show': `Routing rules:\n• code-review → openai:gpt-4o-mini (fast/cost)\n• planning/spec → anthropic:claude-3.7 (reasoning)\n• offline/local → ollama:llama3.1 (BYOK/local-first)`,
    "agent prompt 'spec: BloomValidator multi-skill weighting'": `Spec created: BloomValidator multi-skill weighting scenario\nPlan: align user journey + docs + tests`,
    'agent storybook open': 'Opening Storybook http://localhost:7007',
    'agent msw profile show': 'MSW Profile: latency=200ms, error_rate=10%, handlers=17',
    'agent e2e run': `Playwright triggered (3 specs) — status:\n✓ QuizCard flows\n✓ API Playground latency/error scenarios\n✓ Status Dashboard surfaces artifacts`,
    'agent docs align --storybook --openapi': `Docs aligned:\n• Storybook: QuizCard.stories updated\n• OpenAPI: POST /api/bloom/validate extended`,
    'agent stories top': `Top User Stories:\n1) As a learner, I start a 7‑question adaptive session and get instant feedback.\n2) As a developer, I get inline, repo‑aware suggestions that match our patterns.\n3) As an ops engineer, I monitor error budgets and latency to keep SLOs on track.`,
    'agent s2s top': `Top Service-to-Service Flows:\n• App → /api/bloom/validate → Supabase (RLS) → analytics aggregates.\n• VS Code → API Gateway → Learning Service → Memory Service (Qdrant) → LLM.\n• Storybook UI → MSW handlers → deterministic mocks → E2E assertions (Playwright).`,
    'agent publish status': `Status posted: CI links + artifacts (coverage, a11y, e2e, latency)`,
  };
  const agentScript: Step[] = [
    { cmd: 'pnpm agent:dev', delay: 600 },
    { cmd: 'agent memory load repo', delay: 900 },
    { cmd: 'agent routes show', delay: 700 },
    { cmd: "agent prompt 'spec: BloomValidator multi-skill weighting'", delay: 900 },
    { cmd: 'agent storybook open', delay: 700 },
    { cmd: 'agent msw profile show', delay: 700 },
    { cmd: 'agent e2e run', delay: 900 },
    { cmd: 'agent docs align --storybook --openapi', delay: 900 },
    { cmd: 'agent stories top', delay: 700 },
    { cmd: 'agent s2s top', delay: 700 },
    { cmd: 'agent publish status', delay: 800 },
  ];

  // TDD terminal (unit tests)
  const tddCommands: Record<string, string> = {
    'pnpm test': `> Running tests...\nFAIL src/lib/bloom/validator.test.ts\n  ✕ validates multi-skill weighting (45 ms)\n\n  ● BloomValidator › validates multi-skill weighting\n    Expected: 0.75\n    Received: 0.60\n\nTest Suites: 1 failed, 12 passed, 13 total\nTests:       1 failed, 87 passed, 88 total\nSnapshots:   0 total\nTime:        3.42 s`,
    'git add -A && git commit -m "red: add failing test for BloomValidator"':
      `[main 1a2b3c] red: add failing test for BloomValidator\n  2 files changed, 18 insertions(+)`,
    'patch bloom-validator': `Applying patch...\n✔ Updated src/lib/bloom/validator.ts\n✔ Added handling for multi-skill weighting and rounding`,
    'git add -A && git commit -m "green: BloomValidator handles multi-skill weighting"':
      `[main 4d5e6f] green: BloomValidator handles multi-skill weighting\n  1 file changed, 22 insertions(+), 6 deletions(-)`,
    'pnpm test:all': `> Running tests...\nPASS src/lib/bloom/validator.test.ts\n\nTest Suites: 13 passed, 13 total\nTests:       88 passed, 88 total\nSnapshots:   0 total\nTime:        2.17 s`,
    'pnpm run lint && pnpm run format': `✔ ESLint: 0 problems (0 errors, 0 warnings)\n✔ Prettier: files formatted`,
  };
  const tddScript: Step[] = [
    { cmd: 'pnpm test', delay: 600 },
    { cmd: 'git add -A && git commit -m "red: add failing test for BloomValidator"', delay: 900 },
    { cmd: 'patch bloom-validator', delay: 1000 },
    { cmd: 'git add -A && git commit -m "green: BloomValidator handles multi-skill weighting"', delay: 900 },
    { cmd: 'pnpm test:all', delay: 900 },
    { cmd: 'pnpm run lint && pnpm run format', delay: 700 },
  ];

  // Mock-first terminal (Storybook/MSW/A11y/E2E)
  const mockCommands: Record<string, string> = {
    'pnpm storybook':
      'Storybook 9.0 • ready on http://localhost:7007\nMSW connected — intercepting API calls\nMSW loaded 17 handlers',
    'msw handlers list': `MSW Handlers:\n• GET /api/health → 200 OK { ok: true }\n• GET /api/status → 200 OK { artifacts: [...] }\n• POST /api/generate → 200 OK (mock content)\n• GET /metrics → 200 OK (mock counters)\n• GET /api/bloom/validate → 200 OK (pedagogy sample)` ,
    'msw latency 200': 'MSW: network latency set to 200ms for /api/* routes',
    'msw error-rate 0.10': 'MSW: error rate set to 10% for POST /api/*',
    'msw profile e2e': 'MSW: applied E2E profile (latency=50ms, error_rate=0%)',
    'pnpm test:a11y': `A11y: scanning visible stories...\n✔ QuizCard — no violations\n✔ StatusDashboard — no violations\n✔ EpicManager — no violations\nAll good (0 violations)`,
    'pnpm test:e2e': `E2E: launching Playwright...\n✓ Storybook: QuizCard flows (chrome) 12s\n✓ API Playground: error/latency scenarios 9s\n✓ Status Dashboard: artifacts surface 4s\nSummary: 3 passed; 0 failed; duration 28s`,
    'msw profile reset': 'MSW: profiles reset to defaults',
    'curl -s http://localhost:7007/health': 'OK',
  };
  const mockScript: Step[] = [
    { cmd: 'pnpm storybook', delay: 600 },
    { cmd: 'msw handlers list', delay: 800 },
    { cmd: 'msw latency 200', delay: 900 },
    { cmd: 'msw error-rate 0.10', delay: 800 },
    { cmd: 'pnpm test:a11y', delay: 900 },
    { cmd: 'msw profile e2e', delay: 800 },
    { cmd: 'pnpm test:e2e', delay: 900 },
    { cmd: 'msw profile reset', delay: 800 },
    { cmd: 'curl -s http://localhost:7007/health', delay: 700 },
  ];

  // Ops / Observability terminal (K8s/Docker/metrics)
  const opsCommands: Record<string, string> = {
    'kubectl get pods -n naturequest': `NAME                          READY   STATUS    RESTARTS   AGE\nweb-679d9c9b5f-8k2dj         1/1     Running   0          2m\napi-6c4b8d8d95-ntx7m        1/1     Running   0          2m\nlearning-service-7d9bd9     1/1     Running   0          2m\nmemory-service-65c4bc8f9    1/1     Running   0          2m`,
    'kubectl get svc -n naturequest': `NAME               TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE\nweb                ClusterIP   10.43.0.10     <none>        80/TCP    2m\napi                ClusterIP   10.43.0.21     <none>        8080/TCP  2m`,
    'kubectl get hpa -n naturequest': `NAME   REFERENCE        TARGETS   MINPODS   MAXPODS   REPLICAS   AGE\nweb    Deployment/web   60%/70%   2         8         2          2m`,
    'kubectl top pods -n naturequest': `NAME                      CPU(%)   MEM(Mi)\nweb-679d9c9b5f-8k2dj     22        152\napi-6c4b8d8d95-ntx7m    15        128`,
    'kubectl get ingress -n naturequest': `NAME   CLASS    HOSTS                ADDRESS   PORTS   AGE\nweb    public   app.naturequest.dev            80      2m`,
    "docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'": `NAMES                STATUS          PORTS\nredis                Up 2 minutes    0.0.0.0:6379->6379/tcp\nqdrant               Up 2 minutes    0.0.0.0:6333->6333/tcp\npostgres             Up 2 minutes    0.0.0.0:5432->5432/tcp`,
    'curl -s http://localhost:3000/api/health': '{"ok":true,"uptime":"healthy","services":["web","api","learning-service","memory-service"]}',
    "curl -s http://localhost:3000/metrics | grep http_requests_total":
      'http_requests_total{service="web",status="200"} 1284\nhttp_requests_total{service="api",status="200"} 932\nhttp_requests_total{service="api",status="500"} 1',
    'kubectl logs deploy/web -n naturequest --tail=8':
      'GET / 200 42ms\nGET /api/health 200 12ms\nGET /mockServiceWorker.js 404 1ms\nPOST /api/generate 200 221ms\nGET / 200 28ms\nGET /storybook/iframe.html 200 18ms\nGET /api/status 200 9ms\nGET /metrics 200 5ms',
    'kubectl get events -n naturequest --sort-by=.metadata.creationTimestamp': `LAST SEEN   TYPE     REASON    OBJECT                 MESSAGE\n1m          Normal   Pulled    pod/web-679d9c9b5f     Container image pulled\n1m          Normal   Started   pod/web-679d9c9b5f     Started container web` ,
  };
  const opsScript: Step[] = [
    { cmd: 'kubectl get pods -n naturequest', delay: 600 },
    { cmd: 'kubectl get svc -n naturequest', delay: 800 },
    { cmd: 'kubectl get hpa -n naturequest', delay: 800 },
    { cmd: 'kubectl top pods -n naturequest', delay: 800 },
    { cmd: 'kubectl get ingress -n naturequest', delay: 800 },
    { cmd: "docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'", delay: 800 },
    { cmd: 'curl -s http://localhost:3000/api/health', delay: 800 },
    { cmd: 'curl -s http://localhost:3000/metrics | grep http_requests_total', delay: 900 },
    { cmd: 'kubectl logs deploy/web -n naturequest --tail=8', delay: 900 },
    { cmd: 'kubectl get events -n naturequest --sort-by=.metadata.creationTimestamp', delay: 900 },
  ];

  return (
    <div>
      <div className="text-center mb-3 text-xs text-gray-400">
        Now showing: AI Agent • TDD • Mock-first (Storybook/MSW + E2E) • Ops/Observability (K8s/Docker)
        — Use the controls on each terminal (Pause, Step, Reset) to follow at your own pace.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <InteractiveTerminal
          title="AI Agent Orchestration"
          subtitle="Memory → Routes → Spec → Storybook/MSW → E2E → Docs → Status"
          commands={agentCommands}
          script={agentScript}
          autoplay
          showInput={false}
          controls
          animateTyping
          typingSpeedMs={90}
          outputLineDelayMs={320}
          loop
          loopPauseMs={2200}
          heightClass="h-80"
          collapsible
          defaultCollapsed={false}
          glowOnActivity={false}
        />
        <InteractiveTerminal
          title="TDD Loop (red→green→refactor)"
          subtitle="Unit-first TDD: fail → patch → pass → lint"
          commands={tddCommands}
          script={tddScript}
          autoplay
          showInput={false}
          controls
          animateTyping
          typingSpeedMs={85}
          outputLineDelayMs={300}
          loop
          loopPauseMs={2200}
          heightClass="h-80"
          collapsible
          defaultCollapsed={true}
          glowOnActivity={true}
        />
        <InteractiveTerminal
          title="Mock-first (Storybook/MSW + E2E)"
          subtitle="Handlers → profiles → a11y → E2E"
          commands={mockCommands}
          script={mockScript}
          autoplay
          showInput={false}
          controls
          animateTyping
          typingSpeedMs={85}
          outputLineDelayMs={300}
          loop
          loopPauseMs={2200}
          heightClass="h-80"
          collapsible
          defaultCollapsed={true}
          glowOnActivity={true}
        />
        <InteractiveTerminal
          title="Ops / Observability (K8s/Docker)"
          subtitle="pods/svc/hpa/top/ingress → health/metrics/logs/events"
          commands={opsCommands}
          script={opsScript}
          autoplay
          showInput={false}
          controls
          animateTyping
          typingSpeedMs={80}
          outputLineDelayMs={280}
          loop
          loopPauseMs={2200}
          heightClass="h-80"
          collapsible
          defaultCollapsed={true}
          glowOnActivity={true}
        />
      </div>
    </div>
  );
}

// Animated Navigation
type SectionId = 'home' | 'projects' | 'skills' | 'about' | 'book' | 'blog' | 'contact';

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
    { id: 'projects', label: 'Projects', icon: <Rocket className="w-4 h-4" /> },
    { id: 'book', label: 'Book', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'blog', label: 'Blog', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800"
      style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
    >
      <div className="w-full max-w-[90%] 2xl:max-w-[85%] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg animate-pulse blur-xl opacity-50" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">Nature</span>
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
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </motion.button>
              )
            ))}

            {/* Contact CTA */}
            {activeSection !== 'contact' && (
              <div className="ml-2">
                <Button size="sm" onClick={() => setActiveSection('contact')}>
                  Contact
                </Button>
              </div>
            )}
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
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                      }`}
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
      '🌟 NatureQuest - Building the future of developer tools\n  Mission: Create AI-powered tools that enhance developer productivity\n  Focus: Privacy-first, performance-optimized solutions\n  Team: Passionate developers and AI enthusiasts',
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
      '🖥️ NatureQuest OS\n  ================\n  OS: Production v2.0\n  Uptime: 2 years\n  Packages: 4 (production)\n  Shell: zsh\n  DE: React\n  Terminal: portfolio\n  CPU: Multi-core AI\n  Memory: Unlimited',
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
        tagline: '🎮 Fast, feedback-rich quizzes learners actually want',
        description:
          'Help learners gain real, retained skill in minutes a day through fast, feedback‑rich quizzes they actually want to come back to.',
        differentiation: [
          // 1) Fast feedback that sticks
          'Start a quiz in under 30 seconds',
          'Clear explanations after each answer',
          'Practice mode for deeper understanding without time pressure',
          // 2) Progress you can feel
          'XP, streaks, achievements, and daily goals provide tangible momentum',
          'Results summarize what to improve; "Recently Incorrect" turns mistakes into learning',
          'Shareable wins and friendly competition via leaderboards',
          // 3) Accessible, reliable, everywhere
          'Keyboard/screen‑reader friendly with strong focus order and labels',
          'Offline quiz packs with smart sync on reconnect',
          'Graceful error recovery and performance budgets for smooth sessions',
          // 4) BatchProcessor Infrastructure - Real Performance Gains
          '90% reduction in API calls through intelligent batching',
          'Quiz loading 5x faster: 10 questions in 200ms vs 1000ms',
          '90% cost reduction through fewer database calls',
          'Memory-efficient queue management with non-blocking operations',
          'Automatic retry logic with exponential backoff',
          'QuestionBatchProcessor: Loads quiz questions in optimized batches',
          'AnalyticsBatchProcessor: Collects and sends events efficiently',
          'UserDataSyncProcessor: Batches user progress updates',
          'Real-time performance monitoring in Storybook dashboard',
          'Interactive testing: toggle batched/non-batched modes live',
        ],
        status: 'Beta',
        metrics: {},
        tech: [
          'React Native',
          'Expo',
          'TypeScript',
          'Next.js API Routes',
          'Edge Runtime',
          'Supabase',
          'Supabase Auth (RLS)',
          'PostgreSQL',
          'SQLite',
          'Upstash Redis (optional)',
          'WebSockets',
          'Vercel Cron',
'Playwright',
          'Jest',
          'Storybook',
          'MSW',
          'Bloom Validator',
          'Adaptive Engine',
          'Self‑Learning Orchestrator',
          'Content Pipeline (Scraper/AI/RAG)',
        ],
        live: 'https://quizmentor.app',
        icon: <Gamepad2 className="w-6 h-6" />,
        color: 'from-purple-600 to-pink-600',
      },
      {
        id: 'devmentor',
        title: 'DevMentor',
        tagline: 'AI-assisted development without context loss',
        description:
          'VS Code extension + product layer that enriches prompts with repo context, runs a TDD feedback loop (red→green→refactor), and keeps code, tests, and docs in sync.',
        differentiation: [
          'PBML code intelligence: pattern-aware suggestions, refactors, and quick‑fixes in VS Code',
          'Epic Management: CRUD with filters, status, and linked docs',
          'System Status: unified diagnostics, incidents, and CI artifacts',
          'Mock‑first dev: MSW latency/error profiles; Swagger/OpenAPI "contracts in Storybook"',
          'Quality gates in CI: a11y checks, Jest coverage, Playwright E2E, and bundle budgets',
          // Advanced technical capabilities
          'Embeddings: Text to vector conversion with caching',
          'Document Processing: Chunking, metadata, overlap',
          'Vector Storage: Qdrant integration',
          'Search: Similarity search with filters and thresholds',
          'RAG: Context retrieval for LLM augmentation',
          'Performance: Concurrency and response time requirements',
          'Error Handling: Graceful failure recovery',
        ],
        status: 'Beta',
        metrics: {},
        tech: [
          'Next.js 14',
          'React 18',
          'TypeScript',
'Node.js',
          'Storybook 9',
          'MSW',
          'Swagger UI',
          'TanStack Query',
          'Radix UI',
          'LangChain',
          'OpenAI',
          'Anthropic',
          'PostgreSQL',
          'Redis',
          'Qdrant',
          'WebSockets',
          'Kubernetes',
          'Istio',
          'Kiali',
          'Helm',
          'FluxCD',
          'Envoy',
          'API Gateway',
          'Prometheus',
          'Alertmanager',
          'Grafana',
          'Loki',
          'Promtail',
          'OpenTelemetry',
          'Playwright',
          'Vitest/Jest',
          'Locust',
          'GitHub Actions',
          'OAuth 2.0',
          'JWT',
          'JWKS',
          'OPA (ABAC/RBAC)',
        ],
        icon: <Bot className="w-6 h-6" />,
        color: 'from-blue-600 to-cyan-600',
      },
      {
        id: 'harvest',
        title: 'Harvest.ai',
        tagline: '🌾 Transform raw content into polished outputs—fast',
        description:
          'Transforms raw content (notes, outlines, transcripts, docs) into polished outputs like blogs, summaries, emails, and presentations—fast, predictable, and privacy-first (BYOK: bring your own AI keys).',
        differentiation: [
          // Speed to value
          'One input box, opinionated presets, instant streaming feedback',
          // Radical transparency
          'Live token/cost meter, quality scoring, clear fallbacks and errors',
          // Reliability
          'Multi-provider fallback (OpenAI, Anthropic, Gemini), caching, rate limiting',
          // Privacy-first
          'BYOK (bring your own keys), no default data retention, clear export and deletion',
          // Developer experience
          'REST + streaming API, OpenAPI spec, mock-first dev mode',
          // Trust building
          'Transparent cost/quality UX—not a black box',
        ],
        status: 'Beta',
        metrics: {},
        tech: [
          'Python',
          'FastAPI',
          'Next.js',
'TypeScript',
          'OpenAPI',
          'Storybook',
          'MSW',
          'Playwright',
          'SSE',
        ],
        icon: <Brain className="w-6 h-6" />,
        color: 'from-green-600 to-teal-600',
      },
      {
        id: 'devmentor-vscode',
        title: 'DevMentor for VS Code',
        tagline: '🧩 DevMentor’s VS Code extension',
        description:
          'Brings DevMentor’s pattern-aware intelligence directly into VS Code with inline suggestions, quick-fixes, and workspace-aware guidance.',
        differentiation: [
          'Inline code actions and quick-fixes powered by project patterns',
          'Command Palette and hover helpers with repository-context prompts',
          'Privacy-first: local model routing where possible, API fallbacks when allowed',
          'Workspace-aware memory and RAG for consistent recommendations',
        ],
        status: 'Active Development',
        metrics: {},
        tech: ['TypeScript', 'VS Code API', 'LangChain', 'Vector Search', 'Node.js'],
        icon: <Code className="w-6 h-6" />,
        color: 'from-indigo-600 to-purple-600',
      },
      {
        id: 'command-center',
        title: 'AIBook (OSS Command Center)',
        tagline: '🤖 Where AI Meets UI Development — stop copying broken AI code',
        description:
          'A Storybook setup built for AI-assisted UI development. It provides working patterns, mock-first APIs, and built-in tests so AI can generate code that actually runs. It’s the visual ground truth and main workflow for AI + TDD.',
        differentiation: [
          'AI-ready patterns: Epic Manager CRUD, API Playground, Network Playground, Status Dashboard',
          'Mock-first development: MSW intercepts all API calls; control latency/error via toolbar',
          'Built-in quality: Unit (Vitest), accessibility checks, and E2E (Playwright), plus live coverage',
          'Context recovery: Rebuild mental model in 2 minutes after crashes with Docs/Status/Epics stories',
          '5-minute features: Pattern-based prompts → working components with tests',
          'Time saved: ~30 min per component (≈5 hours/week)',
        ],
        status: 'Beta',
        featured: true,
        metrics: {},
        tech: [
          'Storybook',
          'React',
          'TypeScript',
          'MSW',
          'Vitest',
          'Playwright',
          'Accessibility (axe runner)',
        ],
        icon: <Book className="w-6 h-6" />,
        color: 'from-teal-600 to-emerald-600',
      },
      {
        id: 'voice',
        title: 'Voice',
        tagline: '🎙️ Voice AI Project',
        description:
          'Speech-driven AI experiences with real-time transcription and intelligent responses',
        differentiation: [
          'Low-latency streaming transcription',
          'Conversational context retention',
          'Local and cloud model support',
          'Privacy-first audio handling',
        ],
        status: 'Active Development',
        metrics: {
          sessions: '1K+',
          latency: '<100ms',
          accuracy: '≈95%',
        },
        tech: ['TypeScript', 'WebAudio', 'WebRTC', 'OpenAI/Whisper', 'VAD'],
        icon: <Mic className="w-6 h-6" />,
        color: 'from-orange-600 to-red-600',
      },
    ],
    [],
  );

  // Sort projects by status only
  const sortedProjects = useMemo(() => {
    const statusOrder: Record<string, number> = { Beta: 1, 'Active Development': 2 };
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
    quizmentor: {
      coreOffering:
        'Help learners gain real, retained skill in minutes a day through fast, feedback‑rich quizzes they actually want to come back to.',
      securitySnapshot: 'Supabase RLS; PII minimization; redaction',
      securityDocUrl: '/docs/_quizmentor/security/SECURITY_HARDENING_BLUEPRINT.md',
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
      securitySnapshot: 'JWT edge; mTLS mesh; RBAC',
      securityDocUrl: '/docs/_devmentor/security/SECURITY_HARDENING_BLUEPRINT.md',
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
      securitySnapshot: 'BYOK ephemeral default; encrypted opt-in',
      plannedTech: [
        'BullMQ (queue)',
        'Cloudflare R2',
        'Pinecone',
        'S3 (backups)',
        'Puppeteer',
        'pdf-parse',
        'Whisper API',
        'Tesseract',
        'spaCy',
        'scikit-learn (TF‑IDF)',
        'Prometheus client',
        'PostHog',
        'Sentry',
        'BetterUptime',
        'CDN caching (Cloudflare)',
        'Circuit breaker',
        'Exponential backoff',
        'Cost Router',
        'Railway/Render configs',
      ],
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
                    Building the future of developer tools
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
                      NatureQuest
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
                        'Transforming ideas into intelligent, scalable solutions',
                        'Building AI-powered developer tools with privacy first',
                        "Creating tomorrow's development workflow today",
                        'Revolutionizing education through gamification',
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
                  Creating AI-powered developer tools that prioritize privacy, performance, and
                  developer experience. From gamified learning to intelligent content
                  transformation.
                </motion.p>

                <motion.div
                  className="flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Button
                    onClick={() => setActiveSection('projects')}
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Explore Projects
                  </Button>
                  <Button
                    onClick={() => setActiveSection('projects')}
                    variant="secondary"
                    size="lg"
                    icon={MapPin}
                  >
                    View Roadmaps
                  </Button>
                </motion.div>

                {/* Dual Terminal Demo (autoplay flows) */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="max-w-7xl mx-auto mt-16"
                >
                  <WorkflowsShowcase />
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
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Projects
                </h2>
                <p className="text-gray-400">Real products solving real problems</p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs">
                  <Sparkles className="w-3 h-3" />
                  <span>All projects are in active beta development</span>
                </div>
                {focusedProject && (
                  <div className="mt-6 flex justify-center">
                    <Button variant="secondary" size="sm" onClick={() => setFocusedProject(null)}>
                      Back to overview
                    </Button>
                  </div>
                )}
              </motion.div>

              <div className="space-y-4">
                {sortedProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    className={`w-full transition-all duration-500 ${focusedProject && focusedProject !== project.id ? 'opacity-30 scale-[0.99]' : ''}`}
                    style={project.id === 'devmentor-vscode' ? { marginLeft: '10%' } : undefined}
                    onClick={() => {
                      if (focusedProject === project.id) {
                        setFocusedProject(null);
                      } else {
                        setFocusedProject(project.id);
                      }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4, ease: 'easeOut' }}
                  >
                    <motion.div
                      className="group w-full"
                      layout
                      transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
                    >
                      <div className="relative bg-gray-900 rounded-xl border border-gray-800 overflow-hidden w-full">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                        />

                        <motion.div
                          className={`relative ${focusedProject === project.id ? 'p-6 lg:p-8' : 'p-4 lg:p-5'}`}
                          layout
                          transition={{ layout: { duration: 0.3 } }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <motion.div
                                className={`${focusedProject === project.id ? 'p-3' : 'p-2.5'} rounded-lg bg-gradient-to-br ${project.color} transition-all duration-300`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                {React.cloneElement(project.icon, {
                                  className: focusedProject === project.id ? 'w-6 h-6' : 'w-5 h-5',
                                })}
                              </motion.div>
                              <div>
                                <h3
                                  className={`font-bold text-white ${focusedProject === project.id ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'}`}
                                >
                                  {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm lg:text-base">
                                  {project.tagline}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                variant={
                                  project.status === 'Production'
                                    ? 'success'
                                    : project.status === 'Beta'
                                      ? 'info'
                                      : 'warning'
                                }
                                size="sm"
                              >
                                {project.status}
                              </Badge>
                              {project.id === 'command-center' && (
                                <Badge size="sm">Featured</Badge>
                              )}
                              {(() => {
                                const details = (projectDetails as any)[project.id];
                                if (details?.securitySnapshot) {
                                  return (
                                    <span title={details.securitySnapshot}>
                                      <Badge size="sm">Security</Badge>
                                    </span>
                                  );
                                }
                                return null;
                              })()}
                            </div>
                          </div>

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

                                {/* Security Snapshot */}
                                {(() => {
                                  const details = (projectDetails as any)[project.id];
                                  if (details?.securitySnapshot) {
                                    return (
                                      <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 mb-4">
                                        <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                          Security Snapshot (5 words)
                                        </h5>
                                        <div className="text-xs text-gray-300">
                                          {details.securitySnapshot}
                                        </div>
                                      </div>
                                    );
                                  }
                                  return null;
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
                                  <Button
                                    onClick={() =>
                                      setRoadmapModal({ isOpen: true, project: project.id })
                                    }
                                    variant="primary"
                                    size="sm"
                                    icon={MapPin}
                                  >
                                    View Roadmap
                                  </Button>
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
                                  {(() => {
                                    const details = (projectDetails as any)[project.id];
                                    if (details?.securityDocUrl) {
                                      return (
                                        <Button
                                          onClick={() =>
                                            window.open(details.securityDocUrl, '_blank')
                                          }
                                          variant="secondary"
                                          size="sm"
                                          icon={Shield}
                                        >
                                          Security Blueprint
                                        </Button>
                                      );
                                    }
                                    return null;
                                  })()}
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

        {/* About Section - Balanced spacing applied */}
        {activeSection === 'about' && (
          <motion.section
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="w-full max-w-[90%] 2xl:max-w-[85%] mx-auto">
              {/* Header - SUPER COMPACT SPACING */}
              <motion.div
                className="text-center mb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="w-32 h-32 2xl:w-36 2xl:h-36 mx-auto mb-1 relative">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-green-400/30 shadow-2xl shadow-green-400/20">
                    <Image
                      src="/marco.jpg"
                      alt="Marco profile photo"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-full animate-pulse blur-xl" />
                </div>
                <h1 className="text-3xl 2xl:text-4xl font-bold mb-1">
                  <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                    Marco
                  </span>
                </h1>
                <p className="text-sm 2xl:text-base text-gray-400 mb-0">
                  Pragmatic Problem Solver | Fullstack - Mobile Engineer & Web-stacks | Exploring
                  "AI as a companion mindset".
                </p>
                <p className="text-xs text-gray-500 mb-1">Denmark</p>
                <div className="flex justify-center space-x-4">
                  <motion.a
                    href="https://linkedin.com/in/mapw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 hover:border-gray-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-6 h-6 text-blue-400" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/MarcoPWx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 hover:border-gray-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-6 h-6 text-gray-300" />
                  </motion.a>
                  <motion.a
                    href="mailto:Marcowurtz@hotmail.com"
                    className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-all border border-gray-700 hover:border-gray-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-6 h-6 text-green-400" />
                  </motion.a>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Professional Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2 space-y-2"
                >
                  <Card3D className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-3">
                    <h2 className="text-lg 2xl:text-xl font-bold mb-2 flex items-center gap-2">
                      <User className="w-6 h-6 text-green-400" />
                      Professional Summary
                    </h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      <div className="text-lg font-medium text-white mb-4">
                        Pragmatic Problem Solver | Fullstack - Mobile Engineer & Web-stacks |
                        Exploring "AI as a companion mindset".
                      </div>
                      <p>
                        Able to work with fast adaptability, deep problem-solving skills, and the
                        ability to thrive in fast-paced environments requiring multi-context
                        switching.
                      </p>
                      <p>Passionate about big-picture design.</p>
                      <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                        <h3 className="text-xs text-gray-300 font-semibold mb-1">
                          Philosophy for Building Exceptional Software
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                          <li className="text-xs text-gray-400">
                            Deliver Frequently: Launch features in smaller increments to stay agile
                            and adapt quickly.
                          </li>
                          <li className="text-xs text-gray-400">
                            User-Centered: Focus on delivering tangible value for end users at every
                            release.
                          </li>
                          <li className="text-xs text-gray-400">
                            Preemptive Error Detection: Identify and address potential issues before
                            they become critical.
                          </li>
                          <li className="text-xs text-gray-400">
                            Maintain Code Integrity: Fix small issues early to prevent big problems
                            later.
                          </li>
                          <li className="text-xs text-gray-400">
                            Efficient Testing: Implement automated, fast, and reliable tests that
                            catch errors early.
                          </li>
                          <li className="text-xs text-gray-400">
                            Keep It Simple: Strive for straightforward, maintainable solutions that
                            stand the test of time.
                          </li>
                          <li className="text-xs text-gray-400">
                            Continuous Learning: Believe in ongoing reading, experimentation, and
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
                  </Card3D>

                  {/* Work Experience */}
                  <Card3D className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl 2xl:text-3xl font-bold mb-4 flex items-center gap-3">
                      <Briefcase className="w-6 h-6 text-blue-400" />
                      Work Experience
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Download}
                          onClick={() => {
                            try {
                              window.print();
                            } catch (e) {
                              /* ignore */
                            }
                          }}
                        >
                          Save/Print CV
                        </Button>
                      </div>
                      {(() => {
                        const experiences = [
                          {
                            title: 'Senior Fullstack Mobile Engineer',
                            company: 'ExSeed Health',
                            period: 'Apr 2025 – Aug 2025',
                            summary:
                              'Brought in to mature the team and architecture, balancing hands‑on execution with process and culture upgrades.',
                            highlights: [
                              'Steering-group input; weekly stakeholder demo cadence',
                              'Developer handbook: standards, workflows, patterns',
                              'Code quality uplift: reviews, PR flow, clean architecture',
                              'Multi‑platform MVPs/POCs (Flutter, Swift, Kotlin, C++)',
                              'Focus: thread/memory mgmt, auto‑generated setups, SDK contracts',
                              'Monorepo tooling, scalable CI, improved dev ergonomics',
                            ],
                            tags: ['Swift', 'Kotlin', 'Flutter', 'C++', 'Clean Architecture', 'CI'],
                          },
                          {
                            title: 'Platform Solution Architect / Senior Mobile Engineer',
                            company: 'Queue‑it',
                            period: 'Oct 2024 – Apr 2025',
                            summary:
                              'Connectors, client/server integrations, and CDN‑aware implementations at scale.',
                            highlights: [
                              'Designed/maintained JS/Java + iOS/Android connectors',
                              'Guided client CDN integrations and best‑practices',
                              'Deep debugging across HTTP/cookies/tokens/security',
                              'Redis caching, CSP/security hardening',
                              'AWS infra: Lambda, S3, EC2, Route 53, DynamoDB',
                              'On‑call/DevDuty for incident readiness and reliability',
                            ],
                            tags: ['Swift', 'Kotlin', 'Java', 'AWS', 'Redis', 'CDN'],
                          },
                          {
                            title: 'Full Stack Engineer',
                            company: 'Cinemataztic',
                            period: 'Apr 2024 – Sep 2024',
                            summary:
                              'Delivered trade‑desk web apps, BFF APIs, infra, and robust test tooling.',
                            highlights: [
                              'TypeScript/React apps + Express BFF (MongoDB)',
                              'Auth, sessions, and security middleware',
                              'API mocking (MSW) and stronger unit/E2E strategy',
                              'Helm + FluxCD deployments; Jenkins pipelines',
                              'On‑prem Linux provisioning via SSH/Ansible',
                              'Service mesh a11y/observability with Istio & dashboards',
                            ],
                            tags: [
                              'TypeScript',
                              'React',
                              'Express',
                              'MongoDB',
                              'Helm',
                              'FluxCD',
                              'MSW',
                            ],
                          },
                          {
                            title: 'Team Lead / Head of Tech (App)',
                            company: 'PatientSky (EG PatientSky) — App team',
                            period: 'Apr 2023 – May 2024',
                            summary:
                              'Led the mobile app team (2.5M downloads, 250k MAU). Drove quality, performance, and accessibility.',
                            highlights: [
                              'Raised rating to 5★ from 3★; −20% app load time',
                              'BFF strategy reducing coupling; testable interfaces',
                              'WebRTC video experience (iOS/Android tailored)',
                              'WCAG improvements for accessibility',
                              'Scaled team to standalone BU with 6 members',
                            ],
                            tags: ['iOS', 'Android', 'WebRTC', 'Clean Architecture', 'WCAG'],
                          },
                        ];
                        return (
                          <ol className="relative ml-3 pl-6 space-y-8 border-l border-gray-800">
                            {experiences.map((job, index) => (
                              <li key={index} className="relative">
                                <span className="absolute -left-3 top-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-gray-950" />
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                                  <div>
                                    <h3 className="text-base md:text-lg font-semibold text-white">
                                      {job.title}
                                    </h3>
                                    <p className="text-green-400 font-medium">{job.company}</p>
                                  </div>
                                  <span className="text-xs text-gray-400 whitespace-nowrap">
                                    {job.period}
                                  </span>
                                </div>
                                {job.summary && (
                                  <p className="text-sm text-gray-300 mt-2">{job.summary}</p>
                                )}
                                <ul className="mt-3 space-y-1">
                                  {job.highlights.map((h: string, i: number) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 text-sm text-gray-400"
                                    >
                                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                                {Array.isArray(job.tags) && job.tags.length > 0 && (
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {job.tags.map((t: string, i: number) => (
                                      <span
                                        key={i}
                                        className="px-2 py-0.5 bg-gray-800/60 border border-gray-700 rounded text-xs text-gray-300"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </li>
                            ))}
                          </ol>
                        );
                      })()}
                    </div>
                  </Card3D>

                  {/* Education & Certifications */}
                  <Card3D className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-purple-400" />
                      Education & Certifications
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Computer Science Degree
                        </h3>
                        <p className="text-purple-400 font-medium mb-2">University of Technology</p>
                        <p className="text-gray-400 text-sm">
                          Bachelor's in Computer Science • 2014-2018
                        </p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          'AWS Certified Solutions Architect',
                          'Google Cloud Professional Developer',
                          'Kubernetes Administrator (CKA)',
                          'MongoDB Certified Developer',
                          'React Advanced Certification',
                          'Machine Learning Specialization',
                        ].map((cert, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-300">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card3D>
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

                  {/* Key Projects */}
                  <Card3D className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-blue-400" />
                      Key Projects
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: 'QuizMentor',
                          description:
                            'Gamified learning platform with AI-powered quiz generation and 92% user retention',
                          tech: ['React Native', 'Supabase', 'AI/ML', 'Gamification', 'Analytics'],
                        },
                        {
                          name: 'DevMentor',
                          description:
                            'AI pair programming assistant with pattern-based learning and real-time collaboration',
                          tech: [
                            'TypeScript',
                            'LangChain',
                            'Kubernetes',
                            'PostgreSQL',
                            'WebSockets',
                          ],
                        },
                        {
                          name: 'Harvest.ai',
                          description:
                            'Content intelligence system for automated analysis and insights generation',
                          tech: ['Python', 'FastAPI', 'Vector DB', 'OpenAI', 'Data Analytics'],
                        },
                        {
                          name: 'NatureQuest Ecosystem',
                          description:
                            'Comprehensive developer tools platform with microservices architecture',
                          tech: ['Kubernetes', 'Istio', 'React', 'Node.js', 'AI/ML'],
                        },
                      ].map((project, index) => (
                        <div key={index} className="border-l-2 border-blue-400/30 pl-4">
                          <h4 className="font-medium text-white mb-1">{project.name}</h4>
                          <p className="text-sm text-gray-400 mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.tech.map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-blue-500/10 text-xs text-blue-400 rounded border border-blue-500/20"
                              >
                                {tech}
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
            <DynamicComprehensiveSkillsV2 />
            <div className="mt-10">
              <ProjectStack />
            </div>
          </motion.section>
        )}

        {/* Book Section */}
        {activeSection === 'book' && (
          <motion.section
            key="book"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16 flex items-center justify-center"
          >
            <div className="w-full max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h2 className="text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                    Book — Announced soon
                  </span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  A comprehensive guide to AI-driven development patterns and modern software architecture.
                  Snippets and sample chapters coming soon.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-white">
                      AI-Driven Development Patterns
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      A comprehensive guide to modern development patterns enhanced by AI workflows,
                      covering everything from pattern recognition to automated code generation and
                      optimization.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-green-400">
                            Pattern-Based Memory Learning (PBML)
                          </h4>
                          <p className="text-sm text-gray-400">
                            How AI systems learn and adapt from code patterns across projects
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-blue-400">
                            Multi-Provider AI Integration
                          </h4>
                          <p className="text-sm text-gray-400">
                            Orchestrating OpenAI, Claude, and local models for optimal results
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-purple-400">
                            Adaptive Learning Systems
                          </h4>
                          <p className="text-sm text-gray-400">
                            Building systems that improve performance through continuous learning
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="px-6 py-3 border border-gray-700 text-gray-400 rounded-lg font-medium">
                        Announcement coming soon
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl p-6">
                    <div className="text-center mb-4">
                      <div className="w-32 h-40 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Coming Q2 2025</h4>
                      <p className="text-gray-400 text-sm">
                        Available in digital and print formats
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Pages:</span>
                        <span className="text-white">~350</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Chapters:</span>
                        <span className="text-white">12</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Code Examples:</span>
                        <span className="text-white">50+</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Case Studies:</span>
                        <span className="text-white">8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Blog Section */}
        {activeSection === 'blog' && (
          <motion.section
            key="blog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="w-full max-w-[90%] 2xl:max-w-[85%] mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h2 className="text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                    Blog & Articles
                  </span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Insights on AI development, software architecture, and modern development
                  practices
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    title: 'Building AI-First Development Workflows',
                    date: 'December 2024',
                    readTime: '8 min read',
                    category: 'AI Development',
                    excerpt:
                      'How to integrate AI tools into your development workflow for maximum productivity and code quality.',
                    gradient: 'from-blue-500 to-purple-500',
                  },
                  {
                    title: 'Pattern-Based Memory Learning in Practice',
                    date: 'November 2024',
                    readTime: '12 min read',
                    category: 'Machine Learning',
                    excerpt:
                      'Deep dive into PBML systems and how they can revolutionize code pattern recognition and optimization.',
                    gradient: 'from-green-500 to-teal-500',
                  },
                  {
                    title: 'Microservices with Kubernetes and Istio',
                    date: 'October 2024',
                    readTime: '15 min read',
                    category: 'DevOps',
                    excerpt:
                      'Complete guide to building scalable microservices architecture with service mesh patterns.',
                    gradient: 'from-orange-500 to-red-500',
                  },
                  {
                    title: 'TypeScript Advanced Patterns for AI Integration',
                    date: 'September 2024',
                    readTime: '10 min read',
                    category: 'TypeScript',
                    excerpt:
                      'Advanced TypeScript patterns for building type-safe AI applications and API integrations.',
                    gradient: 'from-purple-500 to-pink-500',
                  },
                  {
                    title: 'Local AI Models vs Cloud APIs: Cost Analysis',
                    date: 'August 2024',
                    readTime: '6 min read',
                    category: 'AI Strategy',
                    excerpt:
                      'Comprehensive analysis of running local AI models with Ollama vs cloud-based API services.',
                    gradient: 'from-yellow-500 to-orange-500',
                  },
                  {
                    title: 'Building Adaptive Learning Systems',
                    date: 'July 2024',
                    readTime: '14 min read',
                    category: 'Education Tech',
                    excerpt:
                      'How to build educational systems that adapt to user learning patterns and optimize knowledge retention.',
                    gradient: 'from-indigo-500 to-blue-500',
                  },
                ].map((article, index) => (
                  <motion.div
                    key={article.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:border-gray-600 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${article.gradient}`}
                      ></div>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">
                        {article.category}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-3">{article.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Button variant="primary" size="md">
                  View All Articles
                </Button>
              </div>
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
