import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAccordion } from '../../index';

describe('useAccordion', () => {
  it('toggles one panel at a time in single mode', () => {
    const { result } = renderHook(() => useAccordion({ multiple: false }));

    act(() => {
      result.current.toggle('a');
    });
    expect(result.current.openIds).toEqual(['a']);

    act(() => {
      result.current.toggle('b');
    });
    expect(result.current.openIds).toEqual(['b']);
  });

  it('supports multiple open panels and closeAll', () => {
    const { result } = renderHook(() => useAccordion({ multiple: true }));

    act(() => {
      result.current.toggle('a');
      result.current.toggle('b');
    });
    expect(result.current.openIds).toEqual(['a', 'b']);

    act(() => {
      result.current.closeAll();
    });
    expect(result.current.openIds).toEqual([]);
  });
});
