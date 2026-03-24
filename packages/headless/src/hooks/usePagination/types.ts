export interface UsePaginationOptions {
  totalItems: number;
  pageSize?: number;
  initialPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
}
