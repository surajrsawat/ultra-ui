import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from '../../index';

describe('Badge', () => {
  it('renders capped numeric content with max', () => {
    render(
      <Badge content={120} max={99}>
        <span>Inbox</span>
      </Badge>
    );
    expect(screen.getByText('99+')).toBeTruthy();
  });

  it('renders a dot variant without text content', () => {
    const { container } = render(<Badge content={1} variant="dot" />);
    expect(screen.queryByText('1')).toBeNull();
    const dot = container.querySelector('div > div') as HTMLDivElement;
    expect(dot).toBeTruthy();
    expect(dot.textContent).toBe('');
  });
});
