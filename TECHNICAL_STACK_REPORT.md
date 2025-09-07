# Technical Stack Summary Report

## Overview
This report provides a comprehensive overview of the technical stack used across all projects, with direct links to projects where each technology is actively implemented.

## Programming Languages

### **TypeScript** (Primary Language)
- **Proficiency**: 95%
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Full-stack educational platform
  - [Portfolio](../portfolio) - Personal portfolio site
  - [VOICEAPP](../VOICEAPP) - Voice-enabled application
  - [DevMentor](../devmentor) - Developer mentoring platform
  - [Chameleon.ai](../Chameleon.ai) - AI-powered adaptability system
- **Use Cases**: Type-safe development, React components, Node.js backends

### **Python** (AI/ML & Backend)
- **Proficiency**: 90%
- **Projects**:
  - [Scraper](../Scraper) - Content harvesting with ML deduplication
  - [LearnForge/agents](../LearnForge/agents) - LangChain agents & orchestration
  - [LearnForge/advanced-rag](../LearnForge/advanced-rag) - RAG implementations
  - [Chameleon.ai](../Chameleon.ai) - ML pipelines & NLP
  - [AI-OS-Pro](../AI-OS-Pro) - AI operating system
- **Use Cases**: FastAPI backends, ML models, data processing, NLP

### **JavaScript** 
- **Proficiency**: 92%
- **Projects**: All web projects
- **Use Cases**: ES6+, async programming, browser APIs

### **Swift & Kotlin** (Mobile Native)
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Native iOS/Android modules
  - PatientSky - Healthcare mobile app
  - ExSeed Health - Health tracking app

### **Dart** (Flutter)
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Cross-platform mobile
  - ExSeed Health - Flutter implementation

## Frontend Frameworks & Libraries

### **React** (Primary Frontend)
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Educational platform UI
  - [Portfolio](../portfolio) - Portfolio website
  - [VOICEAPP](../VOICEAPP) - Voice app interface
- **Stack**: React 18, Hooks, Server Components

### **Next.js** (SSR/SSG)
- **Projects**: 
  - [Portfolio](../portfolio) - Portfolio with App Router
  - [QuizMentor.ai](../QuizMentor.ai) - Web platform
  - [DevMentor](../devmentor) - Mentoring platform
- **Features**: App Router, API Routes, ISR

### **React Native** (Mobile)
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Mobile app (Expo)
  - [VOICEAPP](../VOICEAPP) - Voice mobile app
  - PatientSky - Healthcare mobile
- **Stack**: Expo, Native modules, Reanimated

### **Tailwind CSS** 
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Design system
  - [Portfolio](../portfolio) - Responsive UI
- **Use**: Utility-first CSS, custom plugins

## Backend Technologies

### **Node.js** 
- **Projects**: All backend projects
- **Frameworks**: Express, Fastify, NestJS

### **FastAPI** (Python)
- **Projects**: 
  - [Chameleon.ai](../Chameleon.ai) - AI APIs
  - [LearnForge/agents](../LearnForge/agents) - Agent orchestration
  - [Scraper](../Scraper) - Content processing APIs
- **Features**: Async/await, automatic OpenAPI docs

### **WebSockets** 
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Real-time features (Socket.io)
  - PatientSky - Live updates

## Cloud & DevOps

### **AWS** 
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Infrastructure
  - [Portfolio](../portfolio) - Hosting
- **Services**: EC2, Lambda, S3, RDS, CloudFront

### **Docker** 
- **Projects**: 
  - [AI-OS-Pro](../AI-OS-Pro) - Containerized AI services
  - [DevMentor](../devmentor) - Development environments
- **Use**: Multi-stage builds, Docker Compose

### **Kubernetes** 
- **Projects**: 
  - [DevMentor](../devmentor) - Orchestration
  - Production deployments
- **Stack**: Helm, Istio, monitoring

## AI/ML Technologies

### **LangChain** 
- **Projects**: 
  - [LearnForge/agents](../LearnForge/agents) - Agent framework
  - [LearnForge/advanced-rag](../LearnForge/advanced-rag) - RAG pipelines
  - [DevMentor](../devmentor) - AI mentoring
  - [Chameleon.ai](../Chameleon.ai) - LLM orchestration

### **OpenAI** 
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Content generation
  - [LearnForge/agents](../LearnForge/agents) - GPT-4 integration
  - [VOICEAPP](../VOICEAPP) - Voice AI
- **Use**: GPT-4, Embeddings, Function calling

### **ML Heuristics** (Chameleon/Scraper)
- **Semantic Similarity**: TF-IDF + cosine similarity
- **Near-duplicate Detection**: SimHash with Hamming distance
- **String Similarity**: Levenshtein distance (fuzzywuzzy)
- **Libraries**: scikit-learn, pandas, numpy

## Databases

### **PostgreSQL** 
- **Projects**: 
  - [Portfolio](../portfolio) - Main database
  - [QuizMentor.ai](../QuizMentor.ai) - User data
- **Use**: Advanced queries, RLS, performance tuning

### **Supabase** (BaaS)
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Backend services
  - [Portfolio](../portfolio) - Auth & database
- **Features**: Realtime, Auth, RLS, PostgreSQL

### **Redis** 
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Caching layer
- **Use**: Cache, Pub/Sub, Queues

### **Qdrant** (Vector DB)
- **Projects**: 
  - [LearnForge/advanced-rag](../LearnForge/advanced-rag) - Vector search
  - [DevMentor](../devmentor) - Semantic search

## Testing Frameworks

### **Jest** 
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Unit tests
  - [Portfolio](../portfolio) - Test suite
  - [VOICEAPP](../VOICEAPP) - Component tests
- **Coverage**: ~85% average

### **Playwright** 
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - E2E tests
  - [Portfolio](../portfolio) - Integration tests
  - [LearnForge/agents](../LearnForge/agents) - Browser automation
- **Use**: Cross-browser testing, CI/CD integration

### **Storybook** 
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - Component library
  - [Portfolio](../portfolio) - UI documentation
  - [VOICEAPP](../VOICEAPP) - Component development
- **Features**: Visual testing, component documentation

### **MSW** (Mock Service Worker)
- **Projects**: 
  - [QuizMentor.ai](../QuizMentor.ai) - API mocking
- **Use**: Mock-first development, testing isolation

## Key Dependencies by Project

### QuizMentor.ai
```json
{
  "core": ["React Native", "Expo", "TypeScript", "Tailwind CSS"],
  "backend": ["Supabase", "Socket.io", "Redis"],
  "ai": ["OpenAI API"],
  "testing": ["Jest", "Playwright", "Storybook", "MSW"],
  "state": ["Zustand", "React Query"]
}
```

### Portfolio
```json
{
  "framework": ["Next.js 15", "React 18", "TypeScript"],
  "styling": ["Tailwind CSS", "Framer Motion"],
  "backend": ["Supabase", "Stripe"],
  "testing": ["Jest", "Playwright", "Storybook"]
}
```

### LearnForge/agents
```json
{
  "ai": ["LangChain", "OpenAI", "Anthropic", "Autogen"],
  "backend": ["FastAPI", "Gradio"],
  "databases": ["SQLite", "Vector DBs"],
  "testing": ["Playwright", "pytest"]
}
```

### Scraper (Octopus)
```json
{
  "ml": ["scikit-learn", "pandas", "numpy"],
  "nlp": ["TF-IDF", "SimHash", "fuzzywuzzy"],
  "scraping": ["BeautifulSoup4", "requests"],
  "data": ["feedparser", "rich"]
}
```

## Documentation & Development Tools

### VitePress
- **Projects**: 
  - [AI-OS-Pro](../AI-OS-Pro) - Documentation
  - [VOICEAPP](../VOICEAPP) - Docs
  - [QuizMentor.ai](../QuizMentor.ai) - Technical docs

### Development Workflow
- **Linting**: ESLint, Prettier
- **Git Hooks**: Husky, lint-staged
- **CI/CD**: GitHub Actions, Vercel
- **Commit Standards**: Commitizen, conventional commits

## Recent Technology Adoptions (2024-2025)

1. **Semantic Kernel** - Microsoft's AI orchestration framework
2. **MCP (Model Context Protocol)** - For AI agent communication
3. **Autogen** - Multi-agent AI framework
4. **Anthropic Claude** - Alternative LLM provider
5. **Gradio** - ML model interfaces
6. **Plotly** - Interactive data visualization

## Technology Proficiency Levels

- **Expert (90-100%)**: TypeScript, React, Node.js, Python, Tailwind CSS
- **Advanced (80-89%)**: FastAPI, PostgreSQL, Docker, AWS, LangChain, OpenAI
- **Proficient (70-79%)**: Kubernetes, Swift, Kotlin, Flutter, Qdrant
- **Competent (60-69%)**: C++, Computer Vision, Rust

## Contact & Links

For more information about specific implementations or to discuss collaborations:
- **GitHub**: [github.com/betolbook](https://github.com/betolbook)
- **Portfolio**: [See live portfolio](/)

---

*Last Updated: January 2025*
