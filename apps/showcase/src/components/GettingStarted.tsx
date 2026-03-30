import React from 'react';
import './GettingStarted.css';

const GettingStarted: React.FC = () => {
  return (
    <div className="getting-started">
      <div className="gs-header">
        <h1>🚀 Getting Started</h1>
        <p className="gs-subtitle">
          Everything you need to integrate Ultra UI into your project
        </p>
      </div>

      <div className="gs-content">
        {/* Prerequisites */}
        <section className="gs-section">
          <h2>Prerequisites</h2>
          <p>
            Before installing Ultra UI, make sure your development environment
            meets the following minimum requirements:
          </p>
          <div className="gs-table-wrapper">
          <table className="gs-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Minimum Version</th>
                <th>Recommended</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Node.js</td>
                <td>18.0.0</td>
                <td>20.x LTS or later</td>
              </tr>
              <tr>
                <td>npm</td>
                <td>9.0.0</td>
                <td>10.x or later</td>
              </tr>
              <tr>
                <td>yarn</td>
                <td>1.22.0</td>
                <td>3.x (Berry) or later</td>
              </tr>
              <tr>
                <td>pnpm</td>
                <td>8.0.0</td>
                <td>9.x or later</td>
              </tr>
            </tbody>
          </table>
          </div>
          <p className="gs-note">
            ℹ️ Check your Node.js version by running{' '}
            <code>node --version</code> in your terminal.
          </p>
        </section>

        {/* Available Packages */}
        <section className="gs-section">
          <h2>Installation</h2>
          <p>
            Ultra UI is a modular library — install only the packages you need.
          </p>

          <h3>Available Packages</h3>
          <div className="gs-packages-grid">
            <div className="gs-package-card">
              <span className="gs-package-icon">🎨</span>
              <strong>@ultra-ui/primitives</strong>
              <p>Core UI components (Button, Modal, Card, Badge, and more)</p>
            </div>
            <div className="gs-package-card">
              <span className="gs-package-icon">🧠</span>
              <strong>@ultra-ui/headless</strong>
              <p>Headless hooks for building fully custom UI logic</p>
            </div>
            <div className="gs-package-card">
              <span className="gs-package-icon">📐</span>
              <strong>@ultra-ui/grid-core</strong>
              <p>Flexible grid and layout utility components</p>
            </div>
            <div className="gs-package-card">
              <span className="gs-package-icon">🎭</span>
              <strong>@ultra-ui/tailwind-wrappers</strong>
              <p>Pre-styled Tailwind CSS component wrappers</p>
            </div>
          </div>

          <h3>Using npm</h3>
          <pre className="gs-code">
            <code>{`# Install core components
npm install @ultra-ui/primitives

# Install headless hooks
npm install @ultra-ui/headless

# Install grid utilities
npm install @ultra-ui/grid-core

# Install Tailwind wrappers
npm install @ultra-ui/tailwind-wrappers

# Or install all packages at once
npm install @ultra-ui/primitives @ultra-ui/headless @ultra-ui/grid-core @ultra-ui/tailwind-wrappers`}</code>
          </pre>

          <h3>Using yarn</h3>
          <pre className="gs-code">
            <code>{`yarn add @ultra-ui/primitives
yarn add @ultra-ui/headless
yarn add @ultra-ui/grid-core
yarn add @ultra-ui/tailwind-wrappers`}</code>
          </pre>

          <h3>Using pnpm</h3>
          <pre className="gs-code">
            <code>{`pnpm add @ultra-ui/primitives
pnpm add @ultra-ui/headless
pnpm add @ultra-ui/grid-core
pnpm add @ultra-ui/tailwind-wrappers`}</code>
          </pre>
        </section>

        {/* Peer Dependencies */}
        <section className="gs-section">
          <h2>Peer Dependencies</h2>
          <p>
            Ultra UI requires the following peer dependencies to be present in
            your project:
          </p>
          <pre className="gs-code">
            <code>{`npm install react@^18 react-dom@^18`}</code>
          </pre>
          <p className="gs-note">
            ⚠️ Ultra UI targets React 18. Ensure <code>react</code> and{' '}
            <code>react-dom</code> version 18 or later are installed in your
            project.
          </p>
        </section>

        {/* Usage */}
        <section className="gs-section">
          <h2>Usage</h2>

          <h3>Basic Component Usage</h3>
          <pre className="gs-code">
            <code>{`import { Button } from '@ultra-ui/primitives';

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}`}</code>
          </pre>

          <h3>Using Headless Hooks</h3>
          <pre className="gs-code">
            <code>{`import { useToggle } from '@ultra-ui/headless';

function ToggleExample() {
  const [isOn, toggle] = useToggle(false);

  return (
    <div>
      <p>The toggle is {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}`}</code>
          </pre>

          <h3>Using Grid Components</h3>
          <pre className="gs-code">
            <code>{`import { Grid, Box, Flex } from '@ultra-ui/grid-core';

function Layout() {
  return (
    <Grid columns={3} gap="md">
      <Box padding="lg">Item 1</Box>
      <Box padding="lg">Item 2</Box>
      <Box padding="lg">Item 3</Box>
    </Grid>
  );
}`}</code>
          </pre>

          <h3>Using Tailwind Wrappers</h3>
          <pre className="gs-code">
            <code>{`import { TButton, TCard } from '@ultra-ui/tailwind-wrappers';

function TailwindExample() {
  return (
    <TCard>
      <TButton variant="primary">Tailwind Styled Button</TButton>
    </TCard>
  );
}`}</code>
          </pre>
        </section>

        {/* TypeScript */}
        <section className="gs-section">
          <h2>TypeScript Support</h2>
          <p>
            Ultra UI is written entirely in TypeScript and ships with full type
            definitions. No additional <code>@types</code> packages are
            required.
          </p>
          <pre className="gs-code">
            <code>{`import { Button } from '@ultra-ui/primitives';
import type { ButtonProps } from '@ultra-ui/primitives';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};`}</code>
          </pre>
          <p className="gs-note">
            ℹ️ Ensure your <code>tsconfig.json</code> sets{' '}
            <code>"moduleResolution": "bundler"</code> or{' '}
            <code>"moduleResolution": "node16"</code> for proper ESM module
            resolution.
          </p>
        </section>

        {/* Best Practices */}
        <section className="gs-section">
          <h2>Best Practices &amp; Recommendations</h2>
          <ul className="gs-list">
            <li>
              <strong>🌲 Tree-shaking:</strong> Import components individually
              to take full advantage of tree-shaking and keep your bundle small.
              <pre className="gs-code gs-code-sm">
                <code>{`// ✅ Recommended — imports only Button
import { Button } from '@ultra-ui/primitives';

// ⚠️ Avoid — may prevent tree-shaking
import * as UltraUI from '@ultra-ui/primitives';`}</code>
              </pre>
            </li>
            <li>
              <strong>🎨 CSS Reset:</strong> Ultra UI components respect your
              application's existing styles. Including a CSS reset (e.g.,{' '}
              <code>normalize.css</code>) ensures consistent rendering across
              browsers.
            </li>
            <li>
              <strong>⚡ pnpm:</strong> For faster installs and efficient disk
              usage — especially in monorepo setups — we recommend pnpm as your
              package manager.
            </li>
            <li>
              <strong>📦 Version pinning:</strong> Pin Ultra UI to a specific
              version in production to avoid unexpected breaking changes.
              <pre className="gs-code gs-code-sm">
                <code>{`// package.json
"dependencies": {
  "@ultra-ui/primitives": "1.1.0"  // ✅ Pinned version
}`}</code>
              </pre>
            </li>
            <li>
              <strong>🔧 TypeScript strict mode:</strong> Enable{' '}
              <code>"strict": true</code> in your <code>tsconfig.json</code>{' '}
              for the best developer experience and to catch type errors early.
            </li>
          </ul>
        </section>

        {/* Troubleshooting */}
        <section className="gs-section">
          <h2>Troubleshooting</h2>
          <div className="gs-troubleshooting">
            <div className="gs-issue">
              <h4>Module not found</h4>
              <p>
                If you see a "Module not found" error, ensure the package is
                installed and your <code>node_modules</code> directory is
                up-to-date. Try running <code>npm install</code> (or{' '}
                <code>yarn</code> / <code>pnpm install</code>) again.
              </p>
            </div>
            <div className="gs-issue">
              <h4>TypeScript errors</h4>
              <p>
                Ensure your <code>tsconfig.json</code> includes{' '}
                <code>"moduleResolution": "bundler"</code> or{' '}
                <code>"moduleResolution": "node16"</code> for proper ESM
                resolution.
              </p>
            </div>
            <div className="gs-issue">
              <h4>Peer dependency warnings</h4>
              <p>
                Install the required peer dependencies (
                <code>react</code> and <code>react-dom</code> v18+) to resolve
                peer dependency warnings shown by your package manager.
              </p>
            </div>
            <div className="gs-issue">
              <h4>Styles not applying</h4>
              <p>
                If component styles are not applying, check that you haven't
                accidentally overridden global CSS variables or reset
                stylesheets that Ultra UI depends on.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="gs-section">
          <h2>Additional Resources</h2>
          <ul className="gs-resources">
            <li>
              📖 Browse the full component library using the side navigation
            </li>
            <li>
              🐛 Report issues on{' '}
              <a
                href="https://github.com/surajrsawat/ultra-ui/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Issues
              </a>
            </li>
            <li>
              🤝 Contribute to the project by reading the{' '}
              <a
                href="https://github.com/surajrsawat/ultra-ui/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contributing Guide
              </a>
            </li>
            <li>
              📋 View the full{' '}
              <a
                href="https://github.com/surajrsawat/ultra-ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                README
              </a>{' '}
              on GitHub
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default GettingStarted;
