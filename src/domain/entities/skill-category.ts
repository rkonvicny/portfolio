export interface SkillItem {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  id: string; // "frontend", "backend", "devops"
  title: string;
  skills: SkillItem[];
}
