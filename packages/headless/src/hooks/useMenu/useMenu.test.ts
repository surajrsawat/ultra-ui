import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useMenu } from '../../index';

describe('useMenu', () => {
  it('opens and navigates with arrow keys', () => {
    const { result } = renderHook(() => useMenu({ itemsCount: 3 }));

    expect(result.current.open).toBe(false);

    act(() => {
      result.current.onKeyDown({ key: 'ArrowDown' });
    });

    expect(result.current.open).toBe(true);
    expect(result.current.highlightedIndex).toBe(1);

    act(() => {
      result.current.onKeyDown({ key: 'ArrowUp' });
    });

    expect(result.current.highlightedIndex).toBe(0);
  });

  it('supports home/end and escape interactions', () => {
    const { result } = renderHook(() => useMenu({ itemsCount: 4, defaultOpen: true }));

    act(() => {
      result.current.onKeyDown({ key: 'End' });
    });
    expect(result.current.highlightedIndex).toBe(3);

    act(() => {
      result.current.onKeyDown({ key: 'Home' });
    });
    expect(result.current.highlightedIndex).toBe(0);

    act(() => {
      result.current.onKeyDown({ key: 'Escape' });
    });
    expect(result.current.open).toBe(false);
  });
});
