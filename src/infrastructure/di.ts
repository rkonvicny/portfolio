import { SmtpEmailService } from "@infrastructure/services/SmtpEmailService";
import { SubmitContactFormUseCase } from "@/application/use-cases/submit-contact-form-use-case";
import { InMemoryProjectRepository } from "@infrastructure/repositories/InMemoryProjectRepository";
import { GetProjectsUseCase } from "@/application/use-cases/get-projects-use-case";
import { InMemoryExperienceRepository } from "@infrastructure/repositories/InMemoryExperienceRepository";
import { GetExperienceUseCase } from "@/application/use-cases/get-experience-use-case";
import { InMemorySkillRepository } from "@infrastructure/repositories/InMemorySkillRepository";
import { GetSkillsUseCase } from "@/application/use-cases/get-skills-use-case";

// Inicializace infrastrukturních závislostí
const emailService = new SmtpEmailService();
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
