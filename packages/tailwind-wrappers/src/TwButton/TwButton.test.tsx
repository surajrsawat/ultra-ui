import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TwButton } from './index';

describe('TwButton', () => {
  it('renders children with default classes', () => {
    render(<TwButton>Save</TwButton>);

    const button = screen.getByRole('button', { name: 'Save' });

    expect(button.className).toContain('px-3');
    expect(button.className).toContain('bg-blue-600');
  });

  it('preserves custom classes', () => {
    render(<TwButton className="w-full">Save</TwButton>);

    expect(screen.getByRole('button', { name: 'Save' }).className).toContain('w-full');
  });
});
