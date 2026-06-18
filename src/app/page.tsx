import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { di } from "@/infrastructure/di";

export default async function Home() {
  const projects = await di.getProjectsUseCase.execute();
  const experience = await di.getExperienceUseCase.execute();
  const skills = await di.getSkillsUseCase.execute();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-bg-light text-foreground dark:bg-bg-dark transition-colors duration-300">
      {/* Hlavní navigace */}
      <Navbar />
      
      {/* Obsah stránky */}
      <main className="flex-1 flex flex-col">
        {/* Úvodní sekce (Hero) */}
        <Hero />
        
        {/* Schopnosti (Skills) */}
        <Skills categories={skills} />
        
        {/* Projekty (Projects) */}
        <Projects projects={projects} />
        
        {/* Zkušenosti (Experience Timeline) */}
        <Experience experience={experience} />
        
        {/* Kontakt (Contact Form) */}
        <Contact />
      </main>

      {/* Patička webu */}
      <Footer />
    </div>
  );
}
