import { ValidationError } from "@domain/errors/validation-error";

export class ContactMessage {
	constructor(
		public readonly name: string,
		public readonly email: string,
		public readonly subject: string,
		public readonly message: string,
	) {}

	public static create(
		name: string,
		email: string,
		subject: string,
		message: string,
	): ContactMessage {
		if (!name || !email || !message) {
			throw new ValidationError(
				"Chybí povinná pole (jméno, e-mail nebo zpráva).",
			);
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw new ValidationError("Neplatný formát e-mailové adresy.");
		}

		return new ContactMessage(name, email, subject, message);
	}
}
