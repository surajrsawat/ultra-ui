import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TwTable } from './index';

describe('TwTable', () => {
  it('renders a table with default classes', () => {
    render(
      <TwTable>
        <tbody>
          <tr>
            <td>Alpha</td>
          </tr>
        </tbody>
      </TwTable>
    );

    const table = screen.getByRole('table');

    expect(table.className).toContain('min-w-full');
    expect(table.className).toContain('divide-gray-200');
  });

  it('preserves custom classes', () => {
    render(<TwTable className="rounded-lg" />);

    expect(screen.getByRole('table').className).toContain('rounded-lg');
  });
});
