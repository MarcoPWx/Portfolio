import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeGroup } from './Badge';
import { CheckCircle, Info, AlertTriangle, Heart } from 'lucide-react';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: { component: 'Badges for statuses, metadata and compact labels. Supports variants, sizes and optional icons.' }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning', 'error', 'info', 'purple'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    animate: { control: 'boolean' }
  }
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="success" icon={CheckCircle}>Success</Badge>
      <Badge variant="warning" icon={AlertTriangle}>Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info" icon={Info}>Info</Badge>
      <Badge variant="purple" icon={Heart}>Purple</Badge>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  )
};

export const AnimatedGroup: Story = {
  render: () => (
    <BadgeGroup>
      <Badge variant="success">Live</Badge>
      <Badge variant="info">Beta</Badge>
      <Badge variant="warning">Experimental</Badge>
    </BadgeGroup>
  )
};

