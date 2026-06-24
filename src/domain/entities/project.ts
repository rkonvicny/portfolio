export interface Project {
	id: string;
	title: string;
	shortDesc: string;
	fullDesc: string;
	image: string;
	tags: string[];
	category: "frontend" | "backend" | "fullstack";
	features: string[];
	githubUrl: string;
	liveUrl: string;
}
