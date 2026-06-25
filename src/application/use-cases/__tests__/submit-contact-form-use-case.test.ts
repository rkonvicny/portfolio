import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SubmitContactFormUseCase } from '../submit-contact-form-use-case';
import { IEmailService } from '@/domain/ports/iemail-service';
import { ValidationError } from '@/domain/errors/validation-error';

describe('SubmitContactFormUseCase', () => {
	let mockEmailService: IEmailService;
	let useCase: SubmitContactFormUseCase;

	beforeEach(() => {
		mockEmailService = {
			sendEmail: vi.fn().mockResolvedValue(undefined)
		};
		useCase = new SubmitContactFormUseCase(mockEmailService);
	});

	it('should throw ValidationError if required fields are missing', async () => {
		const dto = { name: '', email: 'test@test.com', subject: 'Subj', message: 'Msg' };

		await expect(useCase.execute(dto)).rejects.toThrow(ValidationError);
		await expect(useCase.execute(dto)).rejects.toThrow('Chybí povinná pole');
		expect(mockEmailService.sendEmail).not.toHaveBeenCalled();
	});

	it('should throw ValidationError if email format is invalid', async () => {
		const dto = { name: 'Test Name', email: 'invalid-email', subject: 'Subj', message: 'Msg' };

		await expect(useCase.execute(dto)).rejects.toThrow(ValidationError);
		await expect(useCase.execute(dto)).rejects.toThrow('Neplatný formát e-mailové adresy');
		expect(mockEmailService.sendEmail).not.toHaveBeenCalled();
	});

	it('should successfully send an email if validation passes', async () => {
		const dto = { name: 'Test Name', email: 'test@test.com', subject: 'Subj', message: 'Msg' };

		await expect(useCase.execute(dto)).resolves.toBeUndefined();
		expect(mockEmailService.sendEmail).toHaveBeenCalledTimes(1);
		expect(mockEmailService.sendEmail).toHaveBeenCalledWith({
			name: 'Test Name',
			email: 'test@test.com',
			subject: 'Subj',
			message: 'Msg'
		});
	});
});
