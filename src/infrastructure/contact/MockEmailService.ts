import { IEmailService } from "../../application/contact/ports/IEmailService";
import { ContactMessage } from "../../domain/contact/ContactMessage";

export class MockEmailService implements IEmailService {
  public async sendEmail(contactMessage: ContactMessage): Promise<void> {
    // Simulace zpoždění sítě
    await new Promise((resolve) => setTimeout(resolve, 1200));

    console.log(`[MockEmailService] Odesílám e-mail od ${contactMessage.name} (${contactMessage.email})`);
    console.log(`Předmět: ${contactMessage.subject || "Bez předmětu"}`);
    console.log(`Text: ${contactMessage.message}`);
    console.log(`[MockEmailService] E-mail úspěšně odeslán.`);
  }
}
