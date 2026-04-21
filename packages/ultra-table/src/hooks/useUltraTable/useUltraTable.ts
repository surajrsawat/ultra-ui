import { useCallback, useMemo, useState } from 'react';
import type {
  UltraTableApi,
  UltraTableColumn,
  UltraTableOptions,
  UltraTableRowKey,
  UltraTableSortState,
  UltraTableState,
} from '../../types';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function sortRows<Row extends object>(
  rows: Row[],
  sort?: UltraTableSortState<Row>
): Row[] {
  if (!sort) {
    return rows;
  }

  const multiplier = sort.direction === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const left = a[sort.key] as unknown;
    const right = b[sort.key] as unknown;

    if (left === right) {
      return 0;
    }

    if (left === null || left === undefined) {
      return 1;
    }

    if (right === null || right === undefined) {
      return -1;
    }

    if (typeof left === 'number' && typeof right === 'number') {
      return (left - right) * multiplier;
    }

    return String(left).localeCompare(String(right)) * multiplier;
  });
}

function getRowKeys<Row extends object>(
  rows: Row[],
  getRowKey?: (row: Row, index: number) => UltraTableRowKey
): UltraTableRowKey[] {
  return rows.map((row, index) => (getRowKey ? getRowKey(row, index) : index));
}

export function useUltraTable<Row extends object>(
  options: UltraTableOptions<Row>
): UltraTableApi<Row> {
  const { columns: initialColumns, rows: initialRows, pageSize = 5, getRowKey } = options;

  const [state, setState] = useState<UltraTableState<Row>>({
    columns: initialColumns,
    rows: initialRows,
    pagination: {
      page: 1,
      pageSize,
      total: initialRows.length,
    },
    rowSelection: new Set<UltraTableRowKey>(),
  });

  const sortedRows = useMemo(() => sortRows(state.rows, state.sort), [state.rows, state.sort]);

  const totalPages = Math.max(1, Math.ceil(state.pagination.total / state.pagination.pageSize));

  const pagedRows = useMemo(() => {
    const start = (state.pagination.page - 1) * state.pagination.pageSize;
    const end = start + state.pagination.pageSize;
    return sortedRows.slice(start, end);
  }, [sortedRows, state.pagination.page, state.pagination.pageSize]);

  const visibleColumns = useMemo(
    () => state.columns.filter((column) => !column.hidden),
    [state.columns]
  );

  const setPage = useCallback((page: number) => {
    setState((current) => ({
      ...current,
      pagination: {
        ...current.pagination,
        page: clamp(page, 1, Math.max(1, Math.ceil(current.pagination.total / current.pagination.pageSize))),
      },
    }));
  }, []);

  const setPageSize = useCallback((nextPageSize: number) => {
    setState((current) => {
      const pageSizeValue = Math.max(1, nextPageSize);
      const nextTotalPages = Math.max(1, Math.ceil(current.pagination.total / pageSizeValue));
      return {
        ...current,
        pagination: {
          ...current.pagination,
          pageSize: pageSizeValue,
          page: clamp(current.pagination.page, 1, nextTotalPages),
        },
      };
    });
  }, []);

  const sortBy = useCallback((columnKey: keyof Row) => {
    setState((current) => {
      const nextDirection =
        current.sort?.key === columnKey && current.sort.direction === 'asc' ? 'desc' : 'asc';
      return {
        ...current,
        sort: { key: columnKey, direction: nextDirection },
      };
    });
  }, []);

  const toggleColumnVisibility = useCallback((columnKey: keyof Row) => {
    setState((current) => ({
      ...current,
      columns: current.columns.map((column) =>
        column.key === columnKey ? { ...column, hidden: !column.hidden } : column
      ),
    }));
  }, []);

  const reorderColumn = useCallback((columnKey: keyof Row, targetIndex: number) => {
    setState((current) => {
      const sourceIndex = current.columns.findIndex((column) => column.key === columnKey);
      if (sourceIndex === -1 || sourceIndex === targetIndex) {
        return current;
      }

      const nextColumns = [...current.columns];
      const [item] = nextColumns.splice(sourceIndex, 1);
      // Allow insertion at `nextColumns.length` so callers can explicitly append.
      const safeTarget = clamp(targetIndex, 0, nextColumns.length);
      nextColumns.splice(safeTarget, 0, item);

      return {
        ...current,
        columns: nextColumns,
      };
    });
  }, []);

  const updateRow = useCallback((rowIndex: number, patch: Partial<Row>) => {
    setState((current) => {
      if (rowIndex < 0 || rowIndex >= current.rows.length) {
        return current;
      }

      const nextRows = [...current.rows];
      nextRows[rowIndex] = { ...nextRows[rowIndex], ...patch };

      return {
        ...current,
        rows: nextRows,
      };
    });
  }, []);

  const setRows = useCallback((rows: Row[]) => {
    setState((current) => ({
      ...current,
      rows,
      pagination: {
        ...current.pagination,
        total: rows.length,
        page: clamp(current.pagination.page, 1, Math.max(1, Math.ceil(rows.length / current.pagination.pageSize))),
      },
      rowSelection: new Set(
        [...current.rowSelection].filter((key) => getRowKeys(rows, getRowKey).includes(key))
      ),
    }));
  }, [getRowKey]);

  const setColumns = useCallback((columns: UltraTableColumn<Row>[]) => {
    setState((current) => ({
      ...current,
      columns,
    }));
  }, []);

  const isRowSelected = useCallback(
    (rowKey: UltraTableRowKey) => state.rowSelection.has(rowKey),
    [state.rowSelection]
  );

  const toggleRowSelection = useCallback((rowKey: UltraTableRowKey) => {
    setState((current) => {
      const nextRowSelection = new Set(current.rowSelection);
      if (nextRowSelection.has(rowKey)) {
        nextRowSelection.delete(rowKey);
      } else {
        nextRowSelection.add(rowKey);
      }
      return {
        ...current,
        rowSelection: nextRowSelection,
      };
    });
  }, []);

  const toggleAllRowsSelection = useCallback((rowKeys: UltraTableRowKey[]) => {
    setState((current) => {
      const nextRowSelection = new Set(current.rowSelection);
      const allSelected = rowKeys.length > 0 && rowKeys.every((key) => nextRowSelection.has(key));

      if (allSelected) {
        rowKeys.forEach((key) => nextRowSelection.delete(key));
      } else {
        rowKeys.forEach((key) => nextRowSelection.add(key));
      }

      return {
        ...current,
        rowSelection: nextRowSelection,
      };
    });
  }, []);

  const clearRowSelection = useCallback(() => {
    setState((current) => ({
      ...current,
      rowSelection: new Set<UltraTableRowKey>(),
    }));
  }, []);

  return {
    state: {
      ...state,
      pagination: {
        ...state.pagination,
        page: clamp(state.pagination.page, 1, totalPages),
      },
    },
    visibleColumns,
    pagedRows,
    setPage,
    setPageSize,
    sortBy,
    toggleColumnVisibility,
    reorderColumn,
    updateRow,
    setRows,
    setColumns,
    isRowSelected,
    toggleRowSelection,
    toggleAllRowsSelection,
    clearRowSelection,
  };
}
