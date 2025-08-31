import type { Meta, StoryObj } from '@storybook/react';
import { StatCard, StatsGrid, PercentageRing } from './Stats';
import { Users, Activity, DollarSign, Cpu } from 'lucide-react';

const meta = {
  title: 'UI/Stats',
  component: StatCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: { component: 'Stats primitives: StatCard, StatsGrid, and PercentageRing for animated metrics.' }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof StatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardsInGrid: Story = {
  render: () => (
    <StatsGrid columns={4}>
      <StatCard value={12847} label="Active Users" icon={Users} />
      <StatCard value={99.97} label="Uptime" suffix="%" icon={Activity} />
      <StatCard value={24580} label="Revenue" prefix="$" icon={DollarSign} />
      <StatCard value={42} label="CPU" suffix="%" icon={Cpu} trend={{ value: 3, isPositive: false }} />
    </StatsGrid>
  )
};

export const ProgressRing: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <PercentageRing percentage={72} label="Coverage" color="#10b981" />
      <PercentageRing percentage={45} label="CPU" color="#f59e0b" />
      <PercentageRing percentage={92} label="Uptime" color="#22d3ee" />
    </div>
  )
};

