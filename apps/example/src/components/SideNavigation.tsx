import React, { useState } from 'react';
import './SideNavigation.css';

const packages = [
  {
    name: '@ui/primitives',
    icon: '🎨',
    components: ['Button', 'Checkbox', 'Radio', 'Switch', 'Card', 'Badge', 'Chip', 'Alert', 'Modal', 'Accordion']
  },
  {
    name: '@ui/headless',
    icon: '🧠',
    components: ['useDropdown', 'useTabs', 'useAccordion', 'useModal', 'useToast', 'usePagination', 'useToggle', 'useForm']
  },
  {
    name: '@ui/grid-core',
    icon: '📐',
    components: ['Grid', 'Box', 'Container', 'Flex', 'Spacer', 'Divider', 'Stack']
  },
  {
    name: '@ui/tailwind-wrappers',
    icon: '🎭',
    components: ['TButton', 'TCard', 'TInput', 'TBadge', 'TAlert', 'TModal', 'TAccordion']
  }
];

interface SideNavigationProps {
  onSelectComponent: (packageId: string, componentName: string) => void;
  selectedPackage: string;
  selectedComponent: string;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  onSelectComponent,
  selectedPackage,
  selectedComponent,
}) => {
  const [expandedPackages, setExpandedPackages] = useState<Set<string>>(
    new Set(['@ui/primitives'])
  );
  const [searchQuery, setSearchQuery] = useState('');

  const togglePackage = (packageName: string) => {
    const newExpanded = new Set(expandedPackages);
    if (newExpanded.has(packageName)) {
      newExpanded.delete(packageName);
    } else {
      newExpanded.add(packageName);
    }
    setExpandedPackages(newExpanded);
  };

  return (
    <aside className="side-navigation">
      <div className="nav-header">
        <h1>📚 Ultra UI</h1>
        <p>Component Library</p>
      </div>

      <div className="nav-search">
        <input
          type="text"
          placeholder="Search components..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <nav className="nav-packages">
        {packages.map((pkg) => (
          <div key={pkg.name} className="package-section">
            <button
              className={`package-header ${expandedPackages.has(pkg.name) ? 'expanded' : ''}`}
              onClick={() => togglePackage(pkg.name)}
            >
              <span className="package-icon">{pkg.icon}</span>
              <div className="package-info">
                <span className="package-name">{pkg.name.split('/')[1]}</span>
              </div>
              <span className="expand-icon">
                {expandedPackages.has(pkg.name) ? '▼' : '▶'}
              </span>
            </button>

            {expandedPackages.has(pkg.name) && (
              <div className="components-list">
                {pkg.components
                  .filter((comp) =>
                    comp.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((component) => (
                    <button
                      key={component}
                      className={`component-item ${
                        selectedPackage === pkg.name && selectedComponent === component
                          ? 'active'
                          : ''
                      }`}
                      onClick={() => onSelectComponent(pkg.name, component)}
                      title={component}
                    >
                      <span className="component-bullet">•</span>
                      <span className="component-name">{component}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="nav-footer">
        <p>Ultra UI v1.0.0</p>
      </div>
    </aside>
  );
};

export default SideNavigation;