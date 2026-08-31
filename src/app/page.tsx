import { Contact, Experience, Footer, Hero, Navbar, Skills, Projects } from "@/components";
import { PageBackground } from "@/components/page-background";
import { di } from "@infrastructure/di";

export const dynamic = 'force-dynamic';

export default async function Home() {
	const [experience, skills, projects, personal, appSettings] = await Promise.all([
		di.getExperienceUseCase.execute(),
		di.getSkillsUseCase.execute(),
		di.getProjectsUseCase.execute(),
		di.getPersonalUseCase.execute(),
		di.getSettingsUseCase.execute()
	]);

	const { enableGlobalBackground, enableGlassmorphism, enableProjectsSection } = appSettings.pageSettings;

	// Pokud je zapnutý globální background, ostatní sekce musí mít definované pozadí 
	// buď průsvitné (glassmorphism) nebo pevné, aby přes něj plynule přejely.
	const sectionBgClass = enableGlobalBackground 
		? (enableGlassmorphism 
			? "bg-slate-50/10 dark:bg-gray-950/40 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50" 
			: "bg-slate-50 dark:bg-gray-950")
		: "";

	return (
		<div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300">
			{/* Globální interaktivní pozadí (pokud je zapnuto v nastavení) */}
			{enableGlobalBackground && <PageBackground appSettings={appSettings} />}

			{/* Hlavní navigace */}
			<Navbar personal={personal} pageSettings={appSettings.pageSettings} />

			{/* Obsah stránky */}
			<main className="flex-1 flex flex-col">
				{/* Úvodní sekce (Hero) zůstává průhledná, pod ní svítí pozadí */}
				<Hero personal={personal} appSettings={appSettings} />

				{/* Ostatní sekce */}
				<div className={sectionBgClass}>
					{/* Schopnosti (Skills) */}
					<Skills categories={skills} />

					{/* Projekty */}
					{enableProjectsSection && <Projects projects={projects} />}

					{/* Zkušenosti (Experience Timeline) */}
					<Experience experience={experience} />

					{/* Kontakt (Contact Form) */}
					<Contact personal={personal} />
				</div>
			</main>

			<div className={sectionBgClass}>
				{/* Patička webu */}
				<Footer personal={personal} />
			</div>
		</div>
	);
}
