import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressBar } from '../../index';

describe('ProgressBar', () => {
  it('clamps value and exposes aria attributes', () => {
    render(<ProgressBar value={140} />);
    const bar = screen.getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('100');
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
  });

  it('renders custom label when provided', () => {
    render(<ProgressBar value={35} label="Uploading" />);
    expect(screen.getByText('Uploading')).toBeTruthy();
  });
});
