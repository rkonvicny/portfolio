import { ContactMessage } from "@/domain/entities/contact-message";
import { IEmailService } from "@domain/ports/IEmailService";
import { ValidationError } from "@/domain/errors/validation-error";

export interface SubmitContactFormDTO {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export class SubmitContactFormUseCase {
	constructor(private readonly emailService: IEmailService) {}

	public async execute(dto: SubmitContactFormDTO): Promise<void> {
		// 1. Validace vstupních dat
		if (!dto.name || !dto.email || !dto.subject || !dto.message) {
			throw new ValidationError("Chybí povinná pole (jméno, e-mail, předmět nebo zpráva).");
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(dto.email)) {
			throw new ValidationError("Neplatný formát e-mailové adresy.");
		}

		// 2. Vytvoření doménové entity (čistý datový kontrakt)
		const contactMessage: ContactMessage = {
			name: dto.name,
			email: dto.email,
			subject: dto.subject,
			message: dto.message
		};

		// 3. Provedení business operace (odeslání e-mailu přes abstraktní port)
		await this.emailService.sendEmail(contactMessage);
	}
}
