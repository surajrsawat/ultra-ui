// SideNavigation.tsx
import React from 'react';
import './SideNavigation.css';

const SideNavigation = () => {
  return (
    <div className="side-navigation">
      <h3>Primitives</h3>
      <div className="expandable">
        <h4>Component 1</h4>
        <p>Description of Component 1</p>
      </div>
      <div className="expandable">
        <h4>Component 2</h4>
        <p>Description of Component 2</p>
      </div>
      {/* More components... */}
    </div>
  );
};

export default SideNavigation;