import { ExperienceItem } from "../../domain/experience/ExperienceItem";
import { IExperienceRepository } from "./ports/IExperienceRepository";

export class GetExperienceUseCase {
  constructor(private readonly repository: IExperienceRepository) {}

  public async execute(): Promise<ExperienceItem[]> {
    return this.repository.getAllExperience();
  }
}
