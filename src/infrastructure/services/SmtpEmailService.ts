import { IEmailService } from "@domain/ports/IEmailService";
import { ContactMessage } from "@/domain/entities/contact-message";
import nodemailer from "nodemailer";
import escapeHtml from "escape-html";

export class SmtpEmailService implements IEmailService {
	private transporter: nodemailer.Transporter;

	constructor() {
		if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
			throw new Error("[SmtpEmailService] Chybí SMTP údaje v .env (SMTP_USER, SMTP_PASS).");
		}

		// Konfigurace transportu pro Seznam SMTP
		this.transporter = nodemailer.createTransport({
			host: "smtp.seznam.cz",
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS
			}
		});
	}

	public async sendEmail(contactMessage: ContactMessage): Promise<void> {
		try {
			const safeName = escapeHtml(contactMessage.name);
			const safeEmail = escapeHtml(contactMessage.email);
			const safeSubject = escapeHtml(contactMessage.subject || "Není vyplněn");
			const safeMessage = escapeHtml(contactMessage.message);

			await this.transporter.sendMail({
				from: `"Portfolio Kontakt" <${process.env.SMTP_USER}>`, // E-mail odesílatele (musí patřit k účtu na Seznamu)
				to: "konr@konr.cz", // E-mail příjemce (ty sám sobě)
				replyTo: contactMessage.email, // Umožní ti kliknout na "Odpovědět"
				subject: `[Nová poptávka] ${contactMessage.subject || "Zpráva z webu"} - od ${contactMessage.name}`,
				text: `Dostal jsi novou zprávu z portfolia.\n\nOd: ${contactMessage.name} (${contactMessage.email})\n\nZpráva:\n${contactMessage.message}`,
				html: `
					<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
						<h2>Nová zpráva z tvého portfolia</h2>
						<p><strong>Od:</strong> ${safeName} (<a href="mailto:${safeEmail}">${safeEmail}</a>)</p>
						<p><strong>Předmět:</strong> ${safeSubject}</p>
						<hr />
						<p style="white-space: pre-wrap;">${safeMessage}</p>
					</div>
				`
			});
			console.log(
				`[SmtpEmailService] Zpráva od ${contactMessage.email} byla úspěšně odeslána.`
			);
		} catch (error) {
			console.error("[SmtpEmailService] Chyba při odesílání e-mailu:", error);
			throw new Error("Nepodařilo se odeslat e-mail. Zkuste to prosím později.");
		}
	}
}
