import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Box } from '../../index';

describe('Box', () => {
  it('renders as a custom element through the public export', () => {
    render(
      <Box as="section" data-testid="layout-box">
        Body
      </Box>
    );

    const box = screen.getByTestId('layout-box');
    expect(box.tagName).toBe('SECTION');
    expect(box.textContent).toBe('Body');
  });

  it('converts numeric spacing props into px values', () => {
    render(
      <Box data-testid="spaced-box" gap={12} padding={8} margin={4} width={200} borderRadius={6}>
        Spaced
      </Box>
    );

    const box = screen.getByTestId('spaced-box');

    expect(box.style.gap).toBe('12px');
    expect(box.style.padding).toBe('8px');
    expect(box.style.margin).toBe('4px');
    expect(box.style.width).toBe('200px');
    expect(box.style.borderRadius).toBe('6px');
  });
});