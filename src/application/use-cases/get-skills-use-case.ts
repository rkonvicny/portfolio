import { SkillCategory } from "@/domain/entities/skill-category";
import { ISkillRepository } from "@domain/repositories/ISkillRepository";

export class GetSkillsUseCase {
	constructor(private readonly repository: ISkillRepository) {}

	public async execute(): Promise<SkillCategory[]> {
		return this.repository.getAllSkills();
	}
}
