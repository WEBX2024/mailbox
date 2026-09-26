import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, beforeEach, it, expect } from 'vitest';
import Login from './Login';
import { renderWithProviders } from '../../test/utils';

describe('Login Component', () => {
  beforeEach(() => {
    // Mock the useAuth hook to avoid needing the full provider for some tests,
    // but renderWithProviders already wraps it. We'll let the actual AuthProvider handle it.
  });

  it('renders login form', () => {
    renderWithProviders(<Login />);
    expect(screen.getByRole('heading', { name: /microsoft/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles mock login flow successfully', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    // Click demo account
    const demoBtn = screen.getByText('alex@outlook.com');
    await user.click(demoBtn);

    // Assert inputs are filled
    const emailInput = screen.getByPlaceholderText(/email address/i);
    expect(emailInput).toHaveValue('alex@outlook.com');

    const signInBtn = screen.getByRole('button', { name: /sign in/i });
    await user.click(signInBtn);
    
    // AuthContext's login state is updated internally (we can test App for full integration)
    // Here we just test the button goes into loading state
    expect(signInBtn).toBeDisabled();
    
    // Wait for fake network delay
    await waitFor(() => {
      expect(signInBtn).not.toBeDisabled();
    }, { timeout: 1000 });
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleBtn = screen.getByRole('button', { name: /show password/i });

    expect(passwordInput).toHaveAttribute('type', 'password');
    await user.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    await user.click(screen.getByRole('button', { name: /hide password/i }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
