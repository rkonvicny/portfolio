"use client";

import React from "react";

import { SkillCategory } from "../domain/skills/SkillCategory";

interface SkillsProps {
  categories: SkillCategory[];
}

const iconMap: Record<string, React.ReactNode> = {
  frontend: (
    <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  backend: (
    <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  devops: (
    <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

export default function Skills({ categories }: SkillsProps) {

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Dekorativní glow pozadí */}
      <div className="absolute right-0 top-1/4 -translate-y-1/2 glow-bg bg-brand-primary opacity-10 w-96 h-96" />
      <div className="absolute left-0 bottom-1/4 translate-y-1/2 glow-bg bg-brand-secondary opacity-10 w-96 h-96" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Nadpis sekce */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest text-brand-primary dark:text-brand-secondary uppercase mb-3">
            Schopnosti
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">
            Co všechno dokážu vytvořit
          </p>
          <div className="h-1 w-12 bg-brand-primary dark:bg-brand-secondary mx-auto rounded-full" />
        </div>

        {/* Mřížka kategorií */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.title}
              className="glass-panel-light dark:glass-panel-dark rounded-2xl p-6 hover-card-trigger"
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

              {/* Seznam dovedností */}
              <div className="flex flex-col gap-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-300">
                        {skill.name}
                      </span>
                      <span className="font-bold text-brand-primary dark:text-brand-secondary">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Lišta průběhu */}
                    <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
