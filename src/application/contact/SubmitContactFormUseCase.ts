import { ContactMessage } from "../../domain/contact/ContactMessage";
import { IEmailService } from "./ports/IEmailService";

export interface SubmitContactFormDTO {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class SubmitContactFormUseCase {
  constructor(private readonly emailService: IEmailService) {}

  public async execute(dto: SubmitContactFormDTO): Promise<void> {
    // 1. Validace a vytvoření doménové entity
    const contactMessage = ContactMessage.create(
      dto.name,
      dto.email,
      dto.subject,
      dto.message
    );

    // 2. Provedení business operace (odeslání e-mailu přes abstraktní port)
    await this.emailService.sendEmail(contactMessage);
  }
}
