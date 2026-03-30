import React, { useState } from 'react';
import SideNavigation, { packageCatalogByVersion, type UltraUiVersion } from './components/SideNavigation';
import ComponentDetails from './components/ComponentDetails';
import GettingStarted from './components/GettingStarted';
import './App.css';

export default function App() {
  const [selectedVersion, setSelectedVersion] = useState<UltraUiVersion>('1.1.0');
  const [selectedPackage, setSelectedPackage] = useState<string>('@ultra-ui/Primitives');
  const [selectedComponent, setSelectedComponent] = useState<string>('Button');

  const handleSelectComponent = (packageId: string, componentName: string) => {
    setSelectedPackage(packageId);
    setSelectedComponent(componentName);
  };

  const handleVersionChange = (version: UltraUiVersion) => {
    if (selectedPackage === 'getting-started') {
      setSelectedVersion(version);
      return;
    }
    const nextPackages = packageCatalogByVersion[version];
    const nextPackage = nextPackages.find((pkg) => pkg.name === selectedPackage) ?? nextPackages[0];
    const nextComponent = nextPackage.components.includes(selectedComponent)
      ? selectedComponent
      : nextPackage.components[0];

    setSelectedVersion(version);
    setSelectedPackage(nextPackage.name);
    setSelectedComponent(nextComponent);
  };

  return (
    <div className="app-container">
      <SideNavigation
        onSelectComponent={handleSelectComponent}
        selectedPackage={selectedPackage}
        selectedComponent={selectedComponent}
        selectedVersion={selectedVersion}
        onVersionChange={handleVersionChange}
      />
      {selectedPackage === 'getting-started' ? (
        <GettingStarted />
      ) : (
        <ComponentDetails
          packageId={selectedPackage}
          componentName={selectedComponent}
        />
      )}
    </div>
  );
}