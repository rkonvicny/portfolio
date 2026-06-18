import { Project } from "@domain/entities/project";
import { IProjectRepository } from "@domain/repositories/IProjectRepository";
import portfolioData from "@/data/portfolio.json";

export class InMemoryProjectRepository implements IProjectRepository {
	public async getAllProjects(): Promise<Project[]> {
		return portfolioData.projects as Project[];
	}
}
