'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Users,
  Code2,
  GitBranch,
  Star,
  TrendingUp,
  Zap,
  Coffee,
  Award,
  Activity,
  Download,
  Eye,
  GitCommit,
  Package,
  Server,
  Database,
  Cloud,
  Clock,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Rocket,
  Shield,
  CheckCircle,
  AlertCircle,
  XCircle,
  Timer,
  Cpu,
  HardDrive,
  Wifi,
} from 'lucide-react';
import { AnimatedCounter, AnimatedPercentage, AnimatedStat } from './ui/AnimatedCounter';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
  suffix?: string;
  prefix?: string;
  color?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  suffix = '',
  prefix = '',
  color = 'green',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="relative bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-6 hover:border-gray-700 transition-all overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 via-transparent to-${color}-600/5`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow effect */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 bg-${color}-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`p-3 bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 rounded-xl border border-${color}-500/20`}
            >
              {icon}
            </div>

            {change !== undefined && (
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  change > 0 ? 'text-green-400' : change < 0 ? 'text-red-400' : 'text-gray-400'
                }`}
              >
                {change > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : change < 0 ? (
                  <TrendingUp className="w-3 h-3 rotate-180" />
                ) : null}
                <span>{Math.abs(change)}%</span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">
              {typeof value === 'number' ? (
                <AnimatedCounter
                  value={value}
                  prefix={prefix}
                  suffix={suffix}
                  duration={2000}
                  delay={delay * 100}
                />
              ) : (
                value
              )}
            </div>
            <div className="text-sm text-gray-400">{title}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface LiveMetricProps {
  label: string;
  value: number;
  max: number;
  color?: string;
  icon?: React.ReactNode;
}

const LiveMetric: React.FC<LiveMetricProps> = ({ label, value, max, color = 'green', icon }) => {
  const percentage = (value / max) * 100;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-gray-400">{label}</span>
        </div>
        <span className="text-white font-medium">
          <AnimatedCounter value={value} duration={1500} />/{max}
        </span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-400`}
        />
      </div>
    </div>
  );
};

export const StatsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'performance' | 'github'>(
    'overview',
  );
  const [liveVisitors, setLiveVisitors] = useState(142);

  // Simulate live visitor count
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors((prev) => {
        const change = Math.floor(Math.random() * 7) - 3;
        const newValue = prev + change;
        return Math.max(50, Math.min(300, newValue));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const overviewStats = [
    {
      title: 'Total Projects',
      value: 47,
      change: 12,
      icon: <Rocket className="w-5 h-5 text-purple-400" />,
      color: 'purple',
    },
    {
      title: 'Active Users',
      value: 12847,
      change: 23,
      icon: <Users className="w-5 h-5 text-blue-400" />,
      color: 'blue',
      suffix: '+',
    },
    {
      title: 'Code Commits',
      value: 3426,
      change: 8,
      icon: <GitCommit className="w-5 h-5 text-green-400" />,
      color: 'green',
    },
    {
      title: 'API Calls',
      value: 1284739,
      change: 45,
      icon: <Activity className="w-5 h-5 text-orange-400" />,
      color: 'orange',
    },
    {
      title: 'Uptime',
      value: 99.97,
      change: 0.02,
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      color: 'cyan',
      suffix: '%',
    },
    {
      title: 'Response Time',
      value: 42,
      change: -15,
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      color: 'yellow',
      suffix: 'ms',
    },
  ];

  const projectStats = [
    {
      title: 'QuizMentor Users',
      value: 8420,
      change: 34,
      icon: <Users className="w-5 h-5 text-purple-400" />,
      color: 'purple',
    },
    {
      title: 'Questions Generated',
      value: 52847,
      change: 28,
      icon: <Database className="w-5 h-5 text-blue-400" />,
      color: 'blue',
    },
    {
      title: 'Chameleon Tokens',
      value: 1847392,
      change: 67,
      icon: <Cpu className="w-5 h-5 text-green-400" />,
      color: 'green',
    },
    {
      title: 'DevMentor Sessions',
      value: 3847,
      change: 42,
      icon: <Code2 className="w-5 h-5 text-orange-400" />,
      color: 'orange',
    },
  ];

  const performanceMetrics = [
    {
      label: 'CPU Usage',
      value: 42,
      max: 100,
      color: 'green',
      icon: <Cpu className="w-4 h-4 text-gray-400" />,
    },
    {
      label: 'Memory Usage',
      value: 67,
      max: 100,
      color: 'blue',
      icon: <HardDrive className="w-4 h-4 text-gray-400" />,
    },
    {
      label: 'Network I/O',
      value: 28,
      max: 100,
      color: 'purple',
      icon: <Wifi className="w-4 h-4 text-gray-400" />,
    },
    {
      label: 'Storage Used',
      value: 73,
      max: 100,
      color: 'orange',
      icon: <Database className="w-4 h-4 text-gray-400" />,
    },
  ];

  const githubStats = [
    {
      title: 'Total Stars',
      value: 2847,
      change: 18,
      icon: <Star className="w-5 h-5 text-yellow-400" />,
      color: 'yellow',
    },
    {
      title: 'Forks',
      value: 423,
      change: 8,
      icon: <GitBranch className="w-5 h-5 text-blue-400" />,
      color: 'blue',
    },
    {
      title: 'Contributors',
      value: 67,
      change: 12,
      icon: <Users className="w-5 h-5 text-green-400" />,
      color: 'green',
    },
    {
      title: 'Open Issues',
      value: 12,
      change: -25,
      icon: <AlertCircle className="w-5 h-5 text-orange-400" />,
      color: 'orange',
    },
    {
      title: 'Pull Requests',
      value: 8,
      change: 33,
      icon: <GitBranch className="w-5 h-5 text-purple-400" />,
      color: 'purple',
    },
    {
      title: 'Downloads',
      value: 18492,
      change: 52,
      icon: <Download className="w-5 h-5 text-cyan-400" />,
      color: 'cyan',
    },
  ];

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'projects' as const, label: 'Projects', icon: <Rocket className="w-4 h-4" /> },
    { id: 'performance' as const, label: 'Performance', icon: <Activity className="w-4 h-4" /> },
    { id: 'github' as const, label: 'GitHub', icon: <GitBranch className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header with Live Visitors */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400">Real-time metrics and performance indicators</p>
        </div>

        {/* Live Visitors Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 px-4 py-2 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800"
        >
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
          </div>
          <span className="text-sm text-gray-400">Live Visitors:</span>
          <span className="text-lg font-bold text-white">
            <AnimatedCounter value={liveVisitors} duration={500} />
          </span>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg shadow-green-500/25'
                : 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Stats Grid */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {overviewStats.map((stat, index) => (
              <StatCard key={stat.title} {...stat} delay={index * 0.1} />
            ))}
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projectStats.map((stat, index) => (
                <StatCard key={stat.title} {...stat} delay={index * 0.1} />
              ))}
            </div>

            {/* Project Timeline */}
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Activity Timeline</h3>
              <div className="space-y-4">
                {[
                  'QuizMentor v2.0 Released',
                  'Chameleon Beta Launch',
                  'DevMentor Integration',
                  'Omni.ai Alpha',
                ].map((event, index) => (
                  <motion.div
                    key={event}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div className="flex-1">
                      <p className="text-white">{event}</p>
                      <p className="text-xs text-gray-400">
                        {index === 0 ? 'Today' : `${index * 3} days ago`}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Live Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-6">
                <h3 className="text-xl font-bold text-white mb-6">System Resources</h3>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <LiveMetric {...metric} />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-800 p-6">
                <h3 className="text-xl font-bold text-white mb-6">Response Times</h3>
                <div className="space-y-6">
                  {[
                    { endpoint: 'API Gateway', time: 42, status: 'healthy' },
                    { endpoint: 'Database', time: 18, status: 'healthy' },
                    { endpoint: 'Cache Layer', time: 3, status: 'healthy' },
                    { endpoint: 'CDN', time: 12, status: 'healthy' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.endpoint}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${item.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}
                        />
                        <span className="text-gray-400">{item.endpoint}</span>
                      </div>
                      <span className="text-white font-medium">
                        <AnimatedCounter value={item.time} suffix="ms" duration={1000} />
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'github' && (
          <motion.div
            key="github"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {githubStats.map((stat, index) => (
              <StatCard key={stat.title} {...stat} delay={index * 0.1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
