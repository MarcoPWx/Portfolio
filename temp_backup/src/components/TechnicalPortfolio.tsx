'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Linkedin, Twitter, Mail, Download, BookOpen, 
  Code2, Rocket, Users, Heart, Coffee, ChevronRight,
  Calendar, Clock, Tag, ArrowRight, ExternalLink, User,
  Sparkles, Zap, Star, TrendingUp, Globe, Award,
  FileText, Briefcase, GraduationCap, Target, Database,
  Shield, Lock, CheckCircle, ArrowUpRight, Play,
  Terminal as TerminalIcon, Copy, Check, FileCode, Server, Cpu,
  GitBranch, Package, Layers, Activity
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

// Code editor with syntax highlighting simulation
function CodeEditor({ code, language = 'javascript', title = 'example.js', showLineNumbers = true }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code: string) => {
    // Simple syntax highlighting
    return code
      .replace(/('.*?'|".*?")/g, '<span class="text-green-400">$1</span>')
      .replace(/\b(const|let|var|function|return|if|else|for|while|import|export|default|from)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-cyan-400">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
      .replace(/(@\w+)/g, '<span class="text-yellow-400">$1</span>');
  };

  const lines = code.split('\n');

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
      <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <FileCode className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">{title}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-gray-700 rounded transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="text-gray-600 mr-4 select-none w-8 text-right">
                    {index + 1}
                  </span>
                )}
                <code 
                  dangerouslySetInnerHTML={{ __html: highlightCode(line) }}
                  className="flex-1"
                />
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Terminal component
function Terminal({ commands, title = 'Terminal' }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([]);

  useEffect(() => {
    if (currentLine < commands.length) {
      const timer = setTimeout(() => {
        if (currentChar < commands[currentLine].length) {
          setDisplayedCommands(prev => {
            const newCommands = [...prev];
            newCommands[currentLine] = commands[currentLine].substring(0, currentChar + 1);
            return newCommands;
          });
          setCurrentChar(currentChar + 1);
        } else {
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, commands]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl blur-xl" />
      <div className="relative bg-gray-950 rounded-xl overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">{title}</span>
          </div>
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
        </div>
        <div className="p-4 font-mono text-sm">
          {displayedCommands.map((cmd, index) => (
            <div key={index} className="mb-2">
              <span className="text-green-400">$</span>{' '}
              <span className="text-gray-300">{cmd}</span>
              {index === currentLine && currentChar < commands[index].length && (
                <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// API Response component
function ApiResponse({ data, endpoint }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl" />
      <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">{endpoint}</span>
          </div>
          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">200 OK</span>
        </div>
        <div className="p-4">
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

// Database schema visualization
function DatabaseSchema({ tables }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl blur-xl" />
      <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Database Schema</span>
          </div>
        </div>
        <div className="p-4">
          {tables.map((table, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span className="text-white font-semibold">{table.name}</span>
              </div>
              <div className="ml-6 space-y-1">
                {table.columns.map((column, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400">{column.name}</span>
                    <span className="text-purple-400">{column.type}</span>
                    {column.primary && (
                      <span className="text-xs px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">PK</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Real-time metrics display
function MetricsDisplay({ metrics }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl" />
      <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-400">Real-time Metrics</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">Live</span>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div key={index}>
                <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                <div className="text-2xl font-bold text-white">
                  {metric.value}
                  {metric.unit && <span className="text-sm text-gray-400 ml-1">{metric.unit}</span>}
                </div>
                {metric.change && (
                  <div className={`text-xs ${metric.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TechnicalPortfolio() {
  const [activeDemo, setActiveDemo] = useState('devmentor');
  const [activeTab, setActiveTab] = useState('code');

  // Demo configurations
  const demos = {
    devmentor: {
      name: 'DevMentor',
      description: 'AI-powered code review and pair programming',
      gradient: 'from-blue-500 to-cyan-500',
      code: `import { DevMentor } from '@naturequest/devmentor';

// Initialize AI assistant
const mentor = new DevMentor({
  apiKey: process.env.DEVMENTOR_KEY,
  model: 'gpt-4-turbo',
  context: 'react-typescript'
});

// Real-time code review
const review = await mentor.reviewCode({
  file: 'components/UserAuth.tsx',
  rules: ['security', 'performance', 'best-practices'],
  severity: 'error'
});

// AI pair programming session
const session = await mentor.startSession({
  mode: 'collaborative',
  language: 'typescript',
  framework: 'nextjs'
});

console.log(review.suggestions);`,
      terminal: [
        'npm install @naturequest/devmentor',
        'devmentor init --project react-app',
        'devmentor review --file src/App.tsx',
        '✓ 3 security issues found',
        '✓ 5 performance improvements suggested',
        '✓ Code quality score: 92/100'
      ],
      api: {
        endpoint: '/api/devmentor/review',
        data: {
          status: 'success',
          review: {
            score: 92,
            issues: [
              { type: 'security', severity: 'high', line: 45 },
              { type: 'performance', severity: 'medium', line: 67 }
            ],
            suggestions: [
              'Use memo for expensive calculations',
              'Add input validation',
              'Implement error boundaries'
            ]
          }
        }
      },
      schema: [
        {
          name: 'code_reviews',
          columns: [
            { name: 'id', type: 'uuid', primary: true },
            { name: 'user_id', type: 'uuid' },
            { name: 'file_path', type: 'text' },
            { name: 'score', type: 'integer' },
            { name: 'created_at', type: 'timestamp' }
          ]
        }
      ],
      metrics: [
        { label: 'Code Reviews', value: '2.5K', unit: '/day', change: 12 },
        { label: 'Avg Score', value: '88', unit: '/100', change: 5 },
        { label: 'Issues Fixed', value: '18K', change: 23 },
        { label: 'Response Time', value: '1.2', unit: 's', change: -15 }
      ]
    },
    quizmentor: {
      name: 'QuizMentor',
      description: 'AI-generated adaptive learning platform',
      gradient: 'from-purple-500 to-pink-500',
      code: `import { QuizMentor } from '@naturequest/quizmentor';

// Create adaptive quiz engine
const quiz = new QuizMentor({
  subject: 'JavaScript',
  difficulty: 'adaptive',
  ai_model: 'gpt-4'
});

// Generate personalized quiz
const questions = await quiz.generate({
  topics: ['async/await', 'promises', 'event-loop'],
  count: 10,
  userLevel: user.skillLevel
});

// Track learning progress
await quiz.submitAnswer({
  questionId: questions[0].id,
  answer: userAnswer,
  timeSpent: 45
});

// Get performance analytics
const analytics = await quiz.getAnalytics(userId);`,
      terminal: [
        'npx create-quiz-app my-learning-platform',
        'cd my-learning-platform',
        'npm run generate:quiz --topic=react',
        'Generating AI-powered quiz...',
        '✓ 10 questions generated',
        '✓ Difficulty: Adaptive',
        '✓ Estimated time: 15 minutes'
      ],
      api: {
        endpoint: '/api/quiz/generate',
        data: {
          quiz_id: 'qz_1234567890',
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              difficulty: 'medium',
              topic: 'React Hooks',
              question: 'What is the purpose of useEffect?',
              options: ['...'],
              explanation: 'AI-generated explanation...'
            }
          ],
          adaptive_path: true,
          estimated_time: 900
        }
      },
      schema: [
        {
          name: 'quizzes',
          columns: [
            { name: 'id', type: 'uuid', primary: true },
            { name: 'topic', type: 'text' },
            { name: 'difficulty', type: 'enum' },
            { name: 'ai_generated', type: 'boolean' },
            { name: 'completion_rate', type: 'float' }
          ]
        }
      ],
      metrics: [
        { label: 'Active Learners', value: '5.2K', change: 18 },
        { label: 'Quizzes Taken', value: '45K', unit: '/mo', change: 32 },
        { label: 'Avg Score', value: '78%', change: 8 },
        { label: 'Completion', value: '92%', change: 5 }
      ]
    },
    harvest: {
      name: 'Harvest.ai',
      description: 'Intelligent data analytics and insights',
      gradient: 'from-green-500 to-emerald-500',
      code: `import { Harvest } from '@naturequest/harvest';

// Initialize analytics engine
const harvest = new Harvest({
  dataSource: 'postgresql://...',
  ml_engine: 'tensorflow',
  realtime: true
});

// Automatic pattern detection
const patterns = await harvest.detectPatterns({
  dataset: 'user_behavior',
  timeRange: '30d',
  sensitivity: 'high'
});

// Generate predictions
const forecast = await harvest.forecast({
  metric: 'revenue',
  horizon: '3_months',
  confidence: 0.95
});

// Real-time anomaly detection
harvest.on('anomaly', (event) => {
  notifyTeam(event);
});`,
      terminal: [
        'harvest connect --database production',
        'harvest analyze --table users --period 30d',
        'Analyzing 1.2M records...',
        '✓ 3 significant patterns detected',
        '✓ Revenue trend: +23% MoM',
        '✓ Anomaly detected: Unusual spike at 14:32',
        'harvest export --format json --output report.json'
      ],
      api: {
        endpoint: '/api/harvest/analyze',
        data: {
          analysis_id: 'an_9876543210',
          patterns: [
            { type: 'seasonal', strength: 0.89, period: 'weekly' },
            { type: 'growth', rate: 0.23, confidence: 0.95 }
          ],
          forecast: {
            next_30_days: 125000,
            confidence_interval: [120000, 130000],
            trend: 'increasing'
          }
        }
      },
      schema: [
        {
          name: 'analytics_jobs',
          columns: [
            { name: 'id', type: 'uuid', primary: true },
            { name: 'dataset', type: 'text' },
            { name: 'status', type: 'enum' },
            { name: 'results', type: 'jsonb' },
            { name: 'processed_at', type: 'timestamp' }
          ]
        }
      ],
      metrics: [
        { label: 'Data Points', value: '1.2M', unit: '/day', change: 45 },
        { label: 'Predictions', value: '98.2%', unit: 'acc', change: 3 },
        { label: 'Anomalies', value: '12', change: -25 },
        { label: 'Processing', value: '0.8', unit: 's', change: -40 }
      ]
    },
    omni: {
      name: 'Omni.ai',
      description: 'Open-source AI toolkit for developers',
      gradient: 'from-orange-500 to-red-500',
      code: `// 100% Open Source - MIT License
import { Omni } from 'omni-ai';

// No API keys required - runs locally
const ai = new Omni({
  model: 'llama-2-7b',
  device: 'gpu',
  quantization: 'int8'
});

// Fine-tune on your data
await ai.finetune({
  dataset: './training-data',
  epochs: 10,
  batchSize: 32
});

// Generate completions locally
const response = await ai.complete({
  prompt: 'Explain quantum computing',
  maxTokens: 500,
  temperature: 0.7
});

// Export for production
await ai.export('./models/custom-model.onnx');`,
      terminal: [
        'git clone https://github.com/naturequest/omni',
        'cd omni && pip install -r requirements.txt',
        'omni download --model llama-2-7b',
        'Downloading model (3.8GB)...',
        '✓ Model downloaded successfully',
        'omni serve --port 8080 --device gpu',
        'Server running at http://localhost:8080'
      ],
      api: {
        endpoint: 'http://localhost:8080/v1/completions',
        data: {
          model: 'llama-2-7b-chat',
          choices: [
            {
              text: 'Quantum computing uses quantum bits...',
              finish_reason: 'stop',
              tokens: 156
            }
          ],
          usage: {
            prompt_tokens: 12,
            completion_tokens: 156,
            total_tokens: 168
          }
        }
      },
      schema: [
        {
          name: 'models',
          columns: [
            { name: 'id', type: 'text', primary: true },
            { name: 'name', type: 'text' },
            { name: 'size_gb', type: 'float' },
            { name: 'quantization', type: 'text' },
            { name: 'license', type: 'text' }
          ]
        }
      ],
      metrics: [
        { label: 'GitHub Stars', value: '1.2K', change: 28 },
        { label: 'Contributors', value: '45', change: 15 },
        { label: 'Downloads', value: '8.5K', unit: '/mo', change: 52 },
        { label: 'Models', value: '12', change: 20 }
      ]
    }
  };

  const currentDemo = demos[activeDemo];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated grid background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-purple-950" />
      </div>

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NatureQuest</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </Link>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                Start your project
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Build in a weekend
            </span>
            <br />
            <span className="text-white">Scale to millions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Start your project with a Postgres database, Authentication, instant APIs, Edge Functions,
            Realtime subscriptions, Storage, and Vector embeddings.
          </motion.p>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Start building in seconds
            </h2>
            <p className="text-xl text-gray-400">
              Kickstart your next project with templates built by us and our community
            </p>
          </div>

          {/* Product selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-1">
              {Object.keys(demos).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveDemo(key)}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    activeDemo === key
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {demos[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Demo content */}
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Description */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">{currentDemo.name}</h3>
              <p className="text-gray-400">{currentDemo.description}</p>
            </div>

            {/* Tab selector */}
            <div className="flex justify-center">
              <div className="inline-flex bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-1">
                {['code', 'terminal', 'api', 'schema', 'metrics'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded transition-all capitalize ${
                      activeTab === tab
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content based on active tab */}
            <div className="max-w-5xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'code' && (
                    <CodeEditor 
                      code={currentDemo.code} 
                      title={`${currentDemo.name.toLowerCase()}.ts`}
                    />
                  )}
                  {activeTab === 'terminal' && (
                    <Terminal 
                      commands={currentDemo.terminal}
                      title="Terminal"
                    />
                  )}
                  {activeTab === 'api' && (
                    <ApiResponse 
                      data={currentDemo.api.data}
                      endpoint={currentDemo.api.endpoint}
                    />
                  )}
                  {activeTab === 'schema' && (
                    <DatabaseSchema tables={currentDemo.schema} />
                  )}
                  {activeTab === 'metrics' && (
                    <MetricsDisplay metrics={currentDemo.metrics} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature boxes with code */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Stay productive and manage your app
            </h2>
            <p className="text-xl text-gray-400">
              without leaving the dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Postgres Database */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Database className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold">Postgres Database</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Every project is a full Postgres database, the world's most trusted relational database.
              </p>
              <CodeEditor
                code={`-- Create a new table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = user_id);`}
                language="sql"
                title="schema.sql"
                showLineNumbers={true}
              />
            </motion.div>

            {/* Authentication */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold">Authentication</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Add user sign ups and logins, securing your data with Row Level Security.
              </p>
              <CodeEditor
                code={`import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)

// Sign up new user
const { user, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password',
  options: {
    data: { 
      full_name: 'John Doe',
      avatar_url: 'https://...'
    }
  }
})

// Sign in with OAuth
await supabase.auth.signInWithOAuth({
  provider: 'github'
})`}
                language="javascript"
                title="auth.js"
                showLineNumbers={true}
              />
            </motion.div>

            {/* Edge Functions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl font-bold">Edge Functions</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Write custom code without deploying or scaling servers.
              </p>
              <CodeEditor
                code={`// supabase/functions/hello-world/index.ts
import { serve } from 'https://deno.land/std/http/server.ts'

serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: \`Hello \${name}!\`,
    timestamp: new Date().toISOString(),
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})`}
                language="typescript"
                title="hello-world/index.ts"
                showLineNumbers={true}
              />
            </motion.div>

            {/* Realtime */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold">Realtime</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Build multiplayer experiences with real-time data synchronization.
              </p>
              <CodeEditor
                code={`// Subscribe to changes
const channel = supabase.channel('room1')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages'
  }, (payload) => {
    console.log('New message:', payload.new)
    updateUI(payload.new)
  })
  .subscribe()

// Broadcast to all clients
channel.send({
  type: 'broadcast',
  event: 'cursor',
  payload: { x: 100, y: 200 }
})`}
                language="javascript"
                title="realtime.js"
                showLineNumbers={true}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Developers', value: '50K+', icon: Users },
              { label: 'Projects', value: '100K+', icon: Rocket },
              { label: 'API Requests', value: '1B+', icon: Activity },
              { label: 'Uptime', value: '99.99%', icon: Shield }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to build something amazing?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Start your project in seconds, not hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
              Start your project
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-gray-800 rounded-lg font-medium hover:bg-white/20 transition-all">
              Request a demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
