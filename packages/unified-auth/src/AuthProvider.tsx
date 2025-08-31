'use client';

import React, { useEffect } from 'react';
import { useAuthStore, supabase } from './authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Check authentication status on mount
    checkAuth();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await checkAuth();
      } else if (event === 'SIGNED_OUT') {
        useAuthStore.setState({
          user: null,
          subscription: null,
          session: null,
        });
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [checkAuth]);

  return <>{children}</>;
}
