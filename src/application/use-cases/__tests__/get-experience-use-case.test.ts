import { describe, it, expect, vi } from 'vitest';
import { GetExperienceUseCase } from '../get-experience-use-case';
import { IExperienceRepository } from '@/domain/repositories/iexperience-repository';
import { ExperienceItem } from '@/domain/entities/experience';

describe('GetExperienceUseCase', () => {
	it('should return all experience items from the repository', async () => {
		// Arrange
		const mockExperience: ExperienceItem[] = [
			{
				id: 'exp1',
				role: 'Developer',
				company: 'Tech Corp',
				startDate: '2020',
				endDate: '2022',
				description: 'Coding',
				technologies: ['TS']
			}
		];

		const mockRepository: IExperienceRepository = {
			getAllExperience: vi.fn().mockResolvedValue(mockExperience)
		};

		const useCase = new GetExperienceUseCase(mockRepository);

		// Act
		const result = await useCase.execute();

		// Assert
		expect(mockRepository.getAllExperience).toHaveBeenCalledTimes(1);
		expect(result).toEqual(mockExperience);
	});
});
