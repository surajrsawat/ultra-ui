import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders with separator role on the hr element', () => {
    render(<Divider data-testid="divider" />);
    expect(screen.getAllByRole('separator').length).toBeGreaterThanOrEqual(1);
  });

  it('defaults to horizontal orientation', () => {
    render(<Divider data-testid="divider" />);
    const separator = screen.getAllByRole('separator')[0];
    expect(separator?.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('renders as vertical', () => {
    render(<Divider data-testid="divider" orientation="vertical" />);
    const separator = screen.getAllByRole('separator')[0];
    expect(separator?.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('renders a label when provided', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeTruthy();
  });

  it('applies spacing as margin', () => {
    render(<Divider data-testid="divider" spacing={16} />);
    expect(screen.getByTestId('divider').style.margin).toBe('16px');
  });

  it('applies spacingY as top/bottom margin for horizontal', () => {
    render(<Divider data-testid="divider" spacingY={8} />);
    const el = screen.getByTestId('divider');
    expect(el.style.marginTop).toBe('8px');
    expect(el.style.marginBottom).toBe('8px');
  });
});
