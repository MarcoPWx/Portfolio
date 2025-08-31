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
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import Link from 'next/link';

// Navigation Component with Roadmap
function Navigation({ activeSection, setActiveSection }) {
  const sections = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'technologies', label: 'Tech Stack', icon: Cpu },
    { id: 'about', label: 'About', icon: User },
    { id: 'cv', label: 'Resume', icon: FileText },
    { id: 'blog', label: 'Blog', icon: PenTool },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Humberto Machuca</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {sections.slice(0, 6).map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-1 transition-colors ${
                  activeSection === section.id ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span className="text-sm">{section.label}</span>
              </button>
            ))}
          </div>

          <a
            href="https://github.com/naturequest"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// Enhanced Code editor
function CodeEditor({
  code,
  language = 'javascript',
  title = 'example.js',
  showLineNumbers = true,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code: string) => {
    return code
      .replace(/('.*?'|".*?")/g, '<span class="text-green-400">$1</span>')
      .replace(
        /\b(const|let|var|function|return|if|else|for|while|import|export|default|from|async|await|class|extends|implements)\b/g,
        '<span class="text-purple-400">$1</span>',
      )
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-cyan-400">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
      .replace(/(@\w+)/g, '<span class="text-yellow-400">$1</span>')
      .replace(
        /\b(supabase|AuthProvider|useAuth|useState|useEffect)\b/g,
        '<span class="text-blue-400">$1</span>',
      );
  };

  const lines = code.split('\n');

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
      <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <FileCode className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">{title}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-gray-700 rounded transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="text-gray-600 mr-4 select-none w-8 text-right">{index + 1}</span>
                )}
                <code
                  dangerouslySetInnerHTML={{ __html: highlightCode(line) }}
                  className="flex-1"
                />
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Terminal component
function Terminal({ commands, title = 'Terminal' }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([]);

  useEffect(() => {
    if (currentLine < commands.length) {
      const timer = setTimeout(() => {
        if (currentChar < commands[currentLine].length) {
          setDisplayedCommands((prev) => {
            const newCommands = [...prev];
            newCommands[currentLine] = commands[currentLine].substring(0, currentChar + 1);
            return newCommands;
          });
          setCurrentChar(currentChar + 1);
        } else {
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, commands]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl blur-xl" />
      <div className="relative bg-gray-950 rounded-xl overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">{title}</span>
          </div>
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
        </div>
        <div className="p-4 font-mono text-sm">
          {displayedCommands.map((cmd, index) => (
            <div key={index} className="mb-2">
              <span className="text-green-400">$</span> <span className="text-gray-300">{cmd}</span>
              {index === currentLine && currentChar < commands[index].length && (
                <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Roadmap Timeline Component
function RoadmapTimeline({ project }) {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
      {project.roadmap.map((phase, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative flex items-start mb-8"
        >
          <div
            className={`absolute left-6 w-4 h-4 rounded-full ${
              phase.status === 'completed'
                ? 'bg-green-500'
                : phase.status === 'in-progress'
                  ? 'bg-yellow-500 animate-pulse'
                  : 'bg-gray-600'
            }`}
          ></div>
          <div className="ml-16 flex-1">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{phase.title}</h4>
                <span className="text-sm text-gray-400">{phase.timeline}</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">{phase.description}</p>
              <div className="flex flex-wrap gap-2">
                {phase.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Technology Stack Card
function TechCard({ tech }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all"
    >
      <div className="flex items-center space-x-3 mb-3">
        <div
          className={`w-10 h-10 bg-gradient-to-br ${tech.gradient} rounded-lg flex items-center justify-center`}
        >
          <tech.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-white">{tech.name}</h4>
          <p className="text-xs text-gray-400">{tech.category}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {tech.items.map((item, idx) => (
          <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function UltimatePortfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState('auth');
  const [activeTab, setActiveTab] = useState('code');

  // Complete projects data with real code, technologies, and roadmaps
  const projects = {
    auth: {
      name: 'NatureQuest Auth',
      icon: KeyRound,
      tagline: 'Open-Source Unified Authentication',
      status: 'Live',
      gradient: 'from-indigo-500 to-purple-500',
      description:
        'Complete SSO authentication system with subscription management, cross-domain support, and granular access control. Built for multi-product SaaS ecosystems.',
      features: [
        'Single Sign-On',
        'Subscription Tiers',
        'Cross-Domain Auth',
        'PKCE Flow',
        'Usage Tracking',
        'TypeScript',
      ],
      technologies: {
        frontend: ['React', 'Next.js', 'TypeScript', 'Zustand'],
        backend: ['Supabase', 'PostgreSQL', 'Row Level Security'],
        auth: ['JWT', 'PKCE', 'OAuth 2.0', 'Social Logins'],
        deployment: ['Vercel', 'Cloudflare', 'Docker'],
      },
      metrics: [
        { label: 'Products Supported', value: '5+' },
        { label: 'Auth Methods', value: '8' },
        { label: 'Security Score', value: 'A+' },
        { label: 'Response Time', value: '<50ms' },
      ],
      code: `// NatureQuest Auth - Real Implementation
import { AuthProvider, useAuth, AuthGuard } from 'naturequest-auth';
import { createClient } from '@supabase/supabase-js';

// Configure unified auth for multiple products
export const auth = createAuthConfig({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  domain: '.naturequest.dev', // Cross-domain SSO
  products: [
    { id: 'devmentor', name: 'DevMentor', url: 'https://devmentor.naturequest.dev' },
    { id: 'quizmentor', name: 'QuizMentor', url: 'https://quiz.naturequest.dev' },
    { id: 'harvest', name: 'Harvest.ai', url: 'https://harvest.naturequest.dev' },
    { id: 'omni', name: 'Omni.ai', url: 'https://omni.naturequest.dev', requiredTier: 'pro' }
  ],
  tiers: [
    { id: 'free', name: 'Free', products: ['devmentor', 'quizmentor'], apiCalls: 100 },
    { id: 'pro', name: 'Pro', products: ['all'], apiCalls: 10000 },
    { id: 'team', name: 'Team', products: ['all'], apiCalls: 50000, seats: 5 }
  ]
});

// Protected component with tier-based access
function Dashboard() {
  const { user, subscription, hasAccessTo } = useAuth();
  
  return (
    <AuthGuard requireTier="pro" fallback={<UpgradePrompt />}>
      {hasAccessTo('omni') && <OmniFeatures />}
      <AccountUsage limit={subscription.apiCalls} />
    </AuthGuard>
  );
}`,
      terminal: [
        'npm install naturequest-auth',
        'npx naturequest-auth init',
        'Creating auth configuration...',
        '✓ Supabase tables created',
        '✓ RLS policies configured',
        '✓ Cross-domain cookies enabled',
        '✓ SSO endpoints ready',
        'Auth system initialized successfully!',
      ],
      roadmap: [
        {
          title: 'Phase 1: Core Authentication',
          timeline: 'Q4 2024',
          status: 'completed',
          description: 'Basic auth flow with email/password and social logins',
          features: ['JWT tokens', 'Session management', 'Password reset', 'Social OAuth'],
        },
        {
          title: 'Phase 2: SSO & Multi-Product',
          timeline: 'Q1 2025',
          status: 'in-progress',
          description: 'Cross-domain SSO and unified account dashboard',
          features: ['SSO tokens', 'Product routing', 'Unified dashboard', 'API gateway'],
        },
        {
          title: 'Phase 3: Advanced Features',
          timeline: 'Q2 2025',
          status: 'planned',
          description: 'Enterprise features and advanced security',
          features: ['SAML 2.0', 'MFA/2FA', 'Audit logs', 'GDPR compliance'],
        },
      ],
      github: 'https://github.com/naturequest/auth',
      demo: 'https://auth.naturequest.dev',
      npm: 'https://npmjs.com/package/naturequest-auth',
    },
    harvest: {
      name: 'Harvest.ai',
      icon: FileSearch,
      tagline: 'Content Intelligence Platform',
      status: 'Live',
      gradient: 'from-green-500 to-emerald-500',
      description:
        'Ethically harvests and transforms web content into structured data using AI. Features multi-agent validation, legal compliance, and semantic understanding.',
      features: [
        'Legal Compliance',
        'Multi-Agent AI',
        'Quality Validation',
        'Attribution',
        'Local AI',
        'Rate Limiting',
      ],
      technologies: {
        backend: ['Python', 'FastAPI', 'Celery', 'Redis'],
        ai: ['GPT-4', 'Claude', 'Ollama', 'LangChain'],
        data: ['PostgreSQL', 'Elasticsearch', 'S3'],
        scraping: ['BeautifulSoup', 'Playwright', 'Scrapy'],
      },
      metrics: [
        { label: 'Content Processed', value: '1M+' },
        { label: 'Accuracy', value: '95%' },
        { label: 'Sources', value: '1000+' },
        { label: 'Compliance', value: '100%' },
      ],
      code: `# Legal Compliance Engine - Real Implementation
class LegalComplianceEngine:
    """Ensures all scraping is legal and ethical"""
    
    def check_compliance(self, url: str) -> Tuple[bool, Dict]:
        domain = urlparse(url).netloc
        
        # Check blacklist
        if any(blocked in domain for blocked in self.blacklist):
            return False, {'reason': 'blacklisted_domain'}
        
        # Check robots.txt
        robots_compliant, info = self.check_robots_txt(url)
        if not robots_compliant:
            return False, {'reason': 'robots_txt_disallowed'}
        
        # Check for API alternatives
        if api := self.check_api_availability(domain):
            return False, {
                'reason': 'api_available',
                'message': f'Use official API for {domain}',
                'api_info': api
            }
        
        # Get crawl rules and rate limits
        rules = self.get_domain_rules(domain)
        
        return True, {
            'domain': domain,
            'crawl_delay': rules.crawl_delay,
            'rate_limit': rules.rate_limit,
            'attribution_required': rules.attribution_required
        }`,
      terminal: [
        'harvest scan https://docs.python.org',
        'Checking legal compliance...',
        '✓ Robots.txt: Allowed',
        '✓ Rate limit: 10 req/s',
        '✓ Attribution: Required',
        'Harvesting content...',
        'Generating quiz questions with AI...',
        '✓ 50 questions created',
        '✓ Quality validated by 3 agents',
        '✓ Sources properly attributed',
      ],
      roadmap: [
        {
          title: 'Phase 1: Core Harvesting',
          timeline: 'Q3 2024',
          status: 'completed',
          description: 'Basic web scraping with compliance',
          features: ['Robots.txt', 'Rate limiting', 'Basic extraction'],
        },
        {
          title: 'Phase 2: AI Integration',
          timeline: 'Q4 2024',
          status: 'completed',
          description: 'AI-powered content transformation',
          features: ['LLM integration', 'Multi-agent validation', 'Quality scoring'],
        },
        {
          title: 'Phase 3: Scale & Enterprise',
          timeline: 'Q1 2025',
          status: 'in-progress',
          description: 'Enterprise features and scaling',
          features: ['Distributed crawling', 'Custom models', 'API marketplace'],
        },
      ],
      github: 'https://github.com/naturequest/harvest',
      demo: 'https://harvest.ai',
    },
    quizmentor: {
      name: 'QuizMentor',
      icon: Gamepad2,
      tagline: 'Gamified Developer Learning',
      status: 'Live',
      gradient: 'from-purple-500 to-pink-500',
      description:
        'React Native learning app with advanced gamification. Features XP system, achievements, streaks, and psychological engagement patterns for 92% completion rate.',
      features: [
        'Gamification Engine',
        'Adaptive Learning',
        'Offline Support',
        'Self-hosted Analytics',
        '60+ Animations',
      ],
      technologies: {
        mobile: ['React Native', 'Expo', 'TypeScript'],
        backend: ['Supabase', 'PostgreSQL', 'Edge Functions'],
        gamification: ['XP System', 'Achievements', 'Leaderboards', 'Quests'],
        analytics: ['Self-hosted', 'Privacy-first', 'A/B Testing'],
      },
      metrics: [
        { label: 'Active Users', value: '10K+' },
        { label: 'Completion Rate', value: '92%' },
        { label: 'Avg Streak', value: '7 days' },
        { label: 'Animations', value: '60+' },
      ],
      code: `// Gamification Service - Real Implementation
import { Haptics } from 'expo-haptics';

class GamificationService {
  async awardXP(baseXP: number, reason: string) {
    const bonuses: string[] = [];
    let multiplier = 1;
    
    // Apply combo multiplier (up to 5x)
    if (this.comboMultiplier > 1) {
      multiplier *= this.comboMultiplier;
      bonuses.push(\`Combo x\${this.comboMultiplier}\`);
    }
    
    // Apply streak bonus (10% per day)
    if (this.userStats.streak > 0) {
      const streakBonus = 1 + (this.userStats.streak * 0.1);
      multiplier *= streakBonus;
      bonuses.push(\`Streak x\${streakBonus.toFixed(1)}\`);
    }
    
    // Variable reward (psychological pattern)
    const randomMultiplier = [1, 1, 1.5, 2, 3][
      Math.floor(Math.random() * 5)
    ];
    if (randomMultiplier > 1) {
      multiplier *= randomMultiplier;
      bonuses.push(\`Lucky x\${randomMultiplier}\`);
      Haptics.notificationAsync('success');
    }
    
    const xpGained = Math.floor(baseXP * multiplier);
    const levelUp = this.checkLevelUp(xpGained);
    
    if (levelUp) {
      await this.unlockAchievement('level_up');
      await this.showLevelUpAnimation();
    }
    
    return { xpGained, levelUp, bonuses };
  }
}`,
      terminal: [
        'expo init QuizMentor',
        'npm install @naturequest/gamification',
        'expo prebuild',
        'Setting up gamification engine...',
        '✓ XP system configured',
        '✓ 15 achievements added',
        '✓ Streak tracking enabled',
        '✓ Leaderboards initialized',
        '✓ Daily quests generated',
        'App ready with gamification!',
      ],
      roadmap: [
        {
          title: 'Phase 1: Core Learning',
          timeline: 'Q2 2024',
          status: 'completed',
          description: 'Basic quiz functionality',
          features: ['Quiz engine', 'Categories', 'Progress tracking'],
        },
        {
          title: 'Phase 2: Gamification',
          timeline: 'Q3 2024',
          status: 'completed',
          description: 'Full gamification system',
          features: ['XP & Levels', 'Achievements', 'Streaks', 'Leaderboards'],
        },
        {
          title: 'Phase 3: Social & Multiplayer',
          timeline: 'Q1 2025',
          status: 'in-progress',
          description: 'Social learning features',
          features: ['Friend challenges', 'Team competitions', 'Study groups'],
        },
      ],
      github: 'https://github.com/naturequest/quizmentor',
      demo: 'https://apps.apple.com/quizmentor',
    },
    omni: {
      name: 'Omni.ai',
      icon: Bot,
      tagline: 'Universal AI Coding Assistant',
      status: 'Beta',
      gradient: 'from-orange-500 to-red-500',
      description:
        'VS Code extension that unifies all AI providers. Smart routing automatically selects the best AI for each task. 100% open source with privacy-first design.',
      features: [
        'Multi-Provider',
        'Smart Routing',
        'Hot Swapping',
        'Local Models',
        'Context Aware',
        'Extensible',
      ],
      technologies: {
        extension: ['TypeScript', 'VS Code API', 'Language Server'],
        ai: ['OpenAI', 'Anthropic', 'Ollama', 'Cohere', 'Mistral'],
        features: ['Smart routing', 'Context management', 'Caching'],
        testing: ['Jest', 'E2E tests', '93% coverage'],
      },
      metrics: [
        { label: 'AI Providers', value: '12+' },
        { label: 'GitHub Stars', value: '1.2K' },
        { label: 'Response Time', value: '<100ms' },
        { label: 'Test Coverage', value: '93%' },
      ],
      code: `// Smart AI Router - Selects best model automatically
class SmartRouter {
  async route(request: AIRequest): Promise<AIProvider> {
    const { task, context, requirements } = request;
    
    // Analyze task requirements
    const analysis = await this.analyzeTask(task);
    
    // Score each provider for this specific task
    const scores = await Promise.all(
      this.providers.map(async (provider) => ({
        provider,
        score: await this.scoreProvider(provider, analysis)
      }))
    );
    
    // Consider user preferences and constraints
    if (requirements.localOnly) {
      scores = scores.filter(s => s.provider.isLocal);
    }
    
    if (requirements.maxCost) {
      scores = scores.filter(s => 
        s.provider.costPerToken <= requirements.maxCost
      );
    }
    
    // Select best provider based on:
    // - Task match score (40%)
    // - Performance history (30%)
    // - Cost efficiency (20%)
    // - Availability (10%)
    
    const best = scores.sort((a, b) => b.score - a.score)[0];
    
    logger.info(\`Routing to \${best.provider.name} (score: \${best.score})\`);
    return best.provider;
  }
}`,
      terminal: [
        'code --install-extension omni.ai',
        'omni config --add openai --key $OPENAI_KEY',
        '✓ OpenAI configured',
        'omni config --add ollama --local',
        '✓ Ollama configured (local)',
        'omni benchmark --all-providers',
        'Testing providers...',
        '✓ GPT-4: 95ms avg',
        '✓ Claude: 87ms avg',
        '✓ Llama-2: 142ms avg (local)',
        'Smart routing configured!',
      ],
      roadmap: [
        {
          title: 'Phase 1: Multi-Provider',
          timeline: 'Q3 2024',
          status: 'completed',
          description: 'Support for multiple AI providers',
          features: ['Provider abstraction', 'Unified interface', 'Basic routing'],
        },
        {
          title: 'Phase 2: Smart Features',
          timeline: 'Q4 2024',
          status: 'in-progress',
          description: 'Intelligent routing and optimization',
          features: ['Smart routing', 'Context awareness', 'Cost optimization'],
        },
        {
          title: 'Phase 3: Enterprise',
          timeline: 'Q2 2025',
          status: 'planned',
          description: 'Enterprise and team features',
          features: ['Team sharing', 'Custom models', 'Audit logs', 'Compliance'],
        },
      ],
      github: 'https://github.com/naturequest/omni',
      marketplace: 'https://marketplace.visualstudio.com/omni',
    },
  };

  const technologies = [
    {
      name: 'Frontend',
      icon: Palette,
      gradient: 'from-blue-500 to-cyan-500',
      category: 'Client-side',
      items: [
        'React',
        'React Native',
        'Next.js',
        'TypeScript',
        'Tailwind',
        'Framer Motion',
        'Zustand',
      ],
    },
    {
      name: 'Backend',
      icon: Server,
      gradient: 'from-green-500 to-emerald-500',
      category: 'Server-side',
      items: ['Node.js', 'Python', 'FastAPI', 'Express', 'Supabase', 'PostgreSQL', 'Redis'],
    },
    {
      name: 'AI/ML',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500',
      category: 'Intelligence',
      items: ['OpenAI', 'Claude', 'LangChain', 'Ollama', 'TensorFlow', 'Vector DBs', 'Embeddings'],
    },
    {
      name: 'DevOps',
      icon: Cloud,
      gradient: 'from-orange-500 to-red-500',
      category: 'Infrastructure',
      items: ['Docker', 'Kubernetes', 'CI/CD', 'Vercel', 'AWS', 'Cloudflare', 'Monitoring'],
    },
    {
      name: 'Mobile',
      icon: Smartphone,
      gradient: 'from-indigo-500 to-purple-500',
      category: 'Native Apps',
      items: ['React Native', 'Expo', 'iOS', 'Android', 'Push Notifications', 'Haptics'],
    },
    {
      name: 'Testing',
      icon: CheckCircle,
      gradient: 'from-yellow-500 to-orange-500',
      category: 'Quality',
      items: ['Jest', 'Playwright', 'Detox', 'E2E', 'Unit Tests', 'Coverage 90%+'],
    },
  ];

  const blogPosts = [
    {
      title: 'Building Production-Ready Gamification: QuizMentor Case Study',
      excerpt:
        'Deep dive into psychological patterns, XP systems, and achieving 92% completion rates through careful gamification design...',
      category: 'Product Engineering',
      date: 'Dec 20, 2024',
      readTime: 15,
      link: '/blog/gamification-engineering',
    },
    {
      title: 'Ethical Web Scraping at Scale: Harvest.ai Architecture',
      excerpt:
        'How we built a legally compliant content intelligence platform that respects robots.txt, rate limits, and always attributes sources...',
      category: 'System Design',
      date: 'Dec 15, 2024',
      readTime: 12,
      link: '/blog/ethical-scraping',
    },
    {
      title: 'Open Source SSO: Building NatureQuest Auth',
      excerpt:
        'Complete guide to building a production SSO system with cross-domain support, subscription management, and enterprise features...',
      category: 'Open Source',
      date: 'Dec 10, 2024',
      readTime: 20,
      link: '/blog/open-source-sso',
    },
    {
      title: 'Smart AI Routing: The Future of AI Development',
      excerpt:
        'Why we built Omni.ai to automatically select the best AI model for each task, and how it changes the development workflow...',
      category: 'AI Engineering',
      date: 'Dec 5, 2024',
      readTime: 10,
      link: '/blog/smart-ai-routing',
    },
  ];

  const currentProject = projects[activeProject];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-purple-950" />
      </div>

      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Home Section */}
      {activeSection === 'home' && (
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Engineering the Future
                </span>
                <br />
                <span className="text-white">of Developer Tools</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                Full-stack engineer building production-ready AI tools, open-source authentication
                systems, and gamified learning platforms. Creator of NatureQuest ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setActiveSection('projects')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  Explore Projects
                </button>
                <button
                  onClick={() => setActiveSection('roadmap')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-gray-800 rounded-lg font-medium hover:bg-white/20 transition-all"
                >
                  View Roadmaps
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { label: 'Live Products', value: '5', icon: Rocket },
                { label: 'Active Users', value: '20K+', icon: Users },
                { label: 'GitHub Stars', value: '3K+', icon: Star },
                { label: 'Code Coverage', value: '90%+', icon: Shield },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Live Demo Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Live Code Examples</h2>
                <p className="text-gray-400">Real implementations from production</p>
              </div>

              {/* Project Selector */}
              <div className="flex justify-center">
                <div className="inline-flex bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-1">
                  {Object.keys(projects).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveProject(key)}
                      className={`px-4 py-2 rounded-lg transition-all text-sm ${
                        activeProject === key
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {projects[key].name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Demo Content */}
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{currentProject.name}</h3>
                  <p className="text-gray-400">{currentProject.tagline}</p>
                </div>

                {/* Tab Selector */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-1">
                    {['code', 'terminal', 'technologies'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded transition-all capitalize ${
                          activeTab === tab
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'code' && (
                      <CodeEditor
                        code={currentProject.code}
                        title={
                          currentProject.name.toLowerCase().includes('harvest')
                            ? 'compliance.py'
                            : `${currentProject.name.toLowerCase().replace(/\s+/g, '-')}.ts`
                        }
                        language={currentProject.name.includes('Harvest') ? 'python' : 'typescript'}
                      />
                    )}
                    {activeTab === 'terminal' && (
                      <Terminal commands={currentProject.terminal} title="Terminal" />
                    )}
                    {activeTab === 'technologies' && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(currentProject.technologies).map(([category, techs]) => (
                          <div
                            key={category}
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4"
                          >
                            <h4 className="text-sm font-bold text-gray-400 mb-2 capitalize">
                              {category}
                            </h4>
                            <div className="space-y-1">
                              {techs.map((tech) => (
                                <div key={tech} className="text-xs text-gray-300">
                                  {tech}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {activeSection === 'projects' && (
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Production Projects</h2>
              <p className="text-xl text-gray-400">
                Real-world applications solving developer problems
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.values(projects).map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center`}
                        >
                          <project.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{project.name}</h3>
                          <p className="text-sm text-gray-400">{project.tagline}</p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          project.status === 'Live'
                            ? 'bg-green-500/20 text-green-400'
                            : project.status === 'Beta'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.features.slice(0, 4).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {project.metrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx}>
                          <div className="text-2xl font-bold text-white">{metric.value}</div>
                          <div className="text-xs text-gray-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-gray-800 rounded transition-colors"
                          >
                            <Github className="w-4 h-4 text-gray-400" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-gray-800 rounded transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setActiveProject(
                            Object.keys(projects).find((k) => projects[k].name === project.name),
                          );
                          setActiveSection('roadmap');
                        }}
                        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <span className="text-sm">View Roadmap</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Roadmap Section */}
      {activeSection === 'roadmap' && (
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Product Roadmaps</h2>
              <p className="text-xl text-gray-400">See where we're heading</p>
            </div>

            <div className="mb-8">
              <div className="flex justify-center">
                <div className="inline-flex bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-1">
                  {Object.keys(projects).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveProject(key)}
                      className={`px-4 py-2 rounded-lg transition-all text-sm ${
                        activeProject === key
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {projects[key].name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 text-center">{currentProject.name} Roadmap</h3>
              <RoadmapTimeline project={currentProject} />
            </div>
          </div>
        </section>
      )}

      {/* Technologies Section */}
      {activeSection === 'technologies' && (
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Technology Stack</h2>
              <p className="text-xl text-gray-400">Tools and technologies I work with</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <TechCard key={index} tech={tech} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {activeSection === 'blog' && (
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Technical Writing</h2>
              <p className="text-xl text-gray-400">
                Deep dives into engineering and product building
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <article className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
                    <div className="flex items-center space-x-2 mb-3">
                      <Tag className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-blue-400">{post.category}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-xs text-gray-500">{post.readTime} min read</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>

                      <a
                        href={post.link}
                        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <span className="text-sm">Read more</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Humberto Machuca. Building the future, one commit at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
