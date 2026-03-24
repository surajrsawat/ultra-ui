import { useCallback, useState } from 'react';
import type { AccordionItemId, UseAccordionOptions, UseAccordionReturn } from './types';

export function useAccordion<T extends AccordionItemId>(
  options: UseAccordionOptions<T> = {}
): UseAccordionReturn<T> {
  const {
    multiple = false,
    defaultOpenIds = [],
    openIds: controlledOpenIds,
    onChange,
  } = options;

  const [internalOpenIds, setInternalOpenIds] = useState<T[]>(defaultOpenIds);
  const isControlled = controlledOpenIds !== undefined;
  const openIds = isControlled ? controlledOpenIds : internalOpenIds;

  const setOpenIds = useCallback((nextIds: T[]) => {
    if (!isControlled) {
      setInternalOpenIds(nextIds);
    }

    onChange?.(nextIds);
  }, [isControlled, onChange]);

  const getNextToggleIds = useCallback((currentIds: T[], id: T) => {
    return currentIds.includes(id)
      ? currentIds.filter((openId) => openId !== id)
      : multiple
        ? [...currentIds, id]
        : [id];
  }, [multiple]);

  const isOpen = useCallback((id: T) => {
    return openIds.includes(id);
  }, [openIds]);

  const toggle = useCallback((id: T) => {
    if (!isControlled) {
      setInternalOpenIds((previousIds) => {
        const nextIds = getNextToggleIds(previousIds, id);
        onChange?.(nextIds);
        return nextIds;
      });
      return;
    }

    setOpenIds(getNextToggleIds(openIds, id));
  }, [getNextToggleIds, isControlled, onChange, openIds, setOpenIds]);

  const openAll = useCallback((ids: T[]) => {
    setOpenIds(multiple ? ids : ids.slice(0, 1));
  }, [multiple, setOpenIds]);

  const closeAll = useCallback(() => {
    setOpenIds([]);
  }, [setOpenIds]);

  return {
    openIds,
    isOpen,
    toggle,
    openAll,
    closeAll,
  };
}
