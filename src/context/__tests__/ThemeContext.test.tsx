import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '../ThemeContext';

// NextThemesProvider mock
vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="next-themes-provider">{children}</div>
  )
}));

describe('ThemeContext', () => {
  it('renders children wrapped in NextThemesProvider', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system">
        <div data-testid="child">Child</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('next-themes-provider')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
