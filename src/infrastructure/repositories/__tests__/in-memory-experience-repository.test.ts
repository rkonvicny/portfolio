import { describe, it, expect, vi } from 'vitest';
import { InMemoryExperienceRepository } from '../InMemoryExperienceRepository';

// Mock portfolioData
vi.mock('@/data/portfolio.json', () => ({
  default: {
    experience: [
      { id: '1', role: 'Dev', company: 'Tech', type: 'work' },
      { id: '2', role: 'Student', company: 'Uni', type: 'education' }
    ]
  }
}));

describe('InMemoryExperienceRepository', () => {
  it('should return experience data from portfolio data', async () => {
    const repository = new InMemoryExperienceRepository();
    const result = await repository.getAllExperience();

    expect(result).toHaveLength(2);
    expect(result[0].role).toBe('Dev');
    expect(result[1].type).toBe('education');
  });
});
