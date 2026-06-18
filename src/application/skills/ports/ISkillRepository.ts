import { SkillCategory } from "../../../domain/skills/SkillCategory";

export interface ISkillRepository {
  getAllSkills(): Promise<SkillCategory[]>;
}
