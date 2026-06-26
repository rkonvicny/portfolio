export interface BackgroundSettings {
	/** Vzdálenost mezi uzly. Rozumný rozsah: 48-120 px, výchozí 80. */
	spacing: number;
	/** Dosah magnetického působení kurzoru. Rozumný rozsah: 200-600 px, výchozí 400. */
	pullRadius: number;
	/** Síla přitažení k kurzoru. Rozumný rozsah: 0.1-1.0, výchozí 0.9. */
	pullStrength: number;
	/** Poloměr bodů v síti. Rozumný rozsah: 1-3 px, výchozí 1.5. */
	nodeRadius: number;
	/** Tloušťka čar v síti. Rozumný rozsah: 0.5-2 px, výchozí 1. */
	lineWidth: number;
	/** Návrat bodů do klidové pozice. Rozumný rozsah: 0.005-0.05, výchozí 0.01. */
	dampening: number;
	/** Sledování pohybu myši. Rozumný rozsah: 0.005-0.05, výchozí 0.01. */
	mouseDampening: number;
}

export interface PageSettings {
	/** Zobrazení informačního řádku v hero sekci. */
	enableStatusRow: boolean;
	/** Aktivuje gradient a glow efekt pro jméno v hero sekci. */
	enableNameGlow: boolean;
	/** Zapne barevný gradient textu pro jméno v hero sekci. */
	enableNameGradient: boolean;
	/** Zobrazení typewriter podtitulku v hero sekci. */
	enableTypewriterSection: boolean;
	/** Zobrazení CTA tlačítek v hero sekci. */
	enableButtonRow: boolean;
	/** Rozšířený styl nadpisů sekcí místo minimalistické varianty. */
	enableExtendedSectionHeader: boolean;
	/** Zobrazení theme switcheru v navigaci. */
	enableThemeSwitcher: boolean;
	/** Vykresluje Hero pozadí (mesh a glow) globálně pod celou stránkou */
	enableGlobalBackground: boolean;
	/** Přidá průsvitný skleněný efekt sekcím pod Hero */
	enableGlassmorphism: boolean;
	/** Aktivuje paralaxní efekt u mesh sítě při scrollování */
	enableScrollParallax: boolean;
}

export interface AppSettings {
	pageSettings: PageSettings;
	backgroundSettings: BackgroundSettings;
}

export const appSettings: AppSettings = {
	pageSettings: {
		enableStatusRow: false,
		enableNameGlow: false,
		enableNameGradient: false,
		enableTypewriterSection: false,
		enableButtonRow: false,
		enableExtendedSectionHeader: false,
		enableThemeSwitcher: true,
		enableGlobalBackground: true,
		enableGlassmorphism: true,
		enableScrollParallax: true
	},
	backgroundSettings: {
		spacing: 80,
		pullRadius: 400,
		pullStrength: 0.9,
		nodeRadius: 1.5,
		lineWidth: 1,
		dampening: 0.01,
		mouseDampening: 0.01
	}
};
