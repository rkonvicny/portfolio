import { AppSettings } from "@domain/entities/app-settings";
import { ISettingsRepository } from "@domain/repositories/ISettingsRepository";

export class GetSettingsUseCase {
	constructor(private readonly settingsRepository: ISettingsRepository) {}

	public async execute(): Promise<AppSettings> {
		return await this.settingsRepository.getSettings();
	}
}
