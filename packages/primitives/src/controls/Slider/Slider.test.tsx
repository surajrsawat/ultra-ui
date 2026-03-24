import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from '../../index';

describe('Slider', () => {
  it('renders current value when label display is enabled', () => {
    render(<Slider label="Volume" defaultValue={20} showValueLabel />);
    expect(screen.getByText('20')).toBeTruthy();
  });

  it('calls onChange with numeric value', () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={10} onChange={onChange} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '35' } });
    expect(onChange).toHaveBeenCalledWith(35);
  });
});
