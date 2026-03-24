import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useToggle } from '../../index';

describe('useToggle', () => {
  it('uses false by default and toggles state', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.on).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.on).toBe(true);
  });

  it('accepts a default value and explicit set', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.on).toBe(true);

    act(() => {
      result.current.set(false);
    });

    expect(result.current.on).toBe(false);
  });
});
