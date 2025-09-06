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
    | 'devmentor'
    | 'harvest'
    | 'voice'
    | 'devmentor-vscode'
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
            usedIn: ['DevMentor', 'Chameleon'],
            usedIds: ['devmentor', 'harvest'],
            examples: [
              'App Router + RSC where useful (DevMentor)',
              'Next.js 15.5 streaming API routes (Chameleon)',
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
            usedIn: ['Voice'],
            usedIds: ['voice'],
            examples: ['Push-to-talk UI; record→upload→on-device TTS'],
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
            usedIn: ['DevMentor', 'Chameleon', 'QuizMentor'],
            usedIds: ['devmentor', 'harvest', 'quizmentor'],
            examples: [
              'Client caching for /api/models and contracts (DevMentor)',
              'SSR-safe caching and SWR patterns (Chameleon)',
              'useQuizCategories/useQuizQuestions hooks (QuizMentor)',
            ],
          },
          {
            tech: 'Tailwind CSS / NativeWind',
            usedIn: ['DevMentor', 'Chameleon', 'QuizMentor'],
            usedIds: ['devmentor', 'harvest', 'quizmentor'],
            examples: [
              'Utility-first styling; PostCSS/Autoprefixer',
              'NativeWind for RN components (QuizMentor)',
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
            usedIn: ['DevMentor', 'Chameleon'],
            usedIds: ['devmentor', 'harvest'],
            examples: ['Docs rendering and diagrams in UI/Storybook'],
          },
          {
            tech: 'Swagger UI React',
            usedIn: ['DevMentor', 'Chameleon', 'QuizMentor'],
            usedIds: ['devmentor', 'harvest', 'quizmentor'],
            examples: ['Embed OpenAPI specs in stories/panels'],
          },
          {
            tech: 'VS Code Extension UI',
            usedIn: ['DevMentor VS Code'],
            usedIds: ['devmentor-vscode'],
            examples: ['TreeView, StatusBar, Decorations; commands and views'],
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
            usedIn: ['DevMentor', 'QuizMentor', 'Voice'],
            usedIds: ['devmentor', 'quizmentor', 'voice'],
            examples: [
              'Gateway routing + rate limiting (DevMentor)',
              'API with helmet/cors/rate-limit (QuizMentor)',
              'Voice: /health, /asr, /chat; multipart & OpenAI calls',
            ],
          },
          {
            tech: 'Next.js API Routes (Node runtime)',
            usedIn: ['Chameleon'],
            usedIds: ['harvest'],
            examples: ['SSE streaming generate/chat routes'],
          },
          {
            tech: 'Swagger/OpenAPI',
            usedIn: ['DevMentor', 'Chameleon', 'QuizMentor'],
            usedIds: ['devmentor', 'harvest', 'quizmentor'],
            examples: [
              'Gateway aggregate (DevMentor); OpenAPI YAML embedded in Storybook (QuizMentor)',
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
            usedIn: ['Voice'],
            usedIds: ['voice'],
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
            usedIn: ['DevMentor VS Code'],
            usedIds: ['devmentor-vscode'],
            examples: ['Realtime comm with DevMentor dashboard; handshake and auto-reconnect'],
          },
          {
            tech: 'Socket.IO (client)',
            usedIn: ['DevMentor', 'QuizMentor'],
            usedIds: ['devmentor', 'quizmentor'],
            examples: ['Learning Service updates (DevMentor); multiplayer/presence (QuizMentor)'],
          },
          {
            tech: 'SSE (Server-Sent Events)',
            usedIn: ['Chameleon', 'QuizMentor'],
            usedIds: ['harvest', 'quizmentor'],
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
            usedIn: ['DevMentor'],
            usedIds: ['devmentor'],
            examples: ['Idempotent chat completions; events over WebSocket'],
          },
          {
            tech: 'AI SDKs: OpenAI / Anthropic / Google',
            usedIn: ['Chameleon'],
            usedIds: ['harvest'],
            examples: ['Provider routing + fallback; embeddings; cost/latency surfacing'],
          },
          {
            tech: 'OpenAI (Whisper/Chat/Embeddings)',
            usedIn: ['Voice'],
            usedIds: ['voice'],
            examples: ['ASR via Whisper; concise replies; text-embedding-3-small for RAG lab'],
          },
          {
            tech: 'RAG / Vector (Qdrant)',
            usedIn: ['DevMentor'],
            usedIds: ['devmentor'],
            examples: ['Memory Service retrieval; PBML context assembly'],
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
            usedIn: ['DevMentor', 'Chameleon', 'QuizMentor'],
            usedIds: ['devmentor', 'harvest', 'quizmentor'],
            examples: [
              'Caching, rate limiting, idempotency (DevMentor)',
              'Metrics counters and caches (Chameleon)',
              'API-side checks and caching (QuizMentor)',
            ],
          },
          {
            tech: 'PostgreSQL',
            usedIn: ['DevMentor', 'QuizMentor'],
            usedIds: ['devmentor', 'quizmentor'],
            examples: [
              'Project data; Memory/learning metadata (DevMentor)',
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
            usedIn: ['DevMentor'],
            usedIds: ['devmentor'],
            examples: ['Semantic search for RAG'],
          },
          {
            tech: 'Kafka (optional)',
            usedIn: ['DevMentor'],
            usedIds: ['devmentor'],
            examples: ['PBML orchestration pipelines'],
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
            usedIn: ['Chameleon', 'DevMentor', 'QuizMentor'],
            usedIds: ['harvest', 'devmentor', 'quizmentor'],
            examples: [
              'Local dev orchestration for services and workers',
              'Postgres/Redis/API + Expo web service (QuizMentor)',
            ],
          },
          {
            tech: 'Kubernetes & Istio (mTLS optional)',
            usedIn: ['DevMentor'],
            usedIds: ['devmentor'],
            examples: ['Service DNS/mesh, policy gates, tracing plan'],
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
            usedIn: ['DevMentor'],
            usedIds: ['devmentor'],
            examples: ['x-s2s-* signing/verification; JWT at gateway'],
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
            tech: 'Secure WebSocket defaults (wss)',
            usedIn: ['DevMentor VS Code'],
            usedIds: ['devmentor-vscode'],
            examples: ['wss endpoints; packaging hygiene via .vscodeignore'],
          },
          {
            tech: 'CSP, HSTS, COOP/COEP',
            usedIn: ['Chameleon'],
            usedIds: ['harvest'],
            examples: ['connect-src to OpenAI/Anthropic; cross-origin isolation'],
          },
          {
            tech: 'Correlation IDs',
            usedIn: ['DevMentor'],
            usedIds: ['devmentor'],
            examples: ['x-correlation-id propagation end-to-end'],
          },
          {
            tech: 'Server-only secrets; no client keys',
            usedIn: ['Voice'],
            usedIds: ['voice'],
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
            usedIn: ['Voice'],
            usedIds: ['voice'],
            examples: ['End-to-end manual flows for push-to-talk MVP'],
          },
          {
            tech: 'Health checks & cURL/Postman',
            usedIn: ['Voice'],
            usedIds: ['voice'],
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
            usedIn: ['Voice'],
            usedIds: ['voice'],
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
          { id: 'devmentor', label: 'DevMentor' },
          { id: 'harvest', label: 'Chameleon' },
          { id: 'voice', label: 'Voice' },
          { id: 'devmentor-vscode', label: 'DevMentor VS Code' },
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
