import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../../index';

describe('Button', () => {
  it('renders through the primitives public export', () => {
    render(<Button>Launch</Button>);

    expect(screen.getByRole('button', { name: 'Launch' }).textContent).toBe('Launch');
  });

  it('forwards click events when enabled', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Submit</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading text and suppresses clicks while loading', () => {
    const handleClick = vi.fn();

    render(
      <Button loading loadingText="Saving" onClick={handleClick}>
        Submit
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Saving' });
    fireEvent.click(button);

    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(handleClick).not.toHaveBeenCalled();
  });
});