import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from '../../index';

describe('Alert', () => {
  it('renders alert content with role', () => {
    render(<Alert variant="success">Saved</Alert>);
    expect(screen.getByRole('alert').textContent).toContain('Saved');
  });

  it('closes and calls onClose when close button is pressed', () => {
    const onClose = vi.fn();
    render(
      <Alert closable onClose={onClose}>
        Dismiss me
      </Alert>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close alert' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
