import { Project } from "@domain/entities/project";
import { IProjectRepository } from "@domain/repositories/IProjectRepository";

export class GetProjectsUseCase {
	constructor(private readonly projectRepository: IProjectRepository) {}

	public async execute(): Promise<Project[]> {
		const projects = await this.projectRepository.getAllProjects();
		return projects.filter(p => p.published !== false);
	}
}
