export type TabId = string | number;

export interface UseTabsOptions<T extends TabId> {
  ids: T[];
  defaultTabId?: T;
  activeTabId?: T;
  onChange?: (id: T) => void;
}

export interface UseTabsReturn<T extends TabId> {
  activeTabId: T | undefined;
  setActiveTabId: (id: T) => void;
  isActiveTab: (id: T) => boolean;
  nextTab: () => void;
  previousTab: () => void;
}
