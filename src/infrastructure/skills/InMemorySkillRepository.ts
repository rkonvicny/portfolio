import { SkillCategory } from "../../domain/skills/SkillCategory";
import { ISkillRepository } from "../../application/skills/ports/ISkillRepository";

export class InMemorySkillRepository implements ISkillRepository {
  private categoriesData: SkillCategory[] = [
    {
      id: "frontend",
      title: "Frontend",
      skills: [
        { name: "React / Next.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "HTML5 & CSS3 / Tailwind", level: 95 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "Redux / Zustand", level: 75 }
      ]
    },
    {
      id: "backend",
      title: "Backend & Databáze",
      skills: [
        { name: "Node.js (Express / NestJS)", level: 85 },
        { name: "PostgreSQL / MySQL", level: 80 },
        { name: "MongoDB", level: 85 },
        { name: "REST API & GraphQL", level: 90 },
        { name: "Redis", level: 70 }
      ]
    },
    {
      id: "devops",
      title: "Nástroje & DevOps",
      skills: [
        { name: "Git & GitHub / GitLab", level: 90 },
        { name: "Docker", level: 75 },
        { name: "Linux / Bash", level: 80 },
        { name: "Vercel / Netlify / AWS", level: 85 },
        { name: "CI/CD Pipelines", level: 70 }
      ]
    }
  ];

  public async getAllSkills(): Promise<SkillCategory[]> {
    return this.categoriesData;
  }
}
