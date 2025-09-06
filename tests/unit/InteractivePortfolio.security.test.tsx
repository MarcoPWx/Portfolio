import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InteractivePortfolio } from '../../src/components/InteractivePortfolio';

describe('InteractivePortfolio Project Status', () => {
  it('shows Alpha status badges in projects', async () => {
    render(<InteractivePortfolio />);

    // Navigate to Projects
    fireEvent.click(screen.getByText('Projects'));

    // Ensure project cards appear
    await waitFor(() => {
      expect(screen.getAllByText('QuizMentor').length).toBeGreaterThan(0);
    });

    // There should be Alpha status badges visible
    const alphaBadges = screen.getAllByText('Alpha');
    expect(alphaBadges.length).toBeGreaterThan(0);

    // Verify that projects are present
    expect(screen.getByText('Voice AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('DevMentor')).toBeInTheDocument();
    expect(screen.getByText('Chameleon')).toBeInTheDocument();
  });
});
