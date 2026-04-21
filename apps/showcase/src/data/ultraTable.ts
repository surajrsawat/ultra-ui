export interface ShowcaseDocItem {
  name: string;
  description: string;
}

export const ultraTableDocs: ShowcaseDocItem[] = [
  { name: 'Layout', description: 'Defines the table shell, summary header, and base rendering model.' },
  { name: 'Columns', description: 'Declares typed column schema and display configuration.' },
  { name: 'Rows', description: 'Manages row collection lifecycle, insertion, and deletion flows.' },
  { name: 'Editing', description: 'Supports inline and modal row editing with shared draft state.' },
  { name: 'Form Components', description: 'Embeds form controls in table cells for rich editing experiences.' },
  { name: 'Save Flow', description: 'Coordinates dirty-row tracking, async save state, and optimistic updates.' },
  { name: 'Column Management', description: 'Handles hide/show/reorder and preference persistence for columns.' },
  { name: 'Pagination', description: 'Provides client/server pagination mode toggles and navigation state.' },
];
