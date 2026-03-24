export interface ShowcaseDocItem {
	name: string;
	description: string;
}

export const primitiveDocs: ShowcaseDocItem[] = [
	{ name: 'Button', description: 'A clickable component that triggers an action.' },
	{ name: 'Checkbox', description: 'A component that allows users to select one or more options from a set.' },
	{ name: 'Radio', description: 'A component for selecting one option from a set.' },
	{ name: 'Switch', description: 'A toggle component for enabling or disabling a feature.' },
	{ name: 'Card', description: 'A container that encapsulates content and actions.' },
	{ name: 'Badge', description: 'A small component that displays a status or count.' },
	{ name: 'Chip', description: 'A component representing an input, choice, or action.' },
	{ name: 'Alert', description: 'A message that informs the user about a system status.' },
	{ name: 'Modal', description: 'A dialog that focuses user attention on important content.' },
	{ name: 'Accordion', description: 'A component that expands to reveal additional content.' },
];