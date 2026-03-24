export interface UseModalOptions {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnEscape?: boolean;
}

export interface UseModalReturn {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  getBackdropProps: () => {
    onClick: () => void;
  };
  getDialogProps: () => {
    onKeyDown: (event: { key: string }) => void;
  };
}
