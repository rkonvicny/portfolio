"use client";

import React from "react";

interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: "work" | "education";
}

export default function Experience() {
  const timelineData: TimelineItem[] = [
    {
      id: "exp-1",
      role: "Senior Full-stack Vývojář",
      company: "TechCorp s.r.o.",
      period: "2024 - Současnost",
      description: [
        "Návrh a vývoj robustních cloudových webových aplikací za použití Next.js, Node.js a TypeScriptu.",
        "Optimalizace databázových dotazů a indexace v PostgreSQL, což vedlo k 30% zrychlení odezvy API.",
        "Vedení vývoje klíčových modulů aplikace a mentoring juniornějších členů týmu."
      ],
      type: "work"
    },
    {
      id: "exp-2",
      role: "Full-stack Vývojář",
      company: "WebStudio CZ",
      period: "2022 - 2024",
      description: [
        "Implementace komplexních e-commerce řešení na míru s integrací platebních bran (Stripe, GP webpay).",
        "Tvorba a údržba REST API a integrace externích logistických systémů (Zásilkovna, Balíkovna).",
        "Refaktorizace starších React aplikací do Next.js s cílem zlepšit SEO a rychlost načítání."
      ],
      type: "work"
    },
    {
      id: "exp-3",
      role: "Junior Frontend Developer",
      company: "AppAgency",
      period: "2020 - 2022",
      description: [
        "Kódování pixel-perfect responzivních rozhraní podle grafických předloh ve Figmě.",
        "Vývoj interaktivních komponent v Reactu a správa globálního stavu pomocí Redux Toolkit.",
        "Optimalizace webů pro mobilní zařízení a odstraňování cross-browser chyb."
      ],
      type: "work"
    },
    {
      id: "edu-1",
      role: "Informační Technologie (Bc.)",
      company: "Vysoké učení technické",
      period: "2017 - 2020",
      description: [
        "Bakalářské studium zaměřené na základy softwarového inženýrství, algoritmy, datové struktury a správu databází.",
        "Praktické projekty zaměřené na objektově orientované programování (C++, Java) a základy webových technologií."
      ],
      type: "education"
    }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Dekorativní glow pozadí */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glow-bg bg-brand-accent opacity-10 w-[500px] h-[500px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Nadpis sekce */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest text-brand-primary dark:text-brand-secondary uppercase mb-3">
            Historie
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">
            Zkušenosti a vzdělání
          </p>
          <div className="h-1 w-12 bg-brand-primary dark:bg-brand-secondary mx-auto rounded-full" />
        </div>

        {/* Vertikální časová osa */}
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 md:ml-6 flex flex-col gap-12">
          {timelineData.map((item) => (
            <div key={item.id} className="relative pl-8 md:pl-10 group">
              {/* Ikona na ose */}
              <span className="absolute -left-[17px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 group-hover:border-brand-primary dark:group-hover:border-brand-secondary transition-colors duration-300">
                {item.type === "work" ? (
                  // Briefcase icon
                  <svg className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-brand-primary dark:group-hover:text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4.674 12h4.652a2 2 0 001.995-1.858L19.5 8.25a2 2 0 00-2-2h-11a2 2 0 00-2 2l.349 7.892A2 2 0 006.848 18h4.652m4.674 0a3.987 3.987 0 01-9.348 0" />
                  </svg>
                ) : (
                  // Academic cap icon
                  <svg className="w-4.5 h-4.5 text-zinc-500 dark:text-zinc-400 group-hover:text-brand-primary dark:group-hover:text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                )}
              </span>

              {/* Informační karta */}
              <div className="glass-panel-light dark:glass-panel-dark rounded-2xl p-6 transition-all duration-300 group-hover:translate-x-1">
                {/* Hlavička karty */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                      {item.company}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/40 text-zinc-600 dark:text-zinc-400 self-start sm:self-center">
                    {item.period}
                  </span>
                </div>

                {/* Popis činností */}
                <ul className="flex flex-col gap-2.5">
                  {item.description.map((bullet, idx) => (
                    <li key={idx} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary dark:bg-brand-secondary shrink-0 mt-2" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
