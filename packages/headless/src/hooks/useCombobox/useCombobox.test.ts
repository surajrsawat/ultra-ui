import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCombobox } from '../../index';

describe('useCombobox', () => {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Apricot', value: 'apricot' },
    { label: 'Banana', value: 'banana' },
  ];

  it('filters options as input changes', () => {
    const { result } = renderHook(() => useCombobox({ options }));

    act(() => {
      result.current.onInputChange('ap');
    });

    expect(result.current.filteredOptions.map((option) => option.label)).toEqual(['Apple', 'Apricot']);
    expect(result.current.open).toBe(true);
  });

  it('selects highlighted option via keyboard enter', () => {
    const { result } = renderHook(() => useCombobox({ options }));

    act(() => {
      result.current.onOpen();
      result.current.onKeyDown({ key: 'ArrowDown' });
    });

    act(() => {
      result.current.onKeyDown({ key: 'Enter' });
    });

    expect(result.current.inputValue).toBe('Apricot');
    expect(result.current.open).toBe(false);
  });
});
