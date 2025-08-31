import type { Meta, StoryObj } from '@storybook/nextjs';
import { PortfolioDashboard } from './PortfolioDashboard';

const meta: Meta<typeof PortfolioDashboard> = {
  title: 'Portfolio/PortfolioDashboard',
  component: PortfolioDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A beautiful dashboard showcasing all products in the NatureQuest ecosystem with filtering, detailed views, and metrics.'
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
        story: 'The complete portfolio dashboard with hero section, product filtering, and detailed product cards.'
      }
    }
  }
};

export const LiveProductsOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dashboard filtered to show only live products in production.'
      }
    }
  }
};

export const BetaProductsOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dashboard filtered to show only products in beta testing.'
      }
    }
  }
};

export const WithoutAnimations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with animations disabled for accessibility or performance testing.'
      }
    }
  }
};
