import {
	Contact,
	Experience,
	Footer,
	Hero,
	Navbar,
	Projects,
	Skills,
} from "@/components";
import { di } from "@infrastructure/di";

export default async function Home() {
	const [projects, experience, skills] = await Promise.all([
		di.getProjectsUseCase.execute(),
		di.getExperienceUseCase.execute(),
		di.getSkillsUseCase.execute(),
	]);

	return (
		<div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300">
			{/* Hlavní navigace */}
			<Navbar />

			{/* Obsah stránky */}
			<main className="flex-1 flex flex-col">
				{/* Úvodní sekce (Hero) */}
				<Hero />

				{/* Schopnosti (Skills) */}
				<Skills categories={skills} />

				{/* Projekty (Projects) */}
				<Projects projects={projects} />

				{/* Zkušenosti (Experience Timeline) */}
				<Experience experience={experience} />

				{/* Kontakt (Contact Form) */}
				<Contact />
			</main>

			{/* Patička webu */}
			<Footer />
		</div>
	);
}
