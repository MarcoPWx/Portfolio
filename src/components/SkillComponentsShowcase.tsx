'use client';

import React from 'react';
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
} from 'lucide-react';
import {
  SkillCard,
  SkillLevel,
  YearsExperience,
  SkillIcon,
  ProjectTag,
  SkillDescription,
  SeeMoreLink,
  CategoryHeader,
  SkillGrid,
  SkillProgress,
  SkillStat,
  ExpandableSkillCard,
  SkillCategorySection,
} from './ui/SkillCard';
import { SectionTitle } from './ui/Typography';

export function SkillComponentsShowcase() {
  // Programming Languages Data
  const programmingLanguages = [
    {
      title: 'TypeScript',
      icon: '{ }',
      iconColor: 'from-blue-400 to-blue-600',
      level: 'Expert' as const,
      years: 6,
      description:
        'Primary language for all frontend and backend development with React, Node.js, and modern JavaScript patterns',
      projects: ['QuizMentor', 'DevMentor'],
      additionalTags: ['+2'],
      projectCount: 2,
    },
    {
      title: 'Python',
      icon: <Code className="w-6 h-6" />,
      iconColor: 'from-green-400 to-emerald-600',
      level: 'Expert' as const,
      years: 7,
      description: 'AI/ML development, FastAPI backends, data processing, and automation scripts',
      projects: ['Chameleon', 'DevMentor AI'],
      additionalTags: ['+2'],
      projectCount: 2,
    },
    {
      title: 'JavaScript',
      icon: 'JS',
      iconColor: 'from-yellow-400 to-orange-500',
      level: 'Expert' as const,
      years: 8,
      description: 'ES6+, Node.js runtime, browser APIs, modern JavaScript patterns',
      projects: ['All web projects'],
      additionalTags: ['Browser extensions', '+1'],
      projectCount: 1,
    },
    {
      title: 'Go',
      icon: <Zap className="w-6 h-6" />,
      iconColor: 'from-cyan-400 to-blue-500',
      level: 'Advanced' as const,
      years: 3,
      description: 'High-performance microservices, CLI tools, concurrent systems',
      projects: ['Performance-critical services'],
      additionalTags: ['DevOps tooling'],
      projectCount: 1,
    },
    {
      title: 'Java',
      icon: <Coffee className="w-6 h-6" />,
      iconColor: 'from-red-400 to-orange-500',
      level: 'Advanced' as const,
      years: 5,
      description: 'Enterprise applications, Spring Boot, microservices architecture',
      projects: ['Enterprise systems'],
      additionalTags: ['Backend services'],
      projectCount: 1,
    },
    {
      title: 'Rust',
      icon: <Shield className="w-6 h-6" />,
      iconColor: 'from-orange-400 to-red-500',
      level: 'Intermediate' as const,
      years: 2,
      description: 'Systems programming, WebAssembly modules, performance optimization',
      projects: ['Performance optimization'],
      additionalTags: ['WASM components'],
      projectCount: 1,
    },
  ];

  // Frontend Technologies
  const frontendTechnologies = [
    {
      title: 'React & Next.js',
      icon: <Layers className="w-6 h-6" />,
      iconColor: 'from-cyan-400 to-blue-500',
      level: 'Expert' as const,
      years: 6,
      description: 'Building scalable web applications with SSR, SSG, and modern React patterns',
      projects: ['QuizMentor', 'Portfolio'],
      additionalTags: ['DevMentor', '+3'],
      projectCount: 5,
    },
    {
      title: 'React Native',
      icon: <Smartphone className="w-6 h-6" />,
      iconColor: 'from-purple-400 to-pink-500',
      level: 'Expert' as const,
      years: 4,
      description: 'Cross-platform mobile development with Expo and native modules',
      projects: ['QuizMentor Mobile'],
      additionalTags: ['60+ animations'],
      projectCount: 2,
    },
    {
      title: 'Tailwind CSS',
      icon: <Palette className="w-6 h-6" />,
      iconColor: 'from-teal-400 to-cyan-500',
      level: 'Expert' as const,
      years: 3,
      description: 'Utility-first CSS framework for rapid UI development',
      projects: ['All projects'],
      projectCount: 10,
    },
  ];

  // Backend Technologies
  const backendTechnologies = [
    {
      title: 'Node.js & Express',
      icon: <Server className="w-6 h-6" />,
      iconColor: 'from-green-400 to-emerald-500',
      level: 'Expert' as const,
      years: 6,
      description: 'RESTful APIs, GraphQL, microservices, real-time applications',
      projects: ['All backend services'],
      projectCount: 8,
    },
    {
      title: 'FastAPI',
      icon: <Rocket className="w-6 h-6" />,
      iconColor: 'from-green-400 to-teal-500',
      level: 'Advanced' as const,
      years: 3,
      description: 'High-performance Python APIs with automatic documentation',
      projects: ['Chameleon', 'ML Services'],
      projectCount: 3,
    },
    {
      title: 'GraphQL',
      icon: <GitBranch className="w-6 h-6" />,
      iconColor: 'from-pink-400 to-purple-500',
      level: 'Advanced' as const,
      years: 4,
      description: 'Schema design, resolvers, Apollo Server, and federation',
      projects: ['Enterprise APIs'],
      projectCount: 2,
    },
  ];

  // Cloud & DevOps
  const cloudDevOps = [
    {
      title: 'AWS',
      icon: <Cloud className="w-6 h-6" />,
      iconColor: 'from-orange-400 to-yellow-500',
      level: 'Expert' as const,
      years: 5,
      description: 'EC2, Lambda, S3, RDS, CloudFront, API Gateway',
      projects: ['All cloud infrastructure'],
      projectCount: 6,
    },
    {
      title: 'Docker & Kubernetes',
      icon: <Package className="w-6 h-6" />,
      iconColor: 'from-blue-400 to-cyan-500',
      level: 'Advanced' as const,
      years: 4,
      description: 'Container orchestration, Helm charts, service mesh',
      projects: ['Microservices deployment'],
      projectCount: 4,
    },
    {
      title: 'CI/CD',
      icon: <GitBranch className="w-6 h-6" />,
      iconColor: 'from-green-400 to-blue-500',
      level: 'Expert' as const,
      years: 6,
      description: 'GitHub Actions, Jenkins, automated testing and deployment',
      projects: ['All projects'],
      projectCount: 10,
    },
  ];

  // AI/ML Technologies
  const aimlTechnologies = [
    {
      title: 'LangChain',
      icon: <Brain className="w-6 h-6" />,
      iconColor: 'from-purple-400 to-pink-500',
      level: 'Expert' as const,
      years: 2,
      description: 'Building LLM applications with chains, agents, and RAG systems',
      projects: ['DevMentor', 'Chameleon'],
      projectCount: 3,
    },
    {
      title: 'OpenAI & Anthropic',
      icon: <Sparkles className="w-6 h-6" />,
      iconColor: 'from-green-400 to-cyan-500',
      level: 'Expert' as const,
      years: 2,
      description: 'Prompt engineering, function calling, fine-tuning, embeddings',
      projects: ['All AI projects'],
      projectCount: 5,
    },
    {
      title: 'Vector Databases',
      icon: <Database className="w-6 h-6" />,
      iconColor: 'from-blue-400 to-purple-500',
      level: 'Advanced' as const,
      years: 2,
      description: 'Qdrant, Pinecone, Weaviate for semantic search and RAG',
      projects: ['DevMentor', 'Chameleon'],
      projectCount: 2,
    },
  ];

  // Databases
  const databases = [
    {
      title: 'PostgreSQL',
      icon: <Database className="w-6 h-6" />,
      iconColor: 'from-blue-400 to-blue-600',
      level: 'Expert' as const,
      years: 7,
      description: 'Complex queries, optimization, migrations, replication',
      projects: ['All production apps'],
      projectCount: 8,
    },
    {
      title: 'MongoDB',
      icon: <Layers className="w-6 h-6" />,
      iconColor: 'from-green-400 to-green-600',
      level: 'Advanced' as const,
      years: 5,
      description: 'Document modeling, aggregation pipelines, sharding',
      projects: ['Real-time applications'],
      projectCount: 4,
    },
    {
      title: 'Redis',
      icon: <Zap className="w-6 h-6" />,
      iconColor: 'from-red-400 to-red-600',
      level: 'Advanced' as const,
      years: 4,
      description: 'Caching, pub/sub, session management, queues',
      projects: ['High-performance services'],
      projectCount: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <SectionTitle>Skills Component Showcase</SectionTitle>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
            Comprehensive breakdown of technical skills using granular, reusable components
          </p>
        </div>

        {/* Individual Component Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Individual Components</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skill Levels */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Skill Levels</h3>
              <div className="flex flex-wrap gap-2">
                <SkillLevel level="Expert" />
                <SkillLevel level="Advanced" />
                <SkillLevel level="Intermediate" />
                <SkillLevel level="Beginner" />
              </div>
            </div>

            {/* Years Experience */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Experience</h3>
              <div className="space-y-2">
                <YearsExperience years={6} />
                <YearsExperience years={3} suffix="months" />
                <YearsExperience years={10} />
              </div>
            </div>

            {/* Skill Icons */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Skill Icons</h3>
              <div className="flex gap-3">
                <SkillIcon icon="JS" size="sm" color="from-yellow-400 to-orange-500" />
                <SkillIcon
                  icon={<Code className="w-6 h-6" />}
                  size="md"
                  color="from-blue-400 to-blue-600"
                />
                <SkillIcon icon="PY" size="lg" color="from-green-400 to-emerald-600" />
              </div>
            </div>

            {/* Project Tags */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Project Tags</h3>
              <div className="flex flex-wrap gap-2">
                <ProjectTag name="QuizMentor" />
                <ProjectTag name="DevMentor" count={2} />
                <ProjectTag name="All projects" />
              </div>
            </div>

            {/* Progress Bars */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Skill Progress</h3>
              <div className="space-y-4">
                <SkillProgress percentage={95} color="from-green-500 to-emerald-500" />
                <SkillProgress percentage={75} color="from-blue-500 to-cyan-500" />
                <SkillProgress
                  percentage={60}
                  color="from-yellow-500 to-orange-500"
                  showLabel={false}
                />
              </div>
            </div>

            {/* Skill Stats */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Skill Stats</h3>
              <div className="space-y-2">
                <SkillStat label="Projects" value="25+" icon={<Rocket className="w-4 h-4" />} />
                <SkillStat
                  label="Lines of Code"
                  value="500K+"
                  icon={<Code className="w-4 h-4" />}
                />
                <SkillStat label="Commits" value="5000+" icon={<GitBranch className="w-4 h-4" />} />
              </div>
            </div>
          </div>
        </section>

        {/* Programming Languages Section */}
        <SkillCategorySection
          icon={<Code className="w-6 h-6" />}
          title="Programming Languages"
          subtitle="Core languages for system development"
          iconColor="from-blue-500 to-cyan-500"
        >
          <SkillGrid columns={3}>
            {programmingLanguages.map((lang, index) => (
              <SkillCard key={index} {...lang} />
            ))}
          </SkillGrid>
        </SkillCategorySection>

        {/* Frontend Technologies */}
        <SkillCategorySection
          icon={<Globe className="w-6 h-6" />}
          title="Frontend Technologies"
          subtitle="Modern web and mobile development"
          iconColor="from-purple-500 to-pink-500"
        >
          <SkillGrid columns={3}>
            {frontendTechnologies.map((tech, index) => (
              <SkillCard key={index} {...tech} />
            ))}
          </SkillGrid>
        </SkillCategorySection>

        {/* Backend Technologies */}
        <SkillCategorySection
          icon={<Server className="w-6 h-6" />}
          title="Backend Technologies"
          subtitle="Server-side development and APIs"
          iconColor="from-green-500 to-emerald-500"
        >
          <SkillGrid columns={3}>
            {backendTechnologies.map((tech, index) => (
              <SkillCard key={index} {...tech} />
            ))}
          </SkillGrid>
        </SkillCategorySection>

        {/* Cloud & DevOps */}
        <SkillCategorySection
          icon={<Cloud className="w-6 h-6" />}
          title="Cloud & DevOps"
          subtitle="Infrastructure and deployment"
          iconColor="from-orange-500 to-yellow-500"
        >
          <SkillGrid columns={3}>
            {cloudDevOps.map((tech, index) => (
              <SkillCard key={index} {...tech} />
            ))}
          </SkillGrid>
        </SkillCategorySection>

        {/* AI/ML Technologies */}
        <SkillCategorySection
          icon={<Brain className="w-6 h-6" />}
          title="AI/ML Technologies"
          subtitle="Artificial Intelligence and Machine Learning"
          iconColor="from-purple-500 to-pink-500"
        >
          <SkillGrid columns={3}>
            {aimlTechnologies.map((tech, index) => (
              <SkillCard key={index} {...tech} />
            ))}
          </SkillGrid>
        </SkillCategorySection>

        {/* Databases */}
        <SkillCategorySection
          icon={<Database className="w-6 h-6" />}
          title="Databases"
          subtitle="Data storage and management"
          iconColor="from-blue-500 to-purple-500"
        >
          <SkillGrid columns={3}>
            {databases.map((tech, index) => (
              <SkillCard key={index} {...tech} />
            ))}
          </SkillGrid>
        </SkillCategorySection>

        {/* Expandable Card Example */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Expandable Skill Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExpandableSkillCard
              title="Full-Stack Development"
              icon={<Layers className="w-6 h-6" />}
              iconColor="from-green-400 to-emerald-600"
              level="Expert"
              years={8}
              description="End-to-end application development from design to deployment"
              projects={['All projects']}
              projectCount={10}
              expandedContent={
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Comprehensive experience building production applications including:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Frontend: React, Next.js, TypeScript, Tailwind</li>
                    <li>• Backend: Node.js, Python, GraphQL, REST</li>
                    <li>• Database: PostgreSQL, MongoDB, Redis</li>
                    <li>• DevOps: Docker, Kubernetes, CI/CD</li>
                  </ul>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <SkillStat label="Production Apps" value="25+" />
                    <SkillStat label="Active Users" value="10K+" />
                  </div>
                </div>
              }
            />

            <ExpandableSkillCard
              title="AI/ML Engineering"
              icon={<Brain className="w-6 h-6" />}
              iconColor="from-purple-400 to-pink-600"
              level="Advanced"
              years={3}
              description="Building intelligent systems with modern AI technologies"
              projects={['DevMentor', 'Chameleon']}
              projectCount={5}
              expandedContent={
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Specialized in LLM applications and machine learning systems:
                  </p>
                  <div className="space-y-3">
                    <SkillProgress percentage={90} color="from-purple-500 to-pink-500" />
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <ProjectTag name="LangChain" />
                      <ProjectTag name="OpenAI" />
                      <ProjectTag name="Vector DBs" />
                      <ProjectTag name="RAG Systems" />
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}
