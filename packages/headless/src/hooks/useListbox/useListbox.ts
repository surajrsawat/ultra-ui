import { useCallback, useMemo, useState } from 'react';
import { useMenu } from '../useMenu';
import { useTypeahead } from '../useTypeahead';
import type { UseListboxOptions, UseListboxReturn } from './types';

export function useListbox(options: UseListboxOptions): UseListboxReturn {
  const {
    itemsCount,
    itemLabels = [],
    defaultOpen = false,
    defaultSelectedIndex = 0,
    defaultSelectedIndices = [],
    loop = true,
    closeOnSelect = false,
    selectionMode = 'single',
  } = options;

  const menu = useMenu({ itemsCount, defaultOpen, loop, closeOnSelect });
  const typeahead = useTypeahead({ items: itemLabels });

  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);
  const [selectedIndices, setSelectedIndices] = useState(defaultSelectedIndices);

  const clampIndex = useCallback((index: number) => {
    if (itemsCount <= 0) {
      return -1;
    }
    return Math.min(Math.max(index, 0), itemsCount - 1);
  }, [itemsCount]);

  const isSelected = useCallback((index: number) => {
    return selectionMode === 'multiple'
      ? selectedIndices.includes(index)
      : selectedIndex === index;
  }, [selectedIndex, selectedIndices, selectionMode]);

  const selectIndex = useCallback((index: number) => {
    const safeIndex = clampIndex(index);
    if (safeIndex < 0) {
      return;
    }

    menu.selectIndex(safeIndex);

    if (selectionMode === 'multiple') {
      setSelectedIndices((previous) => (
        previous.includes(safeIndex)
          ? previous.filter((item) => item !== safeIndex)
          : [...previous, safeIndex]
      ));
      return;
    }

    setSelectedIndex(safeIndex);
  }, [clampIndex, menu, selectionMode]);

  const onTypeahead = useCallback((key: string) => {
    const matchedIndex = typeahead.onType(key);
    if (matchedIndex >= 0) {
      menu.selectIndex(matchedIndex);
      menu.onOpen();
    }
  }, [menu, typeahead]);

  const onKeyDown = useCallback((event: {
    key: string;
    preventDefault?: () => void;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
  }) => {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault?.();
      selectIndex(menu.highlightedIndex);
      return;
    }

    if (event.key.length === 1) {
      event.preventDefault?.();
      onTypeahead(event.key);
      return;
    }

    menu.onKeyDown(event);
  }, [menu, onTypeahead, selectIndex]);

  const stableSelectedIndices = useMemo(() => {
    return selectionMode === 'multiple'
      ? selectedIndices
      : [selectedIndex].filter((index) => index >= 0);
  }, [selectedIndex, selectedIndices, selectionMode]);

  return {
    open: menu.open,
    highlightedIndex: menu.highlightedIndex,
    selectedIndex,
    selectedIndices: stableSelectedIndices,
    typeaheadQuery: typeahead.query,
    onOpen: menu.onOpen,
    onClose: menu.onClose,
    onToggle: menu.onToggle,
    onTypeahead,
    onKeyDown,
    selectIndex,
    isSelected,
  };
}
