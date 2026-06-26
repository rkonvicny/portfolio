import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Skills } from "../skills";
import { SkillCategory } from "@/domain/entities/skill-category";

vi.mock("@/data/app-settings", () => ({
	appSettings: {
		pageSettings: {
			enableExtendedSectionHeader: true
		},
		heroBackground: {}
	}
}));

vi.mock("@/data/portfolio.json", () => ({
	default: {}
}));

const mockCategories: SkillCategory[] = [
	{
		id: "frontend",
		title: "Frontend",
		skills: [
			{ name: "React", level: 90 },
			{ name: "TypeScript", level: 85 }
		]
	},
	{
		id: "backend",
		title: "Backend",
		skills: [{ name: "Node.js", level: 80 }]
	}
];

describe("Skills Component", () => {
	it("renders section header", () => {
		render(<Skills categories={mockCategories} />);
		expect(screen.getByText("Co všechno dokážu vytvořit")).toBeInTheDocument();
	});

	it("renders categories and skills correctly", () => {
		render(<Skills categories={mockCategories} />);

		// Check categories
		expect(screen.getByText("Frontend")).toBeInTheDocument();
		expect(screen.getByText("Backend")).toBeInTheDocument();

		// Check skills
		expect(screen.getByText("React")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
		expect(screen.getByText("Node.js")).toBeInTheDocument();
	});
});
