import { ExperienceItem } from "@/domain/entities/experience-item";

export interface IExperienceRepository {
	getAllExperience(): Promise<ExperienceItem[]>;
}
