import { Project } from "../../../domain/projects/Project";

export interface IProjectRepository {
  getAllProjects(): Promise<Project[]>;
}
