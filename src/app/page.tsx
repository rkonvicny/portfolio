import { Contact, Experience, Footer, Hero, Navbar, Skills } from "@/components";
import { PageBackground } from "@/components/page-background";
import { appSettings } from "@/data/app-settings";
import { di } from "@infrastructure/di";

export default async function Home() {
	const [experience, skills] = await Promise.all([
		di.getExperienceUseCase.execute(),
		di.getSkillsUseCase.execute()
	]);

	const { enableGlobalBackground, enableGlassmorphism } = appSettings.pageSettings;

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
			{enableGlobalBackground && <PageBackground />}

			{/* Hlavní navigace */}
			<Navbar />

			{/* Obsah stránky */}
			<main className="flex-1 flex flex-col">
				{/* Úvodní sekce (Hero) zůstává průhledná, pod ní svítí pozadí */}
				<Hero />

				{/* Ostatní sekce */}
				<div className={sectionBgClass}>
					{/* Schopnosti (Skills) */}
					<Skills categories={skills} />

					{/* Zkušenosti (Experience Timeline) */}
					<Experience experience={experience} />

					{/* Kontakt (Contact Form) */}
					<Contact />
				</div>
			</main>

			<div className={sectionBgClass}>
				{/* Patička webu */}
				<Footer />
			</div>
		</div>
	);
}
