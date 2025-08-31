---
layout: product
title: REMOTE CONFIG INTEGRATION
product: DevMentor
source: REMOTE_CONFIG_INTEGRATION.md
---

{% raw %}
# 🎛️ DevMentor Remote Configuration Integration
## Adapting QuizMentor Admin Dashboard for DevMentor

## Overview

The QuizMentor admin dashboard is **PERFECT** for DevMentor! It already has:
- ✅ Secrets Management (Supabase Vault)
- ✅ Feature Flags with rollout percentages
- ✅ Real-time updates via WebSocket
- ✅ Analytics Dashboard
- ✅ A/B Testing support
- ✅ System Health monitoring

We can reuse 90% of this code with DevMentor-specific adaptations!

## 🔄 Integration Strategy

### What We Keep (No Changes Needed)
```typescript
// These services work as-is!
- SupabaseVault class
- FeatureFlagsService class 
- Analytics base infrastructure
- UI components (Tremor, layouts)
- Real-time WebSocket updates
```

### What We Adapt for DevMentor

#### 1. Feature Flags for Learning Features
```typescript
// DevMentor-specific feature flags
const devMentorFeatures = {
  // Learning Engine Features
  'adaptive-learning-v2': {
    name: 'Adaptive Learning V2',
    description: 'New ML-powered learning path algorithm',
    rollout_percentage: 10,
    conditions: {
      min_user_sessions: 5  // Only for experienced users
    }
  },
  
  // PBML Features
  'pattern-detection-realtime': {
    name: 'Real-time Pattern Detection',
    description: 'Detect patterns as user codes',
    rollout_percentage: 50
  },
  
  // Repo Analyzer Features
  'repo-analyzer-deep-scan': {
    name: 'Deep Repository Analysis',
    description: 'Full AST analysis vs quick scan',
    rollout_percentage: 25,
    conditions: {
      repo_size_max_mb: 100  // Only for smaller repos
    }
  },
  
  // AI Features
  'gpt4-responses': {
    name: 'GPT-4 Responses',
    description: 'Use GPT-4 instead of GPT-3.5',
    rollout_percentage: 5,
    user_overrides: ['premium_users']
  },
  
  // UI Features
  'new-dashboard-layout': {
    name: 'New Dashboard Layout',
    description: 'Redesigned dashboard with DevLogs',
    rollout_percentage: 100  // Fully rolled out
  }
};
```

#### 2. Secrets Management for DevMentor
```typescript
// DevMentor secrets structure
const devMentorSecrets = {
  // API Keys
  'OPENAI_API_KEY': {
    rotation_period: '90 days',
    services: ['learning-service', 'pbml-engine']
  },
  'GITHUB_APP_PRIVATE_KEY': {
    rotation_period: '365 days',
    services: ['repo-analyzer']
  },
  
  // Service Tokens
  'LEARNING_SERVICE_TOKEN': {
    rotation_period: '30 days',
    auto_rotate: true
  },
  'PBML_ENGINE_TOKEN': {
    rotation_period: '30 days',
    auto_rotate: true
  },
  
  // Database
  'DATABASE_URL': {
    rotation_period: '180 days',
    notify_before_rotation: '7 days'
  }
};
```

#### 3. Analytics Dashboard Adaptation
```typescript
// DevMentor-specific metrics
export class DevMentorAnalytics extends AnalyticsService {
  async getLearningMetrics() {
    return this.client.rpc('get_learning_metrics');
    // Returns:
    // - Active learners
    // - Patterns detected
    // - Learning paths completed
    // - Average skill improvement
  }
  
  async getPBMLMetrics() {
    return this.client.rpc('get_pbml_metrics');
    // Returns:
    // - Patterns stored
    // - Pattern matches/day
    // - Storage utilization
    // - Query performance
  }
  
  async getRepoAnalyzerMetrics() {
    return this.client.rpc('get_repo_metrics');
    // Returns:
    // - Repos analyzed
    // - Average analysis time
    // - Languages detected
    // - Insights generated
  }
  
  async getSystemMetrics() {
    return this.client.rpc('get_system_metrics');
    // Returns:
    // - Service health
    // - Response times
    // - Error rates
    // - Resource usage
  }
}
```

## 📊 DevMentor Admin Dashboard Structure

```
devmentor/admin-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── page.tsx              # Overview with DevMentor metrics
│   │   │   ├── learning/             # Learning engine controls
│   │   │   │   ├── page.tsx          # Learning metrics
│   │   │   │   └── patterns.tsx      # Pattern management
│   │   │   ├── pbml/                 # PBML engine controls
│   │   │   │   ├── page.tsx          # PBML dashboard
│   │   │   │   └── vectors.tsx       # Vector storage stats
│   │   │   ├── repos/                # Repo analyzer
│   │   │   │   ├── page.tsx          # Analysis queue
│   │   │   │   └── insights.tsx      # Generated insights
│   │   │   ├── features/             # Feature flags (reused)
│   │   │   ├── secrets/              # Secrets (reused)
│   │   │   ├── users/                # User management
│   │   │   ├── devlogs/              # DevLogs viewer
│   │   │   └── health/               # System health
│   │   └── layout.tsx
│   ├── components/
│   │   ├── metrics/                  # DevMentor metric cards
│   │   ├── learning/                 # Learning components
│   │   └── shared/                   # Reused from QuizMentor
│   └── lib/
│       ├── supabase.ts               # Extended with DevMentor
│       └── devmentor-services.ts     # DevMentor-specific
└── package.json
```

## 🚀 Implementation Plan

### Phase 1: Direct Migration (Week 1)
1. Copy QuizMentor admin dashboard to DevMentor
2. Update branding and navigation
3. Connect to DevMentor Supabase instance
4. Deploy on same infrastructure

### Phase 2: DevMentor Features (Week 2)
1. Add learning metrics dashboard
2. Add PBML control panel
3. Add repo analyzer queue viewer
4. Integrate with DevLogs

### Phase 3: Advanced Features (Week 3)
1. Pattern library management
2. Learning path editor
3. A/B testing for learning algorithms
4. Cost tracking dashboard

## 💾 Database Schema Extensions

```sql
-- Add to existing QuizMentor schema

-- DevMentor-specific tables
CREATE TABLE devmentor_metrics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_type text NOT NULL, -- 'learning', 'pbml', 'repo', 'system'
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Learning configuration
CREATE TABLE learning_config (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Pattern management
CREATE TABLE pattern_library (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  pattern_name text NOT NULL,
  pattern_type text NOT NULL,
  pattern_data jsonb NOT NULL,
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Service configuration
CREATE TABLE service_config (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name text NOT NULL, -- 'learning', 'pbml', 'repo-analyzer'
  config jsonb NOT NULL,
  version integer DEFAULT 1,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create views for dashboard
CREATE VIEW dashboard_overview AS
SELECT 
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM auth.users WHERE last_sign_in_at > now() - interval '24 hours') as active_today,
  (SELECT COUNT(*) FROM pattern_library) as total_patterns,
  (SELECT AVG(metric_value) FROM devmentor_metrics WHERE metric_type = 'learning' AND metric_name = 'skill_improvement') as avg_improvement;
```

## 🔌 Service Integration

### 1. Feature Flag Integration in Services

```typescript
// learning-service/src/index.ts
import { FeatureFlagClient } from '@devmentor/admin-sdk';

const flags = new FeatureFlagClient({
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_KEY,
  service: 'learning-service'
});

// Check feature flag before using new algorithm
async function processLearning(userId: string) {
  const useV2 = await flags.check('adaptive-learning-v2', userId);
  
  if (useV2) {
    return adaptiveLearningV2.process(userId);
  }
  return adaptiveLearningV1.process(userId);
}
```

### 2. Secret Rotation Handling

```typescript
// Auto-rotation handler
export async function handleSecretRotation(secretName: string) {
  const services = await getServicesUsingSecret(secretName);
  
  // Generate new secret
  const newSecret = await generateNewSecret(secretName);
  
  // Update in vault
  await vault.rotateSecret(secretName, newSecret);
  
  // Notify services to reload
  for (const service of services) {
    await notifyService(service, 'SECRET_ROTATED', { secretName });
  }
  
  // Log rotation
  await auditLog.record('SECRET_ROTATION', {
    secret: secretName,
    services: services,
    timestamp: new Date()
  });
}
```

## 🎨 UI Components to Reuse

### From QuizMentor → DevMentor

| QuizMentor Component | DevMentor Usage |
|---------------------|-----------------|
| Feature Flag Toggle | Same - control rollouts |
| Secrets Vault UI | Same - manage API keys |
| Analytics Cards | Adapt - show learning metrics |
| System Health | Extend - add service health |
| User Management | Extend - add learning profiles |
| A/B Test Results | New - test learning algorithms |

## 🔐 Security Considerations

### Admin Access Control
```typescript
// Middleware for admin routes
export async function requireAdmin(req: Request) {
  const user = await getUser(req);
  
  if (!user.roles.includes('admin')) {
    throw new Error('Unauthorized');
  }
  
  // Log admin action
  await auditLog.record('ADMIN_ACCESS', {
    user_id: user.id,
    path: req.url,
    timestamp: new Date()
  });
}
```

### Secret Access Patterns
```typescript
// Services never see actual secrets
class SecretProxy {
  async getSecret(name: string, serviceId: string) {
    // Verify service has permission
    if (!await canAccessSecret(serviceId, name)) {
      throw new Error('Access denied');
    }
    
    // Return encrypted reference, not actual value
    return {
      ref: `vault://${name}`,
      expires: Date.now() + 3600000
    };
  }
}
```

## 📈 Monitoring Integration

```typescript
// Connect admin dashboard to monitoring
export class MonitoringIntegration {
  async getMetrics() {
    const [learning, pbml, repo, system] = await Promise.all([
      prometheus.query('learning_requests_total'),
      prometheus.query('pbml_patterns_stored'),
      prometheus.query('repo_analyses_completed'),
      prometheus.query('system_uptime')
    ]);
    
    return { learning, pbml, repo, system };
  }
  
  async getAlerts() {
    return alertmanager.getActiveAlerts();
  }
  
  async getLogs(service?: string) {
    return loki.query({
      service,
      limit: 100,
      direction: 'backward'
    });
  }
}
```

## 🚦 Quick Start

### 1. Copy Admin Dashboard
```bash
# Copy from QuizMentor to DevMentor
cp -r ../QuizMentor/admin-dashboard ./devmentor/

# Update package.json name
sed -i 's/quizmentor-admin/devmentor-admin/g' package.json

# Update branding
find . -type f -name "*.tsx" -exec sed -i 's/QuizMentor/DevMentor/g' {} +
```

### 2. Install & Configure
```bash
cd devmentor/admin-dashboard
npm install

# Configure environment
cp .env.local.example .env.local
# Add DevMentor Supabase credentials
```

### 3. Run Migrations
```sql
-- Run in Supabase SQL editor
-- Includes all tables from above
```

### 4. Deploy
```bash
# Deploy to Vercel (recommended for admin)
vercel --prod

# Or Digital Ocean
doctl apps create --spec .do/admin-app.yaml
```

## 🎯 Benefits of Reusing QuizMentor Admin

1. **Time Saved**: ~2 weeks of development
2. **Proven Code**: Already tested in production
3. **Familiar UI**: Same Tremor components
4. **Easy Migration**: 90% code reuse
5. **Immediate Value**: Deploy today, customize tomorrow

## Summary

The QuizMentor admin dashboard is a **perfect fit** for DevMentor! We can:
- Deploy it immediately with minimal changes
- Add DevMentor-specific features progressively
- Use the same Supabase infrastructure
- Maintain consistent UI/UX across products

This gives us remote configuration, feature flags, and monitoring **TODAY** instead of weeks from now!

---

**Next Steps**:
1. Copy admin dashboard to DevMentor
2. Update branding and navigation
3. Deploy to Vercel
4. Start using feature flags for rollouts
5. Add DevMentor-specific metrics

**Estimated Time**: 2-3 days to full integration!
{% endraw %}
