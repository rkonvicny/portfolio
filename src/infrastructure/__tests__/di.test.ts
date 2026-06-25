import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';


describe('Dependency Injection', () => {
  afterEach(() => { vi.unstubAllEnvs(); });
  beforeEach(() => {
    vi.resetModules();
  });

  it('should use SmtpEmailService when SMTP credentials are provided', async () => {
    vi.stubEnv('SMTP_USER', 'user');
    vi.stubEnv('SMTP_PASS', 'pass');

    const { di } = await import('../di');
    const { SmtpEmailService } = await import('../services/SmtpEmailService');

    const useCase = di.submitContactFormUseCase as unknown as { emailService: unknown };
    expect(useCase.emailService).toBeInstanceOf(SmtpEmailService);
  });

  it('should use MockEmailService when SMTP credentials are missing', async () => {
    vi.stubEnv('SMTP_USER', '');
    vi.stubEnv('SMTP_PASS', '');

    const { di } = await import('../di');
    const { MockEmailService } = await import('../services/MockEmailService');

    const useCase = di.submitContactFormUseCase as unknown as { emailService: unknown };
    expect(useCase.emailService).toBeInstanceOf(MockEmailService);
  });

  it('should initialize repositories and use cases properly', async () => {
    const { di } = await import('../di');

    expect(di.getProjectsUseCase).toBeDefined();
    expect(di.getExperienceUseCase).toBeDefined();
    expect(di.getSkillsUseCase).toBeDefined();
  });
});
