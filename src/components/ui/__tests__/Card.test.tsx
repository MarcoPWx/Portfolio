import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/Card';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <div data-testid="child">Content</div>
      </Card>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies gradient and blur classes when set', () => {
    const { container } = render(
      <Card gradient blur padding="lg">
        Hello
      </Card>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/bg-gradient-to-br/);
    expect(el.className).toMatch(/backdrop-blur-xl|backdrop-blur/);
    expect(el.className).toMatch(/p-8/);
  });

  it('supports padding presets', () => {
    const { rerender, container } = render(<Card padding="none">A</Card>);
    let el = container.firstChild as HTMLElement;
    expect(el.className).not.toMatch(/p-4|p-6|p-8/);

    rerender(<Card padding="sm">A</Card>);
    el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/p-4/);

    rerender(<Card padding="md">A</Card>);
    el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/p-6/);

    rerender(<Card padding="lg">A</Card>);
    el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/p-8/);
  });
});
