# DevLog - NatureQuest Ecosystem Infrastructure

## 2024-01-26: Unified Authentication System Implementation

### Architecture Decision: Centralized Auth with SSO

**Problem**: 
- Multiple products (DevMentor, QuizMentor, Harvest.ai, Omni.ai) with separate authentication
- User friction from multiple accounts
- No unified billing or subscription management
- GDPR compliance needed across all products

**Solution**:
Implemented a centralized authentication system with the following architecture:

#### 1. Central Account Dashboard (`/portfolio/ecosystem_central/dashboard/`)
- **AccountDashboard.tsx**: Main user dashboard with tabs for:
  - Overview: Product access, usage metrics, subscription status
  - Billing: Subscription tiers, payment methods, invoices
  - Security: 2FA, API keys, session management, security events
  - Privacy & GDPR: Data export, account deletion, sharing preferences

**Key Features**:
- Real-time usage tracking across all products
- Product access based on subscription tier
- GDPR-compliant data management tools
- Security event logging
- API key generation and management

#### 2. Unified Auth Store (`/portfolio/ecosystem_central/auth/authStore.ts`)
- Zustand-based state management with persistence
- Supabase integration for authentication
- SSO token generation and validation
- Product access control based on subscription tiers:
  - **Free**: QuizMentor only
  - **Pro**: QuizMentor, DevMentor, Harvest.ai
  - **Team**: All products including Omni.ai
  - **Enterprise**: All products with unlimited access

#### 3. Shared Auth Package (`/portfolio/packages/unified-auth/`)
- Reusable authentication library
- Can be imported by all products via `@naturequest/unified-auth`
- Handles cross-domain session management
- Token refresh logic

### Implementation Status

✅ **Completed**:
- Central authentication infrastructure setup
- Account dashboard with full GDPR compliance
- Shared auth library structure
- Zustand store with Supabase integration

🔄 **In Progress**:
- SSO flow implementation
- Product integration guides

📋 **Next Steps**:
1. Set up Supabase project with required tables
2. Implement SSO endpoints
3. Create migration scripts for existing users
4. Deploy central auth service to accounts.naturequest.dev

### Technical Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **State Management**: Zustand with persistence
- **Auth Provider**: Supabase Auth
- **UI Components**: Tremor, Framer Motion, Lucide Icons
- **Styling**: Tailwind CSS

### Database Schema (Supabase)

```sql
-- profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar TEXT,
  two_factor_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tier TEXT CHECK (tier IN ('free', 'pro', 'team', 'enterprise')),
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due')),
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT false,
  team_members INTEGER DEFAULT 1,
  team_limit INTEGER DEFAULT 1,
  api_calls_used INTEGER DEFAULT 0,
  api_calls_limit INTEGER DEFAULT 100,
  products TEXT[] DEFAULT ARRAY['quizmentor'],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- security_events table
CREATE TABLE security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- api_keys table
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT,
  key_hash TEXT UNIQUE NOT NULL,
  last_used TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  revoked_at TIMESTAMP
);
```

### Benefits Achieved

1. **User Experience**:
   - Single sign-on across all products
   - One subscription for entire ecosystem
   - Unified billing and invoicing

2. **Business Intelligence**:
   - Complete user journey tracking
   - Cross-product analytics
   - Better conversion metrics

3. **Security**:
   - Centralized security management
   - Consistent authentication standards
   - Audit trail for all auth events

4. **Compliance**:
   - GDPR-compliant data management
   - Single point for data requests
   - Automated data export/deletion

5. **Development Efficiency**:
   - Shared authentication logic
   - Reduced code duplication
   - Easier to maintain

### Migration Strategy

For existing users in DevMentor and QuizMentor:
1. Export user data from individual products
2. Create accounts in central auth system
3. Send migration emails with password reset links
4. Maintain backward compatibility for 30 days
5. Deprecate old auth systems

---

## Next Entry: [Date] - SSO Implementation
[To be documented after implementation]
