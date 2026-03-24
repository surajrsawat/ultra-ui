import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTabs } from '../../index';

describe('useTabs', () => {
  it('handles uncontrolled active tab state and helpers', () => {
    const ids = ['overview', 'usage', 'api'] as const;
    const { result } = renderHook(() => useTabs({ ids: [...ids], defaultTabId: 'usage' }));

    expect(result.current.activeTabId).toBe('usage');
    expect(result.current.isActiveTab('usage')).toBe(true);

    act(() => {
      result.current.nextTab();
    });
    expect(result.current.activeTabId).toBe('api');

    act(() => {
      result.current.previousTab();
    });
    expect(result.current.activeTabId).toBe('usage');
  });

  it('supports controlled mode and emits onChange', () => {
    const ids = ['a', 'b', 'c'] as const;
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ activeTabId }) => useTabs({ ids: [...ids], activeTabId, onChange }),
      { initialProps: { activeTabId: 'a' as const } }
    );

    act(() => {
      result.current.setActiveTabId('c');
    });
    expect(onChange).toHaveBeenCalledWith('c');

    rerender({ activeTabId: 'c' });
    expect(result.current.activeTabId).toBe('c');
  });
});
