import type { Meta, StoryObj } from '@storybook/react'
import { Timeline } from './Timeline'
import { Calendar, MapPin, Briefcase } from 'lucide-react'

const meta = {
  title: 'UI/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: { component: 'Vertical timeline with optional alternating layout and icons.' }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Timeline>

export default meta

type Story = StoryObj<typeof meta>

const items = [
  { date: '2023', title: 'Joined NatureQuest', subtitle: 'Senior Engineer', description: 'Led the developer tools initiative.', icon: Briefcase, tags: ['Leadership', 'Architecture'] },
  { date: '2024', title: 'Launched QuizMentor', description: 'Gamified learning platform release.', icon: Calendar, tags: ['React Native', 'Supabase'] },
  { date: '2025', title: 'Harvest.ai Beta', description: 'Content intelligence system in beta.', icon: MapPin, tags: ['FastAPI', 'LangChain'] }
]

export const Default: Story = {
  render: () => <Timeline items={items} />
}

export const Alternating: Story = {
  render: () => <Timeline items={items} alternating />
}

