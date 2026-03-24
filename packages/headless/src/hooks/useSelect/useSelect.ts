import { useCallback, useMemo, useState } from 'react';
import { useMenu } from '../useMenu';
import type { UseSelectOptions, UseSelectReturn } from './types';

export function useSelect<T = string>(options: UseSelectOptions<T>): UseSelectReturn<T> {
  const {
    options: selectOptions,
    defaultSelectedIndex = 0,
    closeOnSelect = true,
  } = options;

  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);
  const menu = useMenu({ itemsCount: selectOptions.length, closeOnSelect });

  const selectIndex = useCallback((index: number) => {
    const safeIndex = Math.min(Math.max(index, 0), Math.max(selectOptions.length - 1, 0));
    setSelectedIndex(safeIndex);
    menu.selectIndex(safeIndex);
  }, [menu, selectOptions.length]);

  const onKeyDown = useCallback((event: { key: string; preventDefault?: () => void }) => {
    menu.onKeyDown(event);

    if (event.key === 'Enter') {
      setSelectedIndex(menu.highlightedIndex);
    }
  }, [menu]);

  const selectedOption = useMemo(() => {
    return selectOptions[selectedIndex];
  }, [selectOptions, selectedIndex]);

  return {
    open: menu.open,
    highlightedIndex: menu.highlightedIndex,
    selectedIndex,
    selectedOption,
    onToggle: menu.onToggle,
    onOpen: menu.onOpen,
    onClose: menu.onClose,
    onKeyDown,
    selectIndex,
  };
}
