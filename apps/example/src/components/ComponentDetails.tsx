import React from 'react';
import './ComponentDetails.css';

interface ComponentDetailsProps {
  packageId: string;
  componentName: string;
}

const ComponentDetails: React.FC<ComponentDetailsProps> = ({
  packageId,
  componentName,
}) => {
  const componentInfo: Record<string, Record<string, any>> = {
    '@ultra-ui/primitives': {
      Button: {
        description: 'Interactive button component with multiple variants and sizes',
        props: [
          { name: 'variant', type: 'string', default: 'primary' },
          { name: 'size', type: 'string', default: 'md' },
          { name: 'disabled', type: 'boolean', default: 'false' },
          { name: 'onClick', type: 'function', required: true }
        ],
        example: '<Button variant="primary">Click me</Button>',
        status: 'stable'
      },
      Checkbox: {
        description: 'Checkbox input control for selections',
        props: [
          { name: 'checked', type: 'boolean', default: 'false' },
          { name: 'onChange', type: 'function', required: true },
          { name: 'label', type: 'string' }
        ],
        example: '<Checkbox checked={isChecked} onChange={handleChange} />',
        status: 'stable'
      },
      Radio: {
        description: 'Radio button selection component',
        props: [
          { name: 'name', type: 'string', required: true },
          { name: 'value', type: 'string', required: true },
          { name: 'checked', type: 'boolean', default: 'false' }
        ],
        example: '<Radio name="option" value="1" />',
        status: 'stable'
      },
      Switch: {
        description: 'Toggle switch component',
        props: [
          { name: 'checked', type: 'boolean', default: 'false' },
          { name: 'onChange', type: 'function', required: true }
        ],
        example: '<Switch checked={enabled} onChange={setEnabled} />',
        status: 'stable'
      },
      Card: {
        description: 'Container component for grouping content',
        props: [
          { name: 'title', type: 'string' },
          { name: 'children', type: 'ReactNode', required: true }
        ],
        example: '<Card title="Card Title">Content</Card>',
        status: 'stable'
      },
      Badge: {
        description: 'Small status indicator component',
        props: [
          { name: 'variant', type: 'string', default: 'primary' },
          { name: 'children', type: 'ReactNode', required: true }
        ],
        example: '<Badge variant="success">Active</Badge>',
        status: 'stable'
      },
      Chip: {
        description: 'Compact component for tags and selections',
        props: [
          { name: 'label', type: 'string', required: true },
          { name: 'onDelete', type: 'function' }
        ],
        example: '<Chip label="JavaScript" />',
        status: 'stable'
      },
      Alert: {
        description: 'Alert message component for notifications',
        props: [
          { name: 'severity', type: 'string', default: 'info' },
          { name: 'children', type: 'ReactNode', required: true }
        ],
        example: '<Alert severity="success">Success!</Alert>',
        status: 'stable'
      },
      Modal: {
        description: 'Dialog modal for focused interactions',
        props: [
          { name: 'open', type: 'boolean', required: true },
          { name: 'onClose', type: 'function', required: true },
          { name: 'children', type: 'ReactNode', required: true }
        ],
        example: '<Modal open={isOpen} onClose={closeModal}>Content</Modal>',
        status: 'stable'
      },
      Accordion: {
        description: 'Collapsible content sections',
        props: [
          { name: 'items', type: 'Array', required: true },
          { name: 'allowMultiple', type: 'boolean', default: 'false' }
        ],
        example: '<Accordion items={items} />',
        status: 'stable'
      }
    },
    '@ultra-ui/headless': {
      useDropdown: { description: 'Hook for dropdown state management', status: 'stable' },
      useTabs: { description: 'Hook for tab navigation', status: 'stable' },
      useAccordion: { description: 'Hook for accordion state', status: 'stable' },
      useModal: { description: 'Hook for modal management', status: 'stable' },
      useToast: { description: 'Hook for toast notifications', status: 'stable' },
      usePagination: { description: 'Hook for pagination logic', status: 'stable' },
      useToggle: { description: 'Hook for boolean state toggle', status: 'stable' },
      useForm: { description: 'Hook for form state management', status: 'stable' }
    },
    '@ultra-ui/grid-core': {
      Grid: { description: 'CSS Grid layout component', status: 'stable' },
      Box: { description: 'Generic layout container', status: 'stable' },
      Container: { description: 'Responsive container', status: 'stable' },
      Flex: { description: 'Flexbox layout component', status: 'stable' },
      Spacer: { description: 'Spacing utility component', status: 'stable' },
      Divider: { description: 'Visual separator component', status: 'stable' },
      Stack: { description: 'Stack layout component', status: 'stable' }
    },
    '@ultra-ui/tailwind-wrappers': {
      TButton: { description: 'Tailwind styled button', status: 'stable' },
      TCard: { description: 'Tailwind styled card', status: 'stable' },
      TInput: { description: 'Tailwind styled input', status: 'stable' },
      TBadge: { description: 'Tailwind styled badge', status: 'stable' },
      TAlert: { description: 'Tailwind styled alert', status: 'stable' },
      TModal: { description: 'Tailwind styled modal', status: 'stable' },
      TAccordion: { description: 'Tailwind styled accordion', status: 'stable' }
    }
  };

  const component = componentInfo[packageId]?.[componentName];

  if (!component) {
    return (
      <div className="component-details">
        <div className="empty-state">
          <p>Select a component to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="component-details">
      <div className="details-header">
        <div className="component-title-section">
          <h1>{componentName}</h1>
          <span className="package-badge">{packageId}</span>
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
                {component.props.map((prop: any, index: number) => (
                  <tr key={index}>
                    <td>{prop.name}</td>
                    <td>{prop.type}</td>
                    <td>{prop.default || '-'}</td>
                    <td>{prop.required ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {component.example && (
          <section className="section">
            <h2>Example</h2>
            <pre className="code-block">{component.example}</pre>
          </section>
        )}
      </div>
    </div>
  );
};

export default ComponentDetails;