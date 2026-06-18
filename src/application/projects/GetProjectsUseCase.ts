import { Project } from "../../domain/projects/Project";
import { IProjectRepository } from "./ports/IProjectRepository";

export class GetProjectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  public async execute(): Promise<Project[]> {
    return this.projectRepository.getAllProjects();
  }
}
