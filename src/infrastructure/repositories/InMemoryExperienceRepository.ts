import { ExperienceItem } from "@domain/entities/experience-item";
import { IExperienceRepository } from "@domain/repositories/IExperienceRepository";
import portfolioData from "@/data/portfolio.json";

export class InMemoryExperienceRepository implements IExperienceRepository {
	public async getAllExperience(): Promise<ExperienceItem[]> {
		return portfolioData.experience as ExperienceItem[];
	}
}
