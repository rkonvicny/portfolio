import { AppSettings } from "@domain/entities/app-settings";
import { ISettingsRepository } from "@domain/repositories/ISettingsRepository";
import { FileReader } from "../data/FileReader";

export class FileSettingsRepository implements ISettingsRepository {
	public async getSettings(): Promise<AppSettings> {
		return FileReader.readJson<AppSettings>("app-settings.json");
	}
}
