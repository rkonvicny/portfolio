import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SmtpEmailService } from '../SmtpEmailService';
import { ContactMessage } from '@domain/contact/ContactMessage';
import * as nodemailer from 'nodemailer';

vi.mock('nodemailer');

describe('SmtpEmailService', () => {
    beforeEach(() => {
        vi.stubEnv('SMTP_USER', 'test');
        vi.stubEnv('SMTP_PASS', 'test');
    });

	it('should successfully send an email', async () => {
		const mockSendMail = vi.fn().mockResolvedValue(true);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(nodemailer.createTransport as any).mockReturnValue({
			sendMail: mockSendMail
		});

		const service = new SmtpEmailService();
		const message = new ContactMessage('John Doe', 'john@doe.com', 'Test Subject', 'Test Message');

		await expect(service.sendEmail(message)).resolves.not.toThrow();
		expect(mockSendMail).toHaveBeenCalledWith(
			expect.objectContaining({
				from: expect.any(String),
				to: expect.any(String),
				subject: expect.stringContaining('Test Subject'),
				replyTo: 'john@doe.com'
			})
		);
	});

	it('should throw an error if sending an email fails', async () => {
		const mockSendMail = vi.fn().mockRejectedValue(new Error('Network Error'));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(nodemailer.createTransport as any).mockReturnValue({
			sendMail: mockSendMail
		});

		const service = new SmtpEmailService();
		const message = new ContactMessage('John Doe', 'john@doe.com', 'Test Subject', 'Test Message');

		await expect(service.sendEmail(message)).rejects.toThrow('Nepodařilo se odeslat e-mail. Zkuste to prosím později.');
	});
});
