import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  emailVerified?: boolean;
  twoFactorEnabled?: boolean;
  createdAt?: string;
  lastLogin?: string;
}

interface Subscription {
  id: string;
  tier: 'free' | 'pro' | 'team' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  teamMembers?: number;
  teamLimit?: number;
  apiCallsUsed?: number;
  apiCallsLimit?: number;
  products?: string[];
}

interface AuthState {
  user: User | null;
  subscription: Subscription | null;
  session: any | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  loginWithProvider: (provider: 'google' | 'github') => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  
  // Product access checks
  hasAccessTo: (productId: string) => boolean;
  canUpgrade: () => boolean;
  
  // SSO helpers
  generateSSOToken: (productId: string) => Promise<string>;
  validateSSOToken: (token: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      subscription: null,
      session: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          // Fetch user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          // Fetch subscription
          const { data: subscription } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', data.user.id)
            .single();

          set({
            user: {
              id: data.user.id,
              email: data.user.email!,
              name: profile?.name,
              avatar: profile?.avatar,
              emailVerified: data.user.email_confirmed_at !== null,
              twoFactorEnabled: profile?.two_factor_enabled,
              createdAt: data.user.created_at,
              lastLogin: new Date().toISOString(),
            },
            subscription: subscription || {
              id: 'free-tier',
              tier: 'free',
              status: 'active',
              apiCallsLimit: 100,
              apiCallsUsed: 0,
              products: ['quizmentor'],
            },
            session: data.session,
            isLoading: false,
          });

          // Track login event
          await supabase.from('security_events').insert({
            user_id: data.user.id,
            type: 'login',
            description: 'User logged in',
            metadata: {
              method: 'password',
              timestamp: new Date().toISOString(),
            },
          });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      loginWithProvider: async (provider: 'google' | 'github') => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });

          if (error) throw error;
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      signup: async (email: string, password: string, name?: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { name },
              emailRedirectTo: `${window.location.origin}/auth/confirm`,
            },
          });

          if (error) throw error;

          // Create profile
          if (data.user) {
            await supabase.from('profiles').insert({
              id: data.user.id,
              email: data.user.email,
              name: name || email.split('@')[0],
              created_at: new Date().toISOString(),
            });

            // Create free subscription
            await supabase.from('subscriptions').insert({
              user_id: data.user.id,
              tier: 'free',
              status: 'active',
              api_calls_limit: 100,
              api_calls_used: 0,
              products: ['quizmentor'],
              created_at: new Date().toISOString(),
            });
          }

          set({ isLoading: false });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          const user = get().user;
          
          // Track logout event
          if (user) {
            await supabase.from('security_events').insert({
              user_id: user.id,
              type: 'logout',
              description: 'User logged out',
              metadata: {
                timestamp: new Date().toISOString(),
              },
            });
          }

          const { error } = await supabase.auth.signOut();
          if (error) throw error;

          set({
            user: null,
            subscription: null,
            session: null,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      refreshSession: async () => {
        try {
          const { data, error } = await supabase.auth.refreshSession();
          if (error) throw error;

          if (data.session) {
            set({ session: data.session });
          }
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        }
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true, error: null });
        try {
          const user = get().user;
          if (!user) throw new Error('No user logged in');

          const { error } = await supabase
            .from('profiles')
            .update(data)
            .eq('id', user.id);

          if (error) throw error;

          set({
            user: { ...user, ...data },
            isLoading: false,
          });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) throw error;
          
          if (session) {
            // Fetch user profile and subscription
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            const { data: subscription } = await supabase
              .from('subscriptions')
              .select('*')
              .eq('user_id', session.user.id)
              .single();

            set({
              user: {
                id: session.user.id,
                email: session.user.email!,
                name: profile?.name,
                avatar: profile?.avatar,
                emailVerified: session.user.email_confirmed_at !== null,
                twoFactorEnabled: profile?.two_factor_enabled,
              },
              subscription: subscription || {
                id: 'free-tier',
                tier: 'free',
                status: 'active',
                apiCallsLimit: 100,
                apiCallsUsed: 0,
                products: ['quizmentor'],
              },
              session,
              isLoading: false,
            });
          } else {
            set({ user: null, session: null, isLoading: false });
          }
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },

      clearError: () => set({ error: null }),

      hasAccessTo: (productId: string) => {
        const { subscription } = get();
        if (!subscription) return false;

        const productAccess = {
          free: ['quizmentor'],
          pro: ['quizmentor', 'devmentor', 'harvest'],
          team: ['quizmentor', 'devmentor', 'harvest', 'omni'],
          enterprise: ['quizmentor', 'devmentor', 'harvest', 'omni'],
        };

        return productAccess[subscription.tier]?.includes(productId) || false;
      },

      canUpgrade: () => {
        const { subscription } = get();
        return !subscription || subscription.tier !== 'enterprise';
      },

      generateSSOToken: async (productId: string) => {
        const { user, session } = get();
        if (!user || !session) throw new Error('No authenticated user');

        // Generate a signed JWT token for SSO
        const { data, error } = await supabase.functions.invoke('generate-sso-token', {
          body: { productId, userId: user.id },
        });

        if (error) throw error;
        return data.token;
      },

      validateSSOToken: async (token: string) => {
        try {
          const { data, error } = await supabase.functions.invoke('validate-sso-token', {
            body: { token },
          });

          if (error) throw error;
          return data.valid;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        subscription: state.subscription,
        session: state.session,
      }),
    }
  )
);
