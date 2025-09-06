'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Home,
  BookOpen,
  Terminal,
  Mail,
  User,
  Layers,
  Code,
  Lightbulb,
  Menu,
  X,
} from 'lucide-react';
import BookPreview from '../../../components/BookPreview';

// Navigation component matching InteractivePortfolio
function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPath = '/book';

  const sections = [
    { href: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { href: '/', label: 'About', icon: <User className="w-4 h-4" />, hash: '#about' },
    { href: '/', label: 'Stack', icon: <Layers className="w-4 h-4" />, hash: '#skills' },
    { href: '/', label: 'Projects', icon: <Code className="w-4 h-4" />, hash: '#projects' },
    { href: '/book', label: 'Book', icon: <BookOpen className="w-4 h-4" /> },
    { href: '/tools', label: 'Tools', icon: <Terminal className="w-4 h-4" /> },
    {
      href: '/',
      label: 'Principles',
      icon: <Lightbulb className="w-4 h-4" />,
      hash: '#principles',
    },
    { href: '/', label: 'Contact', icon: <Mail className="w-4 h-4" />, hash: '#contact' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800"
      style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
    >
      <div className="w-full max-w-[90%] 2xl:max-w-[85%] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <span className="font-bold text-lg">
              <span className="text-white">Pixel</span>
              <span className="text-green-400">Quest</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {sections.map((section) => (
              <Link
                key={section.label}
                href={section.hash ? `${section.href}${section.hash}` : section.href}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  section.href === '/book'
                    ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                }`}
              >
                {section.icon}
                <span>{section.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <motion.a
              href="https://linkedin.com/in/mapw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://github.com/MarcoPWx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* Desktop Social Links */}
          <motion.a
            href="https://linkedin.com/in/mapw"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden lg:block p-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://github.com/MarcoPWx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden lg:block p-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <Github className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden border-t border-gray-800"
            >
              <div className="py-4 space-y-2">
                {sections.map((section) => (
                  <Link
                    key={`m-${section.label}`}
                    href={section.hash ? `${section.href}${section.hash}` : section.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      section.href === '/book'
                        ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                    }`}
                  >
                    {section.icon}
                    <span>{section.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      <Navigation />
      <BookPreview />
    </div>
  );
}
