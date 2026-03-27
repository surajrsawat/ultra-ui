import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spacer } from './Spacer';

describe('Spacer', () => {
  it('renders a hidden block element', () => {
    render(<Spacer data-testid="spacer" />);
    const el = screen.getByTestId('spacer');
    expect(el.tagName).toBe('DIV');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies explicit width and height', () => {
    render(<Spacer data-testid="spacer" width={24} height={16} />);
    const el = screen.getByTestId('spacer');
    expect(el.style.width).toBe('24px');
    expect(el.style.height).toBe('16px');
  });

  it('applies size shorthand to both dimensions', () => {
    render(<Spacer data-testid="spacer" size={32} />);
    const el = screen.getByTestId('spacer');
    expect(el.style.width).toBe('32px');
    expect(el.style.height).toBe('32px');
  });

  it('sets flexGrow:1 when flex=true', () => {
    render(<Spacer data-testid="spacer" flex />);
    expect(screen.getByTestId('spacer').style.flexGrow).toBe('1');
  });

  it('applies explicit flexGrow when provided', () => {
    render(<Spacer data-testid="spacer" flexGrow={2} />);
    expect(screen.getByTestId('spacer').style.flexGrow).toBe('2');
  });

  it('accepts string width/height values', () => {
    render(<Spacer data-testid="spacer" width="2rem" height="1rem" />);
    const el = screen.getByTestId('spacer');
    expect(el.style.width).toBe('2rem');
    expect(el.style.height).toBe('1rem');
  });
});
