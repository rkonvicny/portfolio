import { ExperienceItem } from "../../domain/experience/ExperienceItem";
import { IExperienceRepository } from "../../application/experience/ports/IExperienceRepository";

export class InMemoryExperienceRepository implements IExperienceRepository {
  private timelineData: ExperienceItem[] = [
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

  public async getAllExperience(): Promise<ExperienceItem[]> {
    return this.timelineData;
  }
}
