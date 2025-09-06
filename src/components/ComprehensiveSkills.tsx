'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Palette,
  Server,
  Brain,
  Cloud,
  Database,
  CheckCircle,
  Settings,
  Braces,
  Sparkles,
  Atom,
  Layers3,
  Smartphone,
  Component,
  Box,
  Activity,
  Zap,
  Shield,
  TerminalIcon,
  Network,
  Cpu,
  Heart,
  Package,
  Boxes,
  GitBranch,
  Globe,
  Code,
  DollarSign,
  ChevronDown,
  Wand2,
  Coffee,
  FileText,
  FileCode,
} from 'lucide-react';

interface Technology {
  name: string;
  icon: React.ReactNode;
  experience: string;
  projects: string[];
  examples: {
    project: string;
    description: string;
    impact: string;
    techDetails: string;
  }[];
  yearsUsed: string;
  proficiencyLevel: 'Expert' | 'Advanced' | 'Intermediate' | 'Learning';
}

interface TechCategory {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  description: string;
  technologies: Technology[];
}

// Simple card component with forwardRef to avoid ref warnings
const Card3D = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`${className} hover:transform hover:scale-[1.01] transition-transform duration-200`}
      >
        {children}
      </div>
    );
  },
);
Card3D.displayName = 'Card3D';

const techCategories: TechCategory[] = [
  {
    title: 'Programming Languages',
    icon: <Code2 className="w-6 h-6" />,
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Core languages for system development',
    technologies: [
      {
        name: 'TypeScript',
        icon: <Braces className="w-5 h-5" />,
        experience:
          'Primary language for all frontend and backend development with strict type safety',
        projects: ['QuizMentor', 'DevMentor', 'Chameleon', 'Portfolio'],
        yearsUsed: '6+ years',
        proficiencyLevel: 'Expert',
        examples: [
          {
            project: 'DevMentor AI Assistant',
            description:
              'Built pattern-based machine learning system with complex type definitions and AI workflow orchestration',
            impact:
              'Achieved 95% type safety across 50K+ lines of code with zero runtime type errors',
            techDetails:
              'Advanced generics, conditional types, mapped types, custom utility types, and strict TypeScript configuration',
          },
          {
            project: 'QuizMentor Mobile App',
            description:
              'React Native app with shared TypeScript codebase for web and mobile platforms',
            impact: 'Reduced development time by 60% through code sharing and type-safe APIs',
            techDetails:
              'Monorepo setup with strict TypeScript configs, shared business logic, and platform-specific implementations',
          },
        ],
      },
      {
        name: 'Python',
        icon: <Code2 className="w-5 h-5" />,
        experience: 'AI/ML development, FastAPI backends, data processing, and automation',
        projects: ['Chameleon', 'DevMentor AI', 'Data Analytics', 'ML Models'],
        yearsUsed: '7+ years',
        proficiencyLevel: 'Expert',
        examples: [
          {
            project: 'Chameleon Content Intelligence',
            description:
              'Built high-performance content analysis pipeline processing 100K+ documents with ML models',
            impact: 'Achieved 99.2% accuracy in content classification and 60% faster processing',
            techDetails:
              'FastAPI with async/await, Pydantic models, SQLAlchemy ORM, TensorFlow/PyTorch, and custom ML pipeline orchestration',
          },
          {
            project: 'DevMentor AI Learning Engine',
            description:
              'Developed machine learning algorithms for pattern recognition and code analysis',
            impact: '95% accuracy in code pattern detection and automated learning recommendations',
            techDetails:
              'Scikit-learn, TensorFlow, custom neural networks, and real-time model serving with FastAPI',
          },
        ],
      },
      {
        name: 'JavaScript',
        icon: <Sparkles className="w-5 h-5" />,
        experience: 'ES6+, Node.js runtime, browser APIs, modern JavaScript patterns',
        projects: ['All web projects', 'Browser extensions', 'Node.js backends'],
        yearsUsed: '8+ years',
        proficiencyLevel: 'Expert',
        examples: [
          {
            project: 'Modern Web Applications',
            description:
              'Built scalable web applications using modern JavaScript patterns and ES6+ features',
            impact: 'Improved code maintainability and developer experience across all projects',
            techDetails:
              'ES6+ features, async/await, modules, destructuring, and modern JavaScript patterns',
          },
        ],
      },
      {
        name: 'Go',
        icon: <Zap className="w-5 h-5" />,
        experience: 'High-performance microservices, CLI tools',
        projects: ['Performance-critical services', 'DevOps tooling'],
        yearsUsed: '3+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
      {
        name: 'Java',
        icon: <Coffee className="w-5 h-5" />,
        experience: 'Enterprise applications, Spring Boot, microservices',
        projects: ['Enterprise systems', 'Backend services'],
        yearsUsed: '5+ years',
        proficiencyLevel: 'Advanced',
        examples: [
          {
            project: 'Enterprise Backend Systems',
            description: 'Built robust enterprise applications using Java and Spring Boot',
            impact: 'Delivered scalable backend services for enterprise clients',
            techDetails: 'Spring Boot, Spring Security, JPA, microservices architecture',
          },
        ],
      },
      {
        name: 'Rust',
        icon: <Shield className="w-5 h-5" />,
        experience: 'Systems programming, WebAssembly modules',
        projects: ['Performance optimization', 'WASM components'],
        yearsUsed: '2+ years',
        proficiencyLevel: 'Intermediate',
        examples: [],
      },
    ],
  },
  {
    title: 'Frontend Development',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-purple-500 to-pink-500',
    description: 'Modern UI/UX frameworks and libraries',
    technologies: [
      {
        name: 'React',
        icon: <Atom className="w-5 h-5" />,
        experience:
          'Advanced patterns, hooks, context, performance optimization, and modern React features',
        projects: ['QuizMentor Web', 'DevMentor UI', 'Portfolio', 'Admin Dashboards'],
        yearsUsed: '7+ years',
        proficiencyLevel: 'Expert',
        examples: [
          {
            project: 'QuizMentor Web Platform',
            description:
              'Built comprehensive learning platform with complex state management and real-time features',
            impact:
              'Supports 10K+ concurrent users with <100ms response times and 92% user retention',
            techDetails:
              'Advanced React patterns, custom hooks, context optimization, React Query, and performance monitoring with React DevTools',
          },
          {
            project: 'DevMentor Admin Dashboard',
            description:
              'Complex admin interface with real-time analytics, user management, and system monitoring',
            impact: 'Reduced admin task time by 70% through intuitive UI and automated workflows',
            techDetails:
              'React 18 with concurrent features, advanced state management, real-time WebSocket integration, and responsive design',
          },
        ],
      },
      {
        name: 'Next.js',
        icon: <Layers3 className="w-5 h-5" />,
        experience: 'SSR/SSG, App Router, API routes, middleware',
        projects: ['Portfolio', 'Marketing sites', 'Admin dashboards'],
        yearsUsed: '4+ years',
        proficiencyLevel: 'Expert',
        examples: [],
      },
      {
        name: 'React Native',
        icon: <Smartphone className="w-5 h-5" />,
        experience: 'Cross-platform mobile apps, native modules',
        projects: ['QuizMentor Mobile', 'Chameleon Mobile'],
        yearsUsed: '4+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
      {
        name: 'Tailwind CSS',
        icon: <Palette className="w-5 h-5" />,
        experience: 'Utility-first styling, custom design systems',
        projects: ['All modern projects'],
        yearsUsed: '4+ years',
        proficiencyLevel: 'Expert',
        examples: [
          {
            project: 'Modern UI Design System',
            description: 'Built comprehensive design systems using Tailwind CSS',
            impact: 'Consistent UI across all projects with rapid development',
            techDetails: 'Custom components, responsive design, dark mode, and design tokens',
          },
        ],
      },
      {
        name: 'Vue.js',
        icon: <Palette className="w-5 h-5" />,
        experience: 'Component-based architecture, Vue 3 Composition API',
        projects: ['Client projects', 'Legacy applications'],
        yearsUsed: '3+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
      {
        name: 'Redux',
        icon: <Database className="w-5 h-5" />,
        experience: 'State management, Redux Toolkit, middleware',
        projects: ['Complex state management', 'Large applications'],
        yearsUsed: '5+ years',
        proficiencyLevel: 'Expert',
        examples: [],
      },
    ],
  },
  {
    title: 'Backend Development',
    icon: <Server className="w-6 h-6" />,
    gradient: 'from-green-500 to-teal-500',
    description: 'Server-side technologies and APIs',
    technologies: [
      {
        name: 'Node.js',
        icon: <Server className="w-5 h-5" />,
        experience: 'Express, Fastify, microservices architecture',
        projects: ['QuizMentor API', 'DevMentor Backend'],
        yearsUsed: '6+ years',
        proficiencyLevel: 'Expert',
        examples: [],
      },
      {
        name: 'FastAPI',
        icon: <Zap className="w-5 h-5" />,
        experience: 'High-performance Python APIs, automatic documentation',
        projects: ['Chameleon', 'ML model serving'],
        yearsUsed: '3+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
      {
        name: 'GraphQL',
        icon: <Network className="w-5 h-5" />,
        experience: 'Schema design, resolvers, Apollo Server',
        projects: ['Unified API layer', 'Complex data relationships'],
        yearsUsed: '4+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
      {
        name: 'Express.js',
        icon: <Server className="w-5 h-5" />,
        experience: 'REST APIs, middleware, authentication',
        projects: ['API development', 'Backend services'],
        yearsUsed: '6+ years',
        proficiencyLevel: 'Expert',
        examples: [],
      },
      {
        name: 'WebSockets',
        icon: <Network className="w-5 h-5" />,
        experience: 'Real-time communication, Socket.io',
        projects: ['Real-time features', 'Live collaboration'],
        yearsUsed: '4+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
    ],
  },
  {
    title: 'AI & Machine Learning',
    icon: <Brain className="w-6 h-6" />,
    gradient: 'from-orange-500 to-red-500',
    description: 'Artificial intelligence and ML technologies',
    technologies: [
      {
        name: 'OpenAI API',
        icon: <Sparkles className="w-5 h-5" />,
        experience:
          'GPT models, embeddings, fine-tuning, function calling, and advanced prompt engineering',
        projects: ['All AI-powered features', 'DevMentor', 'Chameleon'],
        yearsUsed: '3+ years',
        proficiencyLevel: 'Expert',
        examples: [
          {
            project: 'DevMentor AI Assistant',
            description:
              'Built intelligent code analysis and learning recommendation system using GPT-4',
            impact: '95% accuracy in code pattern recognition and personalized learning paths',
            techDetails:
              'Advanced prompt engineering, function calling, embeddings for code similarity, and fine-tuned models for specific domains',
          },
        ],
      },
      {
        name: 'TensorFlow & PyTorch',
        icon: <Brain className="w-5 h-5" />,
        experience: 'Deep learning models, neural networks, custom architectures',
        projects: ['ML Models', 'Computer Vision', 'NLP'],
        yearsUsed: '5+ years',
        proficiencyLevel: 'Advanced',
        examples: [
          {
            project: 'Content Analysis ML Pipeline',
            description:
              'Developed custom neural networks for content classification and sentiment analysis',
            impact: '99.2% accuracy in content classification with 60% faster processing',
            techDetails:
              'Custom CNN architectures, transfer learning, model optimization, and production deployment with TensorFlow Serving',
          },
        ],
      },
      {
        name: 'LangChain',
        icon: <Brain className="w-5 h-5" />,
        experience: 'Complex AI workflows, agents, memory systems, and RAG implementations',
        projects: ['DevMentor', 'Chameleon', 'Knowledge Systems'],
        yearsUsed: '2+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
      {
        name: 'Vector Databases',
        icon: <Database className="w-5 h-5" />,
        experience: 'Qdrant, Pinecone, similarity search, RAG systems, and semantic indexing',
        projects: ['Knowledge bases', 'Semantic search', 'Content Intelligence'],
        yearsUsed: '3+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
      {
        name: 'Scikit-learn',
        icon: <Brain className="w-5 h-5" />,
        experience: 'Machine learning algorithms, data preprocessing, model evaluation',
        projects: ['Data analysis', 'ML pipelines'],
        yearsUsed: '5+ years',
        proficiencyLevel: 'Expert',
        examples: [],
      },
      {
        name: 'Jupyter Notebooks',
        icon: <FileText className="w-5 h-5" />,
        experience: 'Data analysis, ML experimentation, documentation',
        projects: ['Research', 'Data exploration'],
        yearsUsed: '5+ years',
        proficiencyLevel: 'Expert',
        examples: [],
      },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: <Cloud className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Cloud infrastructure and deployment technologies',
    technologies: [
      {
        name: 'AWS',
        icon: <Cloud className="w-5 h-5" />,
        experience: 'EC2, Lambda, S3, RDS, CloudFormation, and serverless architectures',
        projects: ['Production deployments', 'Scalable infrastructure'],
        yearsUsed: '5+ years',
        proficiencyLevel: 'Advanced',
        examples: [
          {
            project: 'PixelQuest Production Infrastructure',
            description:
              'Built scalable microservices infrastructure on AWS with auto-scaling and high availability',
            impact: '99.9% uptime with automatic scaling supporting 10K+ concurrent users',
            techDetails:
              'ECS, Lambda, RDS, ElastiCache, CloudFront, and comprehensive monitoring with CloudWatch',
          },
        ],
      },
      {
        name: 'Docker & Kubernetes',
        icon: <Boxes className="w-5 h-5" />,
        experience: 'Containerization, orchestration, and microservices deployment',
        projects: ['DevMentor', 'QuizMentor', 'Production systems'],
        yearsUsed: '4+ years',
        proficiencyLevel: 'Advanced',
        examples: [
          {
            project: 'DevMentor Microservices',
            description:
              'Containerized microservices architecture with Kubernetes orchestration and Istio service mesh',
            impact: 'Zero-downtime deployments and 80% faster scaling response times',
            techDetails:
              'Docker multi-stage builds, Kubernetes manifests, Istio service mesh, and Helm charts for deployment automation',
          },
        ],
      },
      {
        name: 'CI/CD',
        icon: <GitBranch className="w-5 h-5" />,
        experience: 'GitHub Actions, automated testing, and deployment pipelines',
        projects: ['All production projects'],
        yearsUsed: '5+ years',
        proficiencyLevel: 'Expert',
        examples: [],
      },
      {
        name: 'Terraform',
        icon: <Settings className="w-5 h-5" />,
        experience: 'Infrastructure as Code, cloud provisioning',
        projects: ['Infrastructure automation', 'Cloud deployments'],
        yearsUsed: '3+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
      {
        name: 'Git',
        icon: <GitBranch className="w-5 h-5" />,
        experience: 'Version control, branching strategies, collaboration',
        projects: ['All projects', 'Team collaboration'],
        yearsUsed: '8+ years',
        proficiencyLevel: 'Expert',
        examples: [],
      },
    ],
  },
  {
    title: 'Databases & Tools',
    icon: <Database className="w-6 h-6" />,
    gradient: 'from-yellow-500 to-orange-500',
    description: 'Database technologies and development tools',
    technologies: [
      {
        name: 'PostgreSQL',
        icon: <Database className="w-5 h-5" />,
        experience: 'Relational databases, complex queries, performance optimization',
        projects: ['Production databases', 'Data storage'],
        yearsUsed: '6+ years',
        proficiencyLevel: 'Expert',
        examples: [],
      },
      {
        name: 'MongoDB',
        icon: <Database className="w-5 h-5" />,
        experience: 'NoSQL databases, document storage, aggregation pipelines',
        projects: ['Flexible data storage', 'Document databases'],
        yearsUsed: '4+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
      {
        name: 'Redis',
        icon: <Database className="w-5 h-5" />,
        experience: 'Caching, session storage, real-time data',
        projects: ['Performance optimization', 'Caching layers'],
        yearsUsed: '4+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
      {
        name: 'Supabase',
        icon: <Database className="w-5 h-5" />,
        experience: 'Backend-as-a-Service, real-time subscriptions',
        projects: ['Rapid development', 'Real-time features'],
        yearsUsed: '2+ years',
        proficiencyLevel: 'Advanced',
        examples: [],
      },
      {
        name: 'VS Code',
        icon: <FileCode className="w-5 h-5" />,
        experience: 'Development environment, extensions, debugging',
        projects: ['All development work'],
        yearsUsed: '6+ years',
        proficiencyLevel: 'Expert',
        examples: [],
      },
      {
        name: 'Postman',
        icon: <FileText className="w-5 h-5" />,
        experience: 'API testing, documentation, team collaboration',
        projects: ['API development', 'Testing'],
        yearsUsed: '5+ years',
        proficiencyLevel: 'Expert',
        examples: [],
      },
    ],
  },
];

// Skills Section Timeline Component
function SkillsTimeline({
  categories,
  activeCategory,
}: {
  categories: TechCategory[];
  activeCategory: number;
}) {
  const scrollToCategory = (index: number) => {
    const element = document.getElementById(`category-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-20 h-fit">
      <div className="bg-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 w-full min-h-[400px]">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-3 top-8 bottom-8 w-0.5 bg-gradient-to-b from-gray-600 via-gray-700 to-gray-600"></div>

          {/* Active Category Indicator */}
          <motion.div
            className="absolute left-2 w-1 h-12 bg-gradient-to-b from-green-400 to-teal-400 rounded-full shadow-lg shadow-green-400/50"
            animate={{
              top: `${activeCategory * 80 + 20}px`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />

          {/* Category Items */}
          <div className="space-y-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.title}
                onClick={() => scrollToCategory(index)}
                className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition-all group ${
                  activeCategory === index
                    ? 'text-green-400 bg-green-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title={category.title}
              >
                <div
                  className={`relative z-10 p-2 rounded-lg transition-all flex-shrink-0 ${
                    activeCategory === index
                      ? 'bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 shadow-lg shadow-green-500/10'
                      : 'bg-gray-800/50 group-hover:bg-gray-700/50 border border-gray-700/30'
                  }`}
                >
                  {category.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium leading-tight">{category.title}</div>
                  <div className="text-xs text-gray-500">{category.technologies.length} techs</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 pt-3 border-t border-gray-700/50">
          <div className="text-center mb-2">
            <div className="text-xs text-gray-400 font-medium">
              {activeCategory + 1}/{categories.length}
            </div>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-1">
            <motion.div
              className="h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"
              animate={{
                width: `${((activeCategory + 1) / categories.length) * 100}%`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComprehensiveSkills() {
  const [expandedTech, setExpandedTech] = React.useState<string | null>(null);
  const [activeCategory, setActiveCategory] = React.useState(0);

  // Intersection Observer to track which category is in view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryIndex = parseInt(entry.target.id.split('-')[1]);
            setActiveCategory(categoryIndex);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' },
    );

    techCategories.forEach((_, index) => {
      const element = document.getElementById(`category-${index}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto relative" data-testid="comprehensive-skills">
      {/* Floating Section Indicator */}
      <div className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-2 lg:p-4">
          <div className="flex flex-col gap-1 lg:gap-2">
            {techCategories.map((category, index) => (
              <motion.button
                key={category.title}
                onClick={() => {
                  const element = document.getElementById(`category-${index}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all ${
                  activeCategory === index
                    ? 'bg-green-400 shadow-lg shadow-green-400/50'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                title={category.title}
              />
            ))}
          </div>
        </div>
      </div>
      <motion.div
        className="text-center mb-12 lg:mb-16 px-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">
          <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            Technology Stack & Expertise
          </span>
        </h2>
        <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
          Comprehensive toolkit spanning the entire development lifecycle - from ideation to
          production deployment across all NatureQuest projects
        </p>
      </motion.div>

      <div className="space-y-12">
        {techCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            id={`category-${categoryIndex}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <Card3D className="bg-gray-800/20 border border-gray-700/30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.gradient} text-white`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: expandedTech && expandedTech !== tech.name ? 0.3 : 1,
                      scale: expandedTech === tech.name ? 1.02 : 1,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                    }}
                    className={`group relative bg-gray-800/30 border border-gray-700/50 rounded-lg overflow-hidden transition-all duration-300 ${
                      expandedTech === tech.name
                        ? 'border-green-500/50 shadow-lg shadow-green-500/20 md:col-span-2 lg:col-span-3 xl:col-span-4'
                        : 'hover:border-gray-600'
                    }`}
                  >
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandedTech(expandedTech === tech.name ? null : tech.name)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${category.gradient} text-white group-hover:scale-110 transition-transform`}
                        >
                          {tech.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-white group-hover:text-green-400 transition-colors">
                              {tech.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  tech.proficiencyLevel === 'Expert'
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : tech.proficiencyLevel === 'Advanced'
                                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                      : tech.proficiencyLevel === 'Intermediate'
                                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                }`}
                              >
                                {tech.proficiencyLevel}
                              </span>
                              <span className="text-xs text-gray-500">{tech.yearsUsed}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {tech.experience}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {tech.projects
                              .slice(0, expandedTech === tech.name ? tech.projects.length : 2)
                              .map((project, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-gray-700/50 text-xs text-gray-300 rounded border border-gray-600/30"
                                >
                                  {project}
                                </span>
                              ))}
                            {tech.projects.length > 2 && expandedTech !== tech.name && (
                              <span className="px-2 py-0.5 bg-gray-700/50 text-xs text-gray-400 rounded border border-gray-600/30">
                                +{tech.projects.length - 2}
                              </span>
                            )}
                          </div>
                          {tech.examples && tech.examples.length > 0 && (
                            <div className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                              {expandedTech === tech.name
                                ? 'Click to collapse'
                                : `Click to see ${tech.examples.length} detailed project examples →`}
                            </div>
                          )}
                        </div>

                        {/* Close Button for Expanded View */}
                        <AnimatePresence>
                          {expandedTech === tech.name && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedTech(null);
                              }}
                              className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 transition-all"
                            >
                              ✕
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Expanded Examples */}
                    <AnimatePresence>
                      {expandedTech === tech.name && tech.examples && tech.examples.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="border-t border-gray-700/50 bg-gray-900/50"
                        >
                          <div className="p-4 space-y-4">
                            <h5 className="text-sm font-semibold text-white mb-3">
                              Project Examples:
                            </h5>
                            {tech.examples.map((example, exampleIndex) => (
                              <motion.div
                                key={exampleIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: exampleIndex * 0.1 }}
                                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <h6 className="text-sm font-medium text-green-400">
                                    {example.project}
                                  </h6>
                                  <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                                    Impact
                                  </span>
                                </div>
                                <p className="text-xs text-gray-300 mb-2">{example.description}</p>
                                <div className="bg-green-500/10 border border-green-500/20 rounded p-2 mb-2">
                                  <p className="text-xs text-green-300 font-medium">
                                    📈 {example.impact}
                                  </p>
                                </div>
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2">
                                  <p className="text-xs text-blue-300">
                                    <span className="font-medium">Tech Details:</span>{' '}
                                    {example.techDetails}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </Card3D>

            {/* Animated Scroll Indicator */}
            {categoryIndex < techCategories.length - 1 && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 + 0.5 }}
              >
                <motion.div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    const nextElement = document.getElementById(`category-${categoryIndex + 1}`);
                    if (nextElement) {
                      nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Globe-like orbiting dots around the arrow */}
                  <div className="relative mb-2 w-32 h-32 mx-auto">
                    {/* Central arrow as the "planet" */}
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 flex items-center justify-center z-20"
                    >
                      <ChevronDown className="w-7 h-7 text-green-400 drop-shadow-lg" />
                    </motion.div>

                    {/* Orbiting dots - 360° around the arrow */}
                    {[...Array(8)].map((_, i) => {
                      const angle = i * 45 * (Math.PI / 180); // 8 dots, 45° apart
                      const radius = 14;

                      return (
                        <motion.div
                          key={`orbit-${i}`}
                          className="absolute w-1 h-1 bg-green-400 rounded-full shadow-sm z-10"
                          animate={{
                            x: [
                              Math.cos(angle) * radius,
                              Math.cos(angle + Math.PI / 2) * radius,
                              Math.cos(angle + Math.PI) * radius,
                              Math.cos(angle + Math.PI * 1.5) * radius,
                              Math.cos(angle + Math.PI * 2) * radius,
                            ],
                            y: [
                              Math.sin(angle) * radius,
                              Math.sin(angle + Math.PI / 2) * radius,
                              Math.sin(angle + Math.PI) * radius,
                              Math.sin(angle + Math.PI * 1.5) * radius,
                              Math.sin(angle + Math.PI * 2) * radius,
                            ],
                            scale: [0.6, 1.2, 0.6, 1.2, 0.6],
                            opacity: [0.4, 1, 0.4, 1, 0.4],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: 'linear',
                          }}
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                        />
                      );
                    })}

                    {/* Additional dots for more complex orbit */}
                    {[...Array(6)].map((_, i) => {
                      const angle = i * 60 * (Math.PI / 180); // 6 dots, 60° apart, different radius
                      const radius = 10;

                      return (
                        <motion.div
                          key={`orbit-inner-${i}`}
                          className="absolute w-0.5 h-0.5 bg-green-400/80 rounded-full z-5"
                          animate={{
                            x: [
                              Math.cos(angle) * radius,
                              Math.cos(angle + Math.PI / 2) * radius,
                              Math.cos(angle + Math.PI) * radius,
                              Math.cos(angle + Math.PI * 1.5) * radius,
                              Math.cos(angle + Math.PI * 2) * radius,
                            ],
                            y: [
                              Math.sin(angle) * radius,
                              Math.sin(angle + Math.PI / 2) * radius,
                              Math.sin(angle + Math.PI) * radius,
                              Math.sin(angle + Math.PI * 1.5) * radius,
                              Math.sin(angle + Math.PI * 2) * radius,
                            ],
                            scale: [0.4, 1, 0.4, 1, 0.4],
                            opacity: [0.2, 0.8, 0.2, 0.8, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.3 + 0.15,
                            ease: 'linear',
                          }}
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
