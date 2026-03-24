import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDisclosure } from '../../index';

describe('useDisclosure', () => {
  it('handles uncontrolled open state', () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.open).toBe(false);

    act(() => {
      result.current.onOpen();
    });
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.onToggle();
    });
    expect(result.current.open).toBe(false);

    act(() => {
      result.current.setOpen(true);
    });
    expect(result.current.open).toBe(true);
  });

  it('supports controlled mode and emits open changes', () => {
    const onOpenChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ open }) => useDisclosure({ open, onOpenChange }),
      { initialProps: { open: true } }
    );

    expect(result.current.open).toBe(true);

    act(() => {
      result.current.onClose();
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);

    rerender({ open: false });
    expect(result.current.open).toBe(false);
  });
});
