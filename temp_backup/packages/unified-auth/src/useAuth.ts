import { useAuthStore } from './authStore';

export function useAuth() {
  const {
    user,
    subscription,
    session,
    isLoading,
    error,
    login,
    loginWithProvider,
    signup,
    logout,
    updateProfile,
    hasAccessTo,
    canUpgrade
  } = useAuthStore();

  return {
    user,
    subscription,
    session,
    isLoading,
    error,
    isAuthenticated: !!user,
    isPro: subscription?.tier === 'pro' || subscription?.tier === 'enterprise' || subscription?.tier === 'team',
    isTeam: subscription?.tier === 'team' || subscription?.tier === 'enterprise',
    isEnterprise: subscription?.tier === 'enterprise',
    login,
    loginWithProvider,
    signup,
    logout,
    updateProfile,
    hasAccessTo,
    canUpgrade,
  };
}
