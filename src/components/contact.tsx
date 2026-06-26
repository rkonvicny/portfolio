import React from "react";
import portfolioData from "@/data/portfolio.json";
import { SectionHeader } from "./section-header";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { ContactForm } from "./contact-form";

export const Contact = () => {
	return (
		<section id="contact" className="py-24 relative">
			<div className="max-w-6xl mx-auto px-6 relative z-10">
				{/* Nadpis sekce */}
				<SectionHeader subtitle="Kontakt" title="Napište mi zprávu" />

				{/* Rozdělení: Kontaktní informace vlevo, Formulář vpravo */}
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
					{/* Info sloupec (2/5 šířky) */}
					<div className="lg:col-span-2 flex flex-col gap-8">
						<h3 className="text-xl font-bold text-zinc-950 dark:text-white">
							Neváhejte se ozvat
						</h3>
						<p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
							Pokud máte zájem o spolupráci, můžete využít kontaktní formulář, nebo mě
							kontaktovat přímo přes e-mail či telefon.
						</p>

						{/* Seznam detailů */}
						<div className="flex flex-col gap-5">
							{/* E-mail */}
							<div className="flex items-center gap-4">
								<div className="w-11 h-11 rounded-xl bg-brand-primary/10 text-brand-primary dark:bg-brand-secondary/10 dark:text-brand-secondary flex items-center justify-center shrink-0">
									<FiMail className="w-5 h-5" />
								</div>
								<div>
									<h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
										E-mail
									</h4>
									<a
										href={`mailto:${portfolioData.personal.email}`}
										className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors"
									>
										{portfolioData.personal.email}
									</a>
								</div>
							</div>

							{/* Telefon */}
							<div className="flex items-center gap-4">
								<div className="w-11 h-11 rounded-xl bg-brand-primary/10 text-brand-primary dark:bg-brand-secondary/10 dark:text-brand-secondary flex items-center justify-center shrink-0">
									<FiPhone className="w-5 h-5" />
								</div>
								<div>
									<h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
										Telefon
									</h4>
									<p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
										{portfolioData.personal.phone}
									</p>
								</div>
							</div>

							{/* Lokalita */}
							<div className="flex items-center gap-4">
								<div className="w-11 h-11 rounded-xl bg-brand-primary/10 text-brand-primary dark:bg-brand-secondary/10 dark:text-brand-secondary flex items-center justify-center shrink-0">
									<FiMapPin className="w-5 h-5" />
								</div>
								<div>
									<h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
										Lokalita
									</h4>
									<p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
										{portfolioData.personal.location}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Formulář (3/5 šířky) */}
					<div className="lg:col-span-3">
						<ContactForm />
					</div>
				</div>
			</div>
		</section>
	);
};
