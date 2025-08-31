'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Github, Linkedin, Twitter, Mail, Download, BookOpen, 
  Code2, Rocket, Users, Heart, Coffee, ChevronRight,
  Calendar, Clock, Tag, ArrowRight, ExternalLink, User,
  Sparkles, Zap, Star, TrendingUp, Globe, Award,
  FileText, Briefcase, GraduationCap, Target, Database,
  Shield, Lock, CheckCircle, ArrowUpRight, Play,
  Terminal as TerminalIcon, Copy, Check, FileCode, Server, Cpu,
  GitBranch, Package, Layers, Activity, Brain, Gamepad2,
  PenTool, MessageSquare, FileSearch, Bot, Puzzle,
  BarChart, Lightbulb, Home, BookOpenCheck, ScrollText,
  Map, KeyRound, Palette, Smartphone, Cloud, Settings,
  Gauge, X, ChevronDown, Info, Book, Workflow, Timer,
  Boxes, Network, ShieldCheck, Infinity, GitPullRequest,
  Hash, Braces, Command, Sparkle, Wand2, FlaskConical,
  Laptop, Monitor, HardDrive, Wifi, GitCommit, Binary,
  TestTube, Beaker, Microscope, Atom, Dna, CircuitBoard,
  MousePointer, Compass, Flag, Milestone, MapPin,
  Award as AwardIcon, Trophy, Medal, Crown, Flame,
  Gem, Diamond, Hexagon, Pentagon, Triangle,
  Circle, Square, Octagon, Star as StarIcon,
  ArrowUp, Maximize2, Eye, TrendingDown, Percent,
  DollarSign, PieChart, BarChart3, LineChart,
  Video, Mic, Camera, Radio, Tv, Youtube,
  Chrome, Safari, Firefox, Edge, Code,
  Layers3, Component, Box, Grid, Layout
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// Floating particles background with more green blobs
function ParticlesBackground() {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  
  // Generate stable random values
  const particles = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: `small-${i}`,
      initialX: Math.random() * 1920,
      initialY: Math.random() * 1080,
      targetX: Math.random() * 1920,
      targetY: Math.random() * 1080,
      duration: Math.random() * 20 + 10
    }));
  }, []);
  
  const blobs = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: `blob-${i}`,
      initialX: Math.random() * 1920 - 128,
      initialY: Math.random() * 1080 - 128,
      targetX: Math.random() * 1920 - 128,
      targetY: Math.random() * 1080 - 128,
      duration: Math.random() * 30 + 20
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
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-950/60 to-gray-900/50" />
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Small particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"
          initial={{ 
            x: particle.initialX * (dimensions.width / 1920),
            y: particle.initialY * (dimensions.height / 1080),
            opacity: 0
          }}
          animate={{ 
            x: particle.targetX * (dimensions.width / 1920),
            y: particle.targetY * (dimensions.height / 1080),
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Large green blobs with gradient */}
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute opacity-20"
          style={{ width: '256px', height: '256px' }}
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
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-500/30 via-teal-500/20 to-transparent rounded-full" style={{ filter: 'blur(48px)', WebkitFilter: 'blur(48px)' }} />
        </motion.div>
      ))}
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/95 to-gray-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
}

// Subtle 3D Card with toned down hover effects
function Card3D({ children, className = "" }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
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
    ([x, y]) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`
  );

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        WebkitTransformStyle: "preserve-3d",
        transform
      }}
    >
      {children}
    </motion.div>
  );
}

// Interactive Terminal Component
function InteractiveTerminal({ commands }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: '🚀 NatureQuest Developer Portfolio v2.0' },
    { type: 'output', text: 'Type "help" for available commands' }
  ]);
  
  const handleCommand = (cmd) => {
    const newHistory = [...history, { type: 'input', text: `> ${cmd}` }];
    
    const command = commands[cmd.toLowerCase()];
    if (command) {
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

  return (
    <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
        <span className="text-gray-500 text-xs ml-2">portfolio@terminal</span>
      </div>
      <div className="h-64 overflow-y-auto space-y-1">
        {history.map((item, i) => (
          <div 
            key={i}
            className={
              item.type === 'input' ? 'text-green-400' :
              item.type === 'error' ? 'text-red-400' :
              'text-gray-300'
            }
          >
            {item.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className="text-green-400">></span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleCommand(input);
            }
          }}
          className="flex-1 bg-transparent outline-none text-gray-300"
          placeholder="Enter command..."
        />
      </div>
    </div>
  );
}

// Animated Navigation
function Navigation({ activeSection, setActiveSection }) {
  const sections = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Rocket className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'blog', label: 'Blog', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'skills', label: 'Stack', icon: <Layers className="w-4 h-4" /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800" style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg animate-pulse blur-xl opacity-50" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">Nature</span>
              <span className="text-green-400">Quest</span>
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-2">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg shadow-green-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.icon}
                <span>{section.label}</span>
              </motion.button>
            ))}
          </div>

          <motion.a 
            href="https://github.com/NatureQuest"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <Github className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </nav>
  );
}

// Project Roadmap Component
function ProjectRoadmap({ project }) {
  const roadmapPhases = {
    quizmentor: [
      { 
        phase: 'Foundation', 
        status: 'completed',
        items: ['Core quiz engine', 'Gamification system', 'User authentication', 'Basic analytics'],
        completion: 100
      },
      { 
        phase: 'AI Integration', 
        status: 'in-progress',
        items: ['Bloom\'s taxonomy validator', 'Adaptive learning engine', 'Question generation', 'Smart recommendations'],
        completion: 75
      },
      { 
        phase: 'Multiplayer', 
        status: 'in-progress',
        items: ['Real-time battles', 'Leaderboards', 'Team competitions', 'Social features'],
        completion: 60
      },
      { 
        phase: 'Enterprise', 
        status: 'planned',
        items: ['White-label solution', 'Advanced analytics', 'API marketplace', 'Custom integrations'],
        completion: 10
      }
    ],
    harvest: [
      { 
        phase: 'MVP', 
        status: 'completed',
        items: ['Content scraping', 'Basic transformation', 'Quiz generation', 'API endpoints'],
        completion: 100
      },
      { 
        phase: 'AI Pipeline', 
        status: 'in-progress',
        items: ['Multi-agent validation', 'Quality scoring', 'Legal compliance', 'Cost optimization'],
        completion: 80
      },
      { 
        phase: 'Scale', 
        status: 'planned',
        items: ['Distributed processing', 'Real-time streaming', 'Custom models', 'Enterprise features'],
        completion: 20
      }
    ],
    omni: [
      { 
        phase: 'Core Extension', 
        status: 'completed',
        items: ['Multi-provider support', 'Hot swapping', 'Basic UI', 'Local models'],
        completion: 100
      },
      { 
        phase: 'Intelligence', 
        status: 'in-progress',
        items: ['Smart routing', 'Context preservation', 'Cost optimization', 'Pattern learning'],
        completion: 65
      },
      { 
        phase: 'Ecosystem', 
        status: 'planned',
        items: ['Plugin marketplace', 'Team features', 'Cloud sync', 'Enterprise SSO'],
        completion: 5
      }
    ]
  };

  const phases = roadmapPhases[project] || [];

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-600 to-teal-600" />
      
      <div className="space-y-8">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-16"
          >
            <div className={`absolute left-5 w-6 h-6 rounded-full border-4 border-gray-950 ${
              phase.status === 'completed' ? 'bg-green-500' :
              phase.status === 'in-progress' ? 'bg-yellow-500 animate-pulse' :
              'bg-gray-600'
            }`} />
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">{phase.phase}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  phase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  phase.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {phase.completion}%
                </span>
              </div>
              
              <div className="space-y-2">
                {phase.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${
                      phase.status === 'completed' ? 'text-green-400' :
                      'text-gray-600'
                    }`} />
                    <span className="text-sm text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${phase.completion}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-full ${
                      phase.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-green-400' :
                      phase.status === 'in-progress' ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
                      'bg-gray-600'
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
    { label: 'Response Time', value: 45, change: -20, icon: <Zap className="w-5 h-5" />, suffix: 'ms' },
    { label: 'Cost Saved', value: 50000, change: 35, icon: <DollarSign className="w-5 h-5" />, prefix: '$' }
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
            <div className="p-2 bg-gray-800 rounded-lg">
              {metric.icon}
            </div>
            <div className={`flex items-center gap-1 text-xs ${
              metric.change > 0 ? 'text-green-400' :
              metric.change < 0 ? 'text-red-400' :
              'text-gray-400'
            }`}>
              {metric.change !== 0 && (
                <>
                  {metric.change > 0 ? <ArrowUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
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
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState('quizmentor');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Initialize component
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track mouse for interactive effects
  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mounted]);

  // Enhanced Terminal commands
  const terminalCommands = {
    help: '📚 Available commands:\n  projects - List all projects\n  skills - Show tech stack\n  about - Who we are\n  contact - Get in touch\n  github - Visit GitHub\n  linkedin - Visit LinkedIn\n  blog - Latest articles\n  metrics - View live stats\n  roadmap - See what\'s next\n  whoami - About the developer\n  neofetch - System info\n  clear - Clear terminal',
    projects: '🚀 Active Projects:\n  • QuizMentor - Gamified learning platform\n  • DevMentor - AI pair programming assistant\n  • Harvest.ai - Content intelligence system\n  • Omni.ai - Universal AI coding assistant',
    skills: '💻 Tech Stack:\n  Languages: TypeScript, Python, Go, Rust\n  Frontend: React, Next.js, React Native, Tailwind\n  Backend: Node.js, FastAPI, GraphQL\n  AI/ML: LangChain, OpenAI, Anthropic, Ollama\n  Cloud: AWS, Docker, Kubernetes\n  DB: PostgreSQL, Redis, MongoDB',
    about: '🌟 NatureQuest - Building the future of developer tools\n  Mission: Create AI-powered tools that enhance developer productivity\n  Focus: Privacy-first, performance-optimized solutions\n  Team: Passionate developers and AI enthusiasts',
    contact: '📬 Let\'s Connect:\n  Email: hello@naturequest.dev\n  GitHub: github.com/NatureQuest\n  LinkedIn: linkedin.com/company/naturequest\n  Twitter: @NatureQuestDev',
    github: '🔗 Opening GitHub... github.com/NatureQuest',
    linkedin: '💼 Opening LinkedIn... linkedin.com/company/naturequest',
    blog: '📝 Latest Posts:\n  • Building Multi-Agent AI Systems\n  • Cost Optimization in Production AI\n  • Real-time Multiplayer at Scale\n  • Privacy-First Analytics',
    metrics: '📊 Live Stats:\n  Users: 10,000+\n  API Calls: 1M+\n  Uptime: 99.9%\n  Response: <50ms',
    roadmap: '🗺️ Coming Soon:\n  • QuizMentor: Multiplayer battles\n  • DevMentor: Cloud sync\n  • Harvest.ai: Enterprise features\n  • Omni.ai: Plugin marketplace',
    whoami: '👨‍💻 Senior Full-Stack Developer\n  Specializing in AI/ML, distributed systems\n  Building at the intersection of AI and DX',
    neofetch: '🖥️ NatureQuest OS\n  ================\n  OS: Production v2.0\n  Uptime: 2 years\n  Packages: 4 (production)\n  Shell: zsh\n  DE: React\n  Terminal: portfolio\n  CPU: Multi-core AI\n  Memory: Unlimited'
  };

  // Animated typing text
  const [typingText, setTypingText] = useState('');
  const fullText = "Transforming ideas into intelligent, scalable solutions";
  
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
  const projects = [
    {
      id: 'quizmentor',
      title: 'QuizMentor',
      tagline: '🎮 Gamified Learning Platform',
      description: 'Adaptive quiz platform with 60+ animations, psychological engagement patterns, and real-time multiplayer',
      differentiation: [
        'Self-hosted Supabase analytics (no third-party tracking)',
        'Bloom\'s Taxonomy validation for question quality',
        'Dark pattern psychology for ethical engagement',
        'Zero-config A/B testing system'
      ],
      status: 'Production',
      metrics: {
        users: '10K+',
        questions: '50K+',
        retention: '85%'
      },
      tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'WebSockets'],
      live: 'https://quizmentor.app',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'harvest',
      title: 'Harvest.ai',
      tagline: '🌾 Content Intelligence Platform',
      description: 'Multi-agent AI system that ethically transforms any knowledge source into structured content',
      differentiation: [
        'Legal compliance layer (robots.txt, rate limiting)',
        'Multi-agent validation pipeline',
        'Local AI support with Ollama',
        'Cost-optimized routing between LLMs'
      ],
      status: 'Beta',
      metrics: {
        processed: '1M+ tokens',
        accuracy: '98.5%',
        saved: '$50K+'
      },
      tech: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'Anthropic', 'Docker'],
      icon: <Brain className="w-6 h-6" />,
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 'omni',
      title: 'Omni.ai',
      tagline: '🔌 Universal AI Coding Assistant',
      description: 'VS Code extension providing one interface for all AI providers with smart routing',
      differentiation: [
        'Hot-swapping between providers without context loss',
        'Automatic provider selection based on task',
        'Local model support for privacy',
        'Cost optimization engine'
      ],
      status: 'Active Development',
      metrics: {
        providers: '10+',
        tests: '217',
        coverage: '93%'
      },
      tech: ['TypeScript', 'VS Code API', 'React', 'Node.js', 'WebAssembly'],
      icon: <Bot className="w-6 h-6" />,
      color: 'from-orange-600 to-red-600'
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100 overflow-x-hidden">
      <ParticlesBackground />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Custom Cursor Effect */}
      {mousePosition.x > 0 && (
        <motion.div
          className="fixed w-6 h-6 bg-green-400/20 rounded-full pointer-events-none z-50"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          style={{
            filter: 'blur(12px)',
            WebkitFilter: 'blur(12px)',
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
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-full border border-green-600/30"
                >
                  <Sparkles className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Building the future of developer tools</span>
                </motion.div>
                
                <div className="space-y-6">
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="bg-gradient-to-r from-white via-green-200 to-teal-200 bg-clip-text text-transparent">
                      NatureQuest
                    </span>
                  </motion.h1>
                  
                  <motion.div 
                    className="text-xl md:text-2xl text-gray-400 font-light h-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {typingText}
                    <motion.span 
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      |
                    </motion.span>
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Creating AI-powered developer tools that prioritize privacy, performance, and developer experience.
                  From gamified learning to intelligent content transformation.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.button 
                    onClick={() => setActiveSection('projects')}
                    className="group px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl font-medium shadow-xl shadow-green-500/25 hover:shadow-2xl hover:shadow-green-500/40 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2">
                      Explore Projects
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                  <motion.button 
                    onClick={() => setActiveSection('roadmap')}
                    className="px-8 py-4 bg-gray-900 rounded-xl font-medium border border-gray-800 hover:border-gray-700 hover:bg-gray-850 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Roadmaps
                  </motion.button>
                </motion.div>
                
                {/* Interactive Terminal */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="max-w-2xl mx-auto mt-16"
                >
                  <InteractiveTerminal commands={terminalCommands} />
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
        
        {/* Projects Section with Differentiation */}
        {activeSection === 'projects' && (
          <motion.section
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Production Projects
                </h2>
                <p className="text-gray-400">Real products solving real problems</p>
              </motion.div>
              
              <div className="space-y-8">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <Card3D className="group">
                      <div className="relative bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                        
                        <div className="relative p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <motion.div 
                                className={`p-3 rounded-xl bg-gradient-to-br ${project.color}`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                {project.icon}
                              </motion.div>
                              <div>
                                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                <p className="text-gray-400">{project.tagline}</p>
                              </div>
                            </div>
                            <span className={`px-4 py-2 text-xs rounded-full font-medium ${
                              project.status === 'Production' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : project.status === 'Beta'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          
                          <p className="text-gray-300 mb-6 text-lg">{project.description}</p>
                          
                          {/* Key Differentiators */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-400 mb-3">KEY DIFFERENTIATORS</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {project.differentiation.map((item, i) => (
                                <motion.div 
                                  key={i}
                                  className="flex items-start gap-2"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.2 + i * 0.1 }}
                                >
                                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                  <span className="text-sm text-gray-300">{item}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Metrics */}
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            {Object.entries(project.metrics).map(([key, value], i) => (
                              <motion.div 
                                key={key} 
                                className="bg-gray-800/50 rounded-lg p-4 text-center"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(31, 41, 55, 0.8)' }}
                              >
                                <div className="text-2xl font-bold text-white">{value}</div>
                                <div className="text-xs text-gray-400 capitalize">{key}</div>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map((tech, i) => (
                              <motion.span 
                                key={tech}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.2 + i * 0.05 }}
                                className="px-3 py-1 text-xs bg-gray-800 rounded-full border border-gray-700"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                          
                          {/* Action Button */}
                          {project.live && (
                            <motion.a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg font-medium hover:shadow-xl hover:shadow-green-500/25 transition-all"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Live Demo
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </Card3D>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
        
        {/* Roadmap Section */}
        {activeSection === 'roadmap' && (
          <motion.section
            key="roadmap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h2 className="text-4xl font-bold mb-4">Product Roadmaps</h2>
                <p className="text-gray-400">See what we're building next</p>
              </motion.div>
              
              {/* Project Selector */}
              <div className="flex justify-center gap-4 mb-12">
                {projects.map((project) => (
                  <motion.button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      selectedProject === project.id
                        ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg shadow-green-500/25'
                        : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {project.title}
                  </motion.button>
                ))}
              </div>
              
              {/* Roadmap Timeline */}
              <ProjectRoadmap project={selectedProject} />
            </div>
          </motion.section>
        )}
        
        {/* Metrics Section */}
        {activeSection === 'metrics' && (
          <motion.section
            key="metrics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h2 className="text-4xl font-bold mb-4">Live Metrics</h2>
                <p className="text-gray-400">Real-time performance across all products</p>
              </motion.div>
              
              <MetricsDashboard />
              
              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 bg-gray-900 rounded-xl border border-gray-800 p-6"
              >
                <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { icon: <GitCommit className="w-4 h-4" />, text: 'Deployed QuizMentor v2.1.0 with multiplayer support', time: '2 hours ago', color: 'text-green-400' },
                    { icon: <Brain className="w-4 h-4" />, text: 'Harvest.ai processed 100k tokens with 99.2% accuracy', time: '4 hours ago', color: 'text-blue-400' },
                    { icon: <Bot className="w-4 h-4" />, text: 'Omni.ai added support for Mistral models', time: '6 hours ago', color: 'text-purple-400' },
                    { icon: <Users className="w-4 h-4" />, text: 'QuizMentor reached 10,000 active users', time: '1 day ago', color: 'text-yellow-400' }
                  ].map((activity, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div className={`p-2 rounded-lg bg-gray-800 ${activity.color}`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300">{activity.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
        
        {/* Skills Section */}
        {activeSection === 'skills' && (
          <motion.section
            key="skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h2 className="text-4xl font-bold mb-4">Technology Stack</h2>
                <p className="text-gray-400">Modern tools for modern problems</p>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'TypeScript', icon: <Braces className="w-8 h-8" />, level: 95, category: 'Language' },
                  { name: 'Python', icon: <Code2 className="w-8 h-8" />, level: 90, category: 'Language' },
                  { name: 'React', icon: <Atom className="w-8 h-8" />, level: 95, category: 'Frontend' },
                  { name: 'Next.js', icon: <Layers3 className="w-8 h-8" />, level: 90, category: 'Frontend' },
                  { name: 'Node.js', icon: <Server className="w-8 h-8" />, level: 90, category: 'Backend' },
                  { name: 'FastAPI', icon: <Zap className="w-8 h-8" />, level: 85, category: 'Backend' },
                  { name: 'LangChain', icon: <Brain className="w-8 h-8" />, level: 90, category: 'AI/ML' },
                  { name: 'Docker', icon: <Package className="w-8 h-8" />, level: 90, category: 'DevOps' },
                  { name: 'Kubernetes', icon: <Boxes className="w-8 h-8" />, level: 75, category: 'DevOps' },
                  { name: 'PostgreSQL', icon: <Database className="w-8 h-8" />, level: 85, category: 'Database' },
                  { name: 'Redis', icon: <Activity className="w-8 h-8" />, level: 80, category: 'Database' },
                  { name: 'AWS', icon: <Cloud className="w-8 h-8" />, level: 85, category: 'Cloud' }
                ].map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative bg-gray-900 rounded-xl p-6 border border-gray-800 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex flex-col items-center space-y-4">
                      <div className="text-gray-400 group-hover:text-green-400 transition-colors">
                        {skill.icon}
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-white">{skill.name}</div>
                        <div className="text-xs text-gray-500">{skill.category}</div>
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Proficiency</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                            className="h-full bg-gradient-to-r from-green-600 to-teal-600"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
            <div className="max-w-2xl mx-auto w-full">
              <motion.div 
                className="text-center mb-12"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h2 className="text-4xl font-bold mb-4">Let's Build Together</h2>
                <p className="text-gray-400">Always open to interesting projects and collaborations</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-900 rounded-2xl border border-gray-800 p-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-6">
                  {[
                    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'hello@naturequest.dev', href: 'mailto:hello@naturequest.dev' },
                    { icon: <Github className="w-5 h-5" />, label: 'GitHub', value: 'github.com/NatureQuest', href: 'https://github.com/NatureQuest' },
                    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', value: 'linkedin.com/company/naturequest', href: 'https://linkedin.com/company/naturequest' },
                    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', value: '@NatureQuestDev', href: 'https://twitter.com/NatureQuestDev' }
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
                      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
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
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
