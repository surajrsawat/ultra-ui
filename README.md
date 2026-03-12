# Ultra UI

A comprehensive, production-ready React component library built with TypeScript, Tailwind CSS, and modern best practices.

[![GitHub](https://img.shields.io/badge/GitHub-surajrsawat/ultra--ui-blue?logo=github)](https://github.com/surajrsawat/ultra-ui)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Components](https://img.shields.io/badge/Components-30%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)
![React](https://img.shields.io/badge/React-18%2B-61dafb)

---

## 🚀 Features

✨ **30+ Production-Ready Components**
- Fully typed with TypeScript
- Accessible (WCAG compliant)
- Lightweight and performant
- Zero external dependencies (except React)
- Customizable with Tailwind CSS

📦 **Monorepo Structure**
- `@ui/primitives` - Core UI components
- `@ui/headless` - Headless hooks
- `@ui/grid-core` - Advanced grid utilities
- `@ui/tailwind-wrappers` - Tailwind-styled variations

🎨 **Component Categories**
- **Layout** - Box, Container, Grid
- **Typography** - Semantic text with 9 variants
- **Controls** - Button, Checkbox, Radio, Switch, Slider, ToggleButton, ButtonGroup
- **Inputs** - Select, Autocomplete
- **Display** - Card, Chip, Badge
- **Feedback** - Alert, Snackbar, ProgressBar
- **Navigation** - Navbar, Tabs, Pagination
- **Surfaces** - Modal, Accordion

⚙️ **Tech Stack**
- React 18+ with TypeScript 5
- Tailwind CSS v3
- Vite for bundling
- pnpm workspaces
- No hardcoded styles - full Tailwind integration

---

## 📦 Installation

### Prerequisites
- Node.js 16+
- pnpm 8+ (`npm install -g pnpm`)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/surajrsawat/ultra-ui.git
cd ultra-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev:example

# Visit http://localhost:5175/
```

---

## 🎯 Usage

### Import Components

```typescript
import {
  Button,
  Card,
  Modal,
  Switch,
  Slider,
  // ... and 25+ more components
} from '@ui/primitives';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <Button onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      {open && (
        <Modal open={open} onClose={() => setOpen(false)} title="Welcome">
          <p>Your content here</p>
        </Modal>
      )}
    </Card>
  );
}
```

### Styled with Tailwind CSS

All components are unstyled by default. Use Tailwind classes:

```tsx
<Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Click Me
</Button>
```

---

## 📚 Component Showcase

**Live Demo:** [Launch Example App](https://project-rztei.vercel.app) 🚀

The example app includes interactive demos of all components organized by category:

- 🎨 **Layout Section** - Responsive grid and container layouts
- 📝 **Typography** - Text variants and semantic headings
- 🔘 **Controls** - Interactive buttons, toggles, inputs
- 💬 **Feedback** - Alerts, notifications, progress indicators
- 🗂️ **Display** - Cards, chips, badges
- 📍 **Navigation** - Tabs, pagination, navbar
- 🪟 **Surfaces** - Modals, accordions

**To run locally:**
```bash
pnpm install
pnpm dev:example
# Visit http://localhost:5175/
```

---

## 🏗️ Project Structure

```
ultra-ui/
├── apps/
│   └── example/                 # Interactive component showcase
│       ├── src/
│       │   ├── App.tsx         # All component demos
│       │   └── main.tsx
│       └── package.json
├── packages/
│   ├── primitives/              # Core UI components (30+)
│   │   ├── src/
│   │   │   ├── types.ts        # Shared types
│   │   │   ├── layout/         # Box, Container, Grid
│   │   │   ├── typography/     # Typography component
│   │   │   ├── controls/       # Buttons, toggles, inputs
│   │   │   ├── inputs/         # Select, Autocomplete
│   │   │   ├── display/        # Card, Chip, Badge
│   │   │   ├── feedback/       # Alert, Snackbar, ProgressBar
│   │   │   ├── navigation/     # Navbar, Tabs, Pagination
│   │   │   ├── surfaces/       # Modal, Accordion
│   │   │   └── index.ts        # Main exports
│   │   └── package.json
│   ├── headless/                # Headless hooks (useToggle)
│   ├── grid-core/               # Advanced grid utilities
│   └── tailwind-wrappers/       # Tailwind-styled variants
├── package.json                 # Root workspace config
├── pnpm-workspace.yaml         # Monorepo config
├── tsconfig.base.json          # Shared TypeScript config
└── README.md                    # This file
```

---

## 🛠️ Development

### Build All Packages

```bash
pnpm build
```

### Build Specific Package

```bash
pnpm --filter @ui/primitives run build
```

### Run Type Checking

```bash
pnpm -r run build
```

### Watch Mode (Example App)

```bash
pnpm dev:example
```

---

## 📖 Component API

### Button

```tsx
<Button
  variant="primary"        // primary | secondary | outline | ghost | danger
  size="md"               // sm | md | lg
  disabled={false}
  onClick={() => {}}
>
  Click Me
</Button>
```

### Modal

```tsx
<Modal
  open={true}
  onClose={() => {}}
  title="Dialog Title"
  size="md"              // sm | md | lg
>
  Modal content here
</Modal>
```

### Accordion

```tsx
<Accordion
  items={[
    { id: '1', title: 'Section 1', content: 'Content 1' },
    { id: '2', title: 'Section 2', content: 'Content 2' },
  ]}
  multiple={true}        // Allow multiple open sections
  openIds={['1']}
  onChange={(ids) => {}}
/>
```

### Switch

```tsx
<Switch
  checked={true}
  onChange={(checked) => {}}
  color="primary"        // primary | secondary | success | danger
  label="Enable feature"
/>
```

### Slider

```tsx
<Slider
  value={50}
  onChange={(value) => {}}
  min={0}
  max={100}
  showValueLabel={true}
/>
```

See [example app](./apps/example/src/App.tsx) for more detailed usage examples.

---

## 🎨 Customization

### Using Tailwind Classes

```tsx
<Button className="bg-gradient-to-r from-purple-500 to-pink-500">
  Gradient Button
</Button>
```

### Inline Styles

```tsx
<Card style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
  Custom styled card
</Card>
```

### TypeScript Props

All components are fully typed:

```tsx
import type { ButtonProps, ModalProps } from '@ui/primitives';

const MyButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} variant="primary" />
);
```

---

## 🚀 Deployment

Deploy the example app to Vercel, Netlify, or GitHub Pages to get a live demo link.

### Vercel (Recommended - 1 minute setup)

1. Push your code to GitHub (already done ✅)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Select your `ultra-ui` repository
4. **Important:** Set Root Directory to `apps/example`
5. Click Deploy
6. Your live demo will be ready at `https://ultra-ui.vercel.app`

```bash
# Or deploy via CLI
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm install -g netlify-cli
pnpm build
netlify deploy --prod --dir apps/example/dist
```

### GitHub Pages

```bash
# Build the example app
pnpm build:example

# Push to gh-pages branch
# Configure repository settings to deploy from `apps/example/dist`
```

---

**Once deployed, update the README's Live Demo link:**
```markdown
**Live Demo:** [Launch Example App](https://your-deployment-url.com)
```

---

## 📝 Type Definitions

All components export TypeScript interfaces:

```tsx
export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  // ... more props
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Bundled with [Vite](https://vitejs.dev)
- Managed with [pnpm](https://pnpm.io)

---

## 📞 Support

- 📖 [Full Documentation](./packages/primitives/README.md)
- 🐛 [Report Issues](https://github.com/surajrsawat/ultra-ui/issues)
- 💬 [Discussions](https://github.com/surajrsawat/ultra-ui/discussions)

---

**Made with ❤️ by [Suraj Sawat](https://github.com/surajrsawat)**

Visit the [GitHub Repository](https://github.com/surajrsawat/ultra-ui) for more information.
