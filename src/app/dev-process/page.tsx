'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TestTube,
  Shield,
  Bot,
  Activity,
  Settings,
  Layers,
  BookOpen,
  GitBranch,
  Code2,
  Target,
  CheckCircle,
  ArrowRight,
  Home,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import Link from 'next/link';

interface Pillar {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  tagline: string;
  overview: string;
  details: {
    subtitle: string;
    content: string[];
  }[];
  achievements?: string[];
  metrics?: { label: string; value: string }[];
  codeExample?: string;
}

export default function DevProcessPage() {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const pillars: Pillar[] = [
    {
      id: 'testing',
      title: 'Testing Strategy',
      icon: TestTube,
      color: 'from-purple-600 to-pink-600',
      tagline: 'Comprehensive Quality Assurance',
      overview: 'Multi-layer testing approach ensuring 95% code coverage across critical paths',
      details: [
        {
          subtitle: 'Testing Pyramid Implementation',
          content: [
            'Unit Tests (70%): Jest for React components, Vitest for utilities, Mock Service Worker for API mocking',
            'Integration Tests (20%): Testing Library for component integration, API contract testing with Pact, Database integration with TestContainers',
            'E2E Tests (10%): Playwright for cross-browser testing, Cypress for developer experience, K6 for performance testing',
          ],
        },
      ],
      achievements: [
        '95% code coverage across critical paths',
        'Storybook-driven development for component isolation',
        'Visual regression testing with Chromatic',
        'Accessibility testing with axe-core',
        'Performance budgets enforced in CI/CD',
      ],
      codeExample: `// Testing Pyramid Implementation
├── Unit Tests (70%)
│   ├── Jest for React components
│   ├── Vitest for utilities
│   └── Mock Service Worker for API mocking
├── Integration Tests (20%)
│   ├── Testing Library for component integration
│   ├── API contract testing with Pact
│   └── Database integration with TestContainers
└── E2E Tests (10%)
    ├── Playwright for cross-browser testing
    ├── Cypress for developer experience
    └── K6 for performance testing`,
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      color: 'from-red-600 to-orange-600',
      tagline: 'Defense in Depth',
      overview: 'Multi-layered security approach from application to infrastructure',
      details: [
        {
          subtitle: 'Application Security',
          content: [
            'OAuth 2.0 + JWT authentication',
            'Role-Based Access Control (RBAC)',
            'Data encryption at rest and in transit',
            'Input validation and sanitization',
            'SQL injection prevention',
            'XSS protection with CSP headers',
          ],
        },
        {
          subtitle: 'Infrastructure Security',
          content: [
            'Istio service mesh for mTLS',
            'Network policies in Kubernetes',
            'Secrets management with Vault',
            'Container scanning with Trivy',
            'SAST/DAST in CI pipeline',
            'Security audit logging',
          ],
        },
        {
          subtitle: 'Security Playgrounds',
          content: [
            'Interactive security scenarios in Storybook',
            'Token refresh mechanisms',
            'Data redaction demonstrations',
            'JWT inspection tools',
          ],
        },
      ],
    },
    {
      id: 'ai-integration',
      title: 'AI Integration',
      icon: Bot,
      color: 'from-green-600 to-teal-600',
      tagline: 'Intelligent Assistance',
      overview: 'Multi-model AI capabilities with safety and cost optimization',
      details: [
        {
          subtitle: 'Code Generation',
          content: [
            'Multi-model support (GPT-4, Claude, Llama)',
            'Context-aware suggestions',
            'Token budget management',
          ],
        },
        {
          subtitle: 'RAG Pipeline',
          content: ['Qdrant vector database', 'Semantic search', 'Document chunking strategies'],
        },
        {
          subtitle: 'AI Safety',
          content: ['Prompt injection detection', 'Content filtering', 'Rate limiting per user'],
        },
      ],
      achievements: [
        'Streaming responses for better UX',
        'Tool calling for structured outputs',
        'Embeddings for semantic search',
        'Cost optimization with token tracking',
      ],
      codeExample: `AI Capabilities:
├── Code Generation
│   ├── Multi-model support (GPT-4, Claude, Llama)
│   ├── Context-aware suggestions
│   └── Token budget management
├── RAG Pipeline
│   ├── Qdrant vector database
│   ├── Semantic search
│   └── Document chunking strategies
└── AI Safety
    ├── Prompt injection detection
    ├── Content filtering
    └── Rate limiting per user`,
    },
    {
      id: 'observability',
      title: 'Observability',
      icon: Activity,
      color: 'from-blue-600 to-cyan-600',
      tagline: 'Complete System Visibility',
      overview: 'Distributed tracing, metrics, and logging with ML-powered anomaly detection',
      details: [
        {
          subtitle: 'Monitoring Stack',
          content: [
            'OpenTelemetry for instrumentation',
            'Tempo/Jaeger for distributed tracing',
            'Prometheus for metrics',
            'Loki for log aggregation',
            'Grafana for visualization',
            'AlertManager for incident response',
          ],
        },
      ],
      metrics: [
        { label: 'Trace Coverage', value: '100%' },
        { label: 'Alert Response', value: '<3min' },
        { label: 'MTTR', value: '<30min' },
        { label: 'SLO Compliance', value: '99.95%' },
      ],
      achievements: [
        'Distributed tracing across all services',
        'Real User Monitoring with Web Vitals',
        'Custom business metrics tracking',
        'ML-powered anomaly detection',
        'SLI/SLO dashboards for reliability',
      ],
    },
    {
      id: 'remote-config',
      title: 'Remote Configuration',
      icon: Settings,
      color: 'from-indigo-600 to-purple-600',
      tagline: 'Dynamic Control',
      overview: 'Feature flags and configuration management for zero-downtime deployments',
      details: [
        {
          subtitle: 'Feature Flags',
          content: [
            'Gradual rollouts (0% → 100%)',
            'User targeting and segmentation',
            'A/B testing framework',
            'Instant rollback capability',
          ],
        },
        {
          subtitle: 'Security Controls',
          content: ['Dynamic rate limits', 'Session management', 'Access control policies'],
        },
        {
          subtitle: 'Operational Settings',
          content: ['AI model selection', 'Performance thresholds', 'Cost controls'],
        },
      ],
      achievements: [
        'Zero-downtime deployments',
        'Instant incident response with kill switches',
        'Data-driven feature development',
        'Reduced deployment risk',
      ],
    },
    {
      id: 'architecture',
      title: 'Architecture',
      icon: Layers,
      color: 'from-yellow-600 to-orange-600',
      tagline: 'Scalable Microservices',
      overview: 'Domain-driven design with event-driven architecture and resilience patterns',
      details: [
        {
          subtitle: 'Frontend',
          content: [
            'Next.js 14 with App Router',
            'React Server Components',
            'Tailwind CSS + shadcn/ui',
          ],
        },
        {
          subtitle: 'Backend Services',
          content: [
            'Auth Service (Node.js)',
            'Project Service (Go)',
            'AI Gateway (Python)',
            'Memory Service (Rust)',
          ],
        },
        {
          subtitle: 'Data Layer',
          content: ['PostgreSQL (primary)', 'Redis (caching)', 'Qdrant (vectors)', 'S3 (storage)'],
        },
      ],
      achievements: [
        'Domain-Driven Design for service boundaries',
        'Event-driven architecture with Kafka',
        'API-first development with OpenAPI',
        'Database per service pattern',
        'Circuit breakers for resilience',
      ],
      codeExample: `Core Services:
  Frontend:
    - Next.js 14 with App Router
    - React Server Components
    - Tailwind CSS + shadcn/ui
    
  Backend Services:
    - Auth Service (Node.js)
    - Project Service (Go)
    - AI Gateway (Python)
    - Memory Service (Rust)
    
  Data Layer:
    - PostgreSQL (primary)
    - Redis (caching)
    - Qdrant (vectors)
    - S3 (storage)`,
    },
    {
      id: 'documentation',
      title: 'Documentation',
      icon: BookOpen,
      color: 'from-teal-600 to-emerald-600',
      tagline: 'Living Knowledge Base',
      overview: 'Interactive documentation with MDX, Storybook, and auto-generated API docs',
      details: [
        {
          subtitle: 'Technical Specs',
          content: ['API contracts', 'Architecture diagrams', 'Database schemas'],
        },
        {
          subtitle: 'Interactive Playgrounds',
          content: ['Storybook components', 'API explorers', 'Config dashboards'],
        },
        {
          subtitle: 'User Journeys',
          content: ['Onboarding flows', 'Feature tutorials', 'Best practices'],
        },
        {
          subtitle: 'Epics & Planning',
          content: ['Feature epics', 'Technical roadmaps', 'Success metrics'],
        },
      ],
      achievements: [
        'MDX for rich documentation',
        'Storybook for component demos',
        'Mermaid for diagrams',
        'Auto-generated API docs',
      ],
    },
    {
      id: 'cicd',
      title: 'CI/CD',
      icon: GitBranch,
      color: 'from-pink-600 to-rose-600',
      tagline: 'Automated Excellence',
      overview: 'Comprehensive pipeline with < 10 minute build times and GitOps deployment',
      details: [
        {
          subtitle: 'Pull Request Pipeline',
          content: [
            'Linting (ESLint, Prettier)',
            'Type checking (TypeScript)',
            'Unit tests',
            'Integration tests',
            'Security scanning',
            'Bundle size checks',
          ],
        },
        {
          subtitle: 'Main Branch Pipeline',
          content: [
            'All PR checks',
            'E2E tests',
            'Performance tests',
            'Docker image build',
            'Vulnerability scanning',
          ],
        },
        {
          subtitle: 'Deployment Pipeline',
          content: [
            'Blue-green deployment',
            'Canary releases',
            'Automatic rollback',
            'Smoke tests',
            'Health checks',
          ],
        },
      ],
      achievements: [
        '< 10 minute build times',
        'Automated dependency updates',
        'Preview environments for PRs',
        'GitOps with ArgoCD',
      ],
    },
    {
      id: 'dx',
      title: 'Developer Experience',
      icon: Code2,
      color: 'from-cyan-600 to-blue-600',
      tagline: 'Joy of Development',
      overview: '2-minute local setup with comprehensive tooling and instant feedback loops',
      details: [
        {
          subtitle: 'CLI Tools',
          content: ['Code generation', 'Database migrations', 'Local environment setup'],
        },
        {
          subtitle: 'Development Environment',
          content: ['Hot module replacement', 'Docker Compose setup', 'VS Code extensions'],
        },
        {
          subtitle: 'Testing Tools',
          content: ['Storybook for components', 'MSW for API mocking', 'Playwright codegen'],
        },
        {
          subtitle: 'Debugging',
          content: ['Source maps', 'Redux DevTools', 'React Query DevTools'],
        },
      ],
      achievements: [
        '2-minute local setup',
        'Instant feedback loops',
        'Comprehensive tooling',
        'Excellent error messages',
      ],
    },
    {
      id: 'product',
      title: 'Product Excellence',
      icon: Target,
      color: 'from-emerald-600 to-green-600',
      tagline: 'User-Centric Design',
      overview: 'Iterative development with continuous user feedback and data-driven decisions',
      details: [
        {
          subtitle: 'Key Features Delivered',
          content: [
            'Epic Management System for project planning',
            'AI-powered code generation',
            'Collaborative editing capabilities',
            'Real-time notifications',
            'Intelligent search with RAG',
            'Performance insights dashboard',
            'Security monitoring tools',
          ],
        },
      ],
      metrics: [
        { label: 'P50 Latency', value: '<200ms' },
        { label: 'Uptime', value: '99.95%' },
        { label: 'Error Rate', value: '<0.1%' },
        { label: 'Lighthouse', value: '90+' },
      ],
      achievements: [
        'WCAG AA compliance',
        '10x developer productivity improvement',
        '70% reduction in incident response time',
        '50% decrease in deployment failures',
      ],
    },
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-white hover:text-green-400 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Portfolio</span>
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-green-400 font-medium">Development Process</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Development Excellence
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-4">
              10 Pillars of Building World-Class Development Platforms
            </p>
            <p className="text-gray-500 max-w-3xl mx-auto">
              Our comprehensive approach to software development, combining best practices in
              testing, security, AI integration, and developer experience to deliver scalable,
              maintainable solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-green-600/10 to-teal-600/10 border border-green-600/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              The Result: Platforms That Scale
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  Technical Achievements
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>10x developer productivity improvement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>70% reduction in incident response time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>95% test coverage on critical paths</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>50% decrease in deployment failures</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-teal-400 mb-3">Business Impact</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>Ship features 3x faster with feature flags</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>Reduce operational costs by 40%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>95% user satisfaction score</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span>Scale from 0 to 100K users seamlessly</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Innovation Highlights</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Storybook-driven development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>AI-assisted development with multiple LLMs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Real-time collaboration architecture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Observability-first operations</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isExpanded = expandedPillar === pillar.id;

              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all">
                    {/* Header */}
                    <button
                      onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
                      className="w-full p-6 text-left hover:bg-gray-800/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-r ${pillar.color} bg-opacity-20`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white">
                                {index + 1}. {pillar.title}
                              </h3>
                              <span className="text-sm text-gray-400">— {pillar.tagline}</span>
                            </div>
                            <p className="text-gray-400">{pillar.overview}</p>
                          </div>
                        </div>
                        <div className="ml-4">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-800"
                        >
                          <div className="p-6 space-y-6">
                            {/* Details */}
                            <div className="grid md:grid-cols-2 gap-6">
                              {pillar.details.map((detail, idx) => (
                                <div key={idx} className="bg-gray-800/30 rounded-lg p-4">
                                  <h4 className="font-semibold text-white mb-3">
                                    {detail.subtitle}
                                  </h4>
                                  <ul className="space-y-2">
                                    {detail.content.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-300">{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            {/* Code Example */}
                            {pillar.codeExample && (
                              <div className="relative">
                                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-gray-500 font-mono">
                                      Implementation Structure
                                    </span>
                                    <button
                                      onClick={() =>
                                        copyToClipboard(pillar.codeExample!, pillar.id)
                                      }
                                      className="p-1.5 hover:bg-gray-800 rounded transition-colors"
                                    >
                                      {copiedCode === pillar.id ? (
                                        <Check className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <Copy className="w-4 h-4 text-gray-400" />
                                      )}
                                    </button>
                                  </div>
                                  <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                                    <code>{pillar.codeExample}</code>
                                  </pre>
                                </div>
                              </div>
                            )}

                            {/* Metrics */}
                            {pillar.metrics && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {pillar.metrics.map((metric, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-gray-800/30 rounded-lg p-4 text-center"
                                  >
                                    <div className="text-2xl font-bold text-white mb-1">
                                      {metric.value}
                                    </div>
                                    <div className="text-xs text-gray-400">{metric.label}</div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Achievements */}
                            {pillar.achievements && (
                              <div>
                                <h4 className="font-semibold text-white mb-3">Key Achievements</h4>
                                <div className="grid md:grid-cols-2 gap-3">
                                  {pillar.achievements.map((achievement, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm text-gray-300">{achievement}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-green-600/10 to-teal-600/10 border border-green-600/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-gray-400 mb-6">
              This development philosophy powers all our projects. See it in action across our
              portfolio.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-teal-700 transition-all"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/MarcoPWx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-all"
              >
                View on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
