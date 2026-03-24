import { useCallback, useState } from 'react';
import type { UseMenuOptions, UseMenuReturn } from './types';

export function useMenu(options: UseMenuOptions): UseMenuReturn {
  const {
    itemsCount,
    defaultOpen = false,
    loop = true,
    closeOnSelect = true,
  } = options;

  const [open, setOpen] = useState(defaultOpen);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const clampIndex = useCallback((index: number) => {
    if (itemsCount <= 0) {
      return -1;
    }

    if (loop) {
      const normalized = ((index % itemsCount) + itemsCount) % itemsCount;
      return normalized;
    }

    return Math.min(Math.max(index, 0), itemsCount - 1);
  }, [itemsCount, loop]);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setOpen((previous) => !previous);
  }, []);

  const selectIndex = useCallback((index: number) => {
    setHighlightedIndex(clampIndex(index));
    if (closeOnSelect) {
      setOpen(false);
    }
  }, [clampIndex, closeOnSelect]);

  const onKeyDown = useCallback((event: { key: string; preventDefault?: () => void }) => {
    if (itemsCount <= 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault?.();
        setOpen(true);
        setHighlightedIndex((previous) => clampIndex(previous + 1));
        break;
      case 'ArrowUp':
        event.preventDefault?.();
        setOpen(true);
        setHighlightedIndex((previous) => clampIndex(previous - 1));
        break;
      case 'Home':
        event.preventDefault?.();
        setOpen(true);
        setHighlightedIndex(0);
        break;
      case 'End':
        event.preventDefault?.();
        setOpen(true);
        setHighlightedIndex(Math.max(0, itemsCount - 1));
        break;
      case 'Escape':
        event.preventDefault?.();
        setOpen(false);
        break;
      case 'Enter':
        event.preventDefault?.();
        if (closeOnSelect) {
          setOpen(false);
        }
        break;
      default:
        break;
    }
  }, [clampIndex, closeOnSelect, itemsCount]);

  return {
    open,
    highlightedIndex,
    onOpen,
    onClose,
    onToggle,
    onKeyDown,
    selectIndex,
  };
}
