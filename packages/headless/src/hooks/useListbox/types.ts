export interface UseListboxOptions {
  itemsCount: number;
  itemLabels?: string[];
  defaultOpen?: boolean;
  defaultSelectedIndex?: number;
  defaultSelectedIndices?: number[];
  loop?: boolean;
  closeOnSelect?: boolean;
  selectionMode?: 'single' | 'multiple';
}

export interface UseListboxReturn {
  open: boolean;
  highlightedIndex: number;
  selectedIndex: number;
  selectedIndices: number[];
  typeaheadQuery: string;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onTypeahead: (key: string) => void;
  onKeyDown: (event: {
    key: string;
    preventDefault?: () => void;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
  }) => void;
  selectIndex: (index: number) => void;
  isSelected: (index: number) => boolean;
}
