import { Project } from "@/domain/entities/project";

export interface IProjectRepository {
	getAllProjects(): Promise<Project[]>;
}
