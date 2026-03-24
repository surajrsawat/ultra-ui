import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useControllableState } from '../../index';

describe('useControllableState', () => {
  it('updates internal state in uncontrolled mode', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 1 }));

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](3);
    });

    expect(result.current[0]).toBe(3);
  });

  it('emits onChange without mutating internal state in controlled mode', () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, defaultValue: 0, onChange }),
      { initialProps: { value: 2 } }
    );

    expect(result.current[0]).toBe(2);

    act(() => {
      result.current[1](5);
    });

    expect(onChange).toHaveBeenCalledWith(5);
    expect(result.current[0]).toBe(2);

    rerender({ value: 5 });
    expect(result.current[0]).toBe(5);
  });
});
