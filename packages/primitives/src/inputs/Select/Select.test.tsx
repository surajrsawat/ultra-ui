import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Select } from '../../index';

describe('Select', () => {
  it('renders placeholder and options', () => {
    render(
      <Select
        placeholder="Choose"
        options={[
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta' },
        ]}
      />
    );
    expect(screen.getByRole('option', { name: 'Choose' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Alpha' })).toBeTruthy();
  });

  it('allows selection changes', () => {
    render(
      <Select
        options={[
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta' },
        ]}
        defaultValue="a"
      />
    );
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'b' } });
    expect(select.value).toBe('b');
  });
});
