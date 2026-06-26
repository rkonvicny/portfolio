import type { Metadata } from "next";
import { Ubuntu_Sans, Ubuntu_Sans_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/sonner";

const ubuntu = Ubuntu_Sans({
	variable: "--font-ubuntu-sans",
	subsets: ["latin"]
});

const ubuntuMono = Ubuntu_Sans_Mono({
	variable: "--font-ubuntu-sans-mono",
	subsets: ["latin"]
});

import portfolioData from "@/data/portfolio.json";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: `${portfolioData.personal.siteTitle} | ${portfolioData.personal.role}`,
	description: portfolioData.personal.bio
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="cs"
			className={cn("h-full", "antialiased", ubuntu.className, ubuntuMono.variable)}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
