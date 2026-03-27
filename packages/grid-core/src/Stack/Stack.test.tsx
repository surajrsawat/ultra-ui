import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stack, HStack, VStack } from './Stack';

describe('Stack', () => {
  it('renders as a flex column by default', () => {
    render(<Stack data-testid="stack"><div>A</div></Stack>);
    const el = screen.getByTestId('stack');
    expect(el.style.display).toBe('flex');
    expect(el.style.flexDirection).toBe('column');
  });

  it('renders as a custom direction', () => {
    render(<Stack data-testid="stack" direction="row"><div>A</div></Stack>);
    expect(screen.getByTestId('stack').style.flexDirection).toBe('row');
  });

  it('applies spacing as gap', () => {
    render(<Stack data-testid="stack" spacing={16}><div>A</div></Stack>);
    expect(screen.getByTestId('stack').style.gap).toBe('16px');
  });

  it('applies align and justify', () => {
    render(<Stack data-testid="stack" align="center" justify="flex-end"><div>A</div></Stack>);
    const el = screen.getByTestId('stack');
    expect(el.style.alignItems).toBe('center');
    expect(el.style.justifyContent).toBe('flex-end');
  });

  it('inserts dividers between children when divider=true', () => {
    render(
      <Stack divider spacing={8}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Stack>
    );
    expect(screen.getAllByRole('separator')).toHaveLength(2);
  });

  it('renders as a custom element', () => {
    render(<Stack as="ul" data-testid="stack"><li>A</li></Stack>);
    expect(screen.getByTestId('stack').tagName).toBe('UL');
  });

  it('applies padding and margin', () => {
    render(<Stack data-testid="stack" padding={16} margin={8}><div>A</div></Stack>);
    const el = screen.getByTestId('stack');
    expect(el.style.padding).toBe('16px');
    expect(el.style.margin).toBe('8px');
  });
});

describe('HStack', () => {
  it('defaults to row direction', () => {
    render(<HStack data-testid="hstack"><div>A</div></HStack>);
    expect(screen.getByTestId('hstack').style.flexDirection).toBe('row');
  });
});

describe('VStack', () => {
  it('defaults to column direction', () => {
    render(<VStack data-testid="vstack"><div>A</div></VStack>);
    expect(screen.getByTestId('vstack').style.flexDirection).toBe('column');
  });
});
