# @naturequest/unified-auth

Unified authentication package for the NatureQuest ecosystem. Provides SSO (Single Sign-On) across all NatureQuest products.

## Installation

### Option 1: Install from local package (for NatureQuest products)

```bash
# In your project (e.g., DevMentor)
npm install ../portfolio/packages/unified-auth
```

### Option 2: Copy the package

```bash
# Copy the entire unified-auth folder to your project
cp -r /path/to/portfolio/packages/unified-auth ./packages/

# Install dependencies
npm install @supabase/supabase-js zustand
```

## Setup

### 1. Environment Variables

Create a `.env.local` file in your project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Wrap Your App

```tsx
// app/layout.tsx or _app.tsx
import { AuthProvider } from '@naturequest/unified-auth';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## Usage

### Basic Authentication

```tsx
import { useAuth } from '@naturequest/unified-auth';

function LoginPage() {
  const { login, signup, loginWithProvider, isLoading, error } = useAuth();

  const handleLogin = async () => {
    await login('user@example.com', 'password');
  };

  const handleGoogleLogin = async () => {
    await loginWithProvider('google');
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={isLoading}>
        Sign In
      </button>
      <button onClick={handleGoogleLogin}>
        Sign In with Google
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
```

### Protected Routes

```tsx
import { AuthGuard } from '@naturequest/unified-auth';

// Protect entire page
function ProtectedPage() {
  return (
    <AuthGuard>
      <div>This content is only visible to authenticated users</div>
    </AuthGuard>
  );
}

// Require specific subscription tier
function ProFeature() {
  return (
    <AuthGuard requireTier="pro">
      <div>This feature requires Pro subscription</div>
    </AuthGuard>
  );
}

// Require access to specific product
function DevMentorPage() {
  return (
    <AuthGuard requireProduct="devmentor">
      <div>DevMentor Dashboard</div>
    </AuthGuard>
  );
}
```

### User Information

```tsx
import { useAuth } from '@naturequest/unified-auth';

function UserProfile() {
  const { user, subscription, isAuthenticated, isPro, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name || user.email}</h1>
      <p>Subscription: {subscription?.tier || 'Free'}</p>
      {isPro && <p>✨ Pro features enabled</p>}
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

### Product Access Check

```tsx
import { useAuth } from '@naturequest/unified-auth';

function ProductList() {
  const { hasAccessTo, canUpgrade } = useAuth();

  const products = [
    { id: 'devmentor', name: 'DevMentor' },
    { id: 'quizmentor', name: 'QuizMentor' },
    { id: 'harvest', name: 'Harvest.ai' },
    { id: 'omni', name: 'Omni.ai' }
  ];

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          {hasAccessTo(product.id) ? (
            <a href={`https://${product.id}.naturequest.dev`}>
              Open Dashboard
            </a>
          ) : (
            <button disabled={!canUpgrade()}>
              Upgrade to Access
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Direct Store Access

```tsx
import { useAuthStore } from '@naturequest/unified-auth';

function CustomComponent() {
  // Access the store directly for advanced use cases
  const store = useAuthStore();
  
  const handleCustomAction = async () => {
    // Generate SSO token for cross-domain auth
    const token = await store.generateSSOToken('devmentor');
    
    // Redirect with token
    window.location.href = `https://devmentor.naturequest.dev/auth?token=${token}`;
  };

  return <button onClick={handleCustomAction}>Open DevMentor</button>;
}
```

## API Reference

### `useAuth()` Hook

Returns an object with:

- `user`: Current user object or null
- `subscription`: User's subscription details
- `session`: Supabase session object
- `isLoading`: Loading state
- `error`: Error message if any
- `isAuthenticated`: Boolean indicating auth status
- `isPro`: True if user has Pro tier or higher
- `isTeam`: True if user has Team tier or higher
- `isEnterprise`: True if user has Enterprise tier
- `login(email, password)`: Sign in with email/password
- `loginWithProvider(provider)`: Sign in with OAuth provider
- `signup(email, password, name?)`: Create new account
- `logout()`: Sign out current user
- `updateProfile(data)`: Update user profile
- `hasAccessTo(productId)`: Check product access
- `canUpgrade()`: Check if user can upgrade

### `<AuthProvider>` Component

Wraps your app to provide authentication context.

### `<AuthGuard>` Component

Props:
- `children`: Protected content
- `fallback?`: Content to show when not authenticated
- `requireTier?`: Minimum subscription tier required
- `requireProduct?`: Product access required

### `useAuthStore` (Zustand Store)

Direct access to the authentication store for advanced use cases.

## Cross-Domain SSO

The auth system automatically handles SSO across all *.naturequest.dev domains using secure HTTP-only cookies.

```tsx
// In DevMentor app
const { user } = useAuth();
// If user logged in at accounts.naturequest.dev, they're already authenticated here!
```

## Migration from Existing Auth

```tsx
// Migrate existing users
import { supabase } from '@naturequest/unified-auth';

async function migrateUser(oldUserData) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: oldUserData.email,
    email_confirm: true,
    user_metadata: {
      name: oldUserData.name,
      migrated: true,
      legacy_id: oldUserData.id
    }
  });

  if (!error) {
    // Create subscription record
    await supabase.from('subscriptions').insert({
      user_id: data.user.id,
      tier: oldUserData.plan || 'free',
      status: 'active'
    });
  }
}
```

## Support

For issues or questions, visit: https://github.com/yourusername/naturequest
