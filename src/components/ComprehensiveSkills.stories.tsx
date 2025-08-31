import type { Meta, StoryObj } from '@storybook/nextjs';
import { ComprehensiveSkills } from './ComprehensiveSkills';

const meta: Meta<typeof ComprehensiveSkills> = {
  title: 'Portfolio/ComprehensiveSkills',
  component: ComprehensiveSkills,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive skills showcase component displaying technical expertise across different categories with detailed examples and proficiency levels.'
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
        story: 'The complete skills showcase with all technology categories and detailed examples.'
      }
    }
  }
};

export const ProgrammingLanguages: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Focus on programming languages section with detailed project examples.'
      }
    }
  }
};

export const Frontend: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Frontend technologies showcase with React, Next.js, and other modern frameworks.'
      }
    }
  }
};

export const AIAndML: Story = {
  parameters: {
    docs: {
      description: {
        story: 'AI and Machine Learning technologies with real-world implementation examples.'
      }
    }
  }
};
