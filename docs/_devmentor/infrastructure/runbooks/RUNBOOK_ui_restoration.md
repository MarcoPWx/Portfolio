---
layout: product
title: RUNBOOK ui restoration
product: DevMentor
source: infrastructure/runbooks/RUNBOOK_ui_restoration.md
---

{% raw %}
# Runbook: UI Restoration & Implementation

**Service**: Frontend UI Restoration  
**Priority**: CRITICAL  
**Time Estimate**: 2-3 days  
**Last Updated**: 2025-08-25

---

## 🎯 Objective

Restore the complete UI from v3 archive, add skeleton loaders, remove quiz functionality, and implement core features.

---

## Phase 1: UI Component Restoration (Day 1)

### Step 1: Backup Current State
```bash
cd frontend/devmentor-ui
cp -r src src.backup.$(date +%Y%m%d-%H%M%S)
echo "✅ Backup created at src.backup.*"
```

### Step 2: Restore v3 Components
```bash
#!/bin/bash
ARCHIVE_PATH=".archive/2024-08-20/03082025v3backup/devmentor-ui/src"

# Core components to restore
echo "📦 Restoring core components..."
cp $ARCHIVE_PATH/components/DashboardLayout.tsx src/components/
cp $ARCHIVE_PATH/components/DemoTour.tsx src/components/
cp $ARCHIVE_PATH/components/MemoryBank.tsx src/components/
cp $ARCHIVE_PATH/components/AIActivityNotifier.tsx src/components/
cp $ARCHIVE_PATH/components/AIProfileIndicator.tsx src/components/
cp $ARCHIVE_PATH/components/CodebaseAnalyzer.tsx src/components/
cp $ARCHIVE_PATH/components/SystemArchitectureVisualization.tsx src/components/
cp $ARCHIVE_PATH/components/FeatureStatusBadge.tsx src/components/
cp $ARCHIVE_PATH/components/KeyboardShortcutsModal.tsx src/components/

# Pages to restore (except learning/quiz pages)
echo "📄 Restoring pages..."
cp -r $ARCHIVE_PATH/app/architecture src/app/
cp -r $ARCHIVE_PATH/app/memory-bank src/app/
cp -r $ARCHIVE_PATH/app/engineering-excellence src/app/

echo "✅ Components restored"
```

### Step 3: Add Floating Tour Button
```typescript
// src/components/FloatingTourButton.tsx
'use client';

import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import DemoTour from './DemoTour';

export default function FloatingTourButton() {
  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsTourOpen(true)}
          className="group relative p-4 bg-gradient-to-r from-blue-600 to-purple-600 
                   text-white rounded-full shadow-xl hover:shadow-2xl 
                   transition-all transform hover:scale-110"
          aria-label="Start Interactive Tour"
        >
          <Compass className="w-6 h-6" />
          
          {/* Pulsing indicator for attention */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
          
          {/* Tooltip */}
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 
                         text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 
                         transition-all whitespace-nowrap">
            Start Interactive Tour
          </span>
        </button>
      </div>
      
      {/* Tour Component */}
      <DemoTour isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
    </>
  );
}
```

### Step 4: Update Layout with Tour Button
```typescript
// src/app/layout.tsx
import FloatingTourButton from '@/components/FloatingTourButton';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <FloatingTourButton />
      </body>
    </html>
  );
}
```

---

## Phase 2: Add Skeleton Loaders (Day 1)

### Step 1: Create Skeleton Component
```typescript
// src/components/ui/SkeletonLoader.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'avatar' | 'button' | 'dashboard';
  width?: string;
  height?: string;
  count?: number;
}

export default function SkeletonLoader({ 
  variant = 'text', 
  width = '100%', 
  height = 'auto',
  count = 1 
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'text':
        return (
          <div className={`h-4 bg-gray-700 rounded animate-pulse`} style={{ width }} />
        );
      
      case 'card':
        return (
          <div className="bg-gray-800 rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-700 rounded w-2/3" />
          </div>
        );
      
      case 'avatar':
        return (
          <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse" />
        );
      
      case 'button':
        return (
          <div className="h-10 bg-gray-700 rounded-lg animate-pulse px-6" style={{ width }} />
        );
      
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-8 bg-gray-700 rounded w-48 animate-pulse" />
              <div className="h-10 bg-gray-700 rounded-lg w-32 animate-pulse" />
            </div>
            
            {/* Cards grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4" />
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-gray-700 rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {[...Array(count)].map((_, index) => (
        <div key={index} className={count > 1 ? 'mb-4' : ''}>
          {renderSkeleton()}
        </div>
      ))}
    </motion.div>
  );
}
```

### Step 2: Implement in Components
```typescript
// Example: src/features/projects/ProjectTasksWidget.tsx
import SkeletonLoader from '@/components/ui/SkeletonLoader';

export default function ProjectTasksWidget() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then(data => {
      setTasks(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <SkeletonLoader variant="dashboard" />;
  }

  return (
    <div>
      {/* Actual content */}
    </div>
  );
}
```

---

## Phase 3: Remove Quiz Functionality (Day 2)

### Step 1: Remove Quiz Components
```bash
#!/bin/bash
echo "🗑️ Removing quiz components..."

# Remove quiz files
rm -f src/features/learning/*Quiz*.tsx
rm -f src/features/learning/QuizModule.tsx
rm -f src/features/learning/QuizCard.tsx
rm -f src/lib/*quiz*.ts
rm -f src/lib/*Quiz*.ts
rm -rf src/app/learning/quizzes-and-learning

# Remove test files
rm -f src/__tests__/*Quiz*.test.tsx
rm -f src/__tests__/*quiz*.test.ts

echo "✅ Quiz components removed"
```

### Step 2: Update Learning Module
```typescript
// src/features/learning/InteractiveLearningDashboard.tsx
// Remove all quiz-related imports and components
// Focus on learning paths, resources, and progress tracking

export default function InteractiveLearningDashboard() {
  return (
    <div className="space-y-6">
      {/* Learning Paths */}
      <section>
        <h2>Learning Paths</h2>
        {/* Path recommendations based on repo analysis */}
      </section>
      
      {/* Resources */}
      <section>
        <h2>Resources</h2>
        {/* Documentation, tutorials, guides */}
      </section>
      
      {/* Progress Tracking */}
      <section>
        <h2>Your Progress</h2>
        {/* Visual progress indicators */}
      </section>
    </div>
  );
}
```

### Step 3: Clean Up Routes
```typescript
// src/app/learning/page.tsx
// Remove quiz routes and navigation

export default function LearningPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1>Learning Hub</h1>
        {/* Remove quiz tabs */}
        <InteractiveLearningDashboard />
      </div>
    </DashboardLayout>
  );
}
```

---

## Phase 4: Verify and Test (Day 2)

### Step 1: Check TypeScript Errors
```bash
npm run type-check

# Fix any import errors from removed quiz components
# Update any components that referenced quizzes
```

### Step 2: Test UI Components
```bash
# Start development server
npm run dev

# Checklist:
# ✓ Tour button visible in bottom-right
# ✓ Tour opens when clicked
# ✓ All pages load without errors
# ✓ Skeleton loaders appear during loading
# ✓ No quiz references remain
# ✓ Memory Bank page loads
# ✓ Architecture page loads
# ✓ Engineering Excellence page loads
```

### Step 3: Update Tests
```bash
# Remove quiz tests
rm tests/playwright/*quiz*.spec.ts
rm tests/cypress/*quiz*.cy.ts

# Run remaining tests
npm run test
```

---

## Phase 5: Integration Checklist

### Components Status
- [ ] FloatingTourButton added
- [ ] DemoTour restored and working
- [ ] MemoryBank UI restored
- [ ] AIActivityNotifier restored
- [ ] CodebaseAnalyzer restored
- [ ] SkeletonLoader implemented
- [ ] Quiz components removed
- [ ] TypeScript errors fixed

### Pages Status
- [ ] Dashboard shows skeleton while loading
- [ ] Memory Bank page accessible
- [ ] Architecture page working
- [ ] Engineering Excellence page working
- [ ] Learning Hub without quizzes

### Visual Polish
- [ ] Tour button pulsing indicator
- [ ] Smooth skeleton animations
- [ ] Consistent loading states
- [ ] No layout shift during load

---

## 🚨 Troubleshooting

### If Tour Button Doesn't Appear
1. Check layout.tsx includes FloatingTourButton
2. Verify z-index is high enough (z-50)
3. Check for CSS conflicts

### If Skeleton Loaders Don't Show
1. Ensure isLoading state is true initially
2. Check animation classes are applied
3. Verify Tailwind CSS is working

### If TypeScript Errors After Quiz Removal
1. Search for quiz imports: `grep -r "Quiz" src/`
2. Remove or update affected files
3. Clear TypeScript cache: `rm -rf node_modules/.cache`

---

## 📝 Next Steps

After completing UI restoration:
1. Implement Memory Service backend logic
2. Add WebSocket event handlers
3. Connect frontend to real backends
4. Add error boundaries
5. Implement data persistence

---

## ✅ Success Criteria

- Tour button is visible and functional
- All v3 UI components are restored
- Skeleton loaders appear during data fetch
- No quiz functionality remains
- No TypeScript errors
- All pages load without console errors

---

**Estimated Time**: 2-3 days total
**Dependencies**: Access to v3 archive files
**Risk**: Some v3 components may have dependency conflicts
{% endraw %}
