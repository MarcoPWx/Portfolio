'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Home, BookOpen, Terminal } from 'lucide-react';

export function TopNav() {
  const pathname = usePathname();
  const getActive = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/book') return 'book';
    if (pathname === '/tools') return 'tools';
    if (pathname === '/teamplay') return 'teamplay';
    return '';
  };
  const active = getActive();
  const item = (href: string, label: string, icon: React.ReactNode, isActive: boolean) => (
    <Link
      href={href}
      className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
        isActive
          ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800">
      <div className="w-full max-w-[90%] 2xl:max-w-[85%] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">
              <span className="text-white">Pixel</span>
              <span className="text-green-400">Quest</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {item('/', 'Home', <Home className="w-4 h-4" />, active === 'home')}
            {item('/book', 'Book', <BookOpen className="w-4 h-4" />, active === 'book')}
            {item('/tools', 'Tools', <Terminal className="w-4 h-4" />, active === 'tools')}
            {item('/teamplay', 'TeamPlay', <Home className="w-4 h-4" />, active === 'teamplay')}
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="https://linkedin.com/in/mapw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/MarcoPWx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

