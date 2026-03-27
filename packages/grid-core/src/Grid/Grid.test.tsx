import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders with default 12-column grid', () => {
    render(
      <Grid data-testid="grid">
        <div>Cell</div>
      </Grid>
    );
    expect(screen.getByTestId('grid').style.gridTemplateColumns).toContain('repeat(12');
  });

  it('renders with explicit column count', () => {
    render(
      <Grid data-testid="grid" columns={3}>
        <div>Cell</div>
      </Grid>
    );
    expect(screen.getByTestId('grid').style.gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  it('supports auto-fit layout', () => {
    render(
      <Grid data-testid="grid" autoFit minColWidth={180}>
        <div>Cell</div>
      </Grid>
    );
    const style = screen.getByTestId('grid').style.gridTemplateColumns;
    expect(style).toContain('auto-fit');
    expect(style).toContain('180px');
  });

  it('supports auto-fill layout', () => {
    render(
      <Grid data-testid="grid" autoFill minColWidth="150px">
        <div>Cell</div>
      </Grid>
    );
    expect(screen.getByTestId('grid').style.gridTemplateColumns).toContain('auto-fill');
  });

  it('applies explicit templateColumns', () => {
    render(
      <Grid data-testid="grid" templateColumns="1fr 2fr 1fr">
        <div>Cell</div>
      </Grid>
    );
    expect(screen.getByTestId('grid').style.gridTemplateColumns).toBe('1fr 2fr 1fr');
  });

  it('converts numeric gap to px', () => {
    render(
      <Grid data-testid="grid" gap={8}>
        <div>Cell</div>
      </Grid>
    );
    expect(screen.getByTestId('grid').style.gap).toBe('8px');
  });

  it('applies gapX and gapY independently', () => {
    render(
      <Grid data-testid="grid" gapX={12} gapY={4}>
        <div>Cell</div>
      </Grid>
    );
    const el = screen.getByTestId('grid');
    expect(el.style.columnGap).toBe('12px');
    expect(el.style.rowGap).toBe('4px');
  });

  it('applies width and height', () => {
    render(
      <Grid data-testid="grid" width={400} height="200px">
        <div>Cell</div>
      </Grid>
    );
    const el = screen.getByTestId('grid');
    expect(el.style.width).toBe('400px');
    expect(el.style.height).toBe('200px');
  });
});
