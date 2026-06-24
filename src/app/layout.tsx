import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Ubuntu_Sans, Ubuntu_Sans_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const ubuntu = Ubuntu_Sans({
	variable: "--font-ubuntu-sans",
	subsets: ["latin"]
});

const ubuntuMono = Ubuntu_Sans_Mono({
	variable: "--font-ubuntu-sans-mono",
	subsets: ["latin"]
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

import portfolioData from "@/data/portfolio.json";

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
			// className={`${geistSans.variable} ${geistMono.variable}  h-full antialiased`}
			className={`${ubuntu.variable} ${ubuntuMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
