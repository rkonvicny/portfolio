import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SmtpEmailService } from '../SmtpEmailService';
import nodemailer from 'nodemailer';

vi.mock('nodemailer');

describe('SmtpEmailService', () => {
	const originalEnv = process.env;

	beforeEach(() => {
		// Clone environment variables before each test
		process.env = { ...originalEnv };
	});

	afterEach(() => {
		// Restore original environment variables after each test
		process.env = originalEnv;
		vi.clearAllMocks();
	});

	it('should throw an error in the constructor if SMTP credentials are missing', () => {
		// Arrange
		delete process.env.SMTP_USER;
		delete process.env.SMTP_PASS;

		// Act & Assert
		expect(() => new SmtpEmailService()).toThrowError(
			'[SmtpEmailService] Chybí SMTP údaje v .env (SMTP_USER, SMTP_PASS).'
		);
	});

	it('should initialize successfully when SMTP credentials are provided', () => {
		// Arrange
		process.env.SMTP_USER = 'test@test.com';
		process.env.SMTP_PASS = 'password';
		vi.mocked(nodemailer.createTransport).mockReturnValue({} as any);

		// Act & Assert
		expect(() => new SmtpEmailService()).not.toThrow();
		expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
	});

	it('should successfully send an email', async () => {
		// Arrange
		process.env.SMTP_USER = 'test@test.com';
		process.env.SMTP_PASS = 'password';

		const mockSendMail = vi.fn().mockResolvedValue({ messageId: '123' });
		vi.mocked(nodemailer.createTransport).mockReturnValue({
			sendMail: mockSendMail
		} as any);

		const service = new SmtpEmailService();
		const message = {
			name: 'John Doe',
			email: 'john@doe.com',
			subject: 'Hello',
			message: 'World',
			createdAt: new Date()
		};

		// Act
		await expect(service.sendEmail(message)).resolves.toBeUndefined();

		// Assert
		expect(mockSendMail).toHaveBeenCalledTimes(1);
		expect(mockSendMail).toHaveBeenCalledWith({
			from: `"Portfolio Kontakt" <test@test.com>`,
			to: 'konr@konr.cz',
			replyTo: 'john@doe.com',
			subject: `[Nová poptávka] Hello - od John Doe`,
			text: expect.any(String),
			html: expect.any(String)
		});
	});

	it('should throw an error if sending an email fails', async () => {
		// Arrange
		process.env.SMTP_USER = 'test@test.com';
		process.env.SMTP_PASS = 'password';

		const mockSendMail = vi.fn().mockRejectedValue(new Error('Network Error'));
		vi.mocked(nodemailer.createTransport).mockReturnValue({
			sendMail: mockSendMail
		} as any);

		const service = new SmtpEmailService();
		const message = {
			name: 'John Doe',
			email: 'john@doe.com',
			subject: 'Hello',
			message: 'World',
			createdAt: new Date()
		};

		// Act & Assert
		await expect(service.sendEmail(message)).rejects.toThrowError(
			'Nepodařilo se odeslat e-mail. Zkuste to prosím později.'
		);
	});
});
