import { SkillCategory } from "@domain/entities/skill-category";
import { ISkillRepository } from "@domain/repositories/ISkillRepository";
import portfolioData from "@/data/portfolio.json";

export class InMemorySkillRepository implements ISkillRepository {
	public async getAllSkills(): Promise<SkillCategory[]> {
		return portfolioData.skills as SkillCategory[];
	}
}
