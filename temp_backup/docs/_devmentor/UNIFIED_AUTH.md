---
layout: product
title: UNIFIED AUTH
product: DevMentor
source: UNIFIED_AUTH.md
---

{% raw %}
# Unified Authentication System for Your Product Ecosystem

## Overview

The goal is to have **one account, all products** - users sign in once and access DevMentor, QuizMentor, Harvest, and Omni seamlessly.

## Architecture

```
                    ┌─────────────────────────┐
                    │    Supabase Auth        │
                    │  (Central Auth Server)  │
                    └─────────┬───────────────┘
                              │
            ┌─────────────────┼─────────────────┬──────────────┐
            │                 │                 │              │
      ┌─────▼─────┐    ┌─────▼─────┐    ┌─────▼─────┐  ┌─────▼─────┐
      │ DevMentor │    │QuizMentor │    │  Harvest  │  │   Omni    │
      │  (Beta)   │    │  (Live)   │    │  (Live)   │  │  (Beta)   │
      └───────────┘    └───────────┘    └───────────┘  └───────────┘
```

## Implementation Steps

### 1. Single Supabase Project Setup

Use ONE Supabase project for all products:

```sql
-- Single users table for all products
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  -- Product access flags
  devmentor_access BOOLEAN DEFAULT true,
  quizmentor_access BOOLEAN DEFAULT true,
  harvest_access BOOLEAN DEFAULT true,
  omni_access BOOLEAN DEFAULT true,
  -- Subscription/billing
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'active',
  -- Profile data
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product-specific data tables
CREATE TABLE public.devmentor_projects ( ... );
CREATE TABLE public.quizmentor_quizzes ( ... );
CREATE TABLE public.harvest_time_entries ( ... );
CREATE TABLE public.omni_configurations ( ... );
```

### 2. Shared Authentication Library

Create a shared npm package for auth:

```typescript
// @your-org/shared-auth package
import { createClient } from '@supabase/supabase-js';

export class UnifiedAuth {
  private supabase: any;
  
  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    // Set cross-domain session cookie
    if (data.session) {
      this.setCrossDomainSession(data.session);
    }
    
    return { data, error };
  }

  private setCrossDomainSession(session: any) {
    // Share session across subdomains
    document.cookie = `sb-access-token=${session.access_token}; domain=.yourdomain.com; path=/; secure; samesite=lax`;
  }
  
  async checkProductAccess(product: string) {
    const { data: user } = await this.supabase.auth.getUser();
    if (!user) return false;
    
    const { data: profile } = await this.supabase
      .from('users')
      .select(`${product}_access`)
      .eq('id', user.id)
      .single();
      
    return profile?.[`${product}_access`] || false;
  }
}
```

### 3. Cross-Domain Session Management

#### Option A: Shared Subdomain Cookies
```
devmentor.yourdomain.com
quizmentor.yourdomain.com
harvest.yourdomain.com
omni.yourdomain.com
```

Set cookies with `domain=.yourdomain.com` to share across subdomains.

#### Option B: Central Auth Domain
```
auth.yourdomain.com  // Central auth
app1.yourdomain.com  // DevMentor
app2.yourdomain.com  // QuizMentor
```

Use OAuth flow with central auth server.

### 4. Product Integration

Each product checks authentication on load:

```typescript
// In each app's initialization
import { UnifiedAuth } from '@your-org/shared-auth';

const auth = new UnifiedAuth();

export default function App() {
  useEffect(() => {
    async function checkAuth() {
      const session = await auth.getSession();
      
      if (!session) {
        // Redirect to central login
        window.location.href = 'https://auth.yourdomain.com/login?redirect=' + window.location.href;
        return;
      }
      
      // Check product access
      const hasAccess = await auth.checkProductAccess('devmentor');
      if (!hasAccess) {
        // Show upgrade prompt
        showUpgradePrompt();
      }
    }
    
    checkAuth();
  }, []);
  
  return <YourApp />;
}
```

### 5. Ecosystem Widget Integration

The widget knows which products the user has access to:

```typescript
// Enhanced ecosystem widget
export const EcosystemWidget = () => {
  const [userProducts, setUserProducts] = useState([]);
  
  useEffect(() => {
    async function loadUserProducts() {
      const { data: profile } = await supabase
        .from('users')
        .select('devmentor_access, quizmentor_access, harvest_access, omni_access')
        .single();
        
      const accessible = products.filter(p => 
        profile?.[`${p.id}_access`]
      );
      
      setUserProducts(accessible);
    }
    
    loadUserProducts();
  }, []);
  
  return (
    <div>
      {userProducts.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          isAccessible={true}
        />
      ))}
    </div>
  );
};
```

### 6. Billing Integration (Stripe)

Single billing for all products:

```typescript
// Subscription tiers
const TIERS = {
  free: {
    price: 0,
    products: ['devmentor', 'quizmentor'], // Limited access
  },
  pro: {
    price: 29,
    products: ['devmentor', 'quizmentor', 'harvest', 'omni'], // Full access
  },
  enterprise: {
    price: 99,
    products: ['all'], // Everything + priority support
  }
};

// Webhook handler for Stripe
export async function handleStripeWebhook(event: any) {
  switch (event.type) {
    case 'checkout.session.completed':
      // Grant access to products based on tier
      await updateUserAccess(event.data.object);
      break;
    case 'customer.subscription.deleted':
      // Revoke premium access
      await revokeUserAccess(event.data.object);
      break;
  }
}
```

## Environment Configuration

### Development (.env.local)
```env
# Shared across all products
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_AUTH_DOMAIN=http://localhost:3000

# Product-specific
NEXT_PUBLIC_PRODUCT_ID=devmentor
NEXT_PUBLIC_PRODUCT_NAME=DevMentor
```

### Production
```env
# Central auth
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_AUTH_DOMAIN=https://auth.yourdomain.com

# Product URLs
NEXT_PUBLIC_DEVMENTOR_URL=https://devmentor.ai
NEXT_PUBLIC_QUIZMENTOR_URL=https://quizmentor.ai
NEXT_PUBLIC_HARVEST_URL=https://harvest.ai
NEXT_PUBLIC_OMNI_URL=https://omni.dev
```

## User Journey

1. **First Visit to Any Product**
   - User lands on DevMentor
   - Checks for existing session
   - No session → Redirect to login
   
2. **Registration**
   - User registers once
   - Automatically gets access to free tier products
   - Can explore ecosystem via widget
   
3. **Cross-Product Navigation**
   - User clicks QuizMentor in ecosystem widget
   - Session cookie recognized
   - Seamless entry to QuizMentor
   
4. **Upgrade Flow**
   - User wants Harvest (premium)
   - Clicks upgrade in widget
   - Single payment unlocks multiple products

## Security Considerations

1. **CORS Configuration**
```typescript
// Supabase CORS settings
const allowedOrigins = [
  'https://devmentor.ai',
  'https://quizmentor.ai',
  'https://harvest.ai',
  'https://omni.dev'
];
```

2. **Token Validation**
- Verify JWT signatures
- Check token expiration
- Validate product access claims

3. **Rate Limiting**
- Implement per-product rate limits
- Shared quota across ecosystem

## Benefits

- **User Experience**: One login for everything
- **Development**: Shared auth logic
- **Marketing**: Cross-sell opportunities
- **Analytics**: Complete user journey tracking
- **Support**: Single user profile to manage

## Migration Strategy

For existing products with separate auth:

1. **Phase 1**: Add Supabase alongside existing auth
2. **Phase 2**: Migrate users gradually
3. **Phase 3**: Deprecate old auth system
4. **Phase 4**: Full ecosystem integration

## Monitoring & Analytics

Track cross-product metrics:

```sql
-- User engagement across products
SELECT 
  u.email,
  COUNT(DISTINCT d.id) as devmentor_projects,
  COUNT(DISTINCT q.id) as quizmentor_quizzes,
  COUNT(DISTINCT h.id) as harvest_entries
FROM users u
LEFT JOIN devmentor_projects d ON u.id = d.user_id
LEFT JOIN quizmentor_quizzes q ON u.id = q.user_id
LEFT JOIN harvest_time_entries h ON u.id = h.user_id
GROUP BY u.email;
```

## Next Steps

1. Set up single Supabase project
2. Create shared auth library
3. Implement ecosystem widget
4. Configure cross-domain sessions
5. Set up billing integration
6. Deploy first two products
7. Monitor and iterate
{% endraw %}
