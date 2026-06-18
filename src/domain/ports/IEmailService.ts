import { ContactMessage } from "@domain/entities/contact-message";

export interface IEmailService {
	sendEmail(contactMessage: ContactMessage): Promise<void>;
}
