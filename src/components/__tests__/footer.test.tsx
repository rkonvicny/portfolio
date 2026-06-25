import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from '../footer';

vi.mock('@/data/portfolio.json', () => ({
  default: {
    personal: {
      siteTitle: 'John Doe',
      socials: [
        { icon: 'github', url: 'https://github.com/john' },
        { icon: 'linkedin', url: 'https://linkedin.com/in/john' }
      ]
    }
  },
}));

describe('Footer Component', () => {
  it('renders copyright text with site title', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} John Doe. Všechna práva vyhrazena.`)).toBeInTheDocument();
  });

  it('renders social links correctly', () => {
    render(<Footer />);

    // The links in the footer might not have aria-label if we only mock socials array, but wait, the component maps them.
    // Let's use getByRole without name and check href instead.
    const links = screen.getAllByRole('link');

    const githubLink = links.find(l => l.getAttribute('href') === 'https://github.com/john');
    expect(githubLink).toBeInTheDocument();

    const linkedinLink = links.find(l => l.getAttribute('href') === 'https://linkedin.com/in/john');
    expect(linkedinLink).toBeInTheDocument();
  });

  it('renders scroll to top button', () => {
    render(<Footer />);
    const topLink = screen.getByRole('link', { name: /Zpět nahoru/i });
    expect(topLink).toBeInTheDocument();
    expect(topLink).toHaveAttribute('href', '#home');
  });
});
