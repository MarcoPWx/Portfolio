import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Settings, Trash2, Heart, ArrowRight, Download } from 'lucide-react';

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon-only button with variants, sizes, loading state, and optional tooltip.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'success']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    isLoading: { control: 'boolean' },
    tooltip: { control: 'text' }
  }
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { icon: Settings, variant: 'primary' } };
export const Secondary: Story = { args: { icon: Download, variant: 'secondary' } };
export const Ghost: Story = { args: { icon: ArrowRight, variant: 'ghost' } };
export const Danger: Story = { args: { icon: Trash2, variant: 'danger' } };
export const Success: Story = { args: { icon: Heart, variant: 'success' } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon={Settings} size="sm" variant="primary" />
      <IconButton icon={Settings} size="md" variant="primary" />
      <IconButton icon={Settings} size="lg" variant="primary" />
    </div>
  )
};

export const WithTooltip: Story = {
  args: { icon: Settings, tooltip: 'Settings', variant: 'ghost' }
};

export const Loading: Story = {
  args: { icon: Settings, isLoading: true, variant: 'secondary' }
};

