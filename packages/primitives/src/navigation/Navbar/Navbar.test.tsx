import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavItem, Navbar } from '../../index';

describe('Navbar', () => {
  it('renders brand and children', () => {
    render(
      <Navbar brand="Ultra">
        <span>Links</span>
      </Navbar>
    );
    expect(screen.getByText('Ultra')).toBeTruthy();
    expect(screen.getByText('Links')).toBeTruthy();
  });

  it('renders NavItem as a link', () => {
    render(<NavItem href="/docs">Docs</NavItem>);
    const link = screen.getByRole('link', { name: 'Docs' }) as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/docs');
  });
});
