"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { FiSend, FiLoader } from "react-icons/fi";

type FormStatus = "idle" | "sending" | "success" | "error";

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export const ContactForm = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const [status, setStatus] = useState<FormStatus>("idle");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!formData.name.trim() ||
			!formData.email.trim() ||
			!formData.message.trim() ||
			!formData.subject.trim()
		) {
			return;
		}

		setStatus("sending");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				setStatus("idle");
				setFormData({ name: "", email: "", subject: "", message: "" });
				toast.success("Zpráva byla úspěšně odeslána!", {
					description: "Děkuji za zprávu. Ozvu se vám zpět na uvedený e-mail co nejdříve."
				});
			} else {
				const data = await response.json();
				setStatus("idle");
				toast.error("Chyba při odesílání", {
					description: data.error || "Odeslání zprávy se nezdařilo. Zkuste to prosím znovu."
				});
			}
		} catch {
			setStatus("idle");
			toast.error("Chyba spojení", {
				description: "Došlo k chybě při komunikaci se serverem. Zkontrolujte prosím připojení."
			});
		}
	};

	return (
		<Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-none hover-card-trigger">
			<CardContent className="p-6 sm:p-8">
				{/* Form View */}
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
							<Input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								disabled={status === "sending"}
								className="h-12 px-4 py-3 bg-white/50 dark:bg-zinc-900/50 rounded-xl border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 focus-visible:ring-2 focus-visible:ring-brand-primary dark:focus-visible:ring-brand-secondary transition-all"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="email"
								className="text-xs font-bold uppercase text-zinc-500"
							>
								E-mail <span className="text-red-500">*</span>
							</label>
							<Input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								disabled={status === "sending"}
								className="h-12 px-4 py-3 bg-white/50 dark:bg-zinc-900/50 rounded-xl border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 focus-visible:ring-2 focus-visible:ring-brand-primary dark:focus-visible:ring-brand-secondary transition-all"
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
						<Input
							type="text"
							id="subject"
							name="subject"
							value={formData.subject}
							onChange={handleChange}
							required
							disabled={status === "sending"}
							className="h-12 px-4 py-3 bg-white/50 dark:bg-zinc-900/50 rounded-xl border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 focus-visible:ring-2 focus-visible:ring-brand-primary dark:focus-visible:ring-brand-secondary transition-all"
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
						<Textarea
							id="message"
							name="message"
							rows={5}
							value={formData.message}
							onChange={handleChange}
							required
							disabled={status === "sending"}
							className="min-h-32 px-4 py-3 bg-white/50 dark:bg-zinc-900/50 rounded-xl border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 focus-visible:ring-2 focus-visible:ring-brand-primary dark:focus-visible:ring-brand-secondary transition-all"
						/>
					</div>

					{/* Odesílací tlačítko */}
					<Button
						type="submit"
						disabled={status === "sending"}
						className="w-full py-6 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-medium"
					>
						{status === "sending" ? (
							<>
								<FiLoader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
								Odesílám...
							</>
						) : (
							<>
								<FiSend className="w-4.5 h-4.5 mr-2" />
								Odeslat zprávu
							</>
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
