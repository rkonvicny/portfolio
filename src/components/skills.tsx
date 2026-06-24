"use client";

import React from "react";

import { SkillCategory } from "@/domain/entities/skill-category";
import { SectionHeader } from "./section-header";

interface SkillsProps {
	categories: SkillCategory[];
}

const iconMap: Record<string, React.ReactNode> = {
	frontend: (
		<svg
			className="w-6 h-6 text-brand-primary"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
			/>
		</svg>
	),
	backend: (
		<svg
			className="w-6 h-6 text-brand-secondary"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
			/>
		</svg>
	),
	devops: (
		<svg
			className="w-6 h-6 text-brand-accent"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
			/>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
			/>
		</svg>
	),
	database: (
		<svg
			className="w-6 h-6 text-brand-primary"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m-12 5c0 2.21 3.582 4 8 4s8-1.79 8-4"
			/>
		</svg>
	),
	architecture: (
		<svg
			className="w-6 h-6 text-brand-secondary"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
			/>
		</svg>
	),
	pdm: (
		<svg
			className="w-6 h-6 text-brand-accent"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
			/>
		</svg>
	),
	languages: (
		<svg
			className="w-6 h-6 text-brand-primary"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
			/>
		</svg>
	),
	ai: (
		<svg
			className="w-6 h-6 text-purple-500"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M13 10V3L4 14h7v7l9-11h-7z"
			/>
		</svg>
	)
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
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{categories.map((category) => (
						<div
							key={category.title}
							className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 hover-card-trigger"
						>
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
									<span
										key={skill.name}
										className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 bg-zinc-100/80 text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/50 hover:border-brand-primary/50 dark:hover:border-brand-secondary/50 hover:bg-white dark:hover:bg-zinc-800 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] dark:shadow-none hover:-translate-y-0.5"
									>
										{skill.name}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
