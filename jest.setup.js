import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock Framer Motion with ref-forwarding and prop filtering
const React = require('react');
const mockMotionComponent = (Component) => {
  const Mocked = React.forwardRef(
    (
      {
        children,
        initial,
        animate,
        exit,
        transition,
        whileHover,
        whileTap,
        whileInView,
        viewport,
        layout,
        layoutId,
        drag,
        dragConstraints,
        onViewportEnter,
        onViewportLeave,
        ...props
      },
      ref,
    ) => {
      return React.createElement(Component, { ref, ...props }, children);
    },
  );
  Mocked.displayName = `MockMotion(${typeof Component === 'string' ? Component : 'Component'})`;
  return Mocked;
};

jest.mock('framer-motion', () => ({
  motion: {
    div: mockMotionComponent('div'),
    span: mockMotionComponent('span'),
    button: mockMotionComponent('button'),
    a: mockMotionComponent('a'),
    nav: mockMotionComponent('nav'),
    section: mockMotionComponent('section'),
    h1: mockMotionComponent('h1'),
    h2: mockMotionComponent('h2'),
    h3: mockMotionComponent('h3'),
    p: mockMotionComponent('p'),
    ul: mockMotionComponent('ul'),
    li: mockMotionComponent('li'),
    // SVG elements
    line: mockMotionComponent('line'),
    circle: mockMotionComponent('circle'),
  },
  AnimatePresence: ({ children }) => children,
  useMotionValue: (initial) => ({ current: initial }),
  useSpring: (value) => value,
  useTransform: () => ({ current: 0 }),
  useScroll: () => ({ scrollY: { current: 0 }, scrollYProgress: { current: 0 } }),
  useReducedMotion: () => false,
}));

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Suppress React act() warnings caused by dynamic imports during tests
const originalConsoleError = console.error;
console.error = (...args) => {
  const [firstArg] = args;
  if (typeof firstArg === 'string' && firstArg.includes('not wrapped in act')) {
    return; // swallow specific act() warnings from dynamic imports
  }
  originalConsoleError(...args);
};
