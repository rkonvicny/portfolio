import { describe, it, expect, vi } from 'vitest';
import { GetSkillsUseCase } from '../get-skills-use-case';
import { ISkillRepository } from '@/domain/repositories/iskill-repository';
import { SkillCategory } from '@/domain/entities/skill';

describe('GetSkillsUseCase', () => {
	it('should return all skills from the repository', async () => {
		// Arrange
		const mockSkills: SkillCategory[] = [
			{
				id: 'frontend',
				title: 'Frontend',
				icon: 'FaReact',
				skills: [
					{ name: 'React', level: 90 },
					{ name: 'Next.js', level: 85 }
				]
			}
		];

		const mockRepository: ISkillRepository = {
			getAllSkills: vi.fn().mockResolvedValue(mockSkills)
		};

		const useCase = new GetSkillsUseCase(mockRepository);

		// Act
		const result = await useCase.execute();

		// Assert
		expect(mockRepository.getAllSkills).toHaveBeenCalledTimes(1);
		expect(result).toEqual(mockSkills);
	});
});
