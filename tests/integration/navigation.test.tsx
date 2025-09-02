import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InteractivePortfolio } from '../../src/components/InteractivePortfolio';

// Mock the ComprehensiveSkills components
jest.mock('../../src/components/ComprehensiveSkills', () => {
  return function MockComprehensiveSkills() {
    return <div data-testid="comprehensive-skills">Comprehensive Skills Component</div>;
  };
});
jest.mock('../../src/components/ComprehensiveSkillsV2', () => {
  return {
    ComprehensiveSkillsV2: function MockComprehensiveSkillsV2() {
      return <div data-testid="comprehensive-skills">Comprehensive Skills V2 Component</div>;
    },
  };
});

describe('Navigation Integration Tests', () => {
  beforeEach(() => {
    render(<InteractivePortfolio />);
  });

  test('complete navigation flow through all sections', async () => {
    // Start at home
    expect(screen.getByText('PixelQuest')).toBeInTheDocument();

    // Navigate to Projects
    const projectsButton = screen.getByText('Projects');
    fireEvent.click(projectsButton);

    await waitFor(() => {
      expect(screen.getAllByText('QuizMentor').length).toBeGreaterThan(0);
      expect(screen.getAllByText('DevMentor').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Harvest.ai').length).toBeGreaterThan(0);
    });

    // Navigate to About
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    await waitFor(() => {
      expect(screen.getByText('Marco')).toBeInTheDocument();
      expect(screen.getByText('Professional Summary')).toBeInTheDocument();
      expect(screen.getByText('Work Experience')).toBeInTheDocument();
    });

    // Navigate to Stack
    const stackButton = screen.getByText('Stack');
    fireEvent.click(stackButton);

    await waitFor(() => {
      expect(screen.getByTestId('comprehensive-skills')).toBeInTheDocument();
    });

    // Navigate back to Home
    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);

    await waitFor(() => {
      expect(screen.getByText('PixelQuest')).toBeInTheDocument();
    });
  });

  test.skip('terminal command integration', async () => {
    const terminalInput = screen.getByPlaceholderText('Enter command...');

    // Test help command
    fireEvent.change(terminalInput, { target: { value: 'help' } });
    fireEvent.keyDown(terminalInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/Available commands/)).toBeInTheDocument();
    });

    // Test about command
    fireEvent.change(terminalInput, { target: { value: 'about' } });
    fireEvent.keyDown(terminalInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/PixelQuest - Building the future/)).toBeInTheDocument();
    });

    // Test projects command
    fireEvent.change(terminalInput, { target: { value: 'projects' } });
    fireEvent.keyDown(terminalInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/QuizMentor/)).toBeInTheDocument();
    });
  });

  test('project roadmap modal integration', async () => {
    // Navigate to projects
    const projectsButton = screen.getByText('Projects');
    fireEvent.click(projectsButton);

    await waitFor(() => {
      expect(screen.getAllByText('QuizMentor').length).toBeGreaterThan(0);
    });

    // Focus a card to reveal its roadmap button
    fireEvent.click(screen.getAllByText('QuizMentor')[0]);

    // Click on roadmap button
    const roadmapButtons = screen.getAllByText('View Roadmap');
    fireEvent.click(roadmapButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByText(/Product Roadmaps/).length).toBeGreaterThan(0);
    });
  });

  test('skills section interaction flow', async () => {
    // Navigate to skills
    const stackButton = screen.getByText('Stack');
    fireEvent.click(stackButton);

    await waitFor(() => {
      expect(screen.getByTestId('comprehensive-skills')).toBeInTheDocument();
    });

    // The ComprehensiveSkills component should handle its own interactions
    // This test ensures the integration works
    expect(screen.getByTestId('comprehensive-skills')).toBeInTheDocument();
  });

  test('social links integration', () => {
    const linkedinLinks = screen.getAllByRole('link', { name: /linkedin/i });
    const githubLinks = screen.getAllByRole('link', { name: /github/i });

    const linkedinMatch = linkedinLinks.find((a) =>
      a.getAttribute('href')?.includes('linkedin.com/in/mapw'),
    );
    const githubMatch = githubLinks.find((a) =>
      a.getAttribute('href')?.includes('github.com/MarcoPWx'),
    );

    expect(linkedinMatch).toBeTruthy();
    expect(githubMatch).toBeTruthy();
    expect(linkedinMatch).toHaveAttribute('target', '_blank');
    expect(githubMatch).toHaveAttribute('target', '_blank');
  });

  test('responsive navigation integration', () => {
    // Test that all navigation items are present
    const navItems = ['Home', 'Projects', 'About', 'Stack', 'Book', 'Blog', 'Contact'];

    navItems.forEach((item) => {
      expect(screen.getAllByText(item).length).toBeGreaterThan(0);
    });
  });

  test('professional information integration', async () => {
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    await waitFor(() => {
      // Check professional summary
      expect(screen.getByText('Professional Summary')).toBeInTheDocument();
      expect(screen.getByText('Work Experience')).toBeInTheDocument();

      // Check work experience (company names)
      expect(screen.getByText(/ExSeed Health/)).toBeInTheDocument();

      // Check contact information
      expect(screen.getByText('Marcowurtz@hotmail.com')).toBeInTheDocument();
    });
  });

  test('technology stack integration', async () => {
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    await waitFor(() => {
      // Check technical skills
      expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0);
      expect(screen.getAllByText('TensorFlow').length).toBeGreaterThan(0);
    });
  });

  test('project information integration', async () => {
    const projectsButton = screen.getByText('Projects');
    fireEvent.click(projectsButton);

    await waitFor(() => {
      // Check project details
      expect(screen.getAllByText('QuizMentor').length).toBeGreaterThan(0);
      expect(screen.getAllByText('DevMentor').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Harvest.ai').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Voice').length).toBeGreaterThan(0);
    });
  });
});
