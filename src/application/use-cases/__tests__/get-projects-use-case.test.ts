import { describe, it, expect, vi } from 'vitest';
import { GetProjectsUseCase } from '../get-projects-use-case';
import { IProjectRepository } from '@/domain/repositories/iproject-repository';
import { Project } from '@/domain/entities/project';

describe('GetProjectsUseCase', () => {
	it('should return all projects from the repository', async () => {
		// Arrange
		const mockProjects: Project[] = [
			{
				id: '1',
				title: 'Project 1',
				description: 'Desc 1',
				imageUrl: '/img1.png',
				technologies: ['React'],
				link: 'https://p1.com',
				githubUrl: 'https://github.com/p1'
			}
		];

		const mockRepository: IProjectRepository = {
			getAllProjects: vi.fn().mockResolvedValue(mockProjects)
		};

		const useCase = new GetProjectsUseCase(mockRepository);

		// Act
		const result = await useCase.execute();

		// Assert
		expect(mockRepository.getAllProjects).toHaveBeenCalledTimes(1);
		expect(result).toEqual(mockProjects);
	});
});
