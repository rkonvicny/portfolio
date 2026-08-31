import { SkillCategory } from "@domain/entities/skill-category";
import { ISkillRepository } from "@domain/repositories/ISkillRepository";
import { FileReader } from "../data/FileReader";

export class FileSkillRepository implements ISkillRepository {
	public async getAllSkills(): Promise<SkillCategory[]> {
		const data = FileReader.readJson<{ skills: SkillCategory[] }>("portfolio.json");
		return data.skills;
	}
}
