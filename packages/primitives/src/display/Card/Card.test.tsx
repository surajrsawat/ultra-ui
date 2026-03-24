import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from '../../index';

describe('Card', () => {
  it('renders header, content, and footer from the public export', () => {
    render(
      <Card title="Overview" subtitle="Summary" footer={<span>Footer</span>}>
        <p>Content</p>
      </Card>
    );

    expect(screen.getByText('Overview').textContent).toBe('Overview');
    expect(screen.getByText('Summary').textContent).toBe('Summary');
    expect(screen.getByText('Content').textContent).toBe('Content');
    expect(screen.getByText('Footer').textContent).toBe('Footer');
  });

  it('raises elevation on hover when hoverable is enabled', () => {
    const { container } = render(<Card title="Hover card" hoverable>Body</Card>);

    const card = container.firstElementChild as HTMLDivElement;

    expect(card.style.boxShadow).toContain('0 1px 3px');

    fireEvent.mouseEnter(card);
    expect(card.style.boxShadow).toContain('0 10px 20px');

    fireEvent.mouseLeave(card);
    expect(card.style.boxShadow).toContain('0 1px 3px');
  });
});