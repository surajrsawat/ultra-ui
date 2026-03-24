import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Radio } from '../../index';

describe('Radio', () => {
  it('renders with provided label and value', () => {
    render(<Radio label="Option A" name="opts" value="a" />);
    const input = screen.getByLabelText('Option A') as HTMLInputElement;
    expect(input.value).toBe('a');
  });

  it('calls onChange with the radio value when selected', () => {
    const onChange = vi.fn();
    render(<Radio label="Option B" name="opts" value="b" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Option B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
