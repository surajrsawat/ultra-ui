import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ToggleButton } from '../../index';

describe('ToggleButton', () => {
  it('renders with aria-pressed state', () => {
    render(<ToggleButton defaultActive>Bold</ToggleButton>);
    expect(screen.getByRole('button', { name: 'Bold' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('calls onChange with toggled state', () => {
    const onChange = vi.fn();
    render(<ToggleButton onChange={onChange}>Italic</ToggleButton>);
    fireEvent.click(screen.getByRole('button', { name: 'Italic' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
