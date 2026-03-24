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
} from '@ui/primitives';
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
  '@ui/primitives': '@ui/Primitives',
  '@ui/headless': '@ui/Headless',
  '@ui/grid-core': '@ui/Grid-Core',
  '@ui/tailwind-wrappers': '@ui/Tailwind-Wrappers',
};

const componentInfo: Record<string, Record<string, ComponentMeta>> = {
  '@ui/Primitives': {
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
  '@ui/Headless': {
    useDropdown: { description: 'Hook for dropdown state management.', status: 'stable' },
    useTabs: { description: 'Hook for tab navigation state.', status: 'stable' },
    useAccordion: { description: 'Hook for accordion open state.', status: 'stable' },
    useModal: { description: 'Hook for modal visibility.', status: 'stable' },
    useToast: { description: 'Hook for toast notifications.', status: 'stable' },
    usePagination: { description: 'Hook for pagination logic.', status: 'stable' },
    useToggle: { description: 'Hook for boolean toggle state.', status: 'stable' },
    useForm: { description: 'Hook for form state management.', status: 'stable' },
  },
  '@ui/Grid-Core': {
    Grid: { description: 'CSS Grid layout component.', status: 'stable' },
    Box: { description: 'Generic layout container.', status: 'stable' },
    Container: { description: 'Responsive container wrapper.', status: 'stable' },
    Flex: { description: 'Flexbox layout component.', status: 'stable' },
    Spacer: { description: 'Spacing utility component.', status: 'stable' },
    Divider: { description: 'Visual separator component.', status: 'stable' },
    Stack: { description: 'Vertical or horizontal stack layout.', status: 'stable' },
  },
  '@ui/Tailwind-Wrappers': {
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

const ComponentDemo: React.FC<{ componentName: string }> = ({ componentName }) => {
  const [buttonClicks, setButtonClicks] = useState(0);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState<string | number>('1');
  const [enabled, setEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chips, setChips] = useState(['React', 'TypeScript', 'UI']);

  const accordionItems = [
    { id: 1, title: 'Section 1', content: 'This is the first accordion section.' },
    { id: 2, title: 'Section 2', content: 'This is the second accordion section.' },
    { id: 3, title: 'Section 3', content: 'This is the third accordion section.' },
  ];

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

              {normalizedPackageId === '@ui/Primitives' && (
                <div className="example-demo-section">
                  <h2>Interactive Demo</h2>
                  <div className="demo-section">
                    <ComponentDemo componentName={componentName} />
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