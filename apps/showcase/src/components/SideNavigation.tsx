import React, { useState } from 'react';
import './SideNavigation.css';

export type UltraUiVersion = '1.0.0' | '1.1.0';

interface PackageCatalogEntry {
  name: string;
  icon: string;
  components: string[];
}

export const packageCatalogByVersion: Record<UltraUiVersion, PackageCatalogEntry[]> = {
  '1.0.0': [
    {
      name: '@ultra-ui/Primitives',
      icon: '🎨',
      components: ['Button', 'Checkbox', 'Radio', 'Switch', 'Card', 'Badge', 'Chip', 'Alert', 'Modal', 'Accordion']
    },
    {
      name: '@ultra-ui/Headless',
      icon: '🧠',
      components: ['useToggle', 'useDisclosure', 'useModal', 'useAccordion', 'useTabs', 'usePagination', 'useControllableState', 'useMenu', 'useSelect', 'useCombobox']
    },
    {
      name: '@ultra-ui/Grid-Core',
      icon: '📐',
      components: ['Grid', 'Box', 'Container', 'Flex', 'Spacer', 'Divider', 'Stack']
    },
    {
      name: '@ultra-ui/Tailwind-Wrappers',
      icon: '🎭',
      components: ['TButton', 'TCard', 'TInput', 'TBadge', 'TAlert', 'TModal', 'TAccordion']
    },
    {
      name: '@ultra-ui/Ultra-Table',
      icon: '🧮',
      components: ['Layout', 'Columns', 'Rows', 'Editing', 'Form Components', 'Save Flow', 'Column Management', 'Pagination']
    }
  ],
  '1.1.0': [
    {
      name: '@ultra-ui/Primitives',
      icon: '🎨',
      components: ['Button', 'Checkbox', 'Radio', 'Switch', 'Card', 'Badge', 'Chip', 'Alert', 'Modal', 'Accordion']
    },
    {
      name: '@ultra-ui/Headless',
      icon: '🧠',
      components: ['useToggle', 'useDisclosure', 'useModal', 'useAccordion', 'useTabs', 'usePagination', 'useControllableState', 'useMenu', 'useSelect', 'useCombobox', 'useTypeahead', 'useListbox']
    },
    {
      name: '@ultra-ui/Grid-Core',
      icon: '📐',
      components: ['Grid', 'Box', 'Container', 'Flex', 'Spacer', 'Divider', 'Stack']
    },
    {
      name: '@ultra-ui/Tailwind-Wrappers',
      icon: '🎭',
      components: ['TButton', 'TCard', 'TInput', 'TBadge', 'TAlert', 'TModal', 'TAccordion']
    },
    {
      name: '@ultra-ui/Ultra-Table',
      icon: '🧮',
      components: ['Layout', 'Columns', 'Rows', 'Editing', 'Form Components', 'Save Flow', 'Column Management', 'Pagination']
    }
  ]
};

const packageVersions: UltraUiVersion[] = ['1.0.0', '1.1.0'];

interface SideNavigationProps {
  onSelectComponent: (packageId: string, componentName: string) => void;
  selectedPackage: string;
  selectedComponent: string;
  selectedVersion: UltraUiVersion;
  onVersionChange: (version: UltraUiVersion) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  onSelectComponent,
  selectedPackage,
  selectedComponent,
  selectedVersion,
  onVersionChange,
  isOpen = false,
  onClose,
}) => {
  const [expandedPackages, setExpandedPackages] = useState<Set<string>>(
    new Set(['@ultra-ui/Primitives'])
  );
  const [searchQuery, setSearchQuery] = useState('');
  const versionedPackages = packageCatalogByVersion[selectedVersion];

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
    <>
      {isOpen && (
        <div className="nav-overlay" onClick={onClose} aria-hidden="true" />
      )}
      <aside className={`side-navigation${isOpen ? ' mobile-open' : ''}`}>
        <div className="nav-header">
          <div className="nav-header-top">
            <div>
              <h1>📚 Ultra UI</h1>
              <p>Component Library</p>
            </div>
            {onClose && (
              <button className="nav-close-btn" onClick={onClose} aria-label="Close navigation menu">
                ✕
              </button>
            )}
          </div>
        <div className="version-switcher">
          <label htmlFor="ultra-version-select" className="version-label">Version</label>
          <select
            id="ultra-version-select"
            className="version-select"
            value={selectedVersion}
            onChange={(event) => onVersionChange(event.target.value as UltraUiVersion)}
          >
            {packageVersions.map((version) => (
              <option key={version} value={version}>v{version}</option>
            ))}
          </select>
        </div>
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

      <nav className="nav-quick-links">
        <button
          className={`quick-link-item ${selectedPackage === 'getting-started' ? 'active' : ''}`}
          onClick={() => onSelectComponent('getting-started', 'Getting Started')}
        >
          <span className="quick-link-icon">🚀</span>
          <span className="quick-link-label">Getting Started</span>
        </button>
      </nav>

      <nav className="nav-packages">
        {versionedPackages.map((pkg) => (
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
        <p>Ultra UI v{selectedVersion}</p>
      </div>
    </aside>
    </>
  );
};

export default SideNavigation;
