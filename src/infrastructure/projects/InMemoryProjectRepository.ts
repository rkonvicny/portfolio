import { Project } from "../../domain/projects/Project";
import { IProjectRepository } from "../../application/projects/ports/IProjectRepository";

export class InMemoryProjectRepository implements IProjectRepository {
  private projectsData: Project[] = [
    {
      id: "ecommerce",
      title: "E-commerce Platforma (NeonTech)",
      shortDesc: "Plně responzivní online obchod s technologickými doplňky, košíkem a simulací platby.",
      fullDesc: "Moderní e-shop zaměřený na prodej prémiových klávesnic, myší a audio doplňků. Obsahuje pokročilé vyhledávání, filtrování produktů podle kategorií a parametrů, plně funkční nákupní košík uložený v session a proces dokončení objednávky (checkout).",
      image: "/projects/ecommerce.jpg",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
      category: "fullstack",
      features: [
        "Dynamický katalog s filtrováním a řazením",
        "Perzistentní nákupní košík",
        "Administrační panel pro správu produktů a objednávek",
        "Zabezpečené API routy s JWT autentizací",
        "Optimalizované načítání obrázků pomocí Next.js Image"
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://google.com"
    },
    {
      id: "dashboard",
      title: "SaaS Analytický Dashboard (Nexus)",
      shortDesc: "Interaktivní administrační panel pro analýzu finančních a uživatelských dat v reálném čase.",
      fullDesc: "Komplexní dashboard pro SaaS aplikace, který přehledně vizualizuje klíčové metriky (revenue, active users, churn rate). Data jsou vykreslována pomocí interaktivních grafů s podporou tooltipů a filtrování podle časového období.",
      image: "/projects/dashboard.jpg",
      tags: ["React", "Next.js", "Tailwind v4", "Chart.js", "Mock API"],
      category: "frontend",
      features: [
        "Vizuálně přitažlivé grafy (sloupcové, liniové, koláčové)",
        "Správa uživatelů a nastavení plánů předplatného",
        "Export přehledů do formátů CSV a PDF",
        "Plně responzivní layout a podpora tmavého režimu",
        "Rychlé vyhledávání a stránkování v tabulkách"
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://google.com"
    },
    {
      id: "chat",
      title: "Real-time Chat Aplikace (Luminal)",
      shortDesc: "Komunikační nástroj s podporou chatovacích místností, sdílení souborů a indikátoru psaní.",
      fullDesc: "Pokročilá chatovací platforma podobná Slacku nebo Discordu. Umožňuje uživatelům vytvářet veřejné i soukromé kanály, odesílat zprávy v reálném čase, reagovat pomocí emoji, sdílet soubory a vidět, kdo právě píše nebo je online.",
      image: "/projects/chat.jpg",
      tags: ["Next.js", "Node.js", "Socket.io", "Redis", "MongoDB"],
      category: "fullstack",
      features: [
        "Okamžitý přenos zpráv pomocí WebSockets (Socket.io)",
        "Stav přítomnosti uživatelů (online/offline/nepřítomen)",
        "Indikátor psaní v reálném čase (Typing...)",
        "Ukládání historie zpráv v MongoDB a mezipaměť v Redis",
        "Podpora nahrávání a náhledu obrázků"
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://google.com"
    }
  ];

  public async getAllProjects(): Promise<Project[]> {
    return this.projectsData;
  }
}
