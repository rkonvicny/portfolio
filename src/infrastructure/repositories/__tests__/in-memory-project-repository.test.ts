import { describe, it, expect } from 'vitest';
import { InMemoryProjectRepository } from '../InMemoryProjectRepository';
import portfolioData from '@/data/portfolio.json';

describe('InMemoryProjectRepository', () => {
	it('should return all projects from the static JSON data', async () => {
		// Arrange
		const repository = new InMemoryProjectRepository();

		// Act
		const projects = await repository.getAllProjects();

		// Assert
		expect(projects).toEqual(portfolioData.projects);
		expect(projects.length).toBeGreaterThan(0); // Základní kontrola, že JSON obsahuje projekty
	});
});
