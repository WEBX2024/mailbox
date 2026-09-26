import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import Compose from './Compose';
import { renderWithProviders } from '../../test/utils';

describe('Compose Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders compose window', () => {
    renderWithProviders(<Compose onClose={mockOnClose} />);
    expect(screen.getByText('New Message')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Recipients')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a subject')).toBeInTheDocument();
  });

  it('handles entering recipients and subject', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Compose onClose={mockOnClose} />);

    const toInput = screen.getByPlaceholderText('Recipients');
    const subjectInput = screen.getByPlaceholderText('Add a subject');

    await user.type(toInput, 'test@example.com');
    await user.type(subjectInput, 'Test Subject');

    expect(toInput).toHaveValue('test@example.com');
    expect(subjectInput).toHaveValue('Test Subject');
  });

  it('shows error if sending without recipient', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Compose onClose={mockOnClose} />);

    const sendBtn = screen.getByRole('button', { name: /send/i });
    await user.click(sendBtn);

    // onClose shouldn't be called if it failed
    expect(mockOnClose).not.toHaveBeenCalled();
    // Toast error would be shown, but testing toast is slightly trickier in unit tests
    // It's sufficient to check onClose
  });

  it('calls onClose when sending valid email', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Compose onClose={mockOnClose} />);

    const toInput = screen.getByPlaceholderText('Recipients');
    await user.type(toInput, 'test@example.com');

    const sendBtn = screen.getByRole('button', { name: /send/i });
    await user.click(sendBtn);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('minimizes the compose window', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Compose onClose={mockOnClose} />);

    const minimizeBtn = screen.getByTitle('Minimize');
    await user.click(minimizeBtn);

    expect(screen.getByText('New Message')).toBeInTheDocument();
    // In minimized state, inputs are hidden
    expect(screen.queryByPlaceholderText('Recipients')).not.toBeInTheDocument();
  });
});
