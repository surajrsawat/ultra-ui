import { useMemo, useState, useCallback } from 'react';
import type { ColumnDef, RowModel } from './types';

export function useGrid<T extends Record<string, any> = Record<string, any>>(opts: {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId?: (row: T) => string;
}) {
  const { data, columns, getRowId = (r: any) => r.id ?? String(Math.random()) } = opts as any;

  const rows = useMemo<RowModel<T>[]>(() => {
    return data.map((d: T, i: number) => ({ id: getRowId(d) ?? String(i), original: d }));
  }, [data, getRowId]);

  // selection
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggleRow = useCallback((id: string) => {
    setSelected(s => ({ ...s, [id]: !s[id] }));
  }, []);

  const getRowProps = useCallback((row: RowModel<T>) => {
    return {
      'data-rowid': row.id,
      onClick: () => toggleRow(row.id),
      role: 'row' as const
    };
  }, [toggleRow]);

  const getCellProps = useCallback((row: RowModel<T>, col: ColumnDef<T>) => {
    return {
      role: 'cell' as const,
      'data-colid': col.id
    };
  }, []);

  return {
    rows,
    columns,
    getRowProps,
    getCellProps,
    selected,
    toggleRow
  };
}