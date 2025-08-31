# @naturequest/ecosystem-widget

Cross-product promotion widget for the NatureQuest ecosystem. Shows other products in the ecosystem and promotes upgrades.

## Installation

### Option 1: Install from local package

```bash
# In your project (e.g., DevMentor)
npm install ../portfolio/packages/ecosystem-widget
```

### Option 2: Copy the package

```bash
# Copy the entire ecosystem-widget folder to your project
cp -r /path/to/portfolio/packages/ecosystem-widget ./packages/

# Install dependencies
npm install framer-motion lucide-react
```

## Usage

### Basic Setup

```tsx
// In your main app layout or specific pages
import { EcosystemWidget } from '@naturequest/ecosystem-widget';
import { useAuth } from '@naturequest/unified-auth'; // If using unified auth

function App() {
  const { subscription } = useAuth(); // Optional: get user tier from auth

  return (
    <div>
      {/* Your app content */}
      
      <EcosystemWidget 
        currentProduct="devmentor"
        userTier={subscription?.tier || 'free'}
      />
    </div>
  );
}
```

### Configuration Options

```tsx
<EcosystemWidget
  // Required: Specify which product this is
  currentProduct="devmentor" // 'devmentor' | 'quizmentor' | 'harvest' | 'omni'
  
  // Optional: User's subscription tier (affects what's shown as locked)
  userTier="free" // 'free' | 'pro' | 'team' | 'enterprise'
  
  // Optional: Position on screen
  position="bottom-right" // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  
  // Optional: Theme
  theme="dark" // 'dark' | 'light'
  
  // Optional: Custom product click handler
  onProductClick={(productId) => {
    // Custom navigation logic
    console.log(`Navigating to ${productId}`);
  }}
/>
```

## Features

### Auto-show for New Users
The widget automatically shows after 5 seconds for first-time users to promote ecosystem discovery.

### Smart Product Display
- Shows all products except the current one
- Marks products as locked/unlocked based on user tier
- Omni.ai always shows as free/open-source
- Shows upgrade prompts for locked products

### User Preferences
- Remembers if user minimized the widget
- Can be re-opened from minimized state
- Persists state in localStorage

### Visual States

1. **Floating Button** (Default)
   - Shows rocket icon
   - Pulse indicator for locked products
   - Tooltip for first-time users

2. **Expanded Panel**
   - Lists all other ecosystem products
   - Shows product status (locked/active/free)
   - Upgrade CTA for free users
   - Account management link for paid users

3. **Minimized State**
   - Small sparkle icon
   - Click to re-expand

## Subscription Tier Logic

```typescript
// Product access by tier
const access = {
  free: ['quizmentor', 'omni'], // Free tier
  pro: ['quizmentor', 'devmentor', 'harvest', 'omni'], // Pro tier
  team: ['quizmentor', 'devmentor', 'harvest', 'omni'], // Team tier
  enterprise: ['quizmentor', 'devmentor', 'harvest', 'omni'] // Enterprise
};
```

## Examples

### In DevMentor

```tsx
// pages/_app.tsx or app/layout.tsx
import { EcosystemWidget } from '@naturequest/ecosystem-widget';

function DevMentorApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <EcosystemWidget 
        currentProduct="devmentor"
        userTier="pro" // From your auth system
        position="bottom-right"
      />
    </>
  );
}
```

### In QuizMentor

```tsx
function QuizMentorLayout({ children }) {
  return (
    <div>
      {children}
      <EcosystemWidget 
        currentProduct="quizmentor"
        userTier="free"
        theme="light" // Light theme for QuizMentor
      />
    </div>
  );
}
```

### With Custom Navigation

```tsx
function CustomApp() {
  const router = useRouter();
  
  const handleProductClick = (productId: string) => {
    // Custom logic instead of direct navigation
    if (productId === 'omni') {
      // Open in new tab for GitHub
      window.open('https://github.com/yourusername/omni', '_blank');
    } else {
      // Use your router
      router.push(`/products/${productId}`);
    }
  };

  return (
    <EcosystemWidget 
      currentProduct="harvest"
      onProductClick={handleProductClick}
    />
  );
}
```

### Conditional Rendering

```tsx
function App() {
  const { user } = useAuth();
  const [showWidget, setShowWidget] = useState(true);

  // Don't show on certain pages
  if (router.pathname === '/onboarding') {
    return null;
  }

  return (
    <>
      {showWidget && user && (
        <EcosystemWidget 
          currentProduct="devmentor"
          userTier={user.subscription?.tier}
        />
      )}
    </>
  );
}
```

## Styling

The widget uses Tailwind CSS classes. Make sure your project has Tailwind configured.

### Custom Styling

```css
/* Override widget styles in your global CSS */
.ecosystem-widget-button {
  /* Custom button styles */
}

.ecosystem-widget-panel {
  /* Custom panel styles */
}
```

## TypeScript Support

Full TypeScript support included:

```typescript
import { EcosystemWidget, type EcosystemWidgetProps } from '@naturequest/ecosystem-widget';

const widgetProps: EcosystemWidgetProps = {
  currentProduct: 'devmentor',
  userTier: 'pro',
  position: 'bottom-right',
  theme: 'dark'
};
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Requires localStorage support

## License

MIT
