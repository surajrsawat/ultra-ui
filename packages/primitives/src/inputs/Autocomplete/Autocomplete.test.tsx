import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Autocomplete } from '../../index';

describe('Autocomplete', () => {
  it('filters options from user input', () => {
    render(
      <Autocomplete
        options={[
          { value: 'r', label: 'React' },
          { value: 'v', label: 'Vue' },
        ]}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Re' } });
    expect(screen.getByRole('option', { name: 'React' })).toBeTruthy();
  });

  it('calls onSelect when an option is chosen', () => {
    const onSelect = vi.fn();
    render(
      <Autocomplete
        options={[
          { value: 'r', label: 'React' },
          { value: 'v', label: 'Vue' },
        ]}
        onSelect={onSelect}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.click(screen.getByRole('option', { name: 'Vue' }));
    expect(onSelect).toHaveBeenCalledWith({ value: 'v', label: 'Vue' });
  });
});
