import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useListbox } from '../../index';

describe('useListbox', () => {
  it('navigates and selects in single selection mode', () => {
    const { result } = renderHook(() => useListbox({
      itemsCount: 3,
      itemLabels: ['Apple', 'Apricot', 'Banana'],
      defaultSelectedIndex: 0,
    }));

    act(() => {
      result.current.onKeyDown({ key: 'ArrowDown' });
    });
    expect(result.current.highlightedIndex).toBe(1);

    act(() => {
      result.current.onKeyDown({ key: 'Enter' });
    });
    expect(result.current.selectedIndex).toBe(1);
    expect(result.current.isSelected(1)).toBe(true);
  });

  it('supports typeahead highlight and selection', () => {
    const { result } = renderHook(() => useListbox({
      itemsCount: 3,
      itemLabels: ['Apple', 'Apricot', 'Banana'],
      defaultSelectedIndex: 0,
    }));

    act(() => {
      result.current.onKeyDown({ key: 'b' });
    });
    expect(result.current.highlightedIndex).toBe(2);
    expect(result.current.typeaheadQuery).toBe('b');

    act(() => {
      result.current.onKeyDown({ key: ' ' });
    });
    expect(result.current.selectedIndex).toBe(2);
  });

  it('toggles selections in multiple mode', () => {
    const { result } = renderHook(() => useListbox({
      itemsCount: 4,
      selectionMode: 'multiple',
      defaultSelectedIndices: [],
    }));

    act(() => {
      result.current.selectIndex(1);
      result.current.selectIndex(3);
      result.current.selectIndex(1);
    });

    expect(result.current.selectedIndices).toEqual([3]);
  });
});
