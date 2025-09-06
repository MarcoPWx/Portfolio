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

// Animated background component
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
      />
    </div>
  );
}

// Floating card component with 3D effect
function FloatingCard({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
      <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}

// Typewriter effect
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayText}</span>;
}

// Animated counter
function AnimatedCounter({
  end,
  duration = 2000,
  delay = 0,
  suffix = '',
}: {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [end, duration, delay]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function EnhancedPortfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Rocket },
    { id: 'products', label: 'Products', icon: Database },
    { id: 'features', label: 'Features', icon: Sparkles },
    { id: 'about', label: 'About', icon: User },
    { id: 'blog', label: 'Blog', icon: BookOpen },
  ];

  const products = [
    {
      id: 'devmentor',
      name: 'DevMentor',
      description: 'AI-powered development assistant',
      icon: Code2,
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Code Review', 'Pair Programming', 'Best Practices'],
      stats: { users: 2500, growth: '+125%' },
    },
    {
      id: 'quizmentor',
      name: 'QuizMentor',
      description: 'Interactive learning platform',
      icon: GraduationCap,
      gradient: 'from-purple-500 to-pink-500',
      features: ['AI Quizzes', 'Progress Tracking', 'Certifications'],
      stats: { users: 5000, growth: '+89%' },
    },
    {
      id: 'harvest',
      name: 'Chameleon',
      description: 'Data insights and analytics',
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500',
      features: ['Real-time Analytics', 'Custom Reports', 'Predictions'],
      stats: { users: 1000, growth: '+67%' },
    },
    {
      id: 'omni',
      name: 'Omni.ai',
      description: 'Open-source AI toolkit',
      icon: Globe,
      gradient: 'from-orange-500 to-red-500',
      features: ['100% Open Source', 'Community Driven', 'MIT License'],
      stats: { stars: 1200, contributors: 45 },
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NatureQuest</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveSection(item.id)}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                      activeSection === item.id
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link
                href="https://github.com/yourusername"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                Start your project
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-20" />
            <h1 className="relative text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Build in a weekend
              </span>
              <br />
              <span className="text-white">
                <TypewriterText text="Scale to millions" delay={500} />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto"
          >
            Start your project with a Postgres database, Authentication, instant APIs, Edge
            Functions, Realtime subscriptions, Storage, and Vector embeddings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:scale-105">
              Start your project
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-gray-800 rounded-lg font-medium hover:bg-white/20 transition-all">
              Request a demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {[
              { label: 'Active Users', value: 50000, suffix: '+' },
              { label: 'Projects Deployed', value: 1200, suffix: '+' },
              { label: 'GitHub Stars', value: 15000, suffix: '' },
              { label: 'Contributors', value: 250, suffix: '+' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter
                    end={stat.value}
                    delay={600 + index * 100}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                build at scale
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Use one or all. Best of breed products. Integrated as a platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <FloatingCard key={product.id} delay={index * 0.1}>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${product.gradient}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                          <p className="text-gray-400">{product.description}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-500" />
                    </div>

                    <div className="space-y-3 mb-6">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                      <div className="flex items-center space-x-4">
                        {product.stats.users && (
                          <div className="text-sm">
                            <span className="text-gray-500">Users: </span>
                            <span className="text-white font-semibold">
                              {product.stats.users.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {product.stats.growth && (
                          <div className="text-sm">
                            <span className="text-green-400 font-semibold">
                              {product.stats.growth}
                            </span>
                          </div>
                        )}
                        {product.stats.stars && (
                          <div className="text-sm flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-white font-semibold">{product.stats.stars}</span>
                          </div>
                        )}
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        Learn more →
                      </button>
                    </div>
                  </div>
                </FloatingCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Stay productive and manage your app</h2>
            <p className="text-xl text-gray-400">without leaving the dashboard</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: 'Postgres Database',
                description:
                  "Every project is a full Postgres database, the world's most trusted relational database.",
                features: ['100% portable', 'Built-in Auth with RLS', 'Easy to extend'],
              },
              {
                icon: Shield,
                title: 'Authentication',
                description:
                  'Add user sign ups and logins, securing your data with Row Level Security.',
                features: ['Social providers', 'Magic links', 'MFA support'],
              },
              {
                icon: Zap,
                title: 'Edge Functions',
                description: 'Write custom code without deploying or scaling servers.',
                features: ['Global deployment', 'TypeScript support', 'Instant scaling'],
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative p-8 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl">
                    <Icon className="w-12 h-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item) => (
                        <li key={item} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-20" />
            <h2 className="relative text-5xl font-bold mb-6">
              Build in a weekend,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                scale to millions
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 mb-8"
          >
            With NatureQuest, you can build production-ready applications faster than ever before.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:scale-105">
              Start building for free
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-gray-800 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch demo</span>
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500 mt-4"
          >
            Free to start, pay-as-you-grow
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NatureQuest</span>
            </div>

            <div className="flex items-center space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © 2024 NatureQuest. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
