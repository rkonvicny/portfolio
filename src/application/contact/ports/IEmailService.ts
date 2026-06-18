import { ContactMessage } from "../../../domain/contact/ContactMessage";

export interface IEmailService {
  sendEmail(contactMessage: ContactMessage): Promise<void>;
}
