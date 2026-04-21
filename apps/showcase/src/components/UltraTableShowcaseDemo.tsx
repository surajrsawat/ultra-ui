import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Checkbox, Modal, Radio } from '@ultra-ui/primitives';
import { UltraTable, useUltraTable, type UltraTableColumn } from '@ultra-ui/ultra-table';
import {
  fetchPaginatedRows,
  getUltraTableSeedRows,
  loadColumnPreferences,
  saveColumnPreferences,
  saveOrUpdateRow,
  type UltraTableColumnPreference,
  type UltraTableDemoRow,
} from '../data/ultraTableServer';

interface UltraTableShowcaseDemoProps {
  feature: string;
}

type EditingMode = 'inline' | 'modal';

const defaultColumns: UltraTableColumn<UltraTableDemoRow>[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true, editable: true },
  { key: 'role', label: 'Role', sortable: true, editable: true },
  {
    key: 'active',
    label: 'Active',
    sortable: true,
    editable: true,
    renderCell: (value) => (value ? 'Yes' : 'No'),
  },
  { key: 'score', label: 'Score', sortable: true, editable: true },
  { key: 'notes', label: 'Notes', editable: true },
];

function toPreferences(columns: UltraTableColumn<UltraTableDemoRow>[]): UltraTableColumnPreference[] {
  return columns.map((column) => ({
    key: String(column.key),
    hidden: Boolean(column.hidden),
  }));
}

function mergeColumnsWithPreferences(
  columns: UltraTableColumn<UltraTableDemoRow>[],
  preferences: UltraTableColumnPreference[]
): UltraTableColumn<UltraTableDemoRow>[] {
  const preferenceByKey = new Map(preferences.map((preference) => [preference.key, preference]));
  return columns.map((column) => ({
    ...column,
    hidden: preferenceByKey.get(String(column.key))?.hidden ?? column.hidden,
  }));
}

const UltraTableShowcaseDemo: React.FC<UltraTableShowcaseDemoProps> = ({ feature }) => {
  const [clientRows, setClientRows] = useState<UltraTableDemoRow[]>(() => getUltraTableSeedRows());
  const [rows, setRows] = useState<UltraTableDemoRow[]>(() => getUltraTableSeedRows());
  const [serverMode, setServerMode] = useState(false);
  const [serverTotal, setServerTotal] = useState(rows.length);
  const [serverPage, setServerPage] = useState(1);
  const [serverPageSize, setServerPageSize] = useState(5);
  const [editingMode, setEditingMode] = useState<EditingMode>('inline');
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [draft, setDraft] = useState<UltraTableDemoRow | null>(null);
  const [saveStatus, setSaveStatus] = useState('Idle');
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingServerPage, setIsFetchingServerPage] = useState(false);

  const table = useUltraTable<UltraTableDemoRow>({
    columns: defaultColumns,
    rows,
    pageSize: serverMode ? serverPageSize : 5,
    getRowKey: (row) => row.id,
  });

  const {
    setRows: setTableRows,
    setColumns: setTableColumns,
    setPage: setTablePage,
    setPageSize: setTablePageSize,
    sortBy,
    updateRow,
    reorderColumn,
    toggleColumnVisibility,
    toggleRowSelection,
    toggleAllRowsSelection,
    clearRowSelection,
  } = table;

  useEffect(() => {
    setTableRows(rows);
  }, [rows, setTableRows]);

  useEffect(() => {
    let isCancelled = false;

    const applyPreferences = async () => {
      const preferences = await loadColumnPreferences();
      if (isCancelled) {
        return;
      }

      setTableColumns(mergeColumnsWithPreferences(defaultColumns, preferences));
    };

    void applyPreferences();

    return () => {
      isCancelled = true;
    };
  }, [setTableColumns]);

  useEffect(() => {
    if (!serverMode) {
      setRows(clientRows);
      setServerTotal(clientRows.length);
      setTablePageSize(5);
      return;
    }

    let isCancelled = false;
    const loadServerPage = async () => {
      setIsFetchingServerPage(true);
      const response = await fetchPaginatedRows({ page: serverPage, pageSize: serverPageSize });

      if (isCancelled) {
        return;
      }

      setRows(response.rows);
      setServerTotal(response.total);
      setTablePageSize(serverPageSize);
      setTablePage(1);
      setIsFetchingServerPage(false);
    };

    void loadServerPage();

    return () => {
      isCancelled = true;
    };
  }, [clientRows, serverMode, serverPage, serverPageSize, setTablePage, setTablePageSize]);

  const activePage = serverMode ? serverPage : table.state.pagination.page;
  const activePageSize = serverMode ? serverPageSize : table.state.pagination.pageSize;
  const activeTotal = serverMode ? serverTotal : table.state.pagination.total;
  const totalPages = Math.max(1, Math.ceil(activeTotal / activePageSize));

  const visibleRows = serverMode ? table.state.rows : table.pagedRows;

  const editingRow = useMemo(
    () => visibleRows.find((row) => row.id === editingRowId) ?? null,
    [visibleRows, editingRowId]
  );

  const applyDraftToRow = (patch: Partial<UltraTableDemoRow>) => {
    if (!editingRow && !draft) {
      return;
    }

    const base = draft ?? editingRow;
    if (!base) {
      return;
    }

    const nextDraft = { ...base, ...patch };
    setDraft(nextDraft);

    if (editingMode === 'inline') {
      const rowIndex = visibleRows.findIndex((row) => row.id === nextDraft.id);
      if (rowIndex !== -1) {
        updateRow(rowIndex, patch);
      }
    }
  };

  const beginEdit = (row: UltraTableDemoRow) => {
    setEditingRowId(row.id);
    setDraft({ ...row });
  };

  const finishSave = async () => {
    if (!draft) {
      return;
    }

    setIsSaving(true);
    setSaveStatus('Saving...');

    try {
      if (serverMode) {
        await saveOrUpdateRow(draft);
        const response = await fetchPaginatedRows({ page: serverPage, pageSize: serverPageSize });
        setRows(response.rows);
        setServerTotal(response.total);
        setSaveStatus('Saved to mock server');
      } else {
        setClientRows((currentRows) =>
          currentRows.map((row) => (row.id === draft.id ? { ...draft } : row))
        );
        setSaveStatus('Saved locally');
      }
    } catch (error) {
      setSaveStatus('Save failed');
      throw error;
    } finally {
      setIsSaving(false);
      setEditingRowId(null);
      setDraft(null);
    }
  };

  const addRow = () => {
    const nextId = clientRows.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
    const newRow: UltraTableDemoRow = {
      id: nextId,
      name: `New Member ${nextId}`,
      role: 'Engineer',
      active: true,
      score: 70,
      notes: 'Newly added row.',
    };

    setClientRows((currentRows) => [newRow, ...currentRows]);
  };

  const removeLastRow = () => {
    setClientRows((currentRows) => currentRows.slice(0, -1));
  };

  const persistPreferences = async () => {
    setSaveStatus('Saving column preferences...');
    await saveColumnPreferences(toPreferences(table.state.columns));
    setSaveStatus('Column preferences saved');
  };

  const restorePreferences = async () => {
    setSaveStatus('Loading column preferences...');
    const preferences = await loadColumnPreferences();
    setTableColumns(mergeColumnsWithPreferences(defaultColumns, preferences));
    setSaveStatus('Column preferences restored');
  };

  const handlePageChange = (nextPage: number) => {
    if (serverMode) {
      setServerPage(Math.min(Math.max(nextPage, 1), totalPages));
      return;
    }

    setTablePage(nextPage);
  };

  const renderSharedTable = () => (
    <UltraTable
      columns={table.state.columns}
      rows={visibleRows}
      onSort={(columnKey) => sortBy(columnKey)}
      getRowKey={(row) => row.id}
      enableRowSelection
      selectedRowKeys={table.state.rowSelection}
      onRowSelectionChange={(rowKey) => toggleRowSelection(rowKey)}
      onAllRowsSelectionChange={(rowKeys) => toggleAllRowsSelection(rowKeys)}
    />
  );

  const renderEditingPanel = () => {
    if (!editingRow && !draft) {
      return <p className="demo-feedback">Select a row to edit.</p>;
    }

    const activeDraft = draft ?? editingRow;
    if (!activeDraft) {
      return null;
    }

    return (
      <Card title="Row Editor">
        <div className="demo-stack">
          <label>
            Name
            <input
              className="headless-input"
              value={activeDraft.name}
              onChange={(event) => applyDraftToRow({ name: event.target.value })}
            />
          </label>
          <label>
            Role
            <select
              className="headless-input"
              value={activeDraft.role}
              onChange={(event) => applyDraftToRow({ role: event.target.value })}
            >
              <option>Engineer</option>
              <option>Designer</option>
              <option>PM</option>
              <option>QA</option>
              <option>Support</option>
            </select>
          </label>
          <Checkbox
            checked={activeDraft.active}
            onChange={(checked) => applyDraftToRow({ active: checked })}
            label="Active"
          />
          <label>
            Score
            <input
              className="headless-input"
              type="number"
              value={activeDraft.score}
              onChange={(event) => applyDraftToRow({ score: Number(event.target.value) || 0 })}
            />
          </label>
          <label>
            Notes
            <input
              className="headless-input"
              value={activeDraft.notes}
              onChange={(event) => applyDraftToRow({ notes: event.target.value })}
            />
          </label>
        </div>
      </Card>
    );
  };

  switch (feature) {
    case 'Layout':
      return (
        <div className="demo-container">
          <p className="demo-feedback">Shared state model drives layout + rows + columns + pagination + save status.</p>
          {renderSharedTable()}
        </div>
      );
    case 'Columns':
      return (
        <div className="demo-container">
          <div className="demo-grid">
            {table.state.columns.map((column) => (
              <Button
                key={String(column.key)}
                variant="outline"
                onClick={() => toggleColumnVisibility(column.key)}
              >
                {column.hidden ? 'Show' : 'Hide'} {column.label}
              </Button>
            ))}
          </div>
          {renderSharedTable()}
        </div>
      );
    case 'Rows':
      return (
        <div className="demo-container">
          <div className="demo-grid">
            <Button onClick={addRow}>Add Row</Button>
            <Button
              variant="outline"
              onClick={removeLastRow}
              disabled={clientRows.length === 0}
              aria-label="Remove last row from table"
            >
              Remove Last
            </Button>
          </div>
          <p className="demo-feedback">Total rows in model: {clientRows.length}</p>
          {renderSharedTable()}
        </div>
      );
    case 'Editing':
      return (
        <div className="demo-container">
          <div className="demo-grid">
            {visibleRows.map((row) => (
              <Button key={row.id} variant="outline" onClick={() => beginEdit(row)}>
                Edit Row {row.id}
              </Button>
            ))}
          </div>
          <div className="demo-group">
            <label className="demo-label">
              <Radio
                name="editing-mode"
                value="inline"
                checked={editingMode === 'inline'}
                onChange={() => setEditingMode('inline')}
                label="Inline"
              />
            </label>
            <label className="demo-label">
              <Radio
                name="editing-mode"
                value="modal"
                checked={editingMode === 'modal'}
                onChange={() => setEditingMode('modal')}
                label="Modal"
              />
            </label>
          </div>
          {editingMode === 'inline' && renderEditingPanel()}
          {editingMode === 'modal' && (
            <Modal open={Boolean(editingRowId)} onClose={() => setEditingRowId(null)} aria-label="Modal row editor">
              <div className="modal-content">
                <h2>Modal Row Editor</h2>
                {renderEditingPanel()}
                <Button onClick={finishSave} disabled={isSaving}>Save</Button>
              </div>
            </Modal>
          )}
          {renderSharedTable()}
        </div>
      );
    case 'Row Selection': {
      const visibleRowIds = visibleRows.map((row) => row.id);
      const selectedVisibleCount = visibleRowIds.filter((rowId) => table.state.rowSelection.has(rowId)).length;
      return (
        <div className="demo-container">
          <div className="demo-grid">
            <Button
              variant="outline"
              onClick={() => toggleAllRowsSelection(visibleRowIds)}
              disabled={visibleRows.length === 0}
            >
              {selectedVisibleCount === visibleRows.length && visibleRows.length > 0 ? 'Unselect Visible' : 'Select Visible'}
            </Button>
            <Button variant="outline" onClick={clearRowSelection} disabled={table.state.rowSelection.size === 0}>
              Clear Selection
            </Button>
          </div>
          <p className="demo-feedback">
            Selected rows (all pages): {table.state.rowSelection.size} | Selected on this view: {selectedVisibleCount}
          </p>
          {renderSharedTable()}
        </div>
      );
    }
    case 'Form Components':
      return (
        <div className="demo-container">
          <p className="demo-feedback">Uses input/select/checkbox controls to compose cell editor forms.</p>
          {renderEditingPanel()}
          {renderSharedTable()}
        </div>
      );
    case 'Save Flow':
      return (
        <div className="demo-container">
          <div className="demo-grid">
            <Button onClick={() => beginEdit(visibleRows[0]!)} disabled={visibleRows.length === 0}>
              Edit First Row
            </Button>
            <Button variant="outline" onClick={finishSave} disabled={!draft || isSaving}>Save Draft</Button>
          </div>
          <p className="demo-feedback">{saveStatus}</p>
          {renderEditingPanel()}
        </div>
      );
    case 'Column Management':
      return (
        <div className="demo-container">
          <div className="demo-grid">
            <Button variant="outline" onClick={() => reorderColumn('name', 0)}>Move Name First</Button>
            <Button variant="outline" onClick={() => reorderColumn('score', 1)}>Move Score Second</Button>
            <Button variant="outline" onClick={() => toggleColumnVisibility('notes')}>Toggle Notes</Button>
            <Button onClick={persistPreferences}>Save Prefs</Button>
            <Button variant="outline" onClick={restorePreferences}>Load Prefs</Button>
          </div>
          <p className="demo-feedback">{saveStatus}</p>
          {renderSharedTable()}
        </div>
      );
    case 'Pagination':
      return (
        <div className="demo-container">
          <div className="demo-grid">
            <Button variant={serverMode ? 'secondary' : 'primary'} onClick={() => setServerMode(false)}>
              Client Mode
            </Button>
            <Button variant={serverMode ? 'primary' : 'secondary'} onClick={() => setServerMode(true)}>
              Server Mode
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const nextSize = activePageSize === 5 ? 3 : 5;
                if (serverMode) {
                  setServerPageSize(nextSize);
                  setServerPage(1);
                } else {
                  setTablePageSize(nextSize);
                  setTablePage(1);
                }
              }}
            >
              Toggle Page Size ({activePageSize})
            </Button>
          </div>
          <div className="demo-grid">
            <Button variant="outline" onClick={() => handlePageChange(activePage - 1)} disabled={activePage <= 1}>Previous</Button>
            <Button variant="outline" onClick={() => handlePageChange(activePage + 1)} disabled={activePage >= totalPages}>Next</Button>
          </div>
          <p className="demo-feedback">
            Mode: {serverMode ? 'Server' : 'Client'} | Page {activePage}/{totalPages} | Total {activeTotal}
            {serverMode && isFetchingServerPage ? ' | Loading page...' : ''}
          </p>
          {renderSharedTable()}
        </div>
      );
    default:
      return <p>No interactive demo available for this item.</p>;
  }
};

export default UltraTableShowcaseDemo;
