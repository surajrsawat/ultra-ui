import { useCallback, useMemo, useState } from 'react';
import type { ColumnDef, RowModel } from './types';

export function useGrid<T extends Record<string, any> = Record<string, any>>(opts: {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId?: (row: T) => string;
}) {
  const { data, columns, getRowId = (row: any) => row.id ?? String(Math.random()) } = opts as any;

  const rows = useMemo<RowModel<T>[]>(() => {
    return data.map((item: T, index: number) => ({
      id: getRowId(item) ?? String(index),
      original: item,
    }));
  }, [data, getRowId]);

  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggleRow = useCallback((id: string) => {
    setSelected(current => ({ ...current, [id]: !current[id] }));
  }, []);

  const getRowProps = useCallback(
    (row: RowModel<T>) => {
      return {
        'data-rowid': row.id,
        onClick: () => toggleRow(row.id),
        role: 'row' as const,
      };
    },
    [toggleRow]
  );

  const getCellProps = useCallback((_row: RowModel<T>, column: ColumnDef<T>) => {
    return {
      role: 'cell' as const,
      'data-colid': column.id,
    };
  }, []);

  return {
    rows,
    columns,
    getRowProps,
    getCellProps,
    selected,
    toggleRow,
  };
}
