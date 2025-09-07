'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui';
import { ProjectTag } from './ui/SkillCard';
import {
  Layers,
  Server,
  Brain,
  Database,
  Cloud,
  Shield,
  TestTube,
  BookOpen,
  Network,
} from 'lucide-react';

// A project-referenced stack view without skill level tags.
// Each technology lists: projects used in + concrete example usage lines.

export function ProjectStack() {
  type ProjectId =
    | 'all'
    | 'quizmentor'
    | 'ai-os-ce'
    | 'ai-os-pro'
    | 'chameleon'
    | 'voiceapp'
    | 'opensource';
  const [filter, setFilter] = useState<ProjectId>('all');

  const categories = useMemo(
    () => [
      {
        id: 'frontend',
        icon: <Layers className="w-5 h-5 text-cyan-400" />,
        title: 'Frontend UI',
        items: [
          {
            tech: 'Next.js + React + TypeScript',
            usedIn: ['AI-OS-CE', 'AI-OS-Pro', 'Chameleon'],
            usedIds: ['ai-os-ce', 'ai-os-pro', 'chameleon'],
            examples: [
              'App Router + RSC where useful (AI-OS-Pro)',
              'Next.js 15.5 streaming API routes (Chameleon)',
              'Documentation sites and dashboards (AI-OS-CE)',
            ],
          },
          {
            tech: 'React Native + Expo + RN Web',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: [
              'Native + web UI via Expo and React Native Web',
              'Animations (Lottie) and UX haptics for gameplay',
            ],
          },
          {
            tech: 'Expo (React Native, managed)',
            usedIn: ['VoiceApp'],
            usedIds: ['voiceapp'],
            examples: [
              'Push-to-talk UI with realtime audio capture',
              'Speech-to-Text and Text-to-Speech integration',
              'Wake word detection and voice biometrics',
              'WebRTC for realtime voice streaming',
            ],
          },
          {
            tech: 'Expo Router',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['File-based routing for app flows and labs'],
          },
          {
            tech: 'React Navigation (stack/tabs)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Stack + bottom-tabs navigation in AppWithNav.tsx'],
          },
          {
            tech: 'Zustand (state)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Gameplay/session store actions (start/answer/next/reset)'],
          },
          {
            tech: 'React Query (TanStack)',
            usedIn: ['AI-OS-Pro', 'Chameleon', 'QuizMentor'],
            usedIds: ['ai-os-pro', 'chameleon', 'quizmentor'],
            examples: [
              'Client caching for multi-agent state (AI-OS-Pro)',
              'SSR-safe caching and SWR patterns (Chameleon)',
              'useQuizCategories/useQuizQuestions hooks (QuizMentor)',
            ],
          },
          {
            tech: 'Tailwind CSS / NativeWind',
            usedIn: ['AI-OS-CE', 'AI-OS-Pro', 'Chameleon', 'QuizMentor', 'VoiceApp'],
            usedIds: ['ai-os-ce', 'ai-os-pro', 'chameleon', 'quizmentor', 'voiceapp'],
            examples: [
              'Utility-first styling; PostCSS/Autoprefixer',
              'NativeWind for RN components (QuizMentor)',
              'Custom design systems (AI-OS-Pro)',
            ],
          },
          {
            tech: 'axios (networking)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['HTTP client with interceptors and retry semantics'],
          },
          {
            tech: 'Lottie RN + Toasts',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Delightful animations and feedback toasts in gameplay'],
          },
          {
            tech: 'Expo Notifications (haptics/av)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Register, channel setup, schedule reminders; tests mock scheduling'],
          },
          {
            tech: 'React Markdown + remark-gfm + Mermaid',
            usedIn: ['AI-OS-CE', 'AI-OS-Pro', 'Chameleon'],
            usedIds: ['ai-os-ce', 'ai-os-pro', 'chameleon'],
            examples: [
              'Docs rendering and diagrams in UI/Storybook',
              'Architecture diagrams and S2S journey visualizations (AI-OS-CE)',
            ],
          },
          {
            tech: 'Swagger UI React',
            usedIn: ['AI-OS-Pro', 'Chameleon', 'QuizMentor'],
            usedIds: ['ai-os-pro', 'chameleon', 'quizmentor'],
            examples: [
              'Embed OpenAPI specs in stories/panels',
              'Multi-agent API documentation (AI-OS-Pro)',
            ],
          },
          {
            tech: 'Python CLI & Agent Boot',
            usedIn: ['AI-OS-CE'],
            usedIds: ['ai-os-ce'],
            examples: [
              'Agent Boot CLI for DEVLOG management',
              'EPIC tracking and task management',
              'Security and performance checks',
              'Optional GitHub issue sync',
            ],
          },
        ],
      },
      {
        id: 'backend',
        icon: <Server className="w-5 h-5 text-emerald-400" />,
        title: 'Backend & APIs',
        items: [
          {
            tech: 'Express (Node.js)',
            usedIn: ['AI-OS-Pro', 'QuizMentor', 'VoiceApp'],
            usedIds: ['ai-os-pro', 'quizmentor', 'voiceapp'],
            examples: [
              'Multi-agent orchestration API (AI-OS-Pro)',
              'API with helmet/cors/rate-limit (QuizMentor)',
              'Voice: /health, /asr, /chat; multipart & OpenAI calls',
              'Dialogue management and NLP processing (Voice)',
            ],
          },
          {
            tech: 'Next.js API Routes (Node runtime)',
            usedIn: ['Chameleon'],
            usedIds: ['chameleon'],
            examples: ['SSE streaming generate/chat routes'],
          },
          {
            tech: 'Swagger/OpenAPI',
            usedIn: ['AI-OS-Pro', 'Chameleon', 'QuizMentor'],
            usedIds: ['ai-os-pro', 'chameleon', 'quizmentor'],
            examples: [
              'Multi-agent API documentation (AI-OS-Pro)',
              'OpenAPI YAML embedded in Storybook (QuizMentor)',
            ],
          },
          {
            tech: 'Supabase JS (server-side)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Server client for auth verification and DB access'],
          },
          {
            tech: 'zod (validation)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Schema-validated request/response shapes'],
          },
          {
            tech: 'Sentry + PostHog',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Error tracking and feature flags/analytics in API'],
          },
          {
            tech: 'dotenv (.env config)',
            usedIn: ['VoiceApp'],
            usedIds: ['voiceapp'],
            examples: ['Load OPENAI_API_KEY and config at server startup'],
          },
        ],
      },
      {
        id: 'realtime',
        icon: <Network className="w-5 h-5 text-blue-300" />,
        title: 'Realtime & Streaming',
        items: [
          {
            tech: 'WebSocket (ws)',
            usedIn: ['AI-OS-Pro', 'VoiceApp'],
            usedIds: ['ai-os-pro', 'voiceapp'],
            examples: [
              'Multi-agent real-time communication (AI-OS-Pro)',
              'Real-time voice streaming and dialogue state (VoiceApp)',
            ],
          },
          {
            tech: 'Socket.IO (client)',
            usedIn: ['AI-OS-Pro', 'QuizMentor'],
            usedIds: ['ai-os-pro', 'quizmentor'],
            examples: ['Agent coordination updates (AI-OS-Pro); multiplayer/presence (QuizMentor)'],
          },
          {
            tech: 'SSE (Server-Sent Events)',
            usedIn: ['Chameleon', 'QuizMentor'],
            usedIds: ['chameleon', 'quizmentor'],
            examples: ['Streaming responses/tokens in UI; SSE demo flows'],
          },
        ],
      },
      {
        id: 'aiml',
        icon: <Brain className="w-5 h-5 text-purple-400" />,
        title: 'AI / ML',
        items: [
          {
            tech: 'AI Gateway (Ollama + zod + Redis + ws)',
            usedIn: ['AI-OS-Pro'],
            usedIds: ['ai-os-pro'],
            examples: [
              'Multi-agent orchestration and coordination',
              'Idempotent chat completions; events over WebSocket',
            ],
          },
          {
            tech: 'AI SDKs: OpenAI / Anthropic / Google',
            usedIn: ['Chameleon'],
            usedIds: ['chameleon'],
            examples: ['Provider routing + fallback; embeddings; cost/latency surfacing'],
          },
          {
            tech: 'OpenAI (Whisper/Chat/Embeddings)',
            usedIn: ['VoiceApp'],
            usedIds: ['voiceapp'],
            examples: ['ASR via Whisper; concise replies; text-embedding-3-small for RAG lab'],
          },
          {
            tech: 'RAG / Vector (Qdrant)',
            usedIn: ['AI-OS-Pro'],
            usedIds: ['ai-os-pro'],
            examples: [
              'Enterprise knowledge base and retrieval',
              'Context-aware agent memory management',
            ],
          },
        ],
      },
      {
        id: 'data',
        icon: <Database className="w-5 h-5 text-blue-400" />,
        title: 'Data & Storage',
        items: [
          {
            tech: 'Redis',
            usedIn: ['AI-OS-Pro', 'Chameleon', 'QuizMentor'],
            usedIds: ['ai-os-pro', 'chameleon', 'quizmentor'],
            examples: [
              'Agent state caching and coordination (AI-OS-Pro)',
              'Metrics counters and caches (Chameleon)',
              'API-side checks and caching (QuizMentor)',
            ],
          },
          {
            tech: 'PostgreSQL',
            usedIn: ['AI-OS-Pro', 'QuizMentor'],
            usedIds: ['ai-os-pro', 'quizmentor'],
            examples: [
              'Multi-agent task and state persistence (AI-OS-Pro)',
              'Local dev DB via Docker Compose (QuizMentor)',
            ],
          },
          {
            tech: 'MMKV (client storage)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Secure local storage for sessions and preferences'],
          },
          {
            tech: 'Qdrant (Vector store)',
            usedIn: ['AI-OS-Pro', 'VoiceApp'],
            usedIds: ['ai-os-pro', 'voiceapp'],
            examples: [
              'Semantic search for enterprise RAG (AI-OS-Pro)',
              'Voice command semantic matching (VoiceApp)',
            ],
          },
          {
            tech: 'GitHub Actions',
            usedIn: ['AI-OS-CE', 'AI-OS-Pro'],
            usedIds: ['ai-os-ce', 'ai-os-pro'],
            examples: [
              'CI/CD workflows and automation (AI-OS-CE)',
              'Multi-agent deployment pipelines (AI-OS-Pro)',
            ],
          },
        ],
      },
      {
        id: 'devops',
        icon: <Cloud className="w-5 h-5 text-teal-400" />,
        title: 'Infra & DevOps',
        items: [
          {
            tech: 'Docker & Compose',
            usedIn: ['AI-OS-Pro', 'Chameleon', 'QuizMentor'],
            usedIds: ['ai-os-pro', 'chameleon', 'quizmentor'],
            examples: [
              'Multi-agent container orchestration (AI-OS-Pro)',
              'Local dev environment setup',
              'Postgres/Redis/API + Expo web service (QuizMentor)',
            ],
          },
          {
            tech: 'Kubernetes & Helm',
            usedIn: ['AI-OS-Pro'],
            usedIds: ['ai-os-pro'],
            examples: [
              'Enterprise-scale agent deployment',
              'Service mesh and policy management',
            ],
          },
          {
            tech: 'Locust (load testing)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Master/worker topology; thresholds via env; GUI/headless'],
          },
        ],
      },
      {
        id: 'security',
        icon: <Shield className="w-5 h-5 text-red-400" />,
        title: 'Security',
        items: [
          {
            tech: 'HMAC S2S + JWT',
            usedIn: ['AI-OS-Pro'],
            usedIds: ['ai-os-pro'],
            examples: [
              'Inter-agent secure communication',
              'Enterprise auth and service-to-service signing',
            ],
          },
          {
            tech: 'helmet/cors/rate-limit',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['API security headers and abuse protection (Express 4)'],
          },
          {
            tech: 'Supabase JWT (API verification)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Verify bearer tokens for protected endpoints'],
          },
          {
            tech: 'End-to-End Encryption',
            usedIn: ['VoiceApp'],
            usedIds: ['voiceapp'],
            examples: [
              'Voice data encryption in transit and at rest',
              'Secure voice biometric storage',
            ],
          },
          {
            tech: 'CSP, HSTS, COOP/COEP',
            usedIn: ['Chameleon'],
            usedIds: ['chameleon'],
            examples: ['connect-src to OpenAI/Anthropic; cross-origin isolation'],
          },
          {
            tech: 'Distributed Tracing',
            usedIn: ['AI-OS-Pro'],
            usedIds: ['ai-os-pro'],
            examples: [
              'Multi-agent request tracing',
              'Correlation ID propagation across services',
            ],
          },
          {
            tech: 'Server-only secrets; no client keys',
            usedIn: ['VoiceApp'],
            usedIds: ['voiceapp'],
            examples: ['OPENAI_API_KEY only in server/.env; client has none'],
          },
        ],
      },
      {
        id: 'testing',
        icon: <TestTube className="w-5 h-5 text-yellow-400" />,
        title: 'Testing & QA',
        items: [
          {
            tech: 'Jest + jest-expo',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Unit/integration tests for screens/services with RN mocks'],
          },
          {
            tech: 'Testing Library (React Native)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: [
              'User-centric component tests',
              'Expo web server target; multi-project desktop/mobile',
              'E2E against Storybook iframe stories',
            ],
          },
          {
            tech: 'Detox (native E2E)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['iOS/Android simulators; animations/a11y labels asserted'],
          },
          {
            tech: 'MSW (+ Storybook addon)',
            usedIn: ['QuizMentor', 'OpenSource SB'],
            usedIds: ['quizmentor', 'opensource'],
            examples: [
              'Latency/error profiles; toolbar-driven MSW profiles',
              'Fully mocked backend for stories and API playgrounds',
            ],
          },
          {
            tech: 'axe-core/playwright',
            usedIn: ['QuizMentor', 'OpenSource SB'],
            usedIds: ['quizmentor', 'opensource'],
            examples: [
              'Accessibility scans within E2E suite',
              'Story-level a11y checks with AxeBuilder',
            ],
          },
          {
            tech: 'Storybook Test Runner',
            usedIn: ['QuizMentor', 'OpenSource SB'],
            usedIds: ['quizmentor', 'opensource'],
            examples: [
              '.storybook test stories with @storybook/test',
              'Automated story assertions with @storybook/test-runner',
            ],
          },
          {
            tech: 'Vitest + Testing Library + jest-dom',
            usedIn: ['OpenSource SB'],
            usedIds: ['opensource'],
            examples: ['Unit tests with DOM assertions and user interactions'],
          },
          {
            tech: 'Manual E2E (iOS Simulator)',
            usedIn: ['VoiceApp'],
            usedIds: ['voiceapp'],
            examples: ['End-to-end manual flows for push-to-talk MVP'],
          },
          {
            tech: 'Health checks & cURL/Postman',
            usedIn: ['VoiceApp'],
            usedIds: ['voiceapp'],
            examples: ['/health endpoint; cURL/Postman flows for /asr and /chat'],
          },
        ],
      },
      {
        id: 'docs',
        icon: <BookOpen className="w-5 h-5 text-indigo-400" />,
        title: 'Docs & Developer Experience',
        items: [
          {
            tech: 'Storybook (react-vite)',
            usedIn: ['QuizMentor', 'OpenSource SB'],
            usedIds: ['quizmentor', 'opensource'],
            examples: [
              'Living docs, labs, and MSW-driven demos',
              'Interactive component and patterns catalog',
            ],
          },
          {
            tech: 'Chromatic (visual regression)',
            usedIn: ['QuizMentor'],
            usedIds: ['quizmentor'],
            examples: ['Visual diffs and PR checks for stories'],
          },
        ],
      },
      {
        id: 'voice-aiml',
        icon: <Brain className="w-5 h-5 text-pink-400" />,
        title: 'Voice AI (MVP)',
        items: [
          {
            tech: 'expo-av / expo-speech / file-system',
            usedIn: ['VoiceApp'],
            usedIds: ['voiceapp'],
            examples: ['High-quality M4A recording; Speech.speak(reply); file upload'],
          },
        ],
      },
    ],
    [],
  );
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: 'all', label: 'All' },
          { id: 'quizmentor', label: 'QuizMentor' },
          { id: 'ai-os-ce', label: 'AI-OS CE' },
          { id: 'ai-os-pro', label: 'AI-OS Pro' },
          { id: 'chameleon', label: 'Chameleon' },
          { id: 'voiceapp', label: 'VoiceApp' },
          { id: 'opensource', label: 'OpenSource SB' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as ProjectId)}
            className={`px-2 py-1 text-xs rounded ${
              filter === (f.id as ProjectId)
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {categories.map((cat) => {
          const items =
            filter === 'all'
              ? cat.items
              : cat.items.filter((it: any) => it.usedIds.includes(filter));
          if (!items || items.length === 0) return null;
          return (
            <AccordionSection key={cat.id} title={cat.title} icon={cat.icon} defaultOpen={false}>
              <div className="space-y-2">
                {items.map((item: any, idx: number) => (
                  <Card key={idx} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-white">{item.tech}</div>
                      <div className="flex gap-1">
                        {item.usedIn.map((p: string, i: number) => (
                          <Badge key={`${p}-${i}`} size="sm">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {Array.isArray(item.examples) && item.examples.length > 0 && (
                      <ul className="list-disc pl-5 mt-2 text-sm text-gray-400">
                        {item.examples.map((ex: string, i: number) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}
              </div>
            </AccordionSection>
          );
        })}
      </div>
    </div>
  );
}

function AccordionSection({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-900"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-semibold text-white">{title}</span>
        </div>
        <span className="text-sm text-gray-400">{open ? 'Collapse' : 'Expand'}</span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="px-4 pb-4"
      >
        {open && children}
      </motion.div>
    </div>
  );
}
