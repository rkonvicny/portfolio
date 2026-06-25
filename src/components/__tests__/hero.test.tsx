import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from '../hero';

vi.mock('../hero-background', () => ({
  HeroBackground: () => <div data-testid="hero-background" />
}));

vi.mock('@/data/portfolio.json', () => ({
  default: {
    personal: {
      name: 'John Doe',
      role: 'Software Developer',
      location: 'Prague',
      typewriterWords: ['Code', 'Create']
    },
    pageSettings: {}
  },
}));

describe('Hero Component', () => {
  it('renders correctly', () => {
    render(<Hero />);

    // Check background mock
    expect(screen.getByTestId('hero-background')).toBeInTheDocument();

    // Check personal data
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });
});
