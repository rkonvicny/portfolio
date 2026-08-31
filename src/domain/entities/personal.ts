export interface SocialLink {
	platform: string;
	url: string;
	icon: string;
}

export interface PersonalData {
	name: string;
	role: string;
	email: string;
	phone: string;
	location: string;
	socials: SocialLink[];
	bio: string;
	typewriterWords: string[];
	siteTitle: string;
	languages: string[];
}
