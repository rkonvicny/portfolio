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
    render(<Footer personal={{
    name: "John Doe",
    role: "Developer",
    email: "john@doe.com",
    phone: "+123456789",
    location: "New York",
    socials: [{ platform: "GitHub", url: "https://github.com/johndoe", icon: "github" }],
    bio: "Test bio",
    typewriterWords: ["Dev", "Arch"],
    siteTitle: "johndoe.com",
    languages: []
}} />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} John Doe. Všechna práva vyhrazena.`)).toBeInTheDocument();
  });

  it('renders social links correctly', () => {
    render(<Footer personal={{
    name: "John Doe",
    role: "Developer",
    email: "john@doe.com",
    phone: "+123456789",
    location: "New York",
    socials: [{ platform: "GitHub", url: "https://github.com/johndoe", icon: "github" }],
    bio: "Test bio",
    typewriterWords: ["Dev", "Arch"],
    siteTitle: "johndoe.com",
    languages: []
}} />);

    // The links in the footer might not have aria-label if we only mock socials array, but wait, the component maps them.
    // Let's use getByRole without name and check href instead.
    const links = screen.getAllByRole('link');

    const githubLink = links.find(l => l.getAttribute('href') === 'https://github.com/john');
    expect(githubLink).toBeInTheDocument();

    const linkedinLink = links.find(l => l.getAttribute('href') === 'https://linkedin.com/in/john');
    expect(linkedinLink).toBeInTheDocument();
  });

  it('renders scroll to top button', () => {
    render(<Footer personal={{
    name: "John Doe",
    role: "Developer",
    email: "john@doe.com",
    phone: "+123456789",
    location: "New York",
    socials: [{ platform: "GitHub", url: "https://github.com/johndoe", icon: "github" }],
    bio: "Test bio",
    typewriterWords: ["Dev", "Arch"],
    siteTitle: "johndoe.com",
    languages: []
}} />);
    const topLink = screen.getByRole('link', { name: /Zpět nahoru/i });
    expect(topLink).toBeInTheDocument();
    expect(topLink).toHaveAttribute('href', '#home');
  });
});
