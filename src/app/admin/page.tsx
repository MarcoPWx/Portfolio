'use client';

import { notFound } from 'next/navigation';

// Admin page is currently disabled and will return a 404
// The admin components have been archived for future use

export default function AdminPage() {
  // This page is intentionally disabled
  // Returns 404 for all attempts to access /admin
  notFound();
}
