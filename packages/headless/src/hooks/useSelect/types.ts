export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export interface UseSelectOptions<T = string> {
  options: SelectOption<T>[];
  defaultSelectedIndex?: number;
  closeOnSelect?: boolean;
}

export interface UseSelectReturn<T = string> {
  open: boolean;
  highlightedIndex: number;
  selectedIndex: number;
  selectedOption: SelectOption<T> | undefined;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  onKeyDown: (event: { key: string; preventDefault?: () => void }) => void;
  selectIndex: (index: number) => void;
}
