import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientEcosystemWidget } from '@/components/ecosystem/ClientEcosystemWidget';

// Force dynamic rendering and disable caching for all routes under /app
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://naturequest.dev'),
  title: 'NatureQuest - Developer Tools Ecosystem',
  description:
    'A suite of powerful tools for developers: QuizMentor, DevMentor, Harvest, and Omni. Enhance your productivity, learning, and development workflow.',
  keywords: 'developer tools, quiz platform, AI assistant, time tracking, VS Code extension',
  authors: [{ name: 'NatureQuest Team' }],
  openGraph: {
    title: 'NatureQuest - Developer Tools Ecosystem',
    description: 'Building the future of developer tools',
    type: 'website',
    url: 'https://naturequest.dev',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NatureQuest Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NatureQuest - Developer Tools Ecosystem',
    description: 'Building the future of developer tools',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ClientEcosystemWidget currentProduct="harvest" position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
