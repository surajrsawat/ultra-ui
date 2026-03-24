import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Container } from '../../index';

describe('Container', () => {
  it('renders children and applies numeric sizing props', () => {
    render(
      <Container data-testid="container" maxWidth={960} paddingX={24} paddingY={12}>
        Content
      </Container>
    );
    const el = screen.getByTestId('container');
    expect(el.textContent).toBe('Content');
    expect(el.style.maxWidth).toBe('960px');
    expect(el.style.paddingLeft).toBe('24px');
    expect(el.style.paddingTop).toBe('12px');
  });
});
