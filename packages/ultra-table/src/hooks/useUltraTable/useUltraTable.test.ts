import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useUltraTable } from '../../..';

interface TableRow {
  id: number;
  name: string;
  status: string;
}

describe('useUltraTable', () => {
  it('supports sorting and pagination transitions', () => {
    const { result } = renderHook(() =>
      useUltraTable<TableRow>({
        columns: [
          { key: 'id', label: 'ID', sortable: true },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'status', label: 'Status' },
        ],
        rows: [
          { id: 2, name: 'Beta', status: 'draft' },
          { id: 1, name: 'Alpha', status: 'active' },
          { id: 3, name: 'Gamma', status: 'active' },
        ],
        pageSize: 2,
      })
    );

    act(() => {
      result.current.sortBy('id');
    });

    expect(result.current.pagedRows[0].id).toBe(1);

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.state.pagination.page).toBe(2);
    expect(result.current.pagedRows).toHaveLength(1);
  });

  it('supports column visibility and reorder operations', () => {
    const { result } = renderHook(() =>
      useUltraTable<TableRow>({
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'status', label: 'Status' },
        ],
        rows: [{ id: 1, name: 'Alpha', status: 'active' }],
      })
    );

    act(() => {
      result.current.toggleColumnVisibility('status');
    });

    expect(result.current.visibleColumns.map((column) => column.key)).toEqual(['id', 'name']);

    act(() => {
      result.current.reorderColumn('name', 0);
    });

    expect(result.current.state.columns.map((column) => column.key)).toEqual(['name', 'id', 'status']);
  });

  it('supports row updates and total recalculation', () => {
    const { result } = renderHook(() =>
      useUltraTable<TableRow>({
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'status', label: 'Status' },
        ],
        rows: [
          { id: 1, name: 'Alpha', status: 'active' },
          { id: 2, name: 'Beta', status: 'draft' },
        ],
      })
    );

    act(() => {
      result.current.updateRow(1, { status: 'archived' });
    });

    expect(result.current.state.rows[1].status).toBe('archived');

    act(() => {
      result.current.setRows([{ id: 1, name: 'Alpha', status: 'active' }]);
    });

    expect(result.current.state.pagination.total).toBe(1);
  });
});
