"use client";

import React from "react";
import { appSettings } from "@/data/app-settings";
import { HeroBackground } from "./hero-background";

export const PageBackground = () => {
	const { pageSettings, backgroundSettings } = appSettings;

	// Zda se má background zafixovat globálně (parallax)
	const isGlobal = pageSettings.enableGlobalBackground;

	return (
		<div
			className={
				isGlobal
					? "fixed inset-0 -z-10 pointer-events-none overflow-hidden"
					: "absolute inset-0 -z-10 pointer-events-none overflow-hidden"
			}
		>
			{/* Interaktivní parallax pozadí (mesh) */}
			<div className="absolute inset-0 pointer-events-auto">
				<HeroBackground settings={backgroundSettings} />
			</div>

			{/* Pozadí s neonovými zářemi (glow-bg) */}
			<div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 glow-bg bg-brand-primary opacity-20 dark:opacity-30 w-72 h-72 sm:w-96 sm:h-96" />
			<div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 glow-bg bg-brand-secondary opacity-20 dark:opacity-30 w-72 h-72 sm:w-96 sm:h-96" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-bg bg-brand-accent opacity-10 dark:opacity-15 w-80 h-80 sm:w-125 sm:h-125" />
		</div>
	);
};
