import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Snackbar } from '../../index';

describe('Snackbar', () => {
  it('renders message while open', () => {
    render(<Snackbar message="Saved" duration={0} />);
    expect(screen.getByRole('status').textContent).toContain('Saved');
  });

  it('fires action and dismiss callbacks', () => {
    const onAction = vi.fn();
    const onDismiss = vi.fn();
    render(
      <Snackbar
        message="Queued"
        action="Undo"
        duration={0}
        onAction={onAction}
        onDismiss={onDismiss}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
