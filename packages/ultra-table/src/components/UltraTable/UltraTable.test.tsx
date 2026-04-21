import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { UltraTable } from './UltraTable';

interface TableRow {
  id: number;
  name: string;
}

describe('UltraTable', () => {
  it('renders row and header checkboxes when row selection is enabled', () => {
    render(
      <UltraTable<TableRow>
        columns={[{ key: 'name', label: 'Name' }]}
        rows={[
          { id: 1, name: 'Alpha' },
          { id: 2, name: 'Beta' },
        ]}
        getRowKey={(row) => row.id}
        enableRowSelection
        selectedRowKeys={new Set([1])}
      />
    );

    expect(screen.getByLabelText('Select all rows')).toBeInTheDocument();
    expect(screen.getByLabelText('Select row 1')).toBeChecked();
    expect(screen.getByLabelText('Select row 2')).not.toBeChecked();
  });

  it('notifies selection handlers for row and select-all toggles', () => {
    const onRowSelectionChange = vi.fn();
    const onAllRowsSelectionChange = vi.fn();

    render(
      <UltraTable<TableRow>
        columns={[{ key: 'name', label: 'Name' }]}
        rows={[
          { id: 1, name: 'Alpha' },
          { id: 2, name: 'Beta' },
        ]}
        getRowKey={(row) => row.id}
        enableRowSelection
        onRowSelectionChange={onRowSelectionChange}
        onAllRowsSelectionChange={onAllRowsSelectionChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Select row 1'));
    fireEvent.click(screen.getByLabelText('Select all rows'));

    expect(onRowSelectionChange).toHaveBeenCalledWith(1);
    expect(onAllRowsSelectionChange).toHaveBeenCalledWith([1, 2]);
  });
});
