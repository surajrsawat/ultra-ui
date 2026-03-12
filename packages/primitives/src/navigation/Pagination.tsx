/**
 * Pagination Component - Page navigation
 */

import React, { forwardRef } from 'react';
import { BaseComponentProps } from '../types';

export interface PaginationProps extends BaseComponentProps {
  /**
   * Current page number
   */
  currentPage: number;
  /**
   * Total pages
   */
  totalPages: number;
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Number of page buttons to show
   */
  siblingCount?: number;
  /**
   * Show first/last buttons
   */
  showFirstLast?: boolean;
  /**
   * Disabled state
   */
  disabled?: boolean;
}

const paginationButtonStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  margin: '0 0.25rem',
  border: '1px solid #ddd',
  backgroundColor: '#fff',
  cursor: 'pointer',
  borderRadius: '4px',
  fontSize: '0.875rem',
  transition: 'all 0.2s ease',
  minWidth: '36px',
  height: '36px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const activePaginationButtonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: '#fff',
  borderColor: '#007bff',
};

const disabledButtonStyle: React.CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
};

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      disabled = false,
      className = '',
      style = {},
      ...rest
    },
    ref
  ) => {
    // Calculate visible page numbers
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      // Add first page and ellipsis
      if (leftSiblingIndex > 1) {
        pages.push(1);
        if (leftSiblingIndex > 2) {
          pages.push('...');
        }
      }

      // Add sibling pages
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }

      // Add last page and ellipsis
      if (rightSiblingIndex < totalPages) {
        if (rightSiblingIndex < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }

      return pages;
    };

    const containerStyle: React.CSSProperties = {
      ...style,
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    };

    const handlePageClick = (page: number) => {
      if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };

    const pageNumbers = getPageNumbers();
    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
      <div ref={ref} style={containerStyle} className={className} role="navigation" {...rest}>
        {showFirstLast && (
          <button
            style={{
              ...paginationButtonStyle,
              ...((!canGoPrevious || disabled) && disabledButtonStyle),
            }}
            onClick={() => handlePageClick(1)}
            disabled={!canGoPrevious || disabled}
            aria-label="First page"
          >
            ‹‹
          </button>
        )}

        <button
          style={{
            ...paginationButtonStyle,
            ...((!canGoPrevious || disabled) && disabledButtonStyle),
          }}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={!canGoPrevious || disabled}
          aria-label="Previous page"
        >
          ‹
        </button>

        {pageNumbers.map((page, index) => (
          <button
            key={`${page}-${index}`}
            style={{
              ...paginationButtonStyle,
              ...(page === currentPage && activePaginationButtonStyle),
              ...(page === '...' && { cursor: 'default', border: 'none', backgroundColor: 'transparent' }),
              ...(disabled && disabledButtonStyle),
            }}
            onClick={() => typeof page === 'number' && handlePageClick(page)}
            disabled={disabled || page === '...'}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        <button
          style={{
            ...paginationButtonStyle,
            ...((!canGoNext || disabled) && disabledButtonStyle),
          }}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={!canGoNext || disabled}
          aria-label="Next page"
        >
          ›
        </button>

        {showFirstLast && (
          <button
            style={{
              ...paginationButtonStyle,
              ...((!canGoNext || disabled) && disabledButtonStyle),
            }}
            onClick={() => handlePageClick(totalPages)}
            disabled={!canGoNext || disabled}
            aria-label="Last page"
          >
            ››
          </button>
        )}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
