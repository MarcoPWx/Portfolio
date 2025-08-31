---
layout: product
title: SUPABASE SETUP
product: DevMentor
source: SUPABASE_SETUP.md
---

{% raw %}
# Supabase Setup Guide for DevMentor

## Overview

DevMentor uses Supabase for:
- **Authentication** (email/password, OAuth providers)
- **PostgreSQL Database** with Row Level Security
- **Real-time subscriptions** for collaborative features
- **File storage** for avatars and project files
- **Vector embeddings** for AI memory (future)

## Setup Steps

### 1. Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New project"
3. Enter project details:
   - Organization: Your org name
   - Project name: `devmentor` 
   - Database Password: Generate a strong password (save this!)
   - Region: Choose closest to your users
   - Pricing Plan: Start with Free tier

### 2. Get Your API Keys

After project creation, go to Settings → API:

```env
# Add these to frontend/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# For backend services (keep secure!)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Configure Authentication

Go to Authentication → Providers:

#### Email Authentication
- ✅ Enable Email provider
- Configure email templates (optional)
- Set redirect URLs:
  ```
  http://localhost:3000/auth/callback
  https://your-domain.com/auth/callback
  ```

#### GitHub OAuth
1. Enable GitHub provider
2. Create GitHub OAuth App:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in:
     - Application name: `DevMentor`
     - Homepage URL: `http://localhost:3000`
     - Authorization callback URL: `https://your-project.supabase.co/auth/v1/callback`
3. Copy Client ID and Client Secret to Supabase

#### Google OAuth (Optional)
1. Enable Google provider
2. Set up in Google Cloud Console
3. Add credentials to Supabase

### 4. Set Up Database Schema

1. Go to SQL Editor in Supabase Dashboard
2. Run the schema from `/infrastructure/supabase/schema.sql`
3. This creates:
   - User profiles table
   - Projects table
   - AI interactions table
   - Code snippets table
   - Learning paths table
   - Memory system table
   - Team collaboration tables
   - All RLS policies

### 5. Configure Storage Buckets

In Storage section:

```sql
-- Run in SQL Editor
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('avatars', 'avatars', true),
  ('project-files', 'project-files', false);
```

### 6. Set Up Edge Functions (Optional)

For custom business logic:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Create function
supabase functions new process-ai-interaction

# Deploy
supabase functions deploy process-ai-interaction
```

### 7. Configure Security

#### Row Level Security (RLS)
- ✅ Already configured in schema.sql
- Users can only access their own data
- Public projects visible to all
- Team members can access team data

#### API Rate Limiting
In Dashboard → Settings → API:
- Set rate limits for anonymous users
- Configure CORS origins

#### Secrets Management
For API keys (OpenAI, GitHub, etc.):
```bash
supabase secrets set OPENAI_API_KEY=sk-...
supabase secrets set GITHUB_TOKEN=ghp_...
```

## Frontend Integration

### 1. Install Dependencies

```bash
cd frontend/devmentor-ui
npm install @supabase/supabase-js
```

### 2. Initialize Supabase Client

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 3. Use Auth Service

```typescript
// src/services/supabaseAuthService.ts
import { supabaseAuth } from './supabaseAuthService';

// Register
const { user, error } = await supabaseAuth.register(email, password);

// Login
const { user, session } = await supabaseAuth.login(email, password);

// OAuth
await supabaseAuth.loginWithGitHub();

// Logout
await supabaseAuth.logout();
```

### 4. Protected Routes

```typescript
// src/components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabaseAuth } from '@/services/supabaseAuthService';

export function ProtectedRoute({ children }) {
  const router = useRouter();
  
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await supabaseAuth.isAuthenticated();
      if (!isAuthenticated) {
        router.push('/login');
      }
    };
    
    checkAuth();
  }, []);
  
  return children;
}
```

## Database Operations

### Basic CRUD Operations

```typescript
// Create project
const { data, error } = await supabase
  .from('projects')
  .insert({ name, description, user_id });

// Read projects
const { data: projects } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', userId);

// Update project
await supabase
  .from('projects')
  .update({ name: newName })
  .eq('id', projectId);

// Delete project
await supabase
  .from('projects')
  .delete()
  .eq('id', projectId);
```

### Real-time Subscriptions

```typescript
// Subscribe to changes
const subscription = supabase
  .channel('projects')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'projects' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();

// Cleanup
subscription.unsubscribe();
```

## Testing

### Local Development

```bash
# Start Supabase locally (requires Docker)
supabase start

# Get local URLs
supabase status

# Stop local Supabase
supabase stop
```

### Test Authentication Flow

1. Register new user
2. Check email for verification (in development, check Inbucket at http://localhost:54324)
3. Login with credentials
4. Test OAuth providers
5. Verify protected routes work
6. Test logout

## Monitoring

### Dashboard Metrics
- Authentication → Users: Monitor signups
- Database → Query Performance: Check slow queries
- Storage → Usage: Monitor file uploads
- Logs → Edge Functions: Debug functions

### Error Handling

```typescript
try {
  const { data, error } = await supabase.from('projects').select();
  if (error) throw error;
  // Handle data
} catch (error) {
  if (error.code === 'PGRST116') {
    // Handle RLS policy violation
  } else if (error.code === '23505') {
    // Handle unique constraint violation
  }
}
```

## Production Checklist

- [ ] Set strong database password
- [ ] Configure custom domain
- [ ] Set up email templates
- [ ] Enable 2FA for team members
- [ ] Configure backup strategy
- [ ] Set up monitoring alerts
- [ ] Review and test RLS policies
- [ ] Configure rate limiting
- [ ] Set up SSL certificates
- [ ] Enable point-in-time recovery

## Troubleshooting

### Common Issues

1. **"Invalid API key"**
   - Check environment variables
   - Ensure using correct key type (anon vs service role)

2. **"Permission denied for table"**
   - Check RLS policies
   - Verify user is authenticated
   - Check user has correct role

3. **"OAuth redirect mismatch"**
   - Update redirect URLs in provider settings
   - Check callback URL configuration

4. **Real-time not working**
   - Enable real-time for tables in Dashboard
   - Check WebSocket connection
   - Verify RLS policies allow SELECT

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [SQL Editor Snippets](https://supabase.com/docs/guides/database)
- [Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)
- [RLS Examples](https://supabase.com/docs/guides/auth/row-level-security)
{% endraw %}
