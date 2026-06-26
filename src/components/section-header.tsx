import React from "react";
import { appSettings } from "@/data/app-settings";

const { pageSettings } = appSettings;

interface SectionHeaderProps {
	title: string;
	subtitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
	return (
		<div className="text-center mb-16">
			<h2 className="text-xs font-bold tracking-widest text-brand-primary dark:text-brand-secondary uppercase mb-3">
				{subtitle}
			</h2>
			{pageSettings.enableExtendedSectionHeader ? (
				<>
					<p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">
						{title}
					</p>
					<div className="h-1 w-12 bg-brand-primary dark:bg-brand-secondary mx-auto rounded-full" />
				</>
			) : (
				<div className="h-0.5 w-30 bg-brand-primary dark:bg-brand-secondary mx-auto rounded-full" />
			)}
		</div>
	);
};
