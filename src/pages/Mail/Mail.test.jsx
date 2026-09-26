import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import Mail from './Mail';
import { renderWithProviders } from '../../test/utils';
import { mockEmails } from '../../data/mockEmails';

describe('Mail Component', () => {
  beforeEach(() => {
    // We can't mock window.confirm nicely without it, so let's mock it
    window.confirm = vi.fn(() => true);
  });

  it('renders inbox emails initially', () => {
    renderWithProviders(<Mail searchQuery="" />);
    const inboxEmails = mockEmails.filter(e => e.folderId === 'inbox');
    
    // Check if the subject of the first inbox email is rendered
    if (inboxEmails.length > 0) {
      expect(screen.getByText(inboxEmails[0].subject)).toBeInTheDocument();
    }
  });

  it('shows reading pane placeholder when no email selected', () => {
    renderWithProviders(<Mail searchQuery="" />);
    expect(screen.getByText(/Select an email to read/i)).toBeInTheDocument();
  });

  it('opens an email in reading pane when clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Mail searchQuery="" />);

    const inboxEmails = mockEmails.filter(e => e.folderId === 'inbox');
    if (inboxEmails.length > 0) {
      const emailElement = screen.getByText(inboxEmails[0].subject);
      await user.click(emailElement);

      // Now the subject should appear in the reading pane as well
      const subjects = screen.getAllByText(inboxEmails[0].subject);
      expect(subjects.length).toBeGreaterThan(1);
    }
  });

  it('can search for emails', () => {
    // If searchQuery is passed, it filters
    renderWithProviders(<Mail searchQuery="Satya" />);
    // "Vision for the next quarter" from Satya should be there
    expect(screen.getByText(/Vision for the next quarter/i)).toBeInTheDocument();
    
    // Other emails shouldn't be there ideally, assuming they don't contain Satya
    expect(screen.queryByText(/Design review: Updated brand/i)).not.toBeInTheDocument();
  });

  it('can open compose window', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Mail searchQuery="" />);
    
    const composeBtn = screen.getByRole('button', { name: /New mail/i });
    await user.click(composeBtn);

    expect(screen.getByPlaceholderText('Recipients')).toBeInTheDocument();
  });

  it('can delete an email', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Mail searchQuery="" />);
    
    const inboxEmails = mockEmails.filter(e => e.folderId === 'inbox');
    if (inboxEmails.length === 0) return;
    
    const emailSubject = inboxEmails[0].subject;
    const emailElement = screen.getByText(emailSubject);
    await user.click(emailElement);

    // After clicking, reading pane is open. Let's find the delete button in reading pane.
    // Reading pane has a specific class or we can find the exact button by title.
    const deleteBtn = screen.getAllByRole('button', { name: /Delete/i }).find(
      b => b.classList.contains('rp-action-btn') || b.classList.contains('toolbar-btn')
    );
    
    if (deleteBtn) {
      await user.click(deleteBtn);
    }

    await waitFor(() => {
      expect(screen.queryByText(emailSubject)).not.toBeInTheDocument();
    });
  });
});
