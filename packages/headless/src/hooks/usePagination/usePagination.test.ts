import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { usePagination } from '../../index';

describe('usePagination', () => {
  it('calculates paging metadata and range', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 47,
        pageSize: 10,
        initialPage: 2,
      })
    );

    expect(result.current.currentPage).toBe(2);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.startIndex).toBe(10);
    expect(result.current.endIndex).toBe(20);
  });

  it('clamps page movement in uncontrolled mode', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 12,
        pageSize: 5,
      })
    );

    act(() => {
      result.current.goToPage(99);
    });
    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.previousPage();
    });
    expect(result.current.currentPage).toBe(2);
  });

  it('supports controlled mode with onPageChange callback', () => {
    const onPageChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ currentPage }) =>
        usePagination({
          totalItems: 50,
          pageSize: 10,
          currentPage,
          onPageChange,
        }),
      { initialProps: { currentPage: 1 } }
    );

    act(() => {
      result.current.nextPage();
    });
    expect(onPageChange).toHaveBeenCalledWith(2);

    rerender({ currentPage: 2 });
    expect(result.current.currentPage).toBe(2);
  });
});
