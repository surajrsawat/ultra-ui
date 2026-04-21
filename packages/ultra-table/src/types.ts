import type { ReactNode } from 'react';

export type UltraTableCellValue = string | number | boolean | null;

export type UltraTableSortDirection = 'asc' | 'desc';

export interface UltraTableColumn<Row extends Record<string, UltraTableCellValue>> {
  key: keyof Row;
  label: string;
  sortable?: boolean;
  hidden?: boolean;
  width?: number;
  editable?: boolean;
  renderCell?: (value: UltraTableCellValue, row: Row) => ReactNode;
}

export interface UltraTablePaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface UltraTableSortState<Row extends Record<string, UltraTableCellValue>> {
  key: keyof Row;
  direction: UltraTableSortDirection;
}

export interface UltraTableState<Row extends Record<string, UltraTableCellValue>> {
  columns: UltraTableColumn<Row>[];
  rows: Row[];
  sort?: UltraTableSortState<Row>;
  pagination: UltraTablePaginationState;
}

export interface UltraTableOptions<Row extends Record<string, UltraTableCellValue>> {
  columns: UltraTableColumn<Row>[];
  rows: Row[];
  pageSize?: number;
}

export interface UltraTableApi<Row extends Record<string, UltraTableCellValue>> {
  state: UltraTableState<Row>;
  visibleColumns: UltraTableColumn<Row>[];
  pagedRows: Row[];
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  sortBy: (columnKey: keyof Row) => void;
  toggleColumnVisibility: (columnKey: keyof Row) => void;
  reorderColumn: (columnKey: keyof Row, targetIndex: number) => void;
  updateRow: (rowIndex: number, patch: Partial<Row>) => void;
  setRows: (rows: Row[]) => void;
  setColumns: (columns: UltraTableColumn<Row>[]) => void;
}
