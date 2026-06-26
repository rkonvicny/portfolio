"use client";

import { ExperienceItem } from "@/domain/entities/experience-item";
import portfolioData from "@/data/portfolio.json";
import { SectionHeader } from "./section-header";
import { FiBriefcase, FiBookOpen, FiGlobe } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";

interface ExperienceProps {
	experience: ExperienceItem[];
}

export const Experience = ({ experience }: ExperienceProps) => {
	return (
		<section id="experience" className="py-24 relative overflow-hidden">
			{/* Dekorativní glow pozadí */}
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glow-bg bg-brand-accent opacity-10 w-125 h-125" />

			<div className="max-w-4xl mx-auto px-6 relative z-10">
				{/* Nadpis sekce */}
				<SectionHeader subtitle="Kariéra" title="Pracovní zkušenosti a vzdělání" />

				{/* Vertikální časová osa */}
				<div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 md:ml-6 flex flex-col gap-12">
					{experience.map((item) => (
						<div key={item.id} className="relative pl-8 md:pl-10 group">
							{/* Ikona na ose */}
							<span className="absolute -left-4.25 top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 group-hover:border-brand-primary dark:group-hover:border-brand-secondary transition-colors duration-300">
								{item.type === "work" ? (
									// Briefcase icon
									<FiBriefcase className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-brand-primary dark:group-hover:text-brand-secondary" />
								) : (
									// Academic cap icon
									<FiBookOpen className="w-4.5 h-4.5 text-zinc-500 dark:text-zinc-400 group-hover:text-brand-primary dark:group-hover:text-brand-secondary" />
								)}
							</span>

							{/* Informační karta */}
							<Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-none hover-card-trigger">
								<CardContent className="p-6">
									{/* Hlavička karty */}
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
										<div>
											<h3 className="text-lg font-bold text-zinc-950 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors">
												{item.role}
											</h3>
											<p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
												{item.company}
											</p>
										</div>
										<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/40 text-zinc-600 dark:text-zinc-400 self-start sm:self-center">
											{item.period}
										</span>
									</div>

									{/* Popis činností */}
									<ul className="flex flex-col gap-2.5">
										{item.description.map((bullet, idx) => (
											<li
												key={idx}
												className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex items-start gap-2.5"
											>
												<span className="w-1.5 h-1.5 rounded-full bg-brand-primary dark:bg-brand-secondary shrink-0 mt-2" />
												<span>{bullet}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</div>
					))}
				</div>

				{/* Znalost jazyků pod časovou osou */}
				<div className="mt-16 ml-4 md:ml-6 relative pl-8 md:pl-10">
					{/* Fake uzel na ose */}
					<span className="absolute -left-4.25 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-zinc-950 border-2 border-brand-primary dark:border-brand-secondary">
						<FiGlobe className="w-4 h-4 text-brand-primary dark:text-brand-secondary" />
					</span>

					<Card className="bg-brand-primary/5 dark:bg-brand-secondary/5 border border-brand-primary/20 dark:border-brand-secondary/20 rounded-2xl shadow-none hover-card-trigger">
						<CardContent className="p-6">
							<h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-3 flex items-center gap-2">
								Jazykové znalosti
							</h3>
							<ul className="flex flex-col gap-2">
								{portfolioData.personal.languages.map((lang, idx) => (
									<li
										key={idx}
										className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
									>
										<span className="w-1.5 h-1.5 rounded-full bg-brand-primary dark:bg-brand-secondary shrink-0" />
										{lang}
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
};
