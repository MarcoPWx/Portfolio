'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  MapPin,
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
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Enhanced Navigation
type SectionId = 'home' | 'projects' | 'skills' | 'experience' | 'code' | 'blog' | 'contact';
function Navigation({
  activeSection,
  setActiveSection,
}: {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
}) {
  const sections: { id: SectionId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Tech Stack' },
    { id: 'experience', label: 'Experience' },
    { id: 'code', label: 'Live Code' },
    { id: 'blog', label: 'Writing' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-mono text-sm text-gray-300">
              humberto<span className="text-gray-600">@</span>
              <span className="text-green-400">dev</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'text-green-400 border-b-2 border-green-400 pb-1'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/hmachuca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Interactive Code Display with Syntax Highlighting
type CodeFile = {
  name: string;
  language: 'typescript' | 'javascript' | 'python' | string;
  code: string;
};
function LiveCodeExample({
  title,
  files,
  defaultFile = 0,
}: {
  title: string;
  files: CodeFile[];
  defaultFile?: number;
}) {
  const [activeFile, setActiveFile] = useState(defaultFile);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeFile].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting
  const highlightCode = (code: string, language: string) => {
    if (language === 'typescript' || language === 'javascript') {
      return code
        .replace(
          /\b(const|let|var|function|class|interface|type|export|import|from|async|await|return|if|else|for|while|try|catch|throw|new|this|extends|implements)\b/g,
          '<span class="text-purple-400">$1</span>',
        )
        .replace(
          /\b(string|number|boolean|void|any|null|undefined|true|false)\b/g,
          '<span class="text-blue-400">$1</span>',
        )
        .replace(/('.*?'|\".*?\"|`.*?`)/g, '<span class="text-green-400">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>');
    } else if (language === 'python') {
      return code
        .replace(
          /\b(def|class|import|from|as|return|if|else|elif|for|while|try|except|with|async|await|lambda|yield)\b/g,
          '<span class="text-purple-400">$1</span>',
        )
        .replace(
          /\b(str|int|float|bool|list|dict|tuple|set|None|True|False)\b/g,
          '<span class="text-blue-400">$1</span>',
        )
        .replace(/('.*?'|\".*?\"|\"\"\"[\s\S]*?\"\"\")/g, '<span class="text-green-400">$1</span>')
        .replace(/(#.*$)/gm, '<span class="text-gray-500">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>');
    }
    return code;
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-950 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-500">{title}</span>
          <div className="flex space-x-1">
            {files.map((file, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFile(idx)}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  activeFile === idx
                    ? 'bg-gray-800 text-green-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {file.name}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto max-h-96">
        <pre className="text-sm">
          <code
            dangerouslySetInnerHTML={{
              __html: highlightCode(files[activeFile].code, files[activeFile].language),
            }}
            className="font-mono"
          />
        </pre>
      </div>
    </div>
  );
}

export function ComprehensivePortfolio() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [activeProject, setActiveProject] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [typingText, setTypingText] = useState('');
  const fullText = 'Building intelligent solutions that scale...';

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

  // Project data
  const projects = [
    {
      id: 'quizmentor',
      title: 'QuizMentor',
      tagline: 'Enterprise Learning Platform',
      description: 'Advanced gamified assessment system with real-time multiplayer capabilities',
      status: 'Production',
      metrics: {
        users: '10,000+',
        questions: '50,000+',
        accuracy: '99.9%',
      },
      tech: ['React', 'TypeScript', 'Next.js', 'PostgreSQL', 'Redis', 'WebSockets'],
      features: [
        'Real-time multiplayer competitions',
        'Advanced gamification mechanics',
        'Privacy-first analytics',
        'AI-powered question generation',
      ],
      github: 'https://github.com/hmachuca/quizmentor',
      live: 'https://quizmentor.io',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: 'harvest',
      title: 'Chameleon',
      tagline: 'Intelligent Content Infrastructure',
      description: 'Multi-agent AI system for automated content transformation and validation',
      status: 'Beta',
      metrics: {
        processed: '1M+ tokens',
        accuracy: '98.5%',
        saved: '$50K+',
      },
      tech: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'Anthropic', 'Docker'],
      features: [
        'Multi-agent validation pipeline',
        'Legal compliance automation',
        'Cost-optimized AI routing',
        'Enterprise-grade security',
      ],
      github: 'https://github.com/hmachuca/harvest-ai',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-green-600 to-teal-600',
    },
    {
      id: 'omni',
      title: 'Omni.ai',
      tagline: 'Universal AI Assistant',
      description: 'Browser extension for seamless AI integration across all platforms',
      status: 'Active Development',
      metrics: {
        models: '10+',
        contexts: 'Unlimited',
        speed: '2x faster',
      },
      tech: ['TypeScript', 'Chrome APIs', 'React', 'WebAssembly', 'IndexedDB'],
      features: [
        'Smart model routing',
        'Context preservation',
        'Cost optimization engine',
        'Privacy-focused design',
      ],
      github: 'https://github.com/hmachuca/omni-ai',
      icon: <Bot className="w-6 h-6" />,
      color: 'from-orange-600 to-red-600',
    },
  ];

  // Tech stack categories
  const techStack = {
    Languages: [
      { name: 'TypeScript', level: 95, icon: <Braces className="w-4 h-4" /> },
      { name: 'Python', level: 90, icon: <Code2 className="w-4 h-4" /> },
      { name: 'JavaScript', level: 95, icon: <FileCode className="w-4 h-4" /> },
      { name: 'Go', level: 75, icon: <Binary className="w-4 h-4" /> },
      { name: 'Rust', level: 60, icon: <Cpu className="w-4 h-4" /> },
    ],
    Frontend: [
      { name: 'React', level: 95, icon: <Atom className="w-4 h-4" /> },
      { name: 'Next.js', level: 90, icon: <Layers className="w-4 h-4" /> },
      { name: 'Vue.js', level: 80, icon: <Sparkles className="w-4 h-4" /> },
      { name: 'Tailwind', level: 95, icon: <Palette className="w-4 h-4" /> },
    ],
    Backend: [
      { name: 'Node.js', level: 90, icon: <Server className="w-4 h-4" /> },
      { name: 'FastAPI', level: 85, icon: <Zap className="w-4 h-4" /> },
      { name: 'Django', level: 80, icon: <Database className="w-4 h-4" /> },
      { name: 'GraphQL', level: 85, icon: <Network className="w-4 h-4" /> },
    ],
    'AI/ML': [
      { name: 'LangChain', level: 90, icon: <Brain className="w-4 h-4" /> },
      { name: 'OpenAI', level: 95, icon: <Sparkle className="w-4 h-4" /> },
      { name: 'TensorFlow', level: 70, icon: <CircuitBoard className="w-4 h-4" /> },
      { name: 'Anthropic', level: 85, icon: <Bot className="w-4 h-4" /> },
    ],
    DevOps: [
      { name: 'Docker', level: 90, icon: <Package className="w-4 h-4" /> },
      { name: 'K8s', level: 75, icon: <Boxes className="w-4 h-4" /> },
      { name: 'AWS', level: 85, icon: <Cloud className="w-4 h-4" /> },
      { name: 'CI/CD', level: 90, icon: <GitBranch className="w-4 h-4" /> },
    ],
  };

  // Blog posts
  const blogPosts = [
    {
      title: 'Building Multi-Agent AI Systems That Actually Work',
      excerpt: 'Lessons learned from deploying production AI agents at scale...',
      date: '2024-01-15',
      readTime: '8 min',
      tags: ['AI', 'Architecture', 'Production'],
      link: '/blog/multi-agent-systems',
    },
    {
      title: 'The Cost of AI: Optimizing LLM Usage in Production',
      excerpt: 'How we reduced our AI costs by 70% without sacrificing quality...',
      date: '2024-01-10',
      readTime: '6 min',
      tags: ['AI', 'Optimization', 'Cost'],
      link: '/blog/ai-cost-optimization',
    },
    {
      title: 'Real-time Multiplayer at Scale with WebSockets',
      excerpt: 'Architecture patterns for building responsive multiplayer experiences...',
      date: '2024-01-05',
      readTime: '10 min',
      tags: ['WebSockets', 'Architecture', 'Real-time'],
      link: '/blog/websockets-scale',
    },
  ];

  // Code examples
  const codeExamples = [
    {
      name: 'auth.middleware.ts',
      language: 'typescript',
      code: `// Enterprise-grade JWT validation middleware
export async function validateAuth(req: Request): Promise<AuthResult> {
  const token = extractToken(req.headers.authorization);
  
  if (!token) {
    throw new UnauthorizedError('No token provided');
  }
  
  try {
    // Verify JWT with rotating keys
    const decoded = await verifyJWT(token, {
      algorithms: ['RS256'],
      keyRotation: true,
      cache: redis
    });
    
    // Check rate limits
    await rateLimiter.check(decoded.userId, {
      window: '1m',
      max: 100
    });
    
    // Validate permissions
    const permissions = await getPermissions(decoded.userId);
    
    return {
      userId: decoded.userId,
      tier: decoded.tier,
      permissions,
      sessionId: decoded.sessionId
    };
  } catch (error) {
    logger.error('Auth validation failed', { error, token });
    throw new UnauthorizedError('Invalid token');
  }
}`,
    },
    {
      name: 'agent.orchestrator.py',
      language: 'python',
      code: `# Multi-agent orchestration with validation pipeline
class AgentOrchestrator:
    def __init__(self, agents: List[Agent], validator: Validator):
        self.agents = agents
        self.validator = validator
        self.router = SmartRouter()
        
    async def process(self, task: Task) -> Result:
        """Process task through multi-agent pipeline"""
        
        # Route to optimal agent based on task
        agent = self.router.select_agent(task, self.agents)
        
        # Execute with retries and fallbacks
        result = await self.execute_with_fallback(
            agent=agent,
            task=task,
            max_retries=3
        )
        
        # Multi-layer validation
        validation = await self.validator.validate(
            result=result,
            rules=task.validation_rules,
            confidence_threshold=0.95
        )
        
        if not validation.passed:
            # Trigger human-in-the-loop if needed
            result = await self.human_review(result, validation)
        
        return result`,
    },
    {
      name: 'realtime.socket.ts',
      language: 'typescript',
      code: `// WebSocket connection manager for real-time features
class RealtimeManager {
  private connections = new Map<string, WebSocket>();
  private rooms = new Map<string, Set<string>>();
  
  async handleConnection(ws: WebSocket, userId: string) {
    // Authenticate and establish connection
    const auth = await this.authenticate(ws, userId);
    
    if (!auth.valid) {
      ws.close(1008, 'Authentication failed');
      return;
    }
    
    // Store connection with automatic cleanup
    this.connections.set(userId, ws);
    
    // Setup heartbeat for connection health
    const heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      } else {
        this.cleanup(userId);
        clearInterval(heartbeat);
      }
    }, 30000);
    
    // Handle incoming messages
    ws.on('message', async (data) => {
      const message = JSON.parse(data.toString());
      await this.routeMessage(userId, message);
    });
  }
}`,
    },
  ];

  const currentProject = projects[activeProject];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero Section */}
      <AnimatePresence mode="wait">
        {activeSection === 'home' && (
          <motion.section
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex items-center justify-center px-4 pt-16"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full border border-gray-800"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-400">Available for opportunities</span>
                </motion.div>

                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-bold">
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      Humberto Machuca
                    </span>
                  </h1>

                  <div className="text-xl md:text-2xl text-gray-400 font-light h-8">
                    {typingText}
                    <span className="animate-pulse">|</span>
                  </div>
                </div>

                <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
                  Senior Full-Stack Engineer specializing in AI-powered applications, distributed
                  systems, and modern web architecture. Transforming complex problems into elegant,
                  scalable solutions.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setActiveSection('projects')}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg font-medium hover:shadow-xl hover:shadow-green-500/20 transition-all"
                  >
                    View Projects
                  </button>
                  <button
                    onClick={() => setActiveSection('contact')}
                    className="px-6 py-3 bg-gray-900 rounded-lg font-medium border border-gray-800 hover:border-gray-700 transition-all"
                  >
                    Get in Touch
                  </button>
                </div>

                <div className="flex justify-center gap-6 pt-8">
                  <a
                    href="https://github.com/hmachuca"
                    className="text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/hmachuca"
                    className="text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:contact@hmachuca.dev"
                    className="text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <motion.section
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
                <p className="text-gray-400">Production-grade systems serving thousands of users</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                    />

                    <div className="relative p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${project.color}`}>
                            {project.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            <p className="text-sm text-gray-400">{project.tagline}</p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            project.status === 'Production'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : project.status === 'Beta'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <p className="text-gray-400 mb-6">{project.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-2xl font-bold text-white">{value}</div>
                            <div className="text-xs text-gray-500">{key}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs bg-gray-800 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            View Code
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Technical Expertise</h2>
                <p className="text-gray-400">Years of experience across the modern tech stack</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(techStack).map(([category, skills]) => (
                  <div key={category} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                    <h3 className="text-lg font-bold mb-4 text-gray-300">{category}</h3>
                    <div className="space-y-4">
                      {skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {skill.icon}
                              <span className="text-sm">{skill.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{skill.level}%</span>
                          </div>
                          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: '0%' }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-green-600 to-teal-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Code Examples Section */}
        {activeSection === 'code' && (
          <motion.section
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Live Code Examples</h2>
                <p className="text-gray-400">Real production code from my projects</p>
              </div>

              <div className="space-y-8">
                <LiveCodeExample title="Production Code Samples" files={codeExamples} />

                <div className="bg-gray-900 rounded-xl border border-gray-800 p-8">
                  <h3 className="text-xl font-bold mb-4">Architecture Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                        <div>
                          <div className="font-medium">Type-Safe APIs</div>
                          <div className="text-sm text-gray-400">
                            End-to-end type safety with TypeScript and Zod validation
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                        <div>
                          <div className="font-medium">Scalable Architecture</div>
                          <div className="text-sm text-gray-400">
                            Microservices with event-driven communication
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                        <div>
                          <div className="font-medium">Real-time Features</div>
                          <div className="text-sm text-gray-400">
                            WebSocket connections with automatic reconnection
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                        <div>
                          <div className="font-medium">AI Integration</div>
                          <div className="text-sm text-gray-400">
                            Smart routing between multiple LLM providers
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Technical Writing</h2>
                <p className="text-gray-400">Sharing knowledge and lessons learned</p>
              </div>

              <div className="space-y-6">
                {blogPosts.map((post, idx) => (
                  <motion.article
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold hover:text-green-400 transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-gray-600" />
                    </div>

                    <p className="text-gray-400 mb-4">{post.excerpt}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
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
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
                <p className="text-gray-400">Always open to discussing new opportunities</p>
              </div>

              <div className="bg-gray-900 rounded-xl border border-gray-800 p-8">
                <div className="space-y-6">
                  <a
                    href="mailto:contact@hmachuca.dev"
                    className="flex items-center justify-between p-4 bg-gray-950 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-gray-400">contact@hmachuca.dev</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href="https://github.com/hmachuca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gray-950 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium">GitHub</div>
                        <div className="text-sm text-gray-400">@hmachuca</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href="https://linkedin.com/in/hmachuca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gray-950 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium">LinkedIn</div>
                        <div className="text-sm text-gray-400">in/hmachuca</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </a>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-green-600/10 to-teal-600/10 rounded-lg border border-green-600/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-green-400" />
                    <span className="font-medium">Currently Available</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Open to full-time opportunities, consulting engagements, and interesting
                    collaborations. Particularly interested in AI/ML, distributed systems, and
                    developer tools.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <motion.section
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 pt-24 pb-16"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Professional Journey</h2>
                <p className="text-gray-400">Building impactful products across industries</p>
              </div>

              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-gray-800">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-green-400 rounded-full" />
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">Senior Full-Stack Engineer</h3>
                      <span className="text-sm text-green-400">Current</span>
                    </div>
                    <div className="text-gray-400 mb-3">
                      NatureQuest Technologies • 2022 - Present
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-600 mt-1" />
                        <span>
                          Architected and deployed 4 production SaaS products serving 10,000+ users
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-600 mt-1" />
                        <span>
                          Built multi-agent AI infrastructure reducing content processing costs by
                          70%
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-600 mt-1" />
                        <span>
                          Implemented real-time multiplayer system handling 1000+ concurrent
                          connections
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-gray-800">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-600 rounded-full" />
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">Full-Stack Developer</h3>
                    </div>
                    <div className="text-gray-400 mb-3">TechCorp Solutions • 2020 - 2022</div>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-600 mt-1" />
                        <span>Led migration of legacy monolith to microservices architecture</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-600 mt-1" />
                        <span>
                          Reduced API response times by 60% through optimization and caching
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-600 mt-1" />
                        <span>
                          Mentored junior developers and established code review practices
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
