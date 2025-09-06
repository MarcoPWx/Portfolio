'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Database,
  Globe,
  Cpu,
  Layers,
  Shield,
  Zap,
  GitBranch,
  Cloud,
  Server,
  Package,
  Brain,
  Sparkles,
  Rocket,
  Terminal,
  FileCode,
  Coffee,
  Smartphone,
  Palette,
  Boxes,
  Lock,
  Activity,
  Gauge,
  Network,
  TestTube,
  FileJson,
  Link,
  Workflow,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Video,
  HardDrive,
  ChevronRight,
  Filter,
  Eye,
  EyeOff,
  TrendingUp,
  Award,
  Users,
  Star,
  Hash,
  Briefcase,
  BookOpen,
  Settings,
  Monitor,
  Play,
  Search,
  X,
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: React.ReactNode;
  iconText?: string;
  description?: string;
  highlights?: string[];
  projects?: string[];
  tags?: string[];
  trending?: boolean;
  color: string;
  relatedSkills?: string[];
  certifications?: string[];
  lastUsed?: string;
}

export function TechnicalStackV3() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // All skills data with enhanced metadata
  const allSkills: Skill[] = [
    // Programming Languages
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Languages',
      iconText: 'TS',
      description: 'Primary language for modern full-stack development with type safety',
      highlights: [
        'Type-safe development across frontend and backend',
        'Enhanced IDE support and refactoring capabilities',
        'Seamless integration with React and Node.js ecosystems',
      ],
      projects: ['QuizMentor', 'DevMentor', 'Chameleon', 'Portfolio'],
      tags: ['frontend', 'backend', 'fullstack'],
      trending: true,
      color: 'from-blue-500 to-blue-600',
      relatedSkills: ['JavaScript', 'React', 'Node.js'],
      lastUsed: 'Currently using',
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Languages',
      iconText: 'Py',
      description: 'AI/ML development, FastAPI backends, data processing',
      highlights: [
        'Building high-performance APIs with FastAPI',
        'Machine learning model development and deployment',
        'Data analysis and processing pipelines',
      ],
      projects: ['Chameleon', 'DevMentor ML'],
      tags: ['ai', 'ml', 'backend', 'data'],
      trending: true,
      color: 'from-green-500 to-emerald-600',
      relatedSkills: ['FastAPI', 'PyTorch', 'NumPy'],
      lastUsed: 'Currently using',
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Languages',
      iconText: 'JS',
      description: 'ES6+, Node.js runtime, browser APIs',
      highlights: [
        'Modern ES6+ features and async programming',
        'Full-stack JavaScript development',
        'Browser API expertise and DOM manipulation',
      ],
      projects: ['All web projects'],
      tags: ['frontend', 'backend', 'fullstack'],
      color: 'from-yellow-400 to-orange-500',
      relatedSkills: ['TypeScript', 'React', 'Node.js'],
      lastUsed: 'Currently using',
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Languages',
      icon: <Coffee className="w-4 h-4" />,
      description: 'Enterprise applications, Spring Boot, Android',
      highlights: [
        'Enterprise-grade application development',
        'Spring Boot microservices architecture',
        'Android native development',
      ],
      projects: ['Queue-it', 'Enterprise systems'],
      tags: ['enterprise', 'backend', 'android'],
      color: 'from-red-500 to-orange-600',
      relatedSkills: ['Spring Boot', 'Kotlin', 'Android'],
      lastUsed: '2024',
    },
    {
      id: 'swift',
      name: 'Swift',
      category: 'Languages',
      iconText: 'Sw',
      description: 'iOS native modules and integrations',
      highlights: [
        'Native iOS module development',
        'SwiftUI and UIKit expertise',
        'Integration with React Native bridges',
      ],
      projects: ['PatientSky', 'ExSeed Health'],
      tags: ['mobile', 'ios'],
      color: 'from-orange-500 to-pink-500',
      relatedSkills: ['iOS', 'Objective-C', 'Xcode'],
      lastUsed: '2025',
    },
    {
      id: 'kotlin',
      name: 'Kotlin',
      category: 'Languages',
      iconText: 'Kt',
      description: 'Android native modules and integrations',
      highlights: [
        'Native Android module development',
        'Coroutines and async programming',
        'Jetpack Compose UI development',
      ],
      projects: ['PatientSky', 'ExSeed Health'],
      tags: ['mobile', 'android'],
      color: 'from-purple-500 to-indigo-500',
      relatedSkills: ['Android', 'Java', 'Gradle'],
      lastUsed: '2025',
    },
    {
      id: 'dart',
      name: 'Dart',
      category: 'Languages',
      iconText: 'D',
      description: 'Flutter app development',
      highlights: [
        'Cross-platform mobile app development',
        'Flutter widget composition',
        'State management with Provider and Riverpod',
      ],
      projects: ['ExSeed Health'],
      tags: ['mobile', 'flutter'],
      color: 'from-cyan-500 to-teal-500',
      relatedSkills: ['Flutter', 'Mobile Development'],
      lastUsed: '2025',
    },
    {
      id: 'cpp',
      name: 'C++',
      category: 'Languages',
      iconText: 'C++',
      description: 'Computer Vision integrations and native performance',
      highlights: [
        'OpenCV integration for image processing',
        'High-performance native modules',
        'Memory-efficient algorithm implementation',
      ],
      projects: ['ExSeed Health'],
      tags: ['systems', 'performance', 'native'],
      color: 'from-gray-500 to-slate-600',
      relatedSkills: ['Computer Vision', 'OpenCV'],
      lastUsed: '2025',
    },
    {
      id: 'bash',
      name: 'Bash',
      category: 'Languages',
      icon: <Terminal className="w-4 h-4" />,
      description: 'Automation, provisioning, CI/CD scripting',
      highlights: [
        'Infrastructure automation and provisioning',
        'CI/CD pipeline scripting',
        'System administration and monitoring',
      ],
      projects: ['All DevOps'],
      tags: ['devops', 'automation'],
      color: 'from-gray-600 to-gray-700',
      relatedSkills: ['Linux', 'Shell Scripting', 'CI/CD'],
      lastUsed: 'Currently using',
    },

    // Frontend Technologies
    {
      id: 'react',
      name: 'React',
      category: 'Frontend',
      icon: <Layers className="w-4 h-4" />,
      description: 'React 18, Hooks, Context, Server Components',
      projects: ['All frontend projects'],
      tags: ['frontend', 'ui', 'spa'],
      trending: true,
      color: 'from-cyan-400 to-blue-500',
      relatedSkills: ['Next.js', 'TypeScript', 'Redux'],
      lastUsed: 'Currently using',
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'Frontend',
      icon: <Globe className="w-4 h-4" />,
      description: 'App Router, SSR, SSG, ISR, API Routes',
      projects: ['QuizMentor', 'DevMentor', 'Portfolio'],
      tags: ['frontend', 'fullstack', 'ssr'],
      trending: true,
      color: 'from-gray-700 to-black',
      relatedSkills: ['React', 'TypeScript', 'Vercel'],
      lastUsed: 'Currently using',
    },
    {
      id: 'react-native',
      name: 'React Native',
      category: 'Frontend',
      icon: <Smartphone className="w-4 h-4" />,
      description: 'Expo, native modules, animations',
      projects: ['QuizMentor Mobile', 'PatientSky'],
      tags: ['mobile', 'cross-platform'],
      color: 'from-purple-500 to-pink-500',
      relatedSkills: ['React', 'Expo', 'Mobile Development'],
      lastUsed: 'Currently using',
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'Frontend',
      icon: <Palette className="w-4 h-4" />,
      description: 'Utility-first CSS, custom plugins, design systems',
      projects: ['All recent projects'],
      tags: ['frontend', 'css', 'design'],
      trending: true,
      color: 'from-teal-400 to-cyan-500',
      relatedSkills: ['CSS', 'PostCSS', 'Design Systems'],
      lastUsed: 'Currently using',
    },
    {
      id: 'redux',
      name: 'Redux',
      category: 'Frontend',
      icon: <Database className="w-4 h-4" />,
      description: 'Redux Toolkit, RTK Query, state management',
      projects: ['QuizMentor', 'DevMentor'],
      tags: ['frontend', 'state-management'],
      color: 'from-purple-500 to-purple-600',
      relatedSkills: ['React', 'TypeScript', 'Zustand'],
      lastUsed: 'Currently using',
    },
    {
      id: 'vue',
      name: 'Vue.js',
      category: 'Frontend',
      iconText: 'V',
      description: 'Vue 3, Composition API, Nuxt.js',
      projects: ['Client projects'],
      tags: ['frontend', 'spa'],
      color: 'from-green-500 to-green-600',
      relatedSkills: ['Nuxt.js', 'Vuex', 'JavaScript'],
      lastUsed: '2024',
    },
    {
      id: 'flutter',
      name: 'Flutter',
      category: 'Frontend',
      iconText: 'Fl',
      description: 'Cross-platform mobile development',
      projects: ['ExSeed Health'],
      tags: ['mobile', 'cross-platform'],
      color: 'from-blue-400 to-cyan-500',
      relatedSkills: ['Dart', 'Mobile Development'],
      lastUsed: '2025',
    },

    // Backend Technologies
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Backend',
      icon: <Server className="w-4 h-4" />,
      description: 'Express, Fastify, NestJS, microservices',
      projects: ['All backend projects'],
      tags: ['backend', 'javascript', 'api'],
      trending: true,
      color: 'from-green-500 to-green-600',
      relatedSkills: ['Express', 'TypeScript', 'MongoDB'],
      lastUsed: 'Currently using',
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      category: 'Backend',
      icon: <Rocket className="w-4 h-4" />,
      description: 'High-performance Python APIs, async/await',
      projects: ['Chameleon'],
      tags: ['backend', 'python', 'api'],
      trending: true,
      color: 'from-green-400 to-teal-500',
      relatedSkills: ['Python', 'SQLAlchemy', 'Pydantic'],
      lastUsed: 'Currently using',
    },
    {
      id: 'graphql',
      name: 'GraphQL',
      category: 'Backend',
      icon: <GitBranch className="w-4 h-4" />,
      description: 'Apollo Server, Federation, Subscriptions',
      projects: ['Enterprise APIs'],
      tags: ['backend', 'api', 'query'],
      color: 'from-pink-500 to-purple-500',
      relatedSkills: ['Apollo', 'TypeScript', 'REST'],
      lastUsed: '2024',
    },
    {
      id: 'websockets',
      name: 'WebSockets',
      category: 'Backend',
      icon: <Network className="w-4 h-4" />,
      description: 'Socket.io, real-time features, WebRTC',
      projects: ['QuizMentor', 'PatientSky'],
      tags: ['backend', 'realtime', 'communication'],
      color: 'from-blue-500 to-cyan-500',
      relatedSkills: ['Socket.io', 'WebRTC', 'Node.js'],
      lastUsed: 'Currently using',
    },

    // Cloud & DevOps
    {
      id: 'aws',
      name: 'AWS',
      category: 'Cloud & DevOps',
      icon: <Cloud className="w-4 h-4" />,
      description: 'EC2, Lambda, S3, RDS, CloudFront, ECS',
      projects: ['All cloud infrastructure'],
      tags: ['cloud', 'infrastructure', 'devops'],
      trending: true,
      color: 'from-orange-400 to-yellow-500',
      relatedSkills: ['Terraform', 'Docker', 'CloudFormation'],
      certifications: ['AWS Solutions Architect'],
      lastUsed: 'Currently using',
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'Cloud & DevOps',
      icon: <Package className="w-4 h-4" />,
      description: 'Multi-stage builds, compose, optimization',
      projects: ['All containerized apps'],
      tags: ['devops', 'containers', 'deployment'],
      trending: true,
      color: 'from-blue-500 to-blue-600',
      relatedSkills: ['Kubernetes', 'Docker Compose', 'CI/CD'],
      lastUsed: 'Currently using',
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      category: 'Cloud & DevOps',
      icon: <Boxes className="w-4 h-4" />,
      description: 'Helm, Istio, monitoring, scaling',
      projects: ['Production deployments'],
      tags: ['devops', 'orchestration', 'containers'],
      trending: true,
      color: 'from-blue-400 to-cyan-500',
      relatedSkills: ['Docker', 'Helm', 'Istio'],
      lastUsed: 'Currently using',
    },

    // AI/ML
    {
      id: 'langchain',
      name: 'LangChain',
      category: 'AI/ML',
      icon: <Brain className="w-4 h-4" />,
      description: 'LLM orchestration, RAG, agents',
      projects: ['DevMentor', 'Chameleon'],
      tags: ['ai', 'llm', 'orchestration'],
      trending: true,
      color: 'from-green-500 to-teal-500',
      relatedSkills: ['OpenAI', 'Python', 'Vector DBs'],
      lastUsed: 'Currently using',
    },
    {
      id: 'openai',
      name: 'OpenAI',
      category: 'AI/ML',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'GPT-4, Embeddings, Fine-tuning, Function calling',
      projects: ['All AI projects'],
      tags: ['ai', 'llm', 'api'],
      trending: true,
      color: 'from-gray-700 to-gray-900',
      relatedSkills: ['LangChain', 'Python', 'Prompt Engineering'],
      lastUsed: 'Currently using',
    },

    // Databases
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Databases',
      icon: <Database className="w-4 h-4" />,
      description: 'Advanced queries, indexing, performance tuning',
      projects: ['All production databases'],
      tags: ['database', 'sql', 'relational'],
      color: 'from-blue-500 to-blue-600',
      relatedSkills: ['SQL', 'Supabase', 'Prisma'],
      lastUsed: 'Currently using',
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'Databases',
      icon: <HardDrive className="w-4 h-4" />,
      description: 'NoSQL, aggregation, sharding',
      projects: ['Document stores'],
      tags: ['database', 'nosql', 'document'],
      color: 'from-green-500 to-green-600',
      relatedSkills: ['Mongoose', 'NoSQL', 'Node.js'],
      lastUsed: '2024',
    },
    {
      id: 'redis',
      name: 'Redis',
      category: 'Databases',
      icon: <Zap className="w-4 h-4" />,
      description: 'Caching, pub/sub, queues',
      projects: ['All caching layers'],
      tags: ['database', 'cache', 'performance'],
      color: 'from-red-500 to-red-600',
      relatedSkills: ['Caching', 'Node.js', 'Performance'],
      lastUsed: 'Currently using',
    },
    {
      id: 'qdrant',
      name: 'Qdrant',
      category: 'Databases',
      icon: <Search className="w-4 h-4" />,
      description: 'Vector database for AI applications',
      projects: ['DevMentor'],
      tags: ['database', 'vector', 'ai'],
      trending: true,
      color: 'from-purple-500 to-pink-500',
      relatedSkills: ['AI', 'Embeddings', 'Search'],
      lastUsed: 'Currently using',
    },
    {
      id: 'supabase',
      name: 'Supabase',
      category: 'Databases',
      icon: <Shield className="w-4 h-4" />,
      description: 'BaaS, Realtime, Auth, RLS',
      projects: ['QuizMentor'],
      tags: ['database', 'baas', 'realtime'],
      trending: true,
      color: 'from-green-500 to-teal-500',
      relatedSkills: ['PostgreSQL', 'Auth', 'Realtime'],
      lastUsed: 'Currently using',
    },

    // Testing
    {
      id: 'jest',
      name: 'Jest',
      category: 'Testing',
      icon: <TestTube className="w-4 h-4" />,
      description: 'Unit testing, coverage, mocking',
      projects: ['All projects'],
      tags: ['testing', 'tdd', 'quality'],
      color: 'from-red-500 to-orange-500',
      relatedSkills: ['Testing Library', 'Vitest', 'TDD'],
      lastUsed: 'Currently using',
    },
    {
      id: 'playwright',
      name: 'Playwright',
      category: 'Testing',
      icon: <Play className="w-4 h-4" />,
      description: 'E2E testing, cross-browser automation',
      projects: ['All E2E tests'],
      tags: ['testing', 'e2e', 'automation'],
      color: 'from-green-500 to-teal-500',
      relatedSkills: ['E2E Testing', 'Automation', 'CI/CD'],
      lastUsed: 'Currently using',
    },
    {
      id: 'storybook',
      name: 'Storybook',
      category: 'Testing',
      icon: <BookOpen className="w-4 h-4" />,
      description: 'Component development, visual testing',
      projects: ['All UI projects'],
      tags: ['testing', 'ui', 'documentation'],
      trending: true,
      color: 'from-pink-500 to-purple-500',
      relatedSkills: ['React', 'Testing', 'MSW'],
      lastUsed: 'Currently using',
    },
    {
      id: 'msw',
      name: 'MSW',
      category: 'Testing',
      icon: <Network className="w-4 h-4" />,
      description: 'API mocking, service worker',
      projects: ['All mock-first development'],
      tags: ['testing', 'mocking', 'api'],
      color: 'from-orange-500 to-red-500',
      relatedSkills: ['Testing', 'API', 'Storybook'],
      lastUsed: 'Currently using',
    },

    // AI/ML heuristics and pipeline skills (Chameleon)
    {
      id: 'semantic-similarity-tfidf',
      name: 'Semantic similarity (TF‑IDF + cosine)',
      category: 'AI/ML',
      icon: <Search className="w-4 h-4" />,
      description:
        'Checks whether a new question “means the same” as an old one using TF‑IDF vectors and cosine similarity (~0.85 threshold).',
      projects: ['Chameleon', 'Scraper', 'QuizMentor'],
      tags: ['IR', 'NLP', 'scikit-learn'],
      color: 'from-blue-500 to-blue-600',
      relatedSkills: ['Levenshtein', 'SimHash'],
      lastUsed: 'Currently using',
    },
    {
      id: 'simhash',
      name: 'Near‑duplicate detection (SimHash)',
      category: 'AI/ML',
      icon: <Hash className="w-4 h-4" />,
      description:
        'Detects almost‑identical questions via 64‑bit hashes and Hamming distance (reject when distance < 8).',
      projects: ['Chameleon', 'Scraper'],
      tags: ['LSH', 'dedupe'],
      color: 'from-violet-500 to-indigo-500',
      relatedSkills: ['Semantic similarity (TF‑IDF + cosine)', 'Levenshtein'],
      lastUsed: 'Currently using',
    },
    {
      id: 'levenshtein',
      name: 'String similarity (Levenshtein)',
      category: 'AI/ML',
      icon: <Activity className="w-4 h-4" />,
      description:
        'Uses edit distance to block look‑alike questions and overly similar options (ratio ≤ 0.85).',
      projects: ['Chameleon', 'QuizMentor'],
      tags: ['fuzzywuzzy', 'quality'],
      color: 'from-purple-500 to-pink-500',
      relatedSkills: ['Semantic similarity (TF‑IDF + cosine)', 'SimHash'],
      lastUsed: 'Currently using',
    },
    {
      id: 'distractors',
      name: 'Believable distractors',
      category: 'AI/ML',
      icon: <Sparkles className="w-4 h-4" />,
      description:
        'Wrong answers shaped by real misconceptions, meaning flips, and related terms mined from context.',
      projects: ['Chameleon'],
      tags: ['MCQ', 'NLP', 'generation'],
      color: 'from-amber-500 to-orange-500',
      relatedSkills: ['Heuristic difficulty & confidence'],
      lastUsed: 'Currently using',
    },
    {
      id: 'answer-balance',
      name: 'Answer balance (A/B/C/D)',
      category: 'AI/ML',
      icon: <Gauge className="w-4 h-4" />,
      description:
        'Evenly distributes correct letters with inverse‑frequency placement and forced rebalance when skew > 20.',
      projects: ['Chameleon'],
      tags: ['assessment', 'evaluation'],
      color: 'from-emerald-500 to-green-600',
      relatedSkills: ['Believable distractors'],
      lastUsed: 'Currently using',
    },
    {
      id: 'heuristic-scoring',
      name: 'Heuristic difficulty & confidence',
      category: 'AI/ML',
      icon: <TrendingUp className="w-4 h-4" />,
      description:
        'Difficulty from length/complexity/similarity and confidence from distractor quality and context richness.',
      projects: ['Chameleon'],
      tags: ['scoring'],
      color: 'from-sky-500 to-cyan-500',
      relatedSkills: ['String similarity (Levenshtein)'],
      lastUsed: 'Currently using',
    },
    {
      id: 'scraping',
      name: 'Data collection & parsing',
      category: 'Backend',
      icon: <FileCode className="w-4 h-4" />,
      description:
        'Scrapes docs, Q&A, and READMEs with Requests + BeautifulSoup; cleans and structures the text.',
      projects: ['Chameleon', 'Scraper'],
      tags: ['scraping', 'parsing'],
      color: 'from-slate-500 to-gray-600',
      relatedSkills: ['Data pipeline & reports'],
      lastUsed: 'Currently using',
    },
    {
      id: 'data-pipeline',
      name: 'Data pipeline & reports',
      category: 'Backend',
      icon: <HardDrive className="w-4 h-4" />,
      description:
        'SQLite for persistence, CSV exports for review, Pandas for analysis, and Rich for terminal stats.',
      projects: ['Chameleon'],
      tags: ['SQLite', 'CSV', 'Pandas', 'Rich'],
      color: 'from-lime-500 to-green-500',
      relatedSkills: ['Data collection & parsing'],
      lastUsed: 'Currently using',
    },
  ];

  // Categories with metadata
  const categories = [
    {
      id: 'all',
      name: 'All Skills',
      icon: <Layers className="w-4 h-4" />,
      count: allSkills.length,
    },
    {
      id: 'Languages',
      name: 'Languages',
      icon: <Code className="w-4 h-4" />,
      count: allSkills.filter((s) => s.category === 'Languages').length,
    },
    {
      id: 'Frontend',
      name: 'Frontend',
      icon: <Monitor className="w-4 h-4" />,
      count: allSkills.filter((s) => s.category === 'Frontend').length,
    },
    {
      id: 'Backend',
      name: 'Backend',
      icon: <Server className="w-4 h-4" />,
      count: allSkills.filter((s) => s.category === 'Backend').length,
    },
    {
      id: 'Cloud & DevOps',
      name: 'Cloud & DevOps',
      icon: <Cloud className="w-4 h-4" />,
      count: allSkills.filter((s) => s.category === 'Cloud & DevOps').length,
    },
    {
      id: 'AI/ML',
      name: 'AI/ML',
      icon: <Brain className="w-4 h-4" />,
      count: allSkills.filter((s) => s.category === 'AI/ML').length,
    },
    {
      id: 'Databases',
      name: 'Databases',
      icon: <Database className="w-4 h-4" />,
      count: allSkills.filter((s) => s.category === 'Databases').length,
    },
    {
      id: 'Testing',
      name: 'Testing',
      icon: <TestTube className="w-4 h-4" />,
      count: allSkills.filter((s) => s.category === 'Testing').length,
    },
  ];

  // Filter skills based on search and category
  const filteredSkills = useMemo(() => {
    let filtered = allSkills;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((skill) => skill.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (skill) =>
          skill.name.toLowerCase().includes(query) ||
          skill.description?.toLowerCase().includes(query) ||
          skill.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          skill.projects?.some((project) => project.toLowerCase().includes(query)),
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            Technical Stack
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Comprehensive expertise across modern web technologies, cloud infrastructure, and AI/ML
          systems
        </p>
      </motion.div>

      {/* Search and Filters Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills, projects, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
              <span className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">{cat.count}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid/List */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedSkill(skill)}
                className="group relative bg-gray-900/50 border border-gray-800 rounded-xl p-4 cursor-pointer hover:border-gray-600 transition-all"
              >
                {/* Trending Badge */}
                {skill.trending && (
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full">
                    <TrendingUp className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${skill.color} bg-opacity-20`}
                    >
                      {skill.icon || (
                        <span className="text-sm font-bold text-white">{skill.iconText}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                      <p className="text-xs text-gray-500">{skill.category}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {skill.description && (
                  <p className="text-xs text-gray-400 mt-3 line-clamp-2">{skill.description}</p>
                )}

                {/* Tags */}
                {skill.tags && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {skill.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {viewMode === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                onClick={() => setSelectedSkill(skill)}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${skill.color} bg-opacity-20`}
                    >
                      {skill.icon || (
                        <span className="text-sm font-bold text-white">{skill.iconText}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-white">{skill.name}</h3>
                        <span className="text-xs text-gray-500">{skill.category}</span>
                        {skill.trending && <TrendingUp className="w-3 h-3 text-green-400" />}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{skill.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {viewMode === 'compact' && (
          <motion.div
            key="compact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
          >
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.01 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedSkill(skill)}
                className={`relative bg-gray-900/50 border border-gray-800 rounded-lg p-3 cursor-pointer hover:border-gray-600 transition-all`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded bg-gradient-to-br ${skill.color} bg-opacity-20`}>
                    {skill.icon ? (
                      React.cloneElement(skill.icon as React.ReactElement, { className: 'w-3 h-3' })
                    ) : (
                      <span className="text-xs font-bold text-white">{skill.iconText}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">{skill.name}</h3>
                    {skill.trending && <TrendingUp className="w-2.5 h-2.5 text-green-400" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No skills found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </motion.div>
      )}

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${selectedSkill.color} bg-opacity-20`}
                  >
                    {selectedSkill.icon || (
                      <span className="text-xl font-bold text-white">{selectedSkill.iconText}</span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedSkill.name}</h2>
                    <p className="text-gray-400">{selectedSkill.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Last Used */}
                {selectedSkill.lastUsed && (
                  <div className="bg-gray-800/50 rounded-lg p-4 inline-block">
                    <p className="text-xs text-gray-500 mb-1">Last Used</p>
                    <p className="font-semibold text-white">{selectedSkill.lastUsed}</p>
                  </div>
                )}

                {/* Description */}
                {selectedSkill.description && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Description</h3>
                    <p className="text-gray-300">{selectedSkill.description}</p>
                  </div>
                )}

                {/* Projects */}
                {selectedSkill.projects && selectedSkill.projects.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Used in Projects</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.projects.map((project) => (
                        <span
                          key={project}
                          className="px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-300"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Skills */}
                {selectedSkill.relatedSkills && selectedSkill.relatedSkills.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Related Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.relatedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {selectedSkill.certifications && selectedSkill.certifications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-400"
                        >
                          <Award className="w-3 h-3 inline mr-1" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedSkill.tags && selectedSkill.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
