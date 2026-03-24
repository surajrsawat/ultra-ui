import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavTabs } from '../../index';

describe('NavTabs', () => {
  const tabs = [
    { id: 'a', label: 'Tab A', content: 'Panel A' },
    { id: 'b', label: 'Tab B', content: 'Panel B' },
  ];

  it('renders active tab content when showContent is true', () => {
    render(<NavTabs tabs={tabs} defaultTabId="a" showContent />);
    expect(screen.getByRole('tabpanel').textContent).toContain('Panel A');
  });

  it('calls onChange when tab is clicked', () => {
    const onChange = vi.fn();
    render(<NavTabs tabs={tabs} onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
