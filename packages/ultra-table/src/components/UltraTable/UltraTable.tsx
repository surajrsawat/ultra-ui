import React from 'react';
import type { UltraTableCellValue, UltraTableColumn } from '../../types';

export interface UltraTableProps<Row extends Record<string, UltraTableCellValue>> {
  columns: UltraTableColumn<Row>[];
  rows: Row[];
  onSort?: (columnKey: keyof Row) => void;
}

export function UltraTable<Row extends Record<string, UltraTableCellValue>>({
  columns,
  rows,
  onSort,
}: UltraTableProps<Row>) {
  const visibleColumns = columns.filter((column) => !column.hidden);

  return (
    <table className="props-table">
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
          <tr key={rowIndex}>
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
