import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from '../../index';

describe('Switch', () => {
  it('renders as a switch with label', () => {
    render(<Switch label="Enable" defaultChecked={false} />);
    const switchEl = screen.getByRole('switch', { name: 'Enable' });
    expect(switchEl.getAttribute('aria-checked')).toBe('false');
  });

  it('calls onChange when toggled', () => {
    const onChange = vi.fn();
    render(<Switch label="Sync" onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch', { name: 'Sync' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
