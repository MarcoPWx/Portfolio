import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui/Input';
import { Search, Mail } from 'lucide-react';

describe('Input', () => {
  it('renders label and placeholder', () => {
    render(<Input label="Your name" placeholder="Type here..." />);
    expect(screen.getByText('Your name')).toBeInTheDocument();
    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveAttribute('placeholder', 'Type here...');
  });

  it('supports left and right icons', () => {
    const { rerender, container } = render(
      <Input label="Search" icon={Search} iconPosition="left" placeholder="Search..." />,
    );
    // icon renders as an svg
    expect(container.querySelector('svg')).toBeTruthy();

    rerender(
      <Input label="Email" icon={Mail} iconPosition="right" placeholder="you@example.com" />,
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeTruthy();

    // basic interaction
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input.value).toBe('hello');
  });

  it('shows error message and supports aria-invalid', () => {
    render(<Input label="Username" error="This field is required" aria-invalid placeholder="u" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid');
  });
});
