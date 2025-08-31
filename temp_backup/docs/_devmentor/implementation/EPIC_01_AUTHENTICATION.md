---
layout: product
title: EPIC 01 AUTHENTICATION
product: DevMentor
source: implementation/EPIC_01_AUTHENTICATION.md
---

{% raw %}
# 🔐 EPIC 1: Authentication Implementation Guide
## GitHub OAuth + Supabase Integration

## Current Status
- ✅ Frontend components exist (GitHubConnectButton, LoginPage, etc.)
- ✅ Auth service has GitHub OAuth methods defined
- ✅ Callback page exists at `/auth/github/callback`
- ❌ No Supabase configuration yet
- ❌ No GitHub OAuth app registered
- ❌ Backend endpoints not connected

## Implementation Steps

### Step 1: Set Up Supabase (30 mins)

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create new project "devmentor-beta"
   - Note down:
     - Project URL
     - Anon Key
     - Service Role Key (keep secret!)

2. **Configure Auth Settings**
   ```sql
   -- In Supabase SQL Editor
   
   -- Create profiles table
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users ON DELETE CASCADE,
     username TEXT UNIQUE,
     full_name TEXT,
     avatar_url TEXT,
     github_username TEXT,
     github_id INTEGER UNIQUE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
     PRIMARY KEY (id)
   );

   -- Enable RLS
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Public profiles are viewable by everyone" 
     ON profiles FOR SELECT 
     USING (true);

   CREATE POLICY "Users can update own profile" 
     ON profiles FOR UPDATE 
     USING (auth.uid() = id);

   -- Create trigger for updated_at
   CREATE OR REPLACE FUNCTION handle_updated_at()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = now();
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;

   CREATE TRIGGER profiles_updated_at
     BEFORE UPDATE ON profiles
     FOR EACH ROW
     EXECUTE PROCEDURE handle_updated_at();

   -- Create function to handle new users
   CREATE OR REPLACE FUNCTION handle_new_user()
   RETURNS TRIGGER AS $$
   BEGIN
     INSERT INTO public.profiles (id, username, full_name, avatar_url)
     VALUES (
       new.id,
       new.raw_user_meta_data->>'user_name',
       new.raw_user_meta_data->>'full_name',
       new.raw_user_meta_data->>'avatar_url'
     );
     RETURN new;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;

   CREATE TRIGGER on_auth_user_created
     AFTER INSERT ON auth.users
     FOR EACH ROW
     EXECUTE PROCEDURE handle_new_user();
   ```

### Step 2: Register GitHub OAuth App (10 mins)

1. **Go to GitHub Settings**
   - https://github.com/settings/developers
   - Click "New OAuth App"

2. **Configure OAuth App**
   ```
   Application name: DevMentor Beta
   Homepage URL: http://localhost:3000
   Authorization callback URL: http://localhost:3000/auth/github/callback
   
   For production later:
   Authorization callback URL: https://devmentor.app/auth/github/callback
   ```

3. **Note Credentials**
   - Client ID: (copy this)
   - Client Secret: (generate and copy)

### Step 3: Configure Environment Variables (5 mins)

Add to `/frontend/devmentor-ui/.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_KEY]  # Server-side only!

# GitHub OAuth
GITHUB_CLIENT_ID=[YOUR_CLIENT_ID]
GITHUB_CLIENT_SECRET=[YOUR_CLIENT_SECRET]
NEXT_PUBLIC_GITHUB_CLIENT_ID=[YOUR_CLIENT_ID]

# Auth URLs
NEXT_PUBLIC_AUTH_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

### Step 4: Install Supabase Client (5 mins)

```bash
cd frontend/devmentor-ui
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### Step 5: Create Supabase Client (10 mins)

Create `/frontend/devmentor-ui/src/lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Create `/frontend/devmentor-ui/src/lib/supabase/server.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

### Step 6: Create Auth API Routes (20 mins)

Create `/frontend/devmentor-ui/src/app/api/auth/github/route.ts`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${requestUrl.origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${requestUrl.origin}${next}`)
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${requestUrl.origin}/auth/auth-error`)
}
```

Create `/frontend/devmentor-ui/src/app/api/auth/login/route.ts`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  return NextResponse.json({ 
    user: data.user,
    session: data.session 
  })
}
```

### Step 7: Update Auth Service (15 mins)

Update `/frontend/devmentor-ui/src/services/authService.ts`:

```typescript
import { createClient } from '@/lib/supabase/client'

class AuthService {
  private supabase = createClient()

  async loginWithGitHub() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/github/callback`,
        scopes: 'read:user user:email repo'
      }
    })

    if (error) {
      throw error
    }

    return {
      redirectUrl: data.url,
      success: !!data.url
    }
  }

  async getCurrentUser() {
    const { data: { user } } = await this.supabase.auth.getUser()
    return user
  }

  async logout() {
    await this.supabase.auth.signOut()
  }

  isAuthenticated() {
    return this.supabase.auth.getSession().then(
      ({ data }) => !!data.session
    )
  }

  async getRepositories() {
    // This would call your backend API that uses the stored GitHub token
    const response = await fetch('/api/github/repos', {
      credentials: 'include'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch repositories')
    }
    
    return response.json()
  }
}

export const authService = new AuthService()
```

### Step 8: Create Protected Route Middleware (10 mins)

Create `/frontend/devmentor-ui/src/middleware.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Check auth for protected routes
  const { data: { user } } = await supabase.auth.getUser()

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/auth/:path*',
  ]
}
```

### Step 9: Test the Flow (10 mins)

1. **Start the dev server**
   ```bash
   npm run dev
   ```

2. **Test authentication flow**
   - Go to http://localhost:3000/login
   - Click "Sign in with GitHub"
   - Should redirect to GitHub
   - After authorization, should return to callback
   - Should redirect to dashboard
   - Check browser DevTools > Application > Cookies for session

3. **Test protected routes**
   - Try accessing /dashboard without login
   - Should redirect to /login
   - After login, should access dashboard

### Step 10: Add Session Management (10 mins)

Create `/frontend/devmentor-ui/src/contexts/AuthContext.tsx`:

```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

type AuthContextType = {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

## Troubleshooting

### Common Issues

1. **GitHub OAuth redirect mismatch**
   - Make sure callback URL in GitHub app matches exactly
   - Include port number for localhost

2. **Supabase session not persisting**
   - Check cookies are being set
   - Ensure middleware is running
   - Check CORS settings

3. **Protected routes not working**
   - Verify middleware.ts is in root of src/
   - Check matcher patterns
   - Ensure cookies are being passed

## Next Steps

After authentication is working:
1. Add user profile page
2. Implement repository selection
3. Add session refresh logic
4. Set up role-based access control
5. Add email/password registration

## Success Criteria

- [ ] User can click "Sign in with GitHub"
- [ ] GitHub OAuth flow completes
- [ ] User session persists across refreshes
- [ ] Protected routes redirect to login
- [ ] Logout clears session
- [ ] User profile data is stored

---

**Estimated Time**: 2-3 hours
**Dependencies**: Supabase account, GitHub account
**Next Epic**: EPIC 2 - Learning Session MVP
{% endraw %}
