'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import {
  SkillCard,
  SkillGrid,
  SkillCategorySection,
  ExpandableSkillCard,
  SkillProgress,
  SkillStat,
  ProjectTag,
} from './ui/SkillCard';
import { MiniArchGraph, ArchNode, ArchEdge } from './MiniArchGraph';
import { SectionTitle, AnimatedLetters, GradientText } from './ui/Typography';
import { motion } from 'framer-motion';
import { Tabs } from './ui/Timeline';
import { Badge } from './ui/Badge';

export function ComprehensiveSkillsV2() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCvOnly, setShowCvOnly] = useState(false);
  const [selectedCvTag, setSelectedCvTag] = useState<string>('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Polished pass toggles
  const [includePlanned, setIncludePlanned] = useState(true);
  const [showPatterns, setShowPatterns] = useState(true);
  const [showArchitecture, setShowArchitecture] = useState(true);
  const [showApis, setShowApis] = useState(true);

  const handleCategoryChange = (category: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsTransitioning(false);
    }, 150);
  };

  // Programming Languages
  const programmingLanguages = [
    {
      title: 'TypeScript',
      icon: '{ }',
      iconColor: 'from-blue-400 to-blue-600',
      level: 'Expert' as const,
      years: 6,
      description: 'Primary language for all frontend and backend development',
      projects: ['QuizMentor', 'DevMentor', 'Chameleon', 'Voice', 'Portfolio'],
      additionalTags: ['All projects'],
      projectCount: 10,
      proficiency: 95,
    },
    {
      title: 'Python',
      icon: 'Py',
      iconColor: 'from-green-400 to-emerald-600',
      level: 'Expert' as const,
      years: 7,
      description: 'AI/ML development, FastAPI backends, data processing',
      projects: ['Chameleon', 'DevMentor', 'ML Services'],
      projectCount: 5,
      proficiency: 90,
    },
    {
      title: 'JavaScript',
      icon: 'JS',
      iconColor: 'from-yellow-400 to-orange-500',
      level: 'Expert' as const,
      years: 8,
      description: 'ES6+, Node.js runtime, browser APIs',
      projects: ['Portfolio', 'QuizMentor Web', 'All web projects'],
      projectCount: 15,
      proficiency: 95,
    },
    {
      title: 'Go',
      icon: 'Go',
      iconColor: 'from-cyan-400 to-blue-500',
      level: 'Advanced' as const,
      years: 3,
      description: 'High-performance microservices, CLI tools',
      projects: ['Backend services'],
      projectCount: 3,
      proficiency: 75,
    },
    {
      title: 'Rust',
      icon: 'Rs',
      iconColor: 'from-orange-400 to-red-500',
      level: 'Intermediate' as const,
      years: 2,
      description: 'Systems programming, WebAssembly modules',
      projects: ['WASM components'],
      projectCount: 2,
      proficiency: 60,
    },
    {
      title: 'Java',
      icon: <Coffee className="w-5 h-5" />,
      iconColor: 'from-red-400 to-orange-500',
      level: 'Advanced' as const,
      years: 5,
      description: 'Enterprise applications, Spring Boot',
      projects: ['Enterprise systems'],
      projectCount: 4,
      proficiency: 80,
    },
    {
      title: 'Swift',
      icon: 'Sw',
      iconColor: 'from-orange-400 to-pink-500',
      level: 'Advanced' as const,
      years: 3,
      description: 'iOS native modules and integrations',
      projects: ['PatientSky', 'ExSeed'],
      projectCount: 3,
      proficiency: 80,
    },
    {
      title: 'Kotlin',
      icon: 'Kt',
      iconColor: 'from-purple-400 to-indigo-500',
      level: 'Advanced' as const,
      years: 3,
      description: 'Android native modules and integrations',
      projects: ['PatientSky', 'ExSeed'],
      projectCount: 3,
      proficiency: 80,
    },
    {
      title: 'Dart',
      icon: 'D',
      iconColor: 'from-cyan-400 to-teal-500',
      level: 'Intermediate' as const,
      years: 2,
      description: 'Flutter app development and POCs',
      projects: ['ExSeed'],
      projectCount: 2,
      proficiency: 70,
    },
    {
      title: 'C++',
      icon: 'C++',
      iconColor: 'from-gray-400 to-slate-500',
      level: 'Intermediate' as const,
      years: 2,
      description: 'Computer Vision integrations and native performance work',
      projects: ['ExSeed'],
      projectCount: 2,
      proficiency: 65,
    },
    {
      title: 'Bash',
      icon: <Terminal className="w-5 h-5" />,
      iconColor: 'from-gray-500 to-gray-700',
      level: 'Advanced' as const,
      years: 5,
      description: 'Automation, provisioning, CI/CD scripting',
      projects: ['Cinemataztic', 'ExSeed', 'Portfolio'],
      projectCount: 6,
      proficiency: 85,
    },
  ];

  // Frontend Stack
  const frontendStack = [
    {
      title: 'React & Next.js',
      icon: <Layers className="w-5 h-5" />,
      iconColor: 'from-cyan-400 to-blue-500',
      level: 'Expert' as const,
      years: 6,
      description: 'SSR, SSG, ISR, React Server Components, App Router',
      projects: ['QuizMentor', 'DevMentor', 'Chameleon', 'Voice', 'Portfolio'],
      projectCount: 8,
      proficiency: 95,
    },
    {
      title: 'React Native',
      icon: <Smartphone className="w-5 h-5" />,
      iconColor: 'from-purple-400 to-pink-500',
      level: 'Expert' as const,
      years: 4,
      description: 'Expo, native modules, 60+ custom animations',
      projects: ['QuizMentor Mobile'],
      projectCount: 3,
      proficiency: 90,
    },
    {
      title: 'Tailwind CSS',
      icon: <Palette className="w-5 h-5" />,
      iconColor: 'from-teal-400 to-cyan-500',
      level: 'Expert' as const,
      years: 3,
      description: 'Utility-first CSS, custom plugins, design systems',
      projects: ['All projects'],
      projectCount: 10,
      proficiency: 95,
    },
    {
      title: 'Redux & Zustand',
      icon: <Database className="w-5 h-5" />,
      iconColor: 'from-purple-400 to-purple-600',
      level: 'Expert' as const,
      years: 5,
      description: 'State management, Redux Toolkit, RTK Query',
      projects: ['QuizMentor', 'DevMentor', 'Complex apps'],
      projectCount: 6,
      proficiency: 90,
    },
    {
      title: 'Framer Motion',
      icon: <Sparkles className="w-5 h-5" />,
      iconColor: 'from-pink-400 to-purple-500',
      level: 'Advanced' as const,
      years: 3,
      description: 'Complex animations, gestures, transitions',
      projects: ['Portfolio', 'QuizMentor', 'Voice'],
      projectCount: 5,
      proficiency: 85,
    },
    {
      title: 'Vue.js',
      icon: 'V',
      iconColor: 'from-green-400 to-green-600',
      level: 'Advanced' as const,
      years: 3,
      description: 'Vue 3, Composition API, Nuxt.js',
      projects: ['Client projects'],
      projectCount: 3,
      proficiency: 75,
    },
    {
      title: 'Flutter',
      icon: 'Fl',
      iconColor: 'from-blue-400 to-cyan-500',
      level: 'Intermediate' as const,
      years: 2,
      description: 'Modular architecture, multi‑platform build orchestration',
      projects: ['ExSeed'],
      projectCount: 2,
      proficiency: 70,
    },
  ];

  // Backend Technologies
  const backendStack = [
    {
      title: 'Node.js',
      icon: <Server className="w-5 h-5" />,
      iconColor: 'from-green-400 to-green-600',
      level: 'Expert' as const,
      years: 6,
      description: 'Express, Fastify, NestJS, microservices',
      projects: ['All backends'],
      projectCount: 10,
      proficiency: 95,
    },
    {
      title: 'FastAPI',
      icon: <Rocket className="w-5 h-5" />,
      iconColor: 'from-green-400 to-teal-500',
      level: 'Advanced' as const,
      years: 3,
      description: 'High-performance Python APIs, async/await',
      projects: ['Chameleon'],
      projectCount: 4,
      proficiency: 85,
    },
    {
      title: 'GraphQL',
      icon: <GitBranch className="w-5 h-5" />,
      iconColor: 'from-pink-400 to-purple-500',
      level: 'Advanced' as const,
      years: 4,
      description: 'Apollo Server, Federation, Subscriptions',
      projects: ['Enterprise APIs'],
      projectCount: 3,
      proficiency: 80,
    },
    {
      title: 'WebSockets',
      icon: <Network className="w-5 h-5" />,
      iconColor: 'from-blue-400 to-cyan-500',
      level: 'Expert' as const,
      years: 5,
      description: 'Socket.io, real-time features, WebRTC',
      projects: ['QuizMentor battles'],
      projectCount: 5,
      proficiency: 90,
    },
    {
      title: 'REST APIs',
      icon: <Link className="w-5 h-5" />,
      iconColor: 'from-orange-400 to-yellow-500',
      level: 'Expert' as const,
      years: 8,
      description: 'RESTful design, OpenAPI, versioning',
      projects: ['All APIs'],
      projectCount: 15,
      proficiency: 95,
    },
    {
      title: 'Microservices',
      icon: <Boxes className="w-5 h-5" />,
      iconColor: 'from-purple-400 to-blue-500',
      level: 'Advanced' as const,
      years: 4,
      description: 'Service mesh, API gateway, event-driven',
      projects: ['Enterprise apps'],
      projectCount: 4,
      proficiency: 85,
    },
    {
      title: 'WebRTC',
      icon: <Video className="w-5 h-5" />,
      iconColor: 'from-red-400 to-orange-500',
      level: 'Advanced' as const,
      years: 3,
      description: 'Low-latency audio/video, signaling, TURN/STUN',
      projects: ['PatientSky'],
      projectCount: 3,
      proficiency: 80,
    },
  ];

  // Cloud & DevOps
  const cloudDevOps = [
    {
      title: 'AWS',
      icon: <Cloud className="w-5 h-5" />,
      iconColor: 'from-orange-400 to-yellow-500',
      level: 'Expert' as const,
      years: 5,
      description: 'EC2, Lambda, S3, RDS, CloudFront, ECS',
      projects: ['All cloud infra'],
      projectCount: 8,
      proficiency: 90,
    },
    {
      title: 'Docker',
      icon: <Package className="w-5 h-5" />,
      iconColor: 'from-blue-400 to-blue-600',
      level: 'Expert' as const,
      years: 5,
      description: 'Multi-stage builds, compose, optimization',
      projects: ['All projects'],
      projectCount: 10,
      proficiency: 95,
    },
    {
      title: 'Kubernetes',
      icon: <Boxes className="w-5 h-5" />,
      iconColor: 'from-blue-400 to-cyan-500',
      level: 'Advanced' as const,
      years: 3,
      description: 'Helm, Istio, monitoring, scaling',
      projects: ['Production apps'],
      projectCount: 4,
      proficiency: 80,
    },
    {
      title: 'CI/CD',
      icon: <GitBranch className="w-5 h-5" />,
      iconColor: 'from-green-400 to-blue-500',
      level: 'Expert' as const,
      years: 6,
      description: 'GitHub Actions, Jenkins, GitLab CI',
      projects: ['All projects'],
      projectCount: 10,
      proficiency: 95,
    },
    {
      title: 'Terraform',
      icon: <Workflow className="w-5 h-5" />,
      iconColor: 'from-purple-400 to-purple-600',
      level: 'Advanced' as const,
      years: 3,
      description: 'IaC, modules, state management',
      projects: ['Cloud infra'],
      projectCount: 3,
      proficiency: 75,
    },
    {
      title: 'Monitoring',
      icon: <Activity className="w-5 h-5" />,
      iconColor: 'from-green-400 to-emerald-500',
      level: 'Advanced' as const,
      years: 4,
      description: 'Grafana, Prometheus, ELK Stack',
      projects: ['Production apps'],
      projectCount: 5,
      proficiency: 85,
    },
    {
      title: 'Ansible',
      icon: <Workflow className="w-5 h-5" />,
      iconColor: 'from-orange-400 to-red-500',
      level: 'Advanced' as const,
      years: 3,
      description: 'Provisioning, remote support, playbooks',
      projects: ['Cinemataztic'],
      projectCount: 3,
      proficiency: 85,
    },
    {
      title: 'Linux Systems',
      icon: <HardDrive className="w-5 h-5" />,
      iconColor: 'from-gray-500 to-slate-600',
      level: 'Advanced' as const,
      years: 6,
      description: 'SSH, certificates, processes, troubleshooting',
      projects: ['Cinemataztic', 'Portfolio'],
      projectCount: 6,
      proficiency: 90,
    },
    {
      title: 'Networking',
      icon: <Network className="w-5 h-5" />,
      iconColor: 'from-blue-400 to-indigo-500',
      level: 'Advanced' as const,
      years: 5,
      description: 'TCP/UDP, IPv4/6, DNS, LAN, gateways',
      projects: ['Cinemataztic'],
      projectCount: 5,
      proficiency: 85,
    },
    {
      title: 'Security',
      icon: <Shield className="w-5 h-5" />,
      iconColor: 'from-green-500 to-emerald-600',
      level: 'Advanced' as const,
      years: 5,
      description: 'IAM, RBAC, CSP, cookies/tokens, auth flows',
      projects: ['Queue-it', 'Cinemataztic'],
      projectCount: 5,
      proficiency: 85,
    },
    {
      title: 'CDN & Edge',
      icon: <Cloud className="w-5 h-5" />,
      iconColor: 'from-teal-400 to-cyan-500',
      level: 'Advanced' as const,
      years: 4,
      description: 'CDN integrations, caching, headers and policies',
      projects: ['Queue-it'],
      projectCount: 4,
      proficiency: 80,
    },
  ];

  // AI/ML Stack
  const aimlStack = [
    {
      title: 'LangChain',
      icon: <Brain className="w-5 h-5" />,
      iconColor: 'from-purple-400 to-pink-500',
      level: 'Expert' as const,
      years: 2,
      description: 'Chains, agents, RAG, memory systems',
      projects: ['DevMentor', 'Chameleon'],
      projectCount: 4,
      proficiency: 90,
    },
    {
      title: 'OpenAI APIs',
      icon: <Sparkles className="w-5 h-5" />,
      iconColor: 'from-green-400 to-cyan-500',
      level: 'Expert' as const,
      years: 2,
      description: 'GPT-4, function calling, embeddings',
      projects: ['All AI projects'],
      projectCount: 6,
      proficiency: 95,
    },
    {
      title: 'Vector DBs',
      icon: <Database className="w-5 h-5" />,
      iconColor: 'from-blue-400 to-purple-500',
      level: 'Advanced' as const,
      years: 2,
      description: 'Qdrant, Pinecone, semantic search',
      projects: ['DevMentor', 'Chameleon', 'RAG apps'],
      projectCount: 3,
      proficiency: 85,
    },
    {
      title: 'Prompt Engineering',
      icon: <FileCode className="w-5 h-5" />,
      iconColor: 'from-yellow-400 to-orange-500',
      level: 'Expert' as const,
      years: 2,
      description: 'Few-shot, chain-of-thought, templates',
      projects: ['All AI apps'],
      projectCount: 8,
      proficiency: 95,
    },
    {
      title: 'Local Models',
      icon: <Cpu className="w-5 h-5" />,
      iconColor: 'from-gray-400 to-gray-600',
      level: 'Advanced' as const,
      years: 1,
      description: 'Ollama, llama.cpp, optimization',
      projects: ['Voice'],
      projectCount: 2,
      proficiency: 75,
    },
    {
      title: 'Fine-tuning',
      icon: <Gauge className="w-5 h-5" />,
      iconColor: 'from-red-400 to-orange-500',
      level: 'Intermediate' as const,
      years: 1,
      description: 'LoRA, QLoRA, dataset preparation',
      projects: ['Research'],
      projectCount: 2,
      proficiency: 65,
    },
  ];

  // Databases
  const databases = [
    {
      title: 'PostgreSQL',
      icon: <Database className="w-5 h-5" />,
      iconColor: 'from-blue-400 to-blue-600',
      level: 'Expert' as const,
      years: 7,
      description: 'Complex queries, optimization, replication',
      projects: ['All production'],
      projectCount: 10,
      proficiency: 95,
    },
    {
      title: 'MongoDB',
      icon: <Layers className="w-5 h-5" />,
      iconColor: 'from-green-400 to-green-600',
      level: 'Advanced' as const,
      years: 5,
      description: 'Aggregation, indexing, sharding',
      projects: ['Real-time apps'],
      projectCount: 5,
      proficiency: 85,
    },
    {
      title: 'Redis',
      icon: <Zap className="w-5 h-5" />,
      iconColor: 'from-red-400 to-red-600',
      level: 'Advanced' as const,
      years: 4,
      description: 'Caching, pub/sub, queues, sessions',
      projects: ['High-perf services'],
      projectCount: 6,
      proficiency: 85,
    },
    {
      title: 'Supabase',
      icon: <Shield className="w-5 h-5" />,
      iconColor: 'from-green-400 to-emerald-500',
      level: 'Expert' as const,
      years: 2,
      description: 'Realtime, auth, RLS, edge functions',
      projects: ['QuizMentor'],
      projectCount: 3,
      proficiency: 90,
    },
    {
      title: 'SQLite',
      icon: <FileJson className="w-5 h-5" />,
      iconColor: 'from-gray-400 to-gray-600',
      level: 'Advanced' as const,
      years: 5,
      description: 'Embedded databases, mobile apps',
      projects: ['Local apps'],
      projectCount: 4,
      proficiency: 80,
    },
    {
      title: 'Elasticsearch',
      icon: <Gauge className="w-5 h-5" />,
      iconColor: 'from-yellow-400 to-orange-500',
      level: 'Intermediate' as const,
      years: 2,
      description: 'Full-text search, analytics',
      projects: ['Search features'],
      projectCount: 2,
      proficiency: 70,
    },
    {
      title: 'DynamoDB',
      icon: <Database className="w-5 h-5" />,
      iconColor: 'from-amber-400 to-yellow-500',
      level: 'Intermediate' as const,
      years: 2,
      description: 'Key-value/NoSQL patterns for connectors and infra',
      projects: ['Queue-it'],
      projectCount: 2,
      proficiency: 70,
    },
  ];

  // Testing & Quality
  const testing = [
    {
      title: 'Jest',
      icon: <TestTube className="w-5 h-5" />,
      iconColor: 'from-red-400 to-red-600',
      level: 'Expert' as const,
      years: 5,
      description: 'Unit testing, coverage, mocking',
      projects: ['All JS projects'],
      projectCount: 10,
      proficiency: 95,
    },
    {
      title: 'Cypress',
      icon: <CheckCircle className="w-5 h-5" />,
      iconColor: 'from-green-400 to-emerald-500',
      level: 'Advanced' as const,
      years: 3,
      description: 'E2E testing, component testing',
      projects: ['Web apps'],
      projectCount: 5,
      proficiency: 85,
    },
    {
      title: 'Playwright',
      icon: <Workflow className="w-5 h-5" />,
      iconColor: 'from-purple-400 to-pink-500',
      level: 'Advanced' as const,
      years: 2,
      description: 'Cross-browser testing, automation',
      projects: ['E2E tests'],
      projectCount: 3,
      proficiency: 80,
    },
    {
      title: 'React Testing Library',
      icon: <Layers className="w-5 h-5" />,
      iconColor: 'from-blue-400 to-cyan-500',
      level: 'Expert' as const,
      years: 4,
      description: 'Component testing, user events',
      projects: ['React apps'],
      projectCount: 8,
      proficiency: 90,
    },
    {
      title: 'PyTest',
      icon: 'Py',
      iconColor: 'from-green-400 to-emerald-600',
      level: 'Advanced' as const,
      years: 3,
      description: 'Python testing, fixtures, plugins',
      projects: ['Python projects'],
      projectCount: 4,
      proficiency: 85,
    },
    {
      title: 'ESLint & Prettier',
      icon: <AlertCircle className="w-5 h-5" />,
      iconColor: 'from-yellow-400 to-orange-500',
      level: 'Expert' as const,
      years: 6,
      description: 'Code quality, formatting, custom rules',
      projects: ['All projects'],
      projectCount: 10,
      proficiency: 95,
    },
  ];

  const allSkills = [
    ...programmingLanguages,
    ...frontendStack,
    ...backendStack,
    ...cloudDevOps,
    ...aimlStack,
    ...databases,
    ...testing,
  ];

  const categories = [
    { id: 'all', label: 'All Skills', count: allSkills.length },
    { id: 'languages', label: 'Languages', count: programmingLanguages.length },
    { id: 'frontend', label: 'Frontend', count: frontendStack.length },
    { id: 'backend', label: 'Backend', count: backendStack.length },
    { id: 'cloud', label: 'Cloud & DevOps', count: cloudDevOps.length },
    { id: 'aiml', label: 'AI/ML', count: aimlStack.length },
    { id: 'databases', label: 'Databases', count: databases.length },
    { id: 'testing', label: 'Testing', count: testing.length },
  ];

  const getSkillsByCategory = (category: string) => {
    switch (category) {
      case 'languages':
        return programmingLanguages;
      case 'frontend':
        return frontendStack;
      case 'backend':
        return backendStack;
      case 'cloud':
        return cloudDevOps;
      case 'aiml':
        return aimlStack;
      case 'databases':
        return databases;
      case 'testing':
        return testing;
      default:
        return allSkills;
    }
  };

  const currentSkills = getSkillsByCategory(selectedCategory);

  // Project snapshots & docs
  const projectMeta = {
    quizmentor: {
      name: 'QuizMentor',
      securitySnapshot: 'Supabase RLS; PII minimization; redaction',
      securityDocUrl: '/docs/_quizmentor/security/SECURITY_HARDENING_BLUEPRINT.md',
      pipelineUrl: '/docs/_quizmentor/PRODUCTION_ARCHITECTURE.md',
    },
    devmentor: {
      name: 'DevMentor',
      securitySnapshot: 'JWT edge; mTLS mesh; RBAC',
      securityDocUrl: '/docs/_devmentor/security/SECURITY_HARDENING_BLUEPRINT.md',
    },
    harvest: {
      name: 'Chameleon',
      securitySnapshot: 'BYOK ephemeral default; encrypted opt-in',
      securityDocUrl: '/docs/_harvest/security/SECURITY_HARDENING_BLUEPRINT.md',
    },
  } as const;

  // Planned & Documented tech (from docs/UI)
  const plannedTech = [
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
  ];

  // Key endpoints directory (concise)
  const apiDirectory: Record<string, string[]> = {
    quizmentor: [
      'POST /api/orchestrator/session — Generate adaptive quiz session',
      'POST /api/adaptive/adjust — Adjust difficulty during session',
      'POST /api/bloom/validate — Validate pedagogy/Bloom alignment',
      'POST /api/sessions/{id}/results — Submit results',
      'GET /api/analytics/user/{userId} — User analytics',
    ],
    devmentor: [
      'POST /api/recommendations/learning-path — Learning Service',
      'POST /api/prompts/suggestions — Prompt suggestions',
      'POST /memories/search — Memory Service semantic search',
      'GET /memories/insights — User insights',
      'POST /api/prompts/optimize-model — Model routing',
    ],
    harvest: [
      'POST /api/generate — Create content job (SSE supported)',
      'GET /api/jobs/{jobId} — Job status/results',
      'POST /api/validate-key — Validate BYOK key',
      'GET /health — Health',
      'GET /metrics — Metrics',
    ],
  };

  // Architecture graphs
  const archGraphs: Record<string, { nodes: ArchNode[]; edges: ArchEdge[] }> = {
    quizmentor: {
      nodes: [
        { id: 'app', label: 'App (Next/Expo)', color: '#22d3ee' },
        { id: 'api', label: 'API Routes', color: '#22c55e' },
        { id: 'supabase', label: 'Supabase (RLS)', color: '#a78bfa' },
        { id: 'redis', label: 'Redis (Cache)', color: '#f59e0b' },
        { id: 'qdrant', label: 'Qdrant (Vectors)', color: '#f472b6' },
        { id: 'harvester', label: 'Harvester', color: '#06b6d4' },
        {
          id: 'compliance',
          label: 'Compliance Guard (robots.txt/ToS/rate limit)',
          color: '#60a5fa',
        },
        { id: 'queue', label: 'Queue/Workers', color: '#facc15' },
      ],
      edges: [
        { from: 'app', to: 'api' },
        { from: 'api', to: 'supabase' },
        { from: 'api', to: 'redis' },
        { from: 'api', to: 'qdrant' },
        { from: 'api', to: 'harvester' },
        { from: 'harvester', to: 'compliance' },
        { from: 'harvester', to: 'queue' },
      ],
    },
    'quizmentor-harvester': {
      nodes: [
        { id: 'gateway', label: 'Gateway/API', color: '#22c55e' },
        { id: 'harvester', label: 'Harvester', color: '#06b6d4' },
        { id: 'compliance', label: 'Compliance Guard', color: '#60a5fa' },
        { id: 'queue', label: 'Queue/Workers', color: '#facc15' },
        { id: 'extractor', label: 'Extractor', color: '#a78bfa' },
        { id: 'validator', label: 'PII/License Validator', color: '#f59e0b' },
        { id: 'aiq', label: 'AI Quality Scoring', color: '#f472b6' },
        { id: 'store', label: 'Storage/DB', color: '#10b981' },
      ],
      edges: [
        { from: 'gateway', to: 'harvester' },
        { from: 'harvester', to: 'compliance' },
        { from: 'harvester', to: 'queue' },
        { from: 'queue', to: 'extractor' },
        { from: 'extractor', to: 'validator' },
        { from: 'validator', to: 'aiq' },
        { from: 'aiq', to: 'store' },
      ],
    },
    devmentor: {
      nodes: [
        { id: 'vscode', label: 'VS Code Ext', color: '#38bdf8' },
        { id: 'gateway', label: 'API Gateway', color: '#22c55e' },
        { id: 'ai', label: 'AI Gateway (Routing)', color: '#34d399' },
        { id: 'learning', label: 'Learning Svc', color: '#a78bfa' },
        { id: 'memory', label: 'Memory Svc', color: '#f59e0b' },
        { id: 'providers', label: 'Providers', color: '#f43f5e' },
        { id: 'qdrant', label: 'Qdrant', color: '#f472b6' },
        { id: 'postgres', label: 'Postgres', color: '#10b981' },
      ],
      edges: [
        { from: 'vscode', to: 'gateway' },
        { from: 'gateway', to: 'learning' },
        { from: 'gateway', to: 'memory' },
        { from: 'gateway', to: 'ai' },
        { from: 'ai', to: 'providers' },
        { from: 'memory', to: 'qdrant' },
        { from: 'memory', to: 'postgres' },
      ],
    },
    harvest: {
      nodes: [
        { id: 'client', label: 'Client', color: '#22d3ee' },
        { id: 'gateway', label: 'API Gateway', color: '#22c55e' },
        { id: 'orchestrator', label: 'Job Orchestrator', color: '#f59e0b' },
        { id: 'extractor', label: 'Extractor', color: '#a78bfa' },
        { id: 'generator', label: 'AI Generator', color: '#f472b6' },
        { id: 'providers', label: 'Providers', color: '#f43f5e' },
        { id: 'store', label: 'Storage/DB', color: '#10b981' },
      ],
      edges: [
        { from: 'client', to: 'gateway' },
        { from: 'gateway', to: 'orchestrator' },
        { from: 'orchestrator', to: 'extractor' },
        { from: 'orchestrator', to: 'generator' },
        { from: 'generator', to: 'providers' },
        { from: 'generator', to: 'store' },
        { from: 'extractor', to: 'store' },
      ],
    },
  };

  // Patterns index (docs + storybook deep links where relevant)
  const storyRoot = '/storybook-static/iframe.html';
  const patterns = [
    {
      category: 'API & Contracts',
      items: [
        {
          name: 'Contract-first APIs',
          docUrl: '/docs/_devmentor/security/SECURITY_HARDENING_BLUEPRINT.md',
          storyId: 'portfolio-interactiveportfolio--docs',
          summary: 'OpenAPI-first, MSW mocks, Swagger in Storybook',
        },
        {
          name: 'Streaming (SSE)',
          docUrl: '/docs/_harvest/COMPLETE_SELF_HOSTED_ARCHITECTURE.md',
          storyId: 'ui-loaders--docs',
          summary: 'Stream progressive output with loaders and fallbacks',
        },
      ],
    },
    {
      category: 'Security & Compliance',
      items: [
        {
          name: 'Security Blueprints',
          docUrl: projectMeta.devmentor.securityDocUrl,
          storyId: 'guides-engineering-notes--default',
          summary: 'Edge JWT, mTLS mesh, RBAC/OPA',
        },
        {
          name: 'Content Harvester Compliance',
          docUrl: projectMeta.quizmentor.pipelineUrl,
          storyId: 'guides-accessibility-testing--default',
          summary: 'robots/ToS/license, PII redaction, audit logs',
        },
      ],
    },
    {
      category: 'Observability & Quality',
      items: [
        {
          name: 'E2E + Visual Testing',
          docUrl: '/docs/_quizmentor/TESTING_STRATEGY_COMPLETE.md',
          storyId: 'portfolio-portfoliodashboard--docs',
          summary: 'Playwright smokes, visual baselines',
        },
        {
          name: 'Performance Budgets',
          docUrl: '/docs/_quizmentor/PRODUCTION_ARCHITECTURE.md',
          storyId: 'ui-stats--docs',
          summary: 'p95 latency, cache tiers, budgets',
        },
      ],
    },
  ];

  // CV-linked use cases per skill title
  type CVCase = { text: string; tags: string[] };
  const cvUseCases: Record<string, CVCase[]> = {
    // Languages
    TypeScript: [
      {
        text: 'Built BFF/middleware and domain modules in Express at Cinemataztic (auth, sessions, security)',
        tags: ['Cinemataztic'],
      },
      {
        text: 'Implemented type-safe SDKs and UI state patterns across DevMentor and portfolio',
        tags: ['DevMentor', 'Portfolio'],
      },
      {
        text: 'Authored reusable utilities and patterns documented in the internal developer handbook',
        tags: ['ExSeed'],
      },
    ],
    JavaScript: [
      {
        text: 'Maintained Queue‑it JavaScript connectors (OOP patterns) for CDN/client integrations',
        tags: ['Queue-it'],
      },
      {
        text: 'Interactive UI behaviors in the portfolio (terminal, navigation, animations)',
        tags: ['Portfolio'],
      },
    ],
    Python: [
      {
        text: 'FastAPI microservices powering Chameleon multi‑agent pipeline',
        tags: ['Chameleon'],
      },
      {
        text: 'LangChain tooling for RAG, scoring, and orchestration',
        tags: ['DevMentor', 'Chameleon'],
      },
    ],
    Go: [
      {
        text: 'CLI and microservice prototypes for high‑performance tasks and internal tooling',
        tags: ['Portfolio'],
      },
    ],
    Rust: [
      { text: 'WASM component experiments for perf‑critical browser modules', tags: ['Portfolio'] },
    ],
    Java: [
      {
        text: 'Android/Java connector work and protocol debugging with CDN integrations',
        tags: ['Queue-it'],
      },
    ],

    // Frontend
    'React & Next.js': [
      {
        text: 'Built portfolio and internal tools with SSR/ISR and React Server Components',
        tags: ['Portfolio'],
      },
      {
        text: 'Authored Storybook docs for project suites (QuizMentor, DevMentor, Chameleon)',
        tags: ['QuizMentor', 'DevMentor', 'Chameleon'],
      },
    ],
    'React Native': [
      {
        text: 'Implemented tailored WebRTC video‑call flows for iOS/Android',
        tags: ['PatientSky'],
      },
      {
        text: 'Delivered 60+ custom animations and WCAG accessibility improvements; rating 5★ up from 3 in 6 months; load time −20%',
        tags: ['PatientSky'],
      },
      {
        text: 'Slot patterns and event-driven design to decouple screens and flows',
        tags: ['PatientSky'],
      },
    ],
    'Tailwind CSS': [
      {
        text: 'Built a cohesive design system in the portfolio and project dashboards',
        tags: ['Portfolio'],
      },
      { text: 'Improved accessibility and readability for mobile UI', tags: ['PatientSky'] },
      {
        text: 'Storybook documentation for projects for consistent UI references',
        tags: ['QuizMentor', 'DevMentor', 'Chameleon'],
      },
    ],
    'Redux & Zustand': [
      {
        text: 'Managed complex app state in QuizMentor and DevMentor with predictable data flows',
        tags: ['QuizMentor', 'DevMentor'],
      },
      {
        text: 'Introduced testable store boundaries to enable unit/component testing',
        tags: ['PatientSky'],
      },
    ],
    'Framer Motion': [
      {
        text: 'Created 60+ animation patterns in QuizMentor and portfolio for responsive UX',
        tags: ['QuizMentor', 'Portfolio'],
      },
      {
        text: 'Optimized motion performance to keep mobile interactions fluid',
        tags: ['QuizMentor'],
      },
    ],
    'Vue.js': [
      {
        text: 'Delivered client dashboards and internal tools using Vue 3/Composition API',
        tags: ['Portfolio'],
      },
    ],

    // Backend & APIs
    WebRTC: [
      {
        text: 'TURN/STUN setup, signaling flows, and platform tailoring for iOS/Android',
        tags: ['PatientSky'],
      },
    ],
    'Node.js': [
      { text: 'Built BFF to decouple complex flows and enable unit testing', tags: ['PatientSky'] },
      { text: 'Middleware and auth/session management', tags: ['Cinemataztic'] },
    ],
    FastAPI: [{ text: 'Developed AI services and pipelines', tags: ['Chameleon'] }],
    GraphQL: [
      { text: 'Designed and maintained enterprise APIs and subscriptions', tags: ['Portfolio'] },
      {
        text: 'Schema versioning and contract-first collaboration with frontend teams',
        tags: ['Portfolio'],
      },
    ],
    WebSockets: [
      { text: 'Real‑time battles, leaderboards and team competitions', tags: ['QuizMentor'] },
      {
        text: 'Live collaboration channels and presence indicators in dev tools',
        tags: ['DevMentor'],
      },
    ],
    'REST APIs': [
      { text: 'Versioned endpoints with OpenAPI and auth', tags: ['Cinemataztic'] },
      { text: 'Connector-facing HTTP flows and header/cookie policy handling', tags: ['Queue-it'] },
    ],
    Microservices: [
      { text: 'Event‑driven BFF boundaries to reduce coupling', tags: ['PatientSky'] },
      { text: 'Service‑mesh patterns (Istio) and rollout strategies', tags: ['Cinemataztic'] },
    ],

    // Cloud & Ops
    AWS: [
      {
        text: 'Lambda, S3, EC2, Route 53, DynamoDB, Load Balancers and API Gateway',
        tags: ['Queue-it'],
      },
      { text: 'High‑load traffic event readiness and monitoring (DevDuty)', tags: ['Queue-it'] },
    ],
    Docker: [
      {
        text: 'Standardized multi‑stage builds and local dev containers; faster CI',
        tags: ['Cinemataztic', 'Portfolio'],
      },
    ],
    Kubernetes: [
      { text: 'Deployed services with Helm charts and FluxCD', tags: ['Cinemataztic'] },
      { text: 'Improved observability via Istio sidecars', tags: ['Cinemataztic'] },
      {
        text: 'Controlled rollouts, feature flags, and canaries across services',
        tags: ['Cinemataztic'],
      },
    ],
    'CI/CD': [
      {
        text: 'GitHub Actions/Jenkins pipelines, controlled rollouts, feature flags and canaries',
        tags: ['Cinemataztic', 'Portfolio'],
      },
      { text: 'FluxCD GitOps deployments with chart repositories', tags: ['Cinemataztic'] },
    ],
    Terraform: [
      {
        text: 'Reusable IaC modules and stateful resources for cloud prototypes',
        tags: ['Portfolio'],
      },
    ],
    Monitoring: [
      { text: 'Grafana/Prometheus dashboards, alert rules and SLOs', tags: ['Cinemataztic'] },
      { text: 'Lens/Weave for cluster insights and incident debugging', tags: ['Cinemataztic'] },
    ],

    // AI/ML
    LangChain: [
      { text: 'Agents/chains for content transformation and validation', tags: ['Chameleon'] },
      { text: 'RAG pipelines and memory primitives for learning features', tags: ['DevMentor'] },
    ],
    'OpenAI APIs': [
      {
        text: 'Function calling, embeddings, and cost‑aware routing across providers',
        tags: ['DevMentor', 'Chameleon'],
      },
      { text: 'Prompt safety/validation layers for production tools', tags: ['DevMentor'] },
    ],
    'Vector DBs': [
      {
        text: 'Qdrant/Pinecone indexes for semantic search and recommendation',
        tags: ['DevMentor', 'Chameleon'],
      },
    ],
    'Prompt Engineering': [
      {
        text: 'System/prompt templates with tool/argument schemas for reliable outputs',
        tags: ['DevMentor'],
      },
      { text: 'Pattern‑based prompts that adapt to repository conventions', tags: ['DevMentor'] },
    ],
    'Local Models': [
      {
        text: 'Ollama/Whisper local workflows and fallbacks for privacy‑first features',
        tags: ['Voice'],
      },
    ],
    'Fine-tuning': [
      {
        text: 'LoRA/QLoRA experiments and dataset curation for domain adaptation',
        tags: ['Portfolio'],
      },
    ],

    // Data
    DynamoDB: [
      {
        text: 'Used in connector/infrastructure contexts for scalable sessions and state',
        tags: ['Queue-it'],
      },
    ],
    PostgreSQL: [
      { text: 'Supabase (Postgres) schema design and RLS rules', tags: ['QuizMentor'] },
      {
        text: 'Performance tuning with indexes and query analysis for reporting',
        tags: ['Portfolio'],
      },
    ],
    MongoDB: [
      { text: 'Express + MongoDB BFF for auth/session flows', tags: ['Cinemataztic'] },
      { text: 'Aggregation pipelines for analytics queries', tags: ['Cinemataztic'] },
    ],
    Redis: [
      { text: 'Caching/session/token flows in connectors and services', tags: ['Queue-it'] },
      { text: 'Queueing and pub/sub for real‑time features', tags: ['QuizMentor'] },
    ],
    Supabase: [
      { text: 'Self‑hosted analytics and realtime features', tags: ['QuizMentor'] },
      { text: 'Auth, RLS and edge functions for mobile/web parity', tags: ['QuizMentor'] },
    ],
    SQLite: [
      { text: 'Offline‑first caches and local storage for mobile workflows', tags: ['Portfolio'] },
    ],
    Elasticsearch: [
      { text: 'Search/analytics prototypes for content discovery and logs', tags: ['Portfolio'] },
    ],

    // Systems & Ops
    Ansible: [
      {
        text: 'Provisioning, remote support via SSH, and automation playbooks',
        tags: ['Cinemataztic'],
      },
    ],
    'Linux Systems': [
      { text: 'Certificates, process/network debugging, system hardening', tags: ['Cinemataztic'] },
    ],
    Networking: [{ text: 'TCP/UDP, IPv4/6, DNS, gateways, whitelisting', tags: ['Cinemataztic'] }],
    Security: [
      {
        text: 'IAM/RBAC, cookies/tokens, CSP and policies across CDN/client',
        tags: ['Queue-it', 'Cinemataztic'],
      },
    ],
    'CDN & Edge': [
      { text: 'Header and cache policy design for high-load events', tags: ['Queue-it'] },
    ],

    // Quality
    Jest: [
      { text: 'Unit tests and coverage gates on TS services/components', tags: ['Portfolio'] },
      { text: 'Mocking strategies (MSW) to speed up feedback', tags: ['Cinemataztic'] },
    ],
    Cypress: [
      { text: 'End‑to‑end UI flows and regression suites for web dashboards', tags: ['Portfolio'] },
    ],
    Playwright: [
      { text: 'Cross‑browser smoke and critical path tests in CI', tags: ['Portfolio'] },
    ],
    'React Testing Library': [
      { text: 'Component tests aligned to user interactions for React apps', tags: ['Portfolio'] },
    ],
    PyTest: [
      {
        text: 'FastAPI service tests, fixtures and contract checks for AI pipelines',
        tags: ['Chameleon'],
      },
    ],
    'ESLint & Prettier': [
      {
        text: 'Repo‑wide standards, pre‑commit hooks and shared configs; documented in a developer handbook',
        tags: ['ExSeed'],
      },
    ],

    // Already present items kept for completeness
    'Kubernetes/Helm/FluxCD/Istio': [
      { text: 'Consolidated here under Kubernetes and CI/CD sections', tags: ['Cinemataztic'] },
    ],
    'React & Next': [{ text: 'Alias mapping to React & Next.js', tags: ['Portfolio'] }],
    'WebSockets & RTC': [
      {
        text: 'Alias mapping to WebSockets and React Native use cases',
        tags: ['QuizMentor', 'PatientSky'],
      },
    ],
  };

  // Compute tag universe for filters
  const allCvCases = Object.values(cvUseCases).flat();
  const allCvTags = Array.from(new Set(allCvCases.flatMap((c) => c.tags))).sort();

  // Filter skills by CV presence/tag if requested
  const renderSkills =
    showCvOnly || selectedCvTag !== 'all'
      ? currentSkills.filter((skill) => {
          const cases = (cvUseCases[skill.title] || []).filter((c) =>
            selectedCvTag === 'all' ? true : c.tags.includes(selectedCvTag),
          );
          return cases.length > 0;
        })
      : currentSkills;

  return (
    <div className="w-full">
      <div className="w-full max-w-[90%] 2xl:max-w-[85%] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Technical Stack
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Comprehensive expertise across modern web technologies, cloud infrastructure, and AI/ML
            systems
          </p>
        </motion.div>

        {/* Main Layout with Sidebar */}
        <div className="flex gap-8">
          {/* Left Sidebar Filters */}
          <motion.div
            className="hidden lg:block w-64 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="sticky top-24 space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-300 border border-green-600/40'
                          : 'bg-gray-900/30 text-gray-400 hover:text-white hover:bg-gray-800/50 border border-gray-800'
                      }`}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{cat.label}</span>
                      <Badge size="sm" variant="default">
                        {cat.count}
                      </Badge>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* CV Filters */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  CV Filters
                </h3>
                <motion.button
                  onClick={() => setShowCvOnly(!showCvOnly)}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                    showCvOnly
                      ? 'bg-green-600/20 text-green-300 border-green-600/40'
                      : 'bg-gray-900/30 text-gray-400 border-gray-800 hover:text-white hover:bg-gray-800/50'
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showCvOnly ? '✓ CV skills only' : 'Show CV skills only'}
                </motion.button>
              </div>

              {/* Project Tags Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Project Tags
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCvTag('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedCvTag === 'all'
                        ? 'bg-green-600/20 text-green-300 border border-green-600/40'
                        : 'bg-gray-900/30 text-gray-400 border border-gray-800 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    All tags
                  </button>
                  {allCvTags.slice(0, 10).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedCvTag(tag)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-all ${
                        selectedCvTag === tag
                          ? 'bg-green-600/20 text-green-300 border border-green-600/40'
                          : 'bg-gray-900/30 text-gray-400 border border-gray-800 hover:text-white hover:bg-gray-800/50'
                      }`}
                      title={tag}
                    >
                      {tag}
                    </button>
                  ))}
                  {allCvTags.length > 10 && (
                    <p className="text-xs text-gray-500 pl-3">+{allCvTags.length - 10} more</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden fixed bottom-4 right-4 z-50">
            <motion.button
              onClick={() => setShowCvOnly(!showCvOnly)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-sm font-medium text-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Filters
            </motion.button>
          </div>

          {/* Controls row (polished pass) */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <button
              onClick={() => setIncludePlanned(!includePlanned)}
              className={`px-3 py-1.5 rounded-lg text-xs border ${includePlanned ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30' : 'bg-gray-900/30 text-gray-400 border-gray-800 hover:text-white hover:bg-gray-800/50'}`}
              title="Include Planned & Documented tech items"
            >
              {includePlanned ? '✓ Include Planned' : 'Include Planned'}
            </button>
            <button
              onClick={() => setShowPatterns(!showPatterns)}
              className={`px-3 py-1.5 rounded-lg text-xs border ${showPatterns ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' : 'bg-gray-900/30 text-gray-400 border-gray-800 hover:text-white hover:bg-gray-800/50'}`}
            >
              {showPatterns ? '✓ Patterns' : 'Patterns'}
            </button>
            <button
              onClick={() => setShowArchitecture(!showArchitecture)}
              className={`px-3 py-1.5 rounded-lg text-xs border ${showArchitecture ? 'bg-teal-500/10 text-teal-300 border-teal-500/30' : 'bg-gray-900/30 text-gray-400 border-gray-800 hover:text-white hover:bg-gray-800/50'}`}
            >
              {showArchitecture ? '✓ Architecture' : 'Architecture'}
            </button>
            <button
              onClick={() => setShowApis(!showApis)}
              className={`px-3 py-1.5 rounded-lg text-xs border ${showApis ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' : 'bg-gray-900/30 text-gray-400 border-gray-800 hover:text-white hover:bg-gray-800/50'}`}
            >
              {showApis ? '✓ APIs' : 'APIs'}
            </button>
          </div>

          {/* Skills Grid */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 20 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ filter: isTransitioning ? 'blur(4px)' : 'blur(0px)' }}
            className="flex-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {renderSkills.map((skill, index) => (
                <motion.div
                  key={`${selectedCategory}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ y: -4 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 rounded-xl p-4 h-full transition-all">
                    {/* Compact Header */}
                    <div className="flex items-start gap-3 mb-3">
                      {skill.icon && (
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${skill.iconColor} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0`}
                        >
                          {typeof skill.icon === 'string' ? skill.icon : skill.icon}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">{skill.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-1.5 py-0.5 text-xs font-medium rounded-md ${
                              skill.level === 'Expert'
                                ? 'bg-green-500/20 text-green-400'
                                : skill.level === 'Advanced'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : skill.level === 'Intermediate'
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'bg-gray-500/20 text-gray-400'
                            }`}
                          >
                            {skill.level}
                          </span>
                          <span className="text-xs text-gray-500">{skill.years}y</span>
                        </div>
                      </div>
                    </div>

                    {/* Compact Description */}
                    <p className="text-xs text-gray-400 line-clamp-2 mb-2">{skill.description}</p>

                    {/* Featured Example + Tags (visible by default) */}
                    {cvUseCases[skill.title] && (
                      <div className="mb-2">
                        <p className="text-[11px] text-gray-500 truncate">
                          Example: {(cvUseCases[skill.title] || [])[0]?.text}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {((cvUseCases[skill.title] || [])[0]?.tags || [])
                            .slice(0, 2)
                            .map((tag: string) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 bg-gray-800/50 rounded text-[10px] text-gray-300 border border-gray-700"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Proficiency Bar */}
                    <div className="mb-3">
                      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Compact Stats */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">
                          <span className="font-medium text-white">{skill.projectCount}</span>{' '}
                          projects
                        </span>
                        <span className="text-gray-500">
                          <span className="font-medium text-white">{skill.proficiency}%</span>{' '}
                          proficiency
                        </span>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {(skill.projects?.length > 0 || cvUseCases[skill.title]) && (
                      <motion.button
                        onClick={() => {
                          const el = document.getElementById(`skill-detail-${index}`);
                          if (el) {
                            el.classList.toggle('hidden');
                          }
                        }}
                        className="mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View details →
                      </motion.button>
                    )}

                    {/* Hidden Details */}
                    <div
                      id={`skill-detail-${index}`}
                      className="hidden mt-3 pt-3 border-t border-gray-800 space-y-3"
                    >
                      {skill.projects && skill.projects.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-400 mb-2">Projects</p>
                          <div className="flex flex-wrap gap-1">
                            {skill.projects.slice(0, 5).map((project, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-gray-800/50 rounded text-xs text-gray-300"
                              >
                                {project}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {cvUseCases[skill.title] && (
                        <div>
                          <p className="text-xs font-medium text-gray-400 mb-2">CV Use Cases</p>
                          <ul className="space-y-1">
                            {(cvUseCases[skill.title] || []).slice(0, 3).map((c, i) => (
                              <li key={i} className="text-xs text-gray-500 leading-relaxed">
                                • {c.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Planned & Documented Tech */}
        {includePlanned && (
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Planned & Documented Tech
            </h3>
            <div className="flex flex-wrap gap-2">
              {plannedTech.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-yellow-500/10 text-yellow-300 rounded border border-yellow-500/20 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Security & Compliance */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {(['quizmentor', 'devmentor', 'harvest'] as const).map((key) => (
            <div key={key} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="text-xs text-gray-400 mb-2">{projectMeta[key].name}</div>
              <div className="text-sm text-gray-300 mb-3">{projectMeta[key].securitySnapshot}</div>
              <div className="flex gap-2">
                <a
                  href={projectMeta[key].securityDocUrl}
                  target="_blank"
                  className="text-xs text-green-300 underline"
                >
                  Security Blueprint
                </a>
                {key === 'quizmentor' && projectMeta.quizmentor.pipelineUrl && (
                  <a
                    href={projectMeta.quizmentor.pipelineUrl}
                    target="_blank"
                    className="text-xs text-blue-300 underline"
                  >
                    Harvester Pipeline
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Spotlights */}
        {showArchitecture && (
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Architecture Spotlights
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {(Object.keys(archGraphs) as (keyof typeof archGraphs)[]).map((k) => (
                <div key={k} className="bg-gray-900/40 border border-gray-800 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-2">
                    {projectMeta[k as 'quizmentor' | 'devmentor' | 'harvest']?.name ||
                      (k === 'quizmentor-harvester' ? 'QuizMentor Harvester' : k)}
                  </div>
                  <MiniArchGraph
                    nodes={archGraphs[k].nodes}
                    edges={archGraphs[k].edges}
                    height={180}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patterns & Examples */}
        {showPatterns && (
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Patterns & Examples
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {patterns.map((group) => (
                <div
                  key={group.category}
                  className="bg-gray-900/40 border border-gray-800 rounded-lg p-4"
                >
                  <div className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    {group.category}
                  </div>
                  <ul className="space-y-2">
                    {group.items.map((p, i) => (
                      <li key={`${group.category}-${i}`} className="text-xs text-gray-300">
                        <div className="font-medium">{p.name}</div>
                        {p.summary && <div className="text-[11px] text-gray-500">{p.summary}</div>}
                        <div className="mt-1 flex gap-3">
                          {p.docUrl && (
                            <a
                              href={p.docUrl}
                              target="_blank"
                              className="text-[11px] text-green-300 underline"
                            >
                              Docs
                            </a>
                          )}
                          {p.storyId && (
                            <a
                              href={`${storyRoot}?id=${p.storyId}`}
                              target="_blank"
                              className="text-[11px] text-purple-300 underline"
                            >
                              Story
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Directory */}
        {showApis && (
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Key API Endpoints
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {(Object.keys(apiDirectory) as (keyof typeof apiDirectory)[]).map((k) => (
                <div key={k} className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                  <div className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    {projectMeta[k as 'quizmentor' | 'devmentor' | 'harvest']?.name || k}
                  </div>
                  <ul className="space-y-1">
                    {apiDirectory[k].map((line, i) => (
                      <li key={`${k}-api-${i}`} className="text-xs text-gray-300 leading-relaxed">
                        • {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export JSON */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              const data = {
                projectMeta,
                plannedTech: includePlanned ? plannedTech : [],
                apiDirectory,
                patterns,
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'stack.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-gray-600"
          >
            Download stack.json
          </button>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 mb-6">
            Looking for specific expertise? Let's discuss your project needs.
          </p>
          <div className="flex justify-center gap-4">
            <motion.a
              href="mailto:hello@naturequest.dev"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="/projects"
              className="px-6 py-3 bg-gray-900 text-gray-300 rounded-lg font-medium border border-gray-800 hover:border-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
