import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-bg-light text-foreground dark:bg-bg-dark transition-colors duration-300">
      {/* Hlavní navigace */}
      <Navbar />
      
      {/* Obsah stránky */}
      <main className="flex-1 flex flex-col">
        {/* Úvodní sekce (Hero) */}
        <Hero />
        
        {/* Schopnosti (Skills) */}
        <Skills />
        
        {/* Projekty (Projects) */}
        <Projects />
        
        {/* Zkušenosti (Experience Timeline) */}
        <Experience />
        
        {/* Kontakt (Contact Form) */}
        <Contact />
      </main>

      {/* Patička webu */}
      <Footer />
    </div>
  );
}
