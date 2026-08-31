import { PersonalData } from "@domain/entities/personal";
import { IPersonalRepository } from "@domain/repositories/IPersonalRepository";

export class GetPersonalUseCase {
	constructor(private readonly personalRepository: IPersonalRepository) {}

	public async execute(): Promise<PersonalData> {
		return await this.personalRepository.getPersonalData();
	}
}
