import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useGrid } from './index';

describe('useGrid', () => {
  const rows = [
    { id: 'row-1', name: 'Alpha' },
    { id: 'row-2', name: 'Beta' },
  ];

  const columns = [
    { id: 'name', header: 'Name', accessor: (row: { name: string }) => row.name },
  ];

  it('builds row models and row props from the public export', () => {
    const { result } = renderHook(() => useGrid({ data: rows, columns }));
    const firstRow = result.current.rows[0];
    const firstColumn = columns[0];

    expect(result.current.rows).toHaveLength(2);
    expect(firstRow?.id).toBe('row-1');

    if (!firstRow || !firstColumn) {
      throw new Error('Expected test data to contain a row and column.');
    }

    const rowProps = result.current.getRowProps(firstRow);
    const cellProps = result.current.getCellProps(firstRow, firstColumn);

    expect(rowProps['data-rowid']).toBe('row-1');
    expect(rowProps.role).toBe('row');
    expect(cellProps['data-colid']).toBe('name');
    expect(cellProps.role).toBe('cell');
  });

  it('tracks selected rows when toggled', () => {
    const { result } = renderHook(() => useGrid({ data: rows, columns }));

    act(() => {
      result.current.toggleRow('row-2');
    });

    expect(result.current.selected).toEqual({ 'row-2': true });

    act(() => {
      result.current.toggleRow('row-2');
    });

    expect(result.current.selected).toEqual({ 'row-2': false });
  });

  it('falls back to a generated row id when rows do not expose id', () => {
    const { result } = renderHook(() =>
      useGrid({
        data: [{ name: 'Generated' }],
        columns,
      })
    );

    expect(result.current.rows[0]?.id).toBeTypeOf('string');
    expect(result.current.rows[0]?.id.length).toBeGreaterThan(0);
  });
});
