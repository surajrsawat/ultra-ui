import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders with display:flex by default', () => {
    render(<Flex data-testid="flex">content</Flex>);
    expect(screen.getByTestId('flex').style.display).toBe('flex');
  });

  it('renders with display:inline-flex when inline is true', () => {
    render(<Flex data-testid="flex" inline>content</Flex>);
    expect(screen.getByTestId('flex').style.display).toBe('inline-flex');
  });

  it('applies flex direction', () => {
    render(<Flex data-testid="flex" direction="column">content</Flex>);
    expect(screen.getByTestId('flex').style.flexDirection).toBe('column');
  });

  it('applies align and justify', () => {
    render(<Flex data-testid="flex" align="center" justify="space-between">content</Flex>);
    const el = screen.getByTestId('flex');
    expect(el.style.alignItems).toBe('center');
    expect(el.style.justifyContent).toBe('space-between');
  });

  it('wraps when wrap=true', () => {
    render(<Flex data-testid="flex" wrap={true}>content</Flex>);
    expect(screen.getByTestId('flex').style.flexWrap).toBe('wrap');
  });

  it('nowrap when wrap=false', () => {
    render(<Flex data-testid="flex" wrap={false}>content</Flex>);
    expect(screen.getByTestId('flex').style.flexWrap).toBe('nowrap');
  });

  it('converts numeric gap to px', () => {
    render(<Flex data-testid="flex" gap={16}>content</Flex>);
    expect(screen.getByTestId('flex').style.gap).toBe('16px');
  });

  it('applies gapX and gapY independently', () => {
    render(<Flex data-testid="flex" gapX={8} gapY={4}>content</Flex>);
    const el = screen.getByTestId('flex');
    expect(el.style.columnGap).toBe('8px');
    expect(el.style.rowGap).toBe('4px');
  });

  it('renders as a custom element', () => {
    render(<Flex as="nav" data-testid="flex">content</Flex>);
    expect(screen.getByTestId('flex').tagName).toBe('NAV');
  });
});
