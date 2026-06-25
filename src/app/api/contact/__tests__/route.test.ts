import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../route';
import { di } from '@infrastructure/di';
import { ValidationError } from '@/domain/errors/validation-error';

// Mock Next.js NextResponse
vi.mock('next/server', () => {
	return {
		NextResponse: {
			json: vi.fn((data, options) => {
				return {
					status: options?.status || 200,
					json: async () => data
				};
			})
		}
	};
});

vi.mock('@infrastructure/di', () => {
	return {
		di: {
			submitContactFormUseCase: {
				execute: vi.fn()
			}
		}
	};
});

describe('Contact API Route (POST)', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return 200 on successful form submission', async () => {
		// Arrange
		const mockBody = {
			name: 'Test',
			email: 'test@test.com',
			subject: 'Subj',
			message: 'Msg'
		};
		const request = new Request('http://localhost/api/contact', {
			method: 'POST',
			body: JSON.stringify(mockBody)
		});

		vi.mocked(di.submitContactFormUseCase.execute).mockResolvedValue(undefined);

		// Act
		const response = await POST(request);
		const responseData = await response.json();

		// Assert
		expect(response.status).toBe(200);
		expect(responseData).toEqual({ success: true });
		expect(di.submitContactFormUseCase.execute).toHaveBeenCalledWith(mockBody);
	});

	it('should return 400 when validation fails', async () => {
		// Arrange
		const mockBody = { name: '', email: 'test@test.com', subject: 'Subj', message: 'Msg' };
		const request = new Request('http://localhost/api/contact', {
			method: 'POST',
			body: JSON.stringify(mockBody)
		});

		vi.mocked(di.submitContactFormUseCase.execute).mockRejectedValue(
			new ValidationError('Neplatná data')
		);

		// Act
		const response = await POST(request);
		const responseData = await response.json();

		// Assert
		expect(response.status).toBe(400);
		expect(responseData).toEqual({ error: 'Neplatná data' });
	});

	it('should return 500 when an internal server error occurs', async () => {
		// Arrange
		const mockBody = { name: 'Test', email: 'test@test.com', subject: 'Subj', message: 'Msg' };
		const request = new Request('http://localhost/api/contact', {
			method: 'POST',
			body: JSON.stringify(mockBody)
		});

		vi.mocked(di.submitContactFormUseCase.execute).mockRejectedValue(new Error('Network Error'));

		// Act
		const response = await POST(request);
		const responseData = await response.json();

		// Assert
		expect(response.status).toBe(500);
		expect(responseData).toEqual({ error: 'Při zpracování zprávy došlo k chybě na serveru.' });
	});
});
