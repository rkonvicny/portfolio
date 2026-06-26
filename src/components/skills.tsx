"use client";

import React from "react";

import { SkillCategory } from "@/domain/entities/skill-category";
import { SectionHeader } from "./section-header";

interface SkillsProps {
	categories: SkillCategory[];
}

import {
	FiLayout,
	FiServer,
	FiSettings,
	FiDatabase,
	FiLayers,
	FiBox,
	FiCode,
	FiZap
} from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, React.ReactNode> = {
	frontend: <FiLayout className="w-6 h-6 text-brand-primary" />,
	backend: <FiServer className="w-6 h-6 text-brand-secondary" />,
	devops: <FiSettings className="w-6 h-6 text-brand-accent" />,
	database: <FiDatabase className="w-6 h-6 text-brand-primary" />,
	architecture: <FiLayers className="w-6 h-6 text-brand-secondary" />,
	pdm: <FiBox className="w-6 h-6 text-brand-accent" />,
	languages: <FiCode className="w-6 h-6 text-brand-primary" />,
	ai: <FiZap className="w-6 h-6 text-purple-500" />
};

export const Skills = ({ categories }: SkillsProps) => {
	return (
		<section id="skills" className="py-24 relative overflow-hidden">
			{/* Dekorativní glow pozadí */}
			<div className="absolute right-0 top-1/4 -translate-y-1/2 glow-bg bg-brand-primary opacity-10 w-96 h-96" />
			<div className="absolute left-0 bottom-1/4 translate-y-1/2 glow-bg bg-brand-secondary opacity-10 w-96 h-96" />

			<div className="max-w-6xl mx-auto px-6 relative z-10">
				{/* Nadpis sekce */}
				<SectionHeader subtitle="Schopnosti" title="Co všechno dokážu vytvořit" />

				{/* Mřížka kategorií */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{categories.map((category) => (
						<Card
							key={category.id}
							className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-none hover-card-trigger"
						>
							<CardContent className="p-6">
								{/* Hlavička kategorie */}
								<div className="flex items-center gap-3.5 mb-8 border-b border-zinc-200/50 dark:border-zinc-800/40 pb-4">
									<div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/50">
										{iconMap[category.id] || iconMap["frontend"]}
									</div>
									<h3 className="text-lg font-bold text-zinc-950 dark:text-white">
										{category.title}
									</h3>
								</div>

								{/* Seznam dovedností (Tag Cloud) */}
								<div className="flex flex-wrap gap-2.5">
									{category.skills.map((skill) => (
										<Badge
											key={skill.name}
											variant="secondary"
											className="h-auto px-3.5 py-1.5 rounded-lg text-sm font-medium border border-zinc-200/80 dark:border-zinc-700/50 hover:border-brand-primary/50 dark:hover:border-brand-secondary/50 hover:bg-white dark:hover:bg-zinc-800 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] dark:shadow-none hover:-translate-y-0.5 transition-all duration-200"
										>
											{skill.name}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};
