import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Grid } from '../../index';

describe('Grid', () => {
  it('renders with explicit columns', () => {
    render(
      <Grid data-testid="grid" columns={3}>
        <div>One</div>
      </Grid>
    );
    expect(screen.getByTestId('grid').style.gridTemplateColumns).toContain('repeat(3');
  });

  it('supports auto-fit layout', () => {
    render(
      <Grid data-testid="auto-grid" autoFit minColWidth={180}>
        <div>One</div>
      </Grid>
    );
    expect(screen.getByTestId('auto-grid').style.gridTemplateColumns).toContain('auto-fit');
  });
});
