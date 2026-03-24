import { useCallback, useMemo, useState } from 'react';
import { useMenu } from '../useMenu';
import type { UseComboboxOptions, UseComboboxReturn } from './types';

export function useCombobox<T = string>(options: UseComboboxOptions<T>): UseComboboxReturn<T> {
  const {
    options: allOptions,
    defaultInputValue = '',
  } = options;

  const [inputValue, setInputValue] = useState(defaultInputValue);

  const filteredOptions = useMemo(() => {
    const normalized = inputValue.toLowerCase();
    return allOptions.filter((option) => option.label.toLowerCase().includes(normalized));
  }, [allOptions, inputValue]);

  const menu = useMenu({ itemsCount: filteredOptions.length, closeOnSelect: true });

  const selectIndex = useCallback((index: number) => {
    const option = filteredOptions[index];
    if (!option) {
      return;
    }

    setInputValue(option.label);
    menu.selectIndex(index);
  }, [filteredOptions, menu]);

  const onInputChange = useCallback((value: string) => {
    setInputValue(value);
    menu.onOpen();
  }, [menu]);

  const onKeyDown = useCallback((event: { key: string; preventDefault?: () => void }) => {
    menu.onKeyDown(event);

    if (event.key === 'Enter') {
      const option = filteredOptions[menu.highlightedIndex];
      if (option) {
        setInputValue(option.label);
      }
    }
  }, [filteredOptions, menu]);

  return {
    open: menu.open,
    inputValue,
    highlightedIndex: menu.highlightedIndex,
    filteredOptions,
    onInputChange,
    onKeyDown,
    onOpen: menu.onOpen,
    onClose: menu.onClose,
    selectIndex,
  };
}
