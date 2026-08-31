import { ExperienceItem } from "@domain/entities/experience-item";
import { IExperienceRepository } from "@domain/repositories/IExperienceRepository";
import { FileReader } from "../data/FileReader";

export class FileExperienceRepository implements IExperienceRepository {
	public async getAllExperience(): Promise<ExperienceItem[]> {
		const data = FileReader.readJson<{ experience: ExperienceItem[] }>("portfolio.json");
		return data.experience;
	}
}
