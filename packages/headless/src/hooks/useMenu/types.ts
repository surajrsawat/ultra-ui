export interface UseMenuOptions {
  itemsCount: number;
  defaultOpen?: boolean;
  loop?: boolean;
  closeOnSelect?: boolean;
}

export interface UseMenuReturn {
  open: boolean;
  highlightedIndex: number;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onKeyDown: (event: { key: string; preventDefault?: () => void }) => void;
  selectIndex: (index: number) => void;
}
