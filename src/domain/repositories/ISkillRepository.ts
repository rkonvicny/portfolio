import { SkillCategory } from "@/domain/entities/skill-category";

export interface ISkillRepository {
	getAllSkills(): Promise<SkillCategory[]>;
}
