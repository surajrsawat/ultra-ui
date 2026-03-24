import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from '../../index';

describe('Modal', () => {
  it('renders dialog when open', () => {
    render(
      <Modal open onClose={() => undefined} title="Confirm">
        Body
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
  });

  it('calls onClose from backdrop click', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Close me">
        Body
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    const backdrop = dialog.parentElement as HTMLDivElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
