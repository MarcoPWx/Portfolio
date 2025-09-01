export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  emailVerified?: boolean;
  twoFactorEnabled?: boolean;
  createdAt?: string;
  lastLogin?: string;
}

export interface Subscription {
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

export interface AuthState {
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
