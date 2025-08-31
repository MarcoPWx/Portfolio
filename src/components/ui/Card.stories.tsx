import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: { component: 'Container with optional hover, gradient background, blur, and padding presets.' }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    hover: { control: 'boolean' },
    gradient: { control: 'boolean' },
    blur: { control: 'boolean' },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] }
  }
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { hover: true, gradient: false, blur: false, padding: 'md' },
  render: (args) => (
    <Card {...args}>
      <div className="text-gray-300">This is a card with content.</div>
    </Card>
  )
};

export const GradientBlur: Story = {
  render: () => (
    <Card gradient blur>
      <div className="text-gray-300">Gradient + blur background</div>
    </Card>
  )
};

export const Paddings: Story = {
  render: () => (
    <div className="space-y-4">
      <Card padding="none"><div className="text-gray-300">No padding</div></Card>
      <Card padding="sm"><div className="text-gray-300">Small padding</div></Card>
      <Card padding="md"><div className="text-gray-300">Medium padding</div></Card>
      <Card padding="lg"><div className="text-gray-300">Large padding</div></Card>
    </div>
  )
};

