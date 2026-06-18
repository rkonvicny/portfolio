import { MockEmailService } from "./contact/MockEmailService";
import { SubmitContactFormUseCase } from "../application/contact/SubmitContactFormUseCase";
import { InMemoryProjectRepository } from "./projects/InMemoryProjectRepository";
import { GetProjectsUseCase } from "../application/projects/GetProjectsUseCase";
import { InMemoryExperienceRepository } from "./experience/InMemoryExperienceRepository";
import { GetExperienceUseCase } from "../application/experience/GetExperienceUseCase";
import { InMemorySkillRepository } from "./skills/InMemorySkillRepository";
import { GetSkillsUseCase } from "../application/skills/GetSkillsUseCase";

// Inicializace infrastrukturních závislostí
const emailService = new MockEmailService();
const projectRepository = new InMemoryProjectRepository();
const experienceRepository = new InMemoryExperienceRepository();
const skillRepository = new InMemorySkillRepository();

// Inicializace Use Cases s vloženými závislostmi (Dependency Injection)
export const di = {
  submitContactFormUseCase: new SubmitContactFormUseCase(emailService),
  getProjectsUseCase: new GetProjectsUseCase(projectRepository),
  getExperienceUseCase: new GetExperienceUseCase(experienceRepository),
  getSkillsUseCase: new GetSkillsUseCase(skillRepository),
};
