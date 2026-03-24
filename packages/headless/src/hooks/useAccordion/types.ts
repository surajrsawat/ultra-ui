export type AccordionItemId = string | number;

export interface UseAccordionOptions<T extends AccordionItemId> {
  multiple?: boolean;
  defaultOpenIds?: T[];
  openIds?: T[];
  onChange?: (openIds: T[]) => void;
}

export interface UseAccordionReturn<T extends AccordionItemId> {
  openIds: T[];
  isOpen: (id: T) => boolean;
  toggle: (id: T) => void;
  openAll: (ids: T[]) => void;
  closeAll: () => void;
}
