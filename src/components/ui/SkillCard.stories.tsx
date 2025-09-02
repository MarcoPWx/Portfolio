import type { Meta, StoryObj } from '@storybook/react';
import { SkillCard } from './SkillCard';
import { Code } from 'lucide-react';

const meta = {
  title: 'UI/SkillCard',
  component: SkillCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: { component: 'Skill card with level, years, description, and tags.' }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'select', options: ['Expert', 'Advanced', 'Intermediate', 'Beginner'] }
  }
} satisfies Meta<typeof SkillCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'TypeScript',
    icon: <Code className="w-6 h-6" />,
    level: 'Expert',
    years: 6,
    description: 'Strong typing, generics, advanced types, and large-scale app architecture.',
    projects: ['PixelQuest Portfolio', 'QuizMentor'],
    additionalTags: ['Generics', 'Utility Types', 'Monorepo'],
    projectCount: 12
  }
};

