import { describe, it, expect, vi } from 'vitest';
import { InMemoryProjectRepository } from '../InMemoryProjectRepository';

// Mock portfolioData
vi.mock('@/data/portfolio.json', () => ({
  default: {
    projects: [
      { id: '1', title: 'Test Project 1' },
      { id: '2', title: 'Test Project 2' }
    ]
  }
}));

describe('InMemoryProjectRepository', () => {
  it('should return project data from portfolio data', async () => {
    const repository = new InMemoryProjectRepository();
    const result = await repository.getAllProjects();

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Test Project 1');
  });
});
