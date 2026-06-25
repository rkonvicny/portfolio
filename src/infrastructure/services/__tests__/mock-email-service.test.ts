import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MockEmailService } from '../MockEmailService';
import { ContactMessage } from '@/domain/entities/contact-message';

describe('MockEmailService', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should resolve after simulating a network delay', async () => {
		// Arrange
		const service = new MockEmailService();
		const message: ContactMessage = {
			name: 'John Doe',
			email: 'john@doe.com',
			subject: 'Test Subject',
			message: 'Test Message',
			createdAt: new Date()
		};

		// Act
		const sendPromise = service.sendEmail(message);

		// Fast-forward time
		vi.advanceTimersByTime(1200);

		// Assert
		await expect(sendPromise).resolves.toBeUndefined();
	});
});
