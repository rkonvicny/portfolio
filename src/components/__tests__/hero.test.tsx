import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Hero } from '../hero';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Hero Component', () => {
  const mockPersonal = {
    name: 'John Doe',
    role: 'Software Engineer',
    bio: 'I write code',
    typewriterWords: ['Developer', 'Engineer'],
  } as any;
  const mockAppSettings = {
    pageSettings: {
      enableNameGlow: false,
      enableNameGradient: false,
      enableTypewriterSection: false,
      enableButtonRow: false,
    },
  } as any;

  it('renders correctly', () => {
    render(<Hero personal={mockPersonal} appSettings={mockAppSettings} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
