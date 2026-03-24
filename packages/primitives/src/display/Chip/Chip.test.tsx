import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Chip } from '../../index';

describe('Chip', () => {
  it('renders label and optional avatar', () => {
    render(<Chip label="React" avatar={<span>R</span>} />);
    expect(screen.getByText('React')).toBeTruthy();
    expect(screen.getByText('R')).toBeTruthy();
  });

  it('calls onDelete when delete action is clicked', () => {
    const onDelete = vi.fn();
    render(<Chip label="TypeScript" onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete TypeScript' }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
