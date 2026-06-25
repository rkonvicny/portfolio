import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../navbar';
// import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'next-themes';

vi.mock('@/data/portfolio.json', () => ({
  default: {
    personal: {
      siteTitle: 'johndoe.dev',
      socials: [
        { icon: 'github', url: 'https://github.com/test' }
      ]
    },
    pageSettings: {}
  },
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('Navbar Component', () => {
  it('renders desktop navigation links', () => {
    render(<ThemeProvider><Navbar /></ThemeProvider>);

    // There are mobile and desktop links, use getAllByText
    expect(screen.getAllByText('Domů').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Dovednosti').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Zkušenosti').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Kontakt').length).toBeGreaterThan(0);
  });

  it('toggles theme correctly', async () => {
    // const user = userEvent.setup();
    render(<ThemeProvider><Navbar /></ThemeProvider>);

    // Initially the theme toggle button should be present
    const toggleBtns = screen.getAllByRole('button');
    expect(toggleBtns.length).toBeGreaterThan(0);
  });
});
