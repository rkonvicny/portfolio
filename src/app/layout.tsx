import type { Metadata } from "next";
import { Ubuntu_Sans, Ubuntu_Sans_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/sonner";
import { di } from "@infrastructure/di";
import { cn } from "@/lib/utils";

const ubuntu = Ubuntu_Sans({
	variable: "--font-ubuntu-sans",
	subsets: ["latin"]
});

const ubuntuMono = Ubuntu_Sans_Mono({
	variable: "--font-ubuntu-sans-mono",
	subsets: ["latin"]
});

export async function generateMetadata(): Promise<Metadata> {
	const personalData = await di.getPersonalUseCase.execute();
	return {
		title: `${personalData.siteTitle} | ${personalData.role}`,
		description: personalData.bio
	};
}

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
