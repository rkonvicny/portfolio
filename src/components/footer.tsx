"use client";

import React from "react";
import portfolioData from "@/data/portfolio.json";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
	github: FaGithub,
	linkedin: FaLinkedin,
	twitter: FaTwitter
};

export const Footer = () => {
	const currentYear = new Date().getFullYear();
	const socials = portfolioData.personal.socials || [];

	const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="py-6 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-gray-950 relative z-10 transition-colors duration-300">
			<div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative">
				{/* Copyright */}
				<div className="text-center md:text-left select-none order-3 md:order-1">
					<p className="text-xs text-zinc-500 dark:text-zinc-500">
						© {currentYear} {portfolioData.personal.siteTitle}. Všechna práva vyhrazena.
					</p>
				</div>

				{/* Šipka nahoru */}
				<div className="order-1 md:order-2">
					<a
						href="#home"
						onClick={handleScrollToTop}
						className="p-3 inline-flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-secondary hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
						aria-label="Zpět nahoru"
					>
						<FaArrowUp className="w-4 h-4" />
					</a>
				</div>

				{/* Sociální sítě */}
				<div className="flex items-center gap-5 order-2 md:order-3">
					{socials.map((social) => {
						const Icon = iconMap[social.icon];
						return (
							<a
								key={social.platform}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2.5 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-secondary hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all"
								aria-label={social.platform}
							>
								{Icon ? (
									<Icon className="w-5 h-5" />
								) : (
									<span className="text-xs font-bold px-1 uppercase">
										{social.platform.substring(0, 2)}
									</span>
								)}
							</a>
						);
					})}
				</div>
			</div>
		</footer>
	);
};
