import { ExperienceItem } from "@/domain/entities/experience-item";
import { IExperienceRepository } from "@domain/repositories/IExperienceRepository";

export class GetExperienceUseCase {
	constructor(private readonly repository: IExperienceRepository) {}

	public async execute(): Promise<ExperienceItem[]> {
		return this.repository.getAllExperience();
	}
}
