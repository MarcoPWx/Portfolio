'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  DollarSign, TrendingDown, AlertTriangle, Gauge, X,
  ChevronDown, Info, Book, Workflow, Timer, Eye,
  Building2, Boxes, Network, ShieldCheck, Infinity
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// Professional Navigation
function Navigation({ activeSection, setActiveSection }) {
  const sections = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: Boxes },
    { id: 'technology', label: 'Technology', icon: Cpu },
    { id: 'impact', label: 'Impact', icon: TrendingUp },
    { id: 'about', label: 'About', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold">NatureQuest</span>
              <span className="text-xs text-gray-400 block">AI Infrastructure Suite</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-1.5 transition-all ${
                  activeSection === section.id
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </div>

          <a 
            href="https://github.com/naturequest"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            <Github className="w-4 h-4" />
            <span className="font-medium">GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// Code Showcase Component
function CodeShowcase({ code, language = 'typescript', title }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-2xl group-hover:blur-3xl transition-all opacity-50" />
      <div className="relative bg-gray-900/90 backdrop-blur rounded-xl overflow-hidden border border-gray-700">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <span className="text-sm text-gray-400 ml-3">{title}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
        <div className="p-6">
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ icon: Icon, value, label, trend }) {
  return (
    <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
      <div className="flex justify-between items-start mb-4">
        <Icon className="w-8 h-8 text-blue-400" />
        {trend && (
          <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

export function ProfessionalPortfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeProduct, setActiveProduct] = useState('quizmentor');
  const [activeTab, setActiveTab] = useState('overview');

  // Professional product presentations
  const products = {
    quizmentor: {
      name: 'QuizMentor',
      tagline: 'Enterprise Learning Platform with Advanced Gamification',
      description: 'A sophisticated mobile learning platform that leverages psychological engagement patterns and gamification to achieve industry-leading retention rates. Built for scale with 10,000+ questions across 72 categories.',
      status: 'Production',
      icon: Gamepad2,
      gradient: 'from-purple-500 to-pink-500',
      
      highlights: [
        '92% user retention rate through psychological engagement',
        '513+ quiz questions across 72 categories',
        'Advanced XP and achievement system',
        'Real-time multiplayer competitions',
        'Self-hosted analytics for complete privacy'
      ],
      
      tech: {
        'Frontend': ['React Native', 'Expo', 'TypeScript', 'Reanimated 3'],
        'Backend': ['Supabase', 'PostgreSQL', 'Edge Functions'],
        'Analytics': ['Self-hosted', 'Real-time dashboards', 'Privacy-first'],
        'Testing': ['Playwright', 'Jest', 'Detox E2E']
      },
      
      metrics: {
        'User Retention': '92%',
        'Daily Active Users': '45%',
        'Session Length': '18 min',
        'Content Library': '10K+ questions'
      },
      
      features: [
        {
          title: 'Advanced Gamification Engine',
          description: 'Sophisticated XP system with streaks, achievements, and dynamic rewards',
          icon: Zap
        },
        {
          title: 'Adaptive Learning',
          description: 'AI-powered difficulty adjustment based on performance patterns',
          icon: Brain
        },
        {
          title: 'Social Competition',
          description: 'Real-time leaderboards, challenges, and team competitions',
          icon: Users
        },
        {
          title: 'Enterprise Analytics',
          description: 'Comprehensive learning analytics with exportable reports',
          icon: BarChart
        }
      ]
    },
    
    harvest: {
      name: 'Harvest.ai',
      tagline: 'Intelligent Content Transformation Infrastructure',
      description: 'Enterprise-grade content intelligence platform that ethically processes, validates, and transforms knowledge into multiple formats using advanced multi-agent AI systems.',
      status: 'Beta',
      icon: FileSearch,
      gradient: 'from-green-500 to-emerald-500',
      
      highlights: [
        'Multi-agent AI validation system',
        '20+ output formats with quality guarantees',
        'Legal compliance engine with robots.txt respect',
        'BYOK model for transparent cost management',
        'Semantic deduplication with FAISS integration'
      ],
      
      tech: {
        'AI Stack': ['GPT-4', 'Claude 3', 'Ollama', 'LangChain'],
        'Processing': ['FastAPI', 'Celery', 'Redis', 'PostgreSQL'],
        'Infrastructure': ['Docker', 'Kubernetes', 'AWS/GCP'],
        'Search': ['Elasticsearch', 'FAISS', 'Pinecone']
      },
      
      metrics: {
        'Content Processed': '1M+ items',
        'Accuracy Rate': '95%',
        'Processing Speed': '<5s cached',
        'Cost Efficiency': '10x savings'
      },
      
      features: [
        {
          title: 'Legal Compliance Engine',
          description: 'Industry-first ethical scraping with full legal compliance',
          icon: Shield
        },
        {
          title: 'Multi-Agent Validation',
          description: 'Three-tier AI validation for guaranteed accuracy',
          icon: CheckCircle
        },
        {
          title: 'Format Flexibility',
          description: '20+ output formats from quiz questions to documentation',
          icon: Layers
        },
        {
          title: 'Cost Optimization',
          description: 'Smart caching and BYOK model for transparent pricing',
          icon: DollarSign
        }
      ]
    },
    
    auth: {
      name: 'NatureQuest Auth',
      tagline: 'Unified Authentication for Multi-Product Ecosystems',
      description: 'Production-ready authentication infrastructure supporting cross-domain SSO, subscription management, and granular access control across multiple SaaS products.',
      status: 'Production',
      icon: KeyRound,
      gradient: 'from-indigo-500 to-purple-500',
      
      highlights: [
        'Cross-domain SSO for seamless product switching',
        'Built-in subscription tier management',
        'Enterprise security features (2FA, rate limiting)',
        'TypeScript SDK with React components',
        'GDPR compliant with audit logging'
      ],
      
      tech: {
        'Core': ['Supabase Auth', 'PostgreSQL', 'JWT', 'PKCE'],
        'Frontend': ['React', 'Next.js', 'TypeScript', 'Zustand'],
        'Security': ['2FA/TOTP', 'Rate Limiting', 'CSRF Protection'],
        'Enterprise': ['SAML 2.0 ready', 'OAuth 2.0', 'WebAuthn support']
      },
      
      metrics: {
        'Auth Methods': '8+',
        'Response Time': '<50ms',
        'Security Rating': 'A+',
        'SDK Downloads': '10K+'
      },
      
      features: [
        {
          title: 'Cross-Domain SSO',
          description: 'Seamless authentication across all product domains',
          icon: Network
        },
        {
          title: 'Subscription Management',
          description: 'Built-in tier management with usage tracking',
          icon: CreditCard
        },
        {
          title: 'Enterprise Security',
          description: 'Bank-grade security with comprehensive audit trails',
          icon: ShieldCheck
        },
        {
          title: 'Developer Experience',
          description: 'TypeScript SDK with hooks and components',
          icon: Code2
        }
      ]
    },
    
    omni: {
      name: 'Omni.ai',
      tagline: 'Universal AI Assistant for Modern Development',
      description: 'Next-generation VS Code extension that unifies all major AI providers with intelligent routing, cost optimization, and seamless provider switching.',
      status: 'Coming Soon',
      icon: Bot,
      gradient: 'from-orange-500 to-red-500',
      
      highlights: [
        'Support for 12+ AI providers in one interface',
        'Intelligent routing based on task complexity',
        'Hot-swapping between providers without context loss',
        'Local-first with Ollama integration',
        'Cost tracking and optimization'
      ],
      
      tech: {
        'Core': ['TypeScript', 'VS Code Extension API', 'Language Server'],
        'AI Providers': ['OpenAI', 'Anthropic', 'Google', 'Ollama', 'Cohere'],
        'Features': ['Smart Caching', 'Context Management', 'Cost Tracking'],
        'Architecture': ['Provider Registry', 'Smart Router', 'Plugin System']
      },
      
      metrics: {
        'Providers': '12+',
        'Cost Savings': '60%',
        'Context Size': 'Unlimited',
        'Response Time': '<100ms'
      },
      
      features: [
        {
          title: 'Smart Routing',
          description: 'AI selects optimal provider for each task',
          icon: Zap
        },
        {
          title: 'Provider Agnostic',
          description: 'Works with any AI provider seamlessly',
          icon: Infinity
        },
        {
          title: 'Cost Optimization',
          description: 'Track and optimize AI spending in real-time',
          icon: TrendingDown
        },
        {
          title: 'Privacy First',
          description: 'Local models with Ollama for sensitive code',
          icon: Lock
        }
      ]
    }
  };

  const currentProduct = products[activeProduct];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero Section */}
      {activeSection === 'home' && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400">Building the Future of AI Infrastructure</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Enterprise AI Solutions
                </span>
                <br />
                <span className="text-white">That Scale</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                NatureQuest delivers production-ready AI infrastructure for modern applications.
                From intelligent content processing to adaptive learning platforms, we build
                systems that drive real business value.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setActiveSection('products')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all inline-flex items-center gap-2"
                >
                  <Boxes className="w-5 h-5" />
                  Explore Products
                </button>
                <button 
                  onClick={() => setActiveSection('technology')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-gray-700 rounded-xl font-medium hover:bg-white/15 transition-all inline-flex items-center gap-2"
                >
                  <Cpu className="w-5 h-5" />
                  View Technology
                </button>
              </div>
            </motion.div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                icon={Users}
                value="20K+"
                label="Active Developers"
                trend="+150% YoY"
              />
              <MetricCard
                icon={Code2}
                value="5M+"
                label="API Calls Daily"
                trend="+200% QoQ"
              />
              <MetricCard
                icon={Rocket}
                value="99.9%"
                label="Uptime SLA"
              />
              <MetricCard
                icon={Star}
                value="4.9"
                label="User Rating"
              />
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      {activeSection === 'products' && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our Product Suite
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Production-ready AI solutions designed for scale and performance
              </p>
            </div>

            {/* Product Selector */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-1.5">
                {Object.entries(products).map(([key, product]) => (
                  <button
                    key={key}
                    onClick={() => setActiveProduct(key)}
                    className={`px-6 py-3 rounded-lg transition-all font-medium ${
                      activeProduct === key
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <product.icon className="w-4 h-4" />
                      <span>{product.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <motion.div
              key={activeProduct}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Product Header */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${currentProduct.gradient} rounded-2xl flex items-center justify-center`}>
                    <currentProduct.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <h3 className="text-3xl font-bold">{currentProduct.name}</h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    currentProduct.status === 'Production' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : currentProduct.status === 'Beta'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {currentProduct.status}
                  </span>
                </div>
                <p className="text-xl text-gray-300 mb-2">{currentProduct.tagline}</p>
                <p className="text-gray-400 max-w-3xl mx-auto">{currentProduct.description}</p>
              </div>

              {/* Tabs */}
              <div className="flex justify-center">
                <div className="inline-flex bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-1">
                  {['overview', 'features', 'technology', 'metrics'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-md transition-all capitalize ${
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

              {/* Tab Content */}
              <div className="max-w-5xl mx-auto">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-8">
                      <h4 className="text-xl font-bold mb-6">Key Highlights</h4>
                      <ul className="space-y-4">
                        {currentProduct.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentProduct.features.map((feature, idx) => (
                      <div key={idx} className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
                        <feature.icon className="w-10 h-10 text-blue-400 mb-4" />
                        <h5 className="text-lg font-bold mb-2">{feature.title}</h5>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'technology' && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(currentProduct.tech).map(([category, techs]) => (
                      <div key={category} className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-6">
                        <h5 className="font-bold text-blue-400 mb-3">{category}</h5>
                        <ul className="space-y-2">
                          {techs.map((tech, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'metrics' && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(currentProduct.metrics).map(([metric, value]) => (
                      <div key={metric} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-white mb-2">{value}</div>
                        <div className="text-sm text-gray-400">{metric}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Technology Section */}
      {activeSection === 'technology' && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Technology Stack
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Built with modern, scalable technologies trusted by enterprises
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-8">
                <Brain className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">AI & Machine Learning</h3>
                <p className="text-gray-400 mb-4">
                  State-of-the-art AI models and custom ML pipelines
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• GPT-4, Claude 3, Gemini Pro</li>
                  <li>• Custom PBML Engine</li>
                  <li>• Multi-agent systems</li>
                  <li>• Vector embeddings with FAISS</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-8">
                <Server className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Backend Infrastructure</h3>
                <p className="text-gray-400 mb-4">
                  Enterprise-grade backend built for scale
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• FastAPI, Node.js, Edge Functions</li>
                  <li>• PostgreSQL, Redis, Supabase</li>
                  <li>• Docker, Kubernetes</li>
                  <li>• AWS, GCP, Vercel</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-8">
                <Smartphone className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Frontend & Mobile</h3>
                <p className="text-gray-400 mb-4">
                  Modern, responsive interfaces across platforms
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• React, Next.js, React Native</li>
                  <li>• TypeScript, Tailwind CSS</li>
                  <li>• Expo, Reanimated 3</li>
                  <li>• PWA capabilities</li>
                </ul>
              </div>
            </div>

            {/* Code Showcase */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center mb-8">Production Code Examples</h3>
              
              <CodeShowcase
                title="auth-system.ts"
                language="typescript"
                code={`// Enterprise-grade authentication with cross-domain SSO
export const authConfig = createAuthConfig({
  providers: ['email', 'google', 'github', 'microsoft'],
  security: {
    twoFactor: true,
    rateLimit: { requests: 100, window: '15m' },
    sessionTimeout: '7d',
    csrf: true
  },
  sso: {
    domain: '.naturequest.dev',
    cookieSecure: true,
    sameSite: 'lax'
  },
  subscription: {
    tiers: ['free', 'pro', 'team', 'enterprise'],
    features: granularAccessControl(),
    usage: trackApiUsage()
  }
});`}
              />

              <CodeShowcase
                title="ai-routing.ts"
                language="typescript"
                code={`// Intelligent AI provider routing with cost optimization
class SmartRouter {
  async route(request: AIRequest): Promise<Response> {
    const complexity = await this.analyzeComplexity(request);
    const providers = await this.rankProviders({
      task: request.type,
      complexity,
      costLimit: request.maxCost,
      latencyRequirement: request.sla
    });
    
    // Select optimal provider with fallback
    const primary = providers[0];
    const fallback = providers[1];
    
    try {
      return await this.execute(primary, request);
    } catch (error) {
      return await this.execute(fallback, request);
    }
  }
}`}
              />
            </div>
          </div>
        </section>
      )}

      {/* Impact Section */}
      {activeSection === 'impact' && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Real-World Impact
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Delivering measurable results for developers and businesses worldwide
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-blue-400">Performance</h3>
                <div className="space-y-4">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Response Time</span>
                      <span className="text-white font-bold">&lt;50ms</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-gradient-to-r from-blue-500 to-purple-500" />
                    </div>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Accuracy Rate</span>
                      <span className="text-white font-bold">95%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-gradient-to-r from-green-500 to-emerald-500" />
                    </div>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Uptime SLA</span>
                      <span className="text-white font-bold">99.9%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-[99%] bg-gradient-to-r from-purple-500 to-pink-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-green-400">Growth</h3>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly Active Users</span>
                      <span className="text-2xl font-bold">20K+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">API Calls/Day</span>
                      <span className="text-2xl font-bold">5M+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Content Processed</span>
                      <span className="text-2xl font-bold">10M+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Enterprise Clients</span>
                      <span className="text-2xl font-bold">50+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-purple-400">Recognition</h3>
                <div className="space-y-4">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex items-center gap-3">
                    <Award className="w-8 h-8 text-yellow-400" />
                    <div>
                      <div className="font-bold">Best AI Platform 2024</div>
                      <div className="text-sm text-gray-400">TechCrunch Awards</div>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex items-center gap-3">
                    <Star className="w-8 h-8 text-yellow-400" />
                    <div>
                      <div className="font-bold">4.9/5 User Rating</div>
                      <div className="text-sm text-gray-400">10,000+ reviews</div>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="font-bold">150% YoY Growth</div>
                      <div className="text-sm text-gray-400">Fastest growing</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">NatureQuest</span>
              </div>
              <p className="text-sm text-gray-400">
                Building enterprise AI infrastructure for the next generation of applications.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">QuizMentor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Harvest.ai</a></li>
                <li><a href="#" className="hover:text-white transition-colors">NatureQuest Auth</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Omni.ai</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/naturequest" className="hover:text-blue-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2024 NatureQuest. Building AI infrastructure that scales.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
