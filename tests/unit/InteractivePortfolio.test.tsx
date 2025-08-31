import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InteractivePortfolio } from '../../src/components/InteractivePortfolio';

// Mock the ComprehensiveSkills component (V1)
jest.mock('../../src/components/ComprehensiveSkills', () => {
  return function MockComprehensiveSkills() {
    return <div data-testid="comprehensive-skills">Comprehensive Skills Component</div>;
  };
});
// Mock the ComprehensiveSkillsV2 component (used by InteractivePortfolio)
jest.mock('../../src/components/ComprehensiveSkillsV2', () => {
  return {
    ComprehensiveSkillsV2: function MockComprehensiveSkillsV2() {
      return <div data-testid="comprehensive-skills">Comprehensive Skills V2 Component</div>;
    },
  };
});

describe('InteractivePortfolio', () => {
  beforeEach(() => {
    render(<InteractivePortfolio />);
  });

  test('renders the main portfolio component', () => {
    expect(screen.getByText('NatureQuest')).toBeInTheDocument();
  });

  test('renders navigation menu', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Stack')).toBeInTheDocument();
    expect(screen.getByText('Book')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  test('renders social links', () => {
    const linkedinLinks = screen.getAllByRole('link', { name: /linkedin/i });
    const githubLinks = screen.getAllByRole('link', { name: /github/i });

    expect(linkedinLinks.length).toBeGreaterThan(0);
    expect(githubLinks.length).toBeGreaterThan(0);
    expect(linkedinLinks[0]).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
    expect(githubLinks[0]).toHaveAttribute('href', expect.stringContaining('github.com'));
  });

  test('displays projects section when navigating', async () => {
    const projectsButton = screen.getByText('Projects');
    fireEvent.click(projectsButton);

    await waitFor(() => {
      expect(screen.getAllByText('QuizMentor').length).toBeGreaterThan(0);
      expect(screen.getAllByText('DevMentor').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Harvest.ai').length).toBeGreaterThan(0);
    });
  });

  test('displays about section when navigating', async () => {
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    await waitFor(() => {
      expect(screen.getByText('Marco')).toBeInTheDocument();
      expect(screen.getByText('Professional Summary')).toBeInTheDocument();
      expect(screen.getByText('Work Experience')).toBeInTheDocument();
    });
  });

  test('displays skills section when navigating', async () => {
    const skillsButton = screen.getByText('Stack');
    fireEvent.click(skillsButton);

    await waitFor(() => {
      expect(screen.getByTestId('comprehensive-skills')).toBeInTheDocument();
    });
  });

  test('renders particles background', () => {
    // Check if the particles container is rendered
    const particlesContainer = document.querySelector('.particles-container');
    expect(particlesContainer).toBeInTheDocument();
  });

  test('handles roadmap modal state', async () => {
    const projectsButton = screen.getByText('Projects');
    fireEvent.click(projectsButton);

    // Focus a project card to reveal the roadmap button
    const quizTitle = screen.getAllByText('QuizMentor')[0];
    fireEvent.click(quizTitle);

    await waitFor(() => {
      const roadmapButtons = screen.getAllByText('View Roadmap');
      expect(roadmapButtons.length).toBeGreaterThan(0);
    });
  });

  test('renders terminal component', () => {
    expect(screen.getByPlaceholderText('Enter command...')).toBeInTheDocument();
  });

  test('handles terminal commands', async () => {
    const terminalInput = screen.getByPlaceholderText('Enter command...');
    fireEvent.change(terminalInput, { target: { value: 'help' } });
    fireEvent.keyDown(terminalInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/Available commands/)).toBeInTheDocument();
    });
  });

  test('displays correct professional information', async () => {
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    await waitFor(() => {
      expect(screen.getByText('Professional Summary')).toBeInTheDocument();
      expect(screen.getByText('Work Experience')).toBeInTheDocument();
      expect(screen.getByText(/ExSeed Health/)).toBeInTheDocument();
    });
  });

  test('renders work experience timeline', async () => {
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    await waitFor(() => {
      expect(screen.getByText(/ExSeed Health/)).toBeInTheDocument();
      expect(screen.getByText(/Queue/i)).toBeInTheDocument();
      expect(screen.getByText(/Cinemataztic/)).toBeInTheDocument();
    });
  });

  test('displays technical skills', async () => {
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    await waitFor(() => {
      expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0);
    });
  });

  test('renders education and certifications', async () => {
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    await waitFor(() => {
      expect(screen.getByText('Education & Certifications')).toBeInTheDocument();
    });
  });

  test('displays contact information', async () => {
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    await waitFor(() => {
      expect(screen.getByText('Marcowurtz@hotmail.com')).toBeInTheDocument();
      expect(screen.getByText('linkedin.com/in/mapw')).toBeInTheDocument();
      expect(screen.getByText('github.com/MarcoPWx')).toBeInTheDocument();
    });
  });
});
