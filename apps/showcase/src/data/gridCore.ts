export interface ShowcaseDocItem {
	name: string;
	description: string;
}

export const gridCoreDocs: ShowcaseDocItem[] = [
	{ name: 'Grid', description: 'A component that implements a grid layout.' },
	{ name: 'Box', description: 'A simple container for layout.' },
	{ name: 'Container', description: 'A responsive fixed-width container.' },
	{ name: 'Flex', description: 'A component that uses flexbox layout.' },
	{ name: 'Spacer', description: 'A component that provides space between elements.' },
	{ name: 'Divider', description: 'A component that visually separates content.' },
	{ name: 'Stack', description: 'A layout component for stacking items vertically.' },
];