---
layout: product
title: EXTENSION GATEWAY ARCHITECTURE
product: DevMentor
source: vscode-extension/EXTENSION_GATEWAY_ARCHITECTURE.md
---

{% raw %}
# DevMentor VS Code Extension - Platform Gateway Architecture

## 🎯 Vision
The VS Code extension serves as an **intelligent gateway** to the DevMentor platform, providing seamless access to platform features while keeping all business logic, data management, and UI complexity in the web platform where it belongs.

## 🏗️ Revised Architecture - Extension as Gateway

```
Developer Workflow with VS Code Extension as Gateway
├── 🎮 VS Code Extension (Lightweight Client)
│   ├── 🔌 Platform Connection
│   │   ├── WebSocket Client (Real-time updates FROM platform)
│   │   ├── API Client (Send context TO platform)
│   │   └── Authentication (OAuth to platform)
│   │
│   ├── 📡 Context Broadcasting
│   │   ├── Current File & Position
│   │   ├── Selected Code
│   │   ├── Git Branch & Status
│   │   ├── Test Results
│   │   └── Debug Session Info
│   │
│   ├── 🤖 AI Quick Actions
│   │   ├── Send Selection to Platform
│   │   ├── Open Prompt Builder (in browser)
│   │   ├── Display AI Response (inline)
│   │   └── Apply Code Suggestions
│   │
│   ├── 🔗 Platform Launchers
│   │   ├── Open Dashboard
│   │   ├── Open Project Management
│   │   ├── Open Memory Bank
│   │   ├── Open Learning Center
│   │   └── Open Architecture View
│   │
│   └── 📝 Background Documentation
│       ├── Auto-capture Git Commits
│       ├── Auto-capture File Changes
│       ├── Auto-capture Test Results
│       └── Send to Platform for Processing
│
├── 🌐 DevMentor Web Platform (All Logic & UI)
│   ├── Project Management (Full Kanban, Sprints, etc.)
│   ├── Memory & Learning System (All storage & processing)
│   ├── AI Prompt Engineering (Builder, Library, Analytics)
│   ├── Documentation System (Processing & Storage)
│   ├── Team Collaboration (All features)
│   └── Architecture Visualization (Full diagrams)
│
└── 💾 Data Flow
    ├── Extension → Platform: Context & Events
    ├── Platform → Extension: Suggestions & Updates
    └── All Storage: In Platform (Not in Extension)
```

## 🔧 Core Extension Responsibilities (What it DOES do)

### 1. Context Provider

```typescript
interface VSCodeContextProvider {
  // Continuously send development context to platform
  broadcastContext(): void {
    // Send to platform via WebSocket
    this.ws.send({
      type: 'context.update',
      data: {
        file: vscode.window.activeTextEditor?.document.fileName,
        language: vscode.window.activeTextEditor?.document.languageId,
        selection: vscode.window.activeTextEditor?.selection,
        gitBranch: this.getGitBranch(),
        openFiles: vscode.workspace.textDocuments.map(d => d.fileName),
        workspace: vscode.workspace.name
      }
    });
  }

  // Send code snippets for AI processing
  sendToAI(prompt?: string): void {
    const selection = vscode.window.activeTextEditor?.selection;
    const text = vscode.window.activeTextEditor?.document.getText(selection);
    
    // Send to platform
    this.api.post('/api/ai/analyze', {
      code: text,
      prompt: prompt,
      context: this.getCurrentContext()
    });
    
    // Open platform in browser for full experience
    vscode.env.openExternal(vscode.Uri.parse(
      `${this.platformUrl}/ai/prompt?context=${encodeURIComponent(text)}`
    ));
  }
}
```

### 2. Platform Launcher

```typescript
interface PlatformLauncher {
  // Quick launchers to open platform features
  openDashboard(): void {
    vscode.env.openExternal(
      vscode.Uri.parse(`${this.platformUrl}/dashboard`)
    );
  }

  openProjectManagement(projectId?: string): void {
    const url = projectId 
      ? `${this.platformUrl}/projects/${projectId}`
      : `${this.platformUrl}/projects`;
    vscode.env.openExternal(vscode.Uri.parse(url));
  }

  openMemoryBank(): void {
    // Include current context
    const context = this.getCurrentFileContext();
    vscode.env.openExternal(
      vscode.Uri.parse(`${this.platformUrl}/memory?context=${context}`)
    );
  }

  openPromptBuilder(selection?: string): void {
    const url = selection
      ? `${this.platformUrl}/ai/prompt-builder?code=${encodeURIComponent(selection)}`
      : `${this.platformUrl}/ai/prompt-builder`;
    vscode.env.openExternal(vscode.Uri.parse(url));
  }
}
```

### 3. Inline AI Assistant

```typescript
interface InlineAIAssistant {
  // Display AI responses inline without leaving VS Code
  showAISuggestion(suggestion: AISuggestion): void {
    // Show as hover or inline completion
    const decoration = vscode.window.createTextEditorDecorationType({
      after: {
        contentText: suggestion.text,
        color: 'rgba(100, 200, 100, 0.7)'
      }
    });
    
    vscode.window.activeTextEditor?.setDecorations(
      decoration, 
      [suggestion.range]
    );
  }

  // Apply code changes suggested by platform
  applyCodeChange(change: CodeChange): void {
    const edit = new vscode.WorkspaceEdit();
    edit.replace(
      vscode.Uri.file(change.file),
      change.range,
      change.newText
    );
    vscode.workspace.applyEdit(edit);
  }
}
```

### 4. Background Documentation Capture

```typescript
interface DocumentationCapture {
  // Silently capture development events
  captureGitCommit(commit: GitCommit): void {
    // Send to platform, don't store locally
    this.api.post('/api/docs/capture', {
      type: 'git.commit',
      data: {
        hash: commit.hash,
        message: commit.message,
        files: commit.files,
        timestamp: new Date().toISOString()
      }
    });
  }

  captureTestRun(results: TestResults): void {
    // Send to platform for processing
    this.api.post('/api/docs/capture', {
      type: 'test.run',
      data: results
    });
  }

  captureDebugSession(session: DebugSession): void {
    // Send key debug events to platform
    this.api.post('/api/docs/capture', {
      type: 'debug.session',
      data: {
        breakpoints: session.breakpoints,
        duration: session.duration,
        errors: session.errors
      }
    });
  }
}
```

## 🚫 What the Extension DOESN'T Do

### Not in Extension (Lives in Platform)
- ❌ **Project Management UI** - Open browser to platform
- ❌ **Memory Storage** - All in platform database
- ❌ **Learning System** - Full experience in platform
- ❌ **Complex AI Interactions** - Platform has the UI
- ❌ **Team Collaboration** - Real-time features in platform
- ❌ **Documentation Viewing** - Read docs in platform
- ❌ **Architecture Diagrams** - View in platform

## 📊 Data Flow

### Extension → Platform
```typescript
// Continuous context stream
{
  type: 'context.stream',
  data: {
    file: 'src/index.ts',
    position: { line: 42, column: 15 },
    visibleRange: { start: 35, end: 55 },
    gitStatus: 'modified',
    symbols: ['function:calculateTotal', 'class:OrderService']
  }
}

// Event capture
{
  type: 'event.capture',
  event: 'file.saved',
  data: {
    file: 'src/index.ts',
    changes: 15,
    timestamp: '2025-08-25T14:30:00Z'
  }
}
```

### Platform → Extension
```typescript
// AI suggestions
{
  type: 'ai.suggestion',
  data: {
    file: 'src/index.ts',
    line: 42,
    suggestion: 'Consider using async/await here',
    confidence: 0.95
  }
}

// Quick actions
{
  type: 'action.available',
  data: {
    label: 'Fix Security Issue',
    command: 'devmentor.applyFix',
    args: { fixId: 'sec-123' }
  }
}
```

## 🎨 Minimal Extension UI

### Status Bar
```
[🟢 DevMentor Connected] [📊 Project: Alpha] [🤖 AI Ready]
```

### Command Palette
```
> DevMentor: Open Dashboard
> DevMentor: Send to AI
> DevMentor: Open Project
> DevMentor: View Memory Bank
> DevMentor: Start Learning Path
```

### Context Menu (Right-click)
```
┌─────────────────────────┐
│ Send to DevMentor AI    │
│ Open in DevMentor       │
│ Add to Memory Bank      │
└─────────────────────────┘
```

### Activity Bar Icon
```
🚀 (Click to open quick actions)
   ├── Open Dashboard
   ├── Current Project
   ├── Recent AI Prompts
   └── Quick Help
```

## 🔄 Simplified Configuration

```json
{
  "devmentor.platformUrl": "https://app.devmentor.ai",
  "devmentor.autoConnect": true,
  "devmentor.captureContext": true,
  "devmentor.captureGitEvents": true,
  "devmentor.showInlineAI": true
}
```

## 🚀 Implementation Phases (Revised)

### Phase 1: Core Gateway (Week 1)
- [x] Platform connection (WebSocket + API)
- [ ] Context broadcasting
- [ ] Platform launchers
- [ ] Basic status bar

### Phase 2: AI Integration (Week 2)
- [ ] Send selection to AI
- [ ] Display inline suggestions
- [ ] Apply code changes
- [ ] Quick prompt commands

### Phase 3: Background Capture (Week 3)
- [ ] Git event capture
- [ ] Test result capture
- [ ] File change tracking
- [ ] Debug session capture

### Phase 4: Polish (Week 4)
- [ ] Optimize context streaming
- [ ] Add keyboard shortcuts
- [ ] Improve notifications
- [ ] Performance tuning

## 🎯 Success Metrics

### Extension Performance
- **Bundle Size**: < 1MB
- **Memory Usage**: < 50MB
- **Startup Time**: < 200ms
- **Context Latency**: < 50ms

### User Experience
- **One-Click Access**: All platform features
- **Zero Configuration**: Works out of the box
- **Seamless Context**: Platform knows what you're working on
- **Non-Intrusive**: Doesn't interfere with coding

## 💡 Key Benefits of This Architecture

### For Developers
1. **Lightweight**: Extension stays fast and responsive
2. **Simple**: No complex UI in VS Code
3. **Powerful**: Full platform features in browser
4. **Connected**: Platform always knows your context

### For Platform
1. **Centralized**: All logic in one place
2. **Maintainable**: No duplicate implementations
3. **Scalable**: Heavy processing on servers
4. **Consistent**: Same experience across all clients

### For Documentation
1. **Automatic**: Captures everything in background
2. **Centralized**: All docs in platform
3. **Searchable**: Full-text search in platform
4. **Collaborative**: Team can see documentation

## 🔐 Security & Privacy

### Data Handling
- **No Local Storage**: Extension doesn't store sensitive data
- **Secure Transmission**: All data encrypted in transit
- **Context Only**: Only sends necessary context
- **User Control**: Can disable any capture feature

### Authentication
- **OAuth Flow**: Secure authentication via browser
- **Token Management**: Platform handles tokens
- **Auto Refresh**: Platform manages token lifecycle

---

*This architecture positions the VS Code extension as a lightweight, intelligent gateway to the DevMentor platform. It captures context, enables quick actions, but keeps all complex features and data in the platform where they belong. This creates a fast, maintainable, and scalable solution.*
{% endraw %}
