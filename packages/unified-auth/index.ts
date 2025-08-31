// @naturequest/unified-auth
// Unified authentication package for NatureQuest ecosystem

export { useAuthStore, supabase } from './src/authStore';
export { AuthProvider } from './src/AuthProvider';
export { AuthGuard } from './src/AuthGuard';
export { useAuth } from './src/useAuth';
export type { User, Subscription, AuthState } from './src/types';
