import { Project } from "@domain/entities/project";
import { IProjectRepository } from "@domain/repositories/IProjectRepository";
import { FileReader } from "../data/FileReader";

export class FileProjectRepository implements IProjectRepository {
	public async getAllProjects(): Promise<Project[]> {
		const data = FileReader.readJson<{ projects: Project[] }>("portfolio.json");
		return data.projects;
	}
}
