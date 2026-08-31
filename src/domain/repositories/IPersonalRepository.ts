import { PersonalData } from "../entities/personal";

export interface IPersonalRepository {
	getPersonalData(): Promise<PersonalData>;
}
