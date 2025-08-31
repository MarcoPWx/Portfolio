import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Mock Framer Motion for consistent testing
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: any) => children,
  useMotionValue: (initial: any) => ({ current: initial }),
  useSpring: (value: any) => ({ current: value.current }),
  useTransform: (value: any, input: any, output: any) => ({ current: output }),
}));

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Test data
export const mockProjects = [
  {
    id: 'quizmentor',
    name: 'QuizMentor',
    description: 'Gamified learning platform with AI-powered quiz generation',
    icon: 'Gamepad2',
    color: 'purple',
    href: 'https://quizmentor.naturequest.dev',
    stats: { users: '5k+', rating: '4.8' },
  },
  {
    id: 'devmentor',
    name: 'DevMentor',
    description: 'AI pair programming assistant with pattern-based learning',
    icon: 'Zap',
    color: 'blue',
    href: 'https://devmentor.naturequest.dev',
    stats: { users: '2.5k+', rating: '4.9' },
  },
  {
    id: 'harvest',
    name: 'Harvest.ai',
    description: 'Content intelligence system for automated analysis',
    icon: 'TrendingUp',
    color: 'green',
    href: 'https://harvest.naturequest.dev',
    stats: { users: '1k+', rating: '4.7' },
  },
];

export const mockTechCategories = [
  {
    title: 'Programming Languages',
    technologies: [
      {
        name: 'TypeScript',
        experience: 'Primary language for all frontend and backend development',
        yearsUsed: '6+ years',
        proficiencyLevel: 'Expert',
      },
      {
        name: 'Python',
        experience: 'AI/ML development, FastAPI backends, data processing',
        yearsUsed: '7+ years',
        proficiencyLevel: 'Expert',
      },
    ],
  },
];

// Test helpers
export const waitForElementToBeRemoved = (element: HTMLElement) => {
  return new Promise<void>((resolve) => {
    const observer = new MutationObserver(() => {
      if (!document.contains(element)) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
};

export const mockIntersectionObserver = () => {
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
};

export const mockResizeObserver = () => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
