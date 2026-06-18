import { SkillCategory } from "../../domain/skills/SkillCategory";
import { ISkillRepository } from "./ports/ISkillRepository";

export class GetSkillsUseCase {
  constructor(private readonly repository: ISkillRepository) {}

  public async execute(): Promise<SkillCategory[]> {
    return this.repository.getAllSkills();
  }
}
