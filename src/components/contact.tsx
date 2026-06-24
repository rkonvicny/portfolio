"use client";

import React, { useState } from "react";
import portfolioData from "@/data/portfolio.json";
import { SectionHeader } from "./section-header";
import { FiMail, FiPhone, FiMapPin, FiCheck } from "react-icons/fi";

type FormStatus = "idle" | "sending" | "success" | "error";

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export const Contact = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const [status, setStatus] = useState<FormStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name || !formData.email || !formData.message || !formData.subject) {
			setErrorMessage(
				"Prosím vyplňte všechna povinná pole (Jméno, E-mail, Předmět, Zpráva)."
			);
			setStatus("error");
			return;
		}

		setStatus("sending");
		setErrorMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				setStatus("success");
				setFormData({ name: "", email: "", subject: "", message: "" });
			} else {
				const data = await response.json();
				setErrorMessage(
					data.error || "Odeslání zprávy se nezdařilo. Zkuste to prosím znovu."
				);
				setStatus("error");
			}
		} catch {
			setErrorMessage(
				"Došlo k chybě při komunikaci se serverem. Zkontrolujte prosím připojení."
			);
			setStatus("error");
		}
	};

	return (
		<section id="contact" className="py-24 bg-zinc-50/50 dark:bg-zinc-950/20 relative">
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
									<a
										href={`tel:${portfolioData.personal.phone.replace(/\s+/g, "")}`}
										className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors"
									>
										{portfolioData.personal.phone}
									</a>
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
						<div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-6 sm:p-8">
							{status === "success" ? (
								// Success View
								<div className="text-center py-10 flex flex-col items-center gap-4 select-none animate-fade-in-up">
									<div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center animate-bounce">
										<FiCheck className="w-8 h-8" strokeWidth={3} />
									</div>
									<h3 className="text-xl font-bold text-zinc-950 dark:text-white">
										Zpráva byla úspěšně odeslána!
									</h3>
									<p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
										Děkuji za zprávu. Ozvu se vám zpět na uvedený e-mail co
										nejdříve.
									</p>
									<button
										onClick={() => setStatus("idle")}
										className="mt-4 px-6 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
									>
										Poslat další zprávu
									</button>
								</div>
							) : (
								// Form View
								<form onSubmit={handleSubmit} className="flex flex-col gap-6">
									{/* Jméno a E-mail v jednom řádku na desktopu */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										<div className="flex flex-col gap-2">
											<label
												htmlFor="name"
												className="text-xs font-bold uppercase text-zinc-500"
											>
												Vaše jméno <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
												required
												disabled={status === "sending"}
												/* placeholder="Celé jméno ..." */
												className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 bg-white/50 dark:bg-zinc-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-secondary transition-all"
											/>
										</div>
										<div className="flex flex-col gap-2">
											<label
												htmlFor="email"
												className="text-xs font-bold uppercase text-zinc-500"
											>
												E-mail <span className="text-red-500">*</span>
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												required
												disabled={status === "sending"}
												/* placeholder="např. jan.novak@email.cz" */
												className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 bg-white/50 dark:bg-zinc-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-secondary transition-all"
											/>
										</div>
									</div>

									{/* Předmět */}
									<div className="flex flex-col gap-2">
										<label
											htmlFor="subject"
											className="text-xs font-bold uppercase text-zinc-500"
										>
											Předmět zprávy <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											id="subject"
											name="subject"
											value={formData.subject}
											onChange={handleChange}
											required
											disabled={status === "sending"}
											/* placeholder="Např. Poptávka vývoje webu" */
											className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 bg-white/50 dark:bg-zinc-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-secondary transition-all"
										/>
									</div>

									{/* Zpráva */}
									<div className="flex flex-col gap-2">
										<label
											htmlFor="message"
											className="text-xs font-bold uppercase text-zinc-500"
										>
											Text zprávy <span className="text-red-500">*</span>
										</label>
										<textarea
											id="message"
											name="message"
											rows={5}
											value={formData.message}
											onChange={handleChange}
											required
											disabled={status === "sending"}
											/* placeholder="Sem napište svou zprávu..." */
											className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 bg-white/50 dark:bg-zinc-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-secondary transition-all resize-y min-h-30"
										/>
									</div>

									{/* Chybová zpráva */}
									{status === "error" && (
										<div className="p-4 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-semibold">
											{errorMessage}
										</div>
									)}

									{/* Odesílací tlačítko */}
									<button
										type="submit"
										disabled={status === "sending"}
										className="w-full py-3.5 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary/95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
									>
										{status === "sending" ? (
											<>
												<svg
													className="animate-spin h-5 w-5 text-white"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													/>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													/>
												</svg>
												Odesílám...
											</>
										) : (
											<>
												<svg
													className="w-4.5 h-4.5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth={2}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
													/>
												</svg>
												Odeslat zprávu
											</>
										)}
									</button>
								</form>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
