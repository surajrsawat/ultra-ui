export interface ShowcaseDocItem {
	name: string;
	description: string;
}

export const headlessDocs: ShowcaseDocItem[] = [
	{ name: 'useToggle', description: 'A hook that toggles between two boolean states.' },
	{ name: 'useDisclosure', description: 'A hook for open, close, and toggle state management.' },
	{ name: 'useModal', description: 'A modal-focused disclosure hook with backdrop and escape handlers.' },
	{ name: 'useAccordion', description: 'A hook for single or multiple open accordion section state.' },
	{ name: 'useTabs', description: 'A hook that manages active tab state and keyboard-style navigation helpers.' },
	{ name: 'usePagination', description: 'A hook that computes page ranges and page navigation helpers.' },
	{ name: 'useControllableState', description: 'A utility hook for controlled and uncontrolled component state.' },
	{ name: 'useMenu', description: 'A keyboard-friendly hook for menu open and highlight interactions.' },
	{ name: 'useSelect', description: 'A hook for custom select state with keyboard navigation.' },
	{ name: 'useCombobox', description: 'A hook for combobox filtering and keyboard selection.' },
	{ name: 'useTypeahead', description: 'A hook for buffered typeahead matching over option labels.' },
	{ name: 'useListbox', description: 'A hook for listbox selection with keyboard and typeahead interactions.' },
];