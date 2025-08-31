import type { Meta, StoryObj } from '@storybook/nextjs';
import { InteractivePortfolio } from './InteractivePortfolio';

const meta: Meta<typeof InteractivePortfolio> = {
  title: 'Portfolio/InteractivePortfolio',
  component: InteractivePortfolio,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main interactive portfolio component with animated sections, terminal interface, and project showcase.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The complete interactive portfolio with all sections and animations.'
      }
    }
  }
};

export const WithReducedMotion: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Portfolio optimized for users who prefer reduced motion (accessibility).'
      }
    }
  },
  beforeEach: () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  }
};
