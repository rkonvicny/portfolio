export interface ExperienceItem {
	id: string;
	role: string;
	company: string;
	period: string;
	description: string[];
	type: "work" | "education";
}
