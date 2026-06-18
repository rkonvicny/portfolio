import { ExperienceItem } from "../../../domain/experience/ExperienceItem";

export interface IExperienceRepository {
  getAllExperience(): Promise<ExperienceItem[]>;
}
