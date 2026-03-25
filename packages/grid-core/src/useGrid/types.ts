import type { ReactNode } from 'react';

export type RowModel<T = any> = {
  id: string;
  original: T;
};

export type ColumnDef<T = any> = {
  id: string;
  header?: string;
  accessor?: (row: T) => any;
  width?: number;
  cell?: (value: any, row: T) => ReactNode;
};
