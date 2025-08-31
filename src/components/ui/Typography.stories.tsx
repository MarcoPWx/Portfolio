import type { Meta, StoryObj } from '@storybook/react';
import { SectionTitle, GradientText } from './Typography';

const meta = {
  title: 'UI/Typography',
  component: SectionTitle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Typography primitives: SectionTitle (with title/children, badge, subtitle) and GradientText.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ['left', 'center', 'right'] },
    animate: { control: 'boolean' }
  }
} satisfies Meta<typeof SectionTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithTitleProp: Story = {
  args: { title: 'Section Title', subtitle: 'Optional subtitle for context', badge: 'Overview', align: 'center' }
};

export const WithChildren: Story = {
  render: () => (
    <SectionTitle align="left" badge="Highlights">
      <GradientText animate={false}>Custom Children Title</GradientText>
    </SectionTitle>
  )
};

