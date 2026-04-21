import React, { useEffect, useRef } from 'react';
import type { UltraTableColumn, UltraTableRowKey } from '../../types';

export interface UltraTableProps<Row extends object> {
  columns: UltraTableColumn<Row>[];
  rows: Row[];
  onSort?: (columnKey: keyof Row) => void;
  getRowKey?: (row: Row, index: number) => string | number;
  enableRowSelection?: boolean;
  selectedRowKeys?: Set<UltraTableRowKey>;
  onRowSelectionChange?: (rowKey: UltraTableRowKey) => void;
  onAllRowsSelectionChange?: (rowKeys: UltraTableRowKey[]) => void;
}

export function UltraTable<Row extends object>({
  columns,
  rows,
  onSort,
  getRowKey,
  enableRowSelection = false,
  selectedRowKeys,
  onRowSelectionChange,
  onAllRowsSelectionChange,
}: UltraTableProps<Row>) {
  const visibleColumns = columns.filter((column) => !column.hidden);
  const rowKeys = rows.map((row, rowIndex) => (getRowKey ? getRowKey(row, rowIndex) : rowIndex));
  const selectedCount = rowKeys.filter((rowKey) => selectedRowKeys?.has(rowKey)).length;
  const allRowsSelected = rowKeys.length > 0 && selectedCount === rowKeys.length;
  const someRowsSelected = selectedCount > 0 && !allRowsSelected;
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!enableRowSelection || !selectAllRef.current) {
      return;
    }
    selectAllRef.current.indeterminate = someRowsSelected;
  }, [enableRowSelection, someRowsSelected]);

  return (
    <table className="ultra-table props-table">
      <thead>
        <tr>
          {enableRowSelection && (
            <th>
              <input
                ref={selectAllRef}
                type="checkbox"
                aria-label="Select all rows"
                checked={allRowsSelected}
                onChange={() => onAllRowsSelectionChange?.(rowKeys)}
              />
            </th>
          )}
          {visibleColumns.map((column) => (
            <th key={String(column.key)}>
              {column.sortable && onSort ? (
                <button type="button" className="demo-button" onClick={() => onSort(column.key)}>{column.label}</button>
              ) : (
                column.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowKeys[rowIndex]}>
            {enableRowSelection && (
              <td>
                <input
                  type="checkbox"
                  aria-label={`Select row ${rowIndex + 1}`}
                  checked={Boolean(selectedRowKeys?.has(rowKeys[rowIndex]))}
                  onChange={() => onRowSelectionChange?.(rowKeys[rowIndex])}
                />
              </td>
            )}
            {visibleColumns.map((column) => {
              const value = row[column.key];
              return (
                <td key={String(column.key)}>
                  {column.renderCell ? column.renderCell(value, row) : String(value ?? '')}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
