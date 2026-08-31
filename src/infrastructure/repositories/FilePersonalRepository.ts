import { PersonalData } from "@domain/entities/personal";
import { IPersonalRepository } from "@domain/repositories/IPersonalRepository";
import { FileReader } from "../data/FileReader";

export class FilePersonalRepository implements IPersonalRepository {
	public async getPersonalData(): Promise<PersonalData> {
		const data = FileReader.readJson<{ personal: PersonalData }>("portfolio.json");
		return data.personal;
	}
}
