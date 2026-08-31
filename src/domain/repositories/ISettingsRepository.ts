import { AppSettings } from "../entities/app-settings";

export interface ISettingsRepository {
	getSettings(): Promise<AppSettings>;
}
