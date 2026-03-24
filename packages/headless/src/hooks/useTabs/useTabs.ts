import { useCallback, useState } from 'react';
import type { TabId, UseTabsOptions, UseTabsReturn } from './types';

function getInitialTab<T extends TabId>(ids: T[], defaultTabId?: T): T | undefined {
  if (defaultTabId !== undefined && ids.includes(defaultTabId)) {
    return defaultTabId;
  }

  return ids[0];
}

export function useTabs<T extends TabId>(options: UseTabsOptions<T>): UseTabsReturn<T> {
  const {
    ids,
    defaultTabId,
    activeTabId: controlledTabId,
    onChange,
  } = options;

  const [internalTabId, setInternalTabId] = useState<T | undefined>(() => getInitialTab(ids, defaultTabId));
  const isControlled = controlledTabId !== undefined;
  const activeTabId = isControlled ? controlledTabId : internalTabId;

  const setActiveTabId = useCallback((id: T) => {
    if (!ids.includes(id)) {
      return;
    }

    if (!isControlled) {
      setInternalTabId(id);
    }

    onChange?.(id);
  }, [ids, isControlled, onChange]);

  const isActiveTab = useCallback((id: T) => {
    return activeTabId === id;
  }, [activeTabId]);

  const nextTab = useCallback(() => {
    if (ids.length === 0 || activeTabId === undefined) {
      return;
    }

    const currentIndex = ids.indexOf(activeTabId);
    const nextIndex = currentIndex < ids.length - 1 ? currentIndex + 1 : currentIndex;
    setActiveTabId(ids[nextIndex]);
  }, [activeTabId, ids, setActiveTabId]);

  const previousTab = useCallback(() => {
    if (ids.length === 0 || activeTabId === undefined) {
      return;
    }

    const currentIndex = ids.indexOf(activeTabId);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    setActiveTabId(ids[previousIndex]);
  }, [activeTabId, ids, setActiveTabId]);

  return {
    activeTabId,
    setActiveTabId,
    isActiveTab,
    nextTab,
    previousTab,
  };
}
