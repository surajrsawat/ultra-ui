import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Box } from './Box';

describe('Box', () => {
  it('renders as div by default', () => {
    render(<Box data-testid="box">content</Box>);
    expect(screen.getByTestId('box').tagName).toBe('DIV');
  });

  it('renders as a custom element via as prop', () => {
    render(<Box as="section" data-testid="box">content</Box>);
    expect(screen.getByTestId('box').tagName).toBe('SECTION');
  });

  it('converts numeric padding to px', () => {
    render(<Box data-testid="box" padding={16}>content</Box>);
    expect(screen.getByTestId('box').style.padding).toBe('16px');
  });

  it('converts numeric margin to px', () => {
    render(<Box data-testid="box" margin={8}>content</Box>);
    expect(screen.getByTestId('box').style.margin).toBe('8px');
  });

  it('applies paddingX as left and right padding', () => {
    render(<Box data-testid="box" paddingX={20}>content</Box>);
    const el = screen.getByTestId('box');
    expect(el.style.paddingLeft).toBe('20px');
    expect(el.style.paddingRight).toBe('20px');
  });

  it('applies marginY as top and bottom margin', () => {
    render(<Box data-testid="box" marginY={12}>content</Box>);
    const el = screen.getByTestId('box');
    expect(el.style.marginTop).toBe('12px');
    expect(el.style.marginBottom).toBe('12px');
  });

  it('applies background color via bg prop', () => {
    render(<Box data-testid="box" bg="blue">content</Box>);
    expect(screen.getByTestId('box').style.backgroundColor).toBe('blue');
  });

  it('applies border radius as px for numbers', () => {
    render(<Box data-testid="box" borderRadius={4}>content</Box>);
    expect(screen.getByTestId('box').style.borderRadius).toBe('4px');
  });

  it('applies numeric gridColumn as span', () => {
    render(<Box data-testid="box" gridColumn={2}>content</Box>);
    expect(screen.getByTestId('box').style.gridColumn).toBe('span 2');
  });

  it('applies string gridColumn verbatim', () => {
    render(<Box data-testid="box" gridColumn="1 / 3">content</Box>);
    expect(screen.getByTestId('box').style.gridColumn).toBe('1 / 3');
  });

  it('applies width and height', () => {
    render(<Box data-testid="box" width={200} height="100px">content</Box>);
    const el = screen.getByTestId('box');
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('100px');
  });
});
