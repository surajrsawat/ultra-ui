import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from '../../index';

describe('Checkbox', () => {
  it('renders and toggles uncontrolled state', () => {
    render(<Checkbox label="Accept" defaultChecked={false} />);
    const input = screen.getByLabelText('Accept') as HTMLInputElement;

    expect(input.checked).toBe(false);
    fireEvent.click(input);
    expect(input.checked).toBe(true);
  });

  it('calls onChange with checked value', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Terms" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Terms'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
