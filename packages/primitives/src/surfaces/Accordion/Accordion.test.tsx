import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Accordion } from '../../index';

describe('Accordion', () => {
  const items = [
    { id: '1', title: 'First', content: 'Alpha' },
    { id: '2', title: 'Second', content: 'Beta' },
  ];

  it('renders headers and expands content on click', () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByRole('button', { name: /First/ }));
    expect(screen.getByText('Alpha')).toBeTruthy();
  });

  it('supports multiple open panels when enabled', () => {
    render(<Accordion items={items} multiple />);
    fireEvent.click(screen.getByRole('button', { name: /First/ }));
    fireEvent.click(screen.getByRole('button', { name: /Second/ }));
    expect(screen.getByText('Alpha')).toBeTruthy();
    expect(screen.getByText('Beta')).toBeTruthy();
  });
});
