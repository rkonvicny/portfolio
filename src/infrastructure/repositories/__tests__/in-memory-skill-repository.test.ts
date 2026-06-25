import { describe, it, expect, vi } from 'vitest';
import { InMemorySkillRepository } from '../InMemorySkillRepository';

// Mock portfolioData
vi.mock('@/data/portfolio.json', () => ({
  default: {
    skills: [
      { id: '1', title: 'Frontend', skills: [] },
      { id: '2', title: 'Backend', skills: [] }
    ]
  }
}));

describe('InMemorySkillRepository', () => {
  it('should return skill data from portfolio data', async () => {
    const repository = new InMemorySkillRepository();
    const result = await repository.getAllSkills();

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Frontend');
    expect(result[1].id).toBe('2');
  });
});
