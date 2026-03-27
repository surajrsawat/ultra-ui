import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('centers content by default', () => {
    render(<Container data-testid="container">content</Container>);
    const el = screen.getByTestId('container');
    expect(el.style.marginLeft).toBe('auto');
    expect(el.style.marginRight).toBe('auto');
  });

  it('resolves named size preset xl', () => {
    render(<Container data-testid="container" maxWidth="xl">content</Container>);
    expect(screen.getByTestId('container').style.maxWidth).toBe('1280px');
  });

  it('resolves named size preset sm', () => {
    render(<Container data-testid="container" maxWidth="sm">content</Container>);
    expect(screen.getByTestId('container').style.maxWidth).toBe('640px');
  });

  it('accepts numeric maxWidth', () => {
    render(<Container data-testid="container" maxWidth={960}>content</Container>);
    expect(screen.getByTestId('container').style.maxWidth).toBe('960px');
  });

  it('fluid mode sets maxWidth to 100%', () => {
    render(<Container data-testid="container" fluid>content</Container>);
    expect(screen.getByTestId('container').style.maxWidth).toBe('100%');
  });

  it('applies custom paddingX', () => {
    render(<Container data-testid="container" paddingX={32}>content</Container>);
    const el = screen.getByTestId('container');
    expect(el.style.paddingLeft).toBe('32px');
    expect(el.style.paddingRight).toBe('32px');
  });

  it('applies padding shorthand over paddingX/Y when set', () => {
    render(<Container data-testid="container" padding={24}>content</Container>);
    expect(screen.getByTestId('container').style.padding).toBe('24px');
  });

  it('is not centered when centered=false', () => {
    render(<Container data-testid="container" centered={false}>content</Container>);
    const el = screen.getByTestId('container');
    expect(el.style.marginLeft).toBe('');
    expect(el.style.marginRight).toBe('');
  });
});
