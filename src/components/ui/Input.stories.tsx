import type { Meta, StoryObj } from '@storybook/react';
import { Input, Textarea } from './Input';
import { Search, Mail } from 'lucide-react';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: { component: 'Text input and textarea with optional label, icon, error state, and left/right icon support.' }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    iconPosition: { control: 'select', options: ['left', 'right'] }
  }
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Type here...', label: 'Your name' }
};

export const WithLeftIcon: Story = {
  args: { placeholder: 'Search...', label: 'Search', icon: Search, iconPosition: 'left' }
};

export const WithRightIcon: Story = {
  args: { placeholder: 'Email', label: 'Email', icon: Mail, iconPosition: 'right' }
};

export const WithError: Story = {
  args: { placeholder: 'Username', label: 'Username', error: 'This field is required' }
};

export const TextareaExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Textarea label="Message" placeholder="Write your message..." rows={4} />
      <Textarea label="With Error" placeholder="Explain..." rows={4} error="Please provide more details" />
    </div>
  )
};

