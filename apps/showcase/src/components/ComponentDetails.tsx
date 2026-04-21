import React, { useState } from 'react';
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Modal,
  Radio,
  Switch,
} from '@ultra-ui/primitives';
import {
  useAccordion as useAccordionHook,
  useCombobox,
  useControllableState,
  useDisclosure,
  useListbox,
  useMenu,
  useModal as useModalHook,
  usePagination,
  useSelect,
  useTabs,
  useTypeahead,
  useToggle,
} from '@ultra-ui/headless';
import { ultraTableDocs } from '../data/ultraTable';
import UltraTableShowcaseDemo from './UltraTableShowcaseDemo';
import './ComponentDetails.css';

interface ComponentDetailsProps {
  packageId: string;
  componentName: string;
}

interface PropInfo {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
}

interface ComponentMeta {
  description: string;
  status: 'stable' | 'experimental';
  example?: string;
  props?: PropInfo[];
}

const packageAliases: Record<string, string> = {
  '@ultra-ui/primitives': '@ultra-ui/Primitives',
  '@ultra-ui/headless': '@ultra-ui/Headless',
  '@ultra-ui/grid-core': '@ultra-ui/Grid-Core',
  '@ultra-ui/tailwind-wrappers': '@ultra-ui/Tailwind-Wrappers',
  '@ultra-ui/ultra-table': '@ultra-ui/Ultra-Table',
};

const ultraTableDescriptions: Record<string, string> = Object.fromEntries(
  ultraTableDocs.map((item) => [item.name, item.description])
);
const packagesWithInteractiveDemos = [
  '@ultra-ui/Primitives',
  '@ultra-ui/Headless',
  '@ultra-ui/Grid-Core',
  '@ultra-ui/Ultra-Table',
];

const componentInfo: Record<string, Record<string, ComponentMeta>> = {
  '@ultra-ui/Primitives': {
    Button: {
      description: 'Interactive button component with multiple variants and sizes.',
      props: [
        { name: 'variant', type: 'primary | secondary | outline | ghost | danger', default: 'primary' },
        { name: 'size', type: 'sm | md | lg', default: 'md' },
        { name: 'disabled', type: 'boolean', default: 'false' },
        { name: 'onClick', type: 'function' },
      ],
      example: '<Button variant="primary">Click me</Button>',
      status: 'stable',
    },
    Checkbox: {
      description: 'Checkbox input control for multiple selections.',
      props: [
        { name: 'checked', type: 'boolean', default: 'false' },
        { name: 'label', type: 'string' },
        { name: 'onChange', type: '(checked: boolean) => void' },
      ],
      example: '<Checkbox checked={checked} onChange={setChecked} label="Accept terms" />',
      status: 'stable',
    },
    Radio: {
      description: 'Radio button for single-choice selections.',
      props: [
        { name: 'name', type: 'string', required: true },
        { name: 'value', type: 'string | number' },
        { name: 'checked', type: 'boolean', default: 'false' },
        { name: 'onChange', type: '(value: string | number) => void' },
      ],
      example: '<Radio name="size" value="md" checked={value === "md"} onChange={setValue} />',
      status: 'stable',
    },
    Switch: {
      description: 'Toggle switch for boolean state.',
      props: [
        { name: 'checked', type: 'boolean', default: 'false' },
        { name: 'color', type: 'primary | secondary | success | danger', default: 'primary' },
        { name: 'onChange', type: '(checked: boolean) => void' },
      ],
      example: '<Switch checked={enabled} onChange={setEnabled} />',
      status: 'stable',
    },
    Card: {
      description: 'Container component for grouping related content.',
      props: [
        { name: 'title', type: 'string' },
        { name: 'children', type: 'ReactNode', required: true },
      ],
      example: '<Card title="Card Title">Content</Card>',
      status: 'stable',
    },
    Badge: {
      description: 'Badge for counts, status, or notification indicators.',
      props: [
        { name: 'content', type: 'string | number', required: true },
        { name: 'color', type: 'primary | secondary | success | warning | error', default: 'primary' },
        { name: 'variant', type: 'standard | dot', default: 'standard' },
      ],
      example: '<Badge content={5} color="success"><span>Inbox</span></Badge>',
      status: 'stable',
    },
    Chip: {
      description: 'Compact component for tags and removable selections.',
      props: [
        { name: 'label', type: 'string', required: true },
        { name: 'onDelete', type: '() => void' },
      ],
      example: '<Chip label="React" onDelete={handleDelete} />',
      status: 'stable',
    },
    Alert: {
      description: 'Alert banner for contextual feedback and status messages.',
      props: [
        { name: 'variant', type: 'success | warning | error | info', default: 'info' },
        { name: 'children', type: 'ReactNode', required: true },
      ],
      example: '<Alert variant="success">Saved successfully.</Alert>',
      status: 'stable',
    },
    Modal: {
      description: 'Dialog modal for focused flows and confirmations.',
      props: [
        { name: 'open', type: 'boolean', required: true },
        { name: 'onClose', type: '() => void', required: true },
        { name: 'children', type: 'ReactNode', required: true },
      ],
      example: '<Modal open={isOpen} onClose={closeModal}>Content</Modal>',
      status: 'stable',
    },
    Accordion: {
      description: 'Collapsible sections for grouped content.',
      props: [
        { name: 'items', type: 'AccordionItem[]', required: true },
        { name: 'multiple', type: 'boolean', default: 'false' },
      ],
      example: '<Accordion items={items} multiple />',
      status: 'stable',
    },
  },
  '@ultra-ui/Headless': {
    useToggle: {
      description: 'Simple boolean state manager with set and toggle helpers.',
      props: [
        { name: 'defaultValue', type: 'boolean', default: 'false' },
      ],
      example: "const { on, toggle, set } = useToggle(false);",
      status: 'stable',
    },
    useDisclosure: {
      description: 'Open-state utility for drawers, popovers, and dialogs with controlled and uncontrolled support.',
      props: [
        { name: 'defaultOpen', type: 'boolean', default: 'false' },
        { name: 'open', type: 'boolean' },
        { name: 'onOpenChange', type: '(open: boolean) => void' },
      ],
      example: "const disclosure = useDisclosure({ defaultOpen: false });",
      status: 'stable',
    },
    useModal: {
      description: 'Modal-oriented disclosure hook with backdrop and Escape key helpers.',
      props: [
        { name: 'defaultOpen', type: 'boolean', default: 'false' },
        { name: 'open', type: 'boolean' },
        { name: 'closeOnEscape', type: 'boolean', default: 'true' },
        { name: 'onOpenChange', type: '(open: boolean) => void' },
      ],
      example: "const modal = useModal({ closeOnEscape: true });",
      status: 'stable',
    },
    useAccordion: {
      description: 'Manages single or multi-expand open section state for accordion UIs.',
      props: [
        { name: 'multiple', type: 'boolean', default: 'false' },
        { name: 'defaultOpenIds', type: 'AccordionItemId[]', default: '[]' },
        { name: 'openIds', type: 'AccordionItemId[]' },
        { name: 'onChange', type: '(openIds: AccordionItemId[]) => void' },
      ],
      example: "const accordion = useAccordion({ multiple: true, defaultOpenIds: ['intro'] });",
      status: 'stable',
    },
    useTabs: {
      description: 'Tracks active tab id and provides sequential tab navigation helpers.',
      props: [
        { name: 'ids', type: 'TabId[]', required: true },
        { name: 'defaultTabId', type: 'TabId' },
        { name: 'activeTabId', type: 'TabId' },
        { name: 'onChange', type: '(id: TabId) => void' },
      ],
      example: "const tabs = useTabs({ ids: ['overview', 'api', 'examples'] });",
      status: 'stable',
    },
    usePagination: {
      description: 'Computes pagination boundaries and exposes page navigation controls.',
      props: [
        { name: 'totalItems', type: 'number', required: true },
        { name: 'pageSize', type: 'number', default: '10' },
        { name: 'initialPage', type: 'number', default: '1' },
        { name: 'currentPage', type: 'number' },
        { name: 'onPageChange', type: '(page: number) => void' },
      ],
      example: "const paging = usePagination({ totalItems: 237, pageSize: 20 });",
      status: 'stable',
    },
    useControllableState: {
      description: 'Shared utility for components that support both controlled and uncontrolled state.',
      props: [
        { name: 'value', type: 'T' },
        { name: 'defaultValue', type: 'T', required: true },
        { name: 'onChange', type: '(value: T) => void' },
      ],
      example: "const [value, setValue] = useControllableState({ defaultValue: '' });",
      status: 'stable',
    },
    useMenu: {
      description: 'Keyboard-focused menu state hook with highlight, loop, and open control.',
      props: [
        { name: 'itemsCount', type: 'number', required: true },
        { name: 'defaultOpen', type: 'boolean', default: 'false' },
        { name: 'loop', type: 'boolean', default: 'true' },
        { name: 'closeOnSelect', type: 'boolean', default: 'true' },
      ],
      example: "const menu = useMenu({ itemsCount: items.length, loop: true });",
      status: 'stable',
    },
    useSelect: {
      description: 'Selection state hook built for custom select UIs with keyboard navigation.',
      props: [
        { name: 'options', type: 'SelectOption[]', required: true },
        { name: 'defaultSelectedIndex', type: 'number', default: '0' },
        { name: 'closeOnSelect', type: 'boolean', default: 'true' },
      ],
      example: "const select = useSelect({ options });",
      status: 'stable',
    },
    useCombobox: {
      description: 'Autocomplete/combobox state hook with filtering and keyboard-driven selection.',
      props: [
        { name: 'options', type: 'ComboboxOption[]', required: true },
        { name: 'defaultInputValue', type: 'string', default: "''" },
      ],
      example: "const combo = useCombobox({ options });",
      status: 'stable',
    },
    useTypeahead: {
      description: 'Buffered typeahead query matching for keyboard-first option navigation.',
      props: [
        { name: 'items', type: 'string[]', required: true },
        { name: 'timeoutMs', type: 'number', default: '500' },
      ],
      example: "const typeahead = useTypeahead({ items: ['Apple', 'Apricot', 'Banana'] });",
      status: 'stable',
    },
    useListbox: {
      description: 'Listbox state hook with arrow navigation, Enter/Space selection, and built-in typeahead.',
      props: [
        { name: 'itemsCount', type: 'number', required: true },
        { name: 'itemLabels', type: 'string[]' },
        { name: 'selectionMode', type: "'single' | 'multiple'", default: 'single' },
      ],
      example: "const listbox = useListbox({ itemsCount: options.length, itemLabels: options });",
      status: 'stable',
    },
  },
  '@ultra-ui/Grid-Core': {
    Grid: {
      description: 'Full-featured CSS Grid layout component with support for responsive columns, auto-fit/fill, explicit templates, gap, alignment, and more.',
      status: 'stable',
      props: [
        { name: 'columns', type: 'number | ResponsiveValue<number>', default: '12' },
        { name: 'rows', type: 'number | string' },
        { name: 'gap', type: 'string | number', default: "'16px'" },
        { name: 'gapX', type: 'string | number' },
        { name: 'gapY', type: 'string | number' },
        { name: 'autoFit', type: 'boolean', default: 'false' },
        { name: 'autoFill', type: 'boolean', default: 'false' },
        { name: 'minColWidth', type: 'string | number', default: "'200px'" },
        { name: 'templateColumns', type: 'string' },
        { name: 'templateRows', type: 'string' },
        { name: 'autoFlow', type: "'row' | 'column' | 'row dense' | 'column dense'" },
        { name: 'autoRows', type: 'string' },
        { name: 'autoCols', type: 'string' },
        { name: 'alignItems', type: 'CSSProperties[alignItems]' },
        { name: 'justifyItems', type: 'CSSProperties[justifyItems]' },
        { name: 'alignContent', type: 'CSSProperties[alignContent]' },
        { name: 'justifyContent', type: 'CSSProperties[justifyContent]' },
        { name: 'padding', type: 'string | number' },
        { name: 'paddingX', type: 'string | number' },
        { name: 'paddingY', type: 'string | number' },
        { name: 'width', type: 'string | number' },
        { name: 'height', type: 'string | number' },
        { name: 'className', type: 'string' },
        { name: 'style', type: 'CSSProperties' },
      ],
      example: '<Grid columns={3} gap={16} autoFit minColWidth="200px">\n  <div>Cell 1</div>\n  <div>Cell 2</div>\n  <div>Cell 3</div>\n</Grid>',
    },
    Box: {
      description: 'Generic layout and styling container that maps common design-system props to inline CSS. Supports polymorphic rendering via the `as` prop.',
      status: 'stable',
      props: [
        { name: 'as', type: 'React.ElementType', default: "'div'" },
        { name: 'display', type: 'CSSProperties[display]' },
        { name: 'position', type: 'CSSProperties[position]' },
        { name: 'flexDirection', type: 'CSSProperties[flexDirection]' },
        { name: 'alignItems', type: 'CSSProperties[alignItems]' },
        { name: 'justifyContent', type: 'CSSProperties[justifyContent]' },
        { name: 'alignSelf', type: 'CSSProperties[alignSelf]' },
        { name: 'justifySelf', type: 'CSSProperties[justifySelf]' },
        { name: 'flexWrap', type: 'CSSProperties[flexWrap]' },
        { name: 'flexGrow', type: 'CSSProperties[flexGrow]' },
        { name: 'flexShrink', type: 'CSSProperties[flexShrink]' },
        { name: 'flexBasis', type: 'CSSProperties[flexBasis]' },
        { name: 'gap', type: 'string | number' },
        { name: 'gapX', type: 'string | number' },
        { name: 'gapY', type: 'string | number' },
        { name: 'padding', type: 'string | number' },
        { name: 'paddingX', type: 'string | number' },
        { name: 'paddingY', type: 'string | number' },
        { name: 'margin', type: 'string | number' },
        { name: 'marginX', type: 'string | number' },
        { name: 'marginY', type: 'string | number' },
        { name: 'width', type: 'string | number' },
        { name: 'height', type: 'string | number' },
        { name: 'minWidth', type: 'string | number' },
        { name: 'maxWidth', type: 'string | number' },
        { name: 'minHeight', type: 'string | number' },
        { name: 'maxHeight', type: 'string | number' },
        { name: 'bg', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'borderRadius', type: 'string | number' },
        { name: 'border', type: 'string' },
        { name: 'boxShadow', type: 'string' },
        { name: 'overflow', type: 'CSSProperties[overflow]' },
        { name: 'zIndex', type: 'number | string' },
        { name: 'opacity', type: 'number' },
        { name: 'cursor', type: 'CSSProperties[cursor]' },
        { name: 'gridColumn', type: 'string | number' },
        { name: 'gridRow', type: 'string | number' },
      ],
      example: '<Box as="section" padding={16} bg="#f0f0f0" borderRadius={8}>\n  Content\n</Box>',
    },
    Container: {
      description: 'Centered, responsive container with named size presets (xs → 2xl) and optional fluid mode that fills 100% of the parent.',
      status: 'stable',
      props: [
        { name: 'maxWidth', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string | number", default: "'xl'" },
        { name: 'paddingX', type: 'string | number', default: "'16px'" },
        { name: 'paddingY', type: 'string | number', default: "'0px'" },
        { name: 'padding', type: 'string | number' },
        { name: 'centered', type: 'boolean', default: 'true' },
        { name: 'fluid', type: 'boolean', default: 'false' },
        { name: 'bg', type: 'string' },
      ],
      example: '<Container maxWidth="lg" paddingX={24}>\n  <h1>Page Title</h1>\n</Container>',
    },
    Flex: {
      description: 'Flexbox layout component with first-class support for direction, alignment, wrapping, gap, and inline mode.',
      status: 'stable',
      props: [
        { name: 'as', type: 'React.ElementType', default: "'div'" },
        { name: 'direction', type: 'CSSProperties[flexDirection]', default: "'row'" },
        { name: 'align', type: 'CSSProperties[alignItems]' },
        { name: 'justify', type: 'CSSProperties[justifyContent]' },
        { name: 'alignContent', type: 'CSSProperties[alignContent]' },
        { name: 'wrap', type: 'CSSProperties[flexWrap] | boolean' },
        { name: 'gap', type: 'string | number' },
        { name: 'gapX', type: 'string | number' },
        { name: 'gapY', type: 'string | number' },
        { name: 'inline', type: 'boolean', default: 'false' },
        { name: 'padding', type: 'string | number' },
        { name: 'paddingX', type: 'string | number' },
        { name: 'paddingY', type: 'string | number' },
        { name: 'margin', type: 'string | number' },
        { name: 'width', type: 'string | number' },
        { name: 'height', type: 'string | number' },
        { name: 'bg', type: 'string' },
        { name: 'border', type: 'string' },
        { name: 'borderRadius', type: 'string | number' },
        { name: 'overflow', type: 'CSSProperties[overflow]' },
        { name: 'grow', type: 'CSSProperties[flexGrow]' },
        { name: 'shrink', type: 'CSSProperties[flexShrink]' },
      ],
      example: '<Flex direction="row" align="center" justify="space-between" gap={16}>\n  <span>Left</span>\n  <span>Right</span>\n</Flex>',
    },
    Spacer: {
      description: 'Decorative whitespace element. Can take explicit width/height, a square size shorthand, or expand to fill remaining flex/grid space.',
      status: 'stable',
      props: [
        { name: 'width', type: 'string | number' },
        { name: 'height', type: 'string | number' },
        { name: 'size', type: 'string | number' },
        { name: 'flex', type: 'boolean', default: 'false' },
        { name: 'flexGrow', type: 'number' },
      ],
      example: '<Flex>\n  <span>Left</span>\n  <Spacer flex />\n  <span>Right</span>\n</Flex>',
    },
    Divider: {
      description: 'Visual separator rendered as a semantic <hr>. Supports horizontal/vertical orientation, solid/dashed/dotted variants, custom color and thickness, and an optional inline label.',
      status: 'stable',
      props: [
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
        { name: 'variant', type: "'solid' | 'dashed' | 'dotted'", default: "'solid'" },
        { name: 'color', type: 'string', default: "'currentColor'" },
        { name: 'thickness', type: 'string | number', default: '1' },
        { name: 'spacing', type: 'string | number' },
        { name: 'spacingY', type: 'string | number' },
        { name: 'spacingX', type: 'string | number' },
        { name: 'label', type: 'ReactNode' },
        { name: 'labelPosition', type: "'start' | 'center' | 'end'", default: "'center'" },
        { name: 'labelGap', type: 'string | number', default: "'8px'" },
      ],
      example: '<Divider />\n<Divider orientation="vertical" />\n<Divider label="OR" variant="dashed" />',
    },
    Stack: {
      description: 'One-dimensional flex layout for stacking children with uniform spacing. Ships with HStack (row) and VStack (column) convenience aliases. Optionally inserts Divider elements between children.',
      status: 'stable',
      props: [
        { name: 'as', type: 'React.ElementType', default: "'div'" },
        { name: 'direction', type: "'row' | 'column' | 'row-reverse' | 'column-reverse'", default: "'column'" },
        { name: 'spacing', type: 'string | number' },
        { name: 'align', type: 'CSSProperties[alignItems]' },
        { name: 'justify', type: 'CSSProperties[justifyContent]' },
        { name: 'wrap', type: 'CSSProperties[flexWrap] | boolean' },
        { name: 'divider', type: 'boolean | ReactElement' },
        { name: 'padding', type: 'string | number' },
        { name: 'paddingX', type: 'string | number' },
        { name: 'paddingY', type: 'string | number' },
        { name: 'margin', type: 'string | number' },
        { name: 'width', type: 'string | number' },
        { name: 'height', type: 'string | number' },
        { name: 'bg', type: 'string' },
        { name: 'shouldWrapChildren', type: 'boolean', default: 'false' },
      ],
      example: '<Stack spacing={16} divider>\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n</Stack>',
    },
  },
  '@ultra-ui/Ultra-Table': {
    Layout: {
      description: ultraTableDescriptions.Layout,
      status: 'experimental',
      props: [
        { name: 'columns', type: 'UltraTableOptions<Row>["columns"]', required: true },
        { name: 'rows', type: 'UltraTableOptions<Row>["rows"]', required: true },
        { name: 'pageSize', type: 'number', default: '5' },
      ],
      example: "const table = useUltraTable({ columns, rows, pageSize: 5 });",
    },
    Columns: {
      description: ultraTableDescriptions.Columns,
      status: 'experimental',
      props: [
        { name: 'key', type: 'keyof Row', required: true },
        { name: 'label', type: 'string', required: true },
        { name: 'sortable', type: 'boolean', default: 'false' },
        { name: 'hidden', type: 'boolean', default: 'false' },
        { name: 'renderCell', type: '(value: Row[keyof Row], row: Row) => ReactNode' },
      ],
      example: "const columns = [{ key: 'name', label: 'Name', sortable: true, hidden: false }];",
    },
    Rows: {
      description: ultraTableDescriptions.Rows,
      status: 'experimental',
      props: [
        { name: 'setRows', type: '(rows: Row[]) => void' },
        { name: 'updateRow', type: '(rowIndex: number, patch: Partial<Row>) => void' },
        { name: 'pagedRows', type: 'Row[]' },
      ],
      example: "table.updateRow(0, { name: 'Updated name' });",
    },
    Editing: {
      description: ultraTableDescriptions.Editing,
      status: 'experimental',
      props: [
        { name: 'updateRow', type: '(rowIndex: number, patch: Partial<Row>) => void' },
        { name: 'setRows', type: '(rows: Row[]) => void' },
      ],
      example: "table.updateRow(1, { active: true });",
    },
    'Form Components': {
      description: `${ultraTableDescriptions['Form Components']} (showcase pattern built with renderCell + row updates).`,
      status: 'experimental',
      props: [
        { name: 'renderCell', type: '(value: Row[keyof Row], row: Row) => ReactNode' },
        { name: 'updateRow', type: '(rowIndex: number, patch: Partial<Row>) => void' },
      ],
      example: "const columns = [{ key: 'active', label: 'Active', renderCell: (value) => value ? 'Yes' : 'No' }];",
    },
    'Save Flow': {
      description: `${ultraTableDescriptions['Save Flow']} (showcase demo wires this through mock async handlers).`,
      status: 'experimental',
      props: [
        { name: 'setRows', type: '(rows: Row[]) => void' },
        { name: 'updateRow', type: '(rowIndex: number, patch: Partial<Row>) => void' },
      ],
      example: "table.setRows(updatedRowsAfterSave);",
    },
    'Column Management': {
      description: ultraTableDescriptions['Column Management'],
      status: 'experimental',
      props: [
        { name: 'toggleColumnVisibility', type: '(columnKey: keyof Row) => void' },
        { name: 'reorderColumn', type: '(columnKey: keyof Row, targetIndex: number) => void' },
        { name: 'setColumns', type: '(columns: UltraTableColumn<Row>[]) => void' },
      ],
      example: "table.reorderColumn('name', 0);",
    },
    Pagination: {
      description: ultraTableDescriptions.Pagination,
      status: 'experimental',
      props: [
        { name: 'state.pagination', type: 'UltraTablePaginationState' },
        { name: 'setPage', type: '(page: number) => void' },
        { name: 'setPageSize', type: '(pageSize: number) => void' },
      ],
      example: "table.setPage(2); table.setPageSize(10);",
    },
  },
  '@ultra-ui/Tailwind-Wrappers': {
    TButton: { description: 'Tailwind-styled button wrapper.', status: 'stable' },
    TCard: { description: 'Tailwind-styled card wrapper.', status: 'stable' },
    TInput: { description: 'Tailwind-styled input wrapper.', status: 'stable' },
    TBadge: { description: 'Tailwind-styled badge wrapper.', status: 'stable' },
    TAlert: { description: 'Tailwind-styled alert wrapper.', status: 'stable' },
    TModal: { description: 'Tailwind-styled modal wrapper.', status: 'stable' },
    TAccordion: { description: 'Tailwind-styled accordion wrapper.', status: 'stable' },
  },
};

function normalizePackageId(packageId: string) {
  return packageAliases[packageId] ?? packageId;
}

const ComponentDemo: React.FC<{ packageId: string; componentName: string }> = ({ packageId, componentName }) => {
  const [buttonClicks, setButtonClicks] = useState(0);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState<string | number>('1');
  const [enabled, setEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chips, setChips] = useState(['React', 'TypeScript', 'UI']);
  const [serverValue, setServerValue] = useState('server-state');
  const [menuLastAction, setMenuLastAction] = useState('None');
  const [typeaheadLastKey, setTypeaheadLastKey] = useState('None');

  const menuHook = useMenu({ itemsCount: 5, defaultOpen: true, loop: true });
  const selectHook = useSelect({
    options: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid' },
    ],
  });
  const comboboxHook = useCombobox({
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Apricot', value: 'apricot' },
      { label: 'Banana', value: 'banana' },
      { label: 'Blueberry', value: 'blueberry' },
      { label: 'Cherry', value: 'cherry' },
    ],
  });
  const typeaheadHook = useTypeahead({
    items: ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry'],
    timeoutMs: 600,
  });
  const listboxItems = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry'];
  const listboxHook = useListbox({
    itemsCount: listboxItems.length,
    itemLabels: listboxItems,
    defaultSelectedIndex: 0,
    defaultOpen: true,
    selectionMode: 'single',
  });
  const toggleHook = useToggle(false);
  const disclosureHook = useDisclosure({ defaultOpen: false });
  const modalHook = useModalHook({ defaultOpen: false, closeOnEscape: true });
  const accordionHook = useAccordionHook<string>({
    multiple: true,
    defaultOpenIds: ['intro'],
  });
  const tabsHook = useTabs({
    ids: ['overview', 'api', 'examples'],
    defaultTabId: 'overview',
  });
  const paginationHook = usePagination({ totalItems: 137, pageSize: 10, initialPage: 2 });
  const [localState, setLocalState] = useControllableState({ defaultValue: 'draft' });
  const [controlledState, setControlledState] = useControllableState({
    value: serverValue,
    defaultValue: 'server-state',
    onChange: setServerValue,
  });

  const accordionItems = [
    { id: 1, title: 'Section 1', content: 'This is the first accordion section.' },
    { id: 2, title: 'Section 2', content: 'This is the second accordion section.' },
    { id: 3, title: 'Section 3', content: 'This is the third accordion section.' },
  ];

  if (packageId === '@ultra-ui/Ultra-Table') {
    return <UltraTableShowcaseDemo feature={componentName} />;
  }

  if (packageId === '@ultra-ui/Grid-Core') {
    const cellStyle: React.CSSProperties = {
      background: '#e2e8f0',
      border: '1px solid #cbd5e1',
      borderRadius: '4px',
      padding: '12px',
      textAlign: 'center',
      fontSize: '14px',
    };
    const labelStyle: React.CSSProperties = { fontSize: '12px', color: '#64748b', marginBottom: '4px' };

    switch (componentName) {
      case 'Grid':
        return (
          <div className="demo-container">
            <p style={labelStyle}>3-column grid with 12px gap</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} style={cellStyle}>Cell {n}</div>
              ))}
            </div>
            <p style={{ ...labelStyle, marginTop: '16px' }}>auto-fit minColWidth=120px</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} style={cellStyle}>Item {n}</div>
              ))}
            </div>
          </div>
        );
      case 'Box':
        return (
          <div className="demo-container">
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ padding: '16px', background: '#dbeafe', borderRadius: '8px', border: '1px solid #93c5fd' }}>
                padding=16
              </div>
              <div style={{ padding: '8px 24px', background: '#dcfce7', borderRadius: '4px', border: '1px solid #86efac' }}>
                paddingX=24
              </div>
              <div style={{ padding: '16px', background: '#fef9c3', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                borderRadius=12 + shadow
              </div>
            </div>
          </div>
        );
      case 'Container':
        return (
          <div className="demo-container">
            {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} style={{ marginBottom: '8px' }}>
                <p style={labelStyle}>maxWidth="{size}"</p>
                <div style={{ background: '#e0f2fe', borderLeft: '4px solid #0ea5e9', padding: '6px 12px', maxWidth: { xs: '480px', sm: '640px', md: '768px', lg: '1024px' }[size], marginLeft: 'auto', marginRight: 'auto' }}>
                  {size.toUpperCase()} container
                </div>
              </div>
            ))}
          </div>
        );
      case 'Flex':
        return (
          <div className="demo-container">
            <p style={labelStyle}>direction="row" justify="space-between" align="center"</p>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '12px', borderRadius: '6px' }}>
              <div style={cellStyle}>Start</div>
              <div style={cellStyle}>Middle</div>
              <div style={cellStyle}>End</div>
            </div>
            <p style={{ ...labelStyle, marginTop: '12px' }}>direction="column" gap=8</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#f1f5f9', padding: '12px', borderRadius: '6px' }}>
              {['Row A', 'Row B', 'Row C'].map((r) => (
                <div key={r} style={cellStyle}>{r}</div>
              ))}
            </div>
          </div>
        );
      case 'Spacer':
        return (
          <div className="demo-container">
            <p style={labelStyle}>Spacer flex (pushes items to edges)</p>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '8px', borderRadius: '6px', gap: '8px' }}>
              <div style={cellStyle}>Logo</div>
              <div style={{ flex: '1 1 auto', background: '#cbd5e1', height: '2px' }} aria-hidden="true" />
              <div style={cellStyle}>Actions</div>
            </div>
            <p style={{ ...labelStyle, marginTop: '12px' }}>Fixed spacer size=24</p>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '8px', borderRadius: '6px' }}>
              <div style={cellStyle}>A</div>
              <div style={{ width: '24px', height: '24px', background: '#fca5a5', flexShrink: 0 }} aria-hidden="true" />
              <div style={cellStyle}>B</div>
            </div>
          </div>
        );
      case 'Divider':
        return (
          <div className="demo-container">
            <p style={labelStyle}>Horizontal — solid / dashed / dotted</p>
            {(['solid', 'dashed', 'dotted'] as const).map((v) => (
              <div key={v} style={{ marginBottom: '12px' }}>
                <p style={{ ...labelStyle, marginBottom: '4px' }}>{v}</p>
                <hr style={{ borderStyle: v, borderTopWidth: '1px', borderColor: '#94a3b8', margin: 0 }} />
              </div>
            ))}
            <p style={{ ...labelStyle, marginTop: '8px' }}>With label</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <hr style={{ flex: 1, borderStyle: 'solid', borderTopWidth: '1px', borderColor: '#94a3b8', margin: 0 }} />
              <span style={{ whiteSpace: 'nowrap', fontSize: '12px', color: '#64748b' }}>OR</span>
              <hr style={{ flex: 1, borderStyle: 'solid', borderTopWidth: '1px', borderColor: '#94a3b8', margin: 0 }} />
            </div>
          </div>
        );
      case 'Stack':
        return (
          <div className="demo-container">
            <p style={labelStyle}>VStack spacing=8</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#f1f5f9', padding: '12px', borderRadius: '6px' }}>
              {['Item 1', 'Item 2', 'Item 3'].map((item) => (
                <div key={item} style={cellStyle}>{item}</div>
              ))}
            </div>
            <p style={{ ...labelStyle, marginTop: '12px' }}>HStack spacing=8 with dividers</p>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '12px', borderRadius: '6px' }}>
              {['A', 'B', 'C'].map((item, i) => (
                <React.Fragment key={item}>
                  <div style={cellStyle}>{item}</div>
                  {i < 2 && <hr style={{ width: '1px', height: '24px', borderStyle: 'solid', borderLeftWidth: '1px', borderColor: '#94a3b8', margin: 0 }} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      default:
        return <p>No interactive demo available for this item.</p>;
    }
  }

  if (packageId === '@ultra-ui/Headless') {
    switch (componentName) {
      case 'useToggle':
        return (
          <div className="demo-container">
            <Button onClick={toggleHook.toggle}>{toggleHook.on ? 'On' : 'Off'}</Button>
            <p className="demo-feedback">State: {String(toggleHook.on)}</p>
          </div>
        );
      case 'useDisclosure':
        return (
          <div className="demo-container">
            <Button onClick={disclosureHook.onToggle}>Toggle Panel</Button>
            {disclosureHook.open && <Card title="Disclosure Panel">Disclosure content is visible.</Card>}
            <p className="demo-feedback">Open: {String(disclosureHook.open)}</p>
          </div>
        );
      case 'useModal':
        return (
          <div className="demo-container">
            <div className="demo-grid">
              <Button onClick={modalHook.onOpen}>Open Hook Modal</Button>
              <Button variant="outline" onClick={() => modalHook.getDialogProps().onKeyDown({ key: 'Escape' })}>
                Simulate Escape
              </Button>
            </div>
            <p className="demo-feedback">Open: {String(modalHook.open)}</p>
            {modalHook.open && (
              <Card title="Hook Modal State">
                <p>Modal open state is controlled by useModal.</p>
                <Button onClick={modalHook.onClose}>Close</Button>
              </Card>
            )}
          </div>
        );
      case 'useAccordion':
        return (
          <div className="demo-container">
            <div className="demo-grid">
              <Button variant="outline" onClick={() => accordionHook.toggle('intro')}>Toggle intro</Button>
              <Button variant="outline" onClick={() => accordionHook.toggle('api')}>Toggle api</Button>
              <Button variant="outline" onClick={() => accordionHook.openAll(['intro', 'api'])}>Open all</Button>
              <Button variant="outline" onClick={accordionHook.closeAll}>Close all</Button>
            </div>
            <p className="demo-feedback">Open IDs: {accordionHook.openIds.join(', ') || 'none'}</p>
          </div>
        );
      case 'useTabs':
        return (
          <div className="demo-container">
            <div className="demo-grid">
              <Button variant="outline" onClick={tabsHook.previousTab}>Previous</Button>
              <Button variant="outline" onClick={tabsHook.nextTab}>Next</Button>
            </div>
            <p className="demo-feedback">Active Tab: {tabsHook.activeTabId}</p>
          </div>
        );
      case 'usePagination':
        return (
          <div className="demo-container">
            <div className="demo-grid">
              <Button variant="outline" onClick={paginationHook.previousPage} disabled={!paginationHook.canGoPrevious}>Previous</Button>
              <Button variant="outline" onClick={paginationHook.nextPage} disabled={!paginationHook.canGoNext}>Next</Button>
            </div>
            <p className="demo-feedback">
              Page {paginationHook.currentPage}/{paginationHook.totalPages} - Showing items {paginationHook.startIndex + 1} to {paginationHook.endIndex}
            </p>
          </div>
        );
      case 'useControllableState':
        return (
          <div className="demo-stack">
            <Card title="Uncontrolled">
              <p>Local: {localState}</p>
              <Button onClick={() => setLocalState((previous) => `${previous}-next`)}>Update Local</Button>
            </Card>
            <Card title="Controlled">
              <p>Controlled: {controlledState}</p>
              <Button onClick={() => setControlledState((previous) => `${previous}-next`)}>Update Controlled</Button>
              <Button variant="outline" onClick={() => setServerValue('server-reset')}>Reset External Value</Button>
            </Card>
          </div>
        );
      case 'useMenu':
        return (
          <div className="demo-container">
            <div className="demo-grid">
              <Button variant="outline" onClick={() => {
                menuHook.onKeyDown({ key: 'ArrowDown' });
                setMenuLastAction('ArrowDown');
              }}>
                ArrowDown
              </Button>
              <Button variant="outline" onClick={() => {
                menuHook.onKeyDown({ key: 'ArrowUp' });
                setMenuLastAction('ArrowUp');
              }}>
                ArrowUp
              </Button>
              <Button variant="outline" onClick={() => {
                menuHook.onKeyDown({ key: 'Home' });
                setMenuLastAction('Home');
              }}>
                Home
              </Button>
              <Button variant="outline" onClick={() => {
                menuHook.onKeyDown({ key: 'End' });
                setMenuLastAction('End');
              }}>
                End
              </Button>
              <Button variant="outline" onClick={() => {
                menuHook.onKeyDown({ key: 'Escape' });
                setMenuLastAction('Escape');
              }}>
                Escape
              </Button>
            </div>
            <p className="demo-feedback">
              Open: {String(menuHook.open)} | Highlighted: {menuHook.highlightedIndex} | Last Key: {menuLastAction}
            </p>
          </div>
        );
      case 'useSelect':
        return (
          <div className="demo-container">
            <div className="demo-grid">
              <Button variant="outline" onClick={() => selectHook.onKeyDown({ key: 'ArrowDown' })}>ArrowDown</Button>
              <Button variant="outline" onClick={() => selectHook.onKeyDown({ key: 'ArrowUp' })}>ArrowUp</Button>
              <Button variant="outline" onClick={() => selectHook.onKeyDown({ key: 'Enter' })}>Enter</Button>
              <Button variant="outline" onClick={() => selectHook.onToggle()}>Toggle</Button>
            </div>
            <p className="demo-feedback">
              Open: {String(selectHook.open)} | Highlighted: {selectHook.highlightedIndex} | Selected: {selectHook.selectedOption?.label}
            </p>
          </div>
        );
      case 'useCombobox':
        return (
          <div className="demo-container">
            <input
              className="headless-input"
              value={comboboxHook.inputValue}
              onChange={(event) => comboboxHook.onInputChange(event.target.value)}
              placeholder="Type a fruit"
            />
            <div className="demo-grid">
              <Button variant="outline" onClick={() => comboboxHook.onKeyDown({ key: 'ArrowDown' })}>ArrowDown</Button>
              <Button variant="outline" onClick={() => comboboxHook.onKeyDown({ key: 'ArrowUp' })}>ArrowUp</Button>
              <Button variant="outline" onClick={() => comboboxHook.onKeyDown({ key: 'Enter' })}>Enter</Button>
            </div>
            <p className="demo-feedback">
              Open: {String(comboboxHook.open)} | Highlighted: {comboboxHook.highlightedIndex} | Filtered: {comboboxHook.filteredOptions.length}
            </p>
            <div className="headless-list">
              {comboboxHook.filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  className={`headless-list-item ${index === comboboxHook.highlightedIndex ? 'active' : ''}`}
                  onClick={() => comboboxHook.selectIndex(index)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 'useTypeahead':
        return (
          <div className="demo-container">
            <div className="demo-grid">
              <Button variant="outline" onClick={() => {
                typeaheadHook.onType('a');
                setTypeaheadLastKey('a');
              }}>
                Type "a"
              </Button>
              <Button variant="outline" onClick={() => {
                typeaheadHook.onType('p');
                setTypeaheadLastKey('p');
              }}>
                Type "p"
              </Button>
              <Button variant="outline" onClick={() => {
                typeaheadHook.onType('b');
                setTypeaheadLastKey('b');
              }}>
                Type "b"
              </Button>
              <Button variant="outline" onClick={() => {
                typeaheadHook.reset();
                setTypeaheadLastKey('reset');
              }}>
                Reset
              </Button>
            </div>
            <p className="demo-feedback">
              Query: {typeaheadHook.query || '(empty)'} | Match Index: {typeaheadHook.matchedIndex} | Last Key: {typeaheadLastKey}
            </p>
          </div>
        );
      case 'useListbox':
        return (
          <div className="demo-container">
            <div className="demo-grid">
              <Button variant="outline" onClick={() => listboxHook.onKeyDown({ key: 'ArrowDown' })}>ArrowDown</Button>
              <Button variant="outline" onClick={() => listboxHook.onKeyDown({ key: 'ArrowUp' })}>ArrowUp</Button>
              <Button variant="outline" onClick={() => listboxHook.onKeyDown({ key: 'Enter' })}>Enter</Button>
              <Button variant="outline" onClick={() => listboxHook.onKeyDown({ key: ' ' })}>Space</Button>
              <Button variant="outline" onClick={() => listboxHook.onKeyDown({ key: 'b' })}>Type "b"</Button>
            </div>
            <p className="demo-feedback">
              Open: {String(listboxHook.open)} | Highlighted: {listboxHook.highlightedIndex} | Selected: {listboxItems[listboxHook.selectedIndex]} | Query: {listboxHook.typeaheadQuery || '(empty)'}
            </p>
            <div className="headless-list">
              {listboxItems.map((label, index) => (
                <button
                  key={label}
                  className={`headless-list-item ${index === listboxHook.highlightedIndex ? 'active' : ''}`}
                  onClick={() => listboxHook.selectIndex(index)}
                >
                  {label} {listboxHook.isSelected(index) ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return <p>No interactive demo available for this item.</p>;
    }
  }

  switch (componentName) {
    case 'Button':
      return (
        <div className="demo-container">
          <div className="demo-grid">
            <Button onClick={() => setButtonClicks((count) => count + 1)}>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button disabled>Disabled</Button>
          </div>
          <p className="demo-feedback">Clicks: {buttonClicks}</p>
        </div>
      );
    case 'Checkbox':
      return (
        <div className="demo-container">
          <Checkbox checked={checked} onChange={setChecked} label="Accept terms" />
          <p className="demo-feedback">Checked: {checked ? 'Yes' : 'No'}</p>
        </div>
      );
    case 'Radio':
      return (
        <div className="demo-container">
          <div className="demo-group">
            <Radio name="options" value="1" checked={radioValue === '1'} onChange={setRadioValue} label="Option 1" />
            <Radio name="options" value="2" checked={radioValue === '2'} onChange={setRadioValue} label="Option 2" />
            <Radio name="options" value="3" checked={radioValue === '3'} onChange={setRadioValue} label="Option 3" />
          </div>
          <p className="demo-feedback">Selected: {radioValue}</p>
        </div>
      );
    case 'Switch':
      return (
        <div className="demo-container">
          <Switch checked={enabled} onChange={setEnabled} label={enabled ? 'Enabled' : 'Disabled'} />
          <p className="demo-feedback">Status: {enabled ? 'On' : 'Off'}</p>
        </div>
      );
    case 'Card':
      return (
        <div className="demo-container">
          <Card title="Sample Card">
            <p>This is a sample card showing grouped content.</p>
          </Card>
        </div>
      );
    case 'Badge':
      return (
        <div className="demo-container">
          <div className="demo-grid">
            <Badge content={5} color="primary"><span>Inbox</span></Badge>
            <Badge content={2} color="success"><span>Tasks</span></Badge>
            <Badge content={1} color="warning"><span>Alert</span></Badge>
          </div>
        </div>
      );
    case 'Chip':
      return (
        <div className="demo-container">
          <div className="demo-chips">
            {chips.map((chip) => (
              <Chip key={chip} label={chip} onDelete={() => setChips((current) => current.filter((item) => item !== chip))} />
            ))}
          </div>
          <button className="demo-button" onClick={() => setChips((current) => [...current, `Tag ${current.length + 1}`])}>
            Add Chip
          </button>
        </div>
      );
    case 'Alert':
      return (
        <div className="demo-stack">
          <Alert variant="success">Success state</Alert>
          <Alert variant="info">Informational state</Alert>
          <Alert variant="warning">Warning state</Alert>
          <Alert variant="error">Error state</Alert>
        </div>
      );
    case 'Modal':
      return (
        <div className="demo-container">
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="modal-content">
              <h2>Modal Title</h2>
              <p>This is interactive modal content.</p>
              <Button onClick={() => setIsModalOpen(false)}>Close Modal</Button>
            </div>
          </Modal>
        </div>
      );
    case 'Accordion':
      return <Accordion items={accordionItems} multiple />;
    default:
      return <p>No interactive demo available for this item.</p>;
  }
};

const ComponentDetails: React.FC<ComponentDetailsProps> = ({ packageId, componentName }) => {
  const normalizedPackageId = normalizePackageId(packageId);
  const component = componentInfo[normalizedPackageId]?.[componentName];

  if (!component) {
    return (
      <div className="component-details">
        <div className="empty-state">
          <p>Component not found in database</p>
          <p>Package: {packageId} | Component: {componentName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="component-details">
      <div className="details-header">
        <div className="component-title-section">
          <h1>{componentName}</h1>
          <span className="package-badge">{normalizedPackageId}</span>
          <span className={`status-badge ${component.status}`}>{component.status}</span>
        </div>
      </div>

      <div className="details-content">
        <section className="section">
          <h2>Description</h2>
          <p>{component.description}</p>
        </section>

        {component.props && (
          <section className="section">
            <h2>Props</h2>
            <div className="props-table-wrapper">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Required</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop) => (
                  <tr key={prop.name}>
                    <td>{prop.name}</td>
                    <td>{prop.type}</td>
                    <td>{prop.default ?? '-'}</td>
                    <td>{prop.required ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </section>
        )}

        {component.example && (
          <section className="section">
            <div className="example-section-wrapper">
              <div className="example-code-section">
                <h2>Code Example</h2>
                <div className="code-block-wrapper">
                  <pre className="code-block">
                    <code>{component.example}</code>
                  </pre>
                </div>
              </div>

              {packagesWithInteractiveDemos.includes(normalizedPackageId) && (
                <div className="example-demo-section">
                  <h2>Interactive Demo</h2>
                  <div className="demo-section">
                    <ComponentDemo packageId={normalizedPackageId} componentName={componentName} />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ComponentDetails;
