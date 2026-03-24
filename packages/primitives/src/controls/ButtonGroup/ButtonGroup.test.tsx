import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button, ButtonGroup } from '../../index';

describe('ButtonGroup', () => {
  it('renders children with group role', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
    );

    expect(screen.getByRole('group')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'One' })).toBeTruthy();
  });

  it('calls onChange in exclusive mode', () => {
    const onChange = vi.fn();
    render(
      <ButtonGroup exclusive value="a" onChange={onChange}>
        <Button value="a">A</Button>
        <Button value="b">B</Button>
      </ButtonGroup>
    );

    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
