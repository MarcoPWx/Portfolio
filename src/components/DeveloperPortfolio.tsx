'use client';

import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Developer-focused navigation
type SectionId = 'home' | 'projects' | 'skills' | 'playground' | 'contact';
function Navigation({
  activeSection,
  setActiveSection,
}: {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
}) {
  const sections: { id: SectionId; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'playground', label: 'Playground', icon: FlaskConical },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="w-5 h-5 text-green-400" />
            <span className="font-mono text-sm">
              <span className="text-gray-500">~/</span>
              <span className="text-green-400">humberto</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === section.id ? 'text-green-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <a
            href="https://github.com/naturequest"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}

// Terminal-style code display
function CodeBlock({
  code,
  language = 'typescript',
  fileName,
}: {
  code: string;
  language?: string;
  fileName: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-950 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <FileCode className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-400 font-mono">{fileName}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {copied ? 'copied!' : 'copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-gray-300">{code}</code>
      </pre>
    </div>
  );
}

export function DeveloperPortfolio() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [activeProject, setActiveProject] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const fullText = "Hi, I'm Humberto. I build AI-powered developer tools.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTerminalText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      title: 'QuizMentor',
      description: 'Mobile learning app with psychological gamification patterns',
      tech: ['React Native', 'TypeScript', 'Supabase', 'Expo'],
      icon: Gamepad2,
      color: 'text-purple-400',
      highlights: [
        'Built a gamification system with XP, streaks, and achievements',
        'Implemented spaced repetition algorithm for optimal learning',
        'Created 60+ smooth animations with Reanimated 3',
        'Designed psychological hooks for 92% retention rate',
      ],
      github: 'https://github.com/naturequest/quizmentor',
      demo: 'https://quizmentor.app',
      code: `// Gamification engine with psychological hooks
export class GamificationEngine {
  private readonly patterns = {
    streakWarningHours: 20,
    xpDecayDays: 7,
    variableRewards: [1, 1, 1.5, 2, 3], // Slot machine psychology
  };

  async awardXP(baseXP: number): Promise<XPResult> {
    const multiplier = this.calculateMultiplier();
    const bonuses = this.getBonuses();
    
    // Variable reward for dopamine hit
    if (Math.random() < 0.1) {
      multiplier *= this.patterns.variableRewards[
        Math.floor(Math.random() * this.patterns.variableRewards.length)
      ];
      await this.triggerCelebration('jackpot');
    }
    
    return { xp: baseXP * multiplier, bonuses };
  }
}`,
    },
    {
      title: 'Chameleon',
      description: 'Content transformation pipeline with multi-agent AI validation',
      tech: ['Python', 'FastAPI', 'LangChain', 'Docker'],
      icon: FileSearch,
      color: 'text-green-400',
      highlights: [
        'Designed multi-agent AI system for content validation',
        'Built legal compliance engine respecting robots.txt',
        'Implemented semantic deduplication with FAISS',
        'Created pipeline supporting 20+ output formats',
      ],
      github: 'https://github.com/naturequest/harvest',
      code: `# Multi-agent content validation system
class ContentValidator:
    def __init__(self):
        self.agents = [
            ConceptExtractor(),
            ContentGenerator(),
            QualityValidator()
        ]
    
    async def process(self, content: str, format: OutputFormat):
        # Extract key concepts
        concepts = await self.agents[0].extract(content)
        
        # Generate output with quality threshold
        output = await self.agents[1].generate(
            concepts, format, quality_threshold=0.95
        )
        
        # Validate accuracy against original
        validation = await self.agents[2].validate(
            original=content,
            generated=output,
            require_sources=True
        )
        
        if validation.score < 0.95:
            output = await self.retry_with_fallback(content, format)
        
        return output`,
    },
    {
      title: 'NatureQuest Auth',
      description: 'Unified authentication system with cross-domain SSO',
      tech: ['TypeScript', 'React', 'Supabase', 'JWT'],
      icon: KeyRound,
      color: 'text-blue-400',
      highlights: [
        'Implemented secure cross-domain SSO with JWT',
        'Built subscription tier management with RLS',
        'Created TypeScript SDK with React hooks',
        'Added 2FA, rate limiting, and CSRF protection',
      ],
      github: 'https://github.com/naturequest/auth',
      npm: 'https://npmjs.com/package/naturequest-auth',
      code: `// Cross-domain SSO implementation
export const useAuthStore = create<AuthState>()(
  persist((set, get) => ({
    async login(email: string, password: string) {
      const { data, error } = await supabase.auth.signIn({
        email, password
      });
      
      // Set secure cross-domain cookie
      document.cookie = \`nq_session=\${data.session.access_token}; \` +
        \`domain=.naturequest.dev; secure; samesite=lax\`;
      
      // Track security event
      await this.logSecurityEvent('login', {
        ip: await this.getIpAddress(),
        userAgent: navigator.userAgent
      });
      
      set({ user: data.user, session: data.session });
    },
    
    hasAccessTo(productId: string) {
      const { subscription } = get();
      const tierAccess = {
        free: ['quiz'],
        pro: ['quiz', 'harvest', 'omni'],
        team: ['all']
      };
      
      return tierAccess[subscription.tier].includes(productId);
    }
  }))
)`,
    },
    {
      title: 'Omni.ai',
      description: 'VS Code extension that unifies all AI providers',
      tech: ['TypeScript', 'VS Code API', 'Node.js'],
      icon: Bot,
      color: 'text-orange-400',
      highlights: [
        'Building smart routing to select optimal AI provider',
        'Implementing hot-swapping between models without context loss',
        'Creating cost tracking and optimization features',
        'Supporting 12+ AI providers in unified interface',
      ],
      github: 'https://github.com/naturequest/omni',
      code: `// Smart AI provider routing
class SmartRouter {
  async route(request: AIRequest): Promise<AIProvider> {
    const complexity = await this.analyzeComplexity(request);
    
    // Score each provider
    const scores = await Promise.all(
      this.providers.map(async provider => ({
        provider,
        taskMatch: this.calculateTaskMatch(provider, request),
        performance: await this.getHistoricalPerformance(provider),
        cost: this.calculateCost(provider, request.tokens),
        localPriority: provider.isLocal ? 1.5 : 1.0,
        total: 0 // calculated below
      }))
    );
    
    // Weight the scores
    scores.forEach(s => {
      s.total = 
        s.taskMatch * 0.4 +
        s.performance * 0.3 +
        (1 / s.cost) * 0.2 +
        s.localPriority * 0.1;
    });
    
    return scores.sort((a, b) => b.total - a.total)[0].provider;
  }
}`,
    },
  ];

  const skills = {
    languages: ['TypeScript', 'Python', 'JavaScript', 'SQL', 'Rust'],
    frontend: ['React', 'React Native', 'Next.js', 'Tailwind', 'Framer Motion'],
    backend: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    ai: ['LangChain', 'OpenAI', 'Claude', 'Ollama', 'Vector DBs'],
    tools: ['Git', 'VS Code', 'Vim', 'Linux', 'AWS'],
  };

  const currentProject = projects[activeProject];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Home Section */}
      {activeSection === 'home' && (
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl w-full">
            {/* Terminal-style intro */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-xs text-gray-500 ml-2">~/portfolio</span>
              </div>
              <div className="font-mono">
                <div className="text-gray-500 mb-2">$ whoami</div>
                <div className="text-green-400 mb-4">
                  {terminalText}
                  <span className="animate-pulse">_</span>
                </div>
                <div className="text-gray-500 mb-2">$ ls projects/</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <span className="text-blue-400">QuizMentor/</span>
                  <span className="text-blue-400">Chameleon/</span>
                  <span className="text-blue-400">NatureQuest-Auth/</span>
                  <span className="text-blue-400">Omni.ai/</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  Hey, I'm <span className="text-green-400">Humberto</span> 👋
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  I'm a full-stack developer who loves building AI-powered tools that make
                  developers' lives easier. Currently working on some cool stuff with pattern
                  recognition, psychological gamification, and multi-agent AI systems.
                </p>
                <p className="text-gray-400 mb-8">
                  I believe in building things that are both technically interesting and actually
                  useful. Check out my projects below to see what I've been working on.
                </p>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveSection('projects')}
                  className="px-6 py-3 bg-green-400 text-gray-900 rounded-lg font-medium hover:bg-green-300 transition-colors"
                >
                  View Projects
                </button>
                <a
                  href="https://github.com/naturequest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="/resume.pdf"
                  className="px-6 py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-900 transition-colors inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </a>
              </div>

              {/* Currently Learning */}
              <div className="pt-8 border-t border-gray-800">
                <h3 className="text-sm font-mono text-gray-500 mb-3">Currently exploring:</h3>
                <div className="flex flex-wrap gap-2">
                  {['WASM', 'Rust', 'Local LLMs', 'Vector Embeddings', 'Edge Computing'].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-900 text-gray-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {activeSection === 'projects' && (
        <section className="min-h-screen pt-20 px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Projects</h2>
              <p className="text-gray-400">
                Some cool stuff I've built. Click on a project to see more details and code samples.
              </p>
            </div>

            {/* Project Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveProject(idx)}
                  className={`bg-gray-900 rounded-lg p-6 border cursor-pointer transition-all ${
                    activeProject === idx
                      ? 'border-green-400 shadow-lg shadow-green-400/10'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <project.icon className={`w-8 h-8 ${project.color}`} />
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Selected Project Details */}
            {currentProject && (
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-2xl font-bold mb-4">
                    {currentProject.title} - Technical Details
                  </h3>
                  <ul className="space-y-2">
                    {currentProject.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6">
                  <h4 className="text-sm font-mono text-gray-500 mb-4">// Code Sample</h4>
                  <CodeBlock
                    fileName={`${currentProject.title.toLowerCase()}.${
                      currentProject.tech[0] === 'Python' ? 'py' : 'ts'
                    }`}
                    code={currentProject.code}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {activeSection === 'skills' && (
        <section className="min-h-screen pt-20 px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Skills & Tech Stack</h2>
              <p className="text-gray-400">
                Technologies I work with regularly. I love learning new things and picking the right
                tool for the job.
              </p>
            </div>

            <div className="space-y-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-lg font-mono text-green-400 mb-4 capitalize">
                    {category === 'ai' ? 'AI/ML' : category}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {items.map((skill) => (
                      <div
                        key={skill}
                        className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800 hover:border-gray-700 transition-all"
                      >
                        <span className="text-sm text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Fun Stats */}
            <div className="mt-16 p-6 bg-gray-900 rounded-lg border border-gray-800">
              <h3 className="text-lg font-mono text-green-400 mb-6">// Fun Stats</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">1,337</div>
                  <div className="text-sm text-gray-400">Git commits this year</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">42</div>
                  <div className="text-sm text-gray-400">Cups of coffee per week</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">∞</div>
                  <div className="text-sm text-gray-400">Stack Overflow visits</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Playground Section */}
      {activeSection === 'playground' && (
        <section className="min-h-screen pt-20 px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Playground</h2>
              <p className="text-gray-400">
                Experimental stuff and things I'm tinkering with. Not production ready, but fun to
                explore!
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Pattern-Based ML Engine',
                  desc: 'Teaching AI to learn from YOUR code patterns, not generic training data',
                  status: 'experimenting',
                },
                {
                  title: 'Local LLM Orchestration',
                  desc: 'Running multiple Ollama models locally with smart routing',
                  status: 'proof of concept',
                },
                {
                  title: 'WebAssembly Game Engine',
                  desc: 'Building a game engine in Rust that compiles to WASM',
                  status: 'learning',
                },
                {
                  title: 'Psychological Engagement Patterns',
                  desc: 'Ethical implementation of engagement mechanics for learning apps',
                  status: 'researching',
                },
              ].map((experiment, idx) => (
                <div
                  key={idx}
                  className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold">{experiment.title}</h3>
                    <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
                      {experiment.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{experiment.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <section className="min-h-screen pt-20 px-4 pb-16 flex items-center">
          <div className="max-w-2xl mx-auto w-full">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h2 className="text-3xl font-bold mb-4">Let's Connect!</h2>
              <p className="text-gray-400 mb-8">
                I'm always interested in working on cool projects or just chatting about tech. Feel
                free to reach out!
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:humberto@example.com"
                  className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Mail className="w-5 h-5 text-green-400" />
                  <span>humberto@example.com</span>
                </a>

                <a
                  href="https://github.com/naturequest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github className="w-5 h-5 text-green-400" />
                  <span>github.com/naturequest</span>
                </a>

                <a
                  href="https://linkedin.com/in/humberto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-green-400" />
                  <span>linkedin.com/in/humberto</span>
                </a>

                <a
                  href="https://twitter.com/humberto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-green-400" />
                  <span>@humberto</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
