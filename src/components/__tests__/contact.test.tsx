import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Contact } from '../contact';
import userEvent from '@testing-library/user-event';

vi.mock('@/data/portfolio.json', () => ({
  default: {
    pageSettings: {
      enableExtendedSectionHeader: true,
    },
    personal: {
      email: 'john@doe.com',
      phone: '+123456789',
      location: 'New York'
    }
  },
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Contact Component', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders section header', () => {
    render(<Contact />);
    expect(screen.getByText('Kontakt')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Contact />);
    expect(screen.getByText('john@doe.com')).toBeInTheDocument();
    expect(screen.getByText('+123456789')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('validates form submission', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    // Find inputs
    const submitBtn = screen.getByRole('button', { name: /Odeslat zprávu/i });

    // Match label correctly
    const nameInput = screen.getByLabelText(/Vaše jméno/i);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const subjectInput = screen.getByLabelText(/Předmět zprávy/i);
    const messageInput = screen.getByLabelText(/Text zprávy/i);

    await user.type(nameInput, 'Alice Doe');
    await user.type(emailInput, 'alice@example.com');
    await user.type(subjectInput, 'Hello');
    await user.type(messageInput, 'This is a test message');

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    await user.click(submitBtn);

    expect(mockFetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice Doe',
        email: 'alice@example.com',
        subject: 'Hello',
        message: 'This is a test message'
      })
    }));

    await waitFor(() => {
      expect(screen.getByText(/Zpráva byla úspěšně odeslána/i)).toBeInTheDocument();
    });
  });
});
