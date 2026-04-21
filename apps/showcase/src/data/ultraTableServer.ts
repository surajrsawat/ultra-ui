export interface UltraTableDemoRow {
  id: number;
  name: string;
  role: string;
  active: boolean;
  score: number;
  notes: string;
}

export interface UltraTableColumnPreference {
  key: string;
  hidden: boolean;
}

interface FetchRowsParams {
  page: number;
  pageSize: number;
}

interface FetchRowsResult {
  rows: UltraTableDemoRow[];
  total: number;
}

const mockDelay = (duration = 250) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

const seedRows: UltraTableDemoRow[] = [
  { id: 1, name: 'Ava Patel', role: 'Engineer', active: true, score: 92, notes: 'Owns table layout.' },
  { id: 2, name: 'Leo Kim', role: 'Designer', active: true, score: 85, notes: 'Maintains columns spec.' },
  { id: 3, name: 'Mia Carter', role: 'PM', active: false, score: 73, notes: 'Tracks save workflow.' },
  { id: 4, name: 'Noah Brown', role: 'Engineer', active: true, score: 88, notes: 'Supports editing mode.' },
  { id: 5, name: 'Ivy Chen', role: 'QA', active: true, score: 96, notes: 'Covers row validation.' },
  { id: 6, name: 'Ethan Hall', role: 'Engineer', active: false, score: 67, notes: 'Pagination API checks.' },
  { id: 7, name: 'Zara Ali', role: 'Support', active: true, score: 81, notes: 'Improves form controls.' },
  { id: 8, name: 'Liam Gray', role: 'Engineer', active: true, score: 90, notes: 'Handles column reorder.' },
  { id: 9, name: 'Emma Diaz', role: 'PM', active: false, score: 79, notes: 'Coordinates release plan.' },
  { id: 10, name: 'Owen Fox', role: 'Engineer', active: true, score: 87, notes: 'Builds server simulation.' },
  { id: 11, name: 'Nina Reed', role: 'QA', active: true, score: 93, notes: 'Regression coverage lead.' },
  { id: 12, name: 'Caleb Stone', role: 'Designer', active: false, score: 75, notes: 'Docs consistency checks.' },
];

let serverRows: UltraTableDemoRow[] = [...seedRows];
let columnPreferences: UltraTableColumnPreference[] = [
  { key: 'id', hidden: false },
  { key: 'name', hidden: false },
  { key: 'role', hidden: false },
  { key: 'active', hidden: false },
  { key: 'score', hidden: false },
  { key: 'notes', hidden: false },
];

export function getUltraTableSeedRows(): UltraTableDemoRow[] {
  return [...seedRows];
}

export async function loadColumnPreferences(): Promise<UltraTableColumnPreference[]> {
  await mockDelay(180);
  return columnPreferences.map((preference) => ({ ...preference }));
}

export async function saveColumnPreferences(
  preferences: UltraTableColumnPreference[]
): Promise<UltraTableColumnPreference[]> {
  await mockDelay(220);
  columnPreferences = preferences.map((preference) => ({ ...preference }));
  return loadColumnPreferences();
}

export async function fetchPaginatedRows(params: FetchRowsParams): Promise<FetchRowsResult> {
  await mockDelay(260);
  const page = Math.max(1, params.page);
  const pageSize = Math.max(1, params.pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    rows: serverRows.slice(start, end).map((row) => ({ ...row })),
    total: serverRows.length,
  };
}

export async function saveOrUpdateRow(row: UltraTableDemoRow): Promise<UltraTableDemoRow> {
  await mockDelay(240);
  const existingIndex = serverRows.findIndex((candidate) => candidate.id === row.id);

  if (existingIndex === -1) {
    serverRows = [...serverRows, { ...row }];
  } else {
    const nextRows = [...serverRows];
    nextRows[existingIndex] = { ...row };
    serverRows = nextRows;
  }

  return { ...row };
}
