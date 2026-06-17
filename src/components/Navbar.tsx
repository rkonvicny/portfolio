"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Úvod", href: "#home" },
  { label: "Dovednosti", href: "#skills" },
  { label: "Projekty", href: "#projects" },
  { label: "Zkušenosti", href: "#experience" },
  { label: "Kontakt", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detekce scrollování pro změnu vzhledu navbaru
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer pro detekci aktivní sekce
  useEffect(() => {
    const observers = navLinks.map((link) => {
      const id = link.href.substring(1);
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.4 } // Sekce se stane aktivní, když je z 40 % viditelná
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      const yOffset = -80; // Výška navbaru
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-navbar-light dark:glass-navbar-dark py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="text-xl font-bold tracking-tight text-brand-primary dark:text-brand-secondary transition-all hover:scale-105"
        >
          Konr<span className="text-foreground">.dev</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-sm font-medium relative py-1 transition-colors hover:text-brand-primary dark:hover:text-brand-secondary ${
                      isActive
                        ? "text-brand-primary dark:text-brand-secondary"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-brand-primary dark:bg-brand-secondary transition-all duration-300" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Přepnout barevný motiv"
          >
            {theme === "light" ? (
              // Moon Icon for switching to dark
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              // Sun Icon for switching to light
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m2.828 0l-.707-.707m12.02-12.02l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Actions */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
            aria-label="Přepnout barevný motiv"
          >
            {theme === "light" ? (
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m2.828 0l-.707-.707m12.02-12.02l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>

          {/* Burger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
            aria-label="Otevřít menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 glass-panel-light dark:glass-panel-dark shadow-2xl p-6 transition-transform duration-300 md:hidden flex flex-col justify-between ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mt-16 flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-base font-semibold block py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-brand-primary/10 text-brand-primary dark:text-brand-secondary dark:bg-brand-secondary/10"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="text-xs text-center text-zinc-500 dark:text-zinc-600 border-t border-zinc-200 dark:border-zinc-800 pt-4">
          Konr.dev © 2026
        </div>
      </div>
      {/* Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 dark:bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}
    </nav>
  );
}
