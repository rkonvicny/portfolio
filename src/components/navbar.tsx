"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import portfolioData from "@/data/portfolio.json";
import { appSettings } from "@/data/app-settings";
import { FaGithub } from "react-icons/fa";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";

const { pageSettings } = appSettings;
const { personal } = portfolioData;

const githubSocial = personal.socials?.find(
	(s: { icon: string; url: string }) => s.icon === "github"
);

interface NavLink {
	label: string;
	href: string;
}

const navLinks: NavLink[] = [
	{ label: "Domů", href: "#home" },
	{ label: "Dovednosti", href: "#skills" },
	{ label: "Projekty", href: "#projects" },
	{ label: "Zkušenosti", href: "#experience" },
	{ label: "Kontakt", href: "#contact" }
];

export const Navbar = () => {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [activeSection, setActiveSection] = useState("home");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const siteTitle = portfolioData.personal.siteTitle.split(".");

	useEffect(() => {
		// eslint-disable-next-line
		setMounted(true);
	}, []);

	// Detekce scrollování pro změnu vzhledu navbaru
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);

			// Aktualizace aktivní sekce podle scrollování
			const sections = navLinks.map((link) => link.href.substring(1));
			let current = sections[0];

			// Procházíme sekce odzadu a hledáme tu, jejíž vršek je alespoň v horní polovině okna
			for (let i = sections.length - 1; i >= 0; i--) {
				const element = document.getElementById(sections[i]);
				if (element) {
					const rect = element.getBoundingClientRect();
					if (rect.top <= window.innerHeight / 2) {
						current = sections[i];
						break;
					}
				}
			}

			// Speciální kontrola: pokud jsme dorolovali na absolutní konec stránky, vždy aktivujeme poslední sekci
			if (
				window.innerHeight + Math.round(window.scrollY) >=
				document.body.offsetHeight - 50
			) {
				current = sections[sections.length - 1];
			}

			setActiveSection(current);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault();
		setMobileMenuOpen(false);

		const targetId = href.substring(1);
		const element = document.getElementById(targetId);

		if (element) {
			// Konstanta offsetu odpovídající výšce navbaru
			const yOffset = -80;
			const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

			window.scrollTo({ top: y, behavior: "smooth" });
			setActiveSection(targetId);
		}
	};

	return (
		<>
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
					scrolled
						? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-slate-200/80 dark:border-slate-800/80 py-4 shadow-sm"
						: "bg-transparent border-transparent py-6"
				}`}
			>
				<div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
					{/* Logo */}
					<a
						href="#home"
						onClick={(e) => handleLinkClick(e, "#home")}
						className="text-xl font-bold tracking-tight text-brand-primary dark:text-brand-secondary transition-all hover:scale-105"
					>
						{siteTitle[0]}
						{siteTitle[1] && (
							<span className="text-slate-900 dark:text-white">.{siteTitle[1]}</span>
						)}
					</a>

					{/* Desktop Nav Links */}
					<div className="hidden md:flex items-center gap-8">
						<ul className="flex items-center gap-6">
							{navLinks.map((link) => {
								const id = link.href.substring(1);
								const isActive = activeSection === id;
								return (
									<li key={link.href}>
										<a
											href={link.href}
											onClick={(e) => handleLinkClick(e, link.href)}
											className={`text-sm font-medium relative py-1 transition-colors hover:text-brand-primary dark:hover:text-brand-secondary ${
												isActive
													? "text-brand-primary dark:text-brand-secondary"
													: "text-zinc-600 dark:text-zinc-400"
											}`}
										>
											{link.label}
											{isActive && (
												<span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand-primary dark:bg-brand-secondary transition-all duration-300" />
											)}
										</a>
									</li>
								);
							})}
						</ul>
						{/* GitHub Link (Desktop) */}
						{githubSocial && (
							<a
								href={githubSocial.url}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors"
								aria-label="GitHub"
							>
								<FaGithub className="w-5 h-5" />
							</a>
						)}

						{pageSettings.enableThemeSwitcher && (
							<>
								{/* Theme Switcher Button */}
								{mounted ? (
									<button
										onClick={() =>
											setTheme(resolvedTheme === "dark" ? "light" : "dark")
										}
										className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
										aria-label="Přepnout barevný motiv"
									>
										{resolvedTheme === "light" ? (
											// Moon Icon for switching to dark
											<FiMoon className="w-5 h-5" />
										) : (
											// Sun Icon for switching to light
											<FiSun className="w-5 h-5 text-amber-400" />
										)}
									</button>
								) : (
									<div className="w-10.5 h-10.5"></div>
								)}
							</>
						)}
					</div>

					{/* Mobile Menu Actions */}
					<div className="flex items-center gap-4 md:hidden">
						{/* GitHub Link (Mobile) */}
						{githubSocial && (
							<a
								href={githubSocial.url}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-secondary"
								aria-label="GitHub"
							>
								<FaGithub className="w-4.5 h-4.5" />
							</a>
						)}
						{pageSettings.enableThemeSwitcher && (
							<>
								{/* Theme Switcher */}
								{mounted ? (
									<button
										onClick={() =>
											setTheme(resolvedTheme === "dark" ? "light" : "dark")
										}
										className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
										aria-label="Přepnout barevný motiv"
									>
										{resolvedTheme === "light" ? (
											<FiMoon className="w-4.5 h-4.5" />
										) : (
											<FiSun className="w-4.5 h-4.5 text-amber-400" />
										)}
									</button>
								) : (
									<div className="w-9.5 h-9.5"></div>
								)}
							</>
						)}
						{/* Burger Menu Button */}
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
							aria-label="Otevřít menu"
						>
							{mobileMenuOpen ? (
								<FiX className="w-6 h-6" />
							) : (
								<FiMenu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile Nav Drawer */}
			<div
				className={`fixed inset-y-0 right-0 z-40 w-64 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-l border-slate-200 dark:border-slate-800 shadow-2xl p-6 transition-transform duration-300 md:hidden flex flex-col justify-between ${
					mobileMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="mt-16 flex flex-col gap-6">
					<ul className="flex flex-col gap-4">
						{navLinks.map((link) => {
							const id = link.href.substring(1);
							const isActive = activeSection === id;
							return (
								<li key={link.href}>
									<a
										href={link.href}
										onClick={(e) => handleLinkClick(e, link.href)}
										className={`text-base font-semibold block py-2 px-3 rounded-lg transition-colors ${
											isActive
												? "bg-brand-primary/10 text-brand-primary dark:text-brand-secondary dark:bg-brand-secondary/10"
												: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
										}`}
									>
										{link.label}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="text-xs text-center text-zinc-500 dark:text-zinc-600 border-t border-zinc-200 dark:border-zinc-800 pt-4">
					konr.cz © 2026
				</div>
			</div>
			{/* Drawer Overlay */}
			{mobileMenuOpen && (
				<div
					onClick={() => setMobileMenuOpen(false)}
					className="fixed inset-0 z-30 bg-black/20 dark:bg-black/40 backdrop-blur-xs md:hidden"
				/>
			)}
		</>
	);
};
