"use client";

import { useState } from "react";
import Image from "next/image";

import { Project } from "../domain/projects/Project";

interface ProjectsProps {
	projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {
	const [activeFilter, setActiveFilter] = useState<
		"all" | "frontend" | "backend" | "fullstack"
	>("all");
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const filteredProjects =
		activeFilter === "all"
			? projects
			: projects.filter((p) => p.category === activeFilter);

	const getCategoryLabel = (cat: string) => {
		switch (cat) {
			case "frontend":
				return "Frontend";
			case "backend":
				return "Backend";
			case "fullstack":
				return "Full-stack";
			default:
				return cat;
		}
	};

	return (
		<section
			id="projects"
			className="py-24 bg-zinc-50/50 dark:bg-zinc-950/20 relative"
		>
			<div className="max-w-6xl mx-auto px-6">
				{/* Nadpis sekce */}
				<div className="text-center mb-12">
					<h2 className="text-xs font-bold tracking-widest text-brand-primary dark:text-brand-secondary uppercase mb-3">
						Portfolio
					</h2>
					<p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">
						Vybrané projekty
					</p>
					<div className="h-1 w-12 bg-brand-primary dark:bg-brand-secondary mx-auto rounded-full" />
				</div>

				{/* Filtry */}
				<div className="flex flex-wrap items-center justify-center gap-3 mb-12 select-none">
					{(["all", "frontend", "backend", "fullstack"] as const).map(
						(filter) => (
							<button
								key={filter}
								onClick={() => setActiveFilter(filter)}
								className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
									activeFilter === filter
										? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 dark:bg-brand-secondary dark:text-zinc-950 dark:shadow-brand-secondary/20"
										: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
								}`}
							>
								{filter === "all" ? "Vše" : getCategoryLabel(filter)}
							</button>
						),
					)}
				</div>

				{/* Mřížka projektů */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{filteredProjects.map((project) => (
						<div
							key={project.id}
							onClick={() => setSelectedProject(project)}
							className="group glass-panel-light dark:glass-panel-dark rounded-2xl overflow-hidden hover-card-trigger cursor-pointer flex flex-col h-full"
						>
							{/* Obrázek */}
							<div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
								<Image
									src={project.image}
									alt={project.title}
									fill
									sizes="(max-w-768px) 100vw, 33vw"
									className="object-cover transition-transform duration-500 group-hover:scale-105"
									priority={project.id === "ecommerce"}
								/>
								<span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
									{getCategoryLabel(project.category)}
								</span>
							</div>

							{/* Informace */}
							<div className="p-6 flex flex-col flex-1 justify-between gap-4">
								<div>
									<h3 className="text-lg font-bold text-zinc-950 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors mb-2">
										{project.title}
									</h3>
									<p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
										{project.shortDesc}
									</p>
								</div>

								{/* Tagy */}
								<div className="flex flex-wrap gap-1.5 pt-2">
									{project.tags.slice(0, 3).map((tag) => (
										<span
											key={tag}
											className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
										>
											{tag}
										</span>
									))}
									{project.tags.length > 3 && (
										<span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500">
											+{project.tags.length - 3}
										</span>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Modální okno s detaily projektu */}
				{selectedProject && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						{/* Backdrop */}
						<div
							onClick={() => setSelectedProject(null)}
							className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
						/>
						{/* Modal Box */}
						<div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel-light dark:glass-panel-dark shadow-2xl p-6 sm:p-8 animate-fade-in-up z-10">
							{/* Zavírací tlačítko */}
							<button
								onClick={() => setSelectedProject(null)}
								className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
								aria-label="Zavřít"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>

							{/* Náhled */}
							<div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-zinc-100 dark:bg-zinc-900">
								<Image
									src={selectedProject.image}
									alt={selectedProject.title}
									fill
									className="object-cover"
								/>
							</div>

							{/* Titulek */}
							<span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-primary/10 text-brand-primary dark:bg-brand-secondary/10 dark:text-brand-secondary mb-3">
								{getCategoryLabel(selectedProject.category)}
							</span>
							<h3 className="text-2xl font-extrabold text-zinc-950 dark:text-white mb-4">
								{selectedProject.title}
							</h3>

							{/* Popis */}
							<div className="mb-6">
								<h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">
									O projektu
								</h4>
								<p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
									{selectedProject.fullDesc}
								</p>
							</div>

							{/* Klíčové vlastnosti */}
							<div className="mb-6">
								<h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">
									Klíčové funkce
								</h4>
								<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-zinc-600 dark:text-zinc-400">
									{selectedProject.features.map((feat, idx) => (
										<li key={idx} className="flex items-start gap-2">
											<svg
												className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={3}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M5 13l4 4L19 7"
												/>
											</svg>
											<span>{feat}</span>
										</li>
									))}
								</ul>
							</div>

							{/* Použité technologie */}
							<div className="mb-8">
								<h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">
									Technologie
								</h4>
								<div className="flex flex-wrap gap-2">
									{selectedProject.tags.map((tag) => (
										<span
											key={tag}
											className="px-3 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
										>
											{tag}
										</span>
									))}
								</div>
							</div>

							{/* Odkazy */}
							<div className="flex flex-col sm:flex-row gap-4 border-t border-zinc-200/50 dark:border-zinc-800/40 pt-6">
								<a
									href={selectedProject.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary/90 transition-colors"
								>
									<svg
										className="w-4.5 h-4.5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
									Demo / Živý náhled
								</a>
								<a
									href={selectedProject.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium transition-colors"
								>
									<svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
										/>
									</svg>
									Zdrojový kód
								</a>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};
