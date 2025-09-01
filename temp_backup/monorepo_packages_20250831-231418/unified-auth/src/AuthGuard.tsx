'use client';

import React from 'react';
import { useAuthStore } from './authStore';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireTier?: 'free' | 'pro' | 'team' | 'enterprise';
  requireProduct?: string;
}

export function AuthGuard({
  children,
  fallback = null,
  requireTier,
  requireProduct,
}: AuthGuardProps) {
  const { user, subscription, isLoading, hasAccessTo } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="text-gray-500 mb-6">Please sign in to access this page</p>
        <a
          href="https://accounts.naturequest.dev/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Sign In
        </a>
      </div>
    );
  }

  if (requireTier && subscription) {
    const tierOrder = { free: 0, pro: 1, team: 2, enterprise: 3 };
    const userTierLevel = tierOrder[subscription.tier];
    const requiredTierLevel = tierOrder[requireTier];

    if (userTierLevel < requiredTierLevel) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Upgrade Required</h2>
          <p className="text-gray-500 mb-6">This feature requires {requireTier} tier or higher</p>
          <a
            href="https://accounts.naturequest.dev/billing"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
          >
            Upgrade Now
          </a>
        </div>
      );
    }
  }

  if (requireProduct && !hasAccessTo(requireProduct)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Product Access Required</h2>
        <p className="text-gray-500 mb-6">You don't have access to this product</p>
        <a
          href="https://accounts.naturequest.dev/billing"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
        >
          View Plans
        </a>
      </div>
    );
  }

  return <>{children}</>;
}
