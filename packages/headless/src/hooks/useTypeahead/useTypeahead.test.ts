import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useTypeahead } from '../../index';

describe('useTypeahead', () => {
  const items = ['Apple', 'Apricot', 'Banana', 'Blueberry'];

  afterEach(() => {
    vi.useRealTimers();
  });

  it('accumulates a query and matches by prefix', () => {
    const { result } = renderHook(() => useTypeahead({ items }));

    act(() => {
      result.current.onType('a');
    });
    expect(result.current.query).toBe('a');
    expect(result.current.matchedIndex).toBe(0);

    act(() => {
      result.current.onType('p');
    });
    expect(result.current.query).toBe('ap');
    expect(result.current.matchedIndex).toBe(0);
  });

  it('resets query after timeout and starts a new match sequence', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTypeahead({ items, timeoutMs: 300 }));

    act(() => {
      result.current.onType('a');
    });
    expect(result.current.query).toBe('a');

    act(() => {
      vi.advanceTimersByTime(301);
    });
    expect(result.current.query).toBe('');

    act(() => {
      result.current.onType('b');
    });
    expect(result.current.query).toBe('b');
    expect(result.current.matchedIndex).toBe(2);
  });
});
