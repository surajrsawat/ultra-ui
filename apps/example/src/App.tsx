import React, { useState } from 'react';
import {
  // Layout
  Box,
  Container,
  Grid,
  // Typography
  Typography,
  // Controls
  Button,
  ButtonGroup,
  Checkbox,
  Radio,
  Switch,
  Slider,
  ToggleButton,
  // Inputs
  Select,
  Autocomplete,
  // Display
  Chip,
  Badge,
  Card,
  // Feedback
  Alert,
  Snackbar,
  ProgressBar,
  // Navigation
  Navbar,
  NavItem,
  NavTabs,
  Pagination,
  // Surfaces
  Modal,
  Accordion,
} from '@ui/primitives';

export default function App() {
  const [buttonGroupValue, setButtonGroupValue] = useState(1);
  const [checkbox, setCheckbox] = useState(false);
  const [radio, setRadio] = useState('option1');
  const [toggle, setToggle] = useState(false);
  const [slider, setSlider] = useState(50);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [selectValue, setSelectValue] = useState('apple');
  const [activeTab, setActiveTab] = useState('tab1');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [accordion, setAccordion] = useState(['section1']);

  const accordionItems = [
    {
      id: 'section1',
      title: 'Introduction',
      content: 'Ultra UI is a comprehensive React component library built with TypeScript.',
    },
    {
      id: 'section2',
      title: 'Features',
      content: 'Fully typed, accessible, lightweight, and production-ready components.',
    },
    {
      id: 'section3',
      title: 'Getting Started',
      content: 'Install @ui/primitives and start building beautiful UIs.',
    },
  ];

  const tabs = [
    { id: 'tab1', label: 'Overview', content: 'Component library overview' },
    { id: 'tab2', label: 'Documentation', content: 'Full API documentation' },
    { id: 'tab3', label: 'Examples', content: 'Real-world examples' },
  ];

  return (
    <Box style={{ padding: '2rem', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Header */}
      <Navbar>
        <NavItem label="Ultra UI" />
        <NavItem label="Components" />
        <NavItem label="Docs" />
      </Navbar>

      {/* Typography Section */}
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h1" style={{ marginBottom: '1rem' }}>Ultra UI Component Library</Typography>
        <Typography variant="body" style={{ color: '#666', marginBottom: '2rem' }}>
          A complete showcase of all production-ready components
        </Typography>
      </Container>

      {/* Layout Section */}
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Layout Components</Typography>
        
        <Card>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Box & Container & Grid</Typography>
            <Grid style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              <Box style={{ backgroundColor: '#e0e7ff', padding: '1rem', borderRadius: '4px' }}>Box 1</Box>
              <Box style={{ backgroundColor: '#dbeafe', padding: '1rem', borderRadius: '4px' }}>Box 2</Box>
              <Box style={{ backgroundColor: '#dcfce7', padding: '1rem', borderRadius: '4px' }}>Box 3</Box>
            </Grid>
          </Box>
        </Card>
      </Container>

      {/* Typography Section */}
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Typography</Typography>
        <Card>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="body">Body text - This is regular body text styling</Typography>
            <Typography variant="caption">Caption text</Typography>
            <Typography variant="overline">Overline text</Typography>
          </Box>
        </Card>
      </Container>

      {/* Controls Section */}
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Controls</Typography>
        
        {/* Buttons */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Buttons</Typography>
            <Box style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
            </Box>
          </Box>
        </Card>

        {/* Button Group */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Button Group</Typography>
            <ButtonGroup exclusive value={buttonGroupValue} onChange={setButtonGroupValue}>
              <Button value={1}>Option 1</Button>
              <Button value={2}>Option 2</Button>
              <Button value={3}>Option 3</Button>
            </ButtonGroup>
          </Box>
        </Card>

        {/* Checkbox */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Checkbox</Typography>
            <Checkbox
              label="Accept terms and conditions"
              checked={checkbox}
              onChange={setCheckbox}
            />
          </Box>
        </Card>

        {/* Radio */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Radio</Typography>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Radio
                label="Option 1"
                name="options"
                value="option1"
                checked={radio === 'option1'}
                onChange={() => setRadio('option1')}
              />
              <Radio
                label="Option 2"
                name="options"
                value="option2"
                checked={radio === 'option2'}
                onChange={() => setRadio('option2')}
              />
            </Box>
          </Box>
        </Card>

        {/* Switch */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Switch</Typography>
            <Switch
              label="Enable notifications"
              checked={toggle}
              onChange={setToggle}
              color="primary"
            />
          </Box>
        </Card>

        {/* Slider */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Slider</Typography>
            <Slider
              value={slider}
              onChange={setSlider}
              showValueLabel
            />
          </Box>
        </Card>

        {/* Toggle Button */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Toggle Button</Typography>
            <ToggleButton
              active={toggleBtn}
              onChange={setToggleBtn}
            >
              {toggleBtn ? 'Active' : 'Inactive'}
            </ToggleButton>
          </Box>
        </Card>
      </Container>

      {/* Inputs Section */}
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Inputs</Typography>
        
        {/* Select */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Select</Typography>
            <Select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={[
                { value: 'apple', label: 'Apple' },
                { value: 'banana', label: 'Banana' },
                { value: 'orange', label: 'Orange' },
              ]}
              label="Choose fruit"
            />
          </Box>
        </Card>

        {/* Autocomplete */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Autocomplete</Typography>
            <Autocomplete
              placeholder="Search..."
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'angular', label: 'Angular' },
              ]}
            />
          </Box>
        </Card>
      </Container>

      {/* Display Section */}
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Display Components</Typography>
        
        {/* Chips */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Chips</Typography>
            <Box style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Chip label="React" color="primary" />
              <Chip label="TypeScript" color="secondary" />
              <Chip label="Tailwind" color="success" />
              <Chip label="Vite" color="warning" />
            </Box>
          </Box>
        </Card>

        {/* Badges */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Badges</Typography>
            <Box style={{ display: 'flex', gap: '2rem' }}>
              <Box style={{ position: 'relative', display: 'inline-block' }}>
                <span>📧</span>
                <Badge count={5} position="top-right" />
              </Box>
              <Box style={{ position: 'relative', display: 'inline-block' }}>
                <span>🛍️</span>
                <Badge count={99} position="top-right" />
              </Box>
            </Box>
          </Box>
        </Card>
      </Container>

      {/* Feedback Section */}
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Feedback Components</Typography>
        
        {/* Alerts */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Alerts</Typography>
            <Alert variant="success" title="Success" message="Operation completed successfully!" style={{ marginBottom: '1rem' }} />
            <Alert variant="warning" title="Warning" message="Please review before proceeding" style={{ marginBottom: '1rem' }} />
            <Alert variant="error" title="Error" message="Something went wrong" style={{ marginBottom: '1rem' }} />
            <Alert variant="info" title="Info" message="Here's some useful information" />
          </Box>
        </Card>

        {/* Progress Bar */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Progress Bar</Typography>
            <ProgressBar value={30} style={{ marginBottom: '1rem' }} />
            <ProgressBar value={60} color="primary" style={{ marginBottom: '1rem' }} />
            <ProgressBar value={100} color="success" animated />
          </Box>
        </Card>

        {/* Snackbar */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Snackbar</Typography>
            <Button onClick={() => setSnackbar(true)}>Show Notification</Button>
            {snackbar && (
              <Snackbar
                message="This is a notification message"
                duration={3000}
                onClose={() => setSnackbar(false)}
              />
            )}
          </Box>
        </Card>
      </Container>

      {/* Navigation Section */}
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Navigation</Typography>
        
        {/* Tabs */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Tabs</Typography>
            <NavTabs
              activeTabId={activeTab}
              onChange={setActiveTab}
              variant="underlined"
              tabs={tabs}
            />
            <Box style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', marginTop: '1rem' }}>
              {tabs.find(t => t.id === activeTab)?.content}
            </Box>
          </Box>
        </Card>

        {/* Pagination */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Pagination</Typography>
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onChange={setCurrentPage}
            />
          </Box>
        </Card>
      </Container>

      {/* Surfaces Section */}
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>Surfaces</Typography>
        
        {/* Modal */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Modal</Typography>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            {modalOpen && (
              <Modal
                title="Sample Modal"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                size="md"
              >
                <Typography variant="body">
                  This is a modal dialog. Click outside or the close button to dismiss it.
                </Typography>
              </Modal>
            )}
          </Box>
        </Card>

        {/* Accordion */}
        <Card style={{ marginBottom: '1rem' }}>
          <Box style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>Accordion</Typography>
            <Accordion
              items={accordionItems}
              multiple
              openIds={accordion}
              onChange={setAccordion}
            />
          </Box>
        </Card>
      </Container>

      {/* Footer */}
      <Container style={{ marginTop: '3rem', paddingBottom: '2rem', textAlign: 'center', borderTop: '1px solid #ddd' }}>
        <Typography variant="caption" style={{ color: '#999' }}>
          Ultra UI — Premium React Component Library © 2026
        </Typography>
      </Container>
    </Box>
  );
}