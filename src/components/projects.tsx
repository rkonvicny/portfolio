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

	const filteredProjects =
		activeFilter === "all" ? projects : projects.filter((p) => p.categories?.includes(activeFilter));

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
						<a
							key={project.id}
							href={project.liveUrl || project.githubUrl || "#"}
							target="_blank"
							rel="noopener noreferrer"
							className="group bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden hover-card-trigger cursor-pointer flex flex-col h-full"
						>
							{/* Informace */}
							<div className="p-6 flex flex-col flex-1 justify-between gap-4">
								<div>
									<div className="flex flex-wrap gap-2 mb-3">
										{project.categories?.map((cat) => (
											<span
												key={cat}
												className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-primary/10 text-brand-primary dark:bg-brand-secondary/10 dark:text-brand-secondary"
											>
												{getCategoryLabel(cat)}
											</span>
										))}
									</div>
									<h3 className="text-xl font-bold text-zinc-950 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors mb-2">
										{project.title}
									</h3>
									<p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
										{project.shortDesc}
									</p>
								</div>

								{/* Tagy */}
								<div className="flex flex-wrap gap-1.5 pt-2">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
};
