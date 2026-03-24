import { useCallback, useState } from 'react';
import type { UseDisclosureOptions, UseDisclosureReturn } from './types';

export function useDisclosure(options: UseDisclosureOptions = {}): UseDisclosureReturn {
  const {
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
  } = options;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen: UseDisclosureReturn['setOpen'] = useCallback((nextState) => {
    const nextValue = typeof nextState === 'function'
      ? (nextState as (prevState: boolean) => boolean)(open)
      : nextState;

    if (!isControlled) {
      setInternalOpen(nextValue);
    }

    onOpenChange?.(nextValue);
  }, [isControlled, onOpenChange, open]);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onToggle = useCallback(() => {
    setOpen((previous) => !previous);
  }, [setOpen]);

  return {
    open,
    setOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
