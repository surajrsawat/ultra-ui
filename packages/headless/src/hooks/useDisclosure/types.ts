import type { Dispatch, SetStateAction } from 'react';

export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface UseDisclosureReturn {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}
