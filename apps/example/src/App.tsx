import React, { useState } from 'react';
import SideNavigation from './components/SideNavigation';
import ComponentDetails from './components/ComponentDetails';
import './App.css';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<string>('primitives');
  const [selectedComponent, setSelectedComponent] = useState<string>('Button');

  const handleSelectComponent = (packageId: string, componentName: string) => {
    setSelectedPackage(packageId);
    setSelectedComponent(componentName);
  };

  return (
    <div className="app-container">
      <SideNavigation
        onSelectComponent={handleSelectComponent}
        selectedPackage={selectedPackage}
        selectedComponent={selectedComponent}
      />
      <ComponentDetails
        packageId={selectedPackage}
        componentName={selectedComponent}
      />
    </div>
  );
}