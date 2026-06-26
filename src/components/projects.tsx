"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/domain/entities/project";
import { SectionHeader } from "./section-header";
import { FiX, FiCheck, FiExternalLink, FiGithub } from "react-icons/fi";

interface ProjectsProps {
	projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {
	const [activeFilter, setActiveFilter] = useState<"all" | "frontend" | "backend" | "fullstack">(
		"all"
	);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const filteredProjects =
		activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

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
		<section id="projects" className="py-24 bg-zinc-50/50 dark:bg-zinc-950/20 relative">
			<div className="max-w-6xl mx-auto px-6">
				{/* Nadpis sekce */}
				<SectionHeader subtitle="Portfolio" title="Vybrané projekty" />

				{/* Filtry */}
				<div className="flex flex-wrap items-center justify-center gap-3 mb-12 select-none">
					{(["all", "frontend", "backend", "fullstack"] as const).map((filter) => (
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
					))}
				</div>

				{/* Mřížka projektů */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{filteredProjects.map((project) => (
						<div
							key={project.id}
							onClick={() => setSelectedProject(project)}
							className="group bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden hover-card-trigger cursor-pointer flex flex-col h-full"
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
						<div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl p-6 sm:p-8 animate-fade-in-up z-10">
							{/* Zavírací tlačítko */}
							<button
								onClick={() => setSelectedProject(null)}
								className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
								aria-label="Zavřít"
							>
								<FiX className="w-5 h-5" />
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
											<FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" strokeWidth={3} />
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
									<FiExternalLink className="w-4.5 h-4.5" />
									Demo / Živý náhled
								</a>
								<a
									href={selectedProject.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium transition-colors"
								>
									<FiGithub className="w-4.5 h-4.5" />
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
