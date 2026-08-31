import { SmtpEmailService } from "@infrastructure/services/SmtpEmailService";
import { MockEmailService } from "@infrastructure/services/MockEmailService";
import { SubmitContactFormUseCase } from "@/application/use-cases/submit-contact-form-use-case";
import { FileProjectRepository } from "@infrastructure/repositories/FileProjectRepository";
import { GetProjectsUseCase } from "@/application/use-cases/get-projects-use-case";
import { FileExperienceRepository } from "@infrastructure/repositories/FileExperienceRepository";
import { GetExperienceUseCase } from "@/application/use-cases/get-experience-use-case";
import { FileSkillRepository } from "@infrastructure/repositories/FileSkillRepository";
import { GetSkillsUseCase } from "@/application/use-cases/get-skills-use-case";
import { FilePersonalRepository } from "@infrastructure/repositories/FilePersonalRepository";
import { GetPersonalUseCase } from "@/application/use-cases/get-personal-use-case";
import { FileSettingsRepository } from "@infrastructure/repositories/FileSettingsRepository";
import { GetSettingsUseCase } from "@/application/use-cases/get-settings-use-case";
import { IEmailService } from "@domain/ports/IEmailService";

// Inicializace infrastrukturních závislostí
const hasSmtpCredentials = Boolean(process.env.SMTP_USER) && Boolean(process.env.SMTP_PASS);

const emailService: IEmailService = hasSmtpCredentials
	? new SmtpEmailService()
	: new MockEmailService();
const projectRepository = new FileProjectRepository();
const experienceRepository = new FileExperienceRepository();
const skillRepository = new FileSkillRepository();
const personalRepository = new FilePersonalRepository();
const settingsRepository = new FileSettingsRepository();

// Inicializace Use Cases s vloženými závislostmi (Dependency Injection)
export const di = {
	submitContactFormUseCase: new SubmitContactFormUseCase(emailService),
	getProjectsUseCase: new GetProjectsUseCase(projectRepository),
	getExperienceUseCase: new GetExperienceUseCase(experienceRepository),
	getSkillsUseCase: new GetSkillsUseCase(skillRepository),
	getPersonalUseCase: new GetPersonalUseCase(personalRepository),
	getSettingsUseCase: new GetSettingsUseCase(settingsRepository)
};
