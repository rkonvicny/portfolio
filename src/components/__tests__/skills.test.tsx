import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Skills } from '../skills';
import { SkillCategory } from '@/domain/entities/skill-category';

// Mock portfolioData
vi.mock('@/data/portfolio.json', () => ({
  default: {
    pageSettings: {
      enableExtendedSectionHeader: true,
    },
  },
}));

const mockCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'backend',
    skills: [
      { name: 'Node.js', level: 80 }
    ]
  }
];

describe('Skills Component', () => {
  it('renders section header', () => {
    render(<Skills categories={mockCategories} />);
    expect(screen.getByText('Co všechno dokážu vytvořit')).toBeInTheDocument();
  });

  it('renders categories and skills correctly', () => {
    render(<Skills categories={mockCategories} />);

    // Check categories
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();

    // Check skills
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });
});
