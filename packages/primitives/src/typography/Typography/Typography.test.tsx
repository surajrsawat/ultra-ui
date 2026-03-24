import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Typography } from '../../index';

describe('Typography', () => {
  it('renders semantic element by variant', () => {
    render(<Typography variant="h2">Heading</Typography>);
    const heading = screen.getByText('Heading');
    expect(heading.tagName).toBe('H2');
  });

  it('supports element override with as prop', () => {
    render(
      <Typography variant="h1" as="span">
        Title
      </Typography>
    );
    expect(screen.getByText('Title').tagName).toBe('SPAN');
  });
});
