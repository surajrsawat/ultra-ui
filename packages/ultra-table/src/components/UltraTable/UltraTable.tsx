import React from 'react';
import type { UltraTableColumn } from '../../types';

export interface UltraTableProps<Row extends object> {
  columns: UltraTableColumn<Row>[];
  rows: Row[];
  onSort?: (columnKey: keyof Row) => void;
  getRowKey?: (row: Row, index: number) => string | number;
}

export function UltraTable<Row extends object>({
  columns,
  rows,
  onSort,
  getRowKey,
}: UltraTableProps<Row>) {
  const visibleColumns = columns.filter((column) => !column.hidden);

  return (
    <table className="ultra-table props-table">
      <thead>
        <tr>
          {visibleColumns.map((column) => (
            <th key={String(column.key)}>
              {column.sortable && onSort ? (
                <button className="demo-button" onClick={() => onSort(column.key)}>{column.label}</button>
              ) : (
                column.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}>
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
