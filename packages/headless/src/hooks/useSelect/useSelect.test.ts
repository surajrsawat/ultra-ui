import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSelect } from '../../index';

describe('useSelect', () => {
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ];

  it('initializes with selected option and changes by index', () => {
    const { result } = renderHook(() => useSelect({ options, defaultSelectedIndex: 1 }));

    expect(result.current.selectedOption?.value).toBe('vue');

    act(() => {
      result.current.selectIndex(2);
    });

    expect(result.current.selectedOption?.value).toBe('svelte');
  });

  it('supports keyboard selection via enter on highlighted option', () => {
    const { result } = renderHook(() => useSelect({ options }));

    act(() => {
      result.current.onKeyDown({ key: 'ArrowDown' });
    });

    act(() => {
      result.current.onKeyDown({ key: 'Enter' });
    });

    expect(result.current.selectedOption?.value).toBe('vue');
    expect(result.current.open).toBe(false);
  });
});
