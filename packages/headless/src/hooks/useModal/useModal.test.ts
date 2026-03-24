import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useModal } from '../../index';

describe('useModal', () => {
  it('opens and closes modal state', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.open).toBe(false);

    act(() => {
      result.current.onOpen();
    });
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.getBackdropProps().onClick();
    });
    expect(result.current.open).toBe(false);
  });

  it('closes on Escape when enabled', () => {
    const { result } = renderHook(() => useModal({ defaultOpen: true, closeOnEscape: true }));

    expect(result.current.open).toBe(true);

    act(() => {
      result.current.getDialogProps().onKeyDown({ key: 'Escape' });
    });

    expect(result.current.open).toBe(false);
  });
});
