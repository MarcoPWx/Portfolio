import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InteractivePortfolio } from '../../src/components/InteractivePortfolio';

describe('InteractivePortfolio Security badges', () => {
  it('shows Security badge with snapshot tooltip in projects', async () => {
    render(<InteractivePortfolio />);

    // Navigate to Projects
    fireEvent.click(screen.getByText('Projects'));

    // Ensure project cards appear
    await waitFor(() => {
      expect(screen.getAllByText('QuizMentor').length).toBeGreaterThan(0);
    });

    // There should be Security badges visible
    const securityBadges = screen.getAllByText('Security');
    expect(securityBadges.length).toBeGreaterThan(0);

    // Check the tooltip/title on one known project snapshot (QuizMentor)
    const tooltip = document.querySelector(
      '[title="Supabase RLS; PII minimization; redaction"]'
    );
    expect(tooltip).toBeTruthy();
  });
});

