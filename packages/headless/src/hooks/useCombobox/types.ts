export interface ComboboxOption<T = string> {
  label: string;
  value: T;
}

export interface UseComboboxOptions<T = string> {
  options: ComboboxOption<T>[];
  defaultInputValue?: string;
}

export interface UseComboboxReturn<T = string> {
  open: boolean;
  inputValue: string;
  highlightedIndex: number;
  filteredOptions: ComboboxOption<T>[];
  onInputChange: (value: string) => void;
  onKeyDown: (event: { key: string; preventDefault?: () => void }) => void;
  onOpen: () => void;
  onClose: () => void;
  selectIndex: (index: number) => void;
}
