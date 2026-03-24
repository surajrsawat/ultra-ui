import { useCallback } from 'react';
import { useDisclosure } from '../useDisclosure';
import type { UseModalOptions, UseModalReturn } from './types';

export function useModal(options: UseModalOptions = {}): UseModalReturn {
  const {
    closeOnEscape = true,
    defaultOpen,
    open,
    onOpenChange,
  } = options;

  const disclosure = useDisclosure({ defaultOpen, open, onOpenChange });

  const onBackdropClick = useCallback(() => {
    disclosure.onClose();
  }, [disclosure]);

  const onDialogKeyDown = useCallback((event: { key: string }) => {
    if (closeOnEscape && event.key === 'Escape') {
      disclosure.onClose();
    }
  }, [closeOnEscape, disclosure]);

  const getBackdropProps = useCallback(() => {
    return {
      onClick: onBackdropClick,
    };
  }, [onBackdropClick]);

  const getDialogProps = useCallback(() => {
    return {
      onKeyDown: onDialogKeyDown,
    };
  }, [onDialogKeyDown]);

  return {
    open: disclosure.open,
    onOpen: disclosure.onOpen,
    onClose: disclosure.onClose,
    onToggle: disclosure.onToggle,
    getBackdropProps,
    getDialogProps,
  };
}
