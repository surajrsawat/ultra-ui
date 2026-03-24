import { useCallback, useMemo, useState } from 'react';
import type { UsePaginationOptions, UsePaginationReturn } from './types';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function usePagination(options: UsePaginationOptions): UsePaginationReturn {
  const {
    totalItems,
    pageSize = 10,
    initialPage = 1,
    currentPage: controlledPage,
    onPageChange,
  } = options;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const [internalPage, setInternalPage] = useState(() => clamp(initialPage, 1, totalPages));

  const isControlled = controlledPage !== undefined;
  const currentPage = clamp(isControlled ? controlledPage : internalPage, 1, totalPages);

  const goToPage = useCallback((page: number) => {
    const nextPage = clamp(page, 1, totalPages);

    if (!isControlled) {
      setInternalPage(nextPage);
    }

    onPageChange?.(nextPage);
  }, [isControlled, onPageChange, totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const previousPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * pageSize;
  }, [currentPage, pageSize]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + pageSize, totalItems);
  }, [pageSize, startIndex, totalItems]);

  return {
    currentPage,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    canGoNext: currentPage < totalPages,
    canGoPrevious: currentPage > 1,
    nextPage,
    previousPage,
    goToPage,
  };
}
