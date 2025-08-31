import type { Meta, StoryObj } from '@storybook/react';
import { Progress, CircularProgress, Skeleton } from './Progress';

const meta = {
  title: 'UI/Loaders',
  component: Progress,
  parameters: {
    layout: 'padded',
    docs: {
      description: { component: 'Progress bars (linear and circular) and skeleton loaders for content placeholders.' }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LinearProgress: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={25} label="Uploading" showValue />
      <Progress value={60} variant="warning" label="Indexing" showValue />
      <Progress value={90} variant="success" size="lg" label="Deploying" showValue />
    </div>
  )
};

export const Circular: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={30} />
      <CircularProgress value={70} variant="warning" />
      <CircularProgress value={95} variant="success" />
    </div>
  )
};

export const Skeletons: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton className="w-full h-4" variant="text" />
      <Skeleton className="w-20 h-20" variant="circular" />
      <Skeleton className="w-full h-24" variant="rounded" />
    </div>
  )
};

