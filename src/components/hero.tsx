"use client";

import React, { useEffect, useState } from "react";
import portfolioData from "@/data/portfolio.json";
import { HeroBackground } from "./hero-background";

const { personal, pageSettings } = portfolioData;
const typewriterWords = personal.typewriterWords;

export const Hero = () => {
	const [wordIndex, setWordIndex] = useState(0);
	const [currentText, setCurrentText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [typingSpeed, setTypingSpeed] = useState(100);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		const handleType = () => {
			const fullWord = typewriterWords[wordIndex];

			if (!isDeleting) {
				// Psaní písmen
				setCurrentText(fullWord.substring(0, currentText.length + 1));
				setTypingSpeed(100);

				if (currentText === fullWord) {
					// Slovo je celé napsané, počkáme před mazáním
					timer = setTimeout(() => setIsDeleting(true), 2000);
					return;
				}
			} else {
				// Mazání písmen
				setCurrentText(fullWord.substring(0, currentText.length - 1));
				setTypingSpeed(50);

				if (currentText === "") {
					setIsDeleting(false);
					setWordIndex((prev) => (prev + 1) % typewriterWords.length);
				}
			}

			timer = setTimeout(handleType, typingSpeed);
		};

		timer = setTimeout(handleType, typingSpeed);

		return () => clearTimeout(timer);
	}, [currentText, isDeleting, wordIndex, typingSpeed]);

	const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const element = document.getElementById("contact");
		if (element) {
			const yOffset = -80;
			const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	return (
		<section
			id="home"
			className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
		>
			{/* Interaktivní parallax pozadí */}
			<HeroBackground />

			{/* Pozadí s neonovými zářemi (glow-bg) */}
			<div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 glow-bg bg-brand-primary opacity-20 dark:opacity-30 w-72 h-72 sm:w-96 sm:h-96" />
			<div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 glow-bg bg-brand-secondary opacity-20 dark:opacity-30 w-72 h-72 sm:w-96 sm:h-96" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-bg bg-brand-accent opacity-10 dark:opacity-15 w-80 h-80 sm:w-125 sm:h-125" />

			<div className="relative z-10 max-w-4xl mx-auto px-6 text-center select-none animate-fade-in-up">
				{/* Pozdrav */}
				<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/30 dark:bg-zinc-900/30 backdrop-blur-md mb-6">
					<span className="flex h-2 w-2 relative">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
					</span>
					<span className="text-xs font-semibold tracking-wide uppercase text-zinc-600 dark:text-zinc-300">
						Dostupný pro nové projekty
					</span>
				</div>

				{/* Hlavní titulek */}
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
					Ahoj, já jsem{" "}
					<span
						className={
							pageSettings.enableNameGradient
								? `bg-clip-text text-transparent bg-linear-to-r from-brand-primary via-brand-secondary to-brand-accent ${pageSettings.enableNameGlow ? "animate-glow" : ""}`
								: "text-zinc-900 dark:text-white"
						}
					>
						{personal.name}
					</span>
				</h1>
				{pageSettings.enableTypewriterSection && (
					<>
						{/* Dynamický podtitulek s psacím efektem */}
						<h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-600 dark:text-zinc-400 mb-8 min-h-10">
							Hledáte{" "}
							<span className="text-zinc-900 dark:text-white font-semibold border-r-2 border-brand-primary dark:border-brand-secondary pr-1 animate-pulse">
								{currentText}
							</span>
						</h2>
					</>
				)}
				{/* Krátké shrnutí */}
				<p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
					{personal.bio}
				</p>
				{pageSettings.enableButtonBar && (
					<>
						{/* CTA Tlačítka */}
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
							{/* Tlačítko Kontaktovat */}
							<a
								href="#contact"
								onClick={handleScrollToContact}
								className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-primary text-white font-medium hover:bg-brand-primary/95 hover:shadow-lg hover:shadow-brand-primary/25 transition-all text-center duration-300 cursor-pointer"
							>
								Kontaktujte mě
							</a>

							{/* Tlačítko Zkušenosti */}
							<a
								href="#experience"
								onClick={(e) => {
									e.preventDefault();
									const element = document.getElementById("experience");
									if (element) {
										const yOffset = -80;
										const y =
											element.getBoundingClientRect().top +
											window.scrollY +
											yOffset;
										window.scrollTo({ top: y, behavior: "smooth" });
									}
								}}
								className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 backdrop-blur-xs transition-all text-center duration-300 cursor-pointer"
							>
								Prohlédnout kariéru
							</a>
						</div>
					</>
				)}
			</div>

			{/* Šipka dolů pro rolování */}
			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
				<span className="text-xs text-zinc-400 dark:text-zinc-500 mb-2 uppercase tracking-widest font-semibold">
					Více
				</span>
				<svg
					className="w-6 h-6 text-zinc-400 dark:text-zinc-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					/>
				</svg>
			</div>
		</section>
	);
};
