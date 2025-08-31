'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function PersonalPortfolio() {
  const [activeSection, setActiveSection] = useState('about');

  const navItems = [
    { id: 'about', label: 'About Me', icon: User },
    { id: 'products', label: 'Products', icon: Rocket },
    { id: 'cv', label: 'CV/Resume', icon: Briefcase },
    { id: 'opensource', label: 'Open Source', icon: Github },
    { id: 'blog', label: 'Blog & Book', icon: BookOpen },
  ];

  const products = [
    {
      id: 'devmentor',
      name: 'DevMentor',
      description: 'AI-powered development assistant that helps you write better code faster',
      icon: Zap,
      color: 'blue',
      href: 'https://devmentor.naturequest.dev',
      stats: { users: '2.5k+', rating: '4.9' },
    },
    {
      id: 'quizmentor',
      name: 'QuizMentor',
      description: 'Interactive learning platform with AI-generated quizzes',
      icon: Star,
      color: 'purple',
      href: 'https://quizmentor.naturequest.dev',
      stats: { users: '5k+', rating: '4.8' },
    },
    {
      id: 'harvest',
      name: 'Harvest.ai',
      description: 'Data insights and analytics for your business growth',
      icon: TrendingUp,
      color: 'green',
      href: 'https://harvest.naturequest.dev',
      stats: { users: '1k+', rating: '4.7' },
    },
    {
      id: 'omni',
      name: 'Omni.ai',
      description: 'Free open-source AI toolkit for developers',
      icon: Globe,
      color: 'orange',
      href: 'https://github.com/yourusername/omni',
      badge: 'Open Source',
      stats: { stars: '1.2k', forks: '234' },
    },
  ];

  const experience = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'Tech Corp',
      period: '2021 - Present',
      description: 'Leading development of AI-powered applications',
      tech: ['React', 'Node.js', 'Python', 'AWS'],
    },
    {
      title: 'Software Engineer',
      company: 'StartupXYZ',
      period: '2019 - 2021',
      description: 'Built scalable microservices architecture',
      tech: ['Go', 'Kubernetes', 'PostgreSQL'],
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency',
      period: '2017 - 2019',
      description: 'Full-stack web development for clients',
      tech: ['JavaScript', 'PHP', 'MySQL'],
    },
  ];

  const openSourceProjects = [
    {
      name: 'Omni.ai',
      description: 'Universal AI toolkit for developers',
      stars: 1234,
      forks: 234,
      language: 'TypeScript',
      url: 'https://github.com/yourusername/omni',
    },
    {
      name: 'React Hooks Collection',
      description: 'Useful React hooks for common use cases',
      stars: 567,
      forks: 89,
      language: 'JavaScript',
      url: 'https://github.com/yourusername/react-hooks',
    },
    {
      name: 'CLI Tool Builder',
      description: 'Framework for building CLI applications',
      stars: 345,
      forks: 56,
      language: 'Go',
      url: 'https://github.com/yourusername/cli-builder',
    },
  ];

  const blogPosts = [
    {
      title: 'Building AI-Powered Applications: A Comprehensive Guide',
      excerpt: 'Learn how to integrate AI into your applications effectively...',
      date: '2024-01-20',
      readTime: '12 min',
      tags: ['AI', 'Development', 'Best Practices'],
      featured: true,
    },
    {
      title: 'The Future of Web Development with AI',
      excerpt: 'Exploring how AI is transforming the way we build web applications...',
      date: '2024-01-15',
      readTime: '8 min',
      tags: ['AI', 'Web Development'],
    },
    {
      title: 'Microservices Architecture: Lessons Learned',
      excerpt: 'Real-world insights from building and scaling microservices...',
      date: '2024-01-10',
      readTime: '15 min',
      tags: ['Architecture', 'DevOps'],
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">YN</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Your Name</h1>
                <p className="text-xl text-gray-400">Full-Stack Developer & AI Enthusiast</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-300" />
                </a>
                <a
                  href="https://linkedin.com"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-gray-300" />
                </a>
                <a
                  href="https://twitter.com"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-300" />
                </a>
                <a
                  href="mailto:your@email.com"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-300" />
                </a>
              </div>
            </div>

            {/* About Content */}
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate full-stack developer with over 7 years of experience building
                innovative web applications and AI-powered solutions. My journey in tech has led me
                to create the NatureQuest ecosystem - a suite of tools designed to empower
                developers and learners alike.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                When I'm not coding, you'll find me writing about technology, contributing to
                open-source projects, or exploring the latest advancements in artificial
                intelligence. I believe in building tools that make a difference and sharing
                knowledge with the developer community.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Years Experience', value: '7+' },
                { label: 'Projects Completed', value: '50+' },
                { label: 'Open Source Repos', value: '15' },
                { label: 'Blog Articles', value: '42' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'TypeScript',
                  'React',
                  'Next.js',
                  'Node.js',
                  'Python',
                  'Go',
                  'PostgreSQL',
                  'MongoDB',
                  'AWS',
                  'Docker',
                  'Kubernetes',
                  'GraphQL',
                  'TensorFlow',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'products':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">NatureQuest Ecosystem</h2>
              <p className="text-gray-400">Building tools that empower developers and learners</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => {
                const Icon = product.icon;
                return (
                  <motion.a
                    key={product.id}
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="block p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-${product.color}-500/20`}>
                          <Icon className={`w-6 h-6 text-${product.color}-400`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                          {product.badge && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-gray-400 mb-4">{product.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      {product.stats.users && (
                        <span className="flex items-center text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {product.stats.users} users
                        </span>
                      )}
                      {product.stats.rating && (
                        <span className="flex items-center text-gray-500">
                          <Star className="w-4 h-4 mr-1" />
                          {product.stats.rating}
                        </span>
                      )}
                      {product.stats.stars && (
                        <span className="flex items-center text-gray-500">
                          <Star className="w-4 h-4 mr-1" />
                          {product.stats.stars} stars
                        </span>
                      )}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        );

      case 'cv':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Resume / CV</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((job, idx) => (
                  <div key={idx} className="pl-8 border-l-2 border-gray-700 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full" />
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{job.title}</h4>
                          <p className="text-blue-400">{job.company}</p>
                        </div>
                        <span className="text-sm text-gray-400">{job.period}</span>
                      </div>
                      <p className="text-gray-400 mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Education
              </h3>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white">Bachelor of Computer Science</h4>
                <p className="text-blue-400">University Name</p>
                <p className="text-sm text-gray-400">2013 - 2017</p>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'AWS Certified Solutions Architect',
                  'Google Cloud Professional',
                  'Kubernetes Administrator',
                  'MongoDB Certified Developer',
                ].map((cert) => (
                  <div key={cert} className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-white">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'opensource':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Open Source Contributions</h2>
              <p className="text-gray-400">Building and contributing to the developer community</p>
            </div>

            <div className="space-y-4">
              {openSourceProjects.map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white flex items-center">
                        {project.name}
                        <ExternalLink className="w-4 h-4 ml-2 text-gray-500" />
                      </h3>
                      <p className="text-gray-400 mt-2">{project.description}</p>
                      <div className="flex items-center space-x-4 mt-4">
                        <span className="flex items-center text-sm text-gray-500">
                          <Star className="w-4 h-4 mr-1" />
                          {project.stars}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                          <Code2 className="w-4 h-4 mr-1" />
                          {project.forks}
                        </span>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                          {project.language}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-blue-500/30">
              <h3 className="text-xl font-semibold text-white mb-2">Contribution Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {[
                  { label: 'Total Commits', value: '2,847' },
                  { label: 'Pull Requests', value: '156' },
                  { label: 'Issues Opened', value: '89' },
                  { label: 'Projects', value: '15' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'blog':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Blog & Writing</h2>
              <p className="text-gray-400">Thoughts on technology, AI, and software development</p>
            </div>

            {/* Book Announcement */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-8 border border-purple-500/30 mb-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <BookOpen className="w-8 h-8 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    📚 Coming Soon: "Building AI-Powered Applications"
                  </h3>
                  <p className="text-gray-300 mb-4">
                    I'm writing a comprehensive guide on integrating AI into modern applications.
                    From fundamentals to advanced techniques, this book covers everything you need
                    to build intelligent software.
                  </p>
                  <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Pre-order Now
                    </button>
                    <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                      Read Sample Chapter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="space-y-4">
              {blogPosts.map((post, idx) => (
                <article
                  key={idx}
                  className={`p-6 bg-gray-800/50 rounded-lg border ${
                    post.featured ? 'border-blue-500/50' : 'border-gray-700'
                  } hover:border-blue-500/50 transition-all cursor-pointer`}
                >
                  {post.featured && (
                    <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full mb-3">
                      Featured
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
                View All Posts
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">NatureQuest</span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <Link
              href="/accounts"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">© 2024 NatureQuest. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
